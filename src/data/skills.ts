export interface SkillCategory {
  title: string;
  tagline: string;
  skills: {
    name: string;
    description: string;
  }[];
}

export const skillsCategories: SkillCategory[] = [
  {
    title: 'Frontend Development',
    tagline: 'Modern, component-driven user interfaces and client-side state',
    skills: [
      { name: 'React.js (18 / 19)', description: 'Functional components, hooks, component lifecycle, concurrent UI rendering' },
      { name: 'TypeScript', description: 'Strict typing, custom interfaces, generic components, type-safe props' },
      { name: 'JavaScript (ES6+)', description: 'Async/await, promises, DOM manipulation, closures, modern ES modules' },
      { name: 'HTML5 & CSS3', description: 'Semantic markup, Flexbox, CSS Grid, mobile-first responsive design' },
      { name: 'Tailwind CSS', description: 'Utility-first styling, design token systems, dark mode palettes' },
      { name: 'React Context API', description: 'Centralized client state management, optimistic UI updates' },
      { name: 'Vite', description: 'Rapid ESM development, optimized production bundling, asset optimization' },
      { name: 'Leaflet.js', description: 'Interactive map integration, coordinate plotting, OpenStreetMap tiles' },
    ],
  },
  {
    title: 'Backend Development',
    tagline: 'Stateless RESTful APIs, business logic, and modular servers',
    skills: [
      { name: 'Node.js', description: 'Asynchronous event-driven runtime, modular microservice architecture' },
      { name: 'Express.js', description: 'REST API routing, middleware pipelines, centralized error handling' },
      { name: 'FastAPI (Python)', description: 'High-performance async endpoints, OpenAPI/Swagger interactive docs' },
      { name: 'RESTful API Design', description: 'HTTP method semantics, status code standards, contract validation' },
      { name: 'Stateless JWT Auth', description: 'Cryptographic token generation, Bearer authorization, route guards' },
      { name: 'Role-Based Access Control', description: 'Granular permissions for patient, doctor, and admin roles' },
      { name: 'API Integration', description: 'Consuming third-party APIs (TMDB, maps) and building client adapters' },
    ],
  },
  {
    title: 'Programming Languages',
    tagline: 'Core languages for web applications, scripting, and algorithms',
    skills: [
      { name: 'TypeScript', description: 'Enterprise type safety, interface contracts, React component typing' },
      { name: 'JavaScript', description: 'Core modern web development, frontend logic, Node.js servers' },
      { name: 'Python', description: 'FastAPI backend engineering, data modeling, automation scripts' },
      { name: 'C++', description: 'Data structures & algorithms, pointers, asymptotic performance optimization' },
      { name: 'SQL', description: 'Relational data queries, table schemas, foreign key constraints' },
    ],
  },
  {
    title: 'Databases & Storage',
    tagline: 'Structured relational databases and cloud document stores',
    skills: [
      { name: 'PostgreSQL', description: 'Relational schema modeling, foreign keys, transaction safety, SQL queries' },
      { name: 'MongoDB (Mongoose)', description: 'Cloud document storage, dynamic schemas, validation, collections' },
      { name: 'MongoDB Atlas', description: 'Cloud database deployment, cluster connectivity, secure data access' },
      { name: 'Browser LocalStorage', description: 'Client-side persistent caching and offline simulation stores' },
    ],
  },
  {
    title: 'Tools & Workflow',
    tagline: 'Modern developer tooling, version control, and testing',
    skills: [
      { name: 'Git & GitHub', description: 'Branch management, pull requests, version history, open-source workflow' },
      { name: 'Postman', description: 'Automated API collection testing, request validation, endpoint debugging' },
      { name: 'Chrome DevTools', description: 'Network inspection, console debugging, responsive viewport testing' },
      { name: 'Vercel', description: 'Continuous deployment of frontend SPAs and edge asset hosting' },
      { name: 'Linux / Bash', description: 'Command-line utilities, script execution, file management' },
    ],
  },
  {
    title: 'Software Engineering Fundamentals',
    tagline: 'Foundational computer science principles for durable software',
    skills: [
      { name: 'Data Structures & Algorithms', description: 'Graphs, heaps, dynamic programming, asymptotic Big-O runtime analysis' },
      { name: 'Object-Oriented Programming', description: 'Encapsulation, abstraction, inheritance, and clean code principles' },
      { name: 'Component-Based Architecture', description: 'Reusability, separation of concerns, single-responsibility components' },
      { name: 'API Contract Standards', description: 'Predictable JSON payloads, error boundary handling, HTTP conventions' },
    ],
  },
];
