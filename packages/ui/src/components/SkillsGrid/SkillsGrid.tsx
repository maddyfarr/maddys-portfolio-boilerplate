"use client";

import { useState } from 'react';
import { cn } from '../../utils/cn';
import { useLanguage } from '../../context/LanguageContext';
import '../../theme/tokens.css';

interface Skill {
  name: string;
  icon?: string;
  proficiency: number;
  category: string;
  description?: string;
}

interface SkillsGridProps {
  skills?: Skill[];
  className?: string;
  showProficiency?: boolean;
  sectionBackground?: 'beige' | 'white';
}

const defaultSkills: Skill[] = [
  // Frontend
  { name: 'React', icon: '⚛️', proficiency: 90, category: 'Frontend', description: 'Building interactive UIs with hooks and modern patterns' },
  { name: 'TypeScript', icon: '📘', proficiency: 85, category: 'Frontend', description: 'Type-safe JavaScript development' },
  { name: 'Next.js', icon: '⚡', proficiency: 30, category: 'Frontend', description: 'Full-stack React framework' },
  
  // Backend
  { name: 'Python FastAPI', icon: '🐍', proficiency: 50, category: 'Backend', description: 'General-purpose programming' },
  
  // Tools & Others
  { name: 'Git', icon: '📚', proficiency: 85, category: 'Tools', description: 'Version control and collaboration' },
  { name: 'Figma', icon: '🎯', proficiency: 70, category: 'Tools', description: 'Design and prototyping' },
  { name: 'Storybook', icon: '📖', proficiency: 75, category: 'Tools', description: 'Component development and documentation' },
  
];

export function SkillsGrid({ 
  skills = defaultSkills, 
  className, 
  showProficiency = true,
  sectionBackground = 'beige'
}: SkillsGridProps) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const getCardBackground = () => {
    return sectionBackground === 'white' ? '#f7f6f3' : '#ffffff';
  };

  const categories = [
    { id: 'all', name: t('skills.allSkills'), color: 'var(--color-primary)' },
    { id: 'Frontend', name: t('skills.frontend'), color: '#3B82F6' },
    { id: 'Backend', name: t('skills.backend'), color: '#10B981' },
    { id: 'Tools', name: t('skills.tools'), color: '#F59E0B' },
    { id: 'Learning', name: t('skills.learning'), color: '#8B5CF6' }
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 80) return '#10B981'; // Green
    if (proficiency >= 60) return '#F59E0B'; // Yellow
    if (proficiency >= 40) return '#F97316'; // Orange
    return '#EF4444'; // Red
  };

  const getProficiencyLabel = (proficiency: number) => {
    if (proficiency >= 90) return 'Expert';
    if (proficiency >= 80) return 'Advanced';
    if (proficiency >= 60) return 'Intermediate';
    if (proficiency >= 40) return 'Beginner';
    return 'Learning';
  };

  return (
    <section 
      className={cn(className)}
      style={{ 
        paddingTop: 'var(--spacing-xl)', 
        paddingBottom: 'var(--spacing-xl)' 
      }}
    >
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        paddingLeft: 'var(--spacing-md)', 
        paddingRight: 'var(--spacing-md)' 
      }}>
        <h2 style={{ 
          fontSize: 'var(--font-size-3xl)', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          marginBottom: 'var(--spacing-md)',
          color: 'var(--color-text-primary)' 
        }}>
          {t('skills.title')}
        </h2>
        <p style={{ 
          textAlign: 'center', 
          marginBottom: 'var(--spacing-xl)', 
          maxWidth: '42rem', 
          marginLeft: 'auto', 
          marginRight: 'auto',
          color: 'var(--color-text-secondary)' 
        }}>
          {t('skills.description')}
        </p>

        {/* Skills Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', 
          gap: 'var(--spacing-lg)',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {filteredSkills.map(skill => (
            <div
              key={skill.name}
              style={{ 
                position: 'relative',
                backgroundColor: getCardBackground(),
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--spacing-md)',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                setHoveredSkill(skill.name);
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                setHoveredSkill(null);
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Skill Icon */}
              <div style={{ 
                fontSize: '1.75rem', 
                marginBottom: 'var(--spacing-sm)', 
                textAlign: 'center' 
              }}>
                {skill.icon || '💻'}
              </div>

              {/* Skill Name */}
              <h3 style={{ 
                fontSize: 'var(--font-size-base)', 
                fontWeight: '600', 
                textAlign: 'center', 
                marginBottom: 'var(--spacing-sm)',
                color: 'var(--color-text-primary)' 
              }}>
                {skill.name}
              </h3>

              {/* Proficiency Bar */}
              {showProficiency && (
                <div style={{ marginBottom: 'var(--spacing-sm)' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: 'var(--spacing-sm)' 
                  }}>
                    <span style={{ 
                      fontSize: 'var(--font-size-sm)', 
                      fontWeight: '500',
                      color: 'var(--color-text-secondary)' 
                    }}>
                      {getProficiencyLabel(skill.proficiency)}
                    </span>
                    <span style={{ 
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-text-secondary)' 
                    }}>
                      {skill.proficiency}%
                    </span>
                  </div>
                  <div style={{ 
                    width: '100%', 
                    backgroundColor: 'var(--color-secondary)', 
                    borderRadius: '9999px', 
                    height: '0.5rem' 
                  }}>
                    <div 
                      style={{ 
                        height: '0.5rem', 
                        borderRadius: '9999px', 
                        transition: 'all 0.5s ease',
                        width: `${skill.proficiency}%`,
                        backgroundColor: getProficiencyColor(skill.proficiency)
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Category Badge */}
              <div style={{ textAlign: 'center' }}>
                <span 
                  style={{ 
                    paddingLeft: 'var(--spacing-sm)',
                    paddingRight: 'var(--spacing-sm)',
                    paddingTop: 'var(--spacing-xs)',
                    paddingBottom: 'var(--spacing-xs)',
                    fontSize: 'var(--font-size-xs)',
                    borderRadius: '9999px',
                    color: 'white',
                    fontWeight: '500',
                    backgroundColor: categories.find(c => c.id === skill.category)?.color || 'var(--color-primary)'
                  }}
                >
                  {skill.category}
                </span>
              </div>

              {/* Hover Description */}
              {hoveredSkill === skill.name && skill.description && (
                <div style={{ 
                  position: 'absolute',
                  bottom: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginBottom: 'var(--spacing-sm)',
                  padding: 'var(--spacing-md)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  maxWidth: '18rem',
                  zIndex: 10,
                  backgroundColor: getCardBackground(),
                  border: '1px solid var(--color-border)'
                }}>
                  <p style={{ 
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)' 
                  }}>
                    {skill.description}
                  </p>
                  <div style={{ 
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: 0,
                    borderLeft: '0.5rem solid transparent',
                    borderRight: '0.5rem solid transparent',
                    borderTop: `0.5rem solid ${getCardBackground()}`
                  }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div style={{ textAlign: 'center', paddingTop: 'var(--spacing-xl)', paddingBottom: 'var(--spacing-xl)' }}>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              {t('skills.noSkillsFound')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
} 