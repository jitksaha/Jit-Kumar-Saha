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
    return isMobile ? [0.82, 0.98] : [1.08, 1];
  };

  // Smooth rotation curve while scrolling through the viewport
  const rotate = useTransform(scrollYProgress, [0.08, 0.55], [20, 0]);
  const scale = useTransform(scrollYProgress, [0.08, 0.55], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0.08, 0.55], [0, -50]);

  return (
    <div
      className={`min-h-[50rem] sm:min-h-[58rem] md:min-h-[66rem] flex items-center justify-center relative px-3 py-10 sm:px-6 md:px-12 overflow-hidden ${className}`}
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
      {/* MacBook Screen Top Lid & Bezel (Space Black Aluminum) */}
      <div className="relative w-full bg-[#121316] border-[10px] sm:border-[14px] md:border-[16px] border-[#1c1d22] rounded-[24px] sm:rounded-[28px] md:rounded-[32px] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden">
        {/* Top Center Camera Lens */}
        <div className="absolute top-1.5 sm:top-2 inset-x-0 mx-auto w-2.5 h-2.5 rounded-full bg-[#08080a] ring-1 ring-white/15 z-30 flex items-center justify-center pointer-events-none">
          <span className="w-1 h-1 rounded-full bg-[#1e3a5f]" />
        </div>

        {/* Screen Display Glass */}
        <div className="w-full h-[28rem] sm:h-[34rem] md:h-[38rem] bg-[#090b0e] text-white overflow-hidden rounded-[14px] sm:rounded-[18px]">
          {children}
        </div>
      </div>

      {/* MacBook Bottom Base & Thumb Opening Notch */}
      <div className="relative -mt-2 sm:-mt-2.5 mx-auto w-[103%] sm:w-[104%] h-3.5 sm:h-4.5 bg-gradient-to-r from-[#222328] via-[#3a3a42] to-[#222328] rounded-b-2xl shadow-2xl border-t border-white/15 flex items-start justify-center">
        <div className="w-24 sm:w-32 h-1.5 bg-[#121316] rounded-b-md" />
      </div>
    </motion.div>
  );
};
