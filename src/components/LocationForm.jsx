import { useState } from "react";
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

/** Group checklist items by their `section` field, preserving order. */
function groupBySection(checklist) {
  const sections = [];
  const seen = new Map();
  for (const item of checklist) {
    const key = item.section ?? "Annet";
    if (!seen.has(key)) {
      seen.set(key, []);
      sections.push({ title: key, items: seen.get(key) });
    }
    seen.get(key).push(item);
  }
  return sections;
}

export default function LocationForm({ location, locationState, onUpdate, onBack }) {
  const allDone = location.checklist.every((item) =>
    isItemDone(locationState[item.id])
  );

  const sections = groupBySection(location.checklist);

  // All sections collapsed by default
  const [collapsed, setCollapsed] = useState(() =>
    Object.fromEntries(sections.map((s) => [s.title, true]))
  );

  function toggleSection(title) {
    setCollapsed((prev) => ({ ...prev, [title]: !prev[title] }));
  }

  function handleItemChange(itemId, entry) {
    onUpdate(location.id, itemId, entry);
  }

  return (
    <div className="location-form">
      <button type="button" className="back-btn" onClick={onBack}>
        ← Tilbake til rute
      </button>

      <h2 className="location-form-title">{location.name}</h2>

      {sections.map((section) => {
        const sectionDone = section.items.every((item) =>
          isItemDone(locationState[item.id])
        );
        const isCollapsed = collapsed[section.title];
        return (
          <div key={section.title} className="checklist-section">
            <button
              type="button"
              className={`checklist-section-header${sectionDone ? " section-done" : ""}`}
              onClick={() => toggleSection(section.title)}
              aria-expanded={!isCollapsed}
            >
              <span className="checklist-section-title">{section.title}</span>
              <span className="checklist-section-count">
                {section.items.filter((i) => isItemDone(locationState[i.id])).length}
                /{section.items.length}
                {sectionDone && <span className="section-done-badge">✔</span>}
                <span className="section-chevron">{isCollapsed ? "▶" : "▼"}</span>
              </span>
            </button>
            {!isCollapsed && (
              <div className="checklist">
                {section.items.map((item) => (
                  <ChecklistItem
                    key={item.id}
                    item={item}
                    entry={locationState[item.id]}
                    onChange={(entry) => handleItemChange(item.id, entry)}
                    locationName={location.name}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}

      {allDone && (
        <div className="form-complete-banner">
          ✅ Alle punkter er håndtert – lokasjonen er fullført!
        </div>
      )}
    </div>
  );
}
