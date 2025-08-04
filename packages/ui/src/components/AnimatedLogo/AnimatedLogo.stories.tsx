import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AnimatedLogo } from './AnimatedLogo';

const meta: Meta<typeof AnimatedLogo> = {
  title: 'Components/AnimatedLogo',
  component: AnimatedLogo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ 
        padding: '2rem', 
        background: 'var(--color-bg)', 
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem'
      }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
      <div style={{ textAlign: 'center' }}>
        <AnimatedLogo size="small" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Small</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <AnimatedLogo size="medium" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Medium</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <AnimatedLogo size="large" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Large</p>
      </div>
    </div>
  ),
}; 