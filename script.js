const inputBx = document.querySelector(".input-box");
const fontList = document.querySelector("#fontList");

const styles = [
  "editorial-serif",
  "silk-monospace",
  "whispering-script",
  "small-caps-spaced",
  "circled-minimal",
  "fraktur-archival",
  "double-struck",
];

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
    const tile = document.createElement("div");
    tile.className = "font-card";
    tile.innerHTML = `
        <div class="font-card">
            <div class="font-card-header">
                <div class="font-title">
                    <span class="dot"></span> Editorial Serif
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
}
