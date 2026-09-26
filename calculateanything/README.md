# CalculateAnything

**One place. Every calculation.**

CalculateAnything is an all-in-one calculation platform for students, developers, and everyday users — education, finance, math, health, project management, computer science and unit conversion, all in one fast, responsive React app.

## Why CalculateAnything?

Most calculator sites solve one problem and bury it in ads. Students juggling CGPA, EMI, and lab-report percentages end up with a dozen browser tabs across different clunky sites. CalculateAnything puts every calculation a student or professional actually needs behind one consistent, fast interface — dark mode, history, favorites and formula explanations included, so it's educational rather than just a black-box number generator.

## Features

- **22 calculators** across 8 categories (see full list below)
- Instant global **search** ("compound", "college", etc.)
- **Favorites** and **calculation history**, stored locally — nothing sensitive is ever saved
- **Dark / light mode** with system preference detection
- Every calculator shows its **formula**, and many show a **step-by-step breakdown**
- Charts (Recharts) where they add real understanding: compound growth, EMI split, SIP growth
- Fully responsive, keyboard-accessible, validates every input

## Tech stack

React 18 · Vite · Tailwind CSS · React Router · Recharts · Lucide React · LocalStorage

## Installation & running locally

```bash
npm install
npm run dev       # starts a local dev server (usually http://localhost:5173)
```

To build for production:

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

## Project structure

```
src/
  components/       # reusable UI: Navbar, SearchBar, InputField, ResultCard, FormulaCard...
  layouts/           # CalculatorLayout wraps every calculator page
  pages/             # Home, CategoryPage, CalculatorPage, FavoritesPage, HistoryPage
  data/               # calculatorRegistry.js (single source of truth) + categories.js
  hooks/              # useLocalStorage, useFavorites, useHistory
  context/           # ThemeContext (dark/light mode)
  utils/              # conversionEngine.js (generic unit conversion), format.js (validation/formatting)
  calculators/        # one folder per category, one file per calculator
```

Every calculator is registered once in `src/data/calculatorRegistry.js`. That single registry drives routing, search, category pages, and "related calculators" — adding a new calculator means adding one entry plus one component file.

## Calculator list

**Education** — CGPA to Percentage · Percentage to CGPA · SGPA Calculator · Attendance Calculator · Marks Percentage

**Finance** — Simple Interest · Compound Interest (with growth chart) · EMI Calculator (with pie chart) · SIP Calculator (with growth chart) · GST Calculator · Discount Calculator · Profit & Loss

**Mathematics** — Percentage Calculator (4 modes) · Quadratic Equation Solver · LCM & HCF · Average (mean/median/mode)

**Time & Date** — Age Calculator · Date Difference Calculator

**Health** — BMI Calculator · BMR Calculator

**Project Management** — PERT Calculator

**Computer Science** — Binary/Decimal/Octal/Hex Converter · IPv4 Subnet Calculator

**Unit Converter** — Length, Weight, Area, Volume, Speed, Data Storage, Time, Temperature — one reusable engine

## Formula reference

| Calculator | Formula |
|---|---|
| Simple Interest | SI = P × R × T ÷ 100 |
| Compound Interest | A = P(1 + r/n)^(nt) |
| EMI | EMI = [P × r × (1+r)^n] ÷ [(1+r)^n − 1] |
| BMI | BMI = Weight(kg) ÷ Height(m)² |
| BMR (Mifflin-St Jeor) | Male: 10W + 6.25H − 5A + 5 · Female: 10W + 6.25H − 5A − 161 |
| PERT | TE = (O + 4M + P) ÷ 6, Variance = ((P−O)÷6)² |
| Quadratic roots | x = [−b ± √(b²−4ac)] ÷ 2a |

## Future improvements

- CPM Calculator with critical-path visualization
- Gantt chart generator
- More CS tools (data storage converter as a standalone page, boolean algebra)
- Fuel cost, electricity bill, salary/tax calculators
- Backend sync for cross-device favorites/history (currently LocalStorage-only by design)

## Contributing

1. Add a component under `src/calculators/<category>/YourCalculator.jsx` following the pattern of existing calculators (InputField → validate → ResultCard → FormulaCard).
2. Register it in `src/data/calculatorRegistry.js` with an `id`, `name`, `category`, `description`, `keywords`, and a `lazy()` import.
3. That's it — search, routing, the category page, and related-calculator suggestions all pick it up automatically.

## License

MIT — free to use, modify, and include in your own portfolio.
