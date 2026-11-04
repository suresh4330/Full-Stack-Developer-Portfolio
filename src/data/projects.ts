import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'stockflow',
    title: 'StockFlow',
    subtitle: 'Full-Stack Inventory & Stock Management System',
    role: 'Full-Stack Developer',
    date: 'Feb 2026',
    category: 'Full Stack',
    featured: true,
    problemStatement:
      'Inventory management systems frequently face challenges with real-time stock reconciliation, data consistency during concurrent updates, and cumbersome API integrations between modern single-page apps and backend databases.',
    solution:
      'Engineered an end-to-end inventory management platform featuring a responsive React and TypeScript frontend, paired with an asynchronous FastAPI backend and a normalized PostgreSQL database enforcing transaction safety and schema constraints.',
    frontendStack: ['React 18', 'TypeScript', 'Tailwind CSS', 'Vite', 'Lucide Icons'],
    backendStack: ['FastAPI (Python)', 'Node.js', 'RESTful APIs', 'OpenAPI / Swagger'],
    databaseStack: ['PostgreSQL', 'SQLAlchemy / Relational Schemas'],
    keyCapabilities: [
      'Interactive React single-page interface with responsive inventory tables and product catalog management',
      'High-performance asynchronous RESTful API endpoints built in FastAPI with auto-generated Swagger documentation',
      'ACID-compliant relational database schema in PostgreSQL with foreign keys ensuring data consistency',
      'Real-time low-stock alerts and atomic stock quantity adjustments',
      'Clean separation between frontend state models and backend controller validation',
    ],
    architectureSummary:
      'Decoupled full-stack architecture: A typed React SPA communicates with an asynchronous Python FastAPI service over REST endpoints, persisting stock records to a relational PostgreSQL database.',
    githubUrl: 'https://github.com/suresh4330/stockFlow',
    imageUrl: '/stockflow-preview.jpg',
    challenges: [
      {
        title: 'Maintaining inventory consistency during simultaneous orders',
        description:
          'Utilized database transactions and constraint verification on the backend to guarantee inventory adjustments execute atomically without race conditions.',
      },
      {
        title: 'Providing typed contracts between React frontend and FastAPI',
        description:
          'Leveraged TypeScript interfaces generated to mirror Pydantic schema models, guaranteeing strict end-to-end data validation across network boundaries.',
      },
    ],
    learnings: [
      'Structuring clean full-stack monorepos with separate frontend and backend directories.',
      'Designing intuitive UI tables with filtering and instant optimistic client updates.',
      'Writing normalized relational schemas with explicit foreign key integrity.',
    ],
  },
  {
    id: 'medical-appointment',
    title: 'Medical Appointment Management System',
    subtitle: 'Healthcare SaaS & Consultation Scheduling Platform',
    role: 'Full-Stack Developer',
    date: 'Oct 2026',
    category: 'Full Stack',
    featured: true,
    problemStatement:
      'Healthcare facilities require structured appointment scheduling that protects sensitive patient records, eliminates scheduling conflicts, and provides dedicated role-based portals for patients, physicians, and clinic staff.',
    solution:
      'Architected a multi-role healthcare appointment booking platform pairing a responsive React frontend with a modular Node.js/Express backend. Integrated stateless JWT authentication with Role-Based Access Control (RBAC) and MongoDB Atlas cloud document storage.',
    frontendStack: ['React 18', 'JavaScript (ES6+)', 'Tailwind CSS', 'Vercel Deployment'],
    backendStack: ['Node.js', 'Express.js', 'RESTful APIs', 'Stateless JWT Auth', 'RBAC Middleware'],
    databaseStack: ['MongoDB Atlas', 'Mongoose ODM'],
    keyCapabilities: [
      'Multi-role access control (Patient, Doctor, Administrator) powered by secure JWT authorization middleware',
      'Physician discovery with specialty filtering and interactive consultation time-slot selection',
      'Centralized Express error-handling middleware preventing unhandled exceptions and standardizing API responses',
      'Patient intake records and appointment status state machine (Pending, Confirmed, Completed, Cancelled)',
      'Automated end-to-end API integration testing using Postman collections to validate edge cases',
    ],
    architectureSummary:
      'Classic 3-tier MERN SaaS architecture: Dynamic React client connects to an Express.js API gateway that handles token verification and business rules, backed by MongoDB Atlas cloud persistence.',
    githubUrl: 'https://github.com/suresh4330/Medical-Appointment',
    challenges: [
      {
        title: 'Preventing double-booking of doctor consultation slots',
        description:
          'Implemented atomic status updates on consultation slot documents, ensuring slot availability is validated and reserved in a single uninterrupted operation.',
      },
      {
        title: 'Separating sensitive patient history from public staff views',
        description:
          'Created granular Express middleware route guards and query projection filters that redact medical notes from non-physician JWT tokens.',
      },
    ],
    learnings: [
      'Designing role-based authentication architectures with cryptographically signed tokens.',
      'Document database schema design with Mongoose validators and population references.',
      'Writing modular backend controllers with centralized error handling.',
    ],
  },
  {
    id: 'food-delivery-app',
    title: 'Food Delivery Web Platform',
    subtitle: 'Customer Ordering Web Application & Checkout Workflow',
    role: 'Frontend & Full-Stack Developer',
    date: 'Apr 2026',
    category: 'Frontend',
    featured: true,
    problemStatement:
      'Customer-facing food ordering platforms require lightning-fast cart interactions across varied mobile viewports, dynamic price calculations with taxes, and interactive delivery address selection without sluggish page reloads.',
    solution:
      'Built a responsive, fluid web application using React and Vite. Engineered client-side state management using the React Context API for instant optimistic cart mutations, integrated Leaflet maps for delivery address verification, and deployed to Vercel with optimized Core Web Vitals.',
    frontendStack: ['React.js', 'JavaScript (ES6+)', 'Vite', 'React Context API', 'Leaflet.js', 'HTML5/CSS3'],
    backendStack: ['Asynchronous REST APIs', 'Vercel Edge'],
    databaseStack: ['Client State Store', 'LocalStorage Fallback'],
    keyCapabilities: [
      'Centralized client state management using React Context API for optimistic cart additions and instant updates',
      'Real-time price calculations handling dynamic item quantities, delivery charges, and taxes',
      'Interactive checkout workflow with Leaflet map integration for visual pin-drop delivery location confirmation',
      'Fluid, mobile-first responsive design engineered with semantic HTML5 and clean CSS3 Grid/Flexbox layouts',
      'Asynchronous REST API communication for dynamic restaurant and menu catalog retrieval',
    ],
    architectureSummary:
      'Modern Single Page Application (SPA) leveraging React Context API for client-side state, consuming REST APIs for catalog retrieval and utilizing Leaflet map layers for delivery coordinates.',
    githubUrl: 'https://github.com/suresh4330/Food-delivery-App',
    challenges: [
      {
        title: 'Eliminating sluggish re-renders during high-frequency cart quantity updates',
        description:
          'Normalized cart state structure into key-value maps and utilized React memoization to prevent untouched menu category components from re-rendering.',
      },
      {
        title: 'Ensuring seamless map interaction on compact mobile screens',
        description:
          'Configured responsive Leaflet tile layers with custom touch-gesture handlers and dynamic viewport coordinate bounds.',
      },
    ],
    learnings: [
      'Mastering client-side state architectures with React Context and custom hooks.',
      'Integrating third-party JavaScript mapping SDKs inside React component lifecycles.',
      'Optimizing frontend bundle sizes and Core Web Vitals for production edge deployments.',
    ],
  },
  {
    id: 'movie-booking',
    title: 'Movie Booking System',
    subtitle: 'Cinema Discovery & Interactive Ticket Reservation Portal',
    role: 'Frontend Engineer',
    date: '2025',
    category: 'Frontend',
    featured: false,
    problemStatement:
      'Moviegoers need a seamless experience for discovering currently playing movies from live film databases, finding nearby theatres, and selecting seats without complex backend setups.',
    solution:
      'Engineered an interactive frontend booking platform that integrates the external TMDB REST API for live film metadata, OpenStreetMap for cinema geolocation, and browser localStorage for persistent client-side seat reservations.',
    frontendStack: ['React.js', 'JavaScript (ES6+)', 'TMDB REST API', 'OpenStreetMap', 'CSS3'],
    backendStack: ['TMDB Public API Gateway', 'Client-Side Session Store'],
    databaseStack: ['Browser LocalStorage (JSON State Store)'],
    keyCapabilities: [
      'Live movie catalog retrieval from TMDB API with poster art, ratings, and genre filtering',
      'Location-based cinema selection with OpenStreetMap geospatial integration',
      'Interactive cinema hall seat selection matrix with real-time seat reservation toggling',
      'Client-side persistent ticket booking history saved across browser sessions via localStorage',
      'Clean modal previews for movie trailers, synopses, and showtime schedules',
    ],
    architectureSummary:
      'Client-side SPA communicating directly with external movie metadata APIs, rendering interactive cinema coordinates, and maintaining simulated reservations in localStorage.',
    githubUrl: 'https://github.com/suresh4330/Movie-Booking-System',
    challenges: [
      {
        title: 'Handling external API rate limits and network variability',
        description:
          'Implemented defensive error boundaries and session caching to store previously fetched film records and gracefully degrade during network disconnects.',
      },
    ],
    learnings: [
      'Consuming third-party RESTful APIs and safely parsing unstructured responses.',
      'Modeling interactive grid matrices for seat selection algorithms in React.',
    ],
  },
  {
    id: 'route-optimization',
    title: 'Route Optimization Engine (Dijkstra)',
    subtitle: 'Algorithmic Graph Traversal & Shortest-Path Computation',
    role: 'Systems & Algorithmic Engineer',
    date: '2025',
    category: 'Algorithms',
    featured: false,
    problemStatement:
      'Finding the shortest path across road network topologies with standard adjacency matrix approaches causes quadratic $O(V^2)$ latency, making large-scale path computation inefficient.',
    solution:
      'Implemented an optimized shortest-path calculation engine in C++ leveraging Dijkstra’s algorithm built upon adjacency lists and binary min-heap priority queues, reducing search complexity to $O((V + E) \log V)$ with custom edge weights.',
    frontendStack: ['Interactive Graph Visualizer (CLI / Web Demo)'],
    backendStack: ['C++', 'Graph Data Structures', 'Priority Queues'],
    databaseStack: ['In-Memory Weighted Graph Representation'],
    keyCapabilities: [
      'Dijkstra shortest-path algorithm implementation using adjacency lists and binary min-heap priority queues',
      'Asymptotic complexity optimized from $O(V^2)$ down to $O((V + E) \log V)$',
      'Weighted graph modeling representing physical distances and travel friction',
      'Algorithmic unit test suites validating acyclic paths, cyclic loops, and disconnected nodes',
      'Derived from intensive 3-month C++ Data Structures and Algorithms training',
    ],
    architectureSummary:
      'High-performance algorithmic core: Models network topologies as directed weighted graphs and resolves single-source shortest path trees with minimal memory overhead.',
    githubUrl: 'https://github.com/suresh4330/route-optimization-dijkstra',
    challenges: [
      {
        title: 'Optimizing memory footprint across sparse and dense graph networks',
        description:
          'Employed adjacency list vector arrays paired with fast std::priority_queue relaxation to eliminate unnecessary graph traversals.',
      },
    ],
    learnings: [
      'Implementing foundational computer science graph algorithms in C++.',
      'Rigorous Big-O runtime analysis and asymptotic performance profiling.',
    ],
  },
];
