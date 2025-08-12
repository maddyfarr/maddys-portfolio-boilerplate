"use client";

import { useLanguage } from '../../context/LanguageContext';
import '../../theme/tokens.css';

interface ContactProps {
  className?: string;
  email?: string;
  sectionBackground?: 'beige' | 'white';
}

export function Contact({ 
  className, 
  email = 'madeleinefarr98@gmail.com',
  sectionBackground = 'beige'
}: ContactProps) {
  const { t } = useLanguage();

  const getCardBackground = () => {
    return sectionBackground === 'white' ? '#f7f6f3' : '#ffffff';
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <section 
      className={className}
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
          {t('contact.title')}
        </h2>
        <p style={{ 
          textAlign: 'center', 
          marginBottom: 'var(--spacing-xl)', 
          maxWidth: '42rem', 
          marginLeft: 'auto', 
          marginRight: 'auto',
          color: 'var(--color-text-secondary)' 
        }}>
          {t('contact.description')}
        </p>

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: 'var(--spacing-lg)' 
        }}>
          {/* Email Card */}
          <div style={{
            backgroundColor: getCardBackground(),
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-xl)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            border: '1px solid var(--color-border)',
            maxWidth: '400px',
            width: '100%',
            textAlign: 'center',
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
          onClick={handleEmailClick}
          >
            <div style={{ 
              fontSize: '3rem', 
              marginBottom: 'var(--spacing-md)',
              color: 'var(--color-primary)'
            }}>
              📧
            </div>
            <h3 style={{ 
              fontSize: 'var(--font-size-lg)', 
              fontWeight: '600',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--spacing-sm)'
            }}>
              {t('contact.email')}
            </h3>
            <p style={{ 
              fontSize: 'var(--font-size-base)',
              color: 'var(--color-primary)',
              fontWeight: '500',
              wordBreak: 'break-word'
            }}>
              {email}
            </p>
            <p style={{ 
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-secondary)',
              marginTop: 'var(--spacing-sm)'
            }}>
              {t('contact.clickToEmail')}
            </p>
          </div>

          {/* Additional Contact Info */}
          <div style={{
            backgroundColor: getCardBackground(),
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-lg)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            border: '1px solid var(--color-border)',
            maxWidth: '400px',
            width: '100%',
            textAlign: 'center'
          }}>
            <div style={{ 
              fontSize: '2rem', 
              marginBottom: 'var(--spacing-md)',
              color: 'var(--color-primary)'
            }}>
              💼
            </div>
            <h3 style={{ 
              fontSize: 'var(--font-size-lg)', 
              fontWeight: '600',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--spacing-sm)'
            }}>
              {t('contact.availability')}
            </h3>
            <p style={{ 
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-secondary)',
              lineHeight: '1.5'
            }}>
              {t('contact.availabilityDescription')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 