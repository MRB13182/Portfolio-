import React from 'react';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';

export const Home: React.FC = () => {
  return (
    <div className="w-full">
      {/* 1. Hero Section (Greeting, Titles, Bio, Core Competencies, Profile Image) */}
      <Hero />

      {/* 2. Executive About Section (Profile, Background, Summary, Pillars) */}
      <About />
    </div>
  );
};
