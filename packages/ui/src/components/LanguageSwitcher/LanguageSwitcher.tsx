"use client";

import { useLanguage } from '../../context/LanguageContext';
import '../../theme/tokens.css';

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'de' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-xs)',
        padding: 'var(--spacing-xs) var(--spacing-sm)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)',
        backgroundColor: 'transparent',
        color: 'var(--color-text-primary)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        fontSize: 'var(--font-size-sm)',
        fontWeight: '500'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
        e.currentTarget.style.borderColor = 'var(--color-primary)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.borderColor = 'var(--color-border)';
      }}
      aria-label={`Switch to ${language === 'en' ? 'German' : 'English'}`}
    >
      <span style={{ fontSize: '1.1em' }}>
        {language === 'en' ? '🇩🇪' : '🇺🇸'}
      </span>
      <span>{t(`language.${language === 'en' ? 'de' : 'en'}`)}</span>
    </button>
  );
} 