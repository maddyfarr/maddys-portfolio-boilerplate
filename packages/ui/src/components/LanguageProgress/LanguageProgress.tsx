"use client";

import { useState } from 'react';
import { cn } from '../../utils/cn';
import { useLanguage } from '../../context/LanguageContext';
import '../../theme/tokens.css';

interface Language {
  name: string;
  code: string;
  flag: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Native';
  subLevel?: number; // 1-3 for A1.1, A1.2, A1.3 etc.
  hoursStudied?: number;
  targetHours?: number; // Hours needed to reach C2
  description?: string;
  isNative?: boolean;
}

interface LanguageProgressProps {
  languages?: Language[];
  className?: string;
  showHours?: boolean;
  sectionBackground?: 'beige' | 'white';
}

const defaultLanguages: Language[] = [
  {
    name: 'English',
    code: 'en',
    flag: '🇬🇧',
    level: 'Native',
    description: 'Mother tongue - Fluent in speaking, reading, and writing',
    isNative: true
  },
  {
    name: 'German',
    code: 'de',
    flag: '🇩🇪',
    level: 'A1',
    subLevel: 2, // A1.2
    hoursStudied: 45,
    targetHours: 1000, // Approximate hours to reach C2
    description: 'Learning German for travel and cultural exchange'
  }
];

// CEFR level definitions and approximate hours
const getCefrLevels = (t: (key: string) => string) => ({
  'A1': { name: t('languages.beginner'), hours: 0, color: '#EF4444' },
  'A2': { name: t('languages.elementary'), hours: 180, color: '#F97316' },
  'B1': { name: t('languages.intermediate'), hours: 350, color: '#F59E0B' },
  'B2': { name: t('languages.upperIntermediate'), hours: 600, color: '#10B981' },
  'C1': { name: t('languages.advanced'), hours: 800, color: '#3B82F6' },
  'C2': { name: t('languages.mastery'), hours: 1000, color: '#8B5CF6' },
  'Native': { name: t('languages.nativeSpeaker'), hours: 0, color: '#8B5CF6' }
});

export function LanguageProgress({ 
  languages = defaultLanguages, 
  className, 
  showHours = true,
  sectionBackground = 'beige'
}: LanguageProgressProps) {
  const { t } = useLanguage();
  const [hoveredLanguage, setHoveredLanguage] = useState<string | null>(null);
  const cefrLevels = getCefrLevels(t);

  const getCardBackground = () => {
    return sectionBackground === 'white' ? '#f7f6f3' : '#ffffff';
  };

  const getLevelProgress = (language: Language) => {
    if (language.isNative) return 100;
    
    const currentLevel = cefrLevels[language.level];
    const nextLevel = language.level === 'C2' ? null : 
      Object.keys(cefrLevels).find(key => key !== 'Native' && cefrLevels[key as keyof typeof cefrLevels].hours > currentLevel.hours);
    
    if (!nextLevel || !language.hoursStudied) return 0;
    
    const nextLevelHours = cefrLevels[nextLevel as keyof typeof cefrLevels].hours;
    const progress = Math.min(100, (language.hoursStudied / nextLevelHours) * 100);
    return progress;
  };

  const getCurrentLevelHours = (language: Language) => {
    if (language.isNative) return 0;
    return cefrLevels[language.level].hours;
  };

  const getNextLevelHours = (language: Language) => {
    if (language.isNative) return 0;
    
    const levels = Object.keys(cefrLevels).filter(key => key !== 'Native');
    const currentIndex = levels.indexOf(language.level);
    if (currentIndex === -1 || currentIndex === levels.length - 1) return 0;
    
    const nextLevel = levels[currentIndex + 1];
    return cefrLevels[nextLevel as keyof typeof cefrLevels].hours;
  };

  const formatLevel = (language: Language) => {
    if (language.isNative) return 'Native';
    if (language.subLevel) {
      return `${language.level}.${language.subLevel}`;
    }
    return language.level;
  };

  const getLevelColor = (level: string) => {
    return cefrLevels[level as keyof typeof cefrLevels]?.color || 'var(--color-primary)';
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
          {t('languages.title')}
        </h2>
        <p style={{ 
          textAlign: 'center', 
          marginBottom: 'var(--spacing-xl)', 
          maxWidth: '42rem', 
          marginLeft: 'auto', 
          marginRight: 'auto',
          color: 'var(--color-text-secondary)' 
        }}>
          {t('languages.description')}
        </p>

        {/* Languages Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: 'var(--spacing-lg)',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {languages.map(language => {
            const progress = getLevelProgress(language);
            const currentLevelHours = getCurrentLevelHours(language);
            const nextLevelHours = getNextLevelHours(language);
            
            return (
              <div
                key={language.code}
                style={{ 
                  position: 'relative',
                  backgroundColor: getCardBackground(),
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--spacing-lg)',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '1px solid var(--color-border)'
                }}
                onMouseEnter={(e) => {
                  setHoveredLanguage(language.code);
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  setHoveredLanguage(null);
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Language Header */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 'var(--spacing-md)', 
                  marginBottom: 'var(--spacing-lg)' 
                }}>
                  <div style={{ 
                    fontSize: '2rem', 
                    width: '3rem', 
                    height: '3rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'var(--color-secondary)'
                  }}>
                    {language.flag}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      fontSize: 'var(--font-size-xl)', 
                      fontWeight: '600',
                      color: 'var(--color-text-primary)',
                      marginBottom: 'var(--spacing-xs)'
                    }}>
                      {language.name}
                    </h3>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 'var(--spacing-sm)' 
                    }}>
                      <span style={{ 
                        padding: 'var(--spacing-xs) var(--spacing-sm)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: '600',
                        color: 'white',
                        backgroundColor: getLevelColor(language.level)
                      }}>
                        {formatLevel(language)}
                      </span>
                      {!language.isNative && (
                        <span style={{ 
                          fontSize: 'var(--font-size-sm)',
                          color: 'var(--color-text-secondary)'
                        }}>
                          {cefrLevels[language.level].name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Progress Section */}
                {!language.isNative && showHours && (
                  <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      marginBottom: 'var(--spacing-sm)' 
                    }}>
                                          <span style={{ 
                      fontSize: 'var(--font-size-sm)', 
                      color: 'var(--color-text-secondary)' 
                    }}>
                      {t('languages.progressToNext')}
                    </span>
                      <span style={{ 
                        fontSize: 'var(--font-size-sm)', 
                        fontWeight: '500',
                        color: 'var(--color-text-primary)' 
                      }}>
                        {Math.round(progress)}%
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div style={{ 
                      width: '100%', 
                      backgroundColor: 'var(--color-secondary)', 
                      borderRadius: '9999px', 
                      height: '0.5rem',
                      marginBottom: 'var(--spacing-sm)'
                    }}>
                      <div 
                        style={{ 
                          height: '0.5rem', 
                          borderRadius: '9999px', 
                          transition: 'all 0.5s ease',
                          width: `${progress}%`,
                          backgroundColor: getLevelColor(language.level)
                        }}
                      />
                    </div>
                    
                    {/* Hours Info */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-text-secondary)'
                    }}>
                      <span>{language.hoursStudied || 0}{t('languages.hoursStudied')}</span>
                      {nextLevelHours > 0 && (
                        <span>{nextLevelHours}{t('languages.hoursToNext')}</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Native Speaker Badge */}
                {language.isNative && (
                  <div style={{ 
                    textAlign: 'center',
                    padding: 'var(--spacing-md)',
                    backgroundColor: 'var(--color-secondary)',
                    borderRadius: 'var(--radius-lg)',
                    marginBottom: 'var(--spacing-lg)'
                  }}>
                    <span style={{ 
                      fontSize: 'var(--font-size-lg)',
                      fontWeight: '600',
                      color: 'var(--color-text-primary)'
                    }}>
                      🎯 {t('languages.nativeSpeaker')}
                    </span>
                  </div>
                )}

                {/* Description */}
                {language.description && (
                  <p style={{ 
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.5'
                  }}>
                    {language.description}
                  </p>
                )}

                {/* Hover Description */}
                {hoveredLanguage === language.code && language.description && (
                  <div style={{ 
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginBottom: 'var(--spacing-sm)',
                    padding: 'var(--spacing-md)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    maxWidth: '20rem',
                    zIndex: 10,
                    backgroundColor: getCardBackground(),
                    border: '1px solid var(--color-border)'
                  }}>
                    <p style={{ 
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-text-secondary)' 
                    }}>
                      {language.description}
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
            );
          })}
        </div>

        {/* CEFR Levels Legend */}
        <div style={{ marginTop: 'var(--spacing-xl)', textAlign: 'center' }}>
          <h3 style={{ 
            fontSize: 'var(--font-size-lg)', 
            fontWeight: '600', 
            marginBottom: 'var(--spacing-md)',
            color: 'var(--color-text-primary)' 
          }}>
            {t('languages.cefrLevels')}
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: 'var(--spacing-md)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {Object.entries(cefrLevels).filter(([key]) => key !== 'Native').map(([level, info]) => (
              <div key={level} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 'var(--spacing-sm)',
                padding: 'var(--spacing-sm)',
                backgroundColor: getCardBackground(),
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)'
              }}>
                <div 
                  style={{ 
                    width: '0.75rem', 
                    height: '0.75rem', 
                    borderRadius: '50%',
                    backgroundColor: info.color 
                  }}
                />
                <div>
                  <span style={{ 
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: '600',
                    color: 'var(--color-text-primary)'
                  }}>
                    {level}
                  </span>
                  <div style={{ 
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-secondary)'
                  }}>
                    {info.name} ({info.hours}h)
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 