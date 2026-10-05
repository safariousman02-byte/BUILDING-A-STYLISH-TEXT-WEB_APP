// ============================================================
// THEME MANAGER (same as other pages)
// ============================================================
const themeToggle = document.getElementById("themeToggle");

function getTheme() {
  const saved = localStorage.getItem("theme");
  if (saved) return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const icon = themeToggle?.querySelector(".material-symbols-outlined");
  if (icon) icon.textContent = theme === "dark" ? "dark_mode" : "light_mode";
}

applyTheme(getTheme());

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("theme", next);
  });
}

// ============================================================
// LOAD SAVED FONTS
// ============================================================
const savedList = document.getElementById("savedList");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");

function getSavedFonts() {
  const saved = localStorage.getItem("glyphSavedFonts");
  return saved ? JSON.parse(saved) : [];
}

function saveFonts(fonts) {
  localStorage.setItem("glyphSavedFonts", JSON.stringify(fonts));
}

function renderSaved(filter = "") {
  const fonts = getSavedFonts().filter((f) =>
    f.text.toLowerCase().includes(filter.toLowerCase()),
  );

  savedList.innerHTML = "";

  if (fonts.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  fonts.forEach((font) => {
    const card = document.createElement("div");
    card.className = "saved-card";

    card.innerHTML = `
      <div class="saved-tags">
        <span class="tag">${font.styleName}</span>
        <span class="tag">Saved ${timeAgo(font.savedAt)}</span>
      </div>

      <h3>${font.text}</h3>

      <div class="saved-preview" style="font-family: ${font.css}; font-style: ${font.italic ? "italic" : "normal"};">
        ${font.converted}
      </div>

      <div class="saved-actions">
        <button class="copy-saved" data-id="${font.id}">
          <span class="material-symbols-outlined">content_copy</span>
          1-Tap Copy
        </button>
        <button class="icon-btn share-saved">
          <span class="material-symbols-outlined">ios_share</span>
        </button>
        <button class="icon-btn duplicate-saved">
          <span class="material-symbols-outlined">content_copy</span>
        </button>
        <button class="icon-btn delete-saved" data-id="${font.id}">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </div>
    `;

    // Copy button
    card.querySelector(".copy-saved").addEventListener("click", (e) => {
      copySaved(font.converted, e.currentTarget);
    });

    // Delete button
    card.querySelector(".delete-saved").addEventListener("click", (e) => {
      deleteSaved(font.id, e.currentTarget);
    });

    savedList.appendChild(card);
  });
}

// ============================================================
// ACTIONS
// ============================================================
async function copySaved(text, btn) {
  try {
    await navigator.clipboard.writeText(text);
    const original = btn.innerHTML;
    btn.innerHTML = `<span class="material-symbols-outlined">check</span> Copied!`;
    setTimeout(() => (btn.innerHTML = original), 1500);
  } catch (err) {
    console.error("Copy failed:", err);
  }
}

function deleteSaved(id, btn) {
  if (!confirm("Remove this font from your collection?")) return;

  let fonts = getSavedFonts();
  fonts = fonts.filter((f) => f.id !== id);
  saveFonts(fonts);

  // Animate out
  btn.closest(".saved-card").style.opacity = "0";
  btn.closest(".saved-card").style.transform = "scale(0.95)";

  setTimeout(() => renderSaved(searchInput.value), 200);
}

function timeAgo(iso) {
  const seconds = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (seconds < 60) return "just now";
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

// ============================================================
// SEARCH
// ============================================================
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    renderSaved(e.target.value);
  });
}

// ============================================================
// INIT
// ============================================================
renderSaved();
