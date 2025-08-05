"use client";

import { ReactNode } from "react";
import { cn } from "../../utils/cn";
import "../../theme/tokens.css";

interface TimelineProps {
  children: ReactNode;
  className?: string;
}

function TimelineComponent({ children, className }: TimelineProps) {
  return (
    <ol 
      className={cn(className)}
      style={{ 
        position: 'relative',
        borderLeft: '1px solid var(--color-border)',
        paddingLeft: 'var(--spacing-lg)'
      }}
    >
      {children}
    </ol>
  );
}

interface ItemProps {
  children: ReactNode;
  className?: string;
}
function Item({ children, className }: ItemProps) {
  return (
    <li 
      className={cn(className)}
      style={{ 
        marginBottom: 'var(--spacing-lg)',
        marginLeft: 'var(--spacing-lg)'
      }}
    >
      {children}
    </li>
  );
}

interface PointProps {
  className?: string;
}
function Point({ className }: PointProps) {
  return (
    <span
      className={cn(className)}
      style={{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '0.875rem',
        height: '0.875rem',
        backgroundColor: 'var(--color-primary)',
        borderRadius: '50%',
        left: '-1.75rem',
        boxShadow: '0 0 0 4px var(--color-bg)'
      }}
    />
  );
}

interface ContentProps {
  children: ReactNode;
  className?: string;
}
function Content({ children, className }: ContentProps) {
  return (
    <div 
      className={cn(className)}
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 'var(--spacing-xs)' 
      }}
    >
      {children}
    </div>
  );
}

interface TimeProps {
  children: ReactNode;
  className?: string;
}
function Time({ children, className }: TimeProps) {
  return (
    <time 
      className={cn(className)}
      style={{ 
        fontSize: 'var(--font-size-sm)', 
        fontWeight: 'normal', 
        color: 'var(--color-text-secondary)' 
      }}
    >
      {children}
    </time>
  );
}

interface TitleProps {
  children: ReactNode;
  className?: string;
}
function Title({ children, className }: TitleProps) {
  return (
    <h3 
      className={cn(className)}
      style={{ 
        fontSize: 'var(--font-size-lg)', 
        fontWeight: '600', 
        color: 'var(--color-text-primary)' 
      }}
    >
      {children}
    </h3>
  );
}

interface DescriptionProps {
  children: ReactNode;
  className?: string;
}
function Description({ children, className }: DescriptionProps) {
  return (
    <p 
      className={cn(className)}
      style={{ 
        fontSize: 'var(--font-size-base)', 
        fontWeight: 'normal', 
        color: 'var(--color-text-secondary)' 
      }}
    >
      {children}
    </p>
  );
}

// 🔐 Correctly typed compound component export
export const Timeline = Object.assign(TimelineComponent, {
  Item,
  Point,
  Content,
  Time,
  Title,
  Description,
});

export default Timeline;
