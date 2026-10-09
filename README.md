# Elite Sports Hub Nepal 🇳🇵

> High-performance luxury e-commerce platform for official Nepal National Cricket & Football kits, World Football, Indian Cricket, and numbered limited-edition collector jerseys. Built with **Next.js (App Router)**, **Sanity CMS**, and a bespoke Swiss architectural **Black & White** design system.

---

## ⚡ Features

- **Luxury Black & White Editorial Aesthetic**: Inspired by high-fashion sportswear (Yohji Yamamoto Y-3, NikeLab, Off-White). Monochromatic contrast (`#000000` / `#ffffff`), hairline architectural borders, and display typography (`Syne` + `Space Grotesk`).
- **Interactive Animated Hero Showcase**: Auto-rotating headline kit slides with live specifications matrix, technical metadata, and slide progress controls.
- **Live Jersey Customizer Studio**: Real-time heat-press lettering simulation on an architectural blueprint grid. Customers can preview custom names & tournament numbers (e.g., `PARAS #77`) before adding to cart.
- **Nepal-Specific E-Commerce**:
  - Live currency formatted in **NPR (`रू` / `NPR`)**.
  - Same-day express dispatch in Kathmandu Valley and courier delivery to all 77 districts of Nepal.
  - Localized checkout with **Cash on Delivery (COD)**, **eSewa**, and **Khalti** integration.
- **Sanity CMS Integration**:
  - Connects to Sanity Project `cfa5sriy` (`production` dataset).
  - Server-side proxy route at `/api/jerseys` providing live queries and avoiding browser CORS restrictions.
  - Automated seeding script (`npm run seed:sanity`).
- **Real-time Inventory & Catalog Manager**: In-app management modal for adjusting stock counts, activating low-stock flags, triggering flash sale drops, and adding new jerseys.
- **Shopping Bag & Wishlist**: Slide-out cart drawer with free shipping progress bar, promo code calculation, and instant checkout modal.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Vanilla CSS Design Tokens (Custom Monochrome Design System)
- **CMS**: [Sanity.io](https://www.sanity.io/) (GROQ API & Content Lake)
- **Icons**: Lucide React

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/pujasharma5431/Elite-sports-hub.git
cd Elite-sports-hub
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory (refer to `.env.example`):
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=cfa5sriy
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-03-01
SANITY_API_READ_TOKEN=
SANITY_API_WRITE_TOKEN=
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the storefront.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 📦 Project Structure

```text
├── sanity/
│   └── schemas/
│       └── jersey.ts           # Sanity schema for jersey products
├── scripts/
│   └── seed-sanity.mjs         # One-click Sanity content seeding script
├── src/
│   ├── app/
│   │   ├── api/jerseys/        # Server-side API proxy for Sanity GROQ queries
│   │   ├── globals.css         # Pure Black & White design tokens & typography
│   │   ├── layout.tsx          # Root layout with Google Fonts
│   │   └── page.tsx            # High-conversion shop landing page
│   ├── components/
│   │   ├── CartDrawer.tsx      # Slide-out bag with NPR totals
│   │   ├── CheckoutModal.tsx   # Nepal delivery address & payment selection
│   │   ├── InventoryManagerModal.tsx # In-app catalog & stock manager
│   │   ├── JerseyCard.tsx      # Clean hover quick-size product card
│   │   ├── JerseyCustomizerSection.tsx # Live heat-press back-print simulation
│   │   ├── ModernNikeHero.tsx  # Editorial auto-rotating showcase hero
│   │   ├── Navbar.tsx          # Minimal header with live Sanity badge
│   │   ├── NepalDeliveryBanner.tsx # Live announcement ticker
│   │   ├── NikeFilterBar.tsx   # Sticky filter pills & refinement drawer
│   │   ├── SanityConnectModal.tsx # Sanity configuration modal
│   │   └── TrendingDropsCarousel.tsx # Numbered limited edition drops
│   ├── context/
│   │   └── StoreContext.tsx    # State management (cart, wishlist, catalog, Sanity)
│   ├── data/
│   │   └── initialJerseys.ts   # 19 curated authentic jerseys
│   ├── lib/
│   │   └── sanity.ts           # Sanity client and GROQ queries
│   └── types/
│       └── jersey.ts           # TypeScript interfaces & types
```

---

## 📄 License
MIT License. Created for Elite Sports Hub Kathmandu.
