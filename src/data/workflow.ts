import { WorkflowStep } from '../types';

export const workflowSteps: WorkflowStep[] = [
  {
    step: 1,
    title: 'Understand Requirements',
    subtitle: 'Scope, user workflows, and technical constraints',
    description:
      'Before writing any code, I analyze core user stories, identify key user personas (e.g., patient vs. doctor, customer vs. kitchen), define data flow diagrams, and map out necessary API contracts.',
    deliverables: [
      'User journey mapping & feature boundaries',
      'Data model sketches (entities, relationships, constraints)',
      'API endpoint specifications & contract definitions',
    ],
    icon: 'Compass',
  },
  {
    step: 2,
    title: 'Design User Interfaces',
    subtitle: 'Responsive layout planning and user experience',
    description:
      'I outline clean, intuitive visual hierarchies with mobile-first responsiveness in mind. Focusing on typography, spacing, accessible color contrast, and friction-free interactions for users.',
    deliverables: [
      'Component breakdown & page wireframes',
      'Design token definition (colors, typography, spacing)',
      'Responsive viewports (mobile, tablet, desktop) considerations',
    ],
    icon: 'Layout',
  },
  {
    step: 3,
    title: 'Build Frontend Components',
    subtitle: 'Modular React & TypeScript interface construction',
    description:
      'I craft reusable, strictly typed React components styled with Tailwind CSS. State management is scoped cleanly—using local React state for UI feedback and React Context for global flows like shopping carts or active sessions.',
    deliverables: [
      'Type-safe component library with strict TypeScript props',
      'Optimistic UI state updates for immediate user feedback',
      'Accessible keyboard navigation & fluid micro-interactions',
    ],
    icon: 'Code2',
  },
  {
    step: 4,
    title: 'Develop Backend APIs',
    subtitle: 'Stateless REST services & authentication rules',
    description:
      'I build robust RESTful endpoints with Node.js/Express or Python/FastAPI. Every route incorporates input validation, centralized error handling, and stateless JWT authentication with Role-Based Access Control (RBAC).',
    deliverables: [
      'Stateless REST routes adhering to HTTP method standards',
      'Cryptographically signed JWT auth & role authorization guards',
      'Defensive error-handling middleware preventing unhandled crashes',
    ],
    icon: 'Server',
  },
  {
    step: 5,
    title: 'Integrate Databases',
    subtitle: 'Structured schemas and transaction integrity',
    description:
      'Whether designing normalized tables with foreign keys in PostgreSQL or dynamic document models in MongoDB with Mongoose, I ensure data validation at the storage layer and write safe queries that preserve consistency.',
    deliverables: [
      'Normalized relational schemas & Mongoose data models',
      'Foreign key constraints and data validation rules',
      'Atomic transactions preventing concurrent mutation bugs',
    ],
    icon: 'Database',
  },
  {
    step: 6,
    title: 'Test, Debug & Refine',
    subtitle: 'Verification, Postman collections, and optimization',
    description:
      'I rigorously verify the full stack: running automated API integration collections in Postman, inspecting network payloads and DOM performance with Chrome DevTools, and resolving edge-case bugs before production deployment.',
    deliverables: [
      'Automated Postman API test collections for endpoints',
      'Cross-browser & cross-device responsive layout testing',
      'Bundle optimization and clean production deployment on Vercel',
    ],
    icon: 'CheckCircle2',
  },
];

