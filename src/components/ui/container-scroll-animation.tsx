import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
  className = "",
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.82, 0.96] : [1.06, 1];
  };

  // Smooth rotation curve while scrolling through the viewport
  const rotate = useTransform(scrollYProgress, [0.05, 0.6], [22, 0]);
  const scale = useTransform(scrollYProgress, [0.05, 0.6], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0.05, 0.6], [0, -60]);

  return (
    <div
      className={`h-[52rem] sm:h-[60rem] md:h-[68rem] flex items-center justify-center relative px-3 py-8 sm:px-6 md:px-12 overflow-hidden ${className}`}
      ref={containerRef}
    >
      <div
        className="w-full relative max-w-5xl mx-auto flex flex-col items-center"
        style={{
          perspective: "1200px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="max-w-4xl mx-auto text-center px-4 mb-6 z-10"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full max-w-5xl mx-auto will-change-transform"
    >
      {/* MacBook Screen Top Lid & Bezel */}
      <div className="relative w-full bg-[#161618] border-[8px] sm:border-[12px] md:border-[14px] border-[#1e1e22] rounded-[22px] sm:rounded-[26px] md:rounded-[30px] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.08)] overflow-hidden">
        {/* Top Center Camera Lens */}
        <div className="absolute top-1.5 sm:top-2 inset-x-0 mx-auto w-2.5 h-2.5 rounded-full bg-[#0a0a0c] ring-1 ring-white/10 z-30 flex items-center justify-center pointer-events-none">
          <span className="w-1 h-1 rounded-full bg-[#1b3147]/80" />
        </div>

        {/* Screen Display Glass */}
        <div className="w-full h-[26rem] sm:h-[32rem] md:h-[36rem] bg-[#0c0d10] text-white overflow-hidden rounded-[14px] sm:rounded-[18px]">
          {children}
        </div>
      </div>

      {/* MacBook Bottom Chassis & Thumb Notch */}
      <div className="relative -mt-1.5 sm:-mt-2 mx-auto w-[103%] sm:w-[104%] h-3 sm:h-4 bg-gradient-to-r from-[#27272a] via-[#3f3f46] to-[#27272a] rounded-b-xl shadow-2xl border-t border-white/10 flex items-start justify-center">
        <div className="w-20 sm:w-28 h-1.5 bg-[#18181b] rounded-b-md" />
      </div>
    </motion.div>
  );
};
