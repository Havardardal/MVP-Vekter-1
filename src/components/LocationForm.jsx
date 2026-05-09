import ChecklistItem from "./ChecklistItem";

/**
 * An avvik entry is "handled" when it has at least a comment OR a criticality.
 * An item is "done" when status is "ok" OR (status is "avvik" and it's handled).
 */
export function isItemDone(entry) {
  if (!entry.status) return false;
  if (entry.status === "ok") return true;
  if (entry.status === "avvik") {
    return entry.comment.trim().length > 0 || entry.criticality !== null;
  }
  return false;
}

export default function LocationForm({ location, locationState, onUpdate, onBack }) {
  const allDone = location.checklist.every((item) =>
    isItemDone(locationState[item.id])
  );

  function handleItemChange(itemId, entry) {
    onUpdate(location.id, itemId, entry);
  }

  return (
    <div className="location-form">
      <button type="button" className="back-btn" onClick={onBack}>
        ← Tilbake til rute
      </button>

      <h2 className="location-form-title">{location.name}</h2>

      <div className="checklist">
        {location.checklist.map((item) => (
          <ChecklistItem
            key={item.id}
            item={item}
            entry={locationState[item.id]}
            onChange={(entry) => handleItemChange(item.id, entry)}
          />
        ))}
      </div>

      {allDone && (
        <div className="form-complete-banner">
          ✅ Alle punkter er håndtert – lokasjonen er fullført!
        </div>
      )}
    </div>
  );
}
