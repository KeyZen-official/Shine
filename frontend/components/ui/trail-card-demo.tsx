'use client';

// components/ui/trail-card-demo.tsx
import { TrailCard } from "@/components/ui/trail-card";

export default function TrailCardDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <TrailCard
        title="Massachusetts Institute of Technology"
        location="Cambridge, Massachusetts"
        difficulty="#1 QS World Ranking"
        creators="Private Research University"
        distance="Fall & Spring"
        elevation="Tier-1 Merit"
        duration="4 Years (UG)"
        imageUrl="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80"
        onDirectionsClick={() => alert("Explore clicked!")}
      />
    </div>
  );
}

