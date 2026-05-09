export const routeDefinition = [
  {
    id: "osloCity",
    name: "Oslo City",
    checklist: [
      // Kjeller / Parkering
      { id: "entrance_parkering", section: "🅿 Kjeller / Parkering",       label: "Inngang P1 – bom og nødutgang", required: true },
      { id: "parking_b1",         section: "🅿 Kjeller / Parkering",       label: "Parkeringskjeller B1 – ingen kjøretøy etter stengetid", required: true },
      // 1. etasje
      { id: "entrance_main",      section: "1️⃣ 1. etasje",                 label: "Hovedinngang (Stenersgata) – dør og låsemekanisme", required: true },
      { id: "entrance_jernbane",  section: "1️⃣ 1. etasje",                 label: "Inngang mot Jernbanetorget – skyvedør og sensorikk", required: true },
      { id: "door_staff_1f",      section: "1️⃣ 1. etasje",                 label: "Personaldør (bakside) – hengelås og kode", required: true },
      { id: "elevator_1",         section: "1️⃣ 1. etasje",                 label: "Heis H1 og H2 – operasjonsstatus og dørfunksjon", required: true },
      { id: "escalator",          section: "1️⃣ 1. etasje",                 label: "Rulletrapp midt i senteret – gjerde og nødstopp", required: true },
      // 2. etasje
      { id: "door_staff_2f",      section: "2️⃣ 2. etasje",                 label: "Personaldør – tilgangskort og dørpumpe", required: true },
      { id: "emergency_exits",    section: "2️⃣ 2. etasje",                 label: "Nødutganger alle etasjer – fri åpning og skilting", required: true },
      // Vaktrom og tekniske systemer
      { id: "alarm_panel",        section: "🔧 Vaktrom / Teknisk",          label: "Alarmsentral – ingen aktive alarmer", required: true },
      { id: "cctv",               section: "🔧 Vaktrom / Teknisk",          label: "CCTV-oversikt – alle kameraer operasjonelle", required: true },
      { id: "fire_alarm",         section: "🔧 Vaktrom / Teknisk",          label: "Brannvarslingssentral – ingen feil eller test aktiv", required: true },
      { id: "area_roof",          section: "🔧 Vaktrom / Teknisk",          label: "Teknisk rom tak – dør låst, ingen uautorisert adgang", required: true },
      // Generelt
      { id: "area_general",       section: "📋 Generelt",                   label: "Generell befaring – søppel, skader, mistenkelig aktivitet", required: true },
    ],
  },
  {
    id: "posthuset",
    name: "Posthuset",
    checklist: [
      // Kjeller
      { id: "door_basement",      section: "🏚 Kjeller",                    label: "Kjellerdør teknisk rom – låst og plombert", required: true },
      { id: "door_loading",       section: "🏚 Kjeller",                    label: "Varemottak/lossekai – rullport og adgangskontroll", required: true },
      // 1. etasje (Lobby)
      { id: "entrance_main",      section: "1️⃣ 1. etasje – Lobby",          label: "Hovedinngang Jernbanetorget 1 – glassport og låsestatus", required: true },
      { id: "entrance_side",      section: "1️⃣ 1. etasje – Lobby",          label: "Sideinnganger Prinsens gate – dør lukket og låst", required: true },
      { id: "elevator_main",      section: "1️⃣ 1. etasje – Lobby",          label: "Publikumsheiser (3 stk) – i drift og rengjort", required: true },
      { id: "area_lobby",         section: "1️⃣ 1. etasje – Lobby",          label: "Lobby og resepsjon – ryddig, ingen ubetjente gjenstander", required: true },
      // 3. etasje
      { id: "server_room",        section: "3️⃣ 3. etasje",                  label: "Serverrom – dør låst, temperatur normal", required: true },
      // Øvre etasjer / Tak
      { id: "emergency_exits",    section: "🔝 Øvre etasjer / Tak",         label: "Nødutganger alle etasjer (1–8) – fri og skiltet", required: true },
      { id: "elevator_service",   section: "🔝 Øvre etasjer / Tak",         label: "Serviceheiser – dør låst utenfor arbeidstid", required: true },
      { id: "door_roof_access",   section: "🔝 Øvre etasjer / Tak",         label: "Takklugedør fra trappehus – låst og forseglet", required: true },
      // Vaktrom og tekniske systemer
      { id: "alarm_panel",        section: "🔧 Vaktrom / Teknisk",          label: "Alarmsentral lobby – ingen aktive alarmer", required: true },
      { id: "fire_alarm",         section: "🔧 Vaktrom / Teknisk",          label: "Brannvarslingssentral – ingen feil", required: true },
      { id: "cctv",               section: "🔧 Vaktrom / Teknisk",          label: "CCTV – oversikt lobby, korridor og kjeller", required: true },
      // Bakgård
      { id: "area_courtyard",     section: "🏡 Bakgård",                    label: "Indre gårdsplass – ingen uautoriserte personer", required: true },
    ],
  },
  {
    id: "jernbanetorget",
    name: "Jernbanetorget",
    checklist: [
      // Adkomst og porter
      { id: "gate_north",         section: "🚏 Adkomst og porter",          label: "Nordlig adkomst (mot Oslo S) – bom og gjerder intakt", required: true },
      { id: "gate_south",         section: "🚏 Adkomst og porter",          label: "Sørlig adkomst (Dronningens gate) – skilt og avvisere", required: true },
      { id: "gate_tram_stops",    section: "🚏 Adkomst og porter",          label: "Trikkholdeplass øst og vest – fri ferdsel, ingen blokkering", required: true },
      // Undergrunnspassasjer
      { id: "tunnel_east",        section: "🚇 Undergrunnspassasjer",       label: "Passasje øst – belysning, ingen sovende/mistenkelige", required: true },
      { id: "tunnel_west",        section: "🚇 Undergrunnspassasjer",       label: "Passasje vest – dør til teknisk rom låst", required: true },
      { id: "kiosk_area",         section: "🚇 Undergrunnspassasjer",       label: "Kioskareal (Narvesen/7-Eleven) – stengt og sikret", required: true },
      // Tekniske installasjoner
      { id: "lighting",           section: "🔧 Tekniske installasjoner",    label: "Utendørsbelysning – alle armaturer i drift", required: true },
      { id: "cctv",               section: "🔧 Tekniske installasjoner",    label: "CCTV – alle kameraer operasjonelle og riktig vinkel", required: true },
      { id: "emergency_call",     section: "🔧 Tekniske installasjoner",    label: "Nødtelefon-stolpe – testet og fungerer", required: true },
      // Torget – orden og sikkerhet
      { id: "area_benches",       section: "🏛 Torget – orden og sikkerhet", label: "Benkeområde – ingen overnatting, ingen mistenkelige gjenstander", required: true },
      { id: "area_bike_parking",  section: "🏛 Torget – orden og sikkerhet", label: "Sykkelstativ vest – ingen forlatte sykler med avvikende lås", required: true },
      { id: "area_general",       section: "🏛 Torget – orden og sikkerhet", label: "Generell befaring hele torget – orden, trygghet, avvik", required: true },
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
