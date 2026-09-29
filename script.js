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
  themeToggle.textContent = theme === "dark" ? "☾" : "☀";
}

applyTheme(getTheme());

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";

  applyTheme(next);

  localStorage.setItem("theme", next);
});

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });

console.log(
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
);

const textInput = document.querySelector("#textInput");
const fontList = document.querySelector("#fontList");

const styles = [
  { name: "Playfair Display", css: "'Playfair Display', serif", italic: false },
  { name: "Editorial Serif", css: "'Playfair Display', serif", italic: true },
  { name: "Dancing Script", css: "'Dancing Script', cursive", italic: false },
  { name: "Fira Code", css: "'Fira Code', monospace", italic: false },
  { name: "Space Grotesk", css: "'Space Grotesk', sans-serif", italic: false },
  { name: "DM Serif Display", css: "'DM Serif Display', serif", italic: false },
  // Add more fonts here
];

function generateFontText(text) {
  fontList.innerHTML = "";

  styles.forEach((style) => {
    const card = document.createElement("div");

    card.className = "font-card";

    card.innerHTML = `
        <div class="font-card-header">
          <div class="font-title">
            <span class="dot"></span> ${style.name}
          </div>
          <div class="font-actions">
            <button class="copy-card">
              <span class="material-symbols-outlined">content_copy</span>
            </button>
          </div>
        </div>
        <div class="font-preview" style="font-family: ${style.css}; font-style:${style.italic ? "italic" : "normal"};">
          ${text}
        </div>
      `;
    fontList.appendChild(card);
  });
}

textInput.addEventListener("input", (e) => {
  const tex = e.target.value.trim();
  console.log(tex);

  if (tex === "") {
    fontList.innerHTML = "";
    console.log("no text");

    return;
  }
  console.log("text entered");

  generateFontText(tex);
});

window.addEventListener("DOMContentLoaded", () => {
  const defaultText = "Ethereal moments in morning light ✨";
  textInput.value = defaultText;
  generateFontText(defaultText);
});
