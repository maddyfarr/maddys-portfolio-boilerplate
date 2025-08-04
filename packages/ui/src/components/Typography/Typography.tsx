"use client";

import '../../theme/tokens.css';
import './typography.css';
import { JSX } from "react";

type TypographyVariant = 'title' | 'subtitle' | 'body' | 'small';

interface TypographyProps {
  as?: keyof JSX.IntrinsicElements;
  variant?: TypographyVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClassMap: Record<TypographyVariant, string> = {
  title: 'typography-title',
  subtitle: 'typography-subtitle',
  body: 'typography-body',
  small: 'typography-small',
};

export const Typography = ({
  as: Tag = 'p',
  variant = 'body',
  children,
  className = '',
}: TypographyProps) => {
  return (<Tag className={`${variantClassMap[variant]} ${className}`}>{children}</Tag>);
};
