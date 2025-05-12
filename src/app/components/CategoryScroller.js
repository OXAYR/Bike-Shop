'use client';

import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ImageTextCard from './ImageTextCard';

export default function CategoryScroller({ categories }) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const hasEnoughContentToScroll = container.scrollWidth > container.clientWidth;
      setCanScrollLeft(container.scrollLeft > 0 && hasEnoughContentToScroll);
      setCanScrollRight(container.scrollLeft < (container.scrollWidth - container.clientWidth) && hasEnoughContentToScroll);
    } else {
      setCanScrollLeft(false);
      setCanScrollRight(false);
    }
  };

  // useEffect(() => {
  //   // Call checkScrollability initially and on categories change or resize
  //   checkScrollability();
  //   window.addEventListener('resize', checkScrollability);
  //   const container = scrollContainerRef.current;
  //   if (container) {
  //     container.addEventListener('scroll', checkScrollability);
  //   }

  //   return () => {
  //     window.removeEventListener('resize', checkScrollability);
  //     if (container) {
  //       container.removeEventListener('scroll', checkScrollability);
  //     }
  //   };
  // }, [categories]); // Re-run when categories change

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      // Scroll by a percentage of the container's width, e.g., 75%
      const scrollAmount = direction === 'left' ? -container.offsetWidth * 0.75 : container.offsetWidth * 0.75;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!categories || categories.length === 0) {
    return (
        <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-8">Shop By Category</h2>
            <p>No categories to display.</p>
        </div>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary">Shop By Category</h2>
          {(canScrollLeft || canScrollRight || true) && ( // Only show buttons if scrolling is possible
            <div className="flex space-x-2 ">
              {canScrollLeft || true && (
                <button
                  onClick={() => scroll('left')}
                  className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full text-secondary transition-colors"
                  aria-label="Scroll left"
                >
                  <ChevronLeft size={24} />
                </button>
              )}
              {canScrollRight || true && (
                <button
                  onClick={() => scroll('right')}
                  className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full text-secondary transition-colors"
                  aria-label="Scroll right"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>
          )}
        </div>
        
        <div ref={scrollContainerRef} className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 pb-2">
            <ImageTextCard categories={categories} />
          </div>
        </div>
      </div>
    </section>
  );
}
