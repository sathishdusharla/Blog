import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Mail, Search } from 'lucide-react';
import { Github, Linkedin } from './components/BrandIcons';
import Header from './components/Header';
import Terminal from './components/Terminal';
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
  const [homeSearchQuery, setHomeSearchQuery] = useState('');
  const [homeSelectedTopic, setHomeSelectedTopic] = useState('All');
  
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
      case 'home': {
        const filteredArticles = articles.filter(art => {
          const matchesTopic = homeSelectedTopic === 'All' || art.category === homeSelectedTopic || art.tags.includes(homeSelectedTopic);
          const matchesSearch = art.title.toLowerCase().includes(homeSearchQuery.toLowerCase()) ||
                                art.excerpt.toLowerCase().includes(homeSearchQuery.toLowerCase()) ||
                                art.tags.some(tag => tag.toLowerCase().includes(homeSearchQuery.toLowerCase()));
          return matchesTopic && matchesSearch;
        });

        return (
          <div className="section-home-wrap">
            {/* Top Brand Header (Typographic visual matching uploaded design) */}
            <header className="home-brand-block flex-center">
              <h1 className="home-title-logo">SD DEVLOG</h1>
              <p className="home-slogan-text">Thoughts that trigger builds, builds that teach lessons.</p>
            </header>

            {/* Options Navigation Buttons */}
            <div className="home-options-bar flex-center">
              <button onClick={() => setActiveSection('projects')} className="home-option-btn">
                Projects
              </button>
              <button onClick={() => setActiveSection('milestones')} className="home-option-btn">
                Achievements
              </button>
              <button onClick={() => setActiveSection('articles')} className="home-option-btn">
                Tech News
              </button>
              <button onClick={() => setActiveSection('contact')} className="home-option-btn">
                Contact
              </button>
              <button onClick={() => setIsTerminalOpen(true)} className="home-option-btn console-btn-opt">
                Developer Console (CLI)
              </button>
            </div>

            {/* Topics Filter & Search Wrapper */}
            <div className="home-filter-block glass-card">
              <div className="home-topics-section">
                <span className="topics-heading">Topics:</span>
                <div className="topics-list-wrap">
                  {['All', 'Graphics', 'CSS', 'WebAssembly', 'Systems'].map((topic) => (
                    <button
                      key={topic}
                      className={`topic-filter-btn ${homeSelectedTopic === topic ? 'active' : ''}`}
                      onClick={() => setHomeSelectedTopic(topic)}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              <div className="home-search-bar">
                <Search size={18} className="search-bar-icon" />
                <input
                  type="text"
                  placeholder="Search articles, topics, or #tags..."
                  value={homeSearchQuery}
                  onChange={(e) => setHomeSearchQuery(e.target.value)}
                  className="home-search-input"
                />
                {homeSearchQuery && (
                  <button onClick={() => setHomeSearchQuery('')} className="search-clear-btn">
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Published Articles List */}
            <section className="home-articles-list-section">
              <div className="section-header">
                <h2 className="text-gradient-cyan-purple">Published Articles</h2>
                <p className="section-subtitle">Read logs detailing systems execution and shader compilations.</p>
              </div>

              <div className="home-articles-grid">
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((art) => (
                    <article
                      key={art.id}
                      className="featured-post-card glass-card"
                      onClick={() => setActiveSection(`article-${art.id}`)}
                    >
                      <span className="post-card-category">{art.category}</span>
                      <h3 className="post-card-title">{art.title}</h3>
                      <p className="post-card-excerpt">{art.excerpt}</p>
                      <div className="post-card-footer">
                        <span className="post-card-date">{art.date}</span>
                        <span className="read-more-link flex-center">
                          <span>Read Article</span>
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="no-articles-found flex-center">
                    <p>No articles found matching "{homeSearchQuery}"</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        );
      }

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
