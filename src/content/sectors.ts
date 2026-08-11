export type SectorId =
  | "epc"
  | "municipality"
  | "logistics"
  | "energy"
  | "manufacturing"
  | "financial";

export type Sector = {
  id: SectorId;
  code: string;
  name: { en: string; nl: string };
  short: { en: string; nl: string };
  pains: { en: string[]; nl: string[] };
  focus: { en: string[]; nl: string[] };
  kpis: { label: { en: string; nl: string }; value: string; delta: string; good: boolean }[];
  tier: "Silver" | "Gold" | "Diamond";
};

export const sectors: Sector[] = [
  {
    id: "epc",
    code: "EPC-01",
    tier: "Gold",
    name: { en: "EPC & construction contractor", nl: "EPC- en bouwaannemer" },
    short: {
      en: "Multi-site capital projects run on Primavera P6, ERP and EDMS that never agree.",
      nl: "Kapitaalprojecten op meerdere locaties draaien op Primavera P6, ERP en EDMS die nooit overeenkomen.",
    },
    pains: {
      en: [
        "Schedule in P6, cost in ERP, documents in EDMS — reconciled by hand every month",
        "Claims and variation orders discovered after the payment milestone has passed",
        "Progress reported by percentage feeling instead of verified earned value",
      ],
      nl: [
        "Planning in P6, kosten in ERP, documenten in EDMS — elke maand handmatig afgestemd",
        "Claims en meerwerk pas ontdekt nadat de betalingsmijlpaal is gepasseerd",
        "Voortgang gerapporteerd op gevoel in plaats van geverifieerde earned value",
      ],
    },
    focus: {
      en: [
        "P6 / MSP critical-path ingestion with baseline drift detection",
        "EVM engine: SPI, CPI, BAC and EAC per contract package",
        "Contract lifecycle repository with milestone payment triggers",
      ],
      nl: [
        "P6 / MSP kritieke-pad-inname met baseline-afwijkingsdetectie",
        "EVM-engine: SPI, CPI, BAC en EAC per contractpakket",
        "Contractbeheer-repository met betalingsmijlpaaltriggers",
      ],
    },
    kpis: [
      { label: { en: "Portfolio SPI", nl: "Portfolio SPI" }, value: "0.94", delta: "-0.03", good: false },
      { label: { en: "Portfolio CPI", nl: "Portfolio CPI" }, value: "1.02", delta: "+0.01", good: true },
      { label: { en: "Open variations", nl: "Open meerwerk" }, value: "17", delta: "+4", good: false },
      { label: { en: "Data freshness", nl: "Dataversheid" }, value: "12 min", delta: "OK", good: true },
    ],
  },
  {
    id: "municipality",
    code: "GOV-02",
    tier: "Gold",
    name: { en: "Municipality & public sector", nl: "Gemeente & publieke sector" },
    short: {
      en: "Public capital programmes that must be auditable, explainable and on budget.",
      nl: "Publieke investeringsprogramma's die controleerbaar, uitlegbaar en binnen budget moeten zijn.",
    },
    pains: {
      en: [
        "Council reporting cycles that take weeks of manual consolidation",
        "No single view across housing, mobility, energy and maintenance programmes",
        "Audit questions that cannot be answered without reopening old spreadsheets",
      ],
      nl: [
        "Raadsrapportages die weken handmatige consolidatie kosten",
        "Geen totaalbeeld over woningbouw-, mobiliteits-, energie- en onderhoudsprogramma's",
        "Auditvragen die niet te beantwoorden zijn zonder oude spreadsheets te heropenen",
      ],
    },
    focus: {
      en: [
        "Programme portfolio portal with political milestone tracking",
        "Immutable audit trail for every baseline change and approval",
        "Board-ready report builder for council and accountability cycles",
      ],
      nl: [
        "Programmaportaal met bewaking van bestuurlijke mijlpalen",
        "Onveranderlijk audittrail voor elke baselinewijziging en goedkeuring",
        "Rapportgenerator voor raads- en verantwoordingscycli",
      ],
    },
    kpis: [
      { label: { en: "Programmes on plan", nl: "Programma's op plan" }, value: "71%", delta: "+6%", good: true },
      { label: { en: "Budget committed", nl: "Budget vastgelegd" }, value: "€184M", delta: "83%", good: true },
      { label: { en: "Audit findings open", nl: "Open auditbevindingen" }, value: "3", delta: "-5", good: true },
      { label: { en: "Reporting lead time", nl: "Doorlooptijd rapportage" }, value: "1 day", delta: "-14 d", good: true },
    ],
  },
  {
    id: "logistics",
    code: "LOG-03",
    tier: "Diamond",
    name: { en: "Logistics & postal networks", nl: "Logistiek & postnetwerken" },
    short: {
      en: "Network-wide change programmes where a single hub delay cascades nationally.",
      nl: "Netwerkbrede veranderprogramma's waarbij één hubvertraging landelijk doorwerkt.",
    },
    pains: {
      en: [
        "Sorting-centre automation rollouts tracked separately per site",
        "IT, facility and operations plans that never share one calendar",
        "Peak-season risk visible only when it is already operational",
      ],
      nl: [
        "Automatiseringsuitrol per sorteercentrum los bijgehouden",
        "IT-, facilitaire en operationele planningen zonder gedeelde kalender",
        "Piekseizoenrisico pas zichtbaar als het al operationeel is",
      ],
    },
    focus: {
      en: [
        "Rollout wave tracking across hubs, depots and last-mile sites",
        "Predictive drift analysis on go-live dates before peak season",
        "SLA and incident compliance monitoring per site",
      ],
      nl: [
        "Uitrolgolven volgen over hubs, depots en last-mile locaties",
        "Voorspellende driftanalyse op go-livedata vóór het piekseizoen",
        "SLA- en incidentmonitoring per locatie",
      ],
    },
    kpis: [
      { label: { en: "Sites live", nl: "Locaties live" }, value: "38/54", delta: "+5", good: true },
      { label: { en: "Forecast go-live drift", nl: "Voorspelde go-livedrift" }, value: "+11 d", delta: "risk", good: false },
      { label: { en: "SLA compliance", nl: "SLA-naleving" }, value: "97.4%", delta: "+0.6%", good: true },
      { label: { en: "Interfaces healthy", nl: "Gezonde interfaces" }, value: "42/44", delta: "2 down", good: false },
    ],
  },
  {
    id: "energy",
    code: "ENR-04",
    tier: "Diamond",
    name: { en: "Energy, utilities & grid", nl: "Energie, nutsbedrijven & netbeheer" },
    short: {
      en: "Grid and energy-transition portfolios under regulatory and permitting pressure.",
      nl: "Net- en energietransitieportfolio's onder regelgevings- en vergunningsdruk.",
    },
    pains: {
      en: [
        "Hundreds of parallel connection and reinforcement projects",
        "Permitting and contractor capacity as the real critical path",
        "Regulator reporting rebuilt manually every quarter",
      ],
      nl: [
        "Honderden parallelle aansluit- en verzwaringsprojecten",
        "Vergunningen en aannemerscapaciteit als het echte kritieke pad",
        "Toezichthouderrapportage elk kwartaal handmatig opnieuw gebouwd",
      ],
    },
    focus: {
      en: [
        "Portfolio orchestration across thousands of small works packages",
        "Resource and contractor capacity constraint modelling",
        "Risk matrix with automated escalation trees",
      ],
      nl: [
        "Portfolio-orkestratie over duizenden kleine werkpakketten",
        "Modellering van capaciteitsbeperkingen bij resources en aannemers",
        "Risicomatrix met geautomatiseerde escalatiebomen",
      ],
    },
    kpis: [
      { label: { en: "Works packages", nl: "Werkpakketten" }, value: "2,140", delta: "+96", good: true },
      { label: { en: "Permit blocked", nl: "Vergunning geblokkeerd" }, value: "118", delta: "+12", good: false },
      { label: { en: "Capacity utilisation", nl: "Capaciteitsbenutting" }, value: "104%", delta: "over", good: false },
      { label: { en: "Forecast EAC", nl: "Voorspelde EAC" }, value: "€612M", delta: "+2.1%", good: false },
    ],
  },
  {
    id: "manufacturing",
    code: "MFG-05",
    tier: "Silver",
    name: { en: "Industrial & manufacturing", nl: "Industrie & productie" },
    short: {
      en: "Plant expansions, turnarounds and capex programmes beside daily production.",
      nl: "Fabrieksuitbreidingen, turnarounds en capex-programma's naast dagelijkse productie.",
    },
    pains: {
      en: [
        "Turnaround windows planned in isolation from capex delivery",
        "Capex approvals tracked in email and finance spreadsheets",
        "No early warning before a shutdown slips into production time",
      ],
      nl: [
        "Turnaround-vensters los gepland van capex-realisatie",
        "Capex-goedkeuringen bijgehouden in e-mail en financiële spreadsheets",
        "Geen vroege waarschuwing voordat een stop de productie raakt",
      ],
    },
    focus: {
      en: [
        "Read-only connectors to ERP, maintenance and scheduling systems",
        "Single source of truth for capex portfolio status",
        "Automated data-quality and sync health monitoring",
      ],
      nl: [
        "Alleen-lezen connectoren naar ERP-, onderhouds- en planningssystemen",
        "Eén bron van waarheid voor de capex-portfoliostatus",
        "Geautomatiseerde datakwaliteits- en synchronisatiebewaking",
      ],
    },
    kpis: [
      { label: { en: "Capex projects", nl: "Capex-projecten" }, value: "64", delta: "+3", good: true },
      { label: { en: "Turnaround readiness", nl: "Turnaround-gereedheid" }, value: "88%", delta: "+4%", good: true },
      { label: { en: "Data quality score", nl: "Datakwaliteitsscore" }, value: "96", delta: "+2", good: true },
      { label: { en: "Milestones at risk", nl: "Mijlpalen met risico" }, value: "9", delta: "+2", good: false },
    ],
  },
  {
    id: "financial",
    code: "FIN-06",
    tier: "Diamond",
    name: { en: "Financial & regulated networks", nl: "Financiële & gereguleerde netwerken" },
    short: {
      en: "Change portfolios where data may never leave the corporate firewall.",
      nl: "Veranderportfolio's waarbij data nooit buiten de bedrijfsfirewall mag komen.",
    },
    pains: {
      en: [
        "Cloud AI tooling blocked by information-security policy",
        "Regulatory change programmes with hard, external deadlines",
        "Evidence for auditors assembled manually across systems",
      ],
      nl: [
        "Cloud-AI-tooling geblokkeerd door informatiebeveiligingsbeleid",
        "Regelgevingsprogramma's met harde, externe deadlines",
        "Bewijsmateriaal voor auditors handmatig verzameld uit systemen",
      ],
    },
    focus: {
      en: [
        "100% on-premise deployment, zero public cloud routing",
        "Offline conversational assistant over internal data only",
        "Cell-level RBAC with automated masking of sensitive figures",
      ],
      nl: [
        "100% on-premise uitrol, geen enkele publieke cloudroutering",
        "Offline conversationele assistent, uitsluitend op interne data",
        "RBAC tot celniveau met automatische maskering van gevoelige cijfers",
      ],
    },
    kpis: [
      { label: { en: "Regulatory deadlines met", nl: "Deadlines gehaald" }, value: "100%", delta: "0 missed", good: true },
      { label: { en: "Data leaving network", nl: "Data buiten netwerk" }, value: "0 B", delta: "sealed", good: true },
      { label: { en: "Change initiatives", nl: "Veranderinitiatieven" }, value: "212", delta: "+18", good: true },
      { label: { en: "Escalations open", nl: "Open escalaties" }, value: "6", delta: "-2", good: true },
    ],
  },
];

export const getSector = (id: string) => sectors.find((s) => s.id === id);

export const COMMAND_CENTER_URL = "https://pjmak-command-center.ai.studio/";
