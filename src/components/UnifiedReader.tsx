import React, { useEffect, useState } from 'react';
import { ArrowLeft, Clock, Calendar, ExternalLink, Award } from 'lucide-react';
import { Github } from './BrandIcons';
import './UnifiedReader.css'; // Reuse the reader styles

interface UnifiedReaderProps {
  item: {
    type: 'article' | 'project' | 'achievement';
    data: any;
  };
  onBack: () => void;
}

export const UnifiedReader: React.FC<UnifiedReaderProps> = ({ item, onBack }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const preBlocks = document.querySelectorAll('.article-reader-body pre');
    preBlocks.forEach((pre: any) => {
      if (pre.querySelector('.copy-code-btn')) return;
      
      const btn = document.createElement('button');
      btn.className = 'copy-code-btn';
      btn.textContent = 'Copy';
      
      btn.addEventListener('click', () => {
        const codeText = pre.querySelector('code')?.textContent || '';
        navigator.clipboard.writeText(codeText).then(() => {
          btn.textContent = 'Copied!';
          btn.style.color = 'var(--color-primary)';
          setTimeout(() => {
            btn.textContent = 'Copy';
            btn.style.color = '';
          }, 2000);
        });
      });
      
      pre.style.position = 'relative';
      pre.appendChild(btn);
    });
  }, [item]);

  const { type, data } = item;

  return (
    <article className="article-reader-container animate-fade-in">
      <div 
        className="reading-progress-bar" 
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <button className="back-articles-btn flex-center" onClick={onBack}>
        <ArrowLeft size={16} />
        <span>Return to Logs</span>
      </button>

      {type === 'article' && (
        <>
          <header className="article-reader-header">
            <div className="article-meta-row">
              <span className="article-category-badge badge-research">Research Log</span>
              <div className="meta-items">
                <span className="meta-item-span">
                  <Calendar size={14} />
                  {data.date}
                </span>
                <span className="meta-item-span">
                  <Clock size={14} />
                  {data.readTime}
                </span>
              </div>
            </div>

            <h1 className="article-reader-title">{data.title}</h1>
            
            <div className="article-tags-wrap">
              {data.tags.map((tag: string) => (
                <span key={tag} className="article-reader-tag">
                  #{tag}
                </span>
              ))}
            </div>
          </header>

          <section 
            className="article-reader-body"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </>
      )}

      {type === 'project' && (
        <>
          <header className="article-reader-header">
            <div className="article-meta-row">
              <span className="article-category-badge badge-project">Project Repository</span>
              <div className="meta-items">
                <span className="meta-item-span">
                  Domain: {data.category}
                </span>
                <span className="meta-item-span">
                  Stars: ⭐ {data.stats.stars || 0}
                </span>
              </div>
            </div>

            <h1 className="article-reader-title">{data.title}</h1>
            
            <div className="article-tags-wrap">
              {data.tech.map((t: string) => (
                <span key={t} className="article-reader-tag">
                  #{t}
                </span>
              ))}
            </div>
          </header>

          <section className="article-reader-body">
            <h3>Overview</h3>
            <p>{data.description}</p>
            
            <h3>Technical Architecture & Design Decisions</h3>
            <p>{data.longDescription}</p>

            {data.stats.fps && (
              <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(230, 0, 0, 0.04)', border: '1px dashed var(--color-primary)', borderRadius: '8px' }}>
                <strong style={{ color: 'var(--color-primary)' }}>Performance Metric:</strong> Real-time compilation and canvas rendering stable at <strong>{data.stats.fps} FPS</strong>.
              </div>
            )}
            {data.stats.lines && (
              <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(230, 0, 0, 0.04)', border: '1px dashed var(--color-primary)', borderRadius: '8px' }}>
                <strong style={{ color: 'var(--color-primary)' }}>Scale Metric:</strong> Optimized lightweight system codebase containing <strong>{data.stats.lines.toLocaleString()} lines</strong> of memory-safe code.
              </div>
            )}

            <div className="project-links-row" style={{ display: 'flex', gap: '16px', marginTop: '40px', flexWrap: 'wrap' }}>
              {data.github && (
                <a 
                  href={data.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="home-option-btn active flex-center"
                  style={{ gap: '8px', textDecoration: 'none', display: 'inline-flex' }}
                >
                  <Github size={16} />
                  <span>Inspect GitHub Repository</span>
                </a>
              )}
              {data.demo && (
                <a 
                  href={data.demo} 
                  className="home-option-btn flex-center"
                  style={{ gap: '8px', textDecoration: 'none', display: 'inline-flex' }}
                >
                  <ExternalLink size={16} />
                  <span>Launch Live Demo</span>
                </a>
              )}
            </div>
          </section>
        </>
      )}

      {type === 'achievement' && (
        <>
          <header className="article-reader-header">
            <div className="article-meta-row">
              <span className="article-category-badge badge-achievement">Engineering Achievement</span>
              <div className="meta-items">
                <span className="meta-item-span">
                  <Award size={14} />
                  {data.type.toUpperCase()}
                </span>
                <span className="meta-item-span">
                  Year: {data.year}
                </span>
              </div>
            </div>

            <h1 className="article-reader-title">{data.title}</h1>
            
            <div className="article-tags-wrap">
              <span className="article-reader-tag">
                #{data.type}
              </span>
              <span className="article-reader-tag">
                #{data.year}
              </span>
            </div>
          </header>

          <section className="article-reader-body">
            <h3>Context & Details</h3>
            <p><strong>Organization / Platform:</strong> {data.subtitle}</p>
            <p><strong>Period:</strong> {data.year}</p>
            
            <h3>Description & Career Impact</h3>
            <p>{data.description}</p>

            <div style={{ marginTop: '40px', padding: '20px', background: 'rgba(242, 201, 76, 0.05)', border: '1px solid rgba(242, 201, 76, 0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Award size={24} style={{ color: '#f2c94c' }} />
              <div>
                <h4 style={{ color: '#f2c94c', margin: 0 }}>Verified Milestone Record</h4>
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>This engineering achievement is logged in the verified SD DEVLOG history archives.</p>
              </div>
            </div>
          </section>
        </>
      )}

      <footer className="article-reader-footer glass-card" style={{ marginTop: '60px' }}>
        <div className="footer-avatar-wrap">
          <div className="avatar-placeholder flex-center">SD</div>
          <div className="avatar-info">
            <h4>Sathish Dusharla</h4>
            <p>Software Engineer & Designer interested in WebGL, Rust systems, and high performance compilations.</p>
          </div>
        </div>
      </footer>
    </article>
  );
};

export default UnifiedReader;
