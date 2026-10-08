# ScalePulse Digital — High-Converting Marketing Agency Website

A modern, high-performance, 5-page digital marketing agency website and conversion funnel engineered for maximum lead capture, bold typography, and smooth micro-interactions.

---

## 🚀 Live Pages Included

1. **[Home Page (`index.html`)](file:///c:/Users/ACER/Documents/antigravity/bold-noether/index.html)**
   - **Hero Section**: Bold value proposition (*"Stop Wasting Ad Spend On Clicks That Never Convert"*), 2-minute video breakdown with interactive tracking badges (*"Live ROAS +4.82x"*, *"94% Retention"*).
   - **How Everything Works (4 Pillars)**:
     - **Google Ads**: High-Intent Search & Performance Max
     - **Meta Ads**: High-Velocity Creative Testing
     - **Organic SEO**: Compounding Zero-CAC Buyer Pipeline
     - **SMM & Retargeting**: Omnipresent Social Authority
   - **The Conversion Dilemma**: Side-by-side comparison of the Leaky Agency Funnel (1.2% CVR) vs. The ScalePulse Precision Pipeline (6.4% CVR).
   - **Proof & Case Studies**: Real-time results without fluff across SaaS, eCommerce, and B2B services.
   - **Interactive ROI Calculator**: Real-time slider calculating projected monthly revenue lift and added qualified leads.

2. **[Contact Page with Form (`contact.html`)](file:///c:/Users/ACER/Documents/antigravity/bold-noether/contact.html)**
   - Complete embedded contact & audit form.
   - Captures: Name, Phone, Email, Business Name, Website URL, Services Needed, Ad Budget, and Bottlenecks.
   - Direct agency channels: Direct phone line, audit desk email, priority WhatsApp/Slack.
   - Transparent 3-step SLA roadmap (2-hour triage, 5-min custom Loom, 30-min strategy session).

3. **[Conversion Page (`conversion.html`)](file:///c:/Users/ACER/Documents/antigravity/bold-noether/conversion.html)**
   - The science of landing page conversion rate optimization (CRO).
   - **Interactive A/B Testing Simulator**: Toggle between Control variant (1.8% CVR) and ScalePulse Challenger variant (6.4% CVR).
   - **The 5 Non-Negotiable Laws of High Conversion**: The 3-second hook, frictionless modal forms, message matching, proof density, and server-side first-party CAPI.

4. **[Problem Solving Page (`problem-solving.html`)](file:///c:/Users/ACER/Documents/antigravity/bold-noether/problem-solving.html)**
   - Interactive diagnosis of the 4 most common marketing bottlenecks:
     - Google Ads high click costs without qualified leads.
     - Meta Ads creative burnout & post-iOS tracking loss.
     - Stagnant SEO traffic with zero commercial buyers.
     - Leads ghosting sales reps during follow-up.
   - Click-to-expand diagnostic root causes and 3-step surgical remedies.

5. **[Thank You Page (`thank-you.html`)](file:///c:/Users/ACER/Documents/antigravity/bold-noether/thank-you.html)**
   - Automatically displayed after submitting either the pop-up modal or the contact page form.
   - **Personalized Lead Greeting**: Reads visitor's name & website from `localStorage`.
   - **Celebration Confetti**: Lightweight canvas confetti explosion on load.
   - **Core Commitments**: "We will contact shortly within 24 hrs", "Will send your personalized report", and live audit pipeline progress indicators.

---

## ⚡ Universal "GET FREE ANALYSIS" Pop-up Modal

- Clicking the high-contrast **"GET FREE ANALYSIS"** button in the header, hero, cards, or mobile sticky bar opens a **smooth animated modal overlay on ANY page**.
- Fields matching wireframe:
  1. Full Name
  2. Phone Number
  3. Business Name
  4. Website URL
  5. What service do you need? (Google Ads, Meta Ads, SEO, SMM)
  6. Monthly Ad Budget
- Submitting saves data to `localStorage` and redirects to `thank-you.html`.

---

## 🛠️ Tech Stack & Architecture

- **HTML5 & Modern Semantics**: Clean, accessible, SEO-optimized markup.
- **Modern CSS3**:
  - Crisp light white palette (`#FFFFFF`, `#F8FAFC`, `#090D16`, `#2563EB`, `#10B981`)
  - Typography: Google Fonts `Plus Jakarta Sans` & `Space Grotesk`
  - Smooth hardware-accelerated transforms & cubic-bezier transitions (`0.16, 1, 0.3, 1`)
  - Fully mobile-responsive down to 320px
- **Vanilla JavaScript (`js/main.js`)**: Zero external bloated dependencies. Fast, reliable, and accessible.
- **Vite Multi-Page Build**: Instant local dev server & production bundler.

---

## 💻 How to Run Locally

```bash
# 1. Install dependencies (already installed)
npm install

# 2. Start local development server
npm run dev
# -> Opens on http://localhost:3000/

# 3. Create production build
npm run build
```
