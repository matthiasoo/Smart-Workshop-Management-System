# Smart Workshop Management System 🛠️

A modern, full-stack web application designed for managing workshop inventory. Born as a basic state-managed project and evolved into a robust, production-ready Full-Stack system featuring a relational database, server-side actions, seamless authentication, and AI integrations.

## Features ✨

- **Complete CRUD Functionality**: Add, edit, remove, and manage tools using fast Next.js Server Actions.
- **AI-Powered Auto-Descriptions**: Integrated Groq SDK (Powered by Llama 3) to automatically generate technical descriptions of tools based purely on their names.
- **Authentication & Security**: Protected views and API calls utilizing **Auth.js v5** (Google OAuth integration).
- **Relational Database**: Connected to a **Neon PostgreSQL** database managed via **Prisma ORM**.
- **Internationalization (i18n)**: Fully translated into Polish and English with seamless language toggles using `next-intl`.
- **Dynamic URL-based Search**: Performant client-side search where queries are managed via URL parameters (`?search=...`) for shareable links.
- **Theming**: Integrated Dark & Light mode toggle with `next-themes`.
- **Responsive UI**: Built entirely with standard Tailwind CSS and modern Web Design principles.

## Tech Stack 🚀

- **Framework:** Next.js (App Router, Server Components, Server Actions)
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (NeonDB)
- **ORM:** Prisma
- **Auth:** Auth.js (NextAuth Beta v5)
- **AI Provider:** Groq (Llama-3.3-70b-versatile)
- **i18n:** next-intl

## Getting Started ⚙️

1. **Clone the repository:**
   ```bash
   git clone https://github.com/matthiasoo/Smart-Workshop-Management-System.git
   cd Smart-Workshop-Management-System
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following keys:
   ```env
   # PostgreSQL database URL (NeonDB)
   DATABASE_URL="postgresql://user:password@hostname/neondb?sslmode=verify-full"
   
   # Groq API for AI Features
   GROQ_API_KEY="your_groq_api_key"
   
   # Auth.js Configuration
   AUTH_SECRET="your_generated_auth_secret"
   AUTH_GOOGLE_ID="your_google_oauth_client_id"
   AUTH_GOOGLE_SECRET="your_google_oauth_secret"
   ```

4. **Initialize the Database:**
   Push the Prisma schema to configure the PostgreSQL structure:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the workshop.
