# Playwright UI/API Automation Framework

## Overview

This project is a Playwright + TypeScript automation framework for UI tests with API setup and cleanup.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Page Object Model
- Fixtures
- API services
- dotenv

## Project Structure

```txt
src/
  api/
    clients/
    services/
  app/
    app.ts
  config/
    env.ts
  data/
  fixtures/
    base.fixture.ts
  locators/
  pages/
    base.page.ts
  types/

tests/
  ui/

playwright.config.ts
package.json
.env
README.md
```

## Installation

Initialize Playwright project:

```bash
npm init playwright@latest
```

## Install project dependencies:

```bash
npm install
```

```bash
npm install dotenv
```
