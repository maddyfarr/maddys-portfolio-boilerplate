"use client";

import { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { useLanguage } from '../../context/LanguageContext';
import '../../theme/tokens.css';

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  thumbnail?: string;
  categories: string[];
}

interface BlogSectionProps {
  mediumUsername: string;
  className?: string;
  maxPosts?: number;
}

export function BlogSection({ 
  mediumUsername, 
  className, 
  maxPosts = 3 
}: BlogSectionProps) {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMediumPosts = async () => {
      try {
        setLoading(true);
        // Using RSS2JSON to fetch Medium posts
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumUsername}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }

        const data = await response.json();
        
        if (data.status === 'ok') {
          const formattedPosts: BlogPost[] = data.items.slice(0, maxPosts).map((item: any) => ({
            title: item.title,
            link: item.link,
            pubDate: new Date(item.pubDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            content: item.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
            categories: item.categories || []
          }));
          
          setPosts(formattedPosts);
        } else {
          throw new Error('Invalid RSS feed');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    if (mediumUsername) {
      fetchMediumPosts();
    }
  }, [mediumUsername, maxPosts]);

  if (loading) {
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
            marginBottom: 'var(--spacing-xl)',
            color: 'var(--color-text-primary)'
          }}>
            {t('blog.title')}
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: 'var(--spacing-lg)',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {[...Array(maxPosts)].map((_, i) => (
              <div key={i} style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
                <div style={{ 
                  backgroundColor: 'var(--color-secondary)', 
                  height: '12rem', 
                  borderRadius: 'var(--radius-lg)', 
                  marginBottom: 'var(--spacing-md)' 
                }}></div>
                <div style={{ 
                  height: '1rem', 
                  backgroundColor: 'var(--color-secondary)', 
                  borderRadius: 'var(--radius-sm)', 
                  marginBottom: 'var(--spacing-sm)' 
                }}></div>
                <div style={{ 
                  height: '1rem', 
                  backgroundColor: 'var(--color-secondary)', 
                  borderRadius: 'var(--radius-sm)', 
                  width: '75%', 
                  marginBottom: 'var(--spacing-sm)' 
                }}></div>
                <div style={{ 
                  height: '0.75rem', 
                  backgroundColor: 'var(--color-secondary)', 
                  borderRadius: 'var(--radius-sm)', 
                  width: '50%' 
                }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
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
            marginBottom: 'var(--spacing-xl)',
            color: 'var(--color-text-primary)'
          }}>
            {t('blog.title')}
          </h2>
          <div style={{ textAlign: 'center', paddingTop: 'var(--spacing-lg)', paddingBottom: 'var(--spacing-lg)' }}>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              {t('blog.unableToLoad')}
            </p>
            <a 
              href={`https://medium.com/@${mediumUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                display: 'inline-block',
                marginTop: 'var(--spacing-md)',
                paddingLeft: 'var(--spacing-lg)',
                paddingRight: 'var(--spacing-lg)',
                paddingTop: 'var(--spacing-md)',
                paddingBottom: 'var(--spacing-md)',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                borderRadius: 'var(--radius-lg)',
                textDecoration: 'none',
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              View on Medium
            </a>
          </div>
        </div>
      </section>
    );
  }

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
          marginBottom: 'var(--spacing-xl)',
          color: 'var(--color-text-primary)'
        }}>
          {t('blog.title')}
        </h2>
        
        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: 'var(--spacing-lg)', paddingBottom: 'var(--spacing-lg)' }}>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              {t('blog.noPosts')}
            </p>
            <a 
              href={`https://medium.com/@${mediumUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                display: 'inline-block',
                marginTop: 'var(--spacing-md)',
                paddingLeft: 'var(--spacing-lg)',
                paddingRight: 'var(--spacing-lg)',
                paddingTop: 'var(--spacing-md)',
                paddingBottom: 'var(--spacing-md)',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                borderRadius: 'var(--radius-lg)',
                textDecoration: 'none',
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              View on Medium
            </a>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: 'var(--spacing-lg)',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {posts.map((post, index) => (
              <article 
                key={index}
                style={{ 
                  backgroundColor: 'var(--color-card-bg)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  overflow: 'hidden',
                  maxWidth: '24rem',
                  margin: '0 auto',
                  width: '100%',
                  transition: 'box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'}
              >
                {post.thumbnail && (
                  <img 
                    src={post.thumbnail} 
                    alt={post.title}
                    style={{ 
                      width: '100%', 
                      height: '12rem', 
                      objectFit: 'cover' 
                    }}
                  />
                )}
                <div style={{ paddingTop: 'var(--spacing-md)', paddingLeft: 'var(--spacing-md)', paddingRight: 'var(--spacing-md)', paddingBottom: 'var(--spacing-md)' }}>
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 'var(--spacing-sm)', 
                    marginBottom: 'var(--spacing-md)' 
                  }}>
                    {post.categories.slice(0, 3).map((category, catIndex) => (
                      <span 
                        key={catIndex}
                        style={{ 
                          paddingLeft: 'var(--spacing-sm)',
                          paddingRight: 'var(--spacing-sm)',
                          paddingTop: 'var(--spacing-xs)',
                          paddingBottom: 'var(--spacing-xs)',
                          fontSize: 'var(--font-size-xs)',
                          borderRadius: '9999px',
                          color: 'var(--color-text-primary)',
                          opacity: 0.8
                        }}
                      >
                        {' #'+ category}
                      </span>
                    ))}
                  </div>
                  <h3 style={{ 
                    fontSize: 'var(--font-size-xl)', 
                    fontWeight: '600', 
                    marginBottom: 'var(--spacing-sm)',
                    color: 'var(--color-text-primary)',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {post.title}
                  </h3>
                  <p style={{ 
                    fontSize: 'var(--font-size-sm)', 
                    marginBottom: 'var(--spacing-md)',
                    color: 'var(--color-text-secondary)' 
                  }}>
                    {post.pubDate}
                  </p>
                  <p style={{ 
                    marginBottom: 'var(--spacing-md)',
                    color: 'var(--color-text-secondary)',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {post.content}
                  </p>
                  <a 
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      color: 'var(--color-primary)',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                  >
                    {t('blog.readMore')}
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
        
        <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)' }}>
          <a 
            href={`https://medium.com/@${mediumUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              paddingLeft: 'var(--spacing-lg)',
              paddingRight: 'var(--spacing-lg)',
              paddingTop: 'var(--spacing-md)',
              paddingBottom: 'var(--spacing-md)',
              border: '2px solid var(--color-primary)',
              borderRadius: 'var(--radius-lg)',
              color: 'var(--color-primary)',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary)';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--color-primary)';
            }}
          >
            {t('blog.viewAllPosts')}
          </a>
        </div>
      </div>
    </section>
  );
} 