const DATA_URL = "./data/news.json";

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
        "Wettbewerbsradar für Türsysteme, Feststellanlagen und angrenzende Sicherheitslösungen.",
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

const FALLBACK_DATA = {
  generatedAt: "2026-04-20T09:00:00Z",
  sourceMode: "fallback",
  itemsByTopic: {
    atb: [],
    pfs: [],
    doors: [],
    trends: []
  }
};

const state = {
  section: "competition",
  topicId: "atb",
  search: "",
  refreshMinutes: 15,
  timer: null,
  allItemsByTopic: structuredClone(FALLBACK_DATA.itemsByTopic),
  generatedAt: FALLBACK_DATA.generatedAt,
  sourceMode: FALLBACK_DATA.sourceMode
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

async function init() {
  bindEvents();
  renderSectionNav();
  renderTopicButtons();
  els.refreshSelect.value = String(state.refreshMinutes);
  applyRefreshTimer();
  await loadFeed();
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
}

function setSection(section) {
  state.section = section;
  const firstTopic = TOPICS[section][0];
  state.topicId = firstTopic.id;
  els.sectionSelect.value = section;
  renderSectionNav();
  renderTopicButtons();
  render();
}

function setTopic(topicId) {
  state.topicId = topicId;
  renderTopicButtons();
  render();
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

async function loadFeed(force = false) {
  try {
    const url = new URL(DATA_URL, window.location.href);
    if (force) {
      url.searchParams.set("ts", Date.now().toString());
    }

    const response = await fetch(url.toString(), {
      cache: "no-store",
      headers: { Accept: "application/json" }
    });

    if (!response.ok) {
      throw new Error(`Feed nicht erreichbar: ${response.status}`);
    }

    const data = await response.json();
    state.allItemsByTopic = normalizeItemsByTopic(data.itemsByTopic);
    state.generatedAt = data.generatedAt || new Date().toISOString();
    state.sourceMode = data.sourceMode || "live";
  } catch (error) {
    console.error(error);
    state.allItemsByTopic = structuredClone(FALLBACK_DATA.itemsByTopic);
    state.generatedAt = new Date().toISOString();
    state.sourceMode = "fallback";
  }

  updateMeta();
  render();
}

function normalizeItemsByTopic(itemsByTopic) {
  const normalized = {};
  for (const topic of [...TOPICS.competition, ...TOPICS.trends]) {
    normalized[topic.id] = Array.isArray(itemsByTopic?.[topic.id]) ? itemsByTopic[topic.id] : [];
  }
  return normalized;
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
      label: "Feed-Modus",
      value: state.sourceMode === "fallback" ? "Fallback" : "Live",
      text: state.sourceMode === "fallback" ? "Es konnten keine aktuellen Daten geladen werden." : "Die Seite nutzt den erzeugten GitHub-Feed."
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
                : `<span class="news-link">Kein Link verfügbar</span>`
            }
          </div>
        </article>
      `;
    })
    .join("");
}

function getFilteredItems() {
  const rawItems = state.allItemsByTopic[state.topicId] || [];
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

function applyRefreshTimer() {
  if (state.timer) {
    window.clearInterval(state.timer);
    state.timer = null;
  }

  state.timer = window.setInterval(() => {
    loadFeed(true);
  }, state.refreshMinutes * 60 * 1000);
}

function updateMeta() {
  els.lastUpdatedText.textContent = `Feed-Stand: ${formatDateTime(state.generatedAt)}`;
  els.modeLabel.textContent = state.sourceMode === "fallback" ? "Fallback" : "Live";
  els.statusBadge.textContent =
    state.sourceMode === "fallback"
      ? "Fallback-Daten aktiv"
      : "Aktualisiert per GitHub Actions";
  els.refreshState.textContent = `Automatisch alle ${state.refreshMinutes} Min.`;
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
