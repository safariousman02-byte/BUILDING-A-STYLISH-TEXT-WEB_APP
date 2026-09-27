const inputBx = document.querySelector(".input-box");
const fontList = document.querySelector("#fontList");
const active = document.querySelector(".active");

const styles = [
  // Elegant Script
  "Dancing Script",
  "Great Vibes",
  "Allura",
  "Parisienne",
  "Alex Brush",
  "Sacramento",
  "Pacifico",
  "Italianno",
  "Mrs Saint Delafield",
  "Yellowtail",
  "Marck Script",
  "Petit Formal Script",
  "Rouge Script",
  "Bad Script",

  // Handwritten
  "Caveat",
  "Kalam",
  "Shadows Into Light",
  "Permanent Marker",
  "Indie Flower",
  "Amatic SC",
  "Architects Daughter",
  "Gochi Hand",
  "Homemade Apple",
  "Reenie Beanie",
  "Nanum Pen Script",

  // Display / Bold
  "Anton",
  "Bebas Neue",
  "Archivo Black",
  "Passion One",
  "Alfa Slab One",
  "Sigmar One",
  "Righteous",
  "Bowlby One",
  "Rammetto One",
  "Fjalla One",
  "Oswald",
  "Paytone One",
  "Shrikhand",
  "Titan One",
  "Fredoka",
  "Bungee",
  "Bungee Shade",
  "Bungee Inline",
  "Bungee Outline",

  // Graffiti / Street
  "Boogaloo",
  "Bangers",
  "Luckiest Guy",
  "Rock Salt",

  // Neon / Retro
  "Monoton",
  "Neonderthaw",

  // Bubble / Rounded
  "Baloo 2",
  "Bubblegum Sans",
  "Chewy",
  "Sniglet",
  "Varela Round",
  "Ranchers",
  "Mochiy Pop One",
  "Coiny",
  "Concert One",

  // Horror
  "Creepster",
  "Nosifer",
  "Butcherman",
  "Eater",
  "Vampiro One",
  "Metal Mania",

  // Circus
  "Fascinate",
  "Fascinate Inline",

  // Quirky
  "Faster One",
  "Wallpoet",
  "Codystar",
  "Kranky",
  "Freckle Face",
  "Nova Mono",
  "Jacques Francois Shadow",
  "Miltonian",
  "Miltonian Tattoo",
  "Pirata One",
  "UnifrakturCook",
  "UnifrakturMaguntia",
  "Almendra SC",
  "Redacted Script",

  // Stencil
  "Stardos Stencil",
  "Modak",
  "Passero One",

  // Elegant Serif
  "Playfair Display",
  "Cormorant Garamond",
  "Bodoni Moda",
  "DM Serif Display",
  "Cinzel",
  "Cinzel Decorative",

  // Modern Sans
  "Inter",
  "Space Grotesk",
  "Syne",
  "Outfit",
  "Sora",
  "Unbounded",
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

  fontList.innerHTML = ""; // Clear old cards
  count = 0;

  styles.forEach((style) => {
    count++;
    const tile = document.createElement("div");
    tile.className = "font-card";
    tile.innerHTML = `
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
            <div class="font-preview" style="font-family: '${style}', sans-serif; font-size: 18px;">
                ${text}
            </div>
            <div class="font-footer">
                <span>Uncode Elegant Italic Serif</span>
                <button>📋 Copy</button>
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
      inputBx.textContent = "";
    }

    console.log(btnId);
  });
});

console.log(
  "%cRed %cBlue %cGreen",
  "color: red; font-size: 20px;",
  "color: blue; font-size: 20px; font-family: 'Anton';",
  "color: green; font-size: 20px; font-family: 'Caveat';",
);
