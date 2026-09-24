const inputBx = document.querySelector(".input-box");
const fontList = document.querySelector("#fontList");
const active = document.querySelector(".active");

const styles = [
  // Your original classes
  "editorial-serif",
  "silk-monospace",
  "whispering-script",
  "small-caps-spaced",
  "circled-minimal",
  "fraktur-archival",
  "double-struck",

  // Serif & Editorial Classics
  "Playfair Display",
  "Merriweather",
  "Cinzel",
  "Cinzel Decorative",
  "Bodoni MT",
  "Baskerville",
  "Garamond",
  "EB Garamond",
  "Cormorant Garamond",
  "Times New Roman",
  "Georgia",
  "Spectral",
  "Lora",
  "Prata",
  "Abril Fatface",
  "Aptifer Serif",
  "Caslon",
  "Didot",
  "Sabon",
  "Palatino",
  "Minion Pro",

  // Modern Clean Sans-Serif
  "Inter",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Poppins",
  "Helvetica Neue",
  "Arial",
  "Futura",
  "Proxima Nova",
  "Avenir",
  "Nunito",
  "Raleway",
  "Work Sans",
  "DM Sans",
  "Plus Jakarta Sans",
  "Rubik",
  "Manrope",
  "Outfit",
  "Urbanist",

  // Monospace & Technical
  "Fira Code",
  "JetBrains Mono",
  "Courier New",
  "Source Code Pro",
  "Space Mono",
  "Consolas",
  "Inconsolata",
  "IBM Plex Mono",
  "Ubuntu Mono",
  "Roboto Mono",
  "Monaco",
  "Cascadia Code",
  "Hack",
  "Anonymous Pro",
  "SF Mono",

  // Display, Headers & Decorative
  "Bebas Neue",
  "Oswald",
  "Anton",
  "Syne",
  "Cabinet Grotesk",
  "Clash Display",
  "Space Grotesk",
  "Righteous",
  "Chakra Petch",
  "Uncial Antiqua",
  "Alfa Slab One",
  "Bungee",
  "Bungee Shade",
  "Fredoka",
  "Lobster",

  // Script, Handwriting & Cursive
  "Pacifico",
  "Dancing Script",
  "Great Vibes",
  "Caveat",
  "Satisfy",
  "Sacramento",
  "Alex Brush",
  "Allura",
  "Kalam",
  "Parisienne",
  "Yellowtail",
  "Cookie",
  "Amatic SC",
  "Shadows Into Light",
  "Kaushan Script",

  // Gothic, Fraktur & Archival
  "UnifrakturMaguntia",
  "Fette Fraktur",
  "Pirata One",
  "Old English Text MT",
  "Cloister Black",
  "Texturina",
  "MedievalSharp",
  "New Rocker",
  "Metamorphous",
  "Almendra",

  // Minimalist, Geometric & Futuristic
  "Syncopate",
  "Exo 2",
  "Orbitron",
  "Audiowide",
  "Rajdhani",
  "Michroma",
  "Teko",
  "Nico Moji",
  "Zen Dots",
  "Major Mono Display",
  // Elegant Serif (editorial vibe)
  "Playfair Display",
  "Cormorant Garamond",
  "EB Garamond",
  "DM Serif Display",
  "Bodoni Moda",
  "Prata",
  "Lora",
  "Libre Baskerville",

  // Beautiful Script (whispering vibe)
  "Dancing Script",
  "Great Vibes",
  "Allura",
  "Parisienne",
  "Alex Brush",
  "Sacramento",
  "Pinyon Script",
  "Italiana",
  "Tangerine",
  "Mrs Saint Delafield",

  // Modern Display (bold & clean)
  "Syne",
  "Clash Display",
  "Cabinet Grotesk",
  "Space Grotesk",
  "Outfit",
  "Sora",
  "Unbounded",
  "Bricolage Grotesque",

  // Gothic & Archival (dark elegance)
  "UnifrakturMaguntia",
  "Pirata One",
  "Cinzel Decorative",
  "Cinzel",
  "Metamorphous",
  "Almendra",

  // Geometric & Futuristic
  "Orbitron",
  "Audiowide",
  "Michroma",
  "Syncopate",
  "Major Mono Display",
  "Zen Dots",

  // Decorative & Fun
  "Bungee Shade",
  "Bungee",
  "Monoton",
  "Rubik Glitch",
  "Rubik Moonrocks",
  "Silkscreen",

  // Elegant Sans
  "Josefin Sans",
  "Quicksand",
  "Comfortaa",
  "Poiret One",
  "Julius Sans One",

  // Handwritten & Casual
  "Caveat",
  "Kalam",
  "Shadows Into Light",
  "Indie Flower",
  "Amatic SC",

  // Monospace with Style
  "Fira Code",
  "JetBrains Mono",
  "Space Mono",
  "Major Mono Display",
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
  active.textContent = "All : " + count;
}
