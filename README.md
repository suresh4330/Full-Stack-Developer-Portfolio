# Annamneedi Suresh Kumar — Production Full Stack Developer Portfolio

A production-quality personal software engineering portfolio built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. Designed with an architectural focus highlighting full-stack engineering, PostgreSQL query optimization, containerized microservices, and verified project implementations.

---

## Technical Highlights & Verified Credentials

- **Engineer:** Annamneedi Suresh Kumar
- **Role:** Full Stack Developer | Software Engineer
- **Education:** B.Tech in Computer Science and Engineering (Artificial Intelligence & Machine Learning), Lovely Professional University (2023 – 2027, **CGPA: 8.32**)
- **Certifications:** Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate, Infosys Springboard Principles of Generative AI, Udemy Master Generative AI & Tools
- **Competitive Milestones:** Code Off Duty Web Hackathon Round 2 Qualifier (Coding Wise), 3-Month Intensive C++ Data Structures & Algorithms Training

---

## Featured Systems & Projects

1. **StockFlow — Enterprise Full-Stack Platform & Cloud Infrastructure**
   - *Stack:* React 18, TypeScript, Python (FastAPI) / Node.js, PostgreSQL, Docker Compose, Nginx, Prometheus, Grafana, GitHub Actions
   - *Key Engineering:* Composite B-tree indexing and connection pooling achieving `< 40ms` query latency; ACID transactions for concurrent inventory state mutations; Prometheus and Grafana metrics scraping; automated CI/CD pipelines.
   - *Source:* [github.com/suresh4330/stockFlow](https://github.com/suresh4330/stockFlow)

2. **Medical Appointment Management System — Full-Stack Healthcare SaaS & Booking**
   - *Stack:* React 18, Node.js, Express.js, MongoDB Atlas (Mongoose), RESTful APIs, JWT Auth, Postman, Vercel
   - *Key Engineering:* Stateless JWT authentication with Role-Based Access Control (RBAC) across Patients, Doctors, and Administrators; centralized error-handling middleware; automated Postman collection integration testing.
   - *Source:* [github.com/suresh4330/Medical-Appointment](https://github.com/suresh4330/Medical-Appointment)

3. **Food Delivery App — Responsive Customer Web Platform & Checkout Workflow**
   - *Stack:* React.js, JavaScript (ES6+), Vite, Context API, Leaflet.js, REST APIs, Vercel
   - *Key Engineering:* Centralized client-side state management with React Context API for instant optimistic cart mutations; Leaflet map integration for interactive delivery coordinates; optimized Core Web Vitals.
   - *Source:* [github.com/suresh4330/Food-delivery-App](https://github.com/suresh4330/Food-delivery-App)

4. **FitTracker — Health Analytics & Real-Time Telemetry Platform**
   - *Stack:* React 19, Node.js, Socket.io WebSockets, Recharts, Framer Motion, Chrome DevTools
   - *Key Engineering:* Full-duplex WebSocket telemetry streaming; sub-1.2s First Contentful Paint; zero-frame-drop dynamic time-series charts.

---

## Project Structure

```
├── public/
│   ├── resume.pdf           # Uploaded verified resume PDF
├── src/
│   ├── components/
│   │   ├── layout/          # Navbar, Footer
│   │   ├── sections/        # Hero, About, Skills, FeaturedProjects, Case Studies, Engineering, Milestones, Education, Contact
│   │   └── ui/              # Button, Badge, SectionHeading, Modal
│   ├── data/                # Strongly-typed data modules (profile, projects, skills, experience, education, etc.)
│   ├── styles/              # Tailwind directives & custom CSS
│   ├── types/               # TypeScript interfaces
│   ├── App.tsx              # Application layout root
│   └── main.tsx             # Entry point
├── index.html               # Semantic HTML with SEO & Open Graph meta
├── package.json             # Dependencies & scripts
├── tailwind.config.js       # Premium dark developer theme tokens
├── tsconfig.json            # Strict TypeScript configuration
├── vercel.json              # Vercel deployment configuration & security headers
└── vite.config.ts           # Vite build pipeline
```

---

## Local Development & Testing

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Run TypeScript check & production build:**
   ```bash
   npm run build
   ```

4. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## Deployment (Vercel)

- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Environment Variables:** None required (fully self-contained, client-side verified application with direct mailto / verified links)
- **Configuration:** Included in `vercel.json` with security headers and PDF mime-type handling

