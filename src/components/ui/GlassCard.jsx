import { motion } from 'framer-motion';

export default function GlassCard({
  children,
  className = '',
  hover = true,
  animate = true,
  delay = 0
}) {
  const baseClasses = hover ? 'card-hover' : 'card';

  const Component = animate ? motion.div : 'div';

  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.5, delay }
  } : {};

  return (
    <Component
      className={`${baseClasses} ${className}`}
      {...animationProps}
    >
      {children}
    </Component>
  );
}
