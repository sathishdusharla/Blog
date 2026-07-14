export interface Achievement {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  type: 'milestone' | 'award' | 'certification';
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
}

export const achievements: Achievement[] = [
  {
    id: 'lead-dev',
    year: '2025',
    title: 'Lead Software Architect',
    subtitle: 'NexaTech Solutions',
    description: 'Designed a micro-frontend framework serving over 5 million daily active users, utilizing Rust, WebAssembly, and React to reduce load times by 40%.',
    type: 'milestone'
  },
  {
    id: 'hack-win',
    year: '2024',
    title: '1st Place Winner - CyberGraphics Hackathon',
    subtitle: 'Global Tech Initiative',
    description: 'Built a real-time fluid simulation engine using WebGL and custom shaders in 48 hours, winning the best technical solution award.',
    type: 'award'
  },
  {
    id: 'grad',
    year: '2022',
    title: 'M.S. in Computer Science',
    subtitle: 'Stanford University',
    description: 'Specialized in Computer Graphics and Distributed Systems. Graduated with Honors. Thesis: Parallel Computing on Web Browsers.',
    type: 'milestone'
  },
  {
    id: 'aws-cert',
    year: '2023',
    title: 'AWS Certified Solutions Architect',
    subtitle: 'Amazon Web Services',
    description: 'Professional validation of cloud architecture designing skills, focusing on high availability, security, and performance optimization.',
    type: 'certification'
  }
];

export const stats: Stat[] = [
  { id: 'projects', label: 'Projects Completed', value: 32 },
  { id: 'commits', label: 'Github Commits (YTD)', value: 1420 },
  { id: 'coffee', label: 'Liters of Coffee', value: 450 },
  { id: 'fps', label: 'Max Render Framerate', value: 120, suffix: ' FPS' }
];
