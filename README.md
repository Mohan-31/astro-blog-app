# Astro Blog App

A blog application built with **Astro** and **Supabase**, designed for modern static + server-rendered workflows.

This repository follows real-world development practices commonly used across startups and large organizations.

---

## Tech Stack

* **Astro** – Frontend framework
* **Supabase** – Authentication & backend services
* **Node.js** – JavaScript runtime
* **npm** – Package manager
* **Git** – Version control

---

## Local Development Setup

### Prerequisites

Make sure you have the following installed:

* **Git**
* **Node.js** (version defined in `.nvmrc`)
* **npm**
* **NVM (Node Version Manager)** – strongly recommended

---

### Setup Steps

#### 1. Clone the repository

```bash
git clone git@github.com:Mohan-31/astro-blog-app.git
cd astro-blog-app
```

#### 2. Use the correct Node.js version

```bash
nvm use
```

This ensures everyone runs the project using the same Node version.

#### 3. Install dependencies

```bash
npm install
```

#### 4. Create environment variables file

```bash
cp .env.example .env
```

⚠️ **Important**

* Do **NOT** commit `.env`
* Add real credentials only in `.env`
* `.env` is already ignored via `.gitignore`

#### 5. Start the development server

```bash
npm run dev
```

#### 6. Open the app

Visit:

```
http://localhost:4321
```

If the port is already in use, Astro will automatically switch to another available port.

---

## Environment Variables

All required environment variables are documented in:

* `.env.example`

### Example

```env
PUBLIC_SUPABASE_URL=your_supabase_project_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Project Structure (High Level)

```text
astro-blog-app/
├── src/
│   ├── pages/        # Application routes
│   ├── lib/          # Utilities (Supabase client, helpers)
│   └── components/   # UI components
├── public/           # Static assets
├── .env.example      # Environment variable template
├── .nvmrc            # Node.js version lock
├── astro.config.mjs
├── package.json
└── README.md
```

---

## Notes

* This project is configured for consistency across development environments.
* Using **NVM** is highly recommended to avoid Node.js version conflicts.
* Supabase credentials must always remain private.

