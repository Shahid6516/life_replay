# Life Replay

Life Replay is a modern full-stack web application built with **Next.js 16**, **Prisma ORM**, and **Neon PostgreSQL**. It offers a seamless platform for capturing, organizing, and revisiting life's key moments.

---

## 🚀 Tech Stack

- **Framework:** Next.js (App Router, Server Actions, Server Components)
- **Database:** Neon PostgreSQL (Serverless Postgres)
- **ORM:** Prisma
- **Language:** TypeScript
- **Styling:** Tailwind CSS

---

## 🛠️ Getting Started

Follow these instructions to set up and run the project locally on your machine.

### Prerequisites

Ensure you have the following installed:

- Node.js (v18.x or higher)
- npm, yarn, or pnpm
- A Neon PostgreSQL account and database instance

---

### Installation

1. **Clone the repository:**
git clone [<https://github.com/your-username/life_replay.git>](<https://github.com/your-username/life_replay.git>)
cd life_replay

Install dependencies:
npm install
Configure Environment Variables:
Create a .env file in the root directory and add your Neon PostgreSQL connection strings:

Code snippet
# Pooled connection string for application runtime
DATABASE_URL="postgresql://neondb_owner:YOUR_PASSWORD@ep-...-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Direct connection string for Prisma CLI migrations
DIRECT_URL="postgresql://neondb_owner:YOUR_PASSWORD@ep-....c-5.us-east-2.aws.neon.tech/neondb?sslmode=require"
Run Database Migrations:
Push your Prisma schema to your Neon PostgreSQL database:

```bash
npx prisma migrate dev
Generate Prisma Client:

Bash
npx prisma generate
Start the Development Server:

Bash
npm run dev
Open <http://localhost:3000> in your browser to view the application.

📁 Project Structure
Plaintext
life_replay/
├── app/                  # Next.js App Router
│   ├── api/              # API Route Handlers
│   ├── page.tsx          # Main Entry Page
│   └── layout.tsx        # Root Layout
├── lib/                  # Shared utility modules
│   └── prisma.ts         # Prisma Client Singleton
├── prisma/               # Prisma schema configuration and migrations
│   └── schema.prisma
├── public/               # Static assets
├── .env                  # Environment variables (Git-ignored)
├── .gitignore            # Git ignore file
└── README.md             # Project documentation
🔒 Ignored Files (.gitignore)
This project is configured to exclude local environments, dependencies, build caches, and sensitive database configurations from source control:

Dependencies: node_modules/

Next.js Cache & Builds: .next/, out/, build/

Secrets: .env, .env*.local

Logs & IDE: .vscode/, *.log

Custom Docs: skill.md (local context instructions)

🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the repository issues page if you want to contribute.

📄 License
This project is licensed under the MIT License.