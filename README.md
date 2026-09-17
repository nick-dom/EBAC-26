# Tasks App

A task management application built with **Next.js 15**, the **App Router**, and **TypeScript**.

This project was developed as a practical exercise focused on **unit testing** with Jest and Testing Library, as well as setting up a **CI/CD pipeline** with GitHub Actions.

## Features

* Task list loaded through a Server Component using a simulated data source (`lib/tarefas.ts`).
* Controlled form for adding tasks with title and priority (`components/NovaTarefa.tsx`).
* Mark tasks as completed or pending.
* Delete tasks.
* Filter tasks by status:

  * All
  * Pending
  * Completed
* Summary panel showing:

  * Total tasks
  * Pending tasks
  * Completed tasks
* Custom hook for task statistics (`hooks/useContadorDeTarefas.ts`).
* Unit tests using Jest and Testing Library.
* Automated linting, testing, and build through GitHub Actions.
* Static deployment configured for GitHub Pages.

## Project Structure

```text
app/
├── layout.tsx
├── page.tsx
├── page.test.tsx
└── globals.css

components/
├── NovaTarefa.tsx
├── NovaTarefa.test.tsx
├── ListaTarefas.tsx
└── ListaTarefas.test.tsx

hooks/
├── useContadorDeTarefas.ts
└── useContadorDeTarefas.test.ts

lib/
└── tarefas.ts

.github/
└── workflows/
    └── main.yml
```

## Technologies

* Next.js 15
* React
* TypeScript
* Jest
* Testing Library
* GitHub Actions
* GitHub Pages

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/nick-dom/EBAC-26.git
cd EBAC-26
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

## Lint, Tests and Build

Run the linter:

```bash
npm run lint
```

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Create a production build:

```bash
npm run build
```

The project uses Next.js static export, so the production build generates the `out/` directory.

## Testing

The test suite covers the main parts of the application:

* `NovaTarefa`
* `ListaTarefas`
* `useContadorDeTarefas`
* `page.tsx`

The page tests call the asynchronous Server Component directly and render the JSX returned by it. Since the application uses a local data source instead of an external API, no external API mocking is required.

## How It Works

The initial tasks are stored in `lib/tarefas.ts` and returned through the asynchronous `buscarTarefas` function.

The Server Component in `app/page.tsx` loads the initial task data and passes it to `ListaTarefas`.

`ListaTarefas` is a Client Component responsible for managing the task list and user interactions, including adding, completing, deleting, and filtering tasks.

The `useContadorDeTarefas` custom hook calculates the task statistics displayed in the summary panel.

## Data Source

The application does not use a database or external API.

Tasks are stored in a local array and accessed through the asynchronous `buscarTarefas` function. This simulates an API request while keeping the project simple enough for testing and study purposes.

