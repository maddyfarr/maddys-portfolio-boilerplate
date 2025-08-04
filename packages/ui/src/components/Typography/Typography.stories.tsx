import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import { Typography } from './Typography';

const meta = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  args: {
    as: 'p',
    variant: 'body',
    children: 'Hello, world!',
  },

} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Hello, world!',
  },
};

export const Title: Story = {
  args: {
    variant: 'title',
    children: 'This is a Title',
  },
};

export const Subtitle: Story = {
  args: {
    variant: 'subtitle',
    children: 'This is a Subtitle',
  },
};

export const Body: Story = {
  args: {
    variant: 'body',
    children: 'This is body text with a longer sentence to show how it wraps and displays.',
  },
};

export const Small: Story = {
  args: {
    variant: 'small',
    children: 'This is small text',
  },
};

export const AsHeading: Story = {
  args: {
    as: 'h1',
    variant: 'title',
    children: 'This is an H1 heading',
  },
};
