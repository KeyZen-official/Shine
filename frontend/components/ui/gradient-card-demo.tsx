'use client';

// components/ui/gradient-card-demo.tsx

import React from 'react';
import { GradientCard } from "@/components/ui/gradient-card";

// Data for the cards to demonstrate reusability with verified Unsplash images
const cardData = [
  {
    badgeText: "Open / Invite-priority",
    badgeColor: "#F59E0B", // Amber
    title: "Companies",
    description: "Build teams of highly motivated tech-professionals across the globe, with projects across all industries.",
    ctaText: "Start hiring",
    ctaHref: "#",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80",
    gradient: "orange" as const,
  },
  {
    badgeText: "Open for applications",
    badgeColor: "#4B5563", // Gray
    title: "Builders",
    description: "Work on your own terms in a motivating and healthy environment. You will earn TMW-tokens too!",
    ctaText: "Apply now",
    ctaHref: "#",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80",
    gradient: "gray" as const,
  },
  {
    badgeText: "Invite only",
    badgeColor: "#8B5CF6", // Purple
    title: "Scouts",
    description: "As a scout you will utilize your network to refer new members and companies to earn ownership in form of TMW-tokens.",
    ctaText: "Request invite",
    ctaHref: "#",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    gradient: "purple" as const,
  },
  {
    badgeText: "Invite only",
    badgeColor: "#10B981", // Green
    title: "Partners",
    description: "As a partner you can offer direct access to the Teamway society to your portfolio companies, community or customers.",
    ctaText: "Get in touch",
    ctaHref: "#",
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80",
    gradient: "green" as const,
  },
];

export const GradientCardDemo = () => {
  return (
    <div className="p-4 sm:p-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
        {cardData.map((card, index) => (
          <GradientCard
            key={index}
            badgeText={card.badgeText}
            badgeColor={card.badgeColor}
            title={card.title}
            description={card.description}
            ctaText={card.ctaText}
            ctaHref={card.ctaHref}
            imageUrl={card.imageUrl}
            gradient={card.gradient}
          />
        ))}
      </div>
    </div>
  );
};

export default GradientCardDemo;

