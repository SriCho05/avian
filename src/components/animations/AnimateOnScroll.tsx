"use client";

import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  animationClass?: string;
}

export const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  className,
  animationClass = 'animate-fade-in-up',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'opacity-0',
        isVisible && animationClass,
        className
      )}
    >
      {children}
    </div>
  );
};
