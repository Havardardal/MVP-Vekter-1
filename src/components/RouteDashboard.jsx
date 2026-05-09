import ProgressBar from "./ProgressBar";

const STATUS_LABEL = {
  notStarted: "Ikke startet",
  inProgress: "Påbegynt",
  completed: "Fullført",
};

const STATUS_CLASS = {
  notStarted: "status-not-started",
  inProgress: "status-in-progress",
  completed: "status-completed",
};

export default function RouteDashboard({
  route,
  locationStatuses,
  onSelectLocation,
  onSubmit,
  submitted,
}) {
  const completedCount = Object.values(locationStatuses).filter(
    (s) => s === "completed"
  ).length;
  const allCompleted = completedCount === route.length;

  return (
    <div className="route-dashboard">
      <h1 className="dashboard-title">🛡 Vekter-runde</h1>

      <ProgressBar completed={completedCount} total={route.length} />

      <ul className="location-list">
        {route.map((location) => {
          const status = locationStatuses[location.id];
          return (
            <li key={location.id} className={`location-card ${STATUS_CLASS[status]}`}>
              <div className="location-card-info">
                <span className="location-card-name">{location.name}</span>
                <span className={`location-card-status ${STATUS_CLASS[status]}`}>
                  {STATUS_LABEL[status]}
                </span>
              </div>
              <button
                type="button"
                className="location-open-btn"
                onClick={() => onSelectLocation(location.id)}
              >
                {status === "completed" ? "Se skjema" : "Åpne skjema"}
              </button>
            </li>
          );
        })}
      </ul>

      {allCompleted && !submitted && (
        <button type="button" className="submit-btn" onClick={onSubmit}>
          📤 Send inn rapport
        </button>
      )}

      {submitted && (
        <div className="submitted-banner">
          ✅ Rapport sendt! Takk for utfylt runde.
        </div>
      )}
    </div>
  );
}
