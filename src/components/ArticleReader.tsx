import React, { useEffect, useState } from 'react';
import { ArrowLeft, Clock, Calendar, Bookmark, Share2 } from 'lucide-react';
import type { Article } from '../data/articles';
import './ArticleReader.css';

interface ArticleReaderProps {
  article: Article;
  onBack: () => void;
}

export const ArticleReader: React.FC<ArticleReaderProps> = ({ article, onBack }) => {
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

  return (
    <article className="article-reader-container">
      {/* Dynamic Reading Progress indicator */}
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
        <span>Return to Articles</span>
      </button>

      <header className="article-reader-header">
        <div className="article-meta-row">
          <span className="article-category-badge">{article.category}</span>
          <div className="meta-items">
            <span className="meta-item-span">
              <Calendar size={14} />
              {article.date}
            </span>
            <span className="meta-item-span">
              <Clock size={14} />
              {article.readTime}
            </span>
          </div>
        </div>

        <h1 className="article-reader-title">{article.title}</h1>
        
        <div className="article-tags-wrap">
          {article.tags.map((tag) => (
            <span key={tag} className="article-reader-tag">
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* Styled long form post contents */}
      <section 
        className="article-reader-body"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      <footer className="article-reader-footer glass-card">
        <div className="footer-avatar-wrap">
          <div className="avatar-placeholder flex-center">SD</div>
          <div className="avatar-info">
            <h4>Sathish Dusharla</h4>
            <p>Software Engineer & Designer interested in web graphics, Rust and compilation structures.</p>
          </div>
        </div>
        
        <div className="footer-sharing-actions">
          <button className="share-action-btn flex-center" onClick={() => alert('Link copied to clipboard!')}>
            <Share2 size={16} />
            <span>Copy Link</span>
          </button>
          <button className="share-action-btn flex-center">
            <Bookmark size={16} />
            <span>Save to Reading List</span>
          </button>
        </div>
      </footer>
    </article>
  );
};
export default ArticleReader;
