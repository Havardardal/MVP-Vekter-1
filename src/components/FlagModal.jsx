import { useState } from "react";

export default function FlagModal({ itemLabel, onSubmit, onCancel }) {
  const [comment, setComment] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!comment.trim()) return;
    onSubmit(comment.trim());
  }

  return (
    <div className="flag-overlay" onClick={onCancel}>
      <div className="flag-modal" onClick={(e) => e.stopPropagation()}>
        <div className="flag-modal-header">
          <span className="flag-modal-icon">🚩</span>
          <h3 className="flag-modal-title">Rapporter feil i skjema</h3>
          <button
            type="button"
            className="flag-modal-close"
            onClick={onCancel}
            aria-label="Lukk"
          >
            ✕
          </button>
        </div>

        <p className="flag-modal-item-label">Punkt: <em>{itemLabel}</em></p>
        <p className="flag-modal-desc">
          Stemmer ikke dette punktet? Beskriv hva som er feil eller mangler i skjemaet,
          så blir det rapportert til ansvarlig.
        </p>

        <form onSubmit={handleSubmit}>
          <label className="field-label">
            Kommentar*
            <textarea
              className="avvik-comment"
              rows={4}
              placeholder="F.eks. «Denne døren finnes ikke i 2. etasje» eller «Punktet gjelder ikke denne lokasjonen»"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              autoFocus
            />
          </label>

          <div className="flag-modal-actions">
            <button type="button" className="flag-cancel-btn" onClick={onCancel}>
              Avbryt
            </button>
            <button
              type="submit"
              className="flag-submit-btn"
              disabled={!comment.trim()}
            >
              🚩 Send inn rapport
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
