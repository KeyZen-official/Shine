"use client";

import * as React from "react";
import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQItem {
  id: number | string;
  question: string;
  answer: string;
  icon?: string;
  iconPosition?: "left" | "right";
}

export interface FaqAccordionProps {
  data: FAQItem[];
  className?: string;
  timestamp?: string;
  questionClassName?: string;
  answerClassName?: string;
}

export function FaqAccordion({
  data = [],
  className,
  timestamp = "Every day, 9:01 AM",
  questionClassName,
  answerClassName,
}: FaqAccordionProps) {
  const [openItem, setOpenItem] = React.useState<string | null>(null);

  if (!data || data.length === 0) return null;

  return (
    <div className={cn("p-4", className)}>
      {timestamp && (
        <div className="mb-4 text-sm text-charcoal-70">{timestamp}</div>
      )}

      <Accordion.Root
        type="single"
        collapsible
        value={openItem || ""}
        onValueChange={(value) => setOpenItem(value)}
      >
        {data.map((item) => {
          const isOpen = openItem === item.id.toString();
          return (
            <Accordion.Item
              value={item.id.toString()}
              key={item.id}
              className="mb-3"
            >
              <Accordion.Header>
                <Accordion.Trigger className="flex w-full items-center justify-start gap-x-3 outline-none focus:outline-none focus-visible:outline-none text-left">
                  <div
                    className={cn(
                      "relative flex items-center space-x-2 rounded-xl px-4 py-2.5 transition-all duration-200 border text-body font-medium",
                      isOpen
                        ? "bg-white text-navy font-semibold ring-2 ring-navy/20 border-navy/20 shadow-md"
                        : "bg-white/90 text-navy hover:bg-white border-navy/10 shadow-sm",
                      questionClassName
                    )}
                  >
                    {item.icon && (
                      <span
                        className={cn(
                          "absolute -top-3.5 select-none text-base pointer-events-none",
                          item.iconPosition === "right" ? "-right-1.5" : "-left-1.5"
                        )}
                        style={{
                          transform:
                            item.iconPosition === "right"
                              ? "rotate(7deg)"
                              : "rotate(-4deg)",
                        }}
                      >
                        {item.icon}
                      </span>
                    )}
                    <span>{item.question}</span>
                  </div>

                  <span
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors",
                      isOpen
                        ? "border-navy bg-navy text-white"
                        : "border-navy/20 bg-white/60 text-navy/70 hover:border-navy/40 hover:bg-white"
                    )}
                    aria-hidden="true"
                  >
                    {isOpen ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content asChild forceMount>
                <motion.div
                  initial="collapsed"
                  animate={isOpen ? "open" : "collapsed"}
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.35, ease: [0.2, 0.6, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="ml-5 mt-2 md:ml-12">
                    <div
                      className={cn(
                        "relative max-w-xs md:max-w-2xl rounded-2xl bg-navy text-white px-5 py-3.5 shadow-card",
                        answerClassName
                      )}
                    >
                      <p className="text-white text-body font-normal leading-relaxed whitespace-pre-line m-0">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </div>
  );
}

export default FaqAccordion;
