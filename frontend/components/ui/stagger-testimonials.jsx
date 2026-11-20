'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

export const TESTIMONIALS = [
  {
    tempId: 0,
    testimonial:
      'They help you for studying for the test which you are preparing for. The service provided is quite good and the staff here is also polite. They help you with your queries and also other problems which you face. Overall it was good and convenient for me to do my admission abroad through this agency.',
    by: 'Apurv Nerurkar',
    imgSrc: '/Reviews/review-apurv-nerurkar.jpg',
  },
  {
    tempId: 1,
    testimonial:
      'I had a really good experience with Shine Consultant. They supported and guided me at every step and also helped me decide which country would be best for my studies and future growth. They were always in touch and regularly followed up.',
    by: 'Ashwin Singh',
    imgSrc: '/Reviews/review-ashwin-singh.jpg',
  },
  {
    tempId: 2,
    testimonial:
      'I am extremely grateful to Shine Consultancy for their outstanding support in helping me secure admission to Macquarie University for my Master\'s in Information Systems and Management. From university selection to visa processing, they guided me every step of the way.',
    by: 'Dolwin Menezes, Macquarie University, Australia',
    imgSrc: '/Reviews/review-dolwin-menezes.jpg',
  },
  {
    tempId: 3,
    testimonial:
      'Had a really great experience with Shine Consultant. They helped me sort out my entire UK university application and visa process in just 2 months. The team was extremely supportive, responsive, and professional throughout.',
    by: 'Krishnasagar Thakkar',
    imgSrc: '/Reviews/review-krishnasagar-thakkar.jpg',
  },
  {
    tempId: 4,
    testimonial:
      'All the staff members are very cooperative and friendly. They guided me with ease during my entire process. A special thanks to Priyanka Mam, Neelam Mam, Manoj Sir and Deeksha Mam for going through all the odds and helping us. I would recommend Shine Consulting to all the students looking for Higher Studies.',
    by: 'Madan Panth',
    imgSrc: '/Reviews/review-madan-panth.jpg',
  },
  {
    tempId: 5,
    testimonial:
      'I had an excellent experience with Shine Consultant Borivali. In my opinion, it is one of the best agencies for students who are planning to study abroad. The entire team is extremely professional, supportive, and genuinely cares about every student.',
    by: 'Parth Gala',
    imgSrc: '/Reviews/review-parth-gala.jpg',
  },
  {
    tempId: 6,
    testimonial:
      'Studying abroad is on your mind then Shine Consultancy is the place to be at. No other person than Mr. Parag Mehta could guide you better through the process. The entire process of College and visa application was as smooth as silk, entire credits to Parag sir and his team. The personal attention and guidance I have received has no match.',
    by: 'Raj Ajmera',
    imgSrc: '/Reviews/review-raj-ajmera.jpg',
  },
];

const TestimonialCard = ({ position, testimonial, handleMove, cardSize, onShowProof }) => {
  const isCenter = position === 0;
  const initials = testimonial.by
    .split(',')[0]
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

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
      <div
        className={cn(
          'mb-4 flex h-12 w-12 items-center justify-center rounded-sm text-sm font-bold border',
          isCenter
            ? 'bg-white/20 text-white border-white/30'
            : 'bg-navy/10 text-navy border-navy/20',
        )}
        style={{
          boxShadow: isCenter
            ? '3px 3px 0px rgba(255,255,255,0.3)'
            : '3px 3px 0px rgba(20,36,58,0.1)',
        }}
      >
        {initials}
      </div>
      <h3
        className={cn(
          'text-caption sm:text-body font-medium leading-relaxed line-clamp-5',
          isCenter ? 'text-white' : 'text-charcoal',
        )}
      >
        &ldquo;{testimonial.testimonial}&rdquo;
      </h3>
      <p
        className={cn(
          'absolute bottom-8 left-8 right-16 text-caption font-heading font-semibold truncate',
          isCenter ? 'text-white/80' : 'text-navy',
        )}
      >
        — {testimonial.by}
      </p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onShowProof(testimonial.imgSrc);
        }}
        className={cn(
          'absolute bottom-7 right-8 flex h-7 w-7 items-center justify-center rounded-full transition-colors',
          isCenter
            ? 'bg-white/20 hover:bg-white/30 text-white'
            : 'bg-navy/10 hover:bg-navy/20 text-navy',
        )}
        aria-label="View review proof"
        title="View original review"
      >
        <ImageIcon className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};

export function StaggerTestimonials({ items = TESTIMONIALS, className }) {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(items);
  const [proofImage, setProofImage] = useState(null);

  const closeProof = useCallback(() => setProofImage(null), []);

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
            onShowProof={setProofImage}
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
      {/* Proof Lightbox Modal */}
      {proofImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={closeProof}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw] sm:max-w-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeProof}
              className="absolute -top-3 -right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-charcoal shadow-lg transition-colors hover:bg-gray-100"
              aria-label="Close proof"
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={proofImage}
              alt="Original review screenshot"
              className="max-h-[85vh] w-full rounded-lg shadow-2xl object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default StaggerTestimonials;
