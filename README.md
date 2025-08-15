# Power Drive Solution (PDS) Web Application

A modern, performant single-page application (SPA) for a lubricant & industrial oils brand. Built with **React + TypeScript + Vite + Tailwind CSS**, it delivers fast loading, dark/light theme support, clean product exploration, and a mobile-first navigation experience.

---
## ✨ Key Features
- **Lightning Fast Dev Stack**: Vite + React 18 + TypeScript.
- **Responsive Design**: Fluid grid & typography across mobile → desktop.
- **Dark / Light Mode**: Class-based theming persisted via localStorage; system preference respected on first load.
- **Accessible Off‑Canvas Mobile Navigation**: Animated left-slide drawer with scroll lock & focusable controls.
- **Product Catalog Architecture**: Centralized diesel engine oil dataset with dynamic detail routing (`/products/diesel-engine-oil/:dieselId`).
- **Scalable Data Model**: Interfaces prepared for additional categories & metadata (packs, health/safety, etc.).
- **Brand-Aligned UI System**: Custom Tailwind brand palette, gradients, chips, cards, and buttons.
- **Hero Image Slider**: Local asset driven, import-safe, animated transitions (ready for lazy-loading optimization).
- **Industries & Value Sections**: Modular landing content emphasizing trust, quality, and capabilities.
- **Custom Scrollbar (Vertical Slider)**: Themed for brand colors with light/dark variants & Firefox support.
- **Performance-Oriented Assets**: Public folder root-served images; easy migration path to hashed imports if needed.
- **Developer Credit & Attribution Section**: Professional footer layout with responsive collapsing strategy (if re-enabled).

---
## 🛠 Tech Stack
| Layer | Technology |
|-------|------------|
| Framework | React 18 (SPA) |
| Language | TypeScript |
| Bundler / Dev Server | Vite |
| Styling | Tailwind CSS 3.x (class-based dark mode) |
| Routing | React Router v7 |
| Icons | lucide-react |
| State (Theme) | Custom React Context |

---
## 📂 Project Structure (Core)
```
project/
  src/
    components/        # Reusable UI components (Navbar, HeroSlider, Footer, etc.)
    contexts/          # ThemeContext (dark/light mode)
    data/              # Centralized product datasets (dieselEngineOilProducts.ts)
    pages/             # Route-level pages (Home, Products, Detail views, etc.)
    index.css          # Tailwind layers, custom utilities & themed scrollbar
    main.tsx           # App bootstrap & ThemeProvider
  public/
    images/            # Static brand & product assets (served at /images/...)
  vite.config.ts       # Vite configuration
  tailwind.config.js   # Tailwind theme extension (brand palette)
  package.json         # Scripts & dependencies
```

> Note: Public assets are referenced using root-relative paths (`/images/...`). Do **not** import files from `public/` inside TypeScript modules.

---
## 🚀 Getting Started
### Prerequisites
- Node.js ≥ 18 (recommended for Vite & ESM ecosystem)
- npm ≥ 9 (or use pnpm / yarn with equivalent commands)

### Installation & Development
```bash
# Install dependencies
npm install

# Start dev server (LAN preview enabled via --host)
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```
The dev server will output both `Local:` and `Network:` URLs. Use the network URL to test on other devices connected to the same LAN.

Backend integration: set `VITE_API_BASE_URL` in a `.env` file at the project root if your backend is not on `http://localhost:4000`.

---
## 🧩 Theming & Design System
| Aspect | Implementation |
|--------|----------------|
| Dark Mode | Class strategy (`darkMode: 'class'`) toggled on `<html>` |
| Persistence | `localStorage['theme']` + system preference on initial load |
| Palette | Custom `brand` color scale (50 → 950) |
| Gradients | Defined via `backgroundImage.brand-gradient` & utility classes |
| Scrollbar | Brand gradient thumb with light/dark track variants |

To extend: add new brand semantic tokens (e.g. `accent`, `warning`) in `tailwind.config.js` and leverage in components.

---
## 🗃 Product Data Model (Diesel Oils)
```ts
interface DieselEngineOilProduct {
  id: string;
  name: string;
  image: string;            // Public root path or remote URL
  description: string;
  features: string[];
  viscosity: string;
  apiGrade: string;
  applications: string[];
  availablePacks?: string[]; // Optional
  healthSafety?: string;     // Optional long-form text
}
```
Future categories can reuse this pattern or extend with spec sheets, compliance flags, or marketing tags.

---
## 🔍 Accessibility Considerations
- Sufficient color contrast (brand yellows on deep blues; adjust if audits flag ratios).
- Keyboard navigable menu & focus rings for interactive elements.
- `aria-label` and visually hidden text for social icon links.
- Smooth scroll enabled for better anchor UX (can disable for prefers-reduced-motion if needed).

Planned improvements:
- Focus trap + ESC support in mobile drawer.
- `prefers-reduced-motion` handling for slider & transitions.

---
## 📈 Performance & Optimization Tips
| Area | Recommendation |
|------|----------------|
| Images | Convert large hero images to WebP/AVIF; add `loading="lazy"` for offscreen media. |
| Code Splitting | Introduce lazy loaded routes for category detail pages once they grow. |
| CSS | Purge enabled automatically via Tailwind + Vite (content globs). |
| Caching | Move critical logos to hashed imports in `src/` if aggressive CDN caching is desired. |
| Analytics | Add a lightweight solution (Plausible / Fathom) to monitor engagement. |

---
## 🧪 Suggested Test Coverage (Future)
| Scope | Example |
|-------|---------|
| Theme Toggle | Persists mode across reloads |
| Routing | 404 redirect for invalid diesel product IDs |
| Data Integrity | All product objects include required fields |
| Accessibility | Axe / Lighthouse pass thresholds |

---
## 🛤 Roadmap (Ideas)
- Generic Product Detail component (multi-category support).
- Search & filtering (viscosity, API grade, applications).
- Downloadable spec sheet (PDF generation per product).
- CMS integration (e.g., Headless CMS for product updates).
- Internationalization (i18n) for regional expansion.
- Animated counters / KPI metrics in hero.

---
## 🤝 Contributing
1. Fork repository
2. Create feature branch: `git checkout -b feat/your-feature`
3. Commit changes: `git commit -m "feat: add X"`
4. Push & open a Pull Request

Coding Guidelines:
- Prefer TypeScript strictness for new modules.
- Keep components small & cohesive.
- Reuse brand utilities (no hard-coded random hex values).
- Dark mode parity required for new UI sections.

---
## ⚖️ License
No license specified yet. Add a `LICENSE` file (MIT / Apache-2.0 / proprietary) to clarify usage rights.

---
## 👨‍💻 About the Developer
### Anand KanishkZ  
**Full-Stack Developer & Madhesh Enthusiast**

**Mission:** Crafting performant, accessible, and culturally-rooted digital experiences that amplify brands, empower users, and create sustainable technological impact across emerging regions.

| Platform | Link |
|----------|------|
| GitHub   | https://github.com/anandkanishkZ |
| LinkedIn | https://www.linkedin.com/in/anandkanishkz |
| Twitter / X | https://twitter.com/anandkanishkZ |
| Instagram | https://instagram.com/anandkanishkZ |
| Facebook | https://facebook.com/anandkanishkZ |
| TikTok | https://www.tiktok.com/@anandkanishkZ |

> Update any social URLs if they differ from your actual handles.

Feel free to reach out for collaboration, code reviews, or community initiatives.

---
## 📬 Contact
General inquiries: **info@powerdrivesolution.com.np**  
Sales / quotes: Use the **Get Quote** button in the navigation.

---
### ⭐ Support
If this project helps you, consider starring the repo or sharing feedback to guide the roadmap.

---
**Built with precision, scalability, and user trust in mind.**
