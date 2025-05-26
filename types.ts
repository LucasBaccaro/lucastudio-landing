
import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export interface BenefitItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface HowItWorksStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

export interface UseCaseItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}
