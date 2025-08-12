"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import '../../theme/tokens.css';

interface GitHubCommit {
  message: string;
  repo: string;
  url: string;
  timestamp: string;
  author: string;
}

interface GitHubCommitBubbleProps {
  className?: string;
  githubUsername?: string;
}

export function GitHubCommitBubble({ 
  className, 
  githubUsername = 'maddyfarr'
}: GitHubCommitBubbleProps) {
  const { t } = useLanguage();
  const [latestCommit, setLatestCommit] = useState<GitHubCommit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchLatestCommit = async () => {
      if (!githubUsername) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // First, get the user's repositories
        const reposResponse = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=5`);
        
        if (!reposResponse.ok) {
          throw new Error('Failed to fetch repositories');
        }

        const repos = await reposResponse.json();
        
        // Get the latest commit from the most recently updated repository
        if (repos.length > 0) {
          const latestRepo = repos[0];
          const commitsResponse = await fetch(`https://api.github.com/repos/${latestRepo.full_name}/commits?per_page=1`);
          
          if (commitsResponse.ok) {
            const commits = await commitsResponse.json();
            
            if (commits.length > 0) {
              const commit = commits[0];
              setLatestCommit({
                message: commit.commit.message,
                repo: latestRepo.name,
                url: commit.html_url,
                timestamp: commit.commit.author.date,
                author: commit.commit.author.name
              });
            }
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch commit');
      } finally {
        setLoading(false);
        // Show the bubble after a short delay
        setTimeout(() => setIsVisible(true), 1000);
      }
    };

    fetchLatestCommit();
  }, [githubUsername]);

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const commitTime = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - commitTime.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return t('activity.justNow');
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}w ago`;
  };

  const truncateMessage = (message: string, maxLength: number = 60) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
  };

  if (loading || error || !latestCommit) {
    return null;
  }

  return (
    <div 
      className={className} 
      style={{ 
        position: 'absolute',
        top: '25%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        pointerEvents: 'none'
      }}
    >
      {/* Speech Bubble */}
      <div style={{
        position: 'relative',
        transform: `scale(${isVisible ? 1 : 0})`,
        maxWidth: '280px',
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: '16px',
        border: '2px solid var(--color-primary)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        padding: '12px 16px',
        fontSize: 'var(--font-size-sm)',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        pointerEvents: 'auto',
        cursor: 'pointer',
        zIndex: 10
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
      }}
      onClick={() => latestCommit.url && window.open(latestCommit.url, '_blank')}
      >
        {/* Speech Bubble Tail */}
        <div style={{
          position: 'absolute',
          bottom: '-8px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderTop: '8px solid var(--color-card-bg)',
          zIndex: 11
        }} />
        
        {/* Tail Border */}
        <div style={{
          position: 'absolute',
          bottom: '-10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '9px solid transparent',
          borderRight: '9px solid transparent',
          borderTop: '9px solid var(--color-primary)',
          zIndex: 9
        }} />

        {/* Commit Content */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          marginBottom: '8px' 
        }}>
          <span style={{ fontSize: '1rem' }}>☕</span>
          <span style={{ 
            color: 'var(--color-text-primary)',
            fontWeight: '600',
            fontSize: 'var(--font-size-sm)'
          }}>
            Latest Commit
          </span>
        </div>
        
        <p style={{ 
          color: 'var(--color-text-primary)',
          fontSize: 'var(--font-size-sm)',
          lineHeight: '1.4',
          margin: '0 0 6px 0',
          fontWeight: '500'
        }}>
          {truncateMessage(latestCommit.message)}
        </p>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-text-secondary)'
        }}>
          <span>{latestCommit.repo}</span>
          <span>{formatTimeAgo(latestCommit.timestamp)}</span>
        </div>
      </div>

      <style>{`
        @keyframes bubbleFloat {
          0%, 100% {
            transform: translateX(-50%) translateY(0px);
          }
          50% {
            transform: translateX(-50%) translateY(-4px);
          }
        }
      `}</style>
    </div>
  );
} 