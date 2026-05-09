import { useState } from "react";
import ProgressBar from "./ProgressBar";

const MOCK_USER = {
  name: "Lars Andersen",
  role: "Vekter",
  badge: "V-4821",
  phone: "900 00 010",
  avatarUrl: "https://i.pravatar.cc/80?u=lars-vekter",
};

function formatDate() {
  return new Date().toLocaleDateString("nb-NO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

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
  const [profileOpen, setProfileOpen] = useState(false);

  const completedCount = Object.values(locationStatuses).filter(
    (s) => s === "completed"
  ).length;
  const allCompleted = completedCount === route.length;

  return (
    <div className="route-dashboard">
      {profileOpen && (
        <div className="profile-overlay" onClick={() => setProfileOpen(false)}>
          <div className="profile-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="profile-close"
              onClick={() => setProfileOpen(false)}
              aria-label="Lukk"
            >
              ✕
            </button>
            <img src={MOCK_USER.avatarUrl} alt={MOCK_USER.name} className="profile-avatar" />
            <h2 className="profile-name">{MOCK_USER.name}</h2>
            <p className="profile-role">{MOCK_USER.role}</p>
            <div className="profile-details">
              <div className="profile-detail-row">
                <span className="profile-detail-label">Tjenestenummer</span>
                <span className="profile-detail-value">{MOCK_USER.badge}</span>
              </div>
              <div className="profile-detail-row">
                <span className="profile-detail-label">Telefon</span>
                <span className="profile-detail-value">{MOCK_USER.phone}</span>
              </div>
              <div className="profile-detail-row">
                <span className="profile-detail-label">Dato</span>
                <span className="profile-detail-value">{formatDate()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="dashboard-header">
        <div className="dashboard-header-spacer" />
        <div className="dashboard-header-center">
          <h1 className="dashboard-title">🛡 Vekter-runde</h1>
          <p className="dashboard-date">{formatDate()}</p>
        </div>
        <button
          type="button"
          className="topbar-avatar-btn"
          onClick={() => setProfileOpen(true)}
          aria-label="Vis profil"
        >
          <img
            src={MOCK_USER.avatarUrl}
            alt={MOCK_USER.name}
            className="topbar-avatar"
          />
        </button>
      </div>

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
