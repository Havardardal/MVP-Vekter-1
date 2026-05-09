import { useState } from "react";
import CriticalitySelector from "./CriticalitySelector";
import ImageUploadMock from "./ImageUploadMock";

export default function ChecklistItem({ item, entry, onChange }) {
  const [expanded, setExpanded] = useState(false);

  function setStatus(status) {
    const next = { ...entry, status };
    if (status === "ok") {
      // Clear deviation fields when switching back to OK
      next.comment = "";
      next.criticality = null;
      next.image = null;
    }
    onChange(next);
    setExpanded(status === "avvik");
  }

  function setField(field, value) {
    onChange({ ...entry, [field]: value });
  }

  const isAvvik = entry.status === "avvik";

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
                Kommentar
                <textarea
                  className="avvik-comment"
                  rows={3}
                  placeholder="Beskriv avviket..."
                  value={entry.comment}
                  onChange={(e) => setField("comment", e.target.value)}
                />
              </label>

              <CriticalitySelector
                value={entry.criticality}
                onChange={(val) => setField("criticality", val)}
              />

              <ImageUploadMock
                image={entry.image}
                onUpload={(val) => setField("image", val)}
                onRemove={() => setField("image", null)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
