'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

export const TESTIMONIALS = [
  {
    tempId: 0,
    testimonial:
      'Shine Consultant gave me transparent, unbiased advice when selecting universities in the UK. Guided every step from SOP to visa approval.',
    by: 'Rohan M., MSc Data Science, University of Manchester',
    imgSrc:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  },
  {
    tempId: 1,
    testimonial:
      'Clear explanations of visa requirements and course modules without any confusion. Highly recommended for study abroad counselling.',
    by: 'Kevin V., University of Sydney, Australia',
    imgSrc:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
  },
  {
    tempId: 2,
    testimonial:
      'The career counselling was an eye-opener. They evaluated my past academic records accurately and recommended universities in Canada that truly suited my profile.',
    by: 'Ananya S., University of Toronto, Canada',
    imgSrc:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
  },
  {
    tempId: 3,
    testimonial:
      'Transparent and ethical. No false promises, just clear checklists, thorough IELTS coaching, and realistic timeline planning.',
    by: 'Siddharth P., University of Melbourne, Australia',
    imgSrc:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
  },
  {
    tempId: 4,
    testimonial:
      'Mrs. Bhadika Mehta and the team answered every query with unmatched patience. Secured admission for MS in Germany with complete documentation support.',
    by: 'Pooja K., Technical University of Munich, Germany',
    imgSrc:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
  },
  {
    tempId: 5,
    testimonial:
      'From university selection to visa interview prep, their attention to detail and accountability set them apart.',
    by: 'Simran B., University of British Columbia, Canada',
    imgSrc:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
  },
  {
    tempId: 6,
    testimonial:
      'Honest guidance from their Borivali office made the whole overseas admissions process stress-free and straightforward.',
    by: 'Neil D., MS Computer Science, USA',
    imgSrc:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  },
  {
    tempId: 7,
    testimonial:
      'The coaching for GRE and IELTS was exceptional. Dedicated teachers who genuinely care about individual student progress and score improvement.',
    by: 'Priyesh T., Trinity College Dublin, Ireland',
    imgSrc:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
  },
];

const TestimonialCard = ({ position, testimonial, handleMove, cardSize }) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        'absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out select-none',
        isCenter
          ? 'z-10 bg-navy text-white border-navy shadow-card-hover'
          : 'z-0 bg-white text-charcoal border-navy/15 hover:border-accent shadow-card',
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath:
          'polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)',
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? '0px 14px 32px -6px rgba(20,36,58,0.4)'
          : '0px 2px 10px rgba(20,36,58,0.06)',
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-navy/20"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={testimonial.by.split(',')[0]}
        className="mb-4 h-14 w-12 rounded-sm bg-sage object-cover object-top border border-navy/20"
        style={{
          boxShadow: isCenter
            ? '3px 3px 0px rgba(255,255,255,0.3)'
            : '3px 3px 0px rgba(20,36,58,0.1)',
        }}
        loading="lazy"
      />
      <h3
        className={cn(
          'text-caption sm:text-body font-medium leading-relaxed',
          isCenter ? 'text-white' : 'text-charcoal',
        )}
      >
        &ldquo;{testimonial.testimonial}&rdquo;
      </h3>
      <p
        className={cn(
          'absolute bottom-8 left-8 right-8 text-caption font-heading font-semibold',
          isCenter ? 'text-white/80' : 'text-navy',
        )}
      >
        — {testimonial.by}
      </p>
    </div>
  );
};

export function StaggerTestimonials({ items = TESTIMONIALS, className }) {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(items);

  const handleMove = (steps) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = 0; i < steps; i++) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = 0; i < Math.abs(steps); i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia('(min-width: 640px)');
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div
      className={cn('relative w-full overflow-hidden', className)}
      style={{ height: 600 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position =
          testimonialsList.length % 2
            ? index - (testimonialsList.length + 1) / 2
            : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-navy/20 bg-white text-navy transition-colors hover:bg-navy hover:text-white"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => handleMove(1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-navy/20 bg-white text-navy transition-colors hover:bg-navy hover:text-white"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default StaggerTestimonials;
