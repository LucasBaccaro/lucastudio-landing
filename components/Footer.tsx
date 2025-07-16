import * as React from 'react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brandBlack text-surface pt-12 pb-6 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 items-center">
        {/* Columna 1: Logo y descripción */}
        <div className="flex flex-col items-start md:items-center md:text-center space-y-3 md:col-span-1">
          <a href="#" className="flex items-baseline space-x-2 mb-2 md:justify-center">
            <span className="font-serif text-3xl font-bold text-surface">Luca</span>
            <span className="font-sans text-xl font-medium text-surface tracking-wider">STUDIO</span>
          </a>
          <p className="text-sm text-surface/80 max-w-xs md:mx-auto">
            Agentes de IA inteligentes para potenciar tu negocio.<br />Hecho en Argentina para resolver lo cotidiano.
          </p>
        </div>
        {/* Columna 2: Secciones */}
        <div className="flex flex-col items-start md:items-center md:text-center space-y-2">
          <span className="font-semibold mb-1 text-base md:text-lg">Secciones</span>
          <a href="#beneficios" className="hover:text-accentOne transition-colors text-sm md:text-base">Beneficios</a>
          <a href="#como-funciona" className="hover:text-accentOne transition-colors text-sm md:text-base">Cómo funciona</a>
          <a href="#impacto" className="hover:text-accentOne transition-colors text-sm md:text-base">Impacto</a>
        </div>
        {/* Columna 3: Información + redes */}
        <div className="flex flex-col w-full items-start md:items-center md:text-center space-y-2">
          <span className="font-semibold mb-1 text-base md:text-lg">Contacto</span>
          <div className="flex flex-col w-full items-start md:items-center md:text-center space-y-2 mt-2">
            <a href="https://wa.me/5491133372466" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accentOne transition-colors text-sm md:text-base">
              <FaWhatsapp className="w-5 h-5" />
              <span>WhatsApp</span>
            </a>
            <a href="https://instagram.com/lucastudio.ba" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accentOne transition-colors text-sm md:text-base">
              <FaInstagram className="w-5 h-5" />
              <span>Instagram</span>
            </a>
            <a href="mailto:lucastudio.ba@gmail.com" className="flex items-center gap-2 hover:text-accentOne transition-colors text-sm md:text-base">
              <MdEmail className="w-5 h-5" />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
      {/* Línea divisoria */}
      <div className="w-full h-px bg-surface/10 my-8" />
      {/* Copyright */}
      <div className="text-center text-xs text-surface/50">
        Copyright © {currentYear} LucaStudio AI. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;