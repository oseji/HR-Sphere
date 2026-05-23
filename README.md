# HR Sphere

An HR management dashboard frontend built with React and TypeScript.

## What it does

HR Sphere gives HR teams a central place to manage employees, review requests, track payroll, monitor performance, and handle scheduling — all backed by Firebase.

## Features

- **Overview / Stats** — headcount metrics, hiring vs. resignation trends via a bar chart, and pending request counts
- **Employee directory** — searchable and filterable table by department, job title, and work mode (remote / on-site / hybrid), with pagination
- **Leave & request management** — approve or reject sick leave, maternity leave, annual leave, resume updates, and profile updates
- **Payroll** — payroll tracking and summary view
- **Performance** — performance overview table per employee (scores derived from employee data), KPI line chart, team efficiency gauge, and employee of the month card
- **Schedule** — calendar view with demo events across meetings, reviews, training, and interviews (static data, not persisted)
- **File manager** — folder and document browser UI with download/delete actions (static demo data)
- **Dark mode** — full light/dark theme toggle

## Tech stack

- React 18 + TypeScript (Vite)
- Tailwind CSS + Chakra UI + shadcn/ui primitives
- Recharts for data visualisation
- Framer Motion for animations
- React Router v5
- Firebase (Auth + Firestore)

## Getting started

```bash
npm install
npm run dev
```

Configure your Firebase project credentials before running.
