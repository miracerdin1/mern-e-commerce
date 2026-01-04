# MERN E-Commerce Project

This is a MERN e-commerce project.

## Package Manager

This project uses **pnpm** as the package manager with a monorepo workspace structure.

### Prerequisites

- Node.js (v18 or higher recommended)
- pnpm (v10.26.0 or higher)

To install pnpm globally:

```bash
npm install -g pnpm
```

### Project Structure

```
mern-e-commerce/
├── client/          # React + Vite frontend
├── server/          # Express + TypeScript backend
├── shared/          # Shared types and utilities
└── pnpm-workspace.yaml
```

## Installation

Install all dependencies for all workspace packages:

```bash
pnpm install
```

## Development

### Run all services

You can run server and client in separate terminals:

**Server:**

```bash
cd server
pnpm dev
```

**Client:**

```bash
cd client
pnpm dev
```

### Or use workspace filters from root

```bash
# Run server
pnpm --filter server dev

# Run client
pnpm --filter client dev
```

### Build shared package

```bash
cd shared
pnpm build
```

## Available Scripts

### Client (React + Vite)

- `pnpm dev` - Start development server (http://localhost:5173)
- `pnpm build` - Build for production
- `pnpm lint` - Run ESLint
- `pnpm preview` - Preview production build

### Server (Express + TypeScript)

- `pnpm dev` - Start development server with nodemon
- `pnpm start` - Start production server

### Shared

- `pnpm build` - Compile TypeScript types

## Migration from npm to pnpm

This project was recently migrated from npm to pnpm. Key changes:

- Added `pnpm-workspace.yaml` for workspace configuration
- All `package-lock.json` files replaced with `pnpm-lock.yaml`
- Shared package now uses pnpm workspace linking
- All npm commands replaced with pnpm equivalents
