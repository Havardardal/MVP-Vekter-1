export const routeDefinition = [
  {
    id: "osloCity",
    name: "Oslo City",
    checklist: [
      // Innganger og dører
      { id: "entrance_main",      label: "Hovedinngang (Stenersgata) – dør og låsemekanisme", required: true },
      { id: "entrance_jernbane",  label: "Inngang mot Jernbanetorget – skyvedør og sensorikk", required: true },
      { id: "entrance_parkering", label: "Parkeringskjeller inngang P1 – bom og nødutgang", required: true },
      { id: "door_staff_1f",      label: "Personaldør 1. etasje (bakside) – hengelås og kode", required: true },
      { id: "door_staff_2f",      label: "Personaldør 2. etasje – tilgangskort og dørpumpe", required: true },
      { id: "emergency_exits",    label: "Nødutganger alle etasjer – fri åpning og skilting", required: true },
      // Heiser og rulletrapper
      { id: "elevator_1",         label: "Heis H1 og H2 – operasjonsstatus og dørfunksjon", required: true },
      { id: "escalator",          label: "Rulletrapp midt i kjøpesenteret – gjerde og nødstopp", required: true },
      // Alarm og tekniske systemer
      { id: "alarm_panel",        label: "Alarmsentral (vaktrom) – ingen aktive alarmer", required: true },
      { id: "cctv",               label: "CCTV-oversikt – alle kameraer operasjonelle", required: true },
      { id: "fire_alarm",         label: "Brannvarslingssentral – ingen feil eller test aktiv", required: true },
      // Område og orden
      { id: "parking_b1",        label: "Parkeringskjeller B1 – ingen kjøretøy etter stengetid", required: true },
      { id: "area_roof",          label: "Teknisk rom tak – dør låst, ingen uautorisert adgang", required: true },
      { id: "area_general",       label: "Generell befaring – søppel, skader, mistenkelig aktivitet", required: true },
    ],
  },
  {
    id: "posthuset",
    name: "Posthuset",
    checklist: [
      // Innganger og dører
      { id: "entrance_main",      label: "Hovedinngang Jernbanetorget 1 – glassport og låsestatus", required: true },
      { id: "entrance_side",      label: "Sideinnganger Prinsens gate – dør lukket og låst", required: true },
      { id: "door_loading",       label: "Varemottak/lossekai – rullport og adgangskontroll", required: true },
      { id: "door_basement",      label: "Kjellerdør teknisk rom – låst og plombert", required: true },
      { id: "door_roof_access",   label: "Takklugedør fra trappehus – låst og forseglet", required: true },
      { id: "emergency_exits",    label: "Nødutganger alle etasjer (1–8) – fri og skiltet", required: true },
      // Heiser
      { id: "elevator_main",      label: "Publikumsheiser (3 stk) – i drift og rengjort", required: true },
      { id: "elevator_service",   label: "Serviceheiser – dør låst utenfor arbeidstid", required: true },
      // Alarm og tekniske systemer
      { id: "alarm_panel",        label: "Alarmsentral lobby – ingen aktive alarmer", required: true },
      { id: "fire_alarm",         label: "Brannvarslingssentral – ingen feil", required: true },
      { id: "cctv",               label: "CCTV-kontroll – oversikt lobby, korridor og kjeller", required: true },
      { id: "server_room",        label: "Serverrom 3. etasje – dør låst, temperatur normal", required: true },
      // Område
      { id: "area_lobby",         label: "Lobby og resepsjon – ryddig, ingen ubetjente gjenstander", required: true },
      { id: "area_courtyard",     label: "Indre gårdsplass – ingen uautoriserte personer", required: true },
    ],
  },
  {
    id: "jernbanetorget",
    name: "Jernbanetorget",
    checklist: [
      // Adkomst og porter
      { id: "gate_north",         label: "Nordlig adkomst (mot Oslo S) – bom og gjerder intakt", required: true },
      { id: "gate_south",         label: "Sørlig adkomst (Dronningens gate) – skilt og avvisere", required: true },
      { id: "gate_tram_stops",    label: "Trikkholdeplass øst og vest – fri ferdsel, ingen blokkering", required: true },
      // Undergrunnspassasjer og kiosker
      { id: "tunnel_east",        label: "Undergrunnspassasje øst – belysning, ingen sovende/mistenkelige", required: true },
      { id: "tunnel_west",        label: "Undergrunnspassasje vest – dør til teknisk rom låst", required: true },
      { id: "kiosk_area",         label: "Kioskareal (Narvesen/7-Eleven) – stengt og sikret", required: true },
      // Tekniske installasjoner
      { id: "lighting",           label: "Utendørsbelysning – alle armaturer i drift", required: true },
      { id: "cctv",               label: "CCTV torget – alle kameraer operasjonelle og riktig vinkel", required: true },
      { id: "emergency_call",     label: "Nødtelefon-stolpe på torget – testet og fungerer", required: true },
      // Orden og sikkerhet
      { id: "area_benches",       label: "Benkeområde – ingen overnatting, ingen mistenkelige gjenstander", required: true },
      { id: "area_bike_parking",  label: "Sykkelstativ vest – ingen stjålne/forlatte sykler med avvikende lås", required: true },
      { id: "area_general",       label: "Generell befaring hele torget – orden, trygghet, avvik", required: true },
    ],
  },
];

/**
 * Build the initial state object for the entire route.
 * Each location gets a map of checklistItem entries.
 */
export function buildInitialState() {
  const state = {};
  routeDefinition.forEach((location) => {
    state[location.id] = {};
    location.checklist.forEach((item) => {
      state[location.id][item.id] = {
        status: null, // null | 'ok' | 'avvik'
        comment: "",
        criticality: null, // 1–5
        image: null, // mock: 'image_uploaded' | null
      };
    });
  });
  return state;
}
