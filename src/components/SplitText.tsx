import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EASE_PRIMARY } from '../constants/motion';

interface SplitTextProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p' | 'div';
  delay?: number;
  stagger?: number;
  wordClassName?: string;
}

export const SplitText: React.FC<SplitTextProps> = ({
  children,
  className = '',
  as = 'span',
  delay = 0,
  stagger = 0.04,
  wordClassName = '',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const words = children.split(' ');

  const Tag = as as any;

  if (prefersReducedMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: '105%',
      opacity: 0,
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.65,
        ease: EASE_PRIMARY,
      },
    },
  };

  return (
    <Tag className={`inline-block ${className}`}>
      <motion.span
        className="inline-flex flex-wrap"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden py-0.5 mr-[0.25em]">
            <motion.span
              variants={wordVariants}
              className={`inline-block will-change-transform ${wordClassName}`}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
};
