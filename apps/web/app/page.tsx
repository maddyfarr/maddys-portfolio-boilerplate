"use client";

import Image, { type ImageProps } from "next/image";
import { 
  Button, 
  Typography, 
  Navigation, 
  ProjectCards, 
  SkillsGrid, 
  SocialLinks,
  BlogSection,
  CurrentlyWorkingOn,
  LanguageProgress,
  GitHubCommitBubble,
  LanguageProvider,
  useLanguage
} from '@repo/ui';
import styles from "./page.module.css";
import logo from '../../public/logo.svg';

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

function HomeContent() {
  const { t } = useLanguage();
  
  return (
    <div className={styles.page}>
      <Navigation />

      {/* GitHub Commit Bubble - Center of Page */}
      <GitHubCommitBubble 
        githubUsername="maddyfarr"
      />

      {/* Hero Section */}
      <section id="home" className={styles.hero}>
        <div className={styles.heroContent}>
          <Image
            className={styles.logo}
            src="/logo.png"
            alt="Madeleine Farr"
            width={120}
            height={120}
            priority
          />
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Typography variant="title" className="text-center">{t('hero.title')}</Typography>
            <Typography variant="subtitle" className="text-center">{t('hero.subtitle')}</Typography>
          </div>
          <div className={styles.ctas}>
            <Button variant="primary" label={t('hero.viewWork')} />
            <Button variant="secondary" label={t('hero.downloadResume')} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={styles.section}>
        <div className={styles.sectionContent}>
          <Typography variant="title" className="text-center">{t('about.title')}</Typography>
          <Typography variant="body" className="text-center">
            {t('about.description')}
          </Typography>
        </div>
      </section>

      {/* Currently Working On Section */}
      <section id="currently-working" className={styles.section}>
        <div className={styles.sectionContent}>
          <CurrentlyWorkingOn 
            className="w-full"
            githubUsername="maddyfarr"
            customActivities={[
              {
                type: 'project',
                title: 'Portfolio Website Enhancement',
                description: 'Adding new features like language switching, GitHub integration, and interactive components.',
                status: 'in-progress',
                tech: ['React', 'TypeScript', 'Next.js', 'Design Tokens']
              },
              {
                type: 'learning',
                title: 'Advanced React Patterns',
                description: 'Exploring compound components, render props, and advanced state management techniques.',
                status: 'in-progress',
                tech: ['React', 'TypeScript', 'Advanced Patterns']
              },
              {
                type: 'experiment',
                title: 'AI-Powered Code Assistant',
                description: 'Building a tool that helps developers write better code using AI suggestions.',
                status: 'planning',
                tech: ['Python', 'OpenAI API', 'React', 'FastAPI']
              }
            ]}
          />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={styles.section}>
        <div className={styles.sectionContent}>
          <SkillsGrid className="w-full" sectionBackground="white" />
        </div>
      </section>

      {/* Languages Section */}
      <section id="languages" className={styles.section}>
        <div className={styles.sectionContent}>
          <LanguageProgress 
            className="w-full"
            sectionBackground="beige"
            languages={[
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
            ]}
          />
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className={styles.section}>
        <div className={styles.sectionContent}>
          <BlogSection 
            mediumUsername="@mad-about-software" 
            className="w-full"
            maxPosts={3}
          />
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={styles.section}>
        <div className={styles.sectionContent}>
          <Typography variant="title" className="text-center">{t('experience.title')}</Typography>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 'var(--spacing-lg)', 
            width: '100%', 
            maxWidth: '42rem',
            margin: '0 auto'
          }}>
            <div style={{ 
              borderLeft: '4px solid var(--color-primary)', 
              paddingLeft: 'var(--spacing-lg)',
              marginLeft: 'var(--spacing-md)'
            }}>
                              <h3 style={{ 
                  fontSize: 'var(--font-size-lg)', 
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--spacing-xs)'
                }}>
                  {t('experience.seniorEngineer')}
                </h3>
              <p style={{ 
                fontSize: 'var(--font-size-sm)', 
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--spacing-sm)'
              }}>
                2025 - Present
              </p>
                              <p style={{ 
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.6'
                }}>
                  {t('experience.seniorDescription')}
                </p>
            </div>
            <div style={{ 
              borderLeft: '4px solid var(--color-primary)', 
              paddingLeft: 'var(--spacing-lg)',
              marginLeft: 'var(--spacing-md)'
            }}>
                              <h3 style={{ 
                  fontSize: 'var(--font-size-lg)', 
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--spacing-xs)'
                }}>
                  {t('experience.fullStackEngineer')}
                </h3>
              <p style={{ 
                fontSize: 'var(--font-size-sm)', 
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--spacing-sm)'
              }}>
                2022 - 2025
              </p>
                              <p style={{ 
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.6'
                }}>
                  {t('experience.fullStackDescription')}
                </p>
            </div>
            <div style={{ 
              borderLeft: '4px solid var(--color-primary)', 
              paddingLeft: 'var(--spacing-lg)',
              marginLeft: 'var(--spacing-md)'
            }}>
                              <h3 style={{ 
                  fontSize: 'var(--font-size-lg)', 
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--spacing-xs)'
                }}>
                  {t('experience.frontendDeveloper')}
                </h3>
              <p style={{ 
                fontSize: 'var(--font-size-sm)', 
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--spacing-sm)'
              }}>
                2021 - 2022
              </p>
                              <p style={{ 
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.6'
                }}>
                  {t('experience.frontendDescription')}
                </p>
                              <h3 style={{ 
                  fontSize: 'var(--font-size-lg)', 
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--spacing-xs)'
                }}>
                  {t('experience.internship')}
                </h3>
              <p style={{ 
                fontSize: 'var(--font-size-sm)', 
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--spacing-sm)'
              }}>
                2020 - 2021
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={styles.section}>
        <div className={styles.sectionContent}>
          <ProjectCards className="w-full" />
        </div>
      </section>

      {/* Contact Section */}
      {/* <ContactForm /> */}
      <footer className={styles.footer}>
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>
            {t('footer.copyright')}
          </p>
          <SocialLinks variant="minimal" />
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <HomeContent />
    </LanguageProvider>
  );
}
