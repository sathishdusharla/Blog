export interface Project {
  id: string;
  title: string;
  category: 'Graphics' | 'Systems' | 'WebAssembly' | 'AI' | 'Webdev';
  description: string;
  longDescription: string;
  tech: string[];
  glowType: 'cyan' | 'purple' | 'orange';
  github?: string;
  demo?: string;
  stats: {
    stars?: number;
    accuracy?: string;
    cost?: string;
    achievement?: string;
  };
}

export const projects: Project[] = [
  {
    id: 'paradetect-ai',
    title: 'ParaDetect AI',
    category: 'AI',
    description: 'A hybrid Deep Learning and Multimodal AI clinical platform automating malaria diagnosis from blood smear microscopy images.',
    longDescription: 'ParaDetect AI is a full-stack clinical decision support platform that automates malaria diagnosis from blood smear microscopy images. It features a hybrid architecture combining a custom CNN trained on 27,560+ NIH malaria cell images (achieving over 95% validation accuracy with browser-based WebGL-accelerated inference in 400-600ms via TensorFlow.js) with Google Gemini 2.5 Flash for parasite detection, species identification, lifecycle stage recognition, parasitemia estimation, severity assessment, and explainable clinical interpretation. It generates WHO-aligned diagnostic reports, lab risk predictions, and downloadable PDFs, backed by a scalable Supabase patient records database.',
    tech: ['React', 'TypeScript', 'TensorFlow.js', 'Google Gemini 2.5 Flash', 'Supabase', 'WebGL'],
    glowType: 'cyan',
    github: 'https://github.com/paradetectai',
    demo: 'https://paradetectai.netlify.app',
    stats: {
      accuracy: '95%+'
    }
  },
  {
    id: 'blockvotex',
    title: 'BlockvoteX',
    category: 'Systems',
    description: 'A decentralized e-voting platform leveraging Ethereum blockchain and Solidity smart contracts for secure digital elections.',
    longDescription: 'BlockvoteX is a decentralized full-stack e-voting platform built on Ethereum. It utilizes Solidity smart contracts to secure election setup, voter verification, one person-one vote enforcement, automated tallying, and immutable on-chain record keeping. Integrated with React, Node.js, Express, MongoDB, and Web3.js, it supports remote voting with MetaMask wallet authentication, role-based admin controls, and real-time result dashboards providing transparent, tamper-proof auditable elections.',
    tech: ['React', 'Node.js', 'Solidity', 'Ethereum', 'Web3.js', 'MongoDB', 'Ganache'],
    glowType: 'purple',
    github: 'https://github.com/blockvotex',
    demo: 'https://blockvotex.netlify.app',
    stats: {
      stars: 124
    }
  },
  {
    id: 'ejihva',
    title: 'eJihva',
    category: 'AI',
    description: 'An AI-powered Electronic Tongue automating Ayurvedic Dravya identification using chemical sensor arrays and Machine Learning.',
    longDescription: 'eJihva is an IoT and Machine Learning solution that automates Ayurvedic Dravya identification. It links pH, electrical conductivity (EC), and TDS sensors with an Arduino UNO to generate unique chemical signatures. Using Scikit-learn, the system pre-processes features and performs confidence-based classification. A custom Python desktop app provides real-time sensor streams and automated dataset builders, creating a portable, low-cost alternative to complex laboratory testing.',
    tech: ['Python', 'Arduino UNO', 'Scikit-learn', 'IoT', 'Machine Learning'],
    glowType: 'orange',
    stats: {
      cost: '˜6K INR'
    }
  },
  {
    id: 'navsight',
    title: 'NavSight',
    category: 'AI',
    description: 'An AI-powered indoor navigation system for visually impaired individuals utilizing computer vision and voice commands.',
    longDescription: 'NavSight is an AI-powered indoor navigation system for visually impaired individuals. It integrates YOLOv3, OpenCV, and QR code detection to identify obstacles, location markings, and paths, delivering voice-guided directions to users. The platform supports an offline-first workflow, emergency alerts, and voice authentication. NavSight won the Microsoft + Reskill InnoQuest Hackathon for its innovative assistance design.',
    tech: ['Python', 'Flask', 'Django', 'YOLOv3', 'OpenCV', 'MySQL'],
    glowType: 'cyan',
    stats: {
      achievement: 'Hackathon Winner'
    }
  }
];
