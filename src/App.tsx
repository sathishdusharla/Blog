import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Mail, Search } from 'lucide-react';
import { Github, Linkedin } from './components/BrandIcons';
import Terminal from './components/Terminal';
import TerminalContact from './components/TerminalContact';
import UnifiedReader from './components/UnifiedReader';
import { projects } from './data/projects';
import type { Project } from './data/projects';
import { articles } from './data/articles';
import type { Article } from './data/articles';
import { achievements } from './data/achievements';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState<'all' | 'articles' | 'projects' | 'milestones' | 'contact'>('all');
  const [activeDetail, setActiveDetail] = useState<{ type: 'article' | 'project' | 'achievement'; data: any } | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  
  const [homeSearchQuery, setHomeSearchQuery] = useState('');
  
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

    const particleCount = Math.min(Math.round(width / 25), 45);
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
      ctx.fillStyle = document.documentElement.getAttribute('data-theme') === 'light' 
        ? 'rgba(244, 245, 248, 0.2)' 
        : 'rgba(6, 7, 12, 0.2)';
      ctx.fillRect(0, 0, width, height);

      const colorScheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const connectionColor = colorScheme === 'light' ? '200, 204, 218' : '155, 81, 224';
      const particleColor = colorScheme === 'light' ? 'rgba(138, 63, 252, 0.4)' : 'rgba(230, 0, 0, 0.4)';

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

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

  // Filter systems based on global search
  const filteredArticles = articles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(homeSearchQuery.toLowerCase()) ||
                          art.excerpt.toLowerCase().includes(homeSearchQuery.toLowerCase()) ||
                          art.tags.some(tag => tag.toLowerCase().includes(homeSearchQuery.toLowerCase()));
    return matchesSearch;
  });

  const filteredProjects = projects.filter(proj => {
    const matchesSearch = proj.title.toLowerCase().includes(homeSearchQuery.toLowerCase()) ||
                          proj.description.toLowerCase().includes(homeSearchQuery.toLowerCase()) ||
                          proj.tech.some(t => t.toLowerCase().includes(homeSearchQuery.toLowerCase()));
    return matchesSearch;
  });

  const filteredAchievements = achievements.filter(ach => {
    const matchesSearch = ach.title.toLowerCase().includes(homeSearchQuery.toLowerCase()) ||
                          ach.description.toLowerCase().includes(homeSearchQuery.toLowerCase()) ||
                          ach.subtitle.toLowerCase().includes(homeSearchQuery.toLowerCase());
    return matchesSearch;
  });

  // Handle navigations from Terminal console commands
  const handleTerminalNavigate = (target: string) => {
    if (target === 'projects') {
      setActiveTab('projects');
      setActiveDetail(null);
    } else if (target === 'milestones') {
      setActiveTab('milestones');
      setActiveDetail(null);
    } else if (target === 'contact') {
      setActiveTab('contact');
      setActiveDetail(null);
    } else if (target === 'articles' || target === 'posts') {
      setActiveTab('articles');
      setActiveDetail(null);
    } else if (target.startsWith('article-')) {
      const artId = target.replace('article-', '');
      const article = articles.find((a) => a.id === artId);
      if (article) {
        setActiveTab('articles');
        setActiveDetail({ type: 'article', data: article });
      }
    }
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
    card.style.setProperty('--shine-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--shine-y', `${(y / rect.height) * 100}%`);
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.setProperty('--shine-x', '50%');
    card.style.setProperty('--shine-y', '50%');
  };

  // Dynamically map projects to article cards
  const getArticleProjectLink = (id: string) => {
    if (id === 'optimizing-canvas-content-visibility') return 'ShaderFlow';
    if (id === 'wasm-multithreading-sharedarraybuffer') return 'WasmRay';
    if (id === 'css-cascade-layers-guide') return 'Cascade Core';
    return null;
  };

  const getArticleDomainLink = (id: string) => {
    if (id === 'optimizing-canvas-content-visibility') return 'Graphics / WebGL';
    if (id === 'wasm-multithreading-sharedarraybuffer') return 'Systems / WASM';
    if (id === 'css-cascade-layers-guide') return 'CSS Architecture';
    return 'Systems Development';
  };

  const renderContent = () => {
    if (activeDetail) {
      return (
        <UnifiedReader 
          item={activeDetail} 
          onBack={() => setActiveDetail(null)} 
        />
      );
    }

    const renderArticleCard = (art: Article) => {
      const linkedProj = getArticleProjectLink(art.id);
      const domainLabel = getArticleDomainLink(art.id);
      return (
        <article
          key={`art-${art.id}`}
          className="featured-post-card glass-card"
          onClick={() => setActiveDetail({ type: 'article', data: art })}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <div className="card-top-badges">
            <span className="post-card-category badge-research">Research</span>
            <span className="post-card-category badge-domain">{domainLabel}</span>
          </div>
          
          <h3 className="post-card-title">{art.title}</h3>
          <p className="post-card-excerpt">{art.excerpt}</p>
          
          {linkedProj && (
            <div className="card-linked-project">
              <span className="linked-proj-tag">Linked Project:</span>
              <span className="linked-proj-val">{linkedProj}</span>
            </div>
          )}

          <div className="post-card-footer">
            <span className="post-card-date">{art.date}</span>
            <span className="read-more-link flex-center">
              <span>Read Log</span>
              <ArrowRight size={14} />
            </span>
          </div>
        </article>
      );
    };

    const renderProjectCard = (proj: Project) => {
      return (
        <article
          key={`proj-${proj.id}`}
          className="featured-post-card glass-card"
          onClick={() => setActiveDetail({ type: 'project', data: proj })}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <div className="card-top-badges">
            <span className="post-card-category badge-project">Project</span>
            <span className="post-card-category badge-domain">Domain: {proj.category}</span>
          </div>

          <h3 className="post-card-title">{proj.title}</h3>
          <p className="post-card-excerpt">{proj.description}</p>

          <div className="card-tech-pills">
            {proj.tech.slice(0, 3).map((t, idx) => (
              <span key={idx} className="tech-pill-span">#{t}</span>
            ))}
            {proj.tech.length > 3 && <span className="tech-pill-span">+{proj.tech.length - 3} more</span>}
          </div>

          <div className="post-card-footer">
            <span className="post-card-date">Stars: ⭐ {proj.stats.stars || 0}</span>
            <span className="read-more-link flex-center">
              <span>Inspect Repository</span>
              <ArrowRight size={14} />
            </span>
          </div>
        </article>
      );
    };

    const renderAchievementCard = (ach: any) => {
      return (
        <article
          key={`ach-${ach.id}`}
          className="featured-post-card glass-card"
          onClick={() => setActiveDetail({ type: 'achievement', data: ach })}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <div className="card-top-badges">
            <span className="post-card-category badge-achievement">Achievement</span>
            <span className="post-card-category badge-domain">{ach.type.toUpperCase()}</span>
          </div>

          <h3 className="post-card-title">{ach.title}</h3>
          <p className="post-card-excerpt">{ach.description}</p>

          <div className="card-linked-project">
            <span className="linked-proj-tag">Organization:</span>
            <span className="linked-proj-val">{ach.subtitle}</span>
          </div>

          <div className="post-card-footer">
            <span className="post-card-date">Year: {ach.year}</span>
          </div>
        </article>
      );
    };

    switch (activeTab) {
      case 'all': {
        const allCards = [
          ...filteredProjects.map(p => ({ type: 'project', data: p, key: `proj-${p.id}` })),
          ...filteredArticles.map(a => ({ type: 'article', data: a, key: `art-${a.id}` })),
          ...filteredAchievements.map(ach => ({ type: 'achievement', data: ach, key: `ach-${ach.id}` }))
        ];

        return (
          <div className="home-articles-list-section">
            <div className="home-articles-grid">
              {allCards.length > 0 ? (
                allCards.map(item => {
                  if (item.type === 'article') return renderArticleCard(item.data as Article);
                  if (item.type === 'project') return renderProjectCard(item.data as Project);
                  return renderAchievementCard(item.data);
                })
              ) : (
                <div className="no-articles-found flex-center">
                  <p>No records found matching topic/search filters.</p>
                </div>
              )}
            </div>
          </div>
        );
      }

      case 'articles':
        return (
          <div className="home-articles-list-section">
            <div className="home-articles-grid">
              {filteredArticles.length > 0 ? (
                filteredArticles.map(renderArticleCard)
              ) : (
                <div className="no-articles-found flex-center">
                  <p>No research logs found matching topic/search filters.</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="home-articles-list-section">
            <div className="home-articles-grid">
              {filteredProjects.length > 0 ? (
                filteredProjects.map(renderProjectCard)
              ) : (
                <div className="no-articles-found flex-center">
                  <p>No projects found matching topic/search filters.</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'milestones':
        return (
          <div className="home-articles-list-section">
            <div className="home-articles-grid">
              {filteredAchievements.length > 0 ? (
                filteredAchievements.map(renderAchievementCard)
              ) : (
                <div className="no-articles-found flex-center">
                  <p>No achievements found matching topic/search filters.</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'contact':
        return <div className="animate-fade-in"><TerminalContact /></div>;

      default:
        return <div>Section not found.</div>;
    }
  };

  const showFilterBlock = !activeDetail;

  return (
    <div className="app-container">
      {/* Background Graphic Node connection Canvas */}
      <canvas ref={canvasRef} className="background-canvas" />
      <div className="grid-pattern" aria-hidden="true" />
      <div className="radial-glow" aria-hidden="true" />

      {/* Core main wrapper section */}
      <main className="main-content" id="main-content-area">
        {/* Top Brand Header (Visual matching uploaded reference) */}
        <header className="home-brand-block flex-center">
          <button onClick={() => setIsTerminalOpen(true)} className="portfolio-action-btn">
            Launch Console (CLI)
          </button>
          
          <div className="brand-logo-container">
            <span className="brand-sd-stacked">SD</span>
            <span className="brand-devlog-text">
              DEV<span className="sparkle-o">O<span className="sparkle-star">✦</span></span>G
            </span>
          </div>
          
          <p className="home-slogan-text">Compiling low-level logic, rendering high-fidelity designs.</p>
        </header>

        {/* Unified Search & Tab Options Bar */}
        {showFilterBlock && (
          <div className="home-filter-bar-row">
            <div className="search-bar-wrap">
              <Search size={18} className="search-bar-icon" />
              <input
                type="text"
                placeholder={`Search ${activeTab === 'all' ? 'logs' : activeTab === 'articles' ? 'research' : activeTab === 'projects' ? 'projects' : 'achievements'}...`}
                value={homeSearchQuery}
                onChange={(e) => setHomeSearchQuery(e.target.value)}
                className="search-input-field"
              />
              {homeSearchQuery && (
                <button onClick={() => setHomeSearchQuery('')} className="search-clear-btn">
                  Clear
                </button>
              )}
            </div>

            <div className="filter-options-wrap">
              {[
                { id: 'all', label: 'ALL' },
                { id: 'articles', label: 'RESEARCH' },
                { id: 'projects', label: 'PROJECTS' },
                { id: 'milestones', label: 'ACHIEVEMENTS' },
                { id: 'contact', label: 'CONTACT' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id as any); setActiveDetail(null); }}
                  className={`filter-option-pill ${activeTab === tab.id ? 'active' : ''}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Content Display Area */}
        <div className="dynamic-content-wrap">
          {renderContent()}
        </div>
      </main>

      {/* Retro/Neon Terminal overlay console */}
      {isTerminalOpen && (
        <div className="terminal-overlay" onClick={() => setIsTerminalOpen(false)}>
          <div className="terminal-modal-wrap" onClick={(e) => e.stopPropagation()}>
            <Terminal 
              onClose={() => setIsTerminalOpen(false)} 
              onNavigate={handleTerminalNavigate}
            />
          </div>
        </div>
      )}

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
