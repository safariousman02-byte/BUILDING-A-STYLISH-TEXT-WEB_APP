// ============================================================
// THEME MANAGER (Light + Dark)
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
  if (icon) {
    icon.textContent = theme === "dark" ? "dark_mode" : "light_mode";
  }
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

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });

// ============================================================
// TEXT HISTORY (declared FIRST so it's available everywhere)
// ============================================================
let textHistory = [];

function pushHistory(text) {
  if (text) textHistory.push(text);
}

// ============================================================
// DOM REFERENCES
// ============================================================
const textInput = document.querySelector("#textInput");
const fontList = document.querySelector("#fontList");

// ============================================================
// UNICODE STYLE MAPS
// ============================================================
const mapBold = {
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

const mapItalic = {
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

const mapBoldItalic = {
  a: "𝒂",
  b: "𝒃",
  c: "𝒄",
  d: "𝒅",
  e: "𝒆",
  f: "𝒇",
  g: "𝒈",
  h: "𝒉",
  i: "𝒊",
  j: "𝒋",
  k: "𝒌",
  l: "𝒍",
  m: "𝒎",
  n: "𝒏",
  o: "𝒐",
  p: "𝒑",
  q: "𝒒",
  r: "𝒓",
  s: "𝒔",
  t: "𝒕",
  u: "𝒖",
  v: "𝒗",
  w: "𝒘",
  x: "𝒙",
  y: "𝒚",
  z: "𝒛",
  A: "𝑨",
  B: "𝑩",
  C: "𝑪",
  D: "𝑫",
  E: "𝑬",
  F: "𝑭",
  G: "𝑮",
  H: "𝑯",
  I: "𝑰",
  J: "𝑱",
  K: "𝑲",
  L: "𝑳",
  M: "𝑴",
  N: "𝑵",
  O: "𝑶",
  P: "𝑷",
  Q: "𝑸",
  R: "𝑹",
  S: "𝑺",
  T: "𝑻",
  U: "𝑼",
  V: "𝑽",
  W: "𝑾",
  X: "𝑿",
  Y: "𝒀",
  Z: "𝒁",
};

const mapScript = {
  a: "𝒶",
  b: "𝒷",
  c: "𝒸",
  d: "𝒹",
  e: "ℯ",
  f: "𝒻",
  g: "ℊ",
  h: "𝒽",
  i: "𝒾",
  j: "𝒿",
  k: "𝓀",
  l: "𝓁",
  m: "𝓂",
  n: "𝓃",
  o: "ℴ",
  p: "𝓅",
  q: "𝓆",
  r: "𝓇",
  s: "𝓈",
  t: "𝓉",
  u: "𝓊",
  v: "𝓋",
  w: "𝓌",
  x: "𝓍",
  y: "𝓎",
  z: "𝓏",
  A: "𝒜",
  B: "ℬ",
  C: "𝒞",
  D: "𝒟",
  E: "ℰ",
  F: "ℱ",
  G: "𝒢",
  H: "ℋ",
  I: "ℐ",
  J: "𝒥",
  K: "𝒦",
  L: "ℒ",
  M: "ℳ",
  N: "𝒩",
  O: "𝒪",
  P: "𝒫",
  Q: "𝒬",
  R: "ℛ",
  S: "𝒮",
  T: "𝒯",
  U: "𝒰",
  V: "𝒱",
  W: "𝒲",
  X: "𝒳",
  Y: "𝒴",
  Z: "𝒵",
};

const mapBoldScript = {
  a: "𝓪",
  b: "𝓫",
  c: "𝓬",
  d: "𝓭",
  e: "𝓮",
  f: "𝓯",
  g: "𝓰",
  h: "𝓱",
  i: "𝓲",
  j: "𝓳",
  k: "𝓴",
  l: "𝓵",
  m: "𝓶",
  n: "𝓷",
  o: "𝓸",
  p: "𝓹",
  q: "𝓺",
  r: "𝓻",
  s: "𝓼",
  t: "𝓽",
  u: "𝓾",
  v: "𝓿",
  w: "𝔀",
  x: "𝔁",
  y: "𝔂",
  z: "𝔃",
  A: "𝓐",
  B: "𝓑",
  C: "𝓒",
  D: "𝓓",
  E: "𝓔",
  F: "𝓕",
  G: "𝓖",
  H: "𝓗",
  I: "𝓘",
  J: "𝓙",
  K: "𝓚",
  L: "𝓛",
  M: "𝓜",
  N: "𝓝",
  O: "𝓞",
  P: "𝓟",
  Q: "𝓠",
  R: "𝓡",
  S: "𝓢",
  T: "𝓣",
  U: "𝓤",
  V: "𝓥",
  W: "𝓦",
  X: "𝓧",
  Y: "𝓨",
  Z: "𝓩",
};

const mapFraktur = {
  a: "𝔞",
  b: "𝔟",
  c: "𝔠",
  d: "𝔡",
  e: "𝔢",
  f: "𝔣",
  g: "𝔤",
  h: "𝔥",
  i: "𝔦",
  j: "𝔧",
  k: "𝔨",
  l: "𝔩",
  m: "𝔪",
  n: "𝔫",
  o: "𝔬",
  p: "𝔭",
  q: "𝔮",
  r: "𝔯",
  s: "𝔰",
  t: "𝔱",
  u: "𝔲",
  v: "𝔳",
  w: "𝔴",
  x: "𝔵",
  y: "𝔶",
  z: "𝔷",
  A: "𝔄",
  B: "𝔅",
  C: "ℭ",
  D: "𝔇",
  E: "𝔈",
  F: "𝔉",
  G: "𝔊",
  H: "ℌ",
  I: "ℑ",
  J: "𝔍",
  K: "𝔎",
  L: "𝔏",
  M: "𝔐",
  N: "𝔑",
  O: "𝔒",
  P: "𝔓",
  Q: "𝔔",
  R: "ℜ",
  S: "𝔖",
  T: "𝔗",
  U: "𝔘",
  V: "𝔙",
  W: "𝔚",
  X: "𝔛",
  Y: "𝔜",
  Z: "ℨ",
};

const mapDoubleStruck = {
  a: "𝕒",
  b: "𝕓",
  c: "𝕔",
  d: "𝕕",
  e: "𝕖",
  f: "𝕗",
  g: "𝕘",
  h: "𝕙",
  i: "𝕚",
  j: "𝕛",
  k: "𝕜",
  l: "𝕝",
  m: "𝕞",
  n: "𝕟",
  o: "𝕠",
  p: "𝕡",
  q: "𝕢",
  r: "𝕣",
  s: "𝕤",
  t: "𝕥",
  u: "𝕦",
  v: "𝕧",
  w: "𝕨",
  x: "𝕩",
  y: "𝕪",
  z: "𝕫",
  A: "𝔸",
  B: "𝔹",
  C: "ℂ",
  D: "𝔻",
  E: "𝔼",
  F: "𝔽",
  G: "𝔾",
  H: "ℍ",
  I: "𝕀",
  J: "𝕁",
  K: "𝕂",
  L: "𝕃",
  M: "𝕄",
  N: "ℕ",
  O: "𝕆",
  P: "ℙ",
  Q: "ℚ",
  R: "ℝ",
  S: "𝕊",
  T: "𝕋",
  U: "𝕌",
  V: "𝕍",
  W: "𝕎",
  X: "𝕏",
  Y: "𝕐",
  Z: "ℤ",
  0: "𝟘",
  1: "𝟙",
  2: "𝟚",
  3: "𝟛",
  4: "𝟜",
  5: "𝟝",
  6: "𝟞",
  7: "𝟟",
  8: "𝟠",
  9: "𝟡",
};

const mapMonospace = {
  a: "𝚊",
  b: "𝚋",
  c: "𝚌",
  d: "𝚍",
  e: "𝚎",
  f: "𝚏",
  g: "𝚐",
  h: "𝚑",
  i: "𝚒",
  j: "𝚓",
  k: "𝚔",
  l: "𝚕",
  m: "𝚖",
  n: "𝚗",
  o: "𝚘",
  p: "𝚙",
  q: "𝚚",
  r: "𝚛",
  s: "𝚜",
  t: "𝚝",
  u: "𝚞",
  v: "𝚟",
  w: "𝚠",
  x: "𝚡",
  y: "𝚢",
  z: "𝚣",
  A: "𝙰",
  B: "𝙱",
  C: "𝙲",
  D: "𝙳",
  E: "𝙴",
  F: "𝙵",
  G: "𝙶",
  H: "𝙷",
  I: "𝙸",
  J: "𝙹",
  K: "𝙺",
  L: "𝙻",
  M: "𝙼",
  N: "𝙽",
  O: "𝙾",
  P: "𝙿",
  Q: "𝚀",
  R: "𝚁",
  S: "𝚂",
  T: "𝚃",
  U: "𝚄",
  V: "𝚅",
  W: "𝚆",
  X: "𝚇",
  Y: "𝚈",
  Z: "𝚉",
  0: "𝟶",
  1: "𝟷",
  2: "𝟸",
  3: "𝟹",
  4: "𝟺",
  5: "𝟻",
  6: "𝟼",
  7: "𝟽",
  8: "𝟾",
  9: "𝟿",
};

const mapCircled = {
  a: "ⓐ",
  b: "ⓑ",
  c: "ⓒ",
  d: "ⓓ",
  e: "ⓔ",
  f: "ⓕ",
  g: "ⓖ",
  h: "ⓗ",
  i: "ⓘ",
  j: "ⓙ",
  k: "ⓚ",
  l: "ⓛ",
  m: "ⓜ",
  n: "ⓝ",
  o: "ⓞ",
  p: "ⓟ",
  q: "ⓠ",
  r: "ⓡ",
  s: "ⓢ",
  t: "ⓣ",
  u: "ⓤ",
  v: "ⓥ",
  w: "ⓦ",
  x: "ⓧ",
  y: "ⓨ",
  z: "ⓩ",
  A: "Ⓐ",
  B: "Ⓑ",
  C: "Ⓒ",
  D: "Ⓓ",
  E: "Ⓔ",
  F: "Ⓕ",
  G: "Ⓖ",
  H: "Ⓗ",
  I: "Ⓘ",
  J: "Ⓙ",
  K: "Ⓚ",
  L: "Ⓛ",
  M: "Ⓜ",
  N: "Ⓝ",
  O: "Ⓞ",
  P: "Ⓟ",
  Q: "Ⓠ",
  R: "Ⓡ",
  S: "Ⓢ",
  T: "Ⓣ",
  U: "Ⓤ",
  V: "Ⓥ",
  W: "Ⓦ",
  X: "Ⓧ",
  Y: "Ⓨ",
  Z: "Ⓩ",
  0: "⓪",
  1: "①",
  2: "②",
  3: "③",
  4: "④",
  5: "⑤",
  6: "⑥",
  7: "⑦",
  8: "⑧",
  9: "⑨",
};

// ============================================================
// TEXT CONVERTERS
// ============================================================
function convertText(text, map) {
  return text
    .split("")
    .map((c) => map[c] || c)
    .join("");
}

function toBold(text) {
  return convertText(text, mapBold);
}

function toItalic(text) {
  return convertText(text, mapItalic);
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

// ============================================================
// FONTS ARRAY
// ============================================================
const styles = [
  // ============ UNICODE-STYLED (COPYABLE) ============
  { name: "Bold", css: "'Inter', sans-serif", italic: false, map: mapBold },
  { name: "Italic", css: "'Inter', sans-serif", italic: true, map: mapItalic },
  {
    name: "Bold Italic",
    css: "'Inter', sans-serif",
    italic: true,
    map: mapBoldItalic,
  },
  {
    name: "Script",
    css: "'Dancing Script', cursive",
    italic: false,
    map: mapScript,
  },
  {
    name: "Bold Script",
    css: "'Dancing Script', cursive",
    italic: false,
    map: mapBoldScript,
  },
  {
    name: "Fraktur",
    css: "'UnifrakturMaguntia', cursive",
    italic: false,
    map: mapFraktur,
  },
  {
    name: "Double-Struck",
    css: "'Inter', sans-serif",
    italic: false,
    map: mapDoubleStruck,
  },
  {
    name: "Monospace",
    css: "'Fira Code', monospace",
    italic: false,
    map: mapMonospace,
  },
  {
    name: "Circled",
    css: "'Inter', sans-serif",
    italic: false,
    map: mapCircled,
  },

  // ============ ELEGANT SERIF ============
  {
    name: "Playfair Display",
    css: "'Playfair Display', serif",
    italic: false,
    map: null,
  },
  {
    name: "Playfair Italic",
    css: "'Playfair Display', serif",
    italic: true,
    map: null,
  },
  {
    name: "Cormorant Garamond",
    css: "'Cormorant Garamond', serif",
    italic: false,
    map: null,
  },
  {
    name: "Cormorant Italic",
    css: "'Cormorant Garamond', serif",
    italic: true,
    map: null,
  },
  {
    name: "DM Serif Display",
    css: "'DM Serif Display', serif",
    italic: false,
    map: null,
  },
  {
    name: "Bodoni Moda",
    css: "'Bodoni Moda', serif",
    italic: false,
    map: null,
  },
  { name: "Prata", css: "'Prata', serif", italic: false, map: null },
  { name: "Cinzel", css: "'Cinzel', serif", italic: false, map: null },
  {
    name: "Cinzel Decorative",
    css: "'Cinzel Decorative', serif",
    italic: false,
    map: null,
  },
  {
    name: "Libre Baskerville",
    css: "'Libre Baskerville', serif",
    italic: false,
    map: null,
  },
  {
    name: "EB Garamond",
    css: "'EB Garamond', serif",
    italic: false,
    map: null,
  },
  { name: "Lora", css: "'Lora', serif", italic: false, map: null },

  // ============ BEAUTIFUL SCRIPTS ============
  {
    name: "Great Vibes",
    css: "'Great Vibes', cursive",
    italic: false,
    map: null,
  },
  { name: "Allura", css: "'Allura', cursive", italic: false, map: null },
  {
    name: "Parisienne",
    css: "'Parisienne', cursive",
    italic: false,
    map: null,
  },
  {
    name: "Alex Brush",
    css: "'Alex Brush', cursive",
    italic: false,
    map: null,
  },
  {
    name: "Sacramento",
    css: "'Sacramento', cursive",
    italic: false,
    map: null,
  },
  {
    name: "Pinyon Script",
    css: "'Pinyon Script', cursive",
    italic: false,
    map: null,
  },
  { name: "Italianno", css: "'Italianno', cursive", italic: false, map: null },
  { name: "Tangerine", css: "'Tangerine', cursive", italic: false, map: null },
  {
    name: "Mrs Saint Delafield",
    css: "'Mrs Saint Delafield', cursive",
    italic: false,
    map: null,
  },
  {
    name: "Herr Von Muellerhoff",
    css: "'Herr Von Muellerhoff', cursive",
    italic: false,
    map: null,
  },
  {
    name: "Rouge Script",
    css: "'Rouge Script', cursive",
    italic: false,
    map: null,
  },

  // ============ HANDWRITTEN ============
  { name: "Caveat", css: "'Caveat', cursive", italic: false, map: null },
  { name: "Kalam", css: "'Kalam', cursive", italic: false, map: null },
  {
    name: "Shadows Into Light",
    css: "'Shadows Into Light', cursive",
    italic: false,
    map: null,
  },
  {
    name: "Indie Flower",
    css: "'Indie Flower', cursive",
    italic: false,
    map: null,
  },
  { name: "Amatic SC", css: "'Amatic SC', cursive", italic: false, map: null },
  {
    name: "Architects Daughter",
    css: "'Architects Daughter', cursive",
    italic: false,
    map: null,
  },
  {
    name: "Nanum Pen Script",
    css: "'Nanum Pen Script', cursive",
    italic: false,
    map: null,
  },
  {
    name: "Homemade Apple",
    css: "'Homemade Apple', cursive",
    italic: false,
    map: null,
  },
  {
    name: "Reenie Beanie",
    css: "'Reenie Beanie', cursive",
    italic: false,
    map: null,
  },

  // ============ MODERN SANS ============
  { name: "Inter", css: "'Inter', sans-serif", italic: false, map: null },
  {
    name: "Space Grotesk",
    css: "'Space Grotesk', sans-serif",
    italic: false,
    map: null,
  },
  { name: "Syne", css: "'Syne', sans-serif", italic: false, map: null },
  { name: "Outfit", css: "'Outfit', sans-serif", italic: false, map: null },
  { name: "Sora", css: "'Sora', sans-serif", italic: false, map: null },
  {
    name: "Unbounded",
    css: "'Unbounded', sans-serif",
    italic: false,
    map: null,
  },
  {
    name: "Josefin Sans",
    css: "'Josefin Sans', sans-serif",
    italic: false,
    map: null,
  },
  {
    name: "Poiret One",
    css: "'Poiret One', cursive",
    italic: false,
    map: null,
  },
  {
    name: "Julius Sans One",
    css: "'Julius Sans One', sans-serif",
    italic: false,
    map: null,
  },

  // ============ BOLD DISPLAY ============
  { name: "Anton", css: "'Anton', sans-serif", italic: false, map: null },
  {
    name: "Bebas Neue",
    css: "'Bebas Neue', sans-serif",
    italic: false,
    map: null,
  },
  {
    name: "Archivo Black",
    css: "'Archivo Black', sans-serif",
    italic: false,
    map: null,
  },
  {
    name: "Alfa Slab One",
    css: "'Alfa Slab One', serif",
    italic: false,
    map: null,
  },
  { name: "Righteous", css: "'Righteous', cursive", italic: false, map: null },
  {
    name: "Bowlby One",
    css: "'Bowlby One', sans-serif",
    italic: false,
    map: null,
  },
  { name: "Bungee", css: "'Bungee', cursive", italic: false, map: null },
  {
    name: "Bungee Shade",
    css: "'Bungee Shade', cursive",
    italic: false,
    map: null,
  },
  { name: "Monoton", css: "'Monoton', cursive", italic: false, map: null },
  {
    name: "Abril Fatface",
    css: "'Abril Fatface', serif",
    italic: false,
    map: null,
  },

  // ============ RETRO / TECH ============
  { name: "Orbitron", css: "'Orbitron', sans-serif", italic: false, map: null },
  { name: "Audiowide", css: "'Audiowide', cursive", italic: false, map: null },
  { name: "Michroma", css: "'Michroma', sans-serif", italic: false, map: null },
  {
    name: "Syncopate",
    css: "'Syncopate', sans-serif",
    italic: false,
    map: null,
  },
  {
    name: "Major Mono Display",
    css: "'Major Mono Display', monospace",
    italic: false,
    map: null,
  },

  // ============ GOTHIC / ARCHIVAL ============
  {
    name: "Pirata One",
    css: "'Pirata One', cursive",
    italic: false,
    map: null,
  },
  {
    name: "Metamorphous",
    css: "'Metamorphous', cursive",
    italic: false,
    map: null,
  },
  { name: "Almendra", css: "'Almendra', serif", italic: false, map: null },
  {
    name: "MedievalSharp",
    css: "'MedievalSharp', cursive",
    italic: false,
    map: null,
  },

  // ============ PLAYFUL / BUBBLE ============
  { name: "Baloo 2", css: "'Baloo 2', cursive", italic: false, map: null },
  {
    name: "Bubblegum Sans",
    css: "'Bubblegum Sans', cursive",
    italic: false,
    map: null,
  },
  { name: "Chewy", css: "'Chewy', cursive", italic: false, map: null },
  { name: "Sniglet", css: "'Sniglet', cursive", italic: false, map: null },
  {
    name: "Varela Round",
    css: "'Varela Round', sans-serif",
    italic: false,
    map: null,
  },
  {
    name: "Mochiy Pop One",
    css: "'Mochiy Pop One', sans-serif",
    italic: false,
    map: null,
  },

  // ============ QUIRKY / UNIQUE ============
  {
    name: "Bungee Inline",
    css: "'Bungee Inline', cursive",
    italic: false,
    map: null,
  },
  {
    name: "Bungee Outline",
    css: "'Bungee Outline', cursive",
    italic: false,
    map: null,
  },
  {
    name: "Rubik Glitch",
    css: "'Rubik Glitch', cursive",
    italic: false,
    map: null,
  },
  {
    name: "Rubik Moonrocks",
    css: "'Rubik Moonrocks', cursive",
    italic: false,
    map: null,
  },
  {
    name: "Silkscreen",
    css: "'Silkscreen', cursive",
    italic: false,
    map: null,
  },
  { name: "Zen Dots", css: "'Zen Dots', cursive", italic: false, map: null },
  {
    name: "Faster One",
    css: "'Faster One', cursive",
    italic: false,
    map: null,
  },
  { name: "Wallpoet", css: "'Wallpoet', cursive", italic: false, map: null },
  { name: "Codystar", css: "'Codystar', cursive", italic: false, map: null },
  { name: "Kranky", css: "'Kranky', cursive", italic: false, map: null },
  {
    name: "Freckle Face",
    css: "'Freckle Face', cursive",
    italic: false,
    map: null,
  },
  { name: "Miltonian", css: "'Miltonian', cursive", italic: false, map: null },
  {
    name: "Metal Mania",
    css: "'Metal Mania', cursive",
    italic: false,
    map: null,
  },
  { name: "Creepster", css: "'Creepster', cursive", italic: false, map: null },
  { name: "Nosifer", css: "'Nosifer', cursive", italic: false, map: null },

  // ============ STENCIL / OUTLINE ============
  {
    name: "Stardos Stencil",
    css: "'Stardos Stencil', cursive",
    italic: false,
    map: null,
  },
  { name: "Modak", css: "'Modak', cursive", italic: false, map: null },
  {
    name: "Passero One",
    css: "'Passero One', cursive",
    italic: false,
    map: null,
  },

  // ============ MONOSPACE ============
  {
    name: "Fira Code",
    css: "'Fira Code', monospace",
    italic: false,
    map: null,
  },
  {
    name: "JetBrains Mono",
    css: "'JetBrains Mono', monospace",
    italic: false,
    map: null,
  },
  {
    name: "Space Mono",
    css: "'Space Mono', monospace",
    italic: false,
    map: null,
  },
  {
    name: "Nova Mono",
    css: "'Nova Mono', monospace",
    italic: false,
    map: null,
  },
  {
    name: "Dancing Script",
    css: "'Dancing Script', cursive",
    italic: false,
    map: null,
  },
];

// ============================================================
// GENERATE FONT CARDS
// ============================================================
function generateFontText(text) {
  if (!fontList) return;
  fontList.innerHTML = "";

  styles.forEach((style) => {
    const card = document.createElement("div");
    card.className = "font-card";

    card.innerHTML = `
      <div class="font-card-header">
        <div class="font-title">
          <span class="dot"></span> ${style.name}
        </div>
        <div class="font-meta">Glyph & Silk</div>
        <div class="font-actions">
          <button class="heart-btn">
            <span class="material-symbols-outlined icon">star</span>
          </button>
        </div>
      </div>
      <div class="font-preview" style="font-family: ${style.css}; font-style: ${style.italic ? "italic" : "normal"};">
        ${text}
      </div>
      <div class="font-footer">
        <span class="font-desc">${style.map ? "Unicode copy ready" : "Visual only"}</span>
        <button class="copy-card">
          <span class="material-symbols-outlined">content_copy</span>
          Copy
        </button>
      </div>
    `;

    const copyBtn = card.querySelector(".copy-card");
    copyBtn.addEventListener("click", () => copyFont(text, style, copyBtn));

    // Inside generateFontText, after creating the card:

    const heartBtn = card.querySelector(".heart-btn");
    heartBtn.addEventListener("click", () => {
      toggleSave(text, style, heartBtn);
    });

    fontList.appendChild(card);
  });
}

// ============================================================
// COPY FUNCTION
// ============================================================
async function copyFont(text, style, el) {
  let output;

  if (style.map) {
    output = convertText(text, style.map);
  } else if (style.italic) {
    output = toItalic(text);
  } else if (style.name.toLowerCase().includes("bold")) {
    output = toBold(text);
  } else {
    output = text;
  }

  try {
    await navigator.clipboard.writeText(output);

    el.classList.add("copied");
    el.innerHTML = `<span class="material-symbols-outlined">check</span> Copied!`;

    setTimeout(() => {
      el.classList.remove("copied");
      el.innerHTML = `<span class="material-symbols-outlined">content_copy</span> Copy`;
    }, 1500);
  } catch (err) {
    console.error("Copy failed:", err);
    el.innerHTML = `<span class="material-symbols-outlined">error</span> Failed`;
  }
}

// ============================================================
// INPUT LISTENER
// ============================================================
if (textInput) {
  textInput.addEventListener("input", (e) => {
    const tex = e.target.value.trim();

    if (tex === "") {
      fontList.innerHTML = "";
      return;
    }

    generateFontText(tex);
  });
}

// ============================================================
// DEFAULT TEXT ON LOAD
// ============================================================
window.addEventListener("DOMContentLoaded", () => {
  const defaultText = "Ethereal moments in morning light ✨";
  if (textInput) {
    textInput.value = defaultText;
    generateFontText(defaultText);
  }
});

// ============================================================
// FORMATTING BUTTONS
// ============================================================
const fmtButtons = document.querySelectorAll(".fmt-btn");

fmtButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;
    let text = textInput.value;

    pushHistory(text);

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

// ============================================================
// GENERATE BUTTON
// ============================================================
const generateBtn = document.querySelector("#generateBtn");

if (generateBtn) {
  generateBtn.addEventListener("click", () => {
    const text = textInput.value.trim();
    pushHistory(textInput.value);

    if (text === "") return;
    generateFontText(text);
    textInput.blur();
  });
}

// ============================================================
// RANDOM / CLEAR / RESTORE
// ============================================================
const randomBtn = document.getElementById("randomBtn");
const clearBtn = document.getElementById("clearBtn");
const restoreBtn = document.getElementById("restoreBtn");

if (randomBtn) {
  randomBtn.addEventListener("click", () => {
    pushHistory(textInput.value);
    let text = textInput.value.trim();
    if (!text) return;

    const transforms = [
      () => text.toUpperCase(),
      () => text.toLowerCase(),
      () => toTitleCase(text),
      () => toBold(text),
      () => toItalic(text),
      () => toUnderline(text),
      () => toBold(text).toUpperCase(),
      () => toItalic(toTitleCase(text)),
    ];

    text = transforms[Math.floor(Math.random() * transforms.length)]();
    textInput.value = text;
    generateFontText(text);
  });
}

if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    pushHistory(textInput.value);
    textInput.value = "";
    fontList.innerHTML = "";
    textInput.focus();
  });
}

if (restoreBtn) {
  restoreBtn.addEventListener("click", () => {
    if (textHistory.length === 0) return;
    const prev = textHistory.pop();
    textInput.value = prev;
    generateFontText(prev);
  });
}

// ============================================================
// SLIDERS (Dimensions & Spacing)
// ============================================================
const glyphSize = document.getElementById("glyphSize");
const kerning = document.getElementById("kerning");
const glyphSizeVal = document.getElementById("glyphSizeVal");
const kerningVal = document.getElementById("kerningVal");
const autoSyncBtn = document.querySelector(".auto-sync-btn");

let autoSync = false;

if (glyphSize) {
  glyphSize.addEventListener("input", (e) => {
    const size = e.target.value;
    if (glyphSizeVal) glyphSizeVal.textContent = `${size}px`;

    if (autoSync) {
      document.querySelectorAll(".font-preview").forEach((el) => {
        el.style.fontSize = `${size}px`;
      });
    }
  });
}

if (kerning) {
  kerning.addEventListener("input", (e) => {
    const spacing = parseFloat(e.target.value);
    const display =
      spacing >= 0 ? `+${spacing.toFixed(1)}px` : `${spacing.toFixed(1)}px`;
    if (kerningVal) kerningVal.textContent = display;

    if (autoSync) {
      document.querySelectorAll(".font-preview").forEach((el) => {
        el.style.letterSpacing = `${spacing}px`;
      });
    }
  });
}

if (autoSyncBtn) {
  autoSyncBtn.addEventListener("click", () => {
    autoSync = !autoSync;
    autoSyncBtn.classList.toggle("active", autoSync);

    const icon = autoSyncBtn.querySelector(".material-symbols-outlined");
    if (icon) icon.textContent = autoSync ? "sync" : "sync_disabled";

    // Update label text (the node after the icon span)
    const labelNode = autoSyncBtn.childNodes[2];
    if (labelNode) {
      labelNode.textContent = autoSync
        ? " Auto-sync Enabled"
        : " Auto-sync Disabled";
    }
  });
}

// ============================================================
// COPY ALL BUTTON
// ============================================================
const copyAllBtn = document.getElementById("copyAllBtn");

if (copyAllBtn) {
  copyAllBtn.addEventListener("click", async () => {
    const text = textInput.value.trim();
    if (!text) return;

    let output = `✨ ${text} — All Styles ✨\n\n`;

    styles.forEach((style) => {
      let converted = text;

      if (style.map) {
        converted = convertText(text, style.map);
      } else if (style.italic) {
        converted = toItalic(text);
      } else if (style.name.toLowerCase().includes("bold")) {
        converted = toBold(text);
      }

      output += `[${style.name}]\n${converted}\n\n`;
    });

    try {
      await navigator.clipboard.writeText(output);
      const original = copyAllBtn.innerHTML;
      copyAllBtn.innerHTML = `<span class="material-symbols-outlined">check</span> Copied!`;
      setTimeout(() => (copyAllBtn.innerHTML = original), 1500);
    } catch (err) {
      console.error("Copy All failed:", err);
    }
  });
}

// ============================================================
// SAVE TO COLLECTION
// ============================================================

function getSavedFonts() {
  const saved = localStorage.getItem("glyphSavedFonts");
  return saved ? JSON.parse(saved) : [];
}

function saveFonts(fonts) {
  localStorage.setItem("glyphSavedFonts", JSON.stringify(fonts));
}

function isFontSaved(text, styleName) {
  const saved = getSavedFonts();
  return saved.some((f) => f.text === text && f.styleName === styleName);
}

function toggleSave(text, style, heartBtn) {
  let saved = getSavedFonts();
  const exists = saved.findIndex(
    (f) => f.text === text && f.styleName === style.name,
  );

  if (exists > -1) {
    // Remove
    saved.splice(exists, 1);
    heartBtn.classList.remove("saved");
  } else {
    // Add
    const converted = style.map ? convertText(text, style.map) : text;
    saved.push({
      id: Date.now(),
      text: text,
      converted: converted,
      styleName: style.name,
      css: style.css,
      italic: style.italic,
      savedAt: new Date().toISOString(),
    });
    heartBtn.classList.add("saved");
  }

  saveFonts(saved);

  // Feedback animation
  heartBtn.style.transform = "scale(1.3)";
  setTimeout(() => (heartBtn.style.transform = "scale(1)"), 200);
}
