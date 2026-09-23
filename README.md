# Balearbol

Technical arboriculture & tree rigging site — plain HTML, CSS, and JS.

## Preview

```bash
python3 -m http.server 3000
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000)

## Structure

```
index.html      Home
about.html      About
gallery.html    Gallery
contact.html    Contact
css/styles.css  Styles + design tokens
js/main.js      Mobile menu
assets/brand/   Logo
```

## Design source

Figma: [Balearbol](https://www.figma.com/design/e0ipgTDwqbNg0R1OKR6SAu/Balearbol?node-id=0-1)

### Screens

| Screen | Node | Notes |
|--------|------|--------|
| Homepage (desktop) | `1:2` | Primary build target |
| Homepage (mobile) | `16:3` | 390px |
| About Us | `1:475` | |
| Gallery | `1:197` | |
| Contact Us | `7:1116` | |

### Homepage sections (`1:2`)

1. Header / nav — done
2. Hero — “Precision at Altitude. Safety at Heart.”
3. Our Services — bento grid
4. Equipment Standards
5. CTA — Technical Consultation
6. Footer

### Tokens

- White `#FFFFFF`
- Black `#1E1D22`
- Green `#C1CC6C`
- Muted `#D6D3D1`

### Typography

| Role | Family | Weights |
|------|--------|---------|
| Display / headings / nav | **Work Sans** | 600, 700, 800 |
| Body / buttons / labels | **Public Sans** | 400, 600 |
