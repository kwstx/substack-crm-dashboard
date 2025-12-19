# Stackly - Substack CRM Dashboard

**Know Your Readers. Grow Your Stack.**

Stackly is an intelligent CRM built specifically for Substack newsletter creators. Turn subscriber data into meaningful connections with advanced segmentation, growth analytics, and automated outreach tools.

![Stackly Dashboard](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?style=flat&logo=postgresql)

## ✨ Features

- **Advanced Segmentation** - Group readers by behavior, interests, and engagement levels automatically
- **Growth Analytics** - Deep dive into subscriber acquisition and retention metrics in real-time
- **Automated Outreach** - Send personalized follow-ups and re-engagement campaigns
- **Smart Automations** - Connect with 1000+ tools via robust API and Zapier integration
- **Revenue Tracking** - Understand which content drives the most paid conversions
- **Custom Personas** - AI-powered reader profiles to help you write resonant content

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 16+
- Docker (optional, for local database)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kwstx/substack-crm-dashboard.git
   cd substack-crm-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your credentials:
   ```env
   DATABASE_URL=postgresql://postgres:password@localhost:5435/substack_crm
   AUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Start the database** (using Docker)
   ```bash
   docker compose up -d
   ```

5. **Push database schema**
   ```bash
   npm run db:push
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Authentication:** NextAuth.js v5
- **Database:** PostgreSQL with Drizzle ORM
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI + shadcn/ui
- **Charts:** Recharts
- **Animations:** Framer Motion

## 📁 Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
│   ├── dashboard/    # Dashboard-specific components
│   ├── landing/      # Landing page components
│   └── ui/           # Reusable UI components
├── actions/          # Server actions
├── db/               # Database schema and migrations
└── lib/              # Utility functions
```

## 🔐 Authentication

Stackly uses NextAuth.js v5 with credentials-based authentication. The auth configuration is split for Edge runtime compatibility:

- `src/auth.config.ts` - Edge-compatible configuration
- `src/auth.ts` - Full auth setup with providers
- `src/middleware.ts` - Route protection

## 📊 Database

The application uses PostgreSQL with Drizzle ORM. Key tables include:

- `users` - User accounts
- `subscribers` - Substack subscribers
- `personas` - Reader segments
- `campaigns` - Outreach campaigns
- `payments` - Revenue tracking

Run migrations:
```bash
npm run db:push
```

## 🎨 Styling

The project uses a custom design system with:
- Tailwind CSS for utility-first styling
- Custom color palette (violet/purple gradients)
- Responsive design patterns
- Glassmorphism effects
- Smooth animations

## 📝 Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Drizzle Studio

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Environment Variables for Production

```env
DATABASE_URL=your-production-database-url
AUTH_SECRET=your-production-secret
NEXTAUTH_URL=https://your-domain.com
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [Live Demo](https://stackly.vercel.app) (if deployed)
- [Documentation](https://docs.stackly.app) (if available)
- [Support](mailto:support@stackly.app)

---

Built with ❤️ for newsletter creators
