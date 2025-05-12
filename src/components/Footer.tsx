import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
<footer className="bg-opacity-30 bg-black backdrop-blur-md py-3 shadow-lg">
  <div className="container mx-auto px-4 text-center">
    <p className="text-sm flex items-center justify-center gap-1 text-gray-300">
      Created with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> from{" "}
      <a
        href="https://stanchev.bg"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-white transition"
      >
        Stanchev
      </a>{" "}
      in {new Date().getFullYear()}
    </p>
  </div>
</footer>
  );
};