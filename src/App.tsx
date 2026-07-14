import { useState, useEffect, useRef } from 'react';
import { Terminal as TermIcon, ArrowRight, Mail, Sparkles } from 'lucide-react';
import { Github, Linkedin } from './components/BrandIcons';
import Header from './components/Header';
import Terminal from './components/Terminal';
import TechStack from './components/TechStack';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import Timeline from './components/Timeline';
import TerminalContact from './components/TerminalContact';
import ArticleReader from './components/ArticleReader';
import { projects } from './data/projects';
import type { Project } from './data/projects';
import { articles } from './data/articles';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectFilter, setProjectFilter] = useState<string>('All');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Background Canvas Node Connection Animation (Graphics Designer touch)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    const particleCount = Math.min(Math.round(width / 25), 45); // Adapt to screen width
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1
      });
    }

    const draw = () => {
      // Clear with slight trailing opacity
      ctx.fillStyle = document.documentElement.getAttribute('data-theme') === 'light' 
        ? 'rgba(244, 245, 248, 0.2)' 
        : 'rgba(6, 7, 12, 0.2)';
      ctx.fillRect(0, 0, width, height);

      const colorScheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const connectionColor = colorScheme === 'light' ? '200, 204, 218' : '155, 81, 224';
      const particleColor = colorScheme === 'light' ? 'rgba(138, 63, 252, 0.4)' : 'rgba(0, 242, 254, 0.4)';

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        // Check connections
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${connectionColor}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Filter projects list
  const filteredProjects = projectFilter === 'All' 
    ? projects 
    : projects.filter((p) => p.category === projectFilter || p.tech.includes(projectFilter));

  const renderSection = () => {
    // Article Reader Dynamic Route
    if (activeSection.startsWith('article-')) {
      const artId = activeSection.replace('article-', '');
      const article = articles.find((a) => a.id === artId);
      if (article) {
        return <ArticleReader article={article} onBack={() => setActiveSection('articles')} />;
      }
    }

    switch (activeSection) {
      case 'home':
        return (
          <div className="section-home-wrap">
            {/* Hero Splash Header */}
            <section className="hero-splash-container">
              <div className="hero-text-side">
                <span className="hero-greeting-badge">
                  <Sparkles size={14} className="star-icon-glow" />
                  Engineering Visual Architectures
                </span>
                <h1 className="hero-headline">
                  SD <span className="text-gradient-cyan-purple">DEVLOG</span>
                </h1>
                <p className="hero-subheadline" style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-primary)', borderLeft: '2px solid var(--color-primary)', paddingLeft: '12px', margin: '4px 0 12px' }}>
                  Thoughts that trigger builds, builds that teach lessons.
                </p>
                <p className="hero-lead">
                  Curated by Sathish Dusharla. I write highly optimized system code compiled to WebAssembly/Rust and wrap it in visually stunning, responsive client-side graphical designs.
                </p>
                <div className="hero-button-row">
                  <button className="hero-cta-btn gui text-gradient-cyan-purple" onClick={() => setActiveSection('projects')}>
                    <span>Inspect Projects</span>
                    <ArrowRight size={16} />
                  </button>
                  <button className="hero-cta-btn cli flex-center" onClick={() => setIsTerminalOpen(true)}>
                    <TermIcon size={16} />
                    <span>Launch console</span>
                  </button>
                </div>
              </div>

              {/* Graphical Blueprint Panel */}
              <div className="hero-visual-side glass-card">
                <div className="visual-terminal-mock">
                  <div className="terminal-header">
                    <span className="terminal-dot red" />
                    <span className="terminal-dot yellow" />
                    <span className="terminal-dot green" />
                    <span className="terminal-tab">sathish@devlog:~</span>
                  </div>
                  <pre className="terminal-mock-code">
{`$ rustc --version
rustc 1.80.0-nightly (wasm32-unknown-unknown)

$ make build-all
[1/4] Compiling raytracer.rs... OK
[2/4] Packing wasm-bindgen packages... OK
[3/4] Compiling vertex_shader.glsl... OK
[4/4] Starting local hot-reload devserver...

STATUS: SD_DEVLOG is active and listening.`}
                  </pre>
                </div>
              </div>
            </section>

            {/* Core Tech honeycomb list */}
            <TechStack />

            {/* Featured Blog posts preview */}
            <section className="featured-posts-section">
              <div className="section-header">
                <h2 className="text-gradient-orange">Featured publications</h2>
                <p className="section-subtitle">Read details about micro-architecture optimization, CSS layers, and browser concurrency.</p>
              </div>
              <div className="featured-posts-grid">
                {articles.filter(a => a.featured).map(art => (
                  <article key={art.id} className="featured-post-card glass-card" onClick={() => setActiveSection(`article-${art.id}`)}>
                    <span className="post-card-category">{art.category}</span>
                    <h3 className="post-card-title">{art.title}</h3>
                    <p className="post-card-excerpt">{art.excerpt}</p>
                    <div className="post-card-footer">
                      <span className="post-card-date">{art.date}</span>
                      <span className="read-more-link flex-center">
                        <span>Read Post</span>
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        );

      case 'articles':
        return (
          <div className="articles-page-wrap">
            <div className="section-header">
              <h2 className="text-gradient-cyan-purple">Research & Tech News</h2>
              <p className="section-subtitle">Technical logs compiled for software developers, shader artists, and systems engineers.</p>
            </div>
            
            <div className="articles-grid-container">
              {articles.map((art) => (
                <article key={art.id} className="featured-post-card glass-card" onClick={() => setActiveSection(`article-${art.id}`)}>
                  <span className="post-card-category">{art.category}</span>
                  <h3 className="post-card-title">{art.title}</h3>
                  <p className="post-card-excerpt">{art.excerpt}</p>
                  <div className="post-card-footer">
                    <span className="post-card-date">{art.date}</span>
                    <span className="read-more-link flex-center">
                      <span>Read Post</span>
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="projects-page-wrap">
            <div className="section-header">
              <h2 className="text-gradient-cyan-purple">Interactive portfolio</h2>
              <p className="section-subtitle">Browse through visual simulations, Bare Metal systems, and parallel processor wrappers.</p>
            </div>

            {/* Filter Pills */}
            <div className="projects-filter-bar">
              {['All', 'WebAssembly', 'Graphics', 'Systems', 'AI', 'React'].map((category) => (
                <button
                  key={category}
                  className={`filter-pill-btn ${projectFilter === category ? 'active' : ''}`}
                  onClick={() => setProjectFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="projects-grid">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onSelect={(p) => setSelectedProject(p)} 
                  />
                ))
              ) : (
                <p className="no-projects-text">No active repositories matching the filter.</p>
              )}
            </div>
          </div>
        );

      case 'milestones':
        return <Timeline />;

      case 'contact':
        return <TerminalContact />;

      default:
        return <div>Section not found.</div>;
    }
  };

  return (
    <div className="app-container">
      {/* Background Graphic Node connection Canvas */}
      <canvas ref={canvasRef} className="background-canvas" />
      <div className="grid-pattern" aria-hidden="true" />
      <div className="radial-glow" aria-hidden="true" />

      {/* Main sticky navigation header */}
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        openTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Core main wrapper section */}
      <main className="main-content" id="main-content-area">
        {renderSection()}
      </main>

      {/* Retro/Neon Terminal overlay console */}
      {isTerminalOpen && (
        <div className="terminal-overlay" onClick={() => setIsTerminalOpen(false)}>
          <div className="terminal-modal-wrap" onClick={(e) => e.stopPropagation()}>
            <Terminal 
              onClose={() => setIsTerminalOpen(false)} 
              onNavigate={(sect) => setActiveSection(sect)}
            />
          </div>
        </div>
      )}

      {/* Project details dialog */}
      <ProjectModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />

      {/* Global simple footer */}
      <footer className="global-site-footer">
        <div className="footer-copyright">
          © {new Date().getFullYear()} SD_DEVLOG. Sathish Dusharla.
        </div>
        <div className="footer-social-links">
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
          <a href="mailto:sathish@sddevlog.com" aria-label="Email"><Mail size={18} /></a>
        </div>
      </footer>
    </div>
  );
}

export default App;
