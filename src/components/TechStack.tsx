import React, { useState } from 'react';
import { Cpu, Terminal, Compass, Layers, Palette, ShieldAlert, CpuIcon } from 'lucide-react';
import './TechStack.css';

interface Skill {
  name: string;
  category: 'Systems' | 'Frontend' | 'Graphics' | 'AI' | 'DevOps';
  level: string;
  experience: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

export const TechStack: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const skills: Skill[] = [
    {
      name: 'Rust',
      category: 'Systems',
      level: 'Advanced',
      experience: '3 Years',
      icon: <Cpu size={24} />,
      description: 'Used for compiling secure, high-performance algorithms to WebAssembly, bare-metal operating system development (ChronoKernel), and multi-threaded calculations.',
      color: 'var(--color-accent)'
    },
    {
      name: 'TypeScript',
      category: 'Frontend',
      level: 'Expert',
      experience: '5 Years',
      icon: <Terminal size={24} />,
      description: 'Main programming language for complex React SPA architectures, structural type-checking, node-based visual editors, and Web API bindings.',
      color: 'var(--color-secondary)'
    },
    {
      name: 'WebGL / WebGPU',
      category: 'Graphics',
      level: 'Advanced',
      experience: '3 Years',
      icon: <Palette size={24} />,
      description: 'Authoring custom GLSL/WGSL fragment and vertex shaders, buffer creation, rendering pipelines, and building visual graphic simulators running at 60+ FPS.',
      color: 'var(--color-primary)'
    },
    {
      name: 'React',
      category: 'Frontend',
      level: 'Expert',
      experience: '5 Years',
      icon: <Layers size={24} />,
      description: 'Architecting modular web interfaces with custom state hooks, context providers, declarative routing, and high-performance component state management.',
      color: 'var(--color-secondary)'
    },
    {
      name: 'WebAssembly',
      category: 'Systems',
      level: 'Advanced',
      experience: '3 Years',
      icon: <Compass size={24} />,
      description: 'Optimizing web compute speeds by offloading parallel workloads (like raytracing) to sandboxed Rust modules via multithreaded SharedArrayBuffers.',
      color: 'var(--color-primary)'
    },
    {
      name: 'Docker',
      category: 'DevOps',
      level: 'Intermediate',
      experience: '2 Years',
      icon: <ShieldAlert size={24} />,
      description: 'Containerizing local build environments, compiling cross-platform toolchains, and automating testing frameworks within CI/CD pipelines.',
      color: 'var(--color-accent)'
    },
    {
      name: 'TensorFlow.js',
      category: 'AI',
      level: 'Intermediate',
      experience: '2 Years',
      icon: <CpuIcon size={24} />,
      description: 'Developing client-side neural networks for sound synthesis (NeuroSynth), pattern matching, and running localized deep learning inference directly on GPUs.',
      color: 'var(--color-secondary)'
    }
  ];

  return (
    <section className="tech-stack-section">
      <div className="section-header">
        <h2 className="text-gradient-cyan-purple">Technical Core capabilities</h2>
        <p className="section-subtitle">
          Hover over the honeycomb network to inspect specific proficiencies and implementation use cases.
        </p>
      </div>

      <div className="tech-stack-container">
        <div className="honeycomb-grid" aria-label="Honeycomb Skill Grid">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={`honeycomb-cell cell-${index + 1}`}
              onMouseEnter={() => setSelectedSkill(skill)}
              onMouseLeave={() => setSelectedSkill(null)}
              onClick={() => setSelectedSkill(skill)}
              style={{ '--accent-color': skill.color } as React.CSSProperties}
            >
              <div className="honeycomb-content">
                <div className="skill-icon-wrap">{skill.icon}</div>
                <span className="skill-cell-name">{skill.name}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="skill-detail-panel glass-card">
          {selectedSkill ? (
            <div className="skill-detail-active animate-fade-in" style={{ borderColor: selectedSkill.color }}>
              <div className="detail-header">
                <div className="detail-icon" style={{ color: selectedSkill.color }}>
                  {selectedSkill.icon}
                </div>
                <div>
                  <h3 className="detail-name">{selectedSkill.name}</h3>
                  <span className="detail-category" style={{ background: `rgba(255, 255, 255, 0.05)`, border: `1px solid ${selectedSkill.color}` }}>
                    {selectedSkill.category}
                  </span>
                </div>
              </div>
              <div className="detail-meta">
                <p><strong>Proficiency:</strong> <span style={{ color: selectedSkill.color }}>{selectedSkill.level}</span></p>
                <p><strong>Experience:</strong> {selectedSkill.experience}</p>
              </div>
              <p className="detail-description">{selectedSkill.description}</p>
            </div>
          ) : (
            <div className="skill-detail-placeholder flex-center">
              <div className="placeholder-text-wrap">
                <Cpu size={32} className="pulse-icon" />
                <p>Hover or tap a honeycomb node to load capability specifications...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default TechStack;
