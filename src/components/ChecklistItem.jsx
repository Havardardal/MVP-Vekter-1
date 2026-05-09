import { useState } from "react";
import CriticalityDisplay from "./CriticalityDisplay";
import ImageUploadMock from "./ImageUploadMock";

export default function ChecklistItem({ item, entry, onChange, locationName }) {
  const [expanded, setExpanded] = useState(false);
  const [reported, setReported] = useState(false);

  function setStatus(status) {
    const next = { ...entry, status };
    if (status === "ok") {
      next.comment = "";
      next.criticality = null;
      next.image = null;
      setReported(false);
    }
    if (status === "avvik") {
      // Auto-set pre-determined criticality from the item definition
      next.criticality = item.criticality ?? null;
    }
    onChange(next);
    setExpanded(status === "avvik");
  }

  function setField(field, value) {
    onChange({ ...entry, [field]: value });
    setReported(false);
  }

  function handleReport() {
    const avvikReport = {
      timestamp: new Date().toISOString(),
      location: locationName ?? "Ukjent lokasjon",
      checklistItem: { id: item.id, label: item.label },
      comment: entry.comment,
      criticality: entry.criticality,
      image: entry.image,
    };
    console.log("=== AVVIK RAPPORTERT ===");
    console.log(JSON.stringify(avvikReport, null, 2));
    setReported(true);
    setExpanded(false);
  }

  const isAvvik = entry.status === "avvik";
  // Criticality is pre-set, so only comment is required
  const isHandled = isAvvik && entry.comment.trim().length > 0;

  return (
    <div className={`checklist-item${isAvvik ? " has-avvik" : ""}${entry.status === "ok" ? " is-ok" : ""}`}>
      <div className="checklist-item-header">
        <span className="checklist-item-label">{item.label}</span>
        <div className="checklist-item-actions">
          <button
            type="button"
            className={`status-btn ok${entry.status === "ok" ? " active" : ""}`}
            onClick={() => setStatus(entry.status === "ok" ? null : "ok")}
          >
            ✔ OK
          </button>
          <button
            type="button"
            className={`status-btn avvik${isAvvik ? " active" : ""}`}
            onClick={() => {
              setStatus(isAvvik ? null : "avvik");
              if (!isAvvik) setExpanded(true);
            }}
          >
            ⚠ Avvik
          </button>
        </div>
      </div>

      {isAvvik && (
        <div className="avvik-details">
          {reported ? (
            <div className="avvik-reported-banner">
              ✅ Avvik innrapportert
            </div>
          ) : (
            <>
              <button
                type="button"
                className="avvik-toggle"
                onClick={() => setExpanded((v) => !v)}
              >
                {expanded ? "▲ Skjul detaljer" : "▼ Vis detaljer"}
              </button>

              {expanded && (
                <div className="avvik-fields">
                  <label className="field-label">
                    Kommentar*
                    <textarea
                      className="avvik-comment"
                      rows={3}
                      placeholder="Beskriv avviket..."
                      value={entry.comment}
                      onChange={(e) => setField("comment", e.target.value)}
                    />
                  </label>

                  <CriticalityDisplay level={entry.criticality ?? item.criticality} />

                  <ImageUploadMock
                    image={entry.image}
                    onUpload={(val) => setField("image", val)}
                    onRemove={() => setField("image", null)}
                  />

                  {isHandled && (
                    <button
                      type="button"
                      className="avvik-report-btn"
                      onClick={handleReport}
                    >
                      📤 Send inn avvik nå
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
