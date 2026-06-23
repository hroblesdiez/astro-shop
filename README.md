# Astro Shop

[![Astro](https://img.shields.io/badge/Astro-6-FF5D01?logo=astro)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![WooCommerce](https://img.shields.io/badge/WooCommerce-9-96588A?logo=woocommerce)](https://woocommerce.com)
[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?logo=netlify)](https://www.netlify.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Headless WooCommerce e-commerce built with Astro 6, TypeScript 6, and Tailwind CSS v4 — a portfolio project demonstrating modern JAMstack architecture with production-quality engineering practices.

## Overview

Astro Shop is a fully functional headless WooCommerce storefront. The frontend is built with Astro's server-first architecture, using minimal JavaScript and rendering as much as possible at build time. The product catalog is fetched via GraphQL (WPGraphQL) during build, while cart and checkout operations use the WooCommerce Store API at runtime.

The backend runs on Oracle Cloud Free Tier with WordPress + WooCommerce as the source of truth. The frontend is deployed on Netlify.

## Architecture

```
Netlify
    │
    ▼
Astro Frontend
    │
    ├── GraphQL (catalog — build time)
    └── Store API (cart/checkout — runtime)
    │
    ▼
Oracle Cloud Free Tier
    │
    ├── WordPress
    ├── WooCommerce
    └── MySQL 8
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Astro 6, TypeScript 6, Tailwind CSS v4 |
| **Backend** | WordPress, WooCommerce, WPGraphQL, WooGraphQL |
| **Infrastructure** | Netlify, Oracle Cloud Free Tier, Docker, MySQL 8 |
| **Payments** | Stripe |
| **Testing** | Vitest (unit), Playwright (E2E) |

## Key Features

- **Product Catalog** — categories, attributes, variable products (color, talla), images, reviews
- **Category Pages** — filter products by category with SEO-friendly URLs
- **Bestsellers Section** — top-selling products on the homepage
- **Variable Products** — select variations with real-time price updates
- **Mini Cart** — accessible slide-over drawer with keyboard navigation, ESC to close
- **Full Cart Page** — update quantities, remove items, coupon support, subtotal/taxes/total
- **Stripe Checkout** — guest checkout via WooCommerce Store API
- **Server-First** — Astro islands only when interactivity is required
- **Responsive** — mobile-first design
- **Accessible** — WCAG AA, semantic HTML, focus management, aria labels
- **SEO-Ready** — canonical URLs, OpenGraph, Twitter Cards, product schema, breadcrumb schema, XML sitemap, robots.txt
- **Performance** — Lighthouse ≥ 90, minimal JS, optimized images

## Project Structure

```
frontend/
├── public/images/categories/    # Static category images
└── src/
    ├── assets/                  # SVGs, illustrations
    ├── components/              # Reusable Astro components
    │   └── product/             # Product-specific components
    ├── layouts/                 # Page layouts
    ├── lib/                     # Business logic, utilities
    │   └── __tests__/           # Unit tests (Vitest)
    ├── pages/
    │   ├── api/cart/            # Cart API endpoints
    │   └── products/            # Product detail pages
    ├── queries/                 # Centralized GraphQL queries
    ├── scripts/                 # Build-time scripts
    └── styles/                  # Global styles
```

## Getting Started

### Prerequisites

- Node.js ≥ 22.12.0
- A WooCommerce instance with WPGraphQL and WooGraphQL plugins

### Setup

```bash
git clone <repo-url>
cd frontend
npm install
```

Create a `.env` file:

```env
PUBLIC_WOO_GRAPHQL_URL=https://your-domain.com/graphql
PUBLIC_WOO_STORE_API_URL=https://your-domain.com/wp-json/wc/store
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
npm run preview
```

## Data Architecture

| Concern | API | When | Source of Truth |
|---------|-----|------|-----------------|
| Products, categories, attributes | WPGraphQL (GraphQL) | Build time | WooCommerce |
| Cart, checkout, coupons | WooCommerce Store API | Runtime | WooCommerce |
| Variation prices | WPGraphQL | Build time | WooCommerce |

- All GraphQL queries are centralized in `src/queries/` — no inline GraphQL.
- Cart state is persisted in `localStorage` and synchronized with the WooCommerce session cart.
- Business totals are never calculated on the frontend.

## Testing

```bash
# Unit tests
npm test

# Watch mode
npm run test:watch

# Coverage (80%+ target)
npm run test:coverage
```

E2E tests are written with Playwright covering: product listing, product detail, variation selection, add to cart, remove from cart, coupon application, and checkout navigation.

## Performance & Accessibility

- Lighthouse scores ≥ 90 across all categories
- WCAG AA compliant
- Full keyboard navigation
- Focus management and ARIA labels
- Semantic HTML throughout
- Astro's islands architecture keeps client-side JS to a minimum

## Security

- Environment variables only — no secrets in code
- All API secrets, Stripe keys, and WordPress credentials are server-side only
- Frontend values are never trusted; everything is validated through WooCommerce

## License

MIT
