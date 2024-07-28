import React, { useRef } from "react";
import { Heart } from "lucide-react";

const generateRandomPositions = (count) => {
  return Array.from({ length: count }, () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    fontSize: `${Math.random() * 20 + 10}px`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${Math.random() * 10 + 10}s`,
  }));
};

const FloatingHearts = () => {
  const positionsRef = useRef(generateRandomPositions(20));

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {positionsRef.current.map((style, i) => (
        <Heart
          key={i}
          className="absolute text-pink-400 animate-float"
          style={style}
        />
      ))}
    </div>
  );
};

export default FloatingHearts;
