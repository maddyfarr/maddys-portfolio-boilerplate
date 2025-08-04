"use client";

import { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface TimelineProps {
  children: ReactNode;
  className?: string;
}

function TimelineComponent({ children, className }: TimelineProps) {
  return <ol className={cn("relative border-s border-muted", className)}>{children}</ol>;
}

interface ItemProps {
  children: ReactNode;
  className?: string;
}
function Item({ children, className }: ItemProps) {
  return <li className={cn("mb-10 ms-6", className)}>{children}</li>;
}

interface PointProps {
  className?: string;
}
function Point({ className }: PointProps) {
  return (
    <span
      className={cn(
        "absolute flex items-center justify-center w-3.5 h-3.5 bg-primary rounded-full -start-1.75 ring-4 ring-background",
        className
      )}
    />
  );
}

interface ContentProps {
  children: ReactNode;
  className?: string;
}
function Content({ children, className }: ContentProps) {
  return <div className={cn("flex flex-col gap-1", className)}>{children}</div>;
}

interface TimeProps {
  children: ReactNode;
  className?: string;
}
function Time({ children, className }: TimeProps) {
  return <time className={cn("text-sm font-normal text-muted-foreground", className)}>{children}</time>;
}

interface TitleProps {
  children: ReactNode;
  className?: string;
}
function Title({ children, className }: TitleProps) {
  return <h3 className={cn("text-lg font-semibold text-foreground", className)}>{children}</h3>;
}

interface DescriptionProps {
  children: ReactNode;
  className?: string;
}
function Description({ children, className }: DescriptionProps) {
  return <p className={cn("text-base font-normal text-muted-foreground", className)}>{children}</p>;
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
