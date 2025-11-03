"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gold/20 md:block hidden" />

      <div className="space-y-8">
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="relative flex gap-6"
          >
            {/* Dot */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center relative z-10">
                <Calendar className="h-6 w-6 text-gold" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
              <div className="bg-anthracite/50 border border-gold/20 rounded-lg p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-medium text-gold">
                    {event.date}
                  </span>
                </div>
                <h3 className="text-xl font-cinzel font-semibold text-gold mb-2">
                  {event.title}
                </h3>
                <p className="text-cream-white/70">{event.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

