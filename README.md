# SEO Brief Generator - Frontend

A modern Next.js frontend for generating AI-powered SEO content briefs.

## 🚀 Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Performant form handling
- **Zod** - Schema validation
- **Lucide React** - Beautiful icons
- **Geist Font** - Modern typography by Vercel

## 📁 Project Structure

```
seo-frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with Geist font
│   │   ├── page.tsx            # Main page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── Header.tsx          # Header component
│   │   ├── BriefForm.tsx       # Form with validation
│   │   └── BriefOutput.tsx     # Brief display
│   ├── lib/
│   │   ├── api.ts              # API client
│   │   └── validations.ts      # Zod schemas
│   └── types/
│       └── index.ts            # TypeScript types
├── public/
├── tailwind.config.ts
└── next.config.ts
```

## 🎨 Design

- **Brand Color**: `#4f47e6` (Indigo/Purple)
- **Font**: Geist Sans & Geist Mono
- **Theme**: Light mode with gradient accents
- **Animations**: Smooth transitions and loading states

## 🛠️ Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Mathankrsh/seo-frontend.git
cd seo-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
cp .env.example .env.local
# Edit .env.local and set NEXT_PUBLIC_API_URL
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🚢 Deployment (Vercel)

1. Push to GitHub
2. Import repository in Vercel
3. Add environment variable:
   - `NEXT_PUBLIC_API_URL`: Your Railway backend URL
4. Deploy!

## 📝 Features

- ✅ Dynamic keyword tag inputs
- ✅ Real-time form validation
- ✅ Loading states with animations
- ✅ Error handling with user feedback
- ✅ Copy-to-clipboard functionality
- ✅ Responsive design
- ✅ SEO optimized

## 📄 License

MIT
