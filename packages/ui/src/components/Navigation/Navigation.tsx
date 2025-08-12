"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '../../utils/cn';
import { Button } from '../Button/Button';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';
import { useLanguage } from '../../context/LanguageContext';
import { AnimatedLogo } from '../AnimatedLogo/AnimatedLogo';
import './navigation.css';

interface NavLink {
  href: string;
  label: string;
  isActive?: boolean;
}

interface NavigationProps {
  className?: string;
  links?: NavLink[];
  logo?: string;
}

export const Navigation = ({
  className,
  links,
  logo = 'MF'
}: NavigationProps) => {
  const { t } = useLanguage();
  
  const defaultLinks: NavLink[] = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#skills', label: t('nav.skills') },
    { href: '#languages', label: t('nav.languages') },
    { href: '#blog', label: t('nav.blog') },
    { href: '#experience', label: t('nav.experience') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#contact', label: t('nav.contact') }
  ];

  const navLinks = links || defaultLinks;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scrolling
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false); // Close mobile menu
  };

  // Handle mobile menu toggle
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={cn(
      'navigation',
      isScrolled && 'navigation--scrolled',
      className
    )}>
      <div className="navigation__container">
        {/* Logo */}
        <div className="navigation__logo">
          <button
            onClick={() => handleNavClick('#home')}
            className="navigation__logo-button"
          >
            <Image
              src="/initial-logo.png"
              alt="Madeleine Farr"
              width={60}
              height={60}
              priority
            />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="navigation__desktop">
          <ul className="navigation__links">
            {navLinks.map((link) => (
              <li key={link.href} className="navigation__item">
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    'navigation__link',
                    link.isActive && 'navigation__link--active'
                  )}
                >
                  {link.label}
                  <span className="navigation__link-underline" />
                </button>
              </li>
            ))}
          </ul>

          <div className="navigation__actions">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button
              variant="primary"
              label="Resume"
              size="small"
              onClick={() => window.open('/resume.pdf', '_blank')}
            />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={cn(
            'navigation__mobile-toggle',
            isMenuOpen && 'navigation__mobile-toggle--active'
          )}
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
        >
          <span className="navigation__mobile-toggle-line" />
          <span className="navigation__mobile-toggle-line" />
          <span className="navigation__mobile-toggle-line" />
        </button>

        {/* Mobile Navigation */}
        <div className={cn(
          'navigation__mobile',
          isMenuOpen && 'navigation__mobile--open'
        )}>
          <ul className="navigation__mobile-links">
            {navLinks.map((link) => (
              <li key={link.href} className="navigation__mobile-item">
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    'navigation__mobile-link',
                    link.isActive && 'navigation__mobile-link--active'
                  )}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="navigation__mobile-actions">
            <ThemeToggle />
            <Button
              variant="primary"
              label="Resume"
              size="small"
              onClick={() => window.open('/resume.pdf', '_blank')}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}; 