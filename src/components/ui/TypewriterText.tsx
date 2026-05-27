'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function TypewriterText({ text, className }: { text: string; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const characters = text.split('');

  return (
    <p ref={ref} className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.1, delay: index * 0.02 }}
        >
          {char}
        </motion.span>
      ))}
    </p>
  );
}
