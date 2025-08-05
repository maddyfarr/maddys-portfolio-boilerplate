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
}

interface GitHubActivityBubblesProps {
  className?: string;
  githubUsername?: string;
  maxBubbles?: number;
}

export function GitHubActivityBubbles({ 
  className, 
  githubUsername = 'maddyfarr',
  maxBubbles = 3
}: GitHubActivityBubblesProps) {
  const { t } = useLanguage();
  const [activities, setActivities] = useState<GitHubActivity[]>([]);
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
        const response = await fetch(`https://api.github.com/users/${githubUsername}/events?per_page=10`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub activity');
        }

        const events = await response.json();
        
        const activities: GitHubActivity[] = events
          .filter((event: any) => 
            ['PushEvent', 'IssuesEvent', 'PullRequestEvent', 'CreateEvent'].includes(event.type)
          )
          .slice(0, maxBubbles)
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
                activity.title = `Pushed to ${event.repo.name.split('/')[1]}`;
                activity.url = `https://github.com/${event.repo.name}`;
                activity.description = event.payload.commits?.[0]?.message || 'Code update';
                break;
              case 'IssuesEvent':
                activity.type = 'issue';
                activity.title = `${event.payload.action} issue`;
                activity.url = event.payload.issue?.html_url || '';
                activity.description = event.payload.issue?.title || '';
                break;
              case 'PullRequestEvent':
                activity.type = 'pull_request';
                activity.title = `${event.payload.action} PR`;
                activity.url = event.payload.pull_request?.html_url || '';
                activity.description = event.payload.pull_request?.title || '';
                break;
              case 'CreateEvent':
                activity.type = 'repository';
                activity.title = `Created ${event.payload.ref_type}`;
                activity.url = `https://github.com/${event.repo.name}`;
                activity.description = event.payload.description || '';
                break;
            }

            return activity;
          });

        setActivities(activities);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch activity');
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubActivity();
  }, [githubUsername, maxBubbles]);

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
      default:
        return '⚡';
    }
  };

  const getBubblePosition = (index: number) => {
    const positions = [
      { top: '0px', right: '0px', animationDelay: '0s' },
      { top: '60px', right: '0px', animationDelay: '1s' },
      { top: '120px', right: '0px', animationDelay: '2s' },
      { top: '30px', right: '0px', animationDelay: '0.5s' },
      { top: '90px', right: '0px', animationDelay: '1.5s' }
    ];
    return positions[index % positions.length] || positions[0];
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

  if (loading) {
    return (
      <div className={className} style={{ position: 'relative' }}>
        {[...Array(maxBubbles)].map((_, i) => {
          const position = getBubblePosition(i);
          if (!position) return null;
          return (
            <div
              key={i}
                           style={{
               position: 'absolute',
               top: position.top,
               right: position.right,
               width: '100px',
               height: '45px',
               backgroundColor: 'var(--color-bg)',
               borderRadius: '12px',
               border: '2px solid var(--color-border)',
               boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
               animation: 'bubbleFloat 3s ease-in-out infinite',
               animationDelay: position.animationDelay,
               opacity: 0.7
             }}
            >
                             <div style={{ 
                 height: '0.4rem', 
                 backgroundColor: 'var(--color-secondary)', 
                 borderRadius: 'var(--radius-sm)', 
                 margin: '6px',
                 width: '70%',
                 animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
               }}></div>
               <div style={{ 
                 height: '0.3rem', 
                 backgroundColor: 'var(--color-secondary)', 
                 borderRadius: 'var(--radius-sm)', 
                 margin: '6px',
                 width: '50%',
                 animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
               }}></div>
            </div>
          );
        })}
      </div>
    );
  }

  if (error || activities.length === 0) {
    return null; // Don't show anything if there's an error or no activities
  }

  return (
    <div className={className} style={{ position: 'relative' }}>
      {activities.map((activity, index) => {
        const position = getBubblePosition(index);
        if (!position) return null;
        return (
          <div
            key={index}
                         style={{
               position: 'absolute',
               top: position.top,
               right: position.right,
               maxWidth: '120px',
               backgroundColor: 'var(--color-bg)',
               borderRadius: '10px',
               border: '2px solid var(--color-primary)',
               boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
               padding: '6px 8px',
               fontSize: 'var(--font-size-xs)',
               animation: 'bubbleFloat 4s ease-in-out infinite',
               animationDelay: position.animationDelay,
               cursor: 'pointer',
               zIndex: 10,
               transition: 'all 0.3s ease'
             }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
            onClick={() => activity.url && window.open(activity.url, '_blank')}
          >
                         {/* No tail needed for top-right corner positioning */}
            
                         <div style={{ 
               display: 'flex', 
               alignItems: 'center', 
               gap: '3px', 
               marginBottom: '3px' 
             }}>
               <span style={{ fontSize: '0.7rem' }}>
                 {getActivityIcon(activity.type)}
               </span>
               <span style={{ 
                 color: 'var(--color-text-primary)',
                 fontWeight: '600',
                 fontSize: 'var(--font-size-xs)',
                 whiteSpace: 'nowrap',
                 overflow: 'hidden',
                 textOverflow: 'ellipsis'
               }}>
                 {activity.title}
               </span>
             </div>
            
                         {activity.description && (
               <p style={{ 
                 color: 'var(--color-text-secondary)',
                 fontSize: 'var(--font-size-xs)',
                 lineHeight: '1.2',
                 margin: '0',
                 whiteSpace: 'nowrap',
                 overflow: 'hidden',
                 textOverflow: 'ellipsis'
               }}>
                 {activity.description}
               </p>
             )}
             
             <p style={{ 
               color: 'var(--color-text-secondary)',
               fontSize: 'var(--font-size-xs)',
               margin: '2px 0 0 0',
               opacity: 0.8
             }}>
               {formatTimeAgo(activity.timestamp)}
             </p>
          </div>
        );
      })}

      <style>{`
        @keyframes bubbleFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-8px) rotate(1deg);
          }
          50% {
            transform: translateY(-4px) rotate(-1deg);
          }
          75% {
            transform: translateY(-6px) rotate(0.5deg);
          }
        }
      `}</style>
    </div>
  );
} 