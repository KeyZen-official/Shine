'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

const SQRT_5000 = Math.sqrt(5000);

export const TESTIMONIALS = [
  {
    tempId: 1,
    by: 'Ashwin Singh',
    country: 'United Kingdom',
    countryCode: 'uk',
    flag: '🇬🇧',
    university: 'Coventry University',
    testimonial:
      'I had a really good experience with Shine Consultant. They supported and guided me at every step and also helped me decide which country would be best for my studies and future growth. They were always in touch and regularly followed up.',
    avatar: '/Reviews/ashwin.jpeg',
    imgSrc: '/Reviews/review-ashwin-singh.jpg',
  },
  {
    tempId: 2,
    by: 'Krishnasagar Thakkar',
    country: 'United Kingdom',
    countryCode: 'uk',
    flag: '🇬🇧',
    university: 'University of Bath',
    testimonial:
      'Had a really great experience with Shine Consultant. They helped me sort out my entire UK university application and visa process in just 2 months. The team was extremely supportive, responsive, and professional throughout.',
    avatar: '/Reviews/krishnasagar.jpeg',
    imgSrc: '/Reviews/review-krishnasagar-thakkar.jpg',
  },
  {
    tempId: 3,
    by: 'Dolwin Menezes',
    country: 'Australia',
    countryCode: 'australia',
    flag: '🇦🇺',
    university: 'Macquarie University',
    testimonial:
      'I am extremely grateful to Shine Consultancy for their outstanding support in helping me secure admission to Macquarie University for my Master\'s in Information Systems and Management. From university selection to visa processing, they guided me every step of the way.',
    avatar: '/Reviews/Dolwin.jpeg',
    imgSrc: '/Reviews/review-dolwin-menezes.jpg',
  },
  {
    tempId: 4,
    by: 'Madan Panth',
    country: 'Australia',
    countryCode: 'australia',
    flag: '🇦🇺',
    university: 'University of Wollongong',
    testimonial:
      'All the staff members are very cooperative and friendly. They guided me with ease during my entire process. A special thanks to the team for going through all the odds and helping us. I would recommend Shine Consulting to all students looking for Higher Studies.',
    avatar: '/Reviews/madan.jpeg',
    imgSrc: '/Reviews/review-madan-panth.jpg',
  },
  {
    tempId: 5,
    by: 'Parth Gala',
    country: 'Germany',
    countryCode: 'germany',
    flag: '🇩🇪',
    university: 'University of Europe',
    testimonial:
      'I had an excellent experience with Shine Consultant Borivali. In my opinion, it is one of the best agencies for students who are planning to study abroad. The entire team is extremely professional, supportive, and genuinely cares about every student.',
    avatar: '/Reviews/parth-gala.jpeg',
    imgSrc: '/Reviews/review-parth-gala.jpg',
  },
];

const CountryFlag = ({ code, flag, className = 'h-3.5 w-5' }) => {
  if (code === 'uk') {
    return (
      <span className={cn('inline-flex items-center overflow-hidden rounded-xs shrink-0', className)}>
        <svg viewBox="0 0 60 30" className="h-full w-full">
          <clipPath id="uk-flag-clip"><path d="M0 0v30h60V0z"/></clipPath>
          <path d="M0 0v30h60V0z" fill="#012169"/>
          <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6"/>
          <path d="M0 0l60 30m0-30L0 30" clipPath="url(#uk-flag-clip)" stroke="#C8102E" strokeWidth="4"/>
          <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
          <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6"/>
        </svg>
      </span>
    );
  }
  if (code === 'australia') {
    return (
      <span className={cn('inline-flex items-center overflow-hidden rounded-xs shrink-0', className)}>
        <svg viewBox="0 0 60 30" className="h-full w-full">
          <rect width="60" height="30" fill="#00008B"/>
          <g transform="scale(0.5)">
            <path d="M0 0v30h60V0z" fill="#012169"/>
            <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6"/>
            <path d="M0 0l60 30m0-30L0 30" stroke="#C8102E" strokeWidth="4"/>
            <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
            <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6"/>
          </g>
          <circle cx="15" cy="22" r="3" fill="#fff"/>
          <circle cx="45" cy="6" r="1.5" fill="#fff"/>
          <circle cx="39" cy="12" r="1.5" fill="#fff"/>
          <circle cx="51" cy="11" r="1.5" fill="#fff"/>
          <circle cx="47" cy="22" r="1.5" fill="#fff"/>
          <circle cx="43" cy="16" r="1" fill="#fff"/>
        </svg>
      </span>
    );
  }
  if (code === 'germany') {
    return (
      <span className={cn('inline-flex items-center overflow-hidden rounded-xs shrink-0', className)}>
        <svg viewBox="0 0 60 30" className="h-full w-full">
          <rect width="60" height="10" y="0" fill="#000"/>
          <rect width="60" height="10" y="10" fill="#DD0000"/>
          <rect width="60" height="10" y="20" fill="#FFCE00"/>
        </svg>
      </span>
    );
  }
  return <span className="text-xs leading-none">{flag || '🌍'}</span>;
};

const TestimonialCard = ({ position, testimonial, handleMove, cardSize, onShowProof }) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        'absolute left-1/2 top-1/2 cursor-pointer border-2 p-6 sm:p-7 transition-all duration-500 ease-in-out select-none flex flex-col justify-between',
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

      {/* Top Header Row: Student Avatar + Country Badge */}
      <div className="flex items-center justify-between gap-3 mb-3 pr-8">
        <div
          className={cn(
            'relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-full overflow-hidden border-[2.5px] shadow-md',
            isCenter ? 'border-white/60 ring-2 ring-white/25' : 'border-navy/25 ring-2 ring-navy/10',
          )}
        >
          <img
            src={testimonial.avatar || testimonial.imgSrc}
            alt={testimonial.by}
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Country Badge */}
        <div
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide border shadow-xs',
            isCenter
              ? 'bg-white/15 text-white border-white/25'
              : 'bg-navy/5 text-navy border-navy/15',
          )}
        >
          <CountryFlag code={testimonial.countryCode} flag={testimonial.flag} />
          <span>{testimonial.country === 'United Kingdom' ? 'UK' : testimonial.country}</span>
        </div>
      </div>

      {/* Testimonial Quote */}
      <p
        className={cn(
          'text-xs sm:text-[0.84rem] font-normal leading-relaxed line-clamp-4 my-auto',
          isCenter ? 'text-white/95' : 'text-charcoal/85',
        )}
      >
        &ldquo;{testimonial.testimonial}&rdquo;
      </p>

      {/* Bottom Footer: Student Name & University + Proof Button */}
      <div className="mt-3 pt-2.5 border-t border-current/10 flex items-center justify-between gap-2">
        <div className="min-w-0 pr-2">
          <p
            className={cn(
              'font-heading text-xs sm:text-sm font-bold truncate leading-snug',
              isCenter ? 'text-white' : 'text-navy',
            )}
          >
            — {testimonial.by}
          </p>
          <p
            className={cn(
              'text-[0.7rem] sm:text-[0.76rem] truncate font-semibold mt-0.5',
              isCenter ? 'text-[#FCA5A5]' : 'text-accent',
            )}
          >
            {testimonial.university}
          </p>
        </div>

        {testimonial.imgSrc && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onShowProof(testimonial.imgSrc);
            }}
            className={cn(
              'flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform hover:scale-110 shadow-xs',
              isCenter
                ? 'bg-white/20 hover:bg-white/30 text-white'
                : 'bg-navy/10 hover:bg-navy/20 text-navy',
            )}
            aria-label="View original review"
            title="View original review proof"
          >
            <ImageIcon className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
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
