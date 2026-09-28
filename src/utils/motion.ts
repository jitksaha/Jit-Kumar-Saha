import type { Variants, Transition } from "framer-motion";

export const easeCustom = [0.22, 1, 0.36, 1] as const;

export const springTransition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 18,
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeCustom },
  },
};

export const createContainerVariants = (
  stagger = 0.08,
  delay = 0.05
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

export const containerVariants = createContainerVariants(0.09, 0.05);
