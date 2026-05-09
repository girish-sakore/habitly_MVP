"use client";

import { motion, type MotionProps } from "framer-motion";
import type { ReactNode } from "react";

export function FadeIn({
  children,
  ...props
}: { children: ReactNode } & MotionProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} {...props}>
      {children}
    </motion.div>
  );
}
