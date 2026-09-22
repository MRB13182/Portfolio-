import React from 'react';
import { Hero } from '../components/sections/Hero';

export const Home: React.FC = () => {
  return (
    <div className="w-full">
      {/* Home / Hero Section (Hero, Intro, Profile Image, 2-4 Featured Skills, See More Skills) */}
      <Hero />
    </div>
  );
};
