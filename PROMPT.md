
# Prompt

# Context and Role

As a Senior Full-Stack Engineer and System Architect, you are responsible for designing, developing, and deploying a production-grade Data Structures & Algorithms (DSA) Learning Platform.

The platform should provide a complete learning ecosystem that combines structured educational content, coding practice, progress analytics, community engagement, note management, achievement tracking, certification generation, and administrative controls.

The application must follow modern SaaS architecture principles while remaining completely free to use. No payment gateway, subscription management, premium plans, advertisements, or monetization features should be implemented.

The final system must be scalable, secure, maintainable, highly performant, SEO-friendly, and capable of supporting thousands of concurrent users in a production environment.

---

# Objective

Develop a complete full-stack DSA Learning Platform that:

* Provides structured DSA learning paths from beginner to advanced levels.
* Offers LeetCode-style coding practice and problem solving.
* Tracks learning progress and coding performance.
* Supports secure authentication and user management.
* Includes roadmaps for interview preparation.


---

# UI and Design Requirements

The user interface should be inspired by modern educational and developer-focused platforms, including:

* LeetCode
* NeetCode


The design system must include:

* Light Mode
* Dark Mode
* Consistent spacing and typography
* Professional color palette
* Responsive layouts
* Mobile-first approach

The overall visual experience should feel modern, clean, intuitive, and developer-centric.

---

# Animation Requirements

Implement smooth and performant animations using Framer Motion.

Animations should include:

* Page transitions
* Scroll-triggered reveal animations
* Modal open/close transitions
* Loading skeleton animations
* Success and error state transitions

Animation guidelines:

* Use transform and opacity properties whenever possible.
* Avoid layout shifts and unnecessary reflows.
* Maintain smooth scrolling performance.

---

# Landing Page Requirements

The landing page should act as the primary marketing and onboarding experience.

## Hero Section

Include:

* Platform introduction
* Clear value proposition
* Primary CTA buttons


Examples:

* Active Users
* Problems Solved
* Learning Modules
* Community Members

---

## Features Section

Highlight core capabilities:

* Structured DSA Learning
* Interactive Coding Practice
* Progress Tracking
* Certificate Generation

---

## Learning Paths Section

Display curated learning journeys:

* Beginner Path
* Intermediate Path
* Advanced Path
* Interview Preparation Path

Each path should show:

* Number of topics
* Estimated duration
* Completion percentage
* Difficulty level

---

## Testimonials Section

Display student feedback including:

* User name
* Avatar
* Rating
* Review content

---

## FAQ Section

Provide answers to common questions regarding:

* Platform usage
* Learning methodology
* Coding practice
* Certification
* Community features

---

## Contact Section

Provide a fully functional contact form for inquiries and support requests.

---

# Authentication Requirements

Implement a complete authentication system using Auth.js (NextAuth).

Supported authentication methods:

## Registration

Required fields:

* Full Name
* Email Address
* Password

---

## Login

Support:

* Email and Password
* Google OAuth
* GitHub OAuth

---

## Account Features

Implement:

* Logout
* Secure Cookies
* Role-Based Authorization

Security requirements:

* Password hashing using bcrypt
* CSRF protection
* Session expiration handling
* Account verification workflow

---

# User Dashboard Requirements

After authentication, users should access a personalized dashboard.

## Statistics Overview

Display:

* Total Questions Solved
* Easy Problems Solved
* Medium Problems Solved
* Hard Problems Solved
* Current Streak
* Longest Streak
* Total Learning Hours
* Completed Topics
* XP Earned
* Current Level

---

## Analytics Section

Provide visual insights including:

* Weekly Activity Graph
* Monthly Progress Graph
* Problem Solving Trends
* Topic Completion Chart
* Learning Heatmap
* Difficulty Distribution Analysis

---

# DSA Learning Module Requirements

Create comprehensive learning modules covering:

* Arrays
* Strings
* Linked Lists
* Stacks
* Queues
* Hash Tables
* Trees
* Binary Trees
* Binary Search Trees
* Heaps
* Tries
* Graphs
* Recursion

Each module must include:

## Theory

Detailed explanations of concepts and fundamentals.

## Visual Learning

Interactive diagrams and visual representations.

## Worked Examples

Step-by-step problem walkthroughs.

## Complexity Analysis

Detailed breakdown of:

* Time Complexity
* Space Complexity

## Interview Preparation

Include:

* Common interview questions
* Frequently tested patterns
* Real interview scenarios

## Common Mistakes

Highlight common implementation errors and solutions.

## Practice Problems

Provide curated problems categorized by difficulty.

## Revision Notes

Generate concise quick-reference summaries.

---

# Coding Practice Platform Requirements

Develop a coding environment similar to LeetCode.

Features must include:

* Problem Statements
* Constraints
* Input/Output Examples
* Hints
* Editorial Solutions


Supported programming languages:

* Java
* Python
* JavaScript
* Go

---

# Question Management Requirements

Questions should support:

## Difficulty Levels

* Easy
* Medium
* Hard

---

## Tags

Examples:

* Array
* String
* Tree


---

## Filters

Allow filtering by:

* Difficulty
* Topic
* Tags
* Company
* Completion Status
* Favorites
* Recently Solved

---

# Learning Roadmaps

Provide guided learning roadmaps for:

## Beginner DSA

Focus on foundational concepts and implementation.

## Intermediate DSA

Introduce advanced problem-solving techniques.

## Advanced DSA

Cover competitive programming and optimization techniques.

## FAANG Interview Preparation

Provide structured interview preparation plans.

Track:

* Completion Percentage
* Milestone Progress
* Estimated Completion Time
* Roadmap Status

---

# Notes Management System

Users should be able to:

* Create Notes
* Edit Notes
* Delete Notes
* Pin Notes
* Organize Notes Using Tags
* Search Notes
* Categorize Notes by Topic

Export options:

* PDF
* Markdown

---



## Comments

Threaded discussion support.

## Upvotes and Downvotes

Community-driven content ranking.

## Bookmarks

Save useful discussions and resources.

## User Profiles

Public profile pages displaying achievements and activity.

## Notifications

Real-time activity notifications.

---

# Gamification Requirements

Implement engagement mechanisms including:

## XP System

Award experience points for:

* Solving problems
* Completing modules
* Daily activity

---

## Levels

Progressive leveling system based on XP.

---

## Streak Tracking

Monitor:

* Daily Streaks
* Weekly Streaks

---

## Badges

Achievement-based recognition system.

---

## Achievements

Milestone rewards for platform engagement.

---

## Challenges

Support:

* Daily Challenges
* Weekly Challenges
* Monthly Challenges

---

## Leaderboards

Rank users by:

* XP
* Problems Solved
* Streaks
* Community Contributions

---



# Contact System Requirements

## Contact Form Fields

* Name
* Email
* Phone Number
* Subject
* Message

---

## Validation

Implement:

* Required field validation
* Email format validation
* Phone number validation
* Input sanitization

---

## Submission Workflow

Upon submission:

* Store request in database
* Notify administrator via email
* Send confirmation email to user
* Display success notification
* Log submission details

---

# Backend Requirements

Develop scalable APIs for:

* Authentication
* User Management
* Learning Modules
* Coding Problems
* Code Submissions
* Notes Management
* Discussions
* Progress Tracking
* Achievements
* Certificates
* Notifications
* Contact Requests

API standards:

* RESTful architecture
* Structured JSON responses
* Consistent error handling
* Validation middleware
* Pagination support

---

# Database Requirements

Use PostgreSQL with Prisma ORM.

Design normalized schemas for:

* Users
* Sessions
* Roles
* Topics
* Modules
* Questions
* Solutions
* Submissions


Database design should prioritize:

* Performance
* Scalability
* Data integrity
* Query optimization

---

# Email Notification Requirements

Use Resend as the primary provider with Nodemailer as fallback.

Send emails for:

* Welcome Email
* Email Verification
* Password Reset
* Achievement Unlocked
* Certificate Generated
* Weekly Progress Summary
* Roadmap Milestone Completion
* Contact Form Confirmation

Credentials must be securely stored using environment variables.

---

# Security Requirements

Implement comprehensive security controls.

## Input Protection

* Input Validation
* Input Sanitization
* XSS Prevention
* SQL Injection Prevention

---

## Infrastructure Security

* Rate Limiting
* Secure HTTP Headers
* CSRF Protection
* CORS Configuration
* Request Validation

---

## Authorization

Role-based access control:

* User
* Admin
* Super Admin

---

## Authentication Security

* Password Hashing (bcrypt)
* Secure Sessions
* Secure Cookies
* Email Verification
* Account Recovery Protection

---

# Technology Stack

## Frontend

* Next.js 15 (App Router)
* React 19
* TypeScript
* Tailwind CSS
* ShadCN UI
* Framer Motion
* TanStack Query
* Zustand
* React Hook Form
* Zod

---

## Backend

* Next.js API Routes
* Node.js
* TypeScript

---

## Database

* PostgreSQL
* Prisma ORM

---

## Authentication

* Auth.js (NextAuth)

---

## Email Services

* Resend
* Nodemailer

---

## Deployment

* Vercel
* Neon PostgreSQL
* Upstash Redis (Rate Limiting & Caching)

---

# Performance and Scalability Requirements

Implement:

* Server Components
* Route-Level Code Splitting
* Dynamic Imports


The platform should maintain excellent performance under heavy concurrent usage.

---

# Output Requirements

Generate the following deliverables:

1. Complete System Architecture
2. High-Level Architecture Diagram
3. Detailed Folder Structure
4. Database Schema Design
5. Prisma Models

