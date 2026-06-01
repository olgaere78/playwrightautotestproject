# Playwright UI/API Automation Framework

## Overview

This project is a Playwright + TypeScript automation framework for UI tests against the TodoMVC demo app.

The framework includes:

- UI automation with Playwright
- reusable Page Object Model architecture
- fixtures
- environment configuration
- GitHub Actions CI
- ESLint + Prettier setup
- Husky pre-push hooks
- HTML reporting
- screenshots/videos/traces on failure

---

## Tech Stack

- TypeScript
- Playwright `^1.60.0`
- Node.js
- dotenv `^17.4.2`
- ESLint `^10.4.0`
- Prettier `^3.8.3`
- Husky `^9.1.7`

---

## Project Structure

```txt
src/
  api/
    api-client.ts
    auth.service.ts
  app/
    app.ts
  config/
    env.ts
  data/
    todo.builder.ts
    todo.data.ts
    todo.invalid.data.ts
  fixtures/
    app-fixture.ts
  locators/
    mainPageLocators.ts
  pages/
    basePage.ts
    todoMvcPage.ts

tests/
  ui/
    todomvc.spec.ts

.github/
  workflows/
    playwright.yml

playwright.config.ts
package.json
.env
tsconfig.json
README.md
```

## Environment Variables

- `BASE_URL` (optional): defaults to `https://demo.playwright.dev`

## Install Dependencies

```bash
npm install
```

## Install Playwright Browsers

```bash
npx playwright install
```

## Initialize ESLint and Prettier

```bash
npm install -D eslint prettier
```

## Initialize ESLint

```
npx eslint --init
```

## Initialize Husky

```bash
npx husky init
```

## Run Tests

```
npx playwright test
```

## Generate HTML Report

```bash
npx playwright show-report
```

## Recommendations

- Prefer `page.goto('/todomvc/#/')` + Playwright `use.baseURL` (configured in `playwright.config.ts`) for navigation.
- Keep page objects focused on user actions (`addTodo`, `setTodoCompleted`, `editTodoTitle`) and assertions; keep selectors inside page objects.
- Reset app state between tests (TodoMVC stores state in `localStorage`) using the fixture in `src/fixtures/app-fixture.ts`.

## Code Quality

### Run ESLint

```bash
npm run lint
```

### Check formatting

```bash
npm run format:check
```

### Fix formatting automatically

```bash
npx prettier --write .
```
