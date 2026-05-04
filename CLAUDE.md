# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Start development server (localhost:3000)
npm run build     # Production build
npm run lint      # Run ESLint via Next.js
```

No test runner is configured in this project.

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_API_URL` — base URL for API routes (used in `consts/apiRoutes.ts` and the NextAuth authorize callback)
- `NEXT_PUBLIC_API_BASE_URL` — base URL for the axios instance in `lib/api.ts`
- `NEXT_AUTH_SECRET` — secret for NextAuth JWT sessions

## Architecture

**App Router (Next.js 16)** — pages live under `app/`. The root layout wraps all pages in `<Main>` (which provides `SessionProvider`) and then in `<Providers>` (a client boundary, currently a passthrough).

**Authentication** — NextAuth v4 with credentials provider at `app/api/auth/[...nextauth]/route.ts`. It calls `NEXT_PUBLIC_API_URL/auth/login` and uses JWT sessions. The `LoginForm` component (`components/form/loginForm.tsx`) calls `signIn('credentials', ...)` and redirects to `/dashboard/button` on success.

**HTTP client** — `lib/api.ts` is an axios instance that reads `oms_token` from cookies and attaches it as a Bearer token. On a 401 response it clears `oms_token`/`oms_user` cookies and redirects to `/login`.

**Global state** — Zustand store in `hooks/useUser.tsx` (`useUserStore`) holds the current user object. Import via `@/hooks`.

**Component library** — shared UI lives in `components/` and is barrel-exported from `components/index.tsx`. Use `@/components` for all imports. Key components:
- `Button` — `variant` (solid/outline/text) × `colorScheme` (primary/secondary/neutral/success/danger/warning/black/white), supports `loading` state with spinner
- `Input` — extends `InputHTMLAttributes`, auto-shows password toggle for `type="password"`, variants: solid-white/solid-gray/error
- `Sidebar` — sticky left nav; expects a `logo` prop (StaticImageData)
- `Slider` — wraps react-slick

**Path alias** — `@/*` maps to the repo root (see `tsconfig.json`). Use `@/` for all internal imports.

**Styling** — Tailwind CSS v4 with PostCSS. Use `clsx` for conditional class composition. SASS is available for any `.scss` files.

**Static assets** — images and GIFs are barrel-exported from `public/index.ts` (via `public/images/index.ts` and `public/gifs/index.ts`). Import them as `@/public` named exports.

**API route constants** — `consts/apiRoutes.ts` exports `API_ROUTES` with login/register/logout/listUser paths prefixed by `NEXT_PUBLIC_API_URL`.
