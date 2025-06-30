import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "features", label: "Features" },
  { id: "services", label: "Services" },
  { id: "testimonials", label: "Testimonials" },
  { id: "ready", label: "Get Started" },
];

export default function SectionScrollbar() {
  const [active, setActive] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      setScrollProgress(progress);

      // Find which section is currently in view
      let currentSection = 0;
      const viewportHeight = window.innerHeight;
      const threshold = viewportHeight * 0.3; // 30% of viewport
      
      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is in the viewport with threshold
          if (rect.top <= threshold && rect.bottom >= 0) {
            currentSection = index;
          }
        }
      });
      
      // Force last section when at bottom
      if (progress > 0.95) {
        currentSection = sections.length - 1;
      }
      
      setActive(currentSection);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50">
      {/* Main Progress Bar */}
      <div className="relative w-1 h-32 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-accent rounded-full"
          initial={{ height: "0%" }}
          animate={{ height: `${scrollProgress * 100}%` }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
        />
      </div>
      
      {/* Section Indicators */}
      <div className="absolute -right-6 top-0 h-32 flex flex-col justify-between">
        {sections.map((section, index) => (
          <div key={section.id} className="relative group">
            <button
              onClick={() => handleSectionClick(section.id)}
              className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                active === index
                  ? "bg-primary border-primary scale-125 shadow-lg shadow-primary/50"
                  : "bg-background border-muted-foreground/50 hover:border-primary hover:scale-110"
              }`}
            />
            <div className={`absolute left-8 top-1/2 -translate-y-1/2 px-3 py-2 bg-background/95 backdrop-blur-sm border rounded-lg shadow-xl transition-all duration-300 ${
              "opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 pointer-events-none"
            }`}>
              <span className="text-sm font-medium text-foreground whitespace-nowrap">
                {section.label}
              </span>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-background border-l border-b border-border rotate-45"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
