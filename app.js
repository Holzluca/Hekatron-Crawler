const NEWS_ENDPOINT = ""; // z. B. "/api/news" oder volle URL. Leer = Demo-Daten.

const TOPICS = {
  competition: [
    {
      id: "atb",
      label: "BU ATB",
      short: "Brandmeldetechnik / Wettbewerb",
      description:
        "Wettbewerbsradar für die Business Unit ATB mit Fokus auf Lösungen, Produktneuheiten, Partnerschaften, Vertriebsaktivitäten und Marktsignale der relevanten Hersteller.",
      competitors: ["Honeywell", "Siemens", "Bosch", "NSC", "detectomat"]
    },
    {
      id: "pfs",
      label: "BU PFS",
      short: "Rauchwarnmelder / Wettbewerb",
      description:
        "Wettbewerbsradar für die Business Unit PFS mit Blick auf Residential Safety, Produktlancierungen, Smart-Home-Anbindungen, Zertifizierungen und Channel-News.",
      competitors: ["Ei", "Hager", "Pyrexx", "X-Sense", "Bosch"]
    },
    {
      id: "doors",
      label: "BU Türen & Feststellanlagen",
      short: "Türsysteme / Wettbewerb",
      description:
        "Wettbewerbsradar für Türsysteme, Feststellanlagen und angrenzende Sicherheitslösungen. Den Namen der Business Unit kannst du hier im Code jederzeit leicht anpassen.",
      competitors: ["Dictator", "Protronic", "Hörmann", "GEZE", "Argus Security", "Apollo"]
    }
  ],
  trends: [
    {
      id: "trends",
      label: "Markttrends mit Einfluss auf Hekatron",
      short: "Makro- und Branchentrends",
      description:
        "Trendbeobachtung übergreifend für alle Business Units. Fokus auf Regulierung, Digitalisierung, KI, Retrofit, Energieeffizienz, Gebäudeautomation und veränderte Kundenanforderungen.",
      competitors: [
        "Smart Building",
        "KI & Analytics",
        "Normen & Regulierung",
        "Retrofit",
        "Cybersecurity",
        "Nachhaltigkeit"
      ]
    }
  ]
};

const DEMO_DATA = {
  atb: [
    {
      title: "Siemens positioniert neue Cloud-Services für Fire Safety im Gebäudebetrieb",
      source: "Siemens / Demo",
      publishedAt: "2026-04-18T09:20:00Z",
      summary: "Hinweise auf stärkere Service- und Plattform-Argumentation im B2B-Vertrieb. Relevant für Differenzierung über Lifecycle-Mehrwert.",
      url: "#",
      tags: ["Siemens", "Service", "Cloud"]
    },
    {
      title: "Honeywell erweitert Integrationsstory zwischen Brandmeldung und Building Operations",
      source: "Honeywell / Demo",
      publishedAt: "2026-04-16T11:15:00Z",
      summary: "Stärkere Positionierung über Integration und Betreiber-Mehrwert. Vertriebsseitig relevant für komplexe Gebäudeprojekte.",
      url: "#",
      tags: ["Honeywell", "Integration", "Building"]
    },
    {
      title: "Bosch betont Cybersecurity und Remote Services in Sicherheitslösungen",
      source: "Bosch / Demo",
      publishedAt: "2026-04-14T08:10:00Z",
      summary: "Cybersecurity wird als Kaufargument im Sicherheitsumfeld sichtbarer. Relevanz für Ausschreibungen und IT-nahe Ansprechpartner.",
      url: "#",
      tags: ["Bosch", "Cybersecurity", "Remote"]
    },
    {
      title: "detectomat kommuniziert Projektkompetenz im industriellen Umfeld",
      source: "detectomat / Demo",
      publishedAt: "2026-04-12T13:00:00Z",
      summary: "Projektberichte und Referenzen erhöhen Sichtbarkeit im Ausschreibungsumfeld. Interessant für Vertriebsargumentation und Use Cases.",
      url: "#",
      tags: ["detectomat", "Referenz", "Industrie"]
    }
  ],
  pfs: [
    {
      title: "X-Sense hebt App-Anbindung und Verbrauchernähe in neuer Kampagne hervor",
      source: "X-Sense / Demo",
      publishedAt: "2026-04-19T07:35:00Z",
      summary: "Consumer-orientierte Kommunikation mit Fokus auf Usability und Vernetzung. Relevant für Differenzierung im Residential-Markt.",
      url: "#",
      tags: ["X-Sense", "App", "Consumer"]
    },
    {
      title: "Pyrexx fokussiert Wartungsarmut und Wohnungswirtschaft",
      source: "Pyrexx / Demo",
      publishedAt: "2026-04-17T10:30:00Z",
      summary: "Argumentation über Betriebskosten und Bestandsgeschäft. Besonders relevant für institutionelle Kunden und Modernisierung.",
      url: "#",
      tags: ["Pyrexx", "Wohnungswirtschaft", "Retrofit"]
    },
    {
      title: "Ei betont Produktzuverlässigkeit und Normenkonformität",
      source: "Ei / Demo",
      publishedAt: "2026-04-15T09:40:00Z",
      summary: "Starke Positionierung über Verlässlichkeit und Compliance. Das stärkt vor allem Gespräche mit Fachpartnern und Entscheidergruppen.",
      url: "#",
      tags: ["Ei", "Normen", "Qualität"]
    },
    {
      title: "Hager-nahe Vertriebsbotschaften bleiben in Smart-Building-Narrativen sichtbar",
      source: "Hager / Demo",
      publishedAt: "2026-04-11T12:25:00Z",
      summary: "Auch bei verändertem Portfolio bleibt die Marke in angrenzenden Systemargumenten relevant. Nützlich für Einordnung im Beratungsgespräch.",
      url: "#",
      tags: ["Hager", "Smart Building", "Systemwelt"]
    }
  ],
  doors: [
    {
      title: "GEZE betont barrierefreie Gebäudezugänge und smarte Türsysteme",
      source: "GEZE / Demo",
      publishedAt: "2026-04-18T06:50:00Z",
      summary: "Barrierefreiheit, Komfort und Gebäudeautomation verschmelzen stärker. Relevanz für kombinierte Sicherheits- und Komfortargumentation.",
      url: "#",
      tags: ["GEZE", "Barrierefreiheit", "Automation"]
    },
    {
      title: "Hörmann erweitert Sichtbarkeit im Bereich automatische Zutritts- und Torlösungen",
      source: "Hörmann / Demo",
      publishedAt: "2026-04-17T14:10:00Z",
      summary: "Systemlösungen und starke Marke bleiben zentrale Hebel. Besonders relevant für Projekte mit angrenzender Gebäudehülle und Zugang.",
      url: "#",
      tags: ["Hörmann", "Zutritt", "Systemlösung"]
    },
    {
      title: "Dictator kommuniziert Spezialisierung in Türschließ- und Dämpfungslösungen",
      source: "Dictator / Demo",
      publishedAt: "2026-04-14T08:40:00Z",
      summary: "Nischenkompetenz kann im Projektgeschäft ein differenzierender Faktor sein. Wichtig für genaue Wettbewerbsabgrenzung.",
      url: "#",
      tags: ["Dictator", "Türtechnik", "Projektgeschäft"]
    },
    {
      title: "Apollo und angrenzende Sicherheitsanbieter setzen auf Integration und Vernetzung",
      source: "Apollo / Demo",
      publishedAt: "2026-04-10T15:20:00Z",
      summary: "Offene Schnittstellen und systemische Einbindung bleiben zentrale Markttrends in sicherheitsnahen Anwendungen.",
      url: "#",
      tags: ["Apollo", "Integration", "Schnittstellen"]
    }
  ],
  trends: [
    {
      title: "Retrofit-Welle in Bestandsgebäuden erhöht Nachfrage nach wirtschaftlichen Modernisierungslösungen",
      source: "Trendmonitor / Demo",
      publishedAt: "2026-04-19T08:00:00Z",
      summary: "Bestandsobjekte treiben Investitionen in Nachrüstung, vereinfachte Installation und Lifecycle-Argumentation. Das betrifft alle Business Units direkt.",
      url: "#",
      tags: ["Retrofit", "Bestand", "Wachstum"]
    },
    {
      title: "Cybersecurity wird im Gebäude- und Sicherheitsumfeld zum verbindlichen Kaufkriterium",
      source: "Trendmonitor / Demo",
      publishedAt: "2026-04-17T07:45:00Z",
      summary: "IT-Sicherheit und Update-Fähigkeit beeinflussen zunehmend Ausschreibungen, Integrationsarchitektur und Herstellervertrauen.",
      url: "#",
      tags: ["Cybersecurity", "Ausschreibung", "Vertrauen"]
    },
    {
      title: "KI-gestützte Erkennung und datenbasierte Services verschieben die Value Proposition",
      source: "Trendmonitor / Demo",
      publishedAt: "2026-04-15T09:00:00Z",
      summary: "Hersteller verkaufen nicht nur Hardware, sondern Service-Level, Monitoring und datengetriebene Mehrwerte. Das verändert Vertriebsgespräche.",
      url: "#",
      tags: ["KI", "Analytics", "Service"]
    },
    {
      title: "Normen, ESG und Betreiberpflichten erhöhen den Druck auf dokumentierte Sicherheit",
      source: "Trendmonitor / Demo",
      publishedAt: "2026-04-12T10:10:00Z",
      summary: "Compliance, Transparenz und Nachweisführung werden stärker Teil der Wertargumentation gegenüber Betreibern und Partnern.",
      url: "#",
      tags: ["Normen", "ESG", "Compliance"]
    }
  ]
};

const state = {
  section: "competition",
  topicId: "atb",
  search: "",
  refreshMinutes: 15,
  timer: null,
  items: []
};

const els = {
  searchInput: document.getElementById("searchInput"),
  sectionSelect: document.getElementById("sectionSelect"),
  refreshSelect: document.getElementById("refreshSelect"),
  topicButtons: document.getElementById("topicButtons"),
  newsGrid: document.getElementById("newsGrid"),
  emptyState: document.getElementById("emptyState"),
  currentSectionKicker: document.getElementById("currentSectionKicker"),
  currentSectionTitle: document.getElementById("currentSectionTitle"),
  currentSectionDescription: document.getElementById("currentSectionDescription"),
  summaryGrid: document.getElementById("summaryGrid"),
  resultsCounter: document.getElementById("resultsCounter"),
  lastUpdatedText: document.getElementById("lastUpdatedText"),
  modeLabel: document.getElementById("modeLabel"),
  refreshState: document.getElementById("refreshState"),
  sectionLabel: document.getElementById("sectionLabel"),
  topicLabel: document.getElementById("topicLabel"),
  statusBadge: document.getElementById("statusBadge"),
  competitionNavWrap: document.getElementById("competitionNavWrap"),
  trendSidebarCard: document.getElementById("trendSidebarCard")
};

function init() {
  bindEvents();
  renderSectionNav();
  renderTopicButtons();
  loadItems();
}

function bindEvents() {
  document.querySelectorAll(".nav-btn").forEach((button) => {
    button.addEventListener("click", () => {
      setSection(button.dataset.section);
    });
  });

  els.sectionSelect.addEventListener("change", (event) => {
    setSection(event.target.value);
  });

  els.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value.trim().toLowerCase();
    render();
  });

  els.refreshSelect.addEventListener("change", (event) => {
    state.refreshMinutes = Number(event.target.value);
    applyRefreshTimer();
    updateMeta();
  });

  els.reloadBtn.addEventListener("click", () => {
    loadItems();
  });
}

function setSection(section) {
  state.section = section;
  const firstTopic = TOPICS[section][0];
  state.topicId = firstTopic.id;
  els.sectionSelect.value = section;
  renderSectionNav();
  renderTopicButtons();
  loadItems();
}

function setTopic(topicId) {
  state.topicId = topicId;
  renderTopicButtons();
  loadItems();
}

function renderSectionNav() {
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.section === state.section);
  });

  const isCompetition = state.section === "competition";
  els.competitionNavWrap.classList.toggle("hidden", !isCompetition);
  els.trendSidebarCard.classList.toggle("hidden", isCompetition);
}

function renderTopicButtons() {
  const topics = TOPICS[state.section];
  els.topicButtons.innerHTML = topics
    .map((topic) => {
      const competitorText = topic.competitors.join(" · ");
      return `
        <button class="topic-btn ${topic.id === state.topicId ? "active" : ""}" data-topic-id="${topic.id}" type="button">
          <strong>${escapeHtml(topic.label)}</strong>
          <span>${escapeHtml(competitorText)}</span>
        </button>
      `;
    })
    .join("");

  els.topicButtons.querySelectorAll(".topic-btn").forEach((button) => {
    button.addEventListener("click", () => {
      setTopic(button.dataset.topicId);
    });
  });
}

async function loadItems() {
  const topic = getCurrentTopic();
  const demoItems = DEMO_DATA[topic.id] ?? [];

  if (!NEWS_ENDPOINT) {
    state.items = demoItems;
    updateMeta(true);
    render();
    return;
  }

  try {
    const url = new URL(NEWS_ENDPOINT, window.location.origin);
    url.searchParams.set("topicId", topic.id);
    url.searchParams.set("section", state.section);
    url.searchParams.set("query", state.search || "");
    url.searchParams.set("limit", "12");

    const response = await fetch(url.toString(), {
      headers: { Accept: "application/json" }
    });

    if (!response.ok) {
      throw new Error(`API-Fehler: ${response.status}`);
    }

    const data = await response.json();
    state.items = Array.isArray(data.items) ? data.items : demoItems;
    updateMeta(false);
  } catch (error) {
    console.error(error);
    state.items = demoItems;
    updateMeta(true, true);
  }

  render();
}

function render() {
  const topic = getCurrentTopic();
  const items = getFilteredItems();

  els.currentSectionKicker.textContent = state.section === "competition" ? "Wettbewerb" : "Trends";
  els.currentSectionTitle.textContent = topic.label;
  els.currentSectionDescription.textContent = topic.description;
  els.sectionLabel.textContent = state.section === "competition" ? "Wettbewerb" : "Trends";
  els.topicLabel.textContent = topic.label;
  els.resultsCounter.textContent = `${items.length} Einträge`;

  renderSummary(topic, items);
  renderNews(items);
}

function renderSummary(topic, items) {
  const newest = items[0];
  const latestDate = newest ? formatDate(newest.publishedAt) : "-";
  const competitorCount = topic.competitors.length;
  const keywordCount = buildKeywordCount(items);
  const topKeyword = keywordCount.length ? keywordCount[0][0] : "keine";

  const cards = [
    {
      label: state.section === "competition" ? "Wettbewerber im Blick" : "Trendfelder im Blick",
      value: competitorCount,
      text: topic.competitors.join(" · ")
    },
    {
      label: "Neuester Eintrag",
      value: latestDate,
      text: newest ? newest.title : "Noch keine Meldung vorhanden"
    },
    {
      label: "Dominantes Schlagwort",
      value: capitalize(topKeyword),
      text: keywordCount.length ? `${keywordCount[0][1]} Treffer in den aktuellen Einträgen` : "Noch keine Häufung erkennbar"
    },
    {
      label: "Suchstatus",
      value: state.search ? `Filter: ${state.search}` : "Kein Filter",
      text: state.search ? "Die Ergebnisliste ist aktuell gefiltert." : "Alle Einträge des gewählten Bereichs werden gezeigt."
    }
  ];

  els.summaryGrid.innerHTML = cards
    .map(
      (card) => `
        <article class="summary-card">
          <span>${escapeHtml(card.label)}</span>
          <strong>${escapeHtml(String(card.value))}</strong>
          <small>${escapeHtml(card.text)}</small>
        </article>
      `
    )
    .join("");
}

function renderNews(items) {
  const sorted = [...items].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  if (!sorted.length) {
    els.newsGrid.innerHTML = "";
    els.emptyState.classList.remove("hidden");
    return;
  }

  els.emptyState.classList.add("hidden");
  els.newsGrid.innerHTML = sorted
    .map((item) => {
      const chip = item.tags?.[0] || getCurrentTopic().label;
      const link = item.url && item.url !== "#" ? item.url : null;
      return `
        <article class="news-card">
          <div class="news-card-top">
            <span class="news-chip">${escapeHtml(chip)}</span>
            <span class="news-date">${escapeHtml(formatDate(item.publishedAt))}</span>
          </div>
          <h4>${escapeHtml(item.title)}</h4>
          <p>${escapeHtml(item.summary || "Keine Zusammenfassung vorhanden.")}</p>
          <div class="news-card-footer">
            <span class="news-source">${escapeHtml(item.source || "Unbekannte Quelle")}</span>
            ${
              link
                ? `<a class="news-link" href="${escapeAttribute(link)}" target="_blank" rel="noreferrer noopener">Artikel öffnen →</a>`
                : `<span class="news-link">Demo-Eintrag</span>`
            }
          </div>
        </article>
      `;
    })
    .join("");
}

function getFilteredItems() {
  const rawItems = state.items || [];
  if (!state.search) {
    return rawItems;
  }

  return rawItems.filter((item) => {
    const searchBlob = [item.title, item.summary, item.source, ...(item.tags || [])]
      .join(" ")
      .toLowerCase();
    return searchBlob.includes(state.search);
  });
}

function getCurrentTopic() {
  return TOPICS[state.section].find((topic) => topic.id === state.topicId) || TOPICS[state.section][0];
}

function buildKeywordCount(items) {
  const blacklist = new Set([
    "und", "oder", "mit", "für", "der", "die", "das", "den", "dem", "ein", "eine", "einer", "eines",
    "von", "auf", "im", "in", "zu", "am", "an", "als", "bei", "über", "durch", "nach", "noch",
    "wird", "werden", "sind", "ist", "mehr", "neue", "neuer", "neuen", "stärker", "relevant",
    "demo", "hekatron", "news", "markt", "trend", "thema"
  ]);

  const counts = new Map();
  items.forEach((item) => {
    const words = `${item.title} ${item.summary}`
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, " ")
      .split(/\s+/)
      .filter((word) => word.length > 3 && !blacklist.has(word));

    words.forEach((word) => {
      counts.set(word, (counts.get(word) || 0) + 1);
    });
  });

  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

function applyRefreshTimer() {
  if (state.timer) {
    window.clearInterval(state.timer);
    state.timer = null;
  }

  if (!state.refreshMinutes) {
    return;
  }

  state.timer = window.setInterval(() => {
    loadItems();
  }, state.refreshMinutes * 60 * 1000);
}

function updateMeta(isDemo, hadError = false) {
  const now = new Date();
  els.lastUpdatedText.textContent = `Stand: ${formatDateTime(now.toISOString())}`;
  els.modeLabel.textContent = isDemo ? "Demo" : "Live";
  els.statusBadge.textContent = hadError
    ? "API nicht erreichbar – Demo-Fallback aktiv"
    : isDemo
      ? "Lokale Demo-Daten"
      : "Live-Daten vom Feed";
  els.refreshState.textContent = state.refreshMinutes
    ? `Auto-Refresh alle ${state.refreshMinutes} Min.`
    : "Auto-Refresh aus";
}

function formatDate(isoString) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(new Date(isoString));
}

function formatDateTime(isoString) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(isoString));
}

function capitalize(value) {
  if (!value || value === "keine") {
    return value || "keine";
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

init();
