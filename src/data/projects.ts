import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'stockflow',
    title: 'StockFlow',
    subtitle: 'Full-Stack Inventory & Stock Management System',
    role: 'Full-Stack Developer',
    date: 'Feb 2026',
    category: 'Full Stack',
    tags: ['Full Stack', 'Backend', 'DevOps'],
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
    tags: ['Full Stack', 'Backend'],
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
    id: 'intellimoe',
    title: 'IntelliMoE',
    subtitle: 'Production-Grade Mixture-of-Experts AI Assistant & Multi-LLM Orchestration',
    role: 'AI Systems Architect & Engineer',
    date: 'Feb 2026',
    category: 'Generative AI',
    tags: ['Generative AI', 'AI / Machine Learning', 'Backend', 'DevOps'],
    featured: true,
    problemStatement:
      'Monolithic LLM deployments face severe trade-offs between domain proficiency, latency, and cost, while single-model outages or API rate limits create critical availability bottlenecks for enterprise workflows.',
    solution:
      'Architected and containerized a high-performance Mixture-of-Experts (MoE) assistant framework. Employs dynamic semantic routing and hybrid ML classification to orchestrate real-time inference across Google Gemini, Groq (Llama-3), and OpenAI models with automated fallback and Explainable AI (XAI) output verification.',
    frontendStack: ['FastAPI Swagger UI', 'Voice AI Audio Interface', 'Real-Time Web Search Client'],
    backendStack: ['Python 3.11', 'FastAPI', 'Gemini API', 'Groq (Llama-3)', 'OpenAI API', 'LangChain', 'Semantic Routing'],
    databaseStack: ['MongoDB Atlas', 'Query Embeddings Cache', 'Docker Compose'],
    keyCapabilities: [
      'Multi-model orchestration dynamically routing queries across Gemini, Groq, and OpenAI based on intent and complexity',
      'Embedding-based semantic router and hybrid ML intent classifier selecting optimal specialized expert paths',
      'Explainable AI (XAI) output verification engine scoring answer quality and factual coherence',
      'Live real-time web search grounding integration fetching up-to-date facts and verified external domain data',
      'Voice AI audio input parsing and streaming audio responses for hands-free conversational workflows',
      'Production-ready containerized microservice architecture packaged with Docker Compose for seamless cloud deployment',
    ],
    architectureSummary:
      'Modular Mixture-of-Experts microservice: Incoming user queries pass through an embedding router and intent classifier that selects the optimal LLM expert (Gemini, Groq, OpenAI), synthesized with XAI answer verification and persisted to MongoDB.',
    githubUrl: 'https://github.com/suresh4330/IntelliMoE',
    challenges: [
      {
        title: 'Minimizing multi-model dispatch overhead and latency',
        description:
          'Implemented asynchronous concurrent query execution and cached intent embeddings in memory, achieving sub-20ms routing decisions before external LLM calls.',
      },
      {
        title: 'Harmonizing divergent response formats across disparate LLM SDKs',
        description:
          'Engineered unified Pydantic response models standardizing token streams, usage metrics, and error boundaries across Gemini, Groq, and OpenAI.',
      },
    ],
    learnings: [
      'Designing production-ready Mixture-of-Experts multi-agent architectures.',
      'Integrating multimodal Voice AI and live web grounding mechanisms.',
      'Containerizing microservices and managing cloud persistence with MongoDB.',
    ],
  },
  {
    id: 'edge-model-compression',
    title: 'Edge Model Compression Benchmark',
    subtitle: 'INT8 Quantization, Weight Pruning & Latency Profiling for Edge AI',
    role: 'Deep Learning & Systems Researcher',
    date: 'Jan 2026',
    category: 'Deep Learning',
    tags: ['Deep Learning', 'AI / Machine Learning', 'DevOps'],
    featured: true,
    problemStatement:
      'Deploying state-of-the-art deep neural networks to battery-powered edge hardware and embedded microcontrollers is severely hindered by memory constraints, thermal throttling, and excessive inference latencies.',
    solution:
      'Architected an empirical benchmarking framework systematically evaluating post-training INT8 quantization, structured weight pruning, and knowledge distillation across MobileNetV2 and ResNet architectures, measuring parameter reduction, FLOPs, and runtime latency on resource-constrained hardware.',
    frontendStack: ['Matplotlib Visualizer', 'Seaborn Heatmaps', 'CLI Profiling Suite'],
    backendStack: ['PyTorch', 'TorchScript', 'ONNX Runtime', 'Python', 'CUDA / Tensor Profiler'],
    databaseStack: ['Quantized ONNX Model Graphs', 'Telemetry Benchmark JSON Stores'],
    keyCapabilities: [
      'Systematic post-training INT8 quantization and structured pruning achieving >60% parameter reduction',
      'Latency, memory footprint, and FLOP profiling across CPU and simulated embedded edge runtimes',
      'Top-1 accuracy trade-off visualization comparing baseline FP32 against quantized INT8 engines',
      'Automated model export pipelines targeting TorchScript and optimized ONNX computational graphs',
      'Repeatable benchmarking harnesses logging peak RAM allocation and inference throughput',
    ],
    architectureSummary:
      'Deep learning optimization harness: Base PyTorch models undergo pruning and quantization observers, export into serialized ONNX computational graphs, and execute under ONNX Runtime with hardware latency logging.',
    githubUrl: 'https://github.com/suresh4330/edge-model-compression-benchmark',
    challenges: [
      {
        title: 'Preventing severe accuracy degradation during aggressive 8-bit weight quantization',
        description:
          'Calibrated dynamic histogram observers over representative evaluation batches, preserving over 98% of baseline classification accuracy.',
      },
      {
        title: 'Exporting custom layers seamlessly into standard ONNX graphs',
        description:
          'Replaced non-standard dynamic control-flow blocks with tensor-native operations recognized by the ONNX operator set.',
      },
    ],
    learnings: [
      'Hardware-aware neural network compression and optimization techniques.',
      'Low-level latency and memory profiling using PyTorch and ONNX Runtime.',
    ],
  },
  {
    id: 'career-ai',
    title: 'CareerAI',
    subtitle: 'Predictive Career Path Recommendation Engine & Multiclass ML Classifier',
    role: 'Machine Learning & Full-Stack Developer',
    date: '2025 – 2026',
    category: 'AI / Machine Learning',
    tags: ['AI / Machine Learning', 'Backend'],
    featured: true,
    problemStatement:
      'Students frequently lack personalized, objective guidance when selecting career specializations, resulting in misalignment between individual cognitive strengths and industry career trajectories.',
    solution:
      'Engineered an end-to-end machine learning web application using a multiclass Gradient Boosting classifier that evaluates multivariate academic, aptitude, and problem-solving metrics to recommend top-5 suited career paths with statistical confidence scores.',
    frontendStack: ['HTML5 / CSS3', 'JavaScript (ES6+)', 'Responsive UI', 'Dynamic Skill Scorecards'],
    backendStack: ['Flask (Python)', 'scikit-learn', 'Gradient Boosting Classifier', 'NumPy', 'Pandas'],
    databaseStack: ['Joblib Model Serialization', 'Empirical Aptitude Dataset'],
    keyCapabilities: [
      'Supervised Gradient Boosting multiclass classifier trained on multidimensional aptitude metrics',
      'Top-5 career recommendations ranked with probabilistic confidence scores',
      'High-throughput Flask REST API serving real-time predictions in under 35ms',
      'Feature importance evaluation surfacing the exact skills influencing each recommendation',
      'Responsive web interface for real-time aptitude evaluation and instant visual feedback',
    ],
    architectureSummary:
      'Supervised ML inference pipeline: User skill vectors are collected via a web client, normalized through a scikit-learn preprocessing pipeline, and scored by an ensemble Gradient Boosting model served by a Flask REST API.',
    githubUrl: 'https://github.com/suresh4330/Career-ai',
    challenges: [
      {
        title: 'Balancing multi-class label representation across niche technical careers',
        description:
          'Tuned ensemble hyperparameters with cross-validation and applied stratified sampling to ensure equal predictive power across both common and specialized careers.',
      },
    ],
    learnings: [
      'Hyperparameter optimization and evaluation for ensemble tree algorithms.',
      'Building production-ready REST prediction APIs with Flask and scikit-learn.',
    ],
  },
  {
    id: 'food-delivery-app',
    title: 'Food Delivery Web Platform',
    subtitle: 'Customer Ordering Web Application & Checkout Workflow',
    role: 'Frontend & Full-Stack Developer',
    date: 'Apr 2026',
    category: 'Frontend',
    tags: ['Frontend'],
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
    id: 'ip-sakti-sahayak',
    title: 'IP-SAKTI Sahayak',
    subtitle: 'Multilingual RAG AI Assistant for Intellectual Property & Patents (SIH)',
    role: 'Lead AI/RAG Engineer (SIH Finalist)',
    date: '2024 – 2025',
    category: 'Generative AI',
    tags: ['Generative AI', 'AI / Machine Learning'],
    featured: false,
    problemStatement:
      'Ayurveda researchers and traditional medicine practitioners face complex, fragmented intellectual property statutes, leading to legal hurdles, patent rejections, and accidental infringement of Traditional Knowledge.',
    solution:
      'Architected an evidence-grounded, multilingual Retrieval-Augmented Generation (RAG) assistant for Smart India Hackathon PS26045. Integrated dense vector retrieval, BM25 keyword search, and reranking to ground AI responses directly in verified patent databases (IPO, TKDL, WIPO) with verifiable citations.',
    frontendStack: ['React 18 / Vite UI', 'Multilingual Speech-to-Text Input', 'Bilingual Audio Response'],
    backendStack: ['Python', 'LangChain', 'FastAPI', 'Sentence Transformers', 'Groq (Llama-3)'],
    databaseStack: ['ChromaDB Vector Store', 'Patent & Legal Knowledge Base'],
    keyCapabilities: [
      'Evidence-grounded RAG sourcing legal guidance exclusively from official AYUSH, IPO, and WIPO databases',
      'Hybrid dense-sparse retrieval combining vector embeddings with BM25 keyword matching for exact statute clauses',
      'Strict hallucination prevention protocol with safe abstention when authoritative evidence confidence is low',
      'Direct source citation attribution linking every recommendation to official gazette notices and patent acts',
      'Multilingual query processing supporting Indian regional languages and conversational voice interaction',
    ],
    architectureSummary:
      'Dual-stage RAG architecture: Multilingual user queries are embedded via Sentence Transformers, queried against ChromaDB collections and BM25 indices, reranked by cross-encoders, and synthesized with strict citation grounding.',
    githubUrl: 'https://github.com/suresh4330/IP-SAKTI-Sahayak',
    challenges: [
      {
        title: 'Eliminating legal hallucinations on sensitive patent queries',
        description:
          'Configured strict semantic guardrails and verification filters that enforce source attribution and trigger safe abstention when confidence drops below 85%.',
      },
    ],
    learnings: [
      'Architecting production RAG systems with hybrid retrieval and cross-encoder rerankers.',
      'Building domain-specific AI assistants with strict regulatory and legal fidelity.',
    ],
  },
  {
    id: 'mlpathfinder',
    title: 'MLPathfinder',
    subtitle: 'Personalized AI Project Recommendation & Skill-Matching Engine',
    role: 'Machine Learning Engineer',
    date: '2025',
    category: 'AI / Machine Learning',
    tags: ['AI / Machine Learning'],
    featured: false,
    problemStatement:
      'Aspiring data scientists and engineering students struggle to find actionable, portfolio-worthy machine learning projects aligned with their current proficiency level, preferred frameworks, and domain interests.',
    solution:
      'Developed an intelligent recommendation web application leveraging Natural Language Processing (TF-IDF vectorization and cosine similarity) that analyzes user skill profiles and complexity preferences to recommend personalized machine learning projects complete with execution roadmaps.',
    frontendStack: ['Streamlit Web Application', 'Interactive Metric Sliders', 'Custom UI Theming'],
    backendStack: ['Python', 'scikit-learn', 'TF-IDF Vectorizer', 'Cosine Similarity', 'NLP Tokenizer'],
    databaseStack: ['Curated Project Knowledge Dataset', 'Pandas DataFrame Store'],
    keyCapabilities: [
      'NLP vectorization matching user skills against a curated corpus of verified machine learning projects',
      'TF-IDF and cosine similarity scoring providing transparent percentage-based compatibility metrics',
      'Dynamic complexity filtering (Beginner, Intermediate, Advanced) adjusting recommendation roadmaps',
      'Structured technical roadmaps outlining recommended datasets, architecture patterns, and evaluation metrics',
      'Responsive Streamlit dashboard with real-time reactive parameter tuning',
    ],
    architectureSummary:
      'Content-based NLP recommendation pipeline: User skill vectors are vectorized via TF-IDF matrices, ranked against project descriptor embeddings via cosine distance, and delivered through an interactive Streamlit UI.',
    githubUrl: 'https://github.com/suresh4330/MLPathfinder',
    challenges: [
      {
        title: 'Preventing skill mismatches with compound technical terms',
        description:
          'Engineered an n-gram tokenization strategy (unigrams and bigrams) in scikit-learn to preserve nuances in specialized phrases like "computer vision" and "deep learning".',
      },
    ],
    learnings: [
      'Building vector similarity recommendation engines using scikit-learn NLP pipelines.',
      'Rapid deployment of interactive data tools using Streamlit and Python.',
    ],
  },
  {
    id: 'movie-recommendation',
    title: 'Movie Recommendation System',
    subtitle: 'Content-Based & Collaborative Machine Learning Recommender',
    role: 'Machine Learning Engineer',
    date: '2025',
    category: 'AI / Machine Learning',
    tags: ['AI / Machine Learning'],
    featured: false,
    problemStatement:
      'Film discovery platforms often rely on rudimentary popularity metrics that fail to capture nuanced viewer taste across complex narrative themes, directorial styles, and cast ensembles.',
    solution:
      'Engineered a high-performance movie recommendation platform processing over 5,000 films. Employs natural language processing, metadata vectorization, and cosine similarity matrices, coupled with the external TMDB API to hydrate real-time film artwork and metadata.',
    frontendStack: ['Streamlit UI', 'Dynamic Poster Carousel', 'Live Search Autocomplete'],
    backendStack: ['Python', 'scikit-learn', 'Cosine Similarity', 'NumPy', 'Pandas', 'TMDB API Client'],
    databaseStack: ['TMDB 5000 Movies Dataset', 'Serialized Similarity PKL Matrix'],
    keyCapabilities: [
      'Content-based similarity engine indexing 5,000+ films across aggregated narrative metadata tags',
      'High-speed cosine similarity lookup returning top-10 recommended movies in sub-10ms',
      'Real-time TMDB API integration hydrating high-resolution movie posters and trailer links',
      'Multi-feature metadata extraction parsing director, cast, keywords, and plot synopses',
      'Interactive Streamlit user interface with movie autocomplete and visual card displays',
    ],
    architectureSummary:
      'Vectorized recommendation pipeline: Film metadata attributes are consolidated into high-dimensional sparse vectors, transformed via CountVectorizer, and indexed into a precomputed similarity matrix for real-time recommendations.',
    githubUrl: 'https://github.com/suresh4330/Movie-Recommendation-System',
    challenges: [
      {
        title: 'Managing memory footprint of high-dimensional similarity matrices',
        description:
          'Compressed matrix representations into float32 sparse formats and serialized checkpoints with pickle, reducing memory consumption by over 50%.',
      },
    ],
    learnings: [
      'Text feature extraction and high-dimensional vector similarity algorithms.',
      'Bridging machine learning offline models with live third-party REST APIs.',
    ],
  },
  {
    id: 'notification-router',
    title: 'Smart Notification Router',
    subtitle: 'Intelligent Message Classification, NLP Priority Routing & Asynchronous Queue',
    role: 'Backend & AI Engineer',
    date: '2025 – 2026',
    category: 'DevOps',
    tags: ['DevOps', 'Backend', 'AI / Machine Learning'],
    featured: false,
    problemStatement:
      'High-volume notification infrastructures struggle with message bottlenecks, alert fatigue, and priority inversion when critical system notifications are delayed by marketing bursts.',
    solution:
      'Architected an asynchronous event-driven notification routing microservice. Implements an NLP intent classifier to categorize inbound message urgency, dynamic rate limiting, and prioritized dispatch across SMS, Email, and Webhook channels using Celery and Redis.',
    frontendStack: ['Prometheus Grafana Metrics', 'FastAPI OpenAPI Interactive Docs'],
    backendStack: ['Python', 'FastAPI', 'spaCy / NLP Classifier', 'Celery Async Workers', 'Redis Message Broker'],
    databaseStack: ['Redis In-Memory Priority Queue', 'PostgreSQL Audit Logs', 'Docker Container'],
    keyCapabilities: [
      'NLP classification pipeline categorizing inbound message payloads into priority tiers (Critical, Normal, Digest)',
      'Asynchronous distributed task queues powered by Celery and Redis preventing system backpressure',
      'Multi-channel dynamic dispatch adapters for Webhooks, SMS, Email, and Push notifications',
      'Dead-letter queues, automatic exponential backoff retries, and idempotency key enforcement',
      'Containerized deployment with Docker and Prometheus instrumentation for throughput telemetry',
    ],
    architectureSummary:
      'Event-driven microservice: FastAPI gateway receives message payloads, evaluates NLP urgency scores, enqueues tasks into Redis priority queues, and orchestrates distributed Celery workers for dispatch.',
    githubUrl: 'https://github.com/suresh4330/notification-router',
    challenges: [
      {
        title: 'Maintaining sub-15ms NLP classification under heavy message traffic',
        description:
          'Utilized distilled transformer embeddings with batched evaluation, ensuring throughput exceeding 500 messages/sec per worker node.',
      },
    ],
    learnings: [
      'Distributed message queuing architectures with Redis and Celery.',
      'Deploying NLP classification models into low-latency backend pipelines.',
    ],
  },
  {
    id: 'computer-vision-dl',
    title: 'Deep Learning Computer Vision Suite',
    subtitle: 'CNN Architecture, Transfer Learning & Visual Feature Extraction',
    role: 'Deep Learning Engineer',
    date: '2025',
    category: 'Deep Learning',
    tags: ['Deep Learning', 'AI / Machine Learning'],
    featured: false,
    problemStatement:
      'Training computer vision models from scratch on specialized visual datasets requires enormous labeled datasets, high computational budgets, and frequently suffers from poor generalization.',
    solution:
      'Engineered a robust computer vision classification pipeline in PyTorch leveraging custom Convolutional Neural Networks and transfer learning with pretrained ResNet architectures. Implemented extensive data augmentation, learning rate warmups, and Grad-CAM activation mapping.',
    frontendStack: ['Matplotlib Feature Maps', 'Grad-CAM Overlays', 'CLI Evaluation Suite'],
    backendStack: ['PyTorch', 'Torchvision', 'OpenCV', 'Python', 'CUDA GPU Acceleration'],
    databaseStack: ['Trained Model Checkpoints (.pth)', 'Augmented Dataset Tensors'],
    keyCapabilities: [
      'Custom multi-layer CNN architecture with batch normalization, max-pooling, and dropout regularization',
      'Transfer learning fine-tuning on pretrained ResNet backbones achieving >94% validation accuracy',
      'Comprehensive data augmentation pipeline including random affine transforms, color jitter, and cutouts',
      'Grad-CAM visual attribution heatmaps highlighting model focus areas for explainable predictions',
      'CUDA-accelerated batch training loops with learning rate scheduling and automated checkpointing',
    ],
    architectureSummary:
      'Deep learning pipeline: Image data streams through torchvision augmentation transforms, feeds into deep CNN/ResNet feature backbones, and outputs class probability distributions optimized via cross-entropy loss.',
    githubUrl: 'https://github.com/suresh4330/deep-learning-computer-vision',
    challenges: [
      {
        title: 'Mitigating overfitting on constrained training image distributions',
        description:
          'Introduced aggressive data augmentation transforms, dropout layers (0.4), and early stopping callbacks monitoring validation loss.',
      },
    ],
    learnings: [
      'Transfer learning fine-tuning on deep convolutional backbones.',
      'Model interpretability and visual feature mapping with Grad-CAM.',
    ],
  },
  {
    id: 'fittracker',
    title: 'FitTracker',
    subtitle: 'Real-Time Health Telemetry & Physiological Activity Analytics Platform',
    role: 'Full-Stack & Systems Developer',
    date: 'Jan 2026',
    category: 'Full Stack',
    tags: ['Full Stack', 'Backend', 'DevOps'],
    featured: false,
    problemStatement:
      'Real-time fitness tracking applications often struggle with WebSocket packet drops, high frontend re-render overhead, and sluggish time-series charting under sustained sensor streaming.',
    solution:
      'Architected an interactive health telemetry dashboard pairing a React 19 frontend with a high-throughput Node.js backend. Integrated bi-directional Socket.io WebSocket channels feeding streaming biometric metrics into dynamic Recharts time-series graphs with zero frame drops.',
    frontendStack: ['React 19', 'JavaScript (ES6+)', 'Tailwind CSS', 'Recharts', 'Framer Motion'],
    backendStack: ['Node.js', 'Express.js', 'Socket.io WebSockets', 'RESTful APIs'],
    databaseStack: ['In-Memory Telemetry Buffer', 'MongoDB Atlas'],
    keyCapabilities: [
      'Real-time bi-directional telemetry synchronization via Socket.io WebSockets with sub-50ms latency',
      'Dynamic time-series biometric charts rendered via Recharts with smooth Framer Motion transitions',
      'Responsive mobile-first dashboard engineered with React 19 concurrent rendering features',
      'Sub-1.2s First Contentful Paint achieved via code-splitting and asset preloading',
      'Physiological telemetry metrics monitoring including heart rate zones, active calories, and pacing',
    ],
    architectureSummary:
      'Real-time event-driven architecture: Sensor telemetry streams over persistent WebSocket channels to Node.js servers, broadcasting continuous updates to React clients rendering optimized SVG time-series charts.',
    githubUrl: 'https://github.com/suresh4330/FitTracker',
    challenges: [
      {
        title: 'Preventing browser frame drops during high-frequency WebSocket telemetry streams',
        description:
          'Throttled incoming WebSocket state updates with an in-memory ring buffer, batching chart re-renders to match 60fps display refresh rates.',
      },
    ],
    learnings: [
      'Building resilient bi-directional real-time communication with Socket.io.',
      'Optimizing high-frequency SVG charting performance in React 19.',
    ],
  },
  {
    id: 'movie-booking',
    title: 'Movie Booking System',
    subtitle: 'Cinema Discovery & Interactive Ticket Reservation Portal',
    role: 'Frontend Engineer',
    date: '2025',
    category: 'Frontend',
    tags: ['Frontend'],
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
    tags: ['Algorithms'],
    featured: false,
    problemStatement:
      'Finding the shortest path across road network topologies with standard adjacency matrix approaches causes quadratic $O(V^2)$ latency, making large-scale path computation inefficient.',
    solution:
      'Implemented an optimized shortest-path calculation engine in C++ leveraging Dijkstra’s algorithm built upon adjacency lists and binary min-heap priority queues, reducing search complexity to $O((V + E) \\log V)$ with custom edge weights.',
    frontendStack: ['Interactive Graph Visualizer (CLI / Web Demo)'],
    backendStack: ['C++', 'Graph Data Structures', 'Priority Queues'],
    databaseStack: ['In-Memory Weighted Graph Representation'],
    keyCapabilities: [
      'Dijkstra shortest-path algorithm implementation using adjacency lists and binary min-heap priority queues',
      'Asymptotic complexity optimized from $O(V^2)$ down to $O((V + E) \\log V)$',
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
