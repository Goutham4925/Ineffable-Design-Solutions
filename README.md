# Ineffable Design Solutions - Frontend

A premium digital agency website built with React, Vite, and Tailwind CSS featuring cinematic animations and a sophisticated dark/light theme.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, CSS Variables for theming
- **Animations**: Framer Motion, GSAP (ScrollTrigger)
- **UI Components**: shadcn/ui (Radix primitives)
- **Routing**: React Router DOM

---

## Pages Overview

### 1. Home Page (`/`)
**File**: `src/pages/Index.tsx`

Renders all homepage sections in sequence:
- **HeroSection**: Full-screen hero with wave background image, staggered text animations, and scroll indicator
- **AboutSection**: Agency introduction with stats counters
- **ServicesSection**: Scroll-pinned service cards with GSAP ScrollTrigger animations
- **ProcessSection**: Work process steps
- **ProjectsSection**: Featured project showcase grid
- **TestimonialsSection**: Client testimonials carousel
- **ContactCTA**: Call-to-action for contact

**Backend Requirements**:
- `GET /api/stats` - Fetch homepage statistics
- `GET /api/services?featured=true` - Fetch featured services
- `GET /api/projects?featured=true` - Fetch featured projects
- `GET /api/testimonials` - Fetch testimonials

---

### 2. About Page (`/about`)
**File**: `src/pages/About.tsx`

Agency story, team information, and values.

**Backend Requirements**:
- `GET /api/about` - Fetch about page content (mission, vision, story)
- `GET /api/team` - Fetch team members
- `GET /api/stats` - Fetch company statistics

---

### 3. Services Page (`/services`)
**File**: `src/pages/Services.tsx`

Complete list of all services offered.

**Backend Requirements**:
- `GET /api/services` - Fetch all services with full details

**Service Data Structure**:
```typescript
interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  accentColor: string; // CSS variable key
  icon: string; // Lucide icon name
  order: number;
}
```

---

### 4. Projects Page (`/projects`)
**File**: `src/pages/Projects.tsx`

Portfolio grid showing all projects with filtering.

**Backend Requirements**:
- `GET /api/projects` - Fetch all projects
- `GET /api/projects?category={category}` - Filter by category

**Project Data Structure**:
```typescript
interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  images: string[];
  services: string[];
  results: { metric: string; value: string }[];
  testimonial?: { quote: string; author: string; role: string };
  nextProject?: string; // slug of next project
  prevProject?: string; // slug of prev project
}
```

---

### 5. Project Detail Page (`/projects/:slug`)
**File**: `src/pages/ProjectDetail.tsx`

Individual project case study with:
- Hero section with project image
- Project overview and challenge
- Image gallery with lightbox
- Results/metrics display
- Client testimonial
- Next/Previous project navigation

**Backend Requirements**:
- `GET /api/projects/:slug` - Fetch single project by slug
- `GET /api/projects/:slug/related` - Fetch related projects

---

### 6. Contact Page (`/contact`)
**File**: `src/pages/Contact.tsx`

Contact form and company information.

**Backend Requirements**:
- `GET /api/contact-info` - Fetch contact details (email, phone, address, socials)
- `POST /api/contact` - Submit contact form

**Contact Form Payload**:
```typescript
interface ContactSubmission {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string; // Selected service interest
  budget?: string;
  message: string;
}
```

---

## Data Files (Current Mock Data)

Located in `src/data/`:

| File | Description |
|------|-------------|
| `services.ts` | Service definitions with icons, colors, features |
| `projects.ts` | Project portfolio data |
| `testimonials.ts` | Client testimonials |
| `stats.ts` | Company statistics |

---

## Backend Implementation Guide (Express + PostgreSQL)

### Database Schema (PostgreSQL with Prisma)

```prisma
// prisma/schema.prisma

model Service {
  id              String   @id @default(cuid())
  slug            String   @unique
  title           String
  description     String
  longDescription String?  @db.Text
  features        String[] // Array of feature strings
  accentColor     String   // e.g., "service-software"
  icon            String   // Lucide icon name
  order           Int      @default(0)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  projects        ProjectService[]
}

model Project {
  id              String   @id @default(cuid())
  slug            String   @unique
  title           String
  client          String
  category        String
  year            String
  description     String
  longDescription String?  @db.Text
  thumbnail       String
  images          String[] // Array of image URLs
  featured        Boolean  @default(false)
  order           Int      @default(0)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  services        ProjectService[]
  results         ProjectResult[]
  testimonial     ProjectTestimonial?
}

model ProjectService {
  project   Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  projectId String
  service   Service @relation(fields: [serviceId], references: [id], onDelete: Cascade)
  serviceId String
  
  @@id([projectId, serviceId])
}

model ProjectResult {
  id        String  @id @default(cuid())
  metric    String
  value     String
  project   Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  projectId String
}

model ProjectTestimonial {
  id        String  @id @default(cuid())
  quote     String  @db.Text
  author    String
  role      String
  project   Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  projectId String  @unique
}

model Testimonial {
  id        String   @id @default(cuid())
  quote     String   @db.Text
  author    String
  role      String
  company   String
  avatar    String?
  featured  Boolean  @default(false)
  order     Int      @default(0)
  createdAt DateTime @default(now())
}

model Stat {
  id        String @id @default(cuid())
  label     String
  value     String
  suffix    String? // e.g., "+", "%", "K"
  order     Int    @default(0)
}

model ContactSubmission {
  id        String   @id @default(cuid())
  name      String
  email     String
  company   String?
  phone     String?
  service   String?
  budget    String?
  message   String   @db.Text
  read      Boolean  @default(false)
  createdAt DateTime @default(now())
}

model SiteSettings {
  id          String @id @default("settings")
  email       String
  phone       String
  address     String @db.Text
  socials     Json   // { twitter: "", linkedin: "", instagram: "" }
  aboutText   String @db.Text
  mission     String @db.Text
  vision      String @db.Text
}
```

### Express API Routes

```typescript
// src/routes/api.ts

import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Services
router.get('/services', async (req, res) => {
  const { featured } = req.query;
  const services = await prisma.service.findMany({
    orderBy: { order: 'asc' },
    ...(featured && { take: 4 })
  });
  res.json(services);
});

router.get('/services/:slug', async (req, res) => {
  const service = await prisma.service.findUnique({
    where: { slug: req.params.slug },
    include: { projects: { include: { project: true } } }
  });
  res.json(service);
});

// Projects
router.get('/projects', async (req, res) => {
  const { category, featured } = req.query;
  const projects = await prisma.project.findMany({
    where: {
      ...(category && { category: category as string }),
      ...(featured && { featured: true })
    },
    include: {
      services: { include: { service: true } },
      results: true
    },
    orderBy: { order: 'asc' }
  });
  res.json(projects);
});

router.get('/projects/:slug', async (req, res) => {
  const project = await prisma.project.findUnique({
    where: { slug: req.params.slug },
    include: {
      services: { include: { service: true } },
      results: true,
      testimonial: true
    }
  });
  
  // Get next/prev projects
  const allProjects = await prisma.project.findMany({
    orderBy: { order: 'asc' },
    select: { slug: true }
  });
  const currentIndex = allProjects.findIndex(p => p.slug === req.params.slug);
  
  res.json({
    ...project,
    nextProject: allProjects[currentIndex + 1]?.slug || null,
    prevProject: allProjects[currentIndex - 1]?.slug || null
  });
});

// Testimonials
router.get('/testimonials', async (req, res) => {
  const testimonials = await prisma.testimonial.findMany({
    where: { featured: true },
    orderBy: { order: 'asc' }
  });
  res.json(testimonials);
});

// Stats
router.get('/stats', async (req, res) => {
  const stats = await prisma.stat.findMany({
    orderBy: { order: 'asc' }
  });
  res.json(stats);
});

// Contact
router.get('/contact-info', async (req, res) => {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: 'settings' }
  });
  res.json(settings);
});

router.post('/contact', async (req, res) => {
  const submission = await prisma.contactSubmission.create({
    data: req.body
  });
  
  // TODO: Send email notification
  // await sendEmail({ to: settings.email, ... });
  
  res.json({ success: true, id: submission.id });
});

// Site Settings / About
router.get('/about', async (req, res) => {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: 'settings' },
    select: { aboutText: true, mission: true, vision: true }
  });
  res.json(settings);
});

export default router;
```

### Environment Variables

```env
# .env
DATABASE_URL="postgresql://user:password@localhost:5432/ineffable_db"
JWT_SECRET="your-secure-jwt-secret"
SMTP_HOST="smtp.example.com"
SMTP_PORT=587
SMTP_USER="noreply@example.com"
SMTP_PASS="password"
```

---

## Component Architecture

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── Navbar.tsx          # Navigation with theme toggle
│   ├── Footer.tsx          # Site footer
│   ├── HeroSection.tsx     # Homepage hero
│   ├── AboutSection.tsx    # About preview
│   ├── ServicesSection.tsx # GSAP scroll-pinned services
│   ├── ProjectsSection.tsx # Project grid
│   ├── ProcessSection.tsx  # Work process
│   ├── TestimonialsSection.tsx
│   ├── ContactCTA.tsx      # Contact call-to-action
│   ├── ThemeToggle.tsx     # Dark/light mode toggle
│   └── NavLink.tsx         # Animated nav links
├── data/                   # Mock data (replace with API calls)
├── hooks/
│   ├── use-mobile.tsx      # Responsive hook
│   └── use-toast.ts        # Toast notifications
├── pages/
│   ├── Index.tsx           # Homepage
│   ├── About.tsx           # About page
│   ├── Services.tsx        # Services listing
│   ├── Projects.tsx        # Project portfolio
│   ├── ProjectDetail.tsx   # Single project
│   ├── Contact.tsx         # Contact page
│   └── NotFound.tsx        # 404 page
├── lib/
│   └── utils.ts            # Utility functions
├── index.css               # Global styles & theme variables
└── App.tsx                 # Router configuration
```

---

## Theming

All colors use CSS variables defined in `src/index.css`. The theme supports:
- Light mode (default class: `:root`)
- Dark mode (class: `.dark`)

Key color tokens:
- `--primary`: Deep teal brand color
- `--background`: Page background
- `--foreground`: Main text color
- `--muted-foreground`: Secondary text
- `--card`: Card backgrounds
- `--border`: Border colors
- `--service-*`: Service-specific accent colors

---

## Animations

### Framer Motion
Used for:
- Page transitions
- Hero text reveals
- Staggered list animations
- Hover effects

### GSAP ScrollTrigger
Used for:
- ServicesSection scroll-pinned cards
- Parallax effects
- Counter animations

---

## Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Admin Panel (Future)

For content management, create a separate admin dashboard with:
- JWT authentication
- CRUD operations for all content types
- Image upload (integrate with S3/Cloudinary)
- Contact form submissions viewer
- Analytics dashboard

Protected routes should verify JWT tokens:

```typescript
// middleware/auth.ts
import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```
