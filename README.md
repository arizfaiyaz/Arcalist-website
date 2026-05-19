# Arcalist

Arcalist is the marketing site for arcalist.app.

Live site: https://arcalist.app

## Overview

This repository hosts the Arcalist landing page built with Vite, React, and Tailwind CSS. It is designed for fast iteration, clean typography, and deploys easily to modern static hosting platforms.

## Features

- Vite-powered React app
- Tailwind CSS for styling
- TypeScript for type safety
- Fast local dev server with hot reload
- Production-ready build output

## Tech Stack

- React 19
- TypeScript 5
- Vite 6
- Tailwind CSS 3
- PostCSS + Autoprefixer

## Getting Started

### Prerequisites

- Node.js 18+ (20+ recommended)
- pnpm 9+

### Install

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Production Build

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## Environment Variables

Create a `.env` file in the project root and provide the following values:

- `VITE_PUBLIC_APP_URL` - Public base URL for arcalist.app
- `VITE_CHECKOUT_RETURN_URL` - Post-checkout return URL
- `VITE_CHECKOUT_CANCEL_URL` - Checkout cancel URL
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase public anon key

Do not commit real secrets. Keep `.env` local.

## Project Structure

```
.
├─ public/
├─ src/
│  ├─ App.tsx
│  ├─ index.css
│  └─ main.tsx
├─ index.html
├─ tailwind.config.cjs
├─ postcss.config.cjs
└─ vite-env.d.ts
```

## Deployment

This project is Vercel-ready (see `vercel.json`) and works with any static host that serves the `dist/` directory.

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "feat: add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

Please keep PRs small and focused. If you are changing UI, include screenshots or a short screen recording.

## Code Style

- TypeScript + React functional components
- Tailwind CSS utility-first styling
- Keep components small and composable

## License

This project is currently unlicensed. If you want to open-source it, add a LICENSE file and update this section accordingly.

## Support

If you need help or want to report an issue, open a GitHub issue or contact the team via the Arcalist site.
