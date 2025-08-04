"use client";

import { useState } from 'react';
import { cn } from '../../utils/cn';
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
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFeatured, setShowFeatured] = useState(false);

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Apps' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'api', name: 'APIs' },
    { id: 'tool', name: 'Tools' },
    { id: 'other', name: 'Other' }
  ];

  const filteredProjects = projects.filter(project => {
    const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory;
    const featuredMatch = !showFeatured || project.featured;
    return categoryMatch && featuredMatch;
  });

  return (
    <section className={cn("py-16", className)}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4" style={{ color: 'var(--color-text-primary)' }}>
          My Projects
        </h2>
        <p className="text-center mb-12 max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
          Here are some of the projects I've worked on. Each one represents a unique challenge and learning experience.
        </p>

        {showFilters && (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "px-4 py-2 rounded-lg transition-colors duration-300",
                  selectedCategory === category.id
                    ? "text-white"
                    : "hover:bg-gray-100"
                )}
                style={{
                  backgroundColor: selectedCategory === category.id ? 'var(--color-primary)' : 'transparent',
                  color: selectedCategory === category.id ? 'white' : 'var(--color-text-primary)',
                  border: selectedCategory === category.id ? 'none' : '1px solid var(--color-border)'
                }}
              >
                {category.name}
              </button>
            ))}
            
            <button
              onClick={() => setShowFeatured(!showFeatured)}
              className={cn(
                "px-4 py-2 rounded-lg transition-colors duration-300",
                showFeatured
                  ? "text-white"
                  : "hover:bg-gray-100"
              )}
              style={{
                backgroundColor: showFeatured ? 'var(--color-primary)' : 'transparent',
                color: showFeatured ? 'white' : 'var(--color-text-primary)',
                border: showFeatured ? 'none' : '1px solid var(--color-border)'
              }}
            >
              Featured Only
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <article 
              key={project.id}
              className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              style={{ backgroundColor: 'var(--color-bg)' }}
            >
              {/* Project Image Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-primary to-secondary overflow-hidden">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-white text-4xl font-bold opacity-20">
                      {project.title.charAt(0)}
                    </div>
                  </div>
                )}
                
                {project.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 text-xs bg-yellow-400 text-yellow-900 rounded-full font-semibold">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                  {project.title}
                </h3>
                
                <p className="mb-4 line-clamp-3" style={{ color: 'var(--color-text-secondary)' }}>
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-xs rounded-full"
                      style={{ 
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
                <div className="flex gap-3">
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-4 py-2 rounded-lg transition-colors duration-300"
                      style={{ 
                        backgroundColor: 'var(--color-primary)',
                        color: 'white'
                      }}
                    >
                      Live Demo
                    </a>
                  )}
                  
                  {project.githubUrl && project.githubUrl !== '#' && (
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-4 py-2 border rounded-lg transition-colors duration-300 hover:bg-gray-50"
                      style={{ 
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text-primary)'
                      }}
                    >
                      GitHub
                    </a>
                  )}
                  
                  {(project.liveUrl === '#' || project.githubUrl === '#') && (
                    <div className="flex-1 text-center px-4 py-2 rounded-lg opacity-50 cursor-not-allowed"
                         style={{ 
                           backgroundColor: 'var(--color-muted)',
                           color: 'var(--color-text-secondary)'
                         }}>
                      Coming Soon
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p style={{ color: 'var(--color-text-secondary)' }}>
              No projects found for the selected filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
} 