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
    id: 'innoquest-convenor',
    year: '2025',
    title: 'Student Convenor',
    subtitle: 'INNOQUEST #4 National Innovation Hackathon',
    description: 'Organized a national innovation hackathon with 170 teams and 579 participants in collaboration with Microsoft, Azure Developer Community, Reskilll, and IEEE Women in Engineering.',
    type: 'milestone'
  },
  {
    id: 'innoquest-winner',
    year: '2024',
    title: 'Winner - Microsoft + Reskill InnoQuest Hackathon',
    subtitle: 'Anurag University & Reskilll',
    description: 'Won the first place award at the Microsoft + Reskill InnoQuest Hackathon for developing NavSight, an innovative AI-powered indoor navigation solution for visually impaired individuals.',
    type: 'award'
  },
  {
    id: 'blockchain-vp',
    year: '2024',
    title: 'Vice President',
    subtitle: 'Blockchain Club, Anurag University',
    description: 'Conducted advanced technical workshops and smart contract seminars for over 200+ students.',
    type: 'milestone'
  },
  {
    id: 'hackathon-competitor',
    year: '2023-2025',
    title: 'National Hackathon Competitor',
    subtitle: '15+ Events',
    description: 'Participated in 15+ national-level hackathons, engineering solutions spanning blockchain, IoT, and deep learning.',
    type: 'certification'
  }
];

export const stats: Stat[] = [
  { id: 'hackathons', label: 'Hackathons Attended', value: 15 },
  { id: 'participants', label: 'Participants Convened', value: 579 },
  { id: 'students', label: 'Students Mentored', value: 200 },
  { id: 'images', label: 'NIH images trained', value: 27560 }
];
