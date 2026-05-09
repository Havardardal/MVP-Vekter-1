export default function ProgressBar({ completed, total }) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="progress-bar-wrapper">
      <div className="progress-bar-label">
        Fremgang: {completed} / {total} lokasjoner fullført
      </div>
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <div className="progress-bar-pct">{pct}%</div>
    </div>
  );
}
