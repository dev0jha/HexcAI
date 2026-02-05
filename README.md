<div align="center">

# HireXAI

### Hire Smarter. Hire by Code.

**AI-powered developer evaluation & hiring platform that assesses real GitHub code, not resumes.**

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Turborepo](https://img.shields.io/badge/Turborepo-2.7-EF4444?style=for-the-badge&logo=turborepo)](https://turbo.build/)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [Contributing](#-contributing)

</div>

---

## 📋 Overview

**HireXAI** transforms the developer hiring process by evaluating candidates based on their **real GitHub repositories** using AI-powered code analysis. The platform generates transparent **Developer Scores** (0-100) across multiple dimensions while respecting developer privacy and consent.

### 🎯 Key Benefits

**For Developers:**
- 📊 Get AI-evaluated Developer Score based on real code quality
- 🎓 Understand strengths and areas for improvement
- 🔒 Control visibility and recruiter access (opt-in only)
- 💼 Get discovered by recruiters without spam

**For Recruiters:**
- ⚡ Find top-tier developers faster
- 🔍 See real code quality before contacting
- 🎯 Filter by tech stack and skill levels
- 📈 Make data-driven hiring decisions

---

## ✨ Features

### 🧠 AI-Powered Code Analysis
- **Code Quality** (30%): Clean code practices, maintainability, complexity
- **Architecture** (20%): Design patterns, structure, scalability
- **Security** (20%): Vulnerability detection, best practices
- **Git Practices** (15%): Commit quality, branching, collaboration
- **Documentation** (15%): README quality, inline comments, API docs

### 👨‍💻 Developer Dashboard
- Analyze GitHub repositories with one-click
- View detailed score breakdowns with explanations
- Control recruiter visibility with "Open to Recruiters" toggle
- Manage incoming contact requests (accept/reject)
- Privacy-first: Contact info shared only after approval

### 🧑‍💼 Recruiter Discovery
- Browse high-scoring developers (≥80 score)
- Filter by technologies, frameworks, and score ranges
- View public developer profiles with code insights
- Send personalized contact requests
- Consent-based outreach system

### 🏆 Developer Score System

| Score Range | Label | Description |
|------------|-------|-------------|
| 90-100 | 🌟 Excellent | Outstanding code quality and practices |
| 80-89 | 💪 Strong | Solid developer with great fundamentals |
| 60-79 | ⚡ Average | Good foundation, room for growth |
| <60 | 📚 Needs Improvement | Focus on core skills development |

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16.1](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5.9](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/), [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [Jotai](https://jotai.org/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Animations**: [Motion](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/), [Tabler Icons](https://tabler.io/icons)

### Backend & Database
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Database**: [Neon Serverless Postgres](https://neon.tech/)
- **Authentication**: [Better Auth](https://www.better-auth.com/)
- **API**: [Elysia](https://elysiajs.com/)

### AI & Analytics
- **AI SDK**: [Vercel AI SDK](https://sdk.vercel.ai/)
- **LLM Provider**: [Groq](https://groq.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Flow Diagrams**: [XYFlow](https://reactflow.dev/)

### Development Tools
- **Build System**: [Turborepo](https://turbo.build/)
- **Package Manager**: [Bun](https://bun.sh/)
- **Linting**: [ESLint 9](https://eslint.org/)
- **Formatting**: [Prettier](https://prettier.io/)
- **Git Hooks**: [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/lint-staged/lint-staged)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: >=18.0.0
- **Bun**: 1.2.22 or higher
- **Git**: Latest version

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dev0jha/HireXAI.git
   cd HireXAI
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp apps/web/.env.example apps/web/.env.local
   ```
   
   Configure the following variables:
   ```env
   # Database
   DATABASE_URL="your-neon-database-url"
   
   # Authentication
   BETTER_AUTH_SECRET="your-secret-key"
   BETTER_AUTH_URL="http://localhost:3000"
   
   # AI
   GROQ_API_KEY="your-groq-api-key"
   
   ```

4. **Run database migrations**
   ```bash
   bun run db:migrate
   ```

5. **Start the development server**
   ```bash
   bun dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
# Development
bun dev              # Start all apps in dev mode
bun run dev:web      # Start only web app

# Building
bun build            # Build all apps
bun run build:web    # Build only web app

# Code Quality
bun lint             # Run ESLint across all packages
bun format           # Format code with Prettier
bun format:check     # Check code formatting
bun check-types      # Type-check all packages

# Database
bun run db:generate  # Generate Drizzle migrations
bun run db:migrate   # Run database migrations
bun run db:studio    # Open Drizzle Studio
```

---

## 📁 Project Structure

```
HireXAI/
├── apps/
│   └── web/                    # Next.js 16 application
│       ├── app/                # App Router pages
│       │   ├── (auth)/        # Authentication routes
│       │   ├── dashboard/     # Developer dashboard
│       │   ├── recruiter/     # Recruiter portal
│       │   ├── profile/       # Public profiles
│       │   └── page.tsx       # Landing page
│       ├── components/         # React components
│       │   ├── ui/            # shadcn/ui components
│       │   ├── layout/        # Navbar, Footer, Sidebar
│       │   ├── developer/     # Developer-specific UI
│       │   ├── recruiter/     # Recruiter-specific UI
│       │   └── analysis/      # Score visualization
│       ├── hooks/             # Custom React hooks
│       ├── lib/               # Utilities & configs
│       ├── store/             # Jotai state atoms
│       ├── types/             # TypeScript definitions
│       └── public/            # Static assets
│
├── packages/
│   ├── ui/                    # Shared UI components
│   ├── eslint-config/         # ESLint configurations
│   └── typescript-config/     # TypeScript configs
│
├── turbo.json                 # Turborepo config
├── package.json               # Root dependencies
└── README.md                  # You are here!
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m "Add some amazing feature"
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style (enforced by ESLint/Prettier)
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure `bun lint` and `bun check-types` pass

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.


</div>
