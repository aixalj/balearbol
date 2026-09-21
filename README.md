# Balearbol

Technical arboriculture & tree rigging site.

## App location

The Next.js app lives in [`web/`](./web).

```bash
npm run dev    # from repo root, or: cd web && npm run dev
```

Preview: [http://127.0.0.1:3000](http://127.0.0.1:3000)

## Env setup

```bash
cp web/.env.local.example web/.env.local
```

Fill Cloudinary + Airtable values in `web/.env.local` before wiring uploads/forms.

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
| Body (form/landing?) | `1:735` | Confirm in Figma |

### Homepage sections (`1:2`)

1. Header / nav — Balearbol, Home / About / Gallery, Contact Us
2. Hero — “Precision at Altitude. Safety at Heart.”
3. Our Services — bento grid (pruning, hazardous removal, rigging, gear)
4. Equipment Standards
5. CTA — Technical Consultation
6. Footer

### Tokens

- White `#FFFFFF`
- Black `#1E1D22`
- Green `#C1CC6C`
- Muted footer text `#D6D3D1`

### Typography (from Figma)

Two Google Fonts families:

| Role | Family | Weights |
|------|--------|---------|
| Display / headings / nav | **Work Sans** | SemiBold 600, Bold 700, ExtraBold 800 |
| Body / UI / labels / buttons | **Public Sans** | Regular 400, SemiBold 600 |

#### Type scale

| Style | Font | Size | Weight | Line height | Tracking / case |
|-------|------|------|--------|-------------|-----------------|
| Hero H1 | Work Sans | 72px | Bold | 72px (1.0) | Title case; accent word in green |
| CTA H2 | Work Sans | 60px | Bold | 60px | Title case |
| Section H2 | Work Sans | 36px | SemiBold | 40px | Uppercase, tracking `-1.8px` |
| Equipment H2 | Work Sans | 36px | Bold | 40px | Accent line in green |
| Card H3 large | Work Sans | 30px | Bold | 36px | |
| Card H3 | Work Sans | 24px | Bold | 32px | |
| Stat (100%) | Work Sans | 36px | ExtraBold | 40px | |
| Nav links | Work Sans | 16px | SemiBold | 24px | tracking `-0.4px`; active = green + underline |
| CTA button (banner) | Work Sans | 16px | Bold | 24px | Uppercase, tracking `1.6px` |
| Hero body | Public Sans | 20px | Regular | 32.5px | |
| CTA body | Public Sans | 20px | Regular | 28px | |
| Primary button | Public Sans | 18px | SemiBold | 28px | |
| Nav Contact button | Public Sans | 16px | SemiBold | — | |
| Body / card copy | Public Sans | 14–16px | Regular | 20–24px | |
| Eyebrow / labels | Public Sans | 12px | SemiBold | 16px | Uppercase, tracking `1.2px` |
| Micro labels | Public Sans | 10px | SemiBold | 12.5–15px | Uppercase |
| Spec values | Public Sans | 16px | SemiBold | 24px | Green accent |
| Link CTAs (e.g. EMERGENCY DISPATCH) | Public Sans | 14px | SemiBold | 20px | Uppercase, tracking `1.4px`, green |

#### Implementation notes

- Load via `next/font/google`: `Work_Sans` + `Public_Sans`
- Default body font = Public Sans; display/headings = Work Sans
- Do **not** use Geist / Inter / system UI defaults for this brand
