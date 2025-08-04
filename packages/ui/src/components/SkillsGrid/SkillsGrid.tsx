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
    <section className={cn("py-16", className)}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4" style={{ color: 'var(--color-text-primary)' }}>
          Skills & Technologies
        </h2>
        <p className="text-center mb-12 max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
          Here's what I work with. I'm always learning new technologies and improving my existing skills.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className="px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: selectedCategory === category.id ? category.color : 'transparent',
                color: selectedCategory === category.id ? 'white' : 'var(--color-text-primary)',
                border: selectedCategory === category.id ? 'none' : '1px solid var(--color-border)'
              }}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredSkills.map(skill => (
            <div
              key={skill.name}
              className="group relative bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              style={{ backgroundColor: 'var(--color-bg)' }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {/* Skill Icon */}
              <div className="text-4xl mb-4 text-center">
                {skill.icon || '💻'}
              </div>

              {/* Skill Name */}
              <h3 className="text-lg font-semibold text-center mb-3" style={{ color: 'var(--color-text-primary)' }}>
                {skill.name}
              </h3>

              {/* Proficiency Bar */}
              {showProficiency && (
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                      {getProficiencyLabel(skill.proficiency)}
                    </span>
                    <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      {skill.proficiency}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${skill.proficiency}%`,
                        backgroundColor: getProficiencyColor(skill.proficiency)
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Category Badge */}
              <div className="text-center">
                <span 
                  className="px-2 py-1 text-xs rounded-full text-white font-medium"
                  style={{ 
                    backgroundColor: categories.find(c => c.id === skill.category)?.color || 'var(--color-primary)'
                  }}
                >
                  {skill.category}
                </span>
              </div>

              {/* Hover Description */}
              {hoveredSkill === skill.name && skill.description && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 rounded-lg shadow-lg max-w-xs z-10"
                     style={{ 
                       backgroundColor: 'var(--color-bg)',
                       border: '1px solid var(--color-border)'
                     }}>
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    {skill.description}
                  </p>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent"
                       style={{ borderTopColor: 'var(--color-bg)' }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        {showProficiency && (
          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Proficiency Levels
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { label: 'Expert (90-100%)', color: '#10B981' },
                { label: 'Advanced (80-89%)', color: '#10B981' },
                { label: 'Intermediate (60-79%)', color: '#F59E0B' },
                { label: 'Beginner (40-59%)', color: '#F97316' },
                { label: 'Learning (0-39%)', color: '#EF4444' }
              ].map((level, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: level.color }}
                  />
                  <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    {level.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredSkills.length === 0 && (
          <div className="text-center py-12">
            <p style={{ color: 'var(--color-text-secondary)' }}>
              No skills found for the selected category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
} 