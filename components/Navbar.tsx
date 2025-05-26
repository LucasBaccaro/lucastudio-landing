
import React, { useState, useEffect } from 'react';
import Button from './ui/Button';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Casos de uso', href: '#casos-de-uso' },
  { label: 'Testimonios', href: '#testimonios' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brandBeige/90 backdrop-blur-md shadow-sm' : 'bg-brandBeige/80'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-baseline space-x-1">
            <span className="font-serif text-4xl font-bold text-brandBlack">Luca</span>
            <span className="font-sans text-2xl font-medium text-brandBlack tracking-wider">STUDIO</span>
          </a>
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-textPrimary hover:text-opacity-70 font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <Button variant="primary" size="md" onClick={() => window.location.href = '#contacto'}>
               Comunicate con nosotros
            </Button>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brandBlack focus:outline-none"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isOpen}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-brandBeige shadow-lg pb-4 absolute w-full">
          <nav className="flex flex-col items-center space-y-4 px-4 pt-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block w-full text-center py-2 text-textPrimary hover:text-opacity-70 font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Button variant="primary" size="md" className="w-full" onClick={() => { window.location.href = '#contacto'; setIsOpen(false); }}>
              Comunicate con nosotros
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
