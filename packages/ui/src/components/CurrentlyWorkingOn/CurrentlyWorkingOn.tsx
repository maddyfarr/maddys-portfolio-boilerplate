"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import '../../theme/tokens.css';

interface GitHubActivity {
  type: 'push' | 'issue' | 'pull_request' | 'commit' | 'repository';
  repo: string;
  title: string;
  description?: string;
  url: string;
  timestamp: string;
  language?: string;
}

interface CurrentlyWorkingOnProps {
  className?: string;
  githubUsername?: string;
  customActivities?: Array<{
    type: 'project' | 'learning' | 'contribution' | 'experiment';
    title: string;
    description: string;
    url?: string;
    status: 'in-progress' | 'planning' | 'completed';
    tech?: string[];
  }>;
}

export function CurrentlyWorkingOn({ 
  className, 
  githubUsername = 'maddyfarr',
  customActivities = []
}: CurrentlyWorkingOnProps) {
  const { t } = useLanguage();
  const [githubActivities, setGitHubActivities] = useState<GitHubActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubActivity = async () => {
      if (!githubUsername) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Using GitHub API to fetch recent activity
        const response = await fetch(`https://api.github.com/users/${githubUsername}/events?per_page=10`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub activity');
        }

        const events = await response.json();
        
        const activities: GitHubActivity[] = events
          .filter((event: any) => 
            ['PushEvent', 'IssuesEvent', 'PullRequestEvent', 'CreateEvent'].includes(event.type)
          )
          .slice(0, 5)
          .map((event: any) => {
            let activity: GitHubActivity = {
              type: 'push',
              repo: event.repo.name,
              title: '',
              url: '',
              timestamp: event.created_at
            };

            switch (event.type) {
              case 'PushEvent':
                activity.type = 'push';
                activity.title = `Pushed to ${event.repo.name}`;
                activity.url = `https://github.com/${event.repo.name}`;
                activity.description = event.payload.commits?.[0]?.message || 'Code update';
                break;
              case 'IssuesEvent':
                activity.type = 'issue';
                activity.title = `${event.payload.action} issue in ${event.repo.name}`;
                activity.url = event.payload.issue?.html_url || '';
                activity.description = event.payload.issue?.title || '';
                break;
              case 'PullRequestEvent':
                activity.type = 'pull_request';
                activity.title = `${event.payload.action} PR in ${event.repo.name}`;
                activity.url = event.payload.pull_request?.html_url || '';
                activity.description = event.payload.pull_request?.title || '';
                break;
              case 'CreateEvent':
                activity.type = 'repository';
                activity.title = `Created ${event.payload.ref_type} in ${event.repo.name}`;
                activity.url = `https://github.com/${event.repo.name}`;
                activity.description = event.payload.description || '';
                break;
            }

            return activity;
          });

        setGitHubActivities(activities);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch activity');
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubActivity();
  }, [githubUsername]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress':
        return '#10B981'; // Green
      case 'planning':
        return '#F59E0B'; // Yellow
      case 'completed':
        return '#3B82F6'; // Blue
      default:
        return 'var(--color-primary)';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'push':
      case 'commit':
        return '💻';
      case 'issue':
        return '🐛';
      case 'pull_request':
        return '🔀';
      case 'repository':
        return '📁';
      case 'project':
        return '🚀';
      case 'learning':
        return '📚';
      case 'contribution':
        return '🤝';
      case 'experiment':
        return '🧪';
      default:
        return '⚡';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - activityTime.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return t('activity.justNow');
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}w ago`;
  };

  const customProjects = customActivities.map(activity => ({
    ...activity,
    timestamp: new Date().toISOString(), // Custom activities are recent
    url: activity.url || '#'
  }));

  if (loading) {
    return (
      <section 
        className={className}
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
            marginBottom: 'var(--spacing-xl)',
            color: 'var(--color-text-primary)' 
          }}>
            {t('currentlyWorking.title')}
          </h2>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {/* Projects Loading */}
            <div style={{ width: '100%' }}>
              <div style={{ 
                height: '1.5rem', 
                backgroundColor: 'var(--color-secondary)', 
                borderRadius: 'var(--radius-sm)', 
                marginBottom: 'var(--spacing-lg)',
                width: '40%',
                margin: '0 auto',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}></div>
              {[...Array(3)].map((_, i) => (
                <div key={i} style={{ 
                  backgroundColor: 'var(--color-bg)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--spacing-lg)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  marginBottom: 'var(--spacing-lg)',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                }}>
                  <div style={{ 
                    height: '1rem', 
                    backgroundColor: 'var(--color-secondary)', 
                    borderRadius: 'var(--radius-sm)', 
                    marginBottom: 'var(--spacing-sm)',
                    width: '60%' 
                  }}></div>
                  <div style={{ 
                    height: '0.75rem', 
                    backgroundColor: 'var(--color-secondary)', 
                    borderRadius: 'var(--radius-sm)', 
                    width: '80%' 
                  }}></div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className={className}
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
          {t('currentlyWorking.title')}
        </h2>
        <p style={{ 
          textAlign: 'center', 
          marginBottom: 'var(--spacing-xl)', 
          maxWidth: '42rem', 
          marginLeft: 'auto', 
          marginRight: 'auto',
          color: 'var(--color-text-secondary)' 
        }}>
          {t('currentlyWorking.description')}
        </p>

        {error && (
          <div style={{ 
            textAlign: 'center', 
            padding: 'var(--spacing-lg)', 
            color: 'var(--color-text-secondary)' 
          }}>
            <p>{t('currentlyWorking.error')}</p>
          </div>
        )}

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {/* Projects Section */}
          <div style={{ width: '100%' }}>
            <h3 style={{ 
              fontSize: 'var(--font-size-xl)', 
              fontWeight: '600',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--spacing-lg)',
              textAlign: 'center'
            }}>
              {t('currentlyWorking.projects')}
            </h3>
            
            {customProjects.length > 0 ? (
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 'var(--spacing-lg)' 
              }}>
                {customProjects.map((activity, index) => (
                  <div
                    key={index}
                    style={{ 
                      backgroundColor: 'var(--color-card-bg)',
                      borderRadius: 'var(--radius-lg)',
                      padding: 'var(--spacing-lg)',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      border: '1px solid var(--color-border)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    onClick={() => activity.url && activity.url !== '#' && window.open(activity.url, '_blank')}
                  >
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 'var(--spacing-sm)', 
                      marginBottom: 'var(--spacing-sm)' 
                    }}>
                      <span style={{ fontSize: '1.5rem' }}>
                        {getActivityIcon(activity.type)}
                      </span>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ 
                          fontSize: 'var(--font-size-lg)', 
                          fontWeight: '600',
                          color: 'var(--color-text-primary)',
                          marginBottom: 'var(--spacing-xs)'
                        }}>
                          {activity.title}
                        </h4>
                        <p style={{ 
                          fontSize: 'var(--font-size-sm)',
                          color: 'var(--color-text-secondary)'
                        }}>
                          {formatTimeAgo(activity.timestamp)}
                        </p>
                      </div>
                      {'status' in activity && (
                        <span style={{ 
                          padding: 'var(--spacing-xs) var(--spacing-sm)',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: '500',
                          color: 'white',
                          backgroundColor: getStatusColor(activity.status)
                        }}>
                          {activity.status}
                        </span>
                      )}
                    </div>
                    
                    {activity.description && (
                      <p style={{ 
                        color: 'var(--color-text-secondary)',
                        fontSize: 'var(--font-size-sm)',
                        lineHeight: '1.5',
                        marginBottom: 'var(--spacing-sm)'
                      }}>
                        {activity.description}
                      </p>
                    )}

                    {'tech' in activity && activity.tech && activity.tech.length > 0 && (
                      <div style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: 'var(--spacing-xs)' 
                      }}>
                        {activity.tech.map((tech: string, techIndex: number) => (
                          <span key={techIndex} style={{ 
                            padding: 'var(--spacing-xs) var(--spacing-sm)',
                            fontSize: 'var(--font-size-xs)',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'var(--color-secondary)',
                            color: 'var(--color-text-secondary)'
                          }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: 'var(--spacing-lg)', 
                color: 'var(--color-text-secondary)' 
              }}>
                <p>{t('currentlyWorking.noProjects')}</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
} 