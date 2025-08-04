import Image, { type ImageProps } from "next/image";
import { 
  Button, 
  Typography, 
  Navigation, 
  ProjectCards, 
  SkillsGrid, 
  SocialLinks,
  BlogSection
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

export default function Home() {
  return (
    <div className={styles.page}>
      <Navigation />

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
            <Typography variant="title" className="text-center">Madeleine Farr</Typography>
            <Typography variant="subtitle" className="text-center">Software Engineer</Typography>
          </div>
          <div className={styles.ctas}>
            <Button variant="primary" label="View My Work" />
            <Button variant="secondary" label="Download Resume" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={styles.section}>
        <div className={styles.sectionContent}>
          <Typography variant="title" className="text-center">About Me</Typography>
          <Typography variant="body" className="text-center">
            I'm a passionate software engineer who loves building beautiful, accessible user experiences.
            I specialize in React, TypeScript, and modern web technologies.
          </Typography>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={styles.section}>
        <div className={styles.sectionContent}>
          <SkillsGrid className="w-full" />
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
          <Typography variant="title" className="text-center">Experience</Typography>
          <div className="space-y-6 w-full max-w-2xl">
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-lg font-semibold">Senior Software Engineer</h3>
              <p className="text-sm text-gray-600">2023 - Present</p>
              <p className="mt-2">Leading development of modern web applications using React, TypeScript, and Node.js.</p>
            </div>
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-lg font-semibold">Full Stack Developer</h3>
              <p className="text-sm text-gray-600">2021 - 2023</p>
              <p className="mt-2">Built scalable web applications and APIs, working with React, Node.js, and PostgreSQL.</p>
            </div>
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-lg font-semibold">Frontend Developer</h3>
              <p className="text-sm text-gray-600">2020 - 2021</p>
              <p className="mt-2">Created responsive user interfaces and improved user experience across multiple projects.</p>
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
            © 2024 Madeleine Farr. Built with ❤️ using Next.js and TypeScript.
          </p>
          <SocialLinks variant="minimal" />
        </div>
      </footer>
    </div>
  );
}
