const inputBx = document.querySelector(".input-box");
const fontList = document.querySelector("#fontList");
const active = document.querySelector(".active");

// Your original classes
const styles = [
  "editorial-serif",
  "silk-monospace",
  "whispering-script",
  "small-caps-spaced",
  "circled-minimal",
  "fraktur-archival",
  "double-struck",
];

let count = 0;

inputBx.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    const text = inputBx.value;

    if (!text) return;

    createFontCard(text);
    console.log("Text: ", inputBx.value);
  }
});

function createFontCard(text) {
  console.log("drive: ", text);

  styles.forEach((style) => {
    count++;
    console.log(count);
    const tile = document.createElement("div");
    tile.className = "font-card";
    tile.innerHTML = `
        <div class="font-card">
            <div class="font-card-header">
                <div class="font-title">
                    <span class="dot"></span> ${style}
                </div>
                <div class="font-meta">Claude: Bookish & Book</div>
                <div class="font-actions">
                    <button>⬇</button>
                    <button>♡</button>
                </div>
            </div>
            <div class="font-preview ${style}">
                ${text}
            </div>
            <div class="font-footer">
                <span>Uncode Elegant Italic Serif</span>
                <button>📋 Copy</button>
            </div>
        </div> 
    `;
    fontList.appendChild(tile);
  });
  active.textContent = `All(${count})`;
}

const themeToggle = document.querySelector("#themeToggle");

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", next);
  themeToggle.textContent = next === "dark" ? "☾" : "☀";
  localStorage.setItem("theme", next);
});

const buttons = document.querySelectorAll(".formatting-row");

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const btnId = e.target.id;

    if (btnId === c) {
        inputBx.textContent = '';
    
    }

    console.log(btnId);
  });
});
