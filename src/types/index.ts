export interface Project {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  date: string;
  category: 'Full Stack' | 'Frontend' | 'Backend' | 'Algorithms';
  featured: boolean;
  problemStatement: string;
  solution: string;
  frontendStack: string[];
  backendStack: string[];
  databaseStack?: string[];
  keyCapabilities: string[];
  architectureSummary: string;
  githubUrl: string;
  liveUrl?: string;
  imageUrl?: string;
  challenges: {
    title: string;
    description: string;
  }[];
  learnings: string[];
}

export interface SkillItem {
  name: string;
  context: string;
  category: 'Frontend' | 'Backend' | 'Languages' | 'Databases' | 'Tools' | 'Fundamentals';
}

export interface EducationItem {
  institution: string;
  location: string;
  degree: string;
  specialization?: string;
  score: string;
  period: string;
  highlights: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  verificationTopic: string;
}

export interface MilestoneItem {
  title: string;
  organization: string;
  type: 'Hackathon' | 'Technical Training' | 'Academic Milestone';
  date: string;
  summary: string;
  outcomes: string[];
  verifiedTag: string;
}

export interface WorkflowStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  icon: string;
}
