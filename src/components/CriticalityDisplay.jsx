import { useState } from "react";

const CRITICALITY_INFO = {
  1: {
    label: "Nivå 1 – Lav",
    description: "Mindre avvik som ikke påvirker sikkerhet eller drift. Kan håndteres ved neste ordinære gjennomgang.",
    contact: null,
  },
  2: {
    label: "Nivå 2 – Liten",
    description: "Avvik som bør følges opp innen kort tid, men krever ikke umiddelbar handling. Loggfør og rapporter til leder ved slutt av vakt.",
    contact: null,
  },
  3: {
    label: "Nivå 3 – Moderat",
    description: "Avvik som kan påvirke sikkerhet eller drift. Informer vakthavende leder ved første anledning i løpet av vakten.",
    contact: null,
  },
  4: {
    label: "Nivå 4 – Alvorlig",
    description: "Alvorlig avvik som krever umiddelbar varsling. Ring vakthavende leder nå.",
    contact: { name: "Vakthavende leder", phone: "900 00 001" },
  },
  5: {
    label: "Nivå 5 – Kritisk",
    description: "Kritisk situasjon – mulig fare for liv, helse eller store materielle verdier. Ring operasjonssentralen umiddelbart.",
    contact: { name: "Operasjonssentral", phone: "900 00 002" },
  },
};

export default function CriticalityDisplay({ level }) {
  const [open, setOpen] = useState(level >= 4);
  const info = CRITICALITY_INFO[level];

  if (!info) return null;

  return (
    <div className="criticality-wrapper">
      <div className="criticality-selector">
        <span className="criticality-label">Kritikalitet:</span>
        <button
          type="button"
          className={`criticality-btn level-${level} selected`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          title="Trykk for mer informasjon"
        >
          {level}
        </button>
        <span className="criticality-hint">Trykk for info</span>
      </div>

      {open && (
        <div className={`criticality-info level-${level}-info`}>
          <div className="criticality-info-header">
            <strong>{info.label}</strong>
            <button
              type="button"
              className="criticality-info-close"
              onClick={() => setOpen(false)}
              aria-label="Lukk"
            >
              ✕
            </button>
          </div>
          <p className="criticality-info-desc">{info.description}</p>
          {info.contact && (
            <a
              className="criticality-contact-link"
              href={`tel:${info.contact.phone.replace(/\s/g, "")}`}
            >
              📞 {info.contact.name}: {info.contact.phone}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
