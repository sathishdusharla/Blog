import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Terminal, Search, X, Code2 } from 'lucide-react';
import './Header.css';
import { articles } from '../data/articles';
import type { Article } from '../data/articles';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  openTerminal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  setActiveSection,
  openTerminal
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Initialize theme from system preference or data-theme attribute
  useEffect(() => {
    const savedTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Handle Search filtering
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const filtered = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setSearchResults(filtered);
  }, [searchQuery]);

  const selectSearchResult = (articleId: string) => {
    setActiveSection(`article-${articleId}`);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-logo" onClick={() => setActiveSection('home')}>
        <Code2 className="logo-icon" />
        <span className="logo-text">
          SD<span className="logo-highlight">_DEVLOG_</span>
        </span>
      </div>

      <nav className="header-nav" aria-label="Main Navigation">
        <ul className="nav-list">
          {['home', 'articles', 'projects', 'milestones', 'contact'].map((section) => (
            <li key={section}>
              <button
                className={`nav-link ${activeSection === section ? 'active' : ''}`}
                onClick={() => setActiveSection(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="header-actions">
        <button
          className="action-btn text-gradient-cyan-purple"
          onClick={() => setIsSearchOpen(true)}
          aria-label="Search articles"
        >
          <Search size={20} />
        </button>

        <button
          className="action-btn"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button
          className="action-btn terminal-trigger"
          onClick={openTerminal}
          aria-label="Open developer terminal"
        >
          <Terminal size={20} />
          <span className="terminal-badge">CLI</span>
        </button>
      </div>

      {/* Global Search Overlay (using popover-like pattern, styled in Header.css) */}
      {isSearchOpen && (
        <div className="search-overlay" onClick={() => setIsSearchOpen(false)}>
          <div className="search-modal glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="search-header">
              <Search size={20} className="search-icon" />
              <input
                ref={searchInputRef}
                type="text"
                className="search-input"
                placeholder="Search articles, topics, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button
                className="close-btn"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="search-body">
              {searchQuery.trim() === '' ? (
                <div className="search-placeholder">
                  <p>Type to search articles...</p>
                  <div className="suggested-tags">
                    <span>Suggested:</span>
                    {['WebGL', 'CSS', 'Rust', 'WebAssembly', 'Performance'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="tag-suggest-btn"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                <ul className="search-results-list">
                  {searchResults.map((article) => (
                    <li key={article.id} className="search-result-item" onClick={() => selectSearchResult(article.id)}>
                      <span className="result-category">{article.category}</span>
                      <h4 className="result-title">{article.title}</h4>
                      <p className="result-excerpt">{article.excerpt}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="search-no-results">
                  <p>No articles found matching "{searchQuery}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;
