import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, Star, Terminal } from 'lucide-react';
import { Github } from './BrandIcons';
import type { Project } from '../data/projects';
import './ProjectModal.css';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && project) {
      if (!dialog.open) {
        dialog.showModal();
        document.body.style.overflow = 'hidden'; // Prevent scrolling main body
      }
    } else {
      if (dialog.open) {
        dialog.close();
        document.body.style.overflow = 'unset';
      }
    }
  }, [isOpen, project]);

  // Handle native light-dismiss clicking backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    
    const rect = dialog.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX && e.clientX <= rect.left + rect.width
    );
    
    if (!isInDialog) {
      onClose();
    }
  };

  if (!project) return null;

  const accentColor = `var(--color-${project.glowType === 'cyan' ? 'secondary' : project.glowType === 'purple' ? 'primary' : 'accent'})`;

  return (
    <dialog
      ref={dialogRef}
      className="project-modal"
      onClick={handleBackdropClick}
      onClose={onClose}
    >
      <div className="modal-content-wrap">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
          <X size={20} />
        </button>

        <div className="modal-header">
          <span className="modal-badge" style={{ borderColor: accentColor, color: accentColor }}>
            {project.category}
          </span>
          <h2 className="modal-title">{project.title}</h2>
          <div className="modal-stats-row">
            {project.stats.stars && (
              <span className="modal-stat-item">
                <Star size={16} className="star-icon" />
                <strong>{project.stats.stars}</strong> stars on GitHub
              </span>
            )}
            {project.stats.lines && (
              <span className="modal-stat-item">
                <Terminal size={16} className="terminal-icon" />
                <strong>{project.stats.lines.toLocaleString()}</strong> lines of code
              </span>
            )}
            {project.stats.accuracy && (
              <span className="modal-stat-item">
                <strong>{project.stats.accuracy}</strong> model accuracy
              </span>
            )}
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-main-desc">
            <h3>Architectural Overview</h3>
            <p>{project.longDescription}</p>
          </div>

          <div className="modal-tech-section">
            <h3>Engine Technology Stack</h3>
            <div className="modal-tech-grid">
              {project.tech.map((t) => (
                <div key={t} className="modal-tech-card">
                  <span className="tech-dot" style={{ background: accentColor }} />
                  <span className="tech-name">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Graphical Blueprint Simulator representation */}
          <div className="modal-blueprint-graphic">
            <div className="blueprint-header">
              <span className="blueprint-dot red" />
              <span className="blueprint-dot yellow" />
              <span className="blueprint-dot green" />
              <span className="blueprint-title">system_architecture.svg</span>
            </div>
            <div className="blueprint-diagram" style={{ '--blueprint-accent': accentColor } as React.CSSProperties}>
              <div className="diagram-node node-input">
                <span>Core Input</span>
              </div>
              <div className="diagram-vector" />
              <div className="diagram-node node-wasm" style={{ borderColor: accentColor }}>
                <span>{project.category} Engine</span>
                <span className="sub-tag">60 FPS</span>
              </div>
              <div className="diagram-vector" />
              <div className="diagram-node node-output">
                <span>GPU Render</span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="modal-action-btn github-btn">
              <Github size={18} />
              <span>Inspect Source Repository</span>
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="modal-action-btn demo-btn" style={{ background: accentColor }}>
              <ExternalLink size={18} />
              <span>Launch Live Simulator</span>
            </a>
          )}
        </div>
      </div>
    </dialog>
  );
};
export default ProjectModal;
