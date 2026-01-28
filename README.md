# 📝 HabitFlow – Smart To-Do & Habits App

A full-stack Next.js app for managing tasks, habits, and daily goals, with optional AI-assisted suggestions.

## Project Overview

HabitFlow helps users track their tasks and habits, view progress, and get AI-powered suggestions for better daily productivity.

It's designed to teach full-stack development, API integration, state management, and cloud deployment while producing a tangible, client-ready app.

### Goals of this project:

- Build a full-stack app using Next.js + Tailwind + MongoDB
- Learn CRUD operations, API routes, and persistent storage
- Implement React hooks and modular components
- Explore AI features for habit suggestions (optional)
- Deploy the app using Vercel / Render / AWS Free Tier

## Learning Outcomes

| Area | Skills You'll Gain |
|------|-------------------|
| Frontend | React + Next.js components, pages, routing, forms, Tailwind CSS styling, dynamic rendering |
| Backend | Next.js API routes, RESTful endpoints, CRUD operations |
| Database | MongoDB integration via Mongoose, data persistence, basic validation |
| AI Features | Integrating OpenAI or similar APIs for personalized suggestions |
| Deployment | Environment variables, hosting on Vercel/Render, simple CI/CD workflow |
| State Management | React hooks (useState, useEffect), derived state, component communication |
| UX & Polishing | Responsive layouts, skeleton loaders, user feedback, optional dark mode |

## Features

### Core Features

- Create, edit, delete tasks and habits
- Mark tasks/habits as complete/incomplete
- View tasks/habits in a clear dashboard
- Persist data using MongoDB
- Responsive UI with Tailwind

### Optional / Intermediate Features

- AI-generated habit improvement suggestions
- Daily task prioritization tips
- Analytics (completed tasks today/week, progress trends)

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend + Backend | Next.js | Pages, routing, API routes |
| Styling | Tailwind CSS | Responsive and fast UI design |
| Database | MongoDB + Mongoose | Persistent task & habit storage |
| State Management | React Hooks | Form handling, dynamic UI |
| AI Integration | OpenAI API (optional) | Habit/task suggestions |
| Deployment | Vercel / Render / AWS | Hosting and environment management |
| Version Control | Git + GitHub | Repo management, branching, PRs |
| API Calls | Axios / Fetch | Frontend ↔ backend communication |

## Project Structure

```
habitflow/
│
├─ public/               # Static assets, logo, favicon
├─ styles/               # Tailwind CSS + global styles
├─ pages/
│   ├─ api/
│   │   ├─ tasks.js      # CRUD endpoints for tasks
│   │   └─ habits.js     # CRUD endpoints for habits
│   ├─ index.js          # Dashboard page
│   └─ _app.js           # Next.js global config
├─ components/
│   ├─ TaskCard.jsx
│   ├─ HabitCard.jsx
│   ├─ TaskForm.jsx
│   └─ Header.jsx
├─ lib/
│   └─ db.js             # MongoDB connection helper
├─ package.json
└─ tailwind.config.js
```
