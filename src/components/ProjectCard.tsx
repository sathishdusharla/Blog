import React from 'react';
import { ExternalLink, Star, Cpu } from 'lucide-react';
import { Github } from './BrandIcons';
import type { Project } from '../data/projects';
import './ProjectCard.css';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const getGlowClass = (type: string) => {
    switch (type) {
      case 'cyan': return 'glow-cyan-hover';
      case 'purple': return 'glow-purple-hover';
      case 'orange': return 'glow-orange-hover';
      default: return '';
    }
  };

  return (
    <article 
      className={`project-card glass-card ${getGlowClass(project.glowType)}`}
      onClick={() => onSelect(project)}
    >
      <div className="project-header">
        <span className="project-badge" style={{ borderColor: `var(--color-${project.glowType === 'cyan' ? 'secondary' : project.glowType === 'purple' ? 'primary' : 'accent'})` }}>
          {project.category}
        </span>
        <div className="project-actions">
          {project.github && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noreferrer" 
              className="proj-link-btn"
              onClick={(e) => e.stopPropagation()}
              aria-label="GitHub Repository"
            >
              <Github size={16} />
            </a>
          )}
          {project.demo && (
            <a 
              href={project.demo} 
              target="_blank" 
              rel="noreferrer" 
              className="proj-link-btn"
              onClick={(e) => e.stopPropagation()}
              aria-label="Live Demo"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      <div className="project-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
      </div>

      <div className="project-footer">
        <div className="project-tech-tags">
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} className="tech-tag">{t}</span>
          ))}
          {project.tech.length > 3 && <span className="tech-tag-more">+{project.tech.length - 3}</span>}
        </div>

        <div className="project-stats-indicator">
          {project.stats.stars && (
            <span className="stat-indicator-item" aria-label={`${project.stats.stars} Github stars`}>
              <Star size={14} className="star-icon" />
              {project.stats.stars}
            </span>
          )}
          {project.stats.fps && (
            <span className="stat-indicator-item" aria-label={`${project.stats.fps} Frames per Second`}>
              <Cpu size={14} className="cpu-icon" />
              {project.stats.fps}fps
            </span>
          )}
        </div>
      </div>
    </article>
  );
};
export default ProjectCard;
