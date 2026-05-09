import { useState, useCallback } from 'react'
import { routeDefinition, buildInitialState } from './data/routeDefinition'
import RouteDashboard from './components/RouteDashboard'
import LocationForm, { isItemDone } from './components/LocationForm'
import './App.css'

function deriveLocationStatus(location, locationState) {
  const entries = Object.values(locationState)
  const anyStarted = entries.some((e) => e.status !== null)
  if (!anyStarted) return 'notStarted'
  const allDone = location.checklist.every((item) =>
    isItemDone(locationState[item.id])
  )
  return allDone ? 'completed' : 'inProgress'
}

function App() {
  const [reportState, setReportState] = useState(buildInitialState)
  const [activeLocationId, setActiveLocationId] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const locationStatuses = Object.fromEntries(
    routeDefinition.map((loc) => [
      loc.id,
      deriveLocationStatus(loc, reportState[loc.id]),
    ])
  )

  const handleUpdate = useCallback((locationId, itemId, entry) => {
    setReportState((prev) => ({
      ...prev,
      [locationId]: {
        ...prev[locationId],
        [itemId]: entry,
      },
    }))
  }, [])

  function handleSubmit() {
    const report = {
      timestamp: new Date().toISOString(),
      locations: routeDefinition.map((loc) => ({
        id: loc.id,
        name: loc.name,
        status: locationStatuses[loc.id],
        checklist: loc.checklist.map((item) => ({
          id: item.id,
          label: item.label,
          ...reportState[loc.id][item.id],
        })),
      })),
    }
    console.log('=== RAPPORT SENDT ===')
    console.log(JSON.stringify(report, null, 2))
    setSubmitted(true)
  }

  const activeLocation = routeDefinition.find((l) => l.id === activeLocationId)

  return (
    <div className="app-shell">
      {activeLocation ? (
        <LocationForm
          location={activeLocation}
          locationState={reportState[activeLocation.id]}
          onUpdate={handleUpdate}
          onBack={() => setActiveLocationId(null)}
        />
      ) : (
        <RouteDashboard
          route={routeDefinition}
          locationStatuses={locationStatuses}
          onSelectLocation={setActiveLocationId}
          onSubmit={handleSubmit}
          submitted={submitted}
        />
      )}
    </div>
  )
}

export default App
