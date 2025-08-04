"use client";

import { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';
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
      <section className={cn("py-16", className)}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--color-text-primary)' }}>
            Latest Blog Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(maxPosts)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={cn("py-16", className)}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--color-text-primary)' }}>
            Latest Blog Posts
          </h2>
          <div className="text-center py-8">
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Unable to load blog posts at the moment. Check out my Medium profile directly!
            </p>
            <a 
              href={`https://medium.com/@${mediumUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              View on Medium
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("py-16", className)}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--color-text-primary)' }}>
          Latest Blog Posts
        </h2>
        
        {posts.length === 0 ? (
          <div className="text-center py-8">
            <p style={{ color: 'var(--color-text-secondary)' }}>
              No blog posts found. Check out my Medium profile!
            </p>
            <a 
              href={`https://medium.com/@${mediumUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              View on Medium
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {posts.map((post, index) => (
              <article 
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 max-w-sm mx-auto w-full"
                style={{ backgroundColor: 'var(--color-bg)' }}
              >
                {post.thumbnail && (
                  <img 
                    src={post.thumbnail} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.categories.slice(0, 3).map((category, catIndex) => (
                      <span 
                        key={catIndex}
                        className="px-2 py-1 text-xs rounded-full"
                        style={{ 
                          backgroundColor: 'var(--color-primary)',
                          color: 'white',
                          opacity: 0.8
                        }}
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2" style={{ color: 'var(--color-text-primary)' }}>
                    {post.title}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                    {post.pubDate}
                  </p>
                  <p className="mb-4 line-clamp-3" style={{ color: 'var(--color-text-secondary)' }}>
                    {post.content}
                  </p>
                  <a 
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:underline"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    Read More
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <a 
            href={`https://medium.com/@${mediumUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border-2 rounded-lg hover:bg-primary hover:text-white transition-colors duration-300"
            style={{ 
              borderColor: 'var(--color-primary)',
              color: 'var(--color-primary)'
            }}
          >
            View All Posts on Medium
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 