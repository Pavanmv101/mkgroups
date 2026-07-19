"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ImageCarousel({ images, fallbackImage = '/hero-bg.jpg' }: { images: string[], fallbackImage?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    hiddenRight: { x: "100%", opacity: 0 },
    hiddenLeft: { x: "-100%", opacity: 0 },
    visible: { x: "0", opacity: 1, transition: { duration: 0.4 } },
    exitRight: { x: "-100%", opacity: 0, transition: { duration: 0.4 } },
    exitLeft: { x: "100%", opacity: 0, transition: { duration: 0.4 } },
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1 === images.length ? 0 : prevIndex + 1));
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) {
    return (
      <div className="relative h-96 md:h-[500px] w-full bg-gray-100 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
        <img 
          src={fallbackImage} 
          alt="Property" 
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="relative h-96 md:h-[500px] w-full bg-gray-100 rounded-2xl overflow-hidden shadow-lg border border-gray-100 group">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Property image ${currentIndex + 1}`}
          custom={direction}
          variants={slideVariants}
          initial={direction === 1 ? 'hiddenRight' : 'hiddenLeft'}
          animate="visible"
          exit={direction === 1 ? 'exitRight' : 'exitLeft'}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          {/* Navigation Arrows */}
          <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={handlePrevious} 
              className="bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full backdrop-blur-sm shadow-md transition-all hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={handleNext} 
              className="bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full backdrop-blur-sm shadow-md transition-all hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full shadow-sm transition-all ${
                  index === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
