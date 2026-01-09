# HireXAI – Product Requirements Document (PRD)

**Product Name:** HireXAI  
**Tagline:** Hire Smarter. Hire by Code.  
**Product Type:** AI-powered developer evaluation & hiring platform  
**Scope:** Frontend-first (Next.js 14 – App Router)  
**Last Updated:** 2026

---

## 1. Product Overview

HireXAI is a modern hiring platform that evaluates developers based on their **real GitHub code**, not resumes.  
Using AI, HireXAI generates a **Developer Score** and allows recruiters to **discover and contact top developers**, only with developer consent.

The platform is built with a **developer-first, privacy-first** approach.

---

## 2. Problem Statement

### Problems with Traditional Hiring

- Resumes don’t reflect real coding skills
- GitHub profiles are ignored or misjudged
- Recruiters spend excessive time screening
- Developers struggle to stand out authentically

### HireXAI Solves This By:

- Using real GitHub repositories
- Generating transparent, AI-based scores
- Enabling ethical, consent-based recruiter outreach

---

## 3. Goals & Objectives

### Primary Goals

- Evaluate developers using real code
- Provide a clear, explainable Developer Score
- Enable faster, smarter hiring

### Success Metrics

- Clear value understood within 5 seconds
- Recruiters can identify top developers easily
- Developers feel safe and in control

---

## 4. Target Users

### 👨‍💻 Developers

- Students, professionals, open-source contributors
- Want skill-based visibility
- Want recruiter outreach without spam

### 🧑‍💼 Recruiters

- Hiring managers, founders, HR teams
- Want fast, reliable technical signals
- Want to see code before contacting

### 🛠️ Admin (Platform Owner)

- Moderates users
- Maintains trust & quality
- Manages platform rules

---

## 5. Core Features

### 5.1 GitHub Repository Analysis (UI Scope)

**Frontend Capabilities**

- Input GitHub repository URL
- Show analysis progress
- Display AI-generated insights

**Displayed Metrics**

- Code Quality
- Architecture & Structure
- Security Practices
- Documentation
- Git Activity

---

### 5.2 Developer Score System

**Score Range:** 0 – 100

| Category      | Weight |
| ------------- | ------ |
| Code Quality  | 30%    |
| Architecture  | 20%    |
| Security      | 20%    |
| Git Practices | 15%    |
| Documentation | 15%    |

**Score Labels**

- 90–100 → Excellent
- 80–89 → Strong
- 60–79 → Average
- <60 → Needs Improvement

---

### 5.3 Developer Visibility & Consent

Developers control whether recruiters can see and contact them.

**UI Features**

- “Open to Recruiters” toggle
- Add contact info (email / LinkedIn)
- Visibility badge

**Rules**

- Only developers with score ≥ 80 are visible
- Opt-in required

---

### 5.4 Recruiter Discover Experience

Recruiters can:

- Browse high-scoring developers
- Filter by score & tech stack
- View public developer profiles

**Contact Flow**

- Click “Contact Developer”
- Write message in modal
- Request sent for approval

---

### 5.5 Contact Requests (Developer Inbox)

Developers can:

- View recruiter messages
- Accept or reject requests
- Share contact info only after acceptance

---

## 6. User Flows

### Developer Flow

1. Sign up / Login
2. Analyze GitHub repository
3. View Developer Score
4. Enable recruiter visibility
5. Receive & manage contact requests

### Recruiter Flow

1. Sign up / Login
2. Discover top developers
3. Filter candidates
4. Send contact request
5. Await developer approval

---

## 7. Landing Page Content

### Sections

1. Hero (Headline, subheadline, CTAs)
2. Problem statement
3. How it works
4. Developer Score explanation
5. For Developers
6. For Recruiters
7. Trust signals
8. FAQ
9. Final CTA

---

## 8. Frontend Folder Structure (Next.js 14)

```txt
hirexai/
├── app/
│   ├── page.tsx              # Landing page (/)
│   ├── layout.tsx
│   ├── globals.css
│
│   ├── pricing/
│   │   └── page.tsx
│
│   ├── about/
│   │   └── page.tsx
│
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── analyze/
│   │   │   └── page.tsx
│   │   ├── results/
│   │   │   └── page.tsx
│   │   ├── requests/
│   │   │   └── page.tsx
│   │   └── settings/
│   │       └── page.tsx
│
│   ├── recruiter/
│   │   ├── discover/
│   │   │   └── page.tsx
│   │   ├── candidates/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│
│   ├── profile/
│   │   └── [username]/
│   │       └── page.tsx
│
│   └── not-found.tsx
│
├── components/
│   ├── ui/                  # shadcn/ui
│   ├── layout/              # Navbar, Footer, Sidebar
│   ├── developer/           # Score, visibility, inbox
│   ├── recruiter/           # Cards, filters, modals
│   ├── analysis/            # Score breakdown UI
│   └── shared/              # Loader, EmptyState
│
├── hooks/
│   ├── useFilters.ts
│   ├── useContactModal.ts
│   └── useVisibility.ts
│
├── store/                   # Frontend state (Zustand)
│   ├── user.store.ts
│   ├── analysis.store.ts
│   └── recruiter.store.ts
│
├── data/                    # Mock data
│   ├── mockDevelopers.ts
│   ├── mockAnalysis.ts
│   └── mockRequests.ts
│
├── types/
│   ├── user.ts
│   ├── developer.ts
│   ├── recruiter.ts
│   └── analysis.ts
│
├── utils/
│   ├── formatScore.ts
│   ├── constants.ts
│   └── cn.ts
│
├── public/
│   ├── images/
│   └── icons/
│
└── README.md
```
