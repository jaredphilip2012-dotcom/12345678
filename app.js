const STORAGE_KEY = "quorzyx_tips";

const seedTips = [
  {
    id: crypto.randomUUID(),
    author: "Maya",
    title: "I Built a Buy Plan Before Market Open",
    focus: "Stocks",
    experience: "5-9 years",
    tip: "I pre-define entry points the night before. It keeps me from chasing hype during the trading day.",
    createdAt: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    author: "Derek",
    title: "ETF Dollar-Cost Averaging Helped My Nerves",
    focus: "ETFs",
    experience: "2-4 years",
    tip: "Small weekly contributions reduced stress and stopped me from trying to perfectly time the market.",
    createdAt: new Date().toISOString()
  }
];

const form = document.getElementById("tip-form");
const statusEl = document.getElementById("form-status");
const tipFeed = document.getElementById("tip-feed");
const clearBtn = document.getElementById("clear-tips");

function loadTips() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedTips));
    return [...seedTips];
  }

  try {
    const tips = JSON.parse(raw);
    return Array.isArray(tips) ? tips : [];
  } catch {
    return [];
  }
}

function saveTips(tips) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tips));
}

function renderTips() {
  const tips = loadTips().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  tipFeed.innerHTML = "";

  if (!tips.length) {
    tipFeed.innerHTML = '<p class="empty">No posts yet. Be the first investor to share a tip.</p>';
    return;
  }

  tips.forEach((tip) => {
    const card = document.createElement("article");
    card.className = "tip-card";
    card.innerHTML = `
      <p class="tip-meta">${escapeHtml(tip.author)} • ${escapeHtml(tip.focus)} • ${escapeHtml(tip.experience)}</p>
      <h3 class="tip-title">${escapeHtml(tip.title)}</h3>
      <p class="tip-text">${escapeHtml(tip.tip)}</p>
    `;
    tipFeed.appendChild(card);
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  statusEl.textContent = "";

  if (!form.checkValidity()) {
    statusEl.textContent = "Please complete all required fields and accept the posting statement.";
    return;
  }

  const data = new FormData(form);
  const tip = {
    id: crypto.randomUUID(),
    author: data.get("author").toString().trim(),
    title: data.get("title").toString().trim(),
    focus: data.get("focus").toString(),
    experience: data.get("experience").toString(),
    tip: data.get("tip").toString().trim(),
    createdAt: new Date().toISOString()
  };

  const tips = loadTips();
  tips.push(tip);
  saveTips(tips);

  form.reset();
  statusEl.textContent = "Tip posted.";
  renderTips();
});

clearBtn.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  statusEl.textContent = "Local feed reset.";
  renderTips();
});

renderTips();
