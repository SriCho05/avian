import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "../components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Star } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  avatar: string;
  fallback: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Finding a certified pilot for our real estate shoots used to be a nightmare. Avian Pilot Portal made it incredibly simple and efficient.",
    name: "Jane Smith",
    title: "CEO, Innovate Realty",
    avatar: "https://i.pravatar.cc/150?img=1",
    fallback: "JS",
  },
  {
    quote:
      "As a freelance pilot, this platform has been a game-changer for my career. The quality of job postings is excellent.",
    name: "Michael Davis",
    title: "Certified Drone Pilot",
    avatar: "https://i.pravatar.cc/150?img=8",
    fallback: "MD",
  },
  // Add more testimonials as needed
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  // Autoplay: advance every 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [index]);

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative w-full max-w-xl mx-auto flex flex-col items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <Card className="p-6">
            <CardContent className="p-0">
              <div className="flex gap-0.5 mb-2 text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="italic">"{testimonials[index].quote}"</p>
              <div className="flex items-center gap-4 mt-4">
                <Avatar>
                  <AvatarImage src={testimonials[index].avatar} />
                  <AvatarFallback>{testimonials[index].fallback}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold">{testimonials[index].name}</p>
                  <p className="text-sm text-muted-foreground">{testimonials[index].title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
      <div className="flex gap-4 mt-6">
        <button
          aria-label="Previous testimonial"
          onClick={prev}
          className="rounded-full bg-muted p-2 hover:bg-primary/10 transition"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <button
          aria-label="Next testimonial"
          onClick={next}
          className="rounded-full bg-muted p-2 hover:bg-primary/10 transition"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
        </button>
      </div>
      <div className="flex gap-2 mt-4">
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={`inline-block w-2 h-2 rounded-full ${i === index ? "bg-primary" : "bg-muted-foreground/30"}`}
          />
        ))}
      </div>
    </div>
  );
}
