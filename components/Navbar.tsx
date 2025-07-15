
import * as React from 'react';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Impacto', href: '#impacto' },
  { label: 'Contacto', href: '#contacto' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'backdrop-blur-xl bg-white/60' : 'backdrop-blur-md bg-white/40'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <a href="#" className="flex items-baseline space-x-1">
          <span className="font-serif text-5xl font-bold text-brandBlack">Luca</span>
          <span className="font-sans text-3xl font-medium text-brandBlack tracking-wider">STUDIO</span>
        </a>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-brandBlack focus:outline-none"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
        <nav className="hidden md:flex space-x-10 lg:space-x-14">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-textPrimary hover:text-accentOne font-medium transition-colors text-lg"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      {isOpen && (
        <div className="md:hidden fixed top-20 left-0 w-full bg-white/80 backdrop-blur-xl shadow-2xl animate-fadeIn flex flex-col items-center py-8 space-y-6 z-40">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl text-brandBlack hover:text-accentOne font-medium transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
