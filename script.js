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
  // ============ ELEGANT SERIF ============
  { name: "Playfair Display", css: "'Playfair Display', serif", italic: false },
  { name: "Playfair Italic", css: "'Playfair Display', serif", italic: true },
  {
    name: "Cormorant Garamond",
    css: "'Cormorant Garamond', serif",
    italic: false,
  },
  {
    name: "Cormorant Italic",
    css: "'Cormorant Garamond', serif",
    italic: true,
  },
  { name: "DM Serif Display", css: "'DM Serif Display', serif", italic: false },
  { name: "DM Serif Italic", css: "'DM Serif Display', serif", italic: true },
  { name: "Bodoni Moda", css: "'Bodoni Moda', serif", italic: false },
  { name: "Prata", css: "'Prata', serif", italic: false },
  { name: "Cinzel", css: "'Cinzel', serif", italic: false },
  {
    name: "Cinzel Decorative",
    css: "'Cinzel Decorative', serif",
    italic: false,
  },

  // ============ BEAUTIFUL SCRIPTS ============
  { name: "Dancing Script", css: "'Dancing Script', cursive", italic: false },
  { name: "Great Vibes", css: "'Great Vibes', cursive", italic: false },
  { name: "Allura", css: "'Allura', cursive", italic: false },
  { name: "Parisienne", css: "'Parisienne', cursive", italic: false },
  { name: "Alex Brush", css: "'Alex Brush', cursive", italic: false },
  { name: "Sacramento", css: "'Sacramento', cursive", italic: false },
  { name: "Pinyon Script", css: "'Pinyon Script', cursive", italic: false },
  { name: "Italianno", css: "'Italianno', cursive", italic: false },
  { name: "Tangerine", css: "'Tangerine', cursive", italic: false },
  {
    name: "Mrs Saint Delafield",
    css: "'Mrs Saint Delafield', cursive",
    italic: false,
  },

  // ============ HANDWRITTEN / CASUAL ============
  { name: "Caveat", css: "'Caveat', cursive", italic: false },
  { name: "Kalam", css: "'Kalam', cursive", italic: false },
  {
    name: "Shadows Into Light",
    css: "'Shadows Into Light', cursive",
    italic: false,
  },
  { name: "Indie Flower", css: "'Indie Flower', cursive", italic: false },
  { name: "Amatic SC", css: "'Amatic SC', cursive", italic: false },
  {
    name: "Architects Daughter",
    css: "'Architects Daughter', cursive",
    italic: false,
  },
  {
    name: "Nanum Pen Script",
    css: "'Nanum Pen Script', cursive",
    italic: false,
  },

  // ============ MODERN SANS ============
  { name: "Inter", css: "'Inter', sans-serif", italic: false },
  { name: "Space Grotesk", css: "'Space Grotesk', sans-serif", italic: false },
  { name: "Syne", css: "'Syne', sans-serif", italic: false },
  { name: "Outfit", css: "'Outfit', sans-serif", italic: false },
  { name: "Sora", css: "'Sora', sans-serif", italic: false },
  { name: "Unbounded", css: "'Unbounded', sans-serif", italic: false },
  { name: "Josefin Sans", css: "'Josefin Sans', sans-serif", italic: false },
  { name: "Poiret One", css: "'Poiret One', cursive", italic: false },
  {
    name: "Julius Sans One",
    css: "'Julius Sans One', sans-serif",
    italic: false,
  },

  // ============ BOLD DISPLAY ============
  { name: "Anton", css: "'Anton', sans-serif", italic: false },
  { name: "Bebas Neue", css: "'Bebas Neue', sans-serif", italic: false },
  { name: "Archivo Black", css: "'Archivo Black', sans-serif", italic: false },
  { name: "Alfa Slab One", css: "'Alfa Slab One', serif", italic: false },
  { name: "Righteous", css: "'Righteous', cursive", italic: false },
  { name: "Bowlby One", css: "'Bowlby One', sans-serif", italic: false },
  { name: "Bungee", css: "'Bungee', cursive", italic: false },
  { name: "Bungee Shade", css: "'Bungee Shade', cursive", italic: false },
  { name: "Monoton", css: "'Monoton', cursive", italic: false },

  // ============ RETRO / NEON ============
  { name: "Orbitron", css: "'Orbitron', sans-serif", italic: false },
  { name: "Audiowide", css: "'Audiowide', cursive", italic: false },
  { name: "Michroma", css: "'Michroma', sans-serif", italic: false },
  { name: "Syncopate", css: "'Syncopate', sans-serif", italic: false },
  {
    name: "Major Mono Display",
    css: "'Major Mono Display', monospace",
    italic: false,
  },

  // ============ GOTHIC / ARCHIVAL ============
  {
    name: "UnifrakturMaguntia",
    css: "'UnifrakturMaguntia', cursive",
    italic: false,
  },
  { name: "Pirata One", css: "'Pirata One', cursive", italic: false },
  { name: "Metamorphous", css: "'Metamorphous', cursive", italic: false },
  { name: "Almendra", css: "'Almendra', serif", italic: false },

  // ============ PLAYFUL / BUBBLE ============
  { name: "Baloo 2", css: "'Baloo 2', cursive", italic: false },
  { name: "Bubblegum Sans", css: "'Bubblegum Sans', cursive", italic: false },
  { name: "Chewy", css: "'Chewy', cursive", italic: false },
  { name: "Sniglet", css: "'Sniglet', cursive", italic: false },
  { name: "Varela Round", css: "'Varela Round', sans-serif", italic: false },
  {
    name: "Mochiy Pop One",
    css: "'Mochiy Pop One', sans-serif",
    italic: false,
  },

  // ============ QUIRKY / UNIQUE ============
  { name: "Bungee Inline", css: "'Bungee Inline', cursive", italic: false },
  { name: "Bungee Outline", css: "'Bungee Outline', cursive", italic: false },
  { name: "Rubik Glitch", css: "'Rubik Glitch', cursive", italic: false },
  { name: "Rubik Moonrocks", css: "'Rubik Moonrocks', cursive", italic: false },
  { name: "Silkscreen", css: "'Silkscreen', cursive", italic: false },
  { name: "Zen Dots", css: "'Zen Dots', cursive", italic: false },
  { name: "Faster One", css: "'Faster One', cursive", italic: false },
  { name: "Wallpoet", css: "'Wallpoet', cursive", italic: false },
  { name: "Codystar", css: "'Codystar', cursive", italic: false },
  { name: "Kranky", css: "'Kranky', cursive", italic: false },
  { name: "Freckle Face", css: "'Freckle Face', cursive", italic: false },
  { name: "Miltonian", css: "'Miltonian', cursive", italic: false },
  { name: "Metal Mania", css: "'Metal Mania', cursive", italic: false },
  { name: "Creepster", css: "'Creepster', cursive", italic: false },
  { name: "Nosifer", css: "'Nosifer', cursive", italic: false },
  { name: "Butcherman", css: "'Butcherman', cursive", italic: false },

  // ============ STENCIL / OUTLINE ============
  { name: "Stardos Stencil", css: "'Stardos Stencil', cursive", italic: false },
  { name: "Modak", css: "'Modak', cursive", italic: false },
  { name: "Passero One", css: "'Passero One', cursive", italic: false },

  // ============ MONOSPACE ============
  { name: "Fira Code", css: "'Fira Code', monospace", italic: false },
  { name: "JetBrains Mono", css: "'JetBrains Mono', monospace", italic: false },
  { name: "Space Mono", css: "'Space Mono', monospace", italic: false },
  { name: "Nova Mono", css: "'Nova Mono', monospace", italic: false },
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
          <div class="font-meta">Typewriter Matrix</div>
          <div class="font-actions">
            <button class="heart-btn">
              <span class="material-symbols-outlined">favorite</span>
            </button>
          </div>
        </div>
        <div class="font-preview" style="font-family: ${style.css}; font-style:${style.italic ? "italic" : "normal"};">
          ${text}
        </div>
        <div class="font-footer">
          <span class="font-desc">Fixed Pitch Unicode glyphs</span>
          <button class="copy-card">
          <span class="material-symbols-outlined">content_copy</span>
          Copy
        </button>
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

const boldMap = {
  a: "𝐚",
  b: "𝐛",
  c: "𝐜",
  d: "𝐝",
  e: "𝐞",
  f: "𝐟",
  g: "𝐠",
  h: "𝐡",
  i: "𝐢",
  j: "𝐣",
  k: "𝐤",
  l: "𝐥",
  m: "𝐦",
  n: "𝐧",
  o: "𝐨",
  p: "𝐩",
  q: "𝐪",
  r: "𝐫",
  s: "𝐬",
  t: "𝐭",
  u: "𝐮",
  v: "𝐯",
  w: "𝐰",
  x: "𝐱",
  y: "𝐲",
  z: "𝐳",
  A: "𝐀",
  B: "𝐁",
  C: "𝐂",
  D: "𝐃",
  E: "𝐄",
  F: "𝐅",
  G: "𝐆",
  H: "𝐇",
  I: "𝐈",
  J: "𝐉",
  K: "𝐊",
  L: "𝐋",
  M: "𝐌",
  N: "𝐍",
  O: "𝐎",
  P: "𝐏",
  Q: "𝐐",
  R: "𝐑",
  S: "𝐒",
  T: "𝐓",
  U: "𝐔",
  V: "𝐕",
  W: "𝐖",
  X: "𝐗",
  Y: "𝐘",
  Z: "𝐙",
  0: "𝟎",
  1: "𝟏",
  2: "𝟐",
  3: "𝟑",
  4: "𝟒",
  5: "𝟓",
  6: "𝟔",
  7: "𝟕",
  8: "𝟖",
  9: "𝟗",
};

const italicMap = {
  a: "𝑎",
  b: "𝑏",
  c: "𝑐",
  d: "𝑑",
  e: "𝑒",
  f: "𝑓",
  g: "𝑔",
  h: "ℎ",
  i: "𝑖",
  j: "𝑗",
  k: "𝑘",
  l: "𝑙",
  m: "𝑚",
  n: "𝑛",
  o: "𝑜",
  p: "𝑝",
  q: "𝑞",
  r: "𝑟",
  s: "𝑠",
  t: "𝑡",
  u: "𝑢",
  v: "𝑣",
  w: "𝑤",
  x: "𝑥",
  y: "𝑦",
  z: "𝑧",
  A: "𝐴",
  B: "𝐵",
  C: "𝐶",
  D: "𝐷",
  E: "𝐸",
  F: "𝐹",
  G: "𝐺",
  H: "𝐻",
  I: "𝐼",
  J: "𝐽",
  K: "𝐾",
  L: "𝐿",
  M: "𝑀",
  N: "𝑁",
  O: "𝑂",
  P: "𝑃",
  Q: "𝑄",
  R: "𝑅",
  S: "𝑆",
  T: "𝑇",
  U: "𝑈",
  V: "𝑉",
  W: "𝑊",
  X: "𝑋",
  Y: "𝑌",
  Z: "𝑍",
};

function toBold(text) {
  return text
    .split("")
    .map((c) => boldMap[c] || c)
    .join("");
}

function toItalic(text) {
  return text
    .split("")
    .map((c) => italicMap[c] || c)
    .join("");
}

function toUnderline(text) {
  return text
    .split("")
    .map((c) => c + "\u0332")
    .join("");
}

function toTitleCase(text) {
  return text.replace(
    /\w\S*/g,
    (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(),
  );
}

const fmtButton = document.querySelectorAll(".fmt-btn");

fmtButton.forEach((btn) => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;
    let text = textInput.value;

    switch (action) {
      case "clear":
        text = "";
        break;
      case "upper":
        text = text.toUpperCase();
        break;
      case "lower":
        text = text.toLowerCase();
        break;
      case "title":
        text = toTitleCase(text);
        break;
      case "bold":
        text = toBold(text);
        break;
      case "italic":
        text = toItalic(text);
        break;
      case "underline":
        text = toUnderline(text);
        break;
    }
    textInput.value = text;
    generateFontText(text);
  });
});

console.log("hey".split("").map((v) => v + "\u0332"));

const generateBtn = document.querySelector("#generateBtn");

if (generateBtn) {
  generateBtn.addEventListener("click", () => {
    const text = textInput.value.trim();

    if (text === "") return;
    generateFontText(text);
    console.log(generateFontText(text));
  });
}
