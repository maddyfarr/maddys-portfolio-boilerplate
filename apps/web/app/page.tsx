import Image, { type ImageProps } from "next/image";
import { Button, Typography, Navigation } from '@repo/ui';
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

      {/* Experience Section */}
      <section id="experience" className={styles.section}>
        <div className={styles.sectionContent}>
          <Typography variant="title" className="text-center">Experience</Typography>
          <Typography variant="body" className="text-center">
            Here's a timeline of my professional journey...
          </Typography>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={styles.section}>
        <div className={styles.sectionContent}>
          <Typography variant="title" className="text-center">Projects</Typography>
          <Typography variant="body" className="text-center">
            Check out some of my recent work...
          </Typography>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={styles.section}>
        <div className={styles.sectionContent}>
          <Typography variant="title" className="text-center">Get In Touch</Typography>
          <Typography variant="body" className="text-center">
            I'm always interested in new opportunities and collaborations.
          </Typography>
          <div style={{ marginTop: '20px' }}>
            <Button variant="primary" label="Say Hello" />
          </div>
        </div>
      </section>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com/templates?search=turborepo&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://turborepo.com?utm_source=create-turbo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to turborepo.com →
        </a>
      </footer>
    </div>
  );
}
