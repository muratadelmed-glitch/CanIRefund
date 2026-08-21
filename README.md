# CanIRefund — editable rebuild

This project is an **independent reconstruction of the public page at `canirefund.b12sites.com`**, created so the site can be edited outside B12.

## What was preserved
- Public page title and core positioning
- 10-store list: Amazon, Walmart, Target, Best Buy, Apple, Costco, Nike, Zara, Sephora, Home Depot
- 5-stage checker concept: Store → Category → Date → Condition → Result
- “How It Works”, “Supported Stores”, “Why Use CanIRefund?”, FAQ, and CTA content
- Publicly visible general-window labels: Best Buy 15 days; Home Depot 30 days

## What is NOT an original B12 export
B12 did not expose the original HTML/CSS/JS source or any private policy database through the connected tool. The live page content was recoverable, so this project recreates it as clean, modular HTML/CSS/JS.

## Safety/accuracy choice
The public page says results should be exact and sourced from official retailer policies. Because the private policy dataset was not exposed, this rebuild intentionally **does not fabricate eligibility decisions**. `data/policies.json` is a schema scaffold. Add verified policy records before enabling calculations.

## Files
- `index.html` — semantic page structure
- `styles.css` — responsive styling
- `script.js` — checker interaction/wizard
- `data/policies.json` — policy-data scaffold

## Run locally
No build step is required. Open `index.html`, or serve the folder with any static web server.

Example:
```bash
python -m http.server 8080
```
Then open `http://localhost:8080`.

## Good next development steps
1. Build a verified retailer policy dataset from official sources.
2. Add category-specific exceptions and membership/holiday rules.
3. Calculate deadlines in a dedicated policy engine rather than inline UI code.
4. Add source URL + `verified_at` for every rule.
5. Add automated tests for boundary dates and exceptions.
6. Add SEO metadata, sitemap, analytics, and production deployment config when ready.
