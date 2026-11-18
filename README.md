# Diaspora4Bellefleur

A transparent, multilingual platform enabling the Haitian diaspora to learn about Jean Fritznel Bellefleur's candidacy for Senator of the Nord-Ouest department.

## 🎯 Project Status: Foundation

This project is in its foundation phase. Core infrastructure, database schema, and steering rules are in place. Features will be built incrementally.

## 🏗️ Architecture

### Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript (strict mode)
- **Database**: PostgreSQL + Prisma ORM
- **Styling**: Tailwind CSS
- **Internationalization**: next-intl (Haitian Creole, French, English)
- **Validation**: Zod
- **Testing**: Vitest, Playwright, Testing Library

### Key Principles

1. **Server-First**: Maximize Server Components for performance and security
2. **Type Safety**: Strict TypeScript throughout
3. **Configuration Over Code**: Database-driven rules and limits
4. **Isolation**: Separate from any other campaign sites
5. **Compliance**: Built-in guardrails for election law and privacy

## 📋 Prerequisites

- Node.js 20+
- PostgreSQL 14+
- npm 10+

## 🚀 Getting Started

### 1. Clone and Install

```bash
git clone <repository-url>
cd jeanbellfleur
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env
```

Edit `.env` with your database credentials and configuration.

### 3. Database Setup

```bash
# Run migrations
npm run db:migrate:dev

# Seed initial data
npm run db:seed
```

### 4. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

```bash
# Run all tests
npm run ci

# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Smoke tests (production build)
npm run test:smoke
```

## 📁 Project Structure

```
/
├── .kiro/steering/        # Project rules and documentation
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── [locale]/     # Internationalized routes
│   │   └── api/          # API routes
│   ├── components/
│   │   ├── client/       # Client Components
│   │   └── server/       # Server Components
│   ├── lib/
│   │   ├── db/           # Database utilities
│   │   ├── payments/     # Payment provider adapters
│   │   ├── validation/   # Zod schemas
│   │   └── config/       # Configuration loaders
│   └── i18n/             # Translations
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed data
└── tests/                # Test suites
```

## 🎨 Key Features

### Implemented (Foundation)
- ✅ Multilingual support (ht, fr, en)
- ✅ Database schema with candidate config
- ✅ Type-safe configuration system
- ✅ Payment provider abstraction
- ✅ Validation schemas
- ✅ Test infrastructure

### Planned
- ⏳ Candidate profile pages
- ⏳ Contribution flow (gated by config)
- ⏳ Content management
- ⏳ Email subscriptions
- ⏳ Admin dashboard

## 🔒 Non-Negotiable Rules

See `.kiro/steering/rules.md` for complete rules. Key highlights:

1. **Honest Affiliation**: Always disclose relationship to campaign
2. **Verified Status**: Only use "running" language if status is verified
3. **No Fabrication**: Every fact must have a source
4. **Visual Assets**: No unapproved photos/logos
5. **Money Gate**: Donations off by default
6. **Privacy First**: Minimum data collection
7. **Database Config**: All compliance rules in database
8. **Server/Client Boundary**: No function props from Server to Client Components
9. **No Private Data**: Only public, sourced information
10. **No Copying**: No campaign designs or branding

## 🌍 Internationalization

The platform supports three languages with Haitian Creole as primary:

- **ht** (Haitian Creole) - Primary
- **fr** (French) - Secondary  
- **en** (English) - Tertiary

All routes are prefixed: `/ht/`, `/fr/`, `/en/`

## 💳 Payment Integration

Payment provider is abstracted via an adapter interface. Currently configured for test mode.

To enable donations:
1. Set `ENABLE_DONATIONS=true` in environment
2. Configure payment provider credentials
3. Update candidate config via admin interface

**Default: Donations are OFF**

## 🗄️ Database

### Candidate Configuration

Single source of truth at `CandidateConfig` table. **Never hard-code**:
- Candidate name
- Office
- Department
- Election dates
- Contribution limits

All values must come from `getCandidateConfig()`.

### Key Models

- `CandidateConfig` - Campaign configuration
- `Content` - Sourced, versioned content
- `Contribution` - Encrypted donor data
- `ComplianceRule` - Database-driven limits
- `AuditLog` - Change tracking

## 🔧 Configuration

### Feature Flags

- `ENABLE_DONATIONS` - Turn on/off contribution features (default: false)

### Compliance

- `ALLOWED_COUNTRIES` - Comma-separated country codes (default: US,CA,FR)
- Min/max contribution amounts in database config

## 📜 Scripts

- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run lint` - Lint code
- `npm run typecheck` - TypeScript check
- `npm run format` - Format with Prettier
- `npm run db:migrate:dev` - Run database migrations
- `npm run db:seed` - Seed database
- `npm run ci` - Full CI pipeline

## 🤝 Contributing

See `.kiro/steering/` for:
- `product.md` - Product vision
- `tech.md` - Technical architecture
- `rules.md` - Non-negotiable rules
- `structure.md` - Code conventions

Every contribution must comply with the rules in `.kiro/steering/rules.md`.

## 📄 License

[To be determined]

## ⚠️ Disclaimer

This is an independent supporter initiative, **not authorized by or affiliated with Jean Fritznel Bellefleur, his campaign or any party**.

Candidacy status is currently UNVERIFIED. Information will be updated as verification is obtained.
# jeanbellefleur
