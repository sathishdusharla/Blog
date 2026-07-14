import React, { useState, useEffect } from 'react';
import { Award, Briefcase, GraduationCap, CheckCircle } from 'lucide-react';
import { achievements, stats } from '../data/achievements';
import './Timeline.css';

export const Timeline: React.FC = () => {
  const [animatedStats, setAnimatedStats] = useState<Record<string, number>>({});

  // Animate stats counting up on mount
  useEffect(() => {
    const duration = 1500; // 1.5 seconds animation
    const steps = 60;
    const stepTime = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      const newStats: Record<string, number> = {};
      stats.forEach((stat) => {
        // Easing out quadratic function
        const easedProgress = 1 - Math.pow(1 - progress, 2);
        newStats[stat.id] = Math.round(stat.value * easedProgress);
      });
      
      setAnimatedStats(newStats);

      if (currentStep >= steps) {
        clearInterval(timer);
        // Ensure final values are exactly correct
        const finalStats: Record<string, number> = {};
        stats.forEach((stat) => {
          finalStats[stat.id] = stat.value;
        });
        setAnimatedStats(finalStats);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'milestone': return <Briefcase size={20} />;
      case 'award': return <Award size={20} />;
      case 'certification': return <GraduationCap size={20} />;
      default: return <CheckCircle size={20} />;
    }
  };

  return (
    <section className="timeline-section">
      <div className="section-header">
        <h2 className="text-gradient-cyan-purple">Achievements & Milestones</h2>
        <p className="section-subtitle">
          Real-time development metrics and career timeline of a systems engineer and creative developer.
        </p>
      </div>

      {/* Development Statistics Grid */}
      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.id} className="stat-card glass-card">
            <h3 className="stat-value text-gradient-orange">
              {animatedStats[stat.id]?.toLocaleString() || 0}
              {stat.suffix}
            </h3>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Interactive Career Timeline */}
      <div className="timeline-container">
        <div className="timeline-line" />
        
        <div className="timeline-list">
          {achievements.map((item, index) => (
            <div 
              key={item.id} 
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
            >
              <div className="timeline-marker flex-center" aria-hidden="true">
                {getIcon(item.type)}
              </div>
              
              <div className="timeline-card glass-card">
                <span className="timeline-year">{item.year}</span>
                <span className={`timeline-type-badge ${item.type}`}>
                  {item.type}
                </span>
                <h3 className="timeline-title">{item.title}</h3>
                <h4 className="timeline-subtitle">{item.subtitle}</h4>
                <p className="timeline-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Timeline;
