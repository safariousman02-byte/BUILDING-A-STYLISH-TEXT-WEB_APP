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

const savedList = document.getElementById("savedList");

function getSavedFonts() {
  const saved = localStorage.getItem("savedArray");
  return saved ? JSON.parse(saved) : [];
}

function saveFonts(fonts) {
  localStorage.setItem("savedArray", JSON.stringify(fonts));
}

function timeAgo(iso) {
  // 1. How many seconds have passed since that time?
  const seconds = Math.floor((Date.now() - new Date(iso)) / 1000);

  // 2. Return the biggest unit that fits.
  if (seconds < 60) return "just now";

  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins}m ago`;

  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;

  return `${Math.floor(hrs / 24)}d ago`;
}

function renderSaved() {
  const saved = getSavedFonts();

  savedList.innerHTML = "";

  if (saved.length === 0) {
    savedList.innerHTML = `
        <div class="empty-state">
            <span class="material-symbols-outlined">bookmark_border</span>
            <h3>No saved fonts yet!..</h3>
            <p>Tap the star on the font card to save it here.</p>
        </div>
    `;

    const exportBtn = document.querySelector(".exportBtn");
    const clearBtn = document.querySelector(".clearBtn");
    if (exportBtn) exportBtn.disabled = true;
    if (clearBtn) clearBtn.disabled = true;

    return;
  }

  saved.forEach((item) => {
    const card = document.createElement("div");
    card.className = "saved-card";

    card.innerHTML = `
        <div class="saved-tags">
            <span class="tag">${item.styleName}</span>
            <span class="tag">Saved ${timeAgo(item.savedAt)}</span>
        </div>

        <h3>${item.styleName}</h3>

        <div class="saved-preview" style="font-family: ${item.css}; font-style: ${item.italic ? "italic" : "normal"};">
        ${item.converted}
      </div> 
        
        <div class="saved-actions">
            <button class="copy-saved">
            <span class="material-symbols-outlined">content_copy</span>
            1-Tap copy
        </button>
        <button class="icon-btn delete-saved">
            <span class="material-symbols-outlined">delete</span>
        </button>
        </div>
      
    `;

    const copyBtn = card.querySelector(".copy-saved");
    copyBtn.addEventListener("click", () => {
      copySaved(item.converted, copyBtn);
    });

    const exportBtn = document.querySelector(".exportBtn");
    const clearBtn = document.querySelector(".clearBtn");
    if (exportBtn) exportBtn.disabled = false;
    if (clearBtn) clearBtn.disabled = false;

    const deleteBtn = card.querySelector(".delete-saved");
    deleteBtn.addEventListener("click", () => {
      deleteSaved(item.id);
    });

    savedList.appendChild(card);
  });
}

async function copySaved(text, btn) {
  try {
    await navigator.clipboard.writeText(text);
    const original = btn.innerHTML;
    btn.innerHTML = `
            <span class="material-symbols-outlined">check</span>
            Copied!
        `;

    setTimeout(() => {
      btn.innerHTML = original;
    }, 1500);
  } catch (err) {
    console.log("Copy failed: ", err);
  }
}

function deleteSaved(id) {
  let saved = getSavedFonts();

  saved = saved.filter((f) => f.id !== id);

  saveFonts(fonts);

  renderSaved();
}
renderSaved();

const exportBtn = document.querySelector(".exportBtn");

if (exportBtn) {
  exportBtn.addEventListener("click", () => {
    const saved = getSavedFonts();

    if (saved.length === 0) {
      alert("Nothing to export!..");
      return;
    }

    const jsonText = JSON.stringify(saved, null, 2);
    const blob = new Blob([jsonText], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `glyph-and-silk-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  });
}

const clearBtn = document.querySelector(".clearBtn");

if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    if (
      !confirm(
        "This action will clear all your history? Do you want to proceed!..",
      )
    ) {
      return;
    }

    localStorage.removeItem("savedArray");
    renderSaved();
  });
}

console.log(localStorage.length);
