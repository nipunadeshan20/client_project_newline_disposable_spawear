"use client";
import { useEffect } from "react";

export default function ScrollAnimation() {
  // Clear URL hash on page load to prevent auto-scrolling to anchors
  useEffect(() => {
    // If there's a hash in the URL and user refreshed (not navigating via anchor)
    if (window.location.hash && window.performance) {
      const navEntries = performance.getEntriesByType("navigation");
      const isReload = navEntries.length > 0 && navEntries[0].type === "reload";
      
      if (isReload) {
        // Clear the hash to scroll to top on refresh
        history.replaceState(null, "", window.location.pathname);
        window.scrollTo(0, 0);
      }
    }
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(
      ".animate-fade-up, .animate-fade-right, .animate-fade-left"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
