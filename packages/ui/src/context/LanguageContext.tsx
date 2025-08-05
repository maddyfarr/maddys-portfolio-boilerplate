"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',

    // Hero Section
    'hero.title': 'Madeleine Farr',
    'hero.subtitle': 'Software Engineer',
    'hero.viewWork': 'View My Work',
    'hero.downloadResume': 'Download Resume',

    // About Section
    'about.title': 'About Me',
    'about.description': "I'm a passionate software engineer who loves building beautiful, accessible user experiences. I specialize in React, TypeScript, and modern web technologies.",

    // Skills Section
    'skills.title': 'Skills & Technologies',
    'skills.description': "Here's what I work with. I'm always learning new technologies and improving my existing skills.",
    'skills.allSkills': 'All Skills',
    'skills.frontend': 'Frontend',
    'skills.backend': 'Backend',
    'skills.tools': 'Tools',
    'skills.learning': 'Learning',
    'skills.featuredOnly': 'Featured Only',
    'skills.proficiencyLevels': 'Proficiency Levels',
    'skills.expert': 'Expert (90-100%)',
    'skills.advanced': 'Advanced (80-89%)',
    'skills.intermediate': 'Intermediate (60-79%)',
    'skills.beginner': 'Beginner (40-59%)',
    'skills.learningLevel': 'Learning (0-39%)',
    'skills.noSkillsFound': 'No skills found for the selected category.',

    // Experience Section
    'experience.title': 'Experience (5 years)',
    'experience.seniorEngineer': 'Fullstack Software Engineer',
    'experience.fullStackEngineer': 'Full Stack Engineer',
    'experience.frontendDeveloper': 'Frontend Developer',
    'experience.internship': 'Internship: Software Engineering, Community Engagement & UI Design',
    'experience.seniorDescription': 'Development of modern web applications using React, TypeScript, and Next.js.',
    'experience.fullStackDescription': 'Managed iOS apps, worked on backend services, and worked on a ReactJS app.',
    'experience.frontendDescription': 'Created responsive user interfaces and improved user experience across multiple projects.',
    'experience.internshipDescription': 'Gained experience in software development, community engagement, and UI/UX design principles.',

    // Projects Section
    'projects.title': 'My Projects',
    'projects.description': "Here are some of the projects I've worked on. Each one represents a unique challenge and learning experience.",
    'projects.allProjects': 'All Projects',
    'projects.webApps': 'Web Apps',
    'projects.mobileApps': 'Mobile Apps',
    'projects.apis': 'APIs',
    'projects.tools': 'Tools',
    'projects.other': 'Other',
    'projects.featuredOnly': 'Featured Only',
    'projects.liveDemo': 'Live Demo',
    'projects.github': 'GitHub',
    'projects.comingSoon': 'Coming Soon',
    'projects.noProjectsFound': 'No projects found for the selected filters.',
    'projects.featured': 'Featured',

    // Blog Section
    'blog.title': 'Latest Blog Posts',
    'blog.description': "Here's what I've been writing about. I share insights on software development, best practices, and industry trends.",
    'blog.noPosts': 'No blog posts found. Check out my Medium profile!',
    'blog.viewOnMedium': 'View on Medium',
    'blog.viewAllPosts': 'View All Posts on Medium',
    'blog.unableToLoad': 'Unable to load blog posts at the moment. Check out my Medium profile directly!',

    // Footer
    'footer.copyright': '© 2024 Madeleine Farr. Built with ❤️ using Next.js and TypeScript.',

    // Currently Working On
    'currentlyWorking.title': 'Currently Working On',
    'currentlyWorking.description': "Here's what I've been up to lately. Check out my recent GitHub activity and ongoing projects.",
    'currentlyWorking.projects': 'Current Projects',
    'currentlyWorking.githubActivity': 'Recent GitHub Activity',
    'currentlyWorking.error': 'Unable to load recent activity at the moment.',
    'currentlyWorking.noActivity': 'No recent activity to show.',
    'currentlyWorking.noProjects': 'No current projects to show.',
    'currentlyWorking.noGitHubActivity': 'No recent GitHub activity.',

    // Activity
    'activity.justNow': 'Just now',

    // Language Switcher
    'language.en': 'English',
    'language.de': 'Deutsch',
  },
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.about': 'Über mich',
    'nav.skills': 'Fähigkeiten',
    'nav.experience': 'Erfahrung',
    'nav.projects': 'Projekte',
    'nav.blog': 'Blog',
    'nav.contact': 'Kontakt',

    // Hero Section
    'hero.title': 'Madeleine Farr',
    'hero.subtitle': 'Softwareentwicklerin',
    'hero.viewWork': 'Meine Arbeit ansehen',
    'hero.downloadResume': 'Lebenslauf herunterladen',

    // About Section
    'about.title': 'Über mich',
    'about.description': 'Ich bin eine leidenschaftliche Softwareentwicklerin, die es liebt, schöne und zugängliche Benutzererfahrungen zu schaffen. Ich spezialisiere mich auf React, TypeScript und moderne Webtechnologien.',

    // Skills Section
    'skills.title': 'Fähigkeiten & Technologien',
    'skills.description': 'Das sind die Technologien, mit denen ich arbeite. Ich lerne ständig neue Technologien und verbessere meine bestehenden Fähigkeiten.',
    'skills.allSkills': 'Alle Fähigkeiten',
    'skills.frontend': 'Frontend',
    'skills.backend': 'Backend',
    'skills.tools': 'Tools',
    'skills.learning': 'Lernen',
    'skills.featuredOnly': 'Nur Empfohlene',
    'skills.proficiencyLevels': 'Kompetenzstufen',
    'skills.expert': 'Experte (90-100%)',
    'skills.advanced': 'Fortgeschritten (80-89%)',
    'skills.intermediate': 'Mittelstufe (60-79%)',
    'skills.beginner': 'Anfänger (40-59%)',
    'skills.learningLevel': 'Lernen (0-39%)',
    'skills.noSkillsFound': 'Keine Fähigkeiten für die ausgewählte Kategorie gefunden.',

    // Experience Section
    'experience.title': 'Erfahrung (5 Jahre)',
    'experience.seniorEngineer': 'Fullstack Softwareentwicklerin',
    'experience.fullStackEngineer': 'Full Stack Entwicklerin',
    'experience.frontendDeveloper': 'Frontend Entwicklerin',
    'experience.internship': 'Praktikum: Softwareentwicklung, Community Engagement & UI Design',
    'experience.seniorDescription': 'Entwicklung moderner Webanwendungen mit React, TypeScript und Next.js.',
    'experience.fullStackDescription': 'Verwaltung von iOS-Apps, Arbeit an Backend-Services und einer ReactJS-App.',
    'experience.frontendDescription': 'Erstellung responsiver Benutzeroberflächen und Verbesserung der Benutzererfahrung in mehreren Projekten.',
    'experience.internshipDescription': 'Erfahrung in Softwareentwicklung, Community Engagement und UI/UX-Design-Prinzipien gesammelt.',

    // Projects Section
    'projects.title': 'Meine Projekte',
    'projects.description': 'Hier sind einige der Projekte, an denen ich gearbeitet habe. Jedes stellt eine einzigartige Herausforderung und Lernerfahrung dar.',
    'projects.allProjects': 'Alle Projekte',
    'projects.webApps': 'Web-Apps',
    'projects.mobileApps': 'Mobile Apps',
    'projects.apis': 'APIs',
    'projects.tools': 'Tools',
    'projects.other': 'Sonstiges',
    'projects.featuredOnly': 'Nur Empfohlene',
    'projects.liveDemo': 'Live Demo',
    'projects.github': 'GitHub',
    'projects.comingSoon': 'Demnächst verfügbar',
    'projects.noProjectsFound': 'Keine Projekte für die ausgewählten Filter gefunden.',
    'projects.featured': 'Empfohlen',

    // Blog Section
    'blog.title': 'Neueste Blog-Beiträge',
    'blog.description': 'Das sind meine aktuellen Artikel. Ich teile Einblicke in Softwareentwicklung, Best Practices und Branchentrends.',
    'blog.noPosts': 'Keine Blog-Beiträge gefunden. Schauen Sie sich mein Medium-Profil an!',
    'blog.viewOnMedium': 'Auf Medium ansehen',
    'blog.viewAllPosts': 'Alle Beiträge auf Medium ansehen',
    'blog.unableToLoad': 'Blog-Beiträge können derzeit nicht geladen werden. Schauen Sie sich mein Medium-Profil direkt an!',

    // Footer
    'footer.copyright': '© 2024 Madeleine Farr. Erstellt mit ❤️ mit Next.js und TypeScript.',

    // Currently Working On
    'currentlyWorking.title': 'Aktuell arbeite ich an',
    'currentlyWorking.description': 'Das ist, womit ich mich in letzter Zeit beschäftigt habe. Schauen Sie sich meine kürzliche GitHub-Aktivität und laufende Projekte an.',
    'currentlyWorking.projects': 'Aktuelle Projekte',
    'currentlyWorking.githubActivity': 'Kürzliche GitHub-Aktivität',
    'currentlyWorking.error': 'Aktuelle Aktivität kann derzeit nicht geladen werden.',
    'currentlyWorking.noActivity': 'Keine kürzliche Aktivität anzuzeigen.',
    'currentlyWorking.noProjects': 'Keine aktuellen Projekte anzuzeigen.',
    'currentlyWorking.noGitHubActivity': 'Keine kürzliche GitHub-Aktivität.',

    // Activity
    'activity.justNow': 'Gerade eben',

    // Language Switcher
    'language.en': 'English',
    'language.de': 'Deutsch',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 