# Prompt

# Context and Role

As a Senior Full-Stack Engineer and System Architect, you are tasked with designing, engineering, and preparing a production-ready blueprint for a comprehensive Data Structures & Algorithms (DSA) Learning Platform.

The platform functions as an all-in-one educational ecosystem. It bridges the gap between conceptual learning and hands-on execution by pairing structured curricula with an interactive, LeetCode-style coding environment. Key auxiliary systems include progress analytics, a developer community, markdown-driven note management, gamified engagement loops, automated certification, and dedicated administrative tools.

Architecturally, the application must mirror the engineering standards of modern, scalable SaaS applications, but with a strict operational constraint: it must be completely free for the end-user. The architecture should omit payment gateways, subscription logic, tiered access plans, tracking pixels, or advertisement frames.

The production system must be resilient, highly performant, SEO-optimized, and capable of maintaining minimal latencies under concurrent loads of thousands of active developers.

---

# Objective

Architect and prepare the implementation plan for a full-stack DSA Learning Platform that successfully delivers:

* Fully indexed, linear and non-linear DSA learning paths spanning foundational programming concepts to advanced competitive programming topics.
* An interactive, low-latency code execution environment with real-time test-case evaluation.
* Granular performance tracking, habit monitoring, and visual behavioral analytics.
* A robust identity provider architecture handling authentication, session persistence, and authorization states.
* Career-oriented interview preparation paths targeting standard industry patterns.

---

# UI and Design Requirements

The user experience should feel instantly familiar to software engineers, drawing direct inspiration from core developer hubs like:

* LeetCode
* NeetCode

### Design System Core Requirements

* **Dual-Theme Support:** Native implementation of Light and Dark modes with explicit focus on high-contrast dark tokens to prevent developer eye strain.
* **Layout Design:** A highly rigid, deterministic grid system using consistent, predictable spacing values alongside a clean, modern monospaced and sans-serif typographic scale.
* **Visual Palette:** A professional, desaturated, developer-centric color space prioritizing semantic states (e.g., success greens, warning ambers, destructive reds, and neutral slate tones).
* **Responsive Layouts:** An elastic interface built from the ground up using a mobile-first philosophy, ensuring intricate split-pane IDE elements scale gracefully down to handheld viewports.

---

# 2. Technology Stack

## Frontend

| Technology | Purpose |
| --- | --- |
| **Next.js 15** | App Router core framework utilizing React Server Components (RSC) for optimized initial loads. |
| **React 19** | View layer leveraging modern hook primitives and concurrent rendering features. |
| **TypeScript** | Strict, static compile-time type-safety across all application layers. |
| **Tailwind CSS** | Atomic utility classes ensuring minimal CSS bundles and rapid design system compilation. |
| **ShadCN UI** | Unstyled accessible primitives (via Radix UI) styled explicitly through Tailwind tokens. |
| **Framer Motion** | Declarative orchestration of smooth micro-interactions and hardware-accelerated layouts. |
| **Zustand** | Lightweight, decoupled client-side state management for transient UI indicators. |
| **TanStack Query** | Declarative asynchronous server-state fetching, caching, and optimistic mutations. |
| **React Hook Form** | Uncontrolled form handling with minimal re-renders for multi-step inputs. |
| **Zod** | Schema validation enforcing structural runtime integrity across API boundaries. |
| **Monaco Editor** | The browser-optimized core code editor engine powering advanced intelligence features. |
| **Recharts** | Declarative, SVG-rendered analytical chart components scaling with browser viewports. |

---

## Backend

| Technology | Purpose |
| --- | --- |
| **Next.js Route Handlers** | Type-safe REST endpoints serving as decoupled edge or node-compatible API routines. |
| **Server Actions** | Progressive-enhancement-friendly RPC tunnels for mutating state without explicit endpoints. |
| **Prisma ORM** | Type-safe database client with programmatic migrations and clean relations mapping. |
| **PostgreSQL** | Relational data persistence ensuring ACID compliance for critical user metrics. |
| **Redis** | High-throughput in-memory datastore managing session locks, API limits, and temporary caches. |
| **BullMQ** | Robust, Redis-backed distributed queue engine for async code processing tasks. |
| **Auth.js** | Token or session-based decentralized identity provider management wrapper. |
| **Resend** | High-deliverability transactional email gateway utilizing a simple REST client. |
| **Nodemailer** | Flexible programmatic fallback utility for routing email payloads through custom relays. |

---

## Infrastructure

| Service | Purpose |
| --- | --- |
| **Vercel** | Edge-optimized delivery pipeline hosting dynamic client and server applications. |
| **Neon** | Serverless PostgreSQL compute that scales out instantly with integrated point-in-time recovery. |
| **Upstash Redis** | Serverless, HTTP-accessible Redis endpoint designed for serverless execution runtimes. |
| **Cloudinary** | Cloud-native media layer optimizing user imagery and static educational assets. |
| **GitHub Actions** | Automated compilation, static linting, unit testing, and programmatic continuous delivery. |

---

# Animation Requirements

Leverage Framer Motion to layer polished transitions over functional components. All animations must feel snappier rather than slow, intentionally designed to provide immediate mechanical feedback without blocking user tasks.

### Core Implementation Areas

* **Page Transitions:** Fluid layout updates across high-level dashboard routing utilizing exit/enter states.
* **Scroll-Triggered Reveals:** Lazy visual discovery of deep catalog information as users move down landing components.
* **Modals & Dialogs:** Smooth overlay fades accompanied by slight, physics-based scale-ups on the container element.
* **Loading Indicators:** Hardware-accelerated CSS/SVG skeleton states that accurately mimic missing content shapes to reduce perceived latency.
* **State Feedback:** Highly reactive motion behaviors on action items following error or success responses (e.g., subtle shake on unauthorized form submit).

### Optimization Parameters

* Limit animation properties exclusively to hardware-accelerated vectors (`transform: translate3d`, `scale`, and `opacity`).
* Prevent layout thrashing by steering clear of dynamic adjustments to height, width, padding, or margin parameters during active motion frames.
* Ensure all structural scrolling layers remain decoupled from visual motion triggers to maintain high framerates on lower-end mobile devices.

---

# Landing Page Requirements

The landing page must function as a high-conversion, performant showcase that quickly channels users toward authenticated entry points.

## Hero Section

* **Core Framing:** Bold, immediate messaging defining the uncompromised nature of the platform.
* **Value Prop:** Clear declaration of modern sandbox environments, zero paywalls, and detailed curricula.
* **Action Routing:** High-visibility Primary Call to Action directing immediate entry into active workspaces.
* **Live Operational Metrics:** Dynamic counts indicating total developers active on-platform, completed submissions, active study modules, and total global peer accounts.

---

## Features Section

* **Curated Curriculum:** Grid items highlighting structured pathways designed for progressive logic assimilation.
* **Sandbox IDE:** Breakdown of the multi-language workspace that runs code alongside test parameters.
* **Telemetry Dashboard:** Visual representations of deep heatmaps, activity tracking, and skill distribution models.
* **Verified Credentials:** Showcase of deterministic milestone achievements and proof-of-competence markers.

---

## Learning Paths Section

* **Beginner Track:** Foundational mechanics targeting variables, complexity foundations, and primitive linear blocks.
* **Intermediate Track:** Focus on compound memory strategies, basic graph traversal, and recursive partitioning algorithms.
* **Advanced Track:** Specialized structures, geometric algorithms, complex optimization, and intense algorithmic design.
* **Interview Prep Sprint:** Fast-paced engineering reviews emphasizing cross-domain pattern matching.

> Each learning path card must expose quantitative indicators detailing total nested nodes, calculated hours to complete, localized completion percentages, and targeted difficulty tiers.

---

## Testimonials Section

* Real-world engineering feedback blocks capturing user attribution via high-resolution avatars, verified community tiers, out-of-five performance scores, and technical reviews outlining career transformations.

---

## FAQ Section

* Accordion structures resolving inquiries regarding core environment configurations, computational verification pipelines, custom notebook options, standard certificate validity, and open community participation frameworks.

---

## Contact Section

* Asynchronous contact channel allowing developers or engineering leads to submit support queries, feature feedback, or bug discoveries directly through a clean, validating UI.

---

# Authentication Requirements

A standard, secure identity lifecycle must be driven by Auth.js using stateless strategy layers or decoupled session patterns.

```
[Client App] ---> [Auth.js / NextAuth Layer] ---> [OAuth Providers (GitHub/Google)]
                          |
                          +---> [Bcrypt Hashing Routine] ---> [PostgreSQL User Table]

```

### Self-Managed Registration

* **Target Inputs:** Full Name string parsing, unique Email formatting check, and highly complex Password strings.
* **Validation Workflows:** Structural verification executed on the client, verified on server arrival via Zod, with safe storage using a cryptographically secure hashing function (bcrypt).

### Authentication Methods

* Classic credential matching against hashed system entries.
* Passwordless third-party authenticators using pre-configured Google Developer consoles.
* Single-click integration targeting active developer accounts via GitHub OAuth.

### Security Configurations

* Stateless session data housed within tamper-proof, HTTP-only, secure cookie envelopes.
* Active mitigation against cross-site request forgery via integrated cryptographic challenge flags.
* Absolute timeout configurations for active user state persistence.
* Double-blind account confirmation pipelines relying on unique cryptographic activation codes dispatched via email templates.

---

# User Dashboard Requirements

Authenticated access grants immediate redirection to a centralized command terminal reflecting active educational metrics.

## Statistics Overview

* Cumulative total of successfully resolved algorithmic assignments.
* Tiered metric counters splitting answers across Easy, Medium, and Hard boundaries.
* Temporal metrics identifying consecutive active daily runs along with historical maximum metrics.
* Cumulative execution time metric representing active user interaction within modules.
* Completed structural concept milestones alongside aggregated platform experience points (XP) and current calculated user rank tier.

---

## Analytics Section

* **Weekly Heatmap:** Horizontal frequency charts plotting active code execution instances throughout the standard seven-day calendar block.
* **Monthly Volume Graph:** Longitudinal area graphs displaying continuous volume variations in completed problem domains.
* **Efficiency Curves:** Trend charts highlighting language execution speed optimizations across historical submissions.
* **Domain Balance Wheels:** Radar or polar charts highlighting strong conceptual understanding versus sectors requiring additional theoretical review.

---

# DSA Learning Module Requirements

The core learning hub must host distinct, exhaustive modules targeting specific topics, including: Arrays, Strings, Linked Lists, Stacks, Queues, Hash Tables, Trees, Binary Trees, Binary Search Trees, Heaps, Tries, Graphs, and Recursion.

### Module Structural Checklist

1. **Theoretical Deep Dives:** Detailed structural deep-dives covering raw allocation strategies, pointer distributions, and node connectivity logic.
2. **Interactive Topologies:** Live visual structures mapping operations like node rotation, array shifts, or stack mutations directly in response to programmatic state changes.
3. **Step-by-Step Executions:** Trace tables mapping dynamic internal pointer variations and memory block states across typical logic steps.
4. **Complexity Matrix:** Definitive big-O notations mapping optimal, typical, and degenerative operational environments for lookup, deletion, insertion, and mutation routines.
5. **Interview Patterns:** Comprehensive breakdowns mapping structures to canonical problem patterns such as Sliding Window, Two Pointers, and Fast/Slow Iterators.
6. **Edge Case Mapping:** Deep analytical tables identifying classic implementation landmines, including stack overflows, dangling references, off-by-one indices, and boundary constraints.
7. **Curated Worksheets:** Progressive link blocks connecting users directly to sandboxed application problems mapped precisely to the active topic.
8. **Synthesized References:** Compact markdown summaries designed for high-density review prior to platform or career examinations.

---

# Coding Practice Platform Requirements

The main development workspace is designed to simulate identical modern engineering interviews by split-screening reference constraints and active terminals.

```
+------------------------------------+------------------------------------+
|                                    |                                    |
|  Problem Specs, Constraints,       |  Monaco Code Editor Environment   |
|  and Markdown-Rendered Examples    |  (Java, Python, JS, Go)            |
|                                    |                                    |
+------------------------------------+------------------------------------+
|                                    |                                    |
|  Test Case Panel & Output Terminal |  Submission Logs & Analytics       |
|                                    |                                    |
+------------------------------------+------------------------------------+

```

### IDE Functional Specification

* **Specification Workspace:** Multi-tab left pane displaying strict Markdown instructions, memory limits, clear input conditions, explicit exception conditions, and isolated structural inputs.
* **Multi-Language Selector:** Dropdowns configuring the core environment interface for compilation across Java, Python, JavaScript, or Go runtime specifications.
* **Monaco Control Workspace:** Central integrated editor supplying auto-completion maps, intelligent code indentation, structural code line reference markers, and dynamic theme switching tokens.
* **Test Parameter Utility:** Lower interface allowing users to inject custom execution test vectors or execute baseline integrated validation routines.
* **Asynchronous Output Engine:** Live execution panel compiling user solutions against target conditions via backend message brokers, returning formatted performance metrics or clear compilation error reports.

---

# Question Management Requirements

Every engineering challenge must be discoverable through an organized, comprehensive query dashboard.

### Meta Structure

* **Difficulty Tiers:** Strict sorting tags classification across Easy, Medium, and Hard parameters.
* **Categorization Labels:** Explicit structural pointers linking tasks back to base data topologies (e.g., Two Pointers, Backtracking, Dynamic Programming).

### Search and Filtering Capabilities

* Real-time semantic searching matching text inputs against title indices.
* Multi-select filtration arrays grouping items by targeted system complexity tags.
* Sorting modules filtering tasks by high-frequency target enterprise requirements (e.g., FAANG specific metadata).
* Access state switches checking against Unsolved, In-Progress, or Successfully Handled problem statuses.
* Instant flags narrowing views down to self-managed bookmark indices or historical submission logs.

---

# Learning Roadmaps

The framework must provide guided paths that transform broad study goals into clear, step-by-step engineering milestones.

### Structural Paths

* **Foundational Track:** Concentrated exercises building clean execution fundamentals, space complexity understanding, and simple, reproducible structural choices.
* **Intermediate Strategy Track:** Deeper focus on matrix configurations, divide-and-conquer methodologies, and efficient tree traversals.
* **Advanced Architecture Track:** High-difficulty optimization paths highlighting complex graph configurations, topological mappings, and heavy algorithmic tuning.
* **Target Enterprise Sprints:** Structured timelines focused on high-frequency questions typically found in major tech company interviews.

### Traversal Metrics

* Total path execution percentage progress gauges.
* Gated milestones verifying competence before releasing subsequent high-difficulty challenges.
* Dynamically calculated time remaining based on typical completion speeds.
* Definitive state banners marking pathways as In-Progress, Mastered, or Dormant.

---

# Notes Management System

An isolated workspace allows developers to compile insights, save optimization code snippets, and review study materials without leaving the application.

* **Editor Matrix:** Responsive input fields rendering markdown structures, code blocks, and formatted lists in real time.
* **Organizational Attributes:** Tag assignment parameters allowing users to link notes directly to primary topic domains.
* **Discovery Layer:** Dynamic indexing engines supporting full-text queries across note content and titles.
* **Portability Operations:** Clean print drivers generating self-contained PDF summaries or raw Markdown files for local archival storage.

---

# Community Hub Requirements

A collaborative space helps developers review code strategies, share execution insights, and troubleshoot complex bugs.

* **Threaded Discussions:** Nested comment systems supporting multi-level replies for deep code critiques.
* **Community Moderation:** Simple voting controls to bubble up high-quality code examples and optimize content discovery.
* **Resource Preservation:** Simple bookmark parameters to store technical threads, explanations, or execution summaries.
* **Public Profiles:** Public developer profiles highlighting portfolio stats, solved graphs, unlocked achievements, and activity timelines.
* **Notification Layer:** Reactive warning systems flagging user profile mentions, comment replies, or community badge updates.

---

# Gamification Requirements

The platform uses engagement metrics to motivate continuous habit building, consistent skill review, and ongoing educational progression.

* **Experience Metrics (XP):** Quantitative allocations rewarded based on task resolution parameters, daily logins, or detailed code contributions.
* **Level Scalers:** Tiered profiles that advance automatically as users cross deterministic XP boundaries.
* **Streak Telemetry:** Background monitors tracking consecutive active calendar days and recording maximum historically sustained metrics.
* **Credential Badges:** Unlocking discrete graphic indicators on public profiles for specific achievements (e.g., resolving 50 Graph problems).
* **Target Challenges:** Time-boxed problem sets refreshed on rigid Daily, Weekly, and Monthly frequencies.
* **Platform Leaderboards:** Global indexes ranking users by aggregated XP, total problems solved, longest active streaks, or verified community contributions.

---

# Contact System Requirements

## Contact Form Fields

* **Name:** Plain text string input.
* **Email:** Standard email address string.
* **Phone Number:** Optional standardized international telephone string.
* **Subject:** Explicit dropdown categories (e.g., Bug Report, Content Correction, General Inquiry).
* **Message:** Unbounded text container for detailed descriptions.

## Validation Design

* Strict presence checks on all required text input boundaries.
* Regex matching verifying standard email domain formats.
* Normalization and validation of international telephone dial strings.
* Complete server-side input sanitization to strip script elements and malicious database queries.

## Submission Workflow

```
[User Form Submit] ---> [Sanitization & Validation] ---> [Write to Database]
                                                               |
    +----------------------------------------------------------+
    |
    v
[Trigger Queue (BullMQ)] ---> [Process Job] ---> [Resend API Call]
                                                        |
                                                        +---> Send Admin Alert Notification
                                                        +---> Send User Confirmation Receipt

```

---

# Backend Requirements

The application architecture must run on high-performance RESTful API endpoints and optimized Server Actions.

### Operational Blueprints

* Pure adherence to REST architectural patterns with standard HTTP state indicators (e.g., 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 500 Server Error).
* Highly uniform JSON response contracts enclosing returned data parameters alongside detailed error models.
* Programmatic edge verification engines handling token validation and rate-limiting rules.
* Coordinated cursor or offset pagination models protecting internal systems against heavy database query payloads.

---

# Database Requirements

The physical data model relies on a production-ready serverless PostgreSQL cluster configured using strict Prisma schemas.

### Core Entities Map

* **Identity Management:** `User`, `Account`, `Session`, `VerificationToken`.
* **Curriculum Elements:** `Topic`, `Module`, `Question`, `Hint`, `Tag`.
* **Execution Logs:** `Submission`, `CodeTemplate`, `TestCase`.
* **User Notes & Activity:** `Note`, `Comment`, `Upvote`, `Bookmark`.
* **Gamification Indicators:** `UserProgress`, `Badge`, `UserBadge`, `Streak`, `Leaderboard`.
* **Communication Logs:** `ContactRequest`.

### Architecture Goals

* Complete normalization of database models to eliminate data redundancy and preserve transactional stability.
* Strategic indexing on high-frequency foreign keys, search targets, and sorting fields.
* Strict constraint mechanisms ensuring hard cascading deletions or explicit nullifications across child data records.

---

# Email Notification Requirements

The system must run on a highly reliable transactional mail queue powered by Resend, with programmatic fallback configurations routing through standard Nodemailer engines if an outage occurs.

### Automated Triggers

* **Welcome Sequence:** Dispatched immediately upon user registration.
* **Identity Check:** Verification links containing high-entropy tokens sent during sign-up or profile changes.
* **Credential Reset:** Time-sensitive recovery links dispatched only upon explicit user validation requests.
* **Milestone Alerts:** Event-driven emails celebrating major community achievements or profile level-ups.
* **Certification Delivery:** Secure delivery of downloadable verification documents upon learning path completion.
* **Activity Summaries:** Automated weekly roundups analyzing user performance, resolved problems, and active habits.

---

# Security Requirements

The application must enforce strict security protocols across all operational layers to protect user data and ensure system stability.

### Input Protection

* **Data Verification:** Multilayered schema checks enforced at both the client layer and API entry points via Zod.
* **Sanitization Routing:** Programmatic stripping of executable blocks to block Cross-Site Scripting (XSS) or HTML injection vulnerabilities.
* **Query Safeguards:** Absolute reliance on parameterized inputs managed through Prisma to neutralize SQL Injection risks.

### Infrastructure Security

* **Rate Limiting:** IP-throttling managed through sliding-window algorithms within Upstash Redis instances.
* **Security Headers:** Expressive middleware rules injecting strict Content Security Policies (CSP), HSTS enforcement, X-Frame-Options, and anti-sniffing rules.
* **Request Tampering:** Cross-Site Request Forgery (CSRF) tokens protecting state-changing network transactions.
* **CORS Boundaries:** Strict origin pinning limiting API access exclusively to verified platform domains.

### Access Control

* **User Tier:** Standard credentials granting access to personal dashboards, execution code spaces, and community hubs.
* **Admin Tier:** Elevated permissions enabling problem creation, curriculum modifications, and moderation tools.
* **Super Admin Tier:** Complete access to internal environment parameters, audit logs, and infrastructure controls.

---

# Performance and Scalability Requirements

The architecture must prioritize fast initial page rendering, minimal hydration delays, and light client bundle footprints.

* **Server-Driven Architecture:** Prioritize React Server Components (RSC) to handle complex structural computations and data fetching on the server, minimizing client-side JavaScript execution.
* **Route Splitting:** Automated code isolation mapping directly to Next.js App Router boundaries to ensure users download only the code required for their active view.
* **Dynamic Loading:** Implement lazy hydration for complex dependencies (e.g., heavy charting utilities, Monaco Editor instances) to keep core interfaces fast and responsive.

---

# Output Requirements

To complete the comprehensive blueprint for this platform, the following detailed technical specifications must be generated:

1. **System Architecture Overview:** A thorough breakdown of components, security configurations, data flows, and isolation boundaries.
2. **High-Level Architecture Diagram:** A clear structural mapping detailing edge routing patterns, message ingestion pipelines, cache structures, and database topologies.
3. **Detailed Folder Structure:** A production-ready Next.js 15 repository template utilizing standard clean architecture conventions inside an enterprise-scale `/src` directory.
4. **Database Schema Specifications:** Detailed relational blueprints outlining data field types, internal constraint properties, and logical foreign key linkages.
5. **Prisma Models:** A clean, compile-ready `schema.prisma` file incorporating all structural schemas, relationships, indexes, and operational constraints.