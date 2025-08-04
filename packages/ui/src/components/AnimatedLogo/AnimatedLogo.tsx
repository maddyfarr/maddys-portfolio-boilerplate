"use client";

import { cn } from '../../utils/cn';
import './animated-logo.css';

interface AnimatedLogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export const AnimatedLogo = ({ className, size = 'medium' }: AnimatedLogoProps) => {
  return (
    <div className={cn('animated-logo', `animated-logo--${size}`, className)}>
      {/* Icon-style Engineer Lady */}
      <div className="engineer-icon">
        {/* Head */}
        <div className="head">
          {/* Simple hair */}
          <div className="hair"></div>
          
          {/* Face */}
          <div className="face">
            {/* Eyes */}
            <div className="eyes">
              <div className="eye eye--left"></div>
              <div className="eye eye--right"></div>
            </div>
            
            {/* Simple smile */}
            <div className="smile"></div>
          </div>
        </div>

        {/* Body */}
        <div className="body">
          {/* Arms */}
          <div className="arm arm--left"></div>
          
          <div className="arm arm--right">
            {/* Coffee Cup */}
            <div className="coffee-cup">
              <div className="coffee-cup__body"></div>
              <div className="coffee-cup__handle"></div>
            </div>
          </div>
        </div>

        {/* Computer */}
        <div className="computer">
          <div className="computer__screen">
            <div className="screen__content">
              <div className="code-line code-line--1"></div>
              <div className="code-line code-line--2"></div>
              <div className="code-line code-line--3"></div>
              <div className="cursor"></div>
            </div>
          </div>
          <div className="computer__base"></div>
        </div>
      </div>
    </div>
  );
}; 