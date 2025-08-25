# PlusFolio Development Roadmap & Todo List

**Document Version:** 2.0
**Date:** August 24, 2025
**Author:** Development Team
**Status:** Revised Development Plan

---

## 🎯 **Executive Summary**

**Goal**: Launch PlusFolio V1.1 with OAuth, a personal dashboard, and GitHub integration.
**Stack**: Next.js 15 + Gemini 2.5 Flash + Supabase + Vercel

---

## 📅 **Phase 1: Authentication & Dashboard Foundation (Weeks 1-2)**

### **Week 1: Next-Gen Authentication**

- [ ] **Database Schema Refactor**:
  - [ ] Apply the new schema from `ERD.md` (v2.0).
  - [ ] Create `user_authentications` table.
  - [ ] Create `user_connections` table.
  - [ ] Create `repositories` table.
- [ ] **Implement NextAuth.js v5+**:
  - [ ] Integrate Google Provider for OAuth.
  - [ ] Integrate GitHub Provider for OAuth.
  - [ ] Implement custom callbacks to handle new user creation and token storage in our new tables.

### **Week 2: The Personal Dashboard**

- [ ] **Build Basic Dashboard UI**:
  - [ ] Create a new route `/dashboard`.
  - [ ] Fetch and display basic user info (name, email, avatar from `users` table).
  - [ ] Add a section for "Connected Accounts".
- [ ] **GitHub Connection Flow**:
  - [ ] Add a "Connect GitHub" button on the dashboard.
  - [ ] Implement the server-side logic to handle storing GitHub access tokens in the `user_connections` table.
  - [ ] Show a "Connected" state in the UI once complete.

---

## 📅 **Phase 2: Core Feature - GitHub Integration (Weeks 3-4)**

### **Week 3: Repository Importing**

- [ ] **GitHub API Service**:
  - [ ] Create a service to interact with the GitHub API using the user's stored access token.
  - [ ] Implement a function to fetch a user's repositories.
- [ ] **Import UI**:
  - [ ] Build a modal or page where users can see a list of their GitHub repos.
  - [ ] Allow users to select specific repositories to import.
  - [ ] Save selected repos into our `repositories` table.

### **Week 4: Displaying Imported Data**

- [ ] **Dashboard Repo List**:
  - [ ] Create a component to display a list of imported repositories on the dashboard.
  - [ ] Show key information like name, language, and stars.
  - [ ] Add a button to "Run Analysis" on an imported repository's URL.
- [ ] **Syncing Logic (Optional Stretch Goal)**:
  - [ ] Implement a way to periodically sync repo data with GitHub to keep it fresh.

---

## 📅 **Phase 3: Integration & Polish (Weeks 5-6)**

### **Week 5: Connecting the Dots**

- [ ] **Integrate Repo Analysis**:
  - [ ] Wire up the "Run Analysis" button to feed the repository's `html_url` into the existing analysis engine.
  - [ ] Ensure reports generated from imported repos are linked correctly to the user and the repository.
- [ ] **User Report History**:
  - [ ] Update the dashboard to show a list of all past analysis reports for the user.
  - [ ] Differentiate between reports run on URLs vs. imported projects.

### **Week 6: Onboarding & User Experience**

- [ ] **Implement New Onboarding Flow**:
  - [ ] Based on the flowchart in `flowcharts.md`, create a welcome modal for first-time users.
  - [ ] Guide them through connecting GitHub and importing their first repository.
- [ ] **Testing & Refinement**:
  - [ ] End-to-end testing of the entire sign-up -> connect -> import -> analyze flow.
  - [ ] Polish the UI/UX of the dashboard and import process.
  - [ ] Gather feedback from beta testers on the new flow.

---
