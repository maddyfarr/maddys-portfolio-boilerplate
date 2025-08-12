"use client";

import { useState } from 'react';
import { cn } from '../../utils/cn';
import { useLanguage } from '../../context/LanguageContext';
import '../../theme/tokens.css';

interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  category: 'web' | 'mobile' | 'api' | 'tool' | 'other';
}

interface ProjectCardsProps {
  projects?: Project[];
  className?: string;
  showFilters?: boolean;
}

const defaultProjects: Project[] = [
  {
    id: '1',
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio built with Next.js, TypeScript, and Tailwind CSS. Features dark mode, smooth animations, and a component library.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Storybook'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    category: 'web'
  },
  {
    id: '2',
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce solution with user authentication, payment processing, and admin dashboard.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    category: 'web'
  },
  {
    id: '3',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team features.',
    technologies: ['React Native', 'Firebase', 'Redux'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    category: 'mobile'
  },
  {
    id: '4',
    title: 'Weather API',
    description: 'A RESTful API for weather data with caching, rate limiting, and comprehensive documentation.',
    technologies: ['Node.js', 'Express', 'Redis', 'OpenWeather API'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    category: 'api'
  },
  {
    id: '5',
    title: 'Code Formatter Tool',
    description: 'A CLI tool for formatting code across multiple languages with customizable rules.',
    technologies: ['Python', 'CLI', 'Docker'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    category: 'tool'
  },
  {
    id: '6',
    title: 'Coming Soon...',
    description: 'More exciting projects are in development! Stay tuned for updates.',
    technologies: ['React', 'TypeScript', 'More to come...'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    category: 'other'
  }
];

export function ProjectCards({ 
  projects = defaultProjects, 
  className, 
  showFilters = true 
}: ProjectCardsProps) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFeatured, setShowFeatured] = useState(false);

  const categories = [
    { id: 'all', name: t('projects.allProjects') },
    { id: 'web', name: t('projects.webApps') },
    { id: 'mobile', name: t('projects.mobileApps') },
    { id: 'api', name: t('projects.apis') },
    { id: 'tool', name: t('projects.tools') },
    { id: 'other', name: t('projects.other') }
  ];

  const filteredProjects = projects.filter(project => {
    const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory;
    const featuredMatch = !showFeatured || project.featured;
    return categoryMatch && featuredMatch;
  });

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
          {t('projects.title')}
        </h2>
        <p style={{ 
          textAlign: 'center', 
          marginBottom: 'var(--spacing-xl)', 
          maxWidth: '42rem', 
          marginLeft: 'auto', 
          marginRight: 'auto',
          color: 'var(--color-text-secondary)' 
        }}>
          {t('projects.description')}
        </p>

        {showFilters && (
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
                  backgroundColor: selectedCategory === category.id ? 'var(--color-primary)' : 'transparent',
                  color: selectedCategory === category.id ? 'white' : 'var(--color-text-primary)',
                  border: selectedCategory === category.id ? 'none' : '1px solid var(--color-border)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {category.name}
              </button>
            ))}
            
            <button
              onClick={() => setShowFeatured(!showFeatured)}
              style={{
                paddingLeft: 'var(--spacing-md)',
                paddingRight: 'var(--spacing-md)',
                paddingTop: 'var(--spacing-sm)',
                paddingBottom: 'var(--spacing-sm)',
                borderRadius: 'var(--radius-lg)',
                transition: 'all 0.3s ease',
                backgroundColor: showFeatured ? 'var(--color-primary)' : 'transparent',
                color: showFeatured ? 'white' : 'var(--color-text-primary)',
                border: showFeatured ? 'none' : '1px solid var(--color-border)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                if (!showFeatured) {
                  e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!showFeatured) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {t('projects.featuredOnly')}
            </button>
          </div>
        )}

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: 'var(--spacing-lg)',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {filteredProjects.map(project => (
            <article 
              key={project.id}
              style={{ 
                backgroundColor: 'var(--color-card-bg)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Project Image Placeholder */}
              <div style={{ 
                position: 'relative',
                height: '12rem',
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                overflow: 'hidden'
              }}>
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                ) : (
                  <div style={{ 
                    width: '100%', 
                    height: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <div style={{ 
                      color: 'white', 
                      fontSize: '2.25rem', 
                      fontWeight: 'bold', 
                      opacity: 0.2 
                    }}>
                      {project.title.charAt(0)}
                    </div>
                  </div>
                )}
                
                {project.featured && (
                  <div style={{ 
                    position: 'absolute', 
                    top: 'var(--spacing-md)', 
                    right: 'var(--spacing-md)' 
                  }}>
                    <span style={{ 
                      paddingLeft: 'var(--spacing-sm)',
                      paddingRight: 'var(--spacing-sm)',
                      paddingTop: 'var(--spacing-xs)',
                      paddingBottom: 'var(--spacing-xs)',
                      fontSize: 'var(--font-size-xs)',
                      backgroundColor: '#fbbf24',
                      color: '#92400e',
                      borderRadius: '9999px',
                      fontWeight: '600'
                    }}>
                      {t('projects.featured')}
                    </span>
                  </div>
                )}
              </div>

              <div style={{ padding: 'var(--spacing-lg)' }}>
                <h3 style={{ 
                  fontSize: 'var(--font-size-xl)', 
                  fontWeight: '600', 
                  marginBottom: 'var(--spacing-sm)',
                  color: 'var(--color-text-primary)' 
                }}>
                  {project.title}
                </h3>
                
                <p style={{ 
                  marginBottom: 'var(--spacing-md)',
                  color: 'var(--color-text-secondary)',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {project.description}
                </p>

                {/* Technologies */}
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 'var(--spacing-sm)', 
                  marginBottom: 'var(--spacing-lg)' 
                }}>
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      style={{ 
                        paddingLeft: 'var(--spacing-sm)',
                        paddingRight: 'var(--spacing-sm)',
                        paddingTop: 'var(--spacing-xs)',
                        paddingBottom: 'var(--spacing-xs)',
                        fontSize: 'var(--font-size-xs)',
                        borderRadius: '9999px',
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        opacity: 0.8
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ 
                        flex: 1,
                        textAlign: 'center',
                        paddingLeft: 'var(--spacing-md)',
                        paddingRight: 'var(--spacing-md)',
                        paddingTop: 'var(--spacing-sm)',
                        paddingBottom: 'var(--spacing-sm)',
                        borderRadius: 'var(--radius-lg)',
                        transition: 'all 0.3s ease',
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        textDecoration: 'none'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      {t('projects.liveDemo')}
                    </a>
                  )}
                  
                  {project.githubUrl && project.githubUrl !== '#' && (
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ 
                        flex: 1,
                        textAlign: 'center',
                        paddingLeft: 'var(--spacing-md)',
                        paddingRight: 'var(--spacing-md)',
                        paddingTop: 'var(--spacing-sm)',
                        paddingBottom: 'var(--spacing-sm)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-lg)',
                        transition: 'all 0.3s ease',
                        color: 'var(--color-text-primary)',
                        textDecoration: 'none'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-secondary)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      {t('projects.github')}
                    </a>
                  )}
                  
                  {(project.liveUrl === '#' || project.githubUrl === '#') && (
                    <div style={{ 
                      flex: 1,
                      textAlign: 'center',
                      paddingLeft: 'var(--spacing-md)',
                      paddingRight: 'var(--spacing-md)',
                      paddingTop: 'var(--spacing-sm)',
                      paddingBottom: 'var(--spacing-sm)',
                      borderRadius: 'var(--radius-lg)',
                      opacity: 0.5,
                      cursor: 'not-allowed',
                      backgroundColor: 'var(--color-muted)',
                      color: 'var(--color-text-secondary)'
                    }}>
                      {t('projects.comingSoon')}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div style={{ textAlign: 'center', paddingTop: 'var(--spacing-xl)', paddingBottom: 'var(--spacing-xl)' }}>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              {t('projects.noProjectsFound')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
} 