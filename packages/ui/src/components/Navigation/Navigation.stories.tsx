import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Navigation } from './Navigation';
import { ThemeProvider } from '../../context/ThemeContext';

const meta: Meta<typeof Navigation> = {
  title: 'Components/Navigation',
  component: Navigation,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ height: '100vh', background: 'var(--color-bg)' }}>
          <Story />
          <div style={{ paddingTop: '100px', padding: '20px' }}>
            <h1>Scroll down to see the navigation in action!</h1>
            <p>This is a demo of the navigation component. Try scrolling to see the scroll effect, and on mobile, try the hamburger menu.</p>
            <div style={{ height: '200vh', background: 'linear-gradient(45deg, var(--color-primary), var(--color-accent))' }}>
              <div style={{ padding: '20px', color: 'white' }}>
                <h2>Scroll Effect Demo</h2>
                <p>Notice how the navigation changes as you scroll down.</p>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomLinks: Story = {
  args: {
    links: [
      { href: '#home', label: 'Home' },
      { href: '#about', label: 'About' },
      { href: '#skills', label: 'Skills' },
      { href: '#portfolio', label: 'Portfolio' },
      { href: '#blog', label: 'Blog' },
      { href: '#contact', label: 'Contact' }
    ],
  },
};

export const CustomLogo: Story = {
  args: {
    logo: 'MF',
  },
};

export const WithActiveLink: Story = {
  args: {
    links: [
      { href: '#home', label: 'Home', isActive: true },
      { href: '#about', label: 'About' },
      { href: '#experience', label: 'Experience' },
      { href: '#contact', label: 'Contact' }
    ],
  },
}; 