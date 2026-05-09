import { useState, useRef, useEffect } from "react";
import CriticalityDisplay from "./CriticalityDisplay";
import ImageUploadMock from "./ImageUploadMock";
import FlagModal from "./FlagModal";

export default function ChecklistItem({ item, entry, onChange, locationName }) {
  const [expanded, setExpanded] = useState(false);
  const [reported, setReported] = useState(false);
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    if (!menuOpen) return;
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  function setStatus(status) {
    const next = { ...entry, status };
    if (status === "ok") {
      next.comment = "";
      next.criticality = null;
      next.image = null;
      setReported(false);
    }
    if (status === "avvik") {
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

  function handleFlagSubmit(comment) {
    const flagReport = {
      timestamp: new Date().toISOString(),
      location: locationName ?? "Ukjent lokasjon",
      checklistItem: { id: item.id, label: item.label },
      type: "schema_error",
      comment,
    };
    console.log("=== Skjemafeil RAPPORTERT ===");
    console.log(JSON.stringify(flagReport, null, 2));
    onChange({ ...entry, flagged: true, flagComment: comment });
    setShowFlagModal(false);
  }

  const isAvvik = entry.status === "avvik";
  const isHandled = isAvvik && entry.comment.trim().length > 0;
  const isFlagged = !!entry.flagged;

  return (
    <>
      {showFlagModal && (
        <FlagModal
          itemLabel={item.label}
          onSubmit={handleFlagSubmit}
          onCancel={() => setShowFlagModal(false)}
        />
      )}

      <div className={`checklist-item${isAvvik ? " has-avvik" : ""}${entry.status === "ok" ? " is-ok" : ""}${isFlagged ? " is-flagged" : ""}`}>

        {/* Three-dot menu anchored to top-right corner of the card */}
        <div className="item-menu-corner">
          {!isFlagged ? (
            <div className="item-menu-wrapper" ref={menuRef}>
              <button
                type="button"
                className={`flag-btn${menuOpen ? " active" : ""}`}
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Flere valg"
                aria-haspopup="true"
                aria-expanded={menuOpen}
              >
                ···
              </button>
              {menuOpen && (
                <div className="item-menu-dropdown" role="menu">
                  <button
                    type="button"
                    role="menuitem"
                    className="item-menu-option"
                    onClick={() => {
                      setMenuOpen(false);
                      setShowFlagModal(true);
                    }}
                  >
                    🚩 Rapporter feil i skjema
                  </button>
                </div>
              )}
            </div>
          ) : (
            <span className="flag-icon-badge" title="Skjemafeil rapportert">🚩</span>
          )}
        </div>

        <div className="checklist-item-header">
          <span className="checklist-item-label">{item.label}</span>
          <div className="checklist-item-actions">
            {!isFlagged && (
              <>
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
              </>
            )}
          </div>
        </div>

        {isFlagged && (
          <div className="flag-reported-banner">
            🚩 Skjemafeil rapportert – punktet er satt til godkjent
          </div>
        )}

        {!isFlagged && isAvvik && (
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
    </>
  );
}

