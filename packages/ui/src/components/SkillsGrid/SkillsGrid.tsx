"use client";

import { useState } from 'react';
import { cn } from '../../utils/cn';
import '../../theme/tokens.css';

interface Skill {
  name: string;
  icon?: string;
  proficiency: number; // 0-100
  category: string;
  description?: string;
}

interface SkillsGridProps {
  skills?: Skill[];
  className?: string;
  showProficiency?: boolean;
}

const defaultSkills: Skill[] = [
  // Frontend
  { name: 'React', icon: '⚛️', proficiency: 90, category: 'Frontend', description: 'Building interactive UIs with hooks and modern patterns' },
  { name: 'TypeScript', icon: '📘', proficiency: 85, category: 'Frontend', description: 'Type-safe JavaScript development' },
  { name: 'Next.js', icon: '⚡', proficiency: 80, category: 'Frontend', description: 'Full-stack React framework' },
  { name: 'Tailwind CSS', icon: '🎨', proficiency: 85, category: 'Frontend', description: 'Utility-first CSS framework' },
  { name: 'HTML/CSS', icon: '🌐', proficiency: 95, category: 'Frontend', description: 'Semantic markup and responsive design' },
  
  // Backend
  { name: 'Node.js', icon: '🟢', proficiency: 75, category: 'Backend', description: 'Server-side JavaScript runtime' },
  { name: 'Express', icon: '🚂', proficiency: 70, category: 'Backend', description: 'Web application framework' },
  { name: 'Python', icon: '🐍', proficiency: 65, category: 'Backend', description: 'General-purpose programming' },
  { name: 'PostgreSQL', icon: '🐘', proficiency: 60, category: 'Backend', description: 'Relational database management' },
  { name: 'MongoDB', icon: '🍃', proficiency: 55, category: 'Backend', description: 'NoSQL database' },
  
  // Tools & Others
  { name: 'Git', icon: '📚', proficiency: 85, category: 'Tools', description: 'Version control and collaboration' },
  { name: 'Docker', icon: '🐳', proficiency: 60, category: 'Tools', description: 'Containerization and deployment' },
  { name: 'AWS', icon: '☁️', proficiency: 50, category: 'Tools', description: 'Cloud infrastructure and services' },
  { name: 'Figma', icon: '🎯', proficiency: 70, category: 'Tools', description: 'Design and prototyping' },
  { name: 'Storybook', icon: '📖', proficiency: 75, category: 'Tools', description: 'Component development and documentation' },
  
  // Learning
  { name: 'Rust', icon: '🦀', proficiency: 30, category: 'Learning', description: 'Systems programming language' },
  { name: 'Go', icon: '🐹', proficiency: 25, category: 'Learning', description: 'Concurrent programming' },
  { name: 'Kubernetes', icon: '☸️', proficiency: 20, category: 'Learning', description: 'Container orchestration' }
];

export function SkillsGrid({ 
  skills = defaultSkills, 
  className, 
  showProficiency = true 
}: SkillsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All Skills', color: 'var(--color-primary)' },
    { id: 'Frontend', name: 'Frontend', color: '#3B82F6' },
    { id: 'Backend', name: 'Backend', color: '#10B981' },
    { id: 'Tools', name: 'Tools', color: '#F59E0B' },
    { id: 'Learning', name: 'Learning', color: '#8B5CF6' }
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
        maxWidth: '1200px', 
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
          Skills & Technologies
        </h2>
        <p style={{ 
          textAlign: 'center', 
          marginBottom: 'var(--spacing-xl)', 
          maxWidth: '42rem', 
          marginLeft: 'auto', 
          marginRight: 'auto',
          color: 'var(--color-text-secondary)' 
        }}>
          Here's what I work with. I'm always learning new technologies and improving my existing skills.
        </p>

        {/* Category Filters */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          gap: 'var(--spacing-md)', 
          marginBottom: 'var(--spacing-xl)' 
        }}>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              style={{
                paddingLeft: 'var(--spacing-md)',
                paddingRight: 'var(--spacing-md)',
                paddingTop: 'var(--spacing-sm)',
                paddingBottom: 'var(--spacing-sm)',
                borderRadius: 'var(--radius-lg)',
                transition: 'all 0.3s ease',
                backgroundColor: selectedCategory === category.id ? category.color : 'transparent',
                color: selectedCategory === category.id ? 'white' : 'var(--color-text-primary)',
                border: selectedCategory === category.id ? 'none' : '1px solid var(--color-border)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: 'var(--spacing-lg)',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {filteredSkills.map(skill => (
            <div
              key={skill.name}
              style={{ 
                position: 'relative',
                backgroundColor: 'var(--color-bg)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--spacing-lg)',
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
                fontSize: '2.25rem', 
                marginBottom: 'var(--spacing-md)', 
                textAlign: 'center' 
              }}>
                {skill.icon || '💻'}
              </div>

              {/* Skill Name */}
              <h3 style={{ 
                fontSize: 'var(--font-size-lg)', 
                fontWeight: '600', 
                textAlign: 'center', 
                marginBottom: 'var(--spacing-md)',
                color: 'var(--color-text-primary)' 
              }}>
                {skill.name}
              </h3>

              {/* Proficiency Bar */}
              {showProficiency && (
                <div style={{ marginBottom: 'var(--spacing-md)' }}>
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
                  backgroundColor: 'var(--color-bg)',
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
                    borderTop: '0.5rem solid var(--color-bg)'
                  }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        {showProficiency && (
          <div style={{ marginTop: 'var(--spacing-xl)', textAlign: 'center' }}>
            <h3 style={{ 
              fontSize: 'var(--font-size-lg)', 
              fontWeight: '600', 
              marginBottom: 'var(--spacing-md)',
              color: 'var(--color-text-primary)' 
            }}>
              Proficiency Levels
            </h3>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              justifyContent: 'center', 
              gap: 'var(--spacing-lg)' 
            }}>
              {[
                { label: 'Expert (90-100%)', color: '#10B981' },
                { label: 'Advanced (80-89%)', color: '#10B981' },
                { label: 'Intermediate (60-79%)', color: '#F59E0B' },
                { label: 'Beginner (40-59%)', color: '#F97316' },
                { label: 'Learning (0-39%)', color: '#EF4444' }
              ].map((level, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 'var(--spacing-sm)' 
                }}>
                  <div 
                    style={{ 
                      width: '0.75rem', 
                      height: '0.75rem', 
                      borderRadius: '50%',
                      backgroundColor: level.color 
                    }}
                  />
                  <span style={{ 
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)' 
                  }}>
                    {level.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredSkills.length === 0 && (
          <div style={{ textAlign: 'center', paddingTop: 'var(--spacing-xl)', paddingBottom: 'var(--spacing-xl)' }}>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              No skills found for the selected category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
} 