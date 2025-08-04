import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { ThemeProvider } from '../../context/ThemeContext';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: '2rem', background: 'var(--color-bg)', borderRadius: '8px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <span style={{ color: 'var(--color-text-primary)' }}>Theme:</span>
      <ThemeToggle />
    </div>
  ),
};
