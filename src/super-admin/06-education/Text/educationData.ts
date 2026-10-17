/**
 * 06 - EDUCATION (SUPER ADMIN)
 * 
 * Edit this file to manage university degrees, academic honors, graduation years,
 * CGPA, specialized coursework, and thesis project descriptions.
 */

import { EducationItem } from '../../../types';

export const educationData: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'Bachelor of Science in Computer Science & Engineering (B.Sc CSE)',
    field: 'Computer Science & Software Engineering',
    institution: 'Leading University of Engineering & Technology',
    location: 'Dhaka, Bangladesh',
    duration: '2015 - 2019',
    grade: 'First Class Honors (CGPA: 3.84 / 4.0)',
    highlights: [
      'Specialized in Distributed Algorithms, Database Systems & Object Oriented Architecture',
      'Dean’s Honor List & Best Undergraduate Software Project Award Winner',
    ],
  },
];

export default educationData;
