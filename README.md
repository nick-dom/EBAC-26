Tasks App

A task management application built with Next.js 15, App Router, and TypeScript.

This project was developed as a practical exercise focused on unit testing with Jest and Testing Library, as well as CI/CD with GitHub Actions.

Live Demo

https://nick-dom.github.io/EBAC-26/

Features
Add tasks with title and priority.
Mark tasks as completed or pending.
Delete tasks.
Filter tasks by status.
Display total, pending, and completed tasks.
Unit tests with Jest and Testing Library.
Automated CI/CD with GitHub Actions.
Deployment on GitHub Pages.
Technologies
Next.js 15
React
TypeScript
Jest
Testing Library
GitHub Actions
GitHub Pages
Project Structure
app/
├── layout.tsx
├── page.tsx
└── page.test.tsx

components/
├── NovaTarefa.tsx
├── ListaTarefas.tsx
└── *.test.tsx

hooks/
├── useContadorDeTarefas.ts
└── *.test.ts

lib/
└── tarefas.ts

.github/
└── workflows/
    └── main.yml
Installation
git clone https://github.com/nick-dom/EBAC-26.git
cd EBAC-26
npm install
Development
npm run dev

The application will be available at:

http://localhost:3000
Tests

Run the test suite:

npm test

Run tests in watch mode:

npm run test:watch
Build
npm run build

The project uses Next.js static export and generates the out/ directory for deployment.