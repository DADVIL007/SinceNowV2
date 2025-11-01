import { useEffect, useState } from "react";

const TAGLINES = [
  "Every second tells your story",
  "Track the moments that matter",
  "Your journey, beautifully visualized",
  "Progress made visible",
  "Celebrate every milestone",
  "Time flows, memories stay",
  "Make every day count",
  "Your life, in living color",
];

export function RotatingTagline() {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % TAGLINES.length);
        setIsVisible(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center mb-6">
      <p
        className={`text-lg md:text-xl font-inter font-medium bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
        data-testid="text-tagline"
      >
        {TAGLINES[index]}
      </p>
    </div>
  );
}
