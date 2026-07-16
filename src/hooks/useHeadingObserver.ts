import { useEffect } from "react";

interface HeadingItem {
  id: string;
  text: string;
}

export function useHeadingObserver(
  headings: HeadingItem[], 
  setActiveHeading: (id: string) => void
) {
  useEffect(() => {
    if (!headings.length) return;

    const handleScroll = () => {
      // Find all heading elements currently rendered on the screen
      const headingElements = headings
        .map((h) => document.getElementById(h.id))
        .filter((el): el is HTMLElement => el !== null);

      if (!headingElements.length) return;

      // 160px buffer line from the top of the browser window
      const scrollPosition = window.scrollY + 160; 

      let currentActive = headings[0].id; // Fallback to the first item

      for (let i = 0; i < headingElements.length; i++) {
        if (scrollPosition >= headingElements[i].offsetTop) {
          currentActive = headingElements[i].id;
        } else {
          break;
        }
      }
      
      setActiveHeading(currentActive);


    };

    // Attach native scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Run once immediately on mount to highlight the first visible item
    handleScroll(); 

    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings, setActiveHeading]);
}
