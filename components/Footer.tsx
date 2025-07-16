import * as React from 'react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brandBlack text-surface pt-12 pb-6 px-4">
      <div className="max-w-6xl mx-auto">

        {/* --- Mobile Layout (hidden on md and larger screens) --- */}
        {/*
          Removed 'text-center' from this main wrapper to allow children to control their alignment.
          'items-center' keeps the main blocks (Logo, Secciones/Contacto row) centered.
        */}
        <div className="flex flex-col items-center md:hidden">

          {/* Columna 1: Logo y descripción - Mobile (Content remains centered) */}
          <div className="flex flex-col items-center space-y-3 mb-8">
            <a href="#" className="flex items-baseline space-x-2 justify-center">
              <span className="font-serif text-3xl font-bold text-surface">Luca</span>
              <span className="font-sans text-xl font-medium text-surface tracking-wider">STUDIO</span>
            </a>
            <p className="text-sm text-surface/80 max-w-xs mx-auto text-center"> {/* Explicitly center text here */}
              Agentes de IA inteligentes para potenciar tu negocio.<br />Hecho en Argentina para resolver lo cotidiano.
            </p>
          </div>

          {/* Secciones y Contacto - Mobile Row */}
          {/*
            'justify-around' distributes the two columns.
            'w-full max-w-md mx-auto' centers the row itself.
          */}
          <div className="flex justify-around w-full max-w-md mx-auto mb-8">
            {/*
              Secciones - Mobile: 'items-start' ensures header and links are left-aligned.
            */}
            <div className="flex flex-col items-start space-y-2">
              <span className="font-semibold mb-1 text-base">Secciones</span>
              <a href="#beneficios" className="hover:text-accentOne transition-colors text-sm">Beneficios</a>
              <a href="#como-funciona" className="hover:text-accentOne transition-colors text-sm">Cómo funciona</a>
              <a href="#impacto" className="hover:text-accentOne transition-colors text-sm">Impacto</a>
            </div>

            {/*
              Contacto - Mobile: 'items-start' ensures header and links are left-aligned.
            */}
            <div className="flex flex-col items-start space-y-2">
              <span className="font-semibold mb-1 text-base">Contacto</span>
              <div className="flex flex-col items-start space-y-2 mt-2"> {/* Inner div also 'items-start' */}
                <a href="https://wa.me/5491133372466" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accentOne transition-colors text-sm">
                  <FaWhatsapp className="w-5 h-5" />
                  <span>WhatsApp</span>
                </a>
                <a href="https://instagram.com/lucastudio.ba" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accentOne transition-colors text-sm">
                  <FaInstagram className="w-5 h-5" />
                  <span>Instagram</span>
                </a>
                <a href="mailto:lucastudio.ba@gmail.com" className="flex items-center gap-2 hover:text-accentOne transition-colors text-sm">
                  <MdEmail className="w-5 h-5" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* --- Desktop Layout (hidden on screens smaller than md) --- */}
        {/*
          This section remains the same as our last desktop version, which already
          correctly uses 'md:items-start' and custom grid columns for left alignment
          of content within each column, matching the image.
        */}
        <div className="hidden md:grid md:grid-cols-[1.8fr_0.8fr_0.8fr] md:gap-x-12 md:gap-y-0 md:items-start">
          {/* Columna 1: Logo y descripción - Desktop (wider, left-aligned) */}
          <div className="flex flex-col items-start space-y-3">
            <a href="#" className="flex items-baseline space-x-2 mb-2">
              <span className="font-serif text-3xl font-bold text-surface">Luca</span>
              <span className="font-sans text-xl font-medium text-surface tracking-wider">STUDIO</span>
            </a>
            <p className="text-sm text-surface/80 max-w-xs">
              Agentes de IA inteligentes para potenciar tu negocio.<br />Hecho en Argentina para resolver lo cotidiano.
            </p>
          </div>

          {/* Columna 2: Secciones - Desktop (narrower, left-aligned) */}
          <div className="flex flex-col items-start space-y-2">
            <span className="font-semibold mb-1 text-base md:text-lg">Secciones</span>
            <a href="#beneficios" className="hover:text-accentOne transition-colors text-sm md:text-base">Beneficios</a>
            <a href="#como-funciona" className="hover:text-accentOne transition-colors text-sm md:text-base">Cómo funciona</a>
            <a href="#impacto" className="hover:text-accentOne transition-colors text-sm md:text-base">Impacto</a>
          </div>

          {/* Columna 3: Información + redes - Desktop (narrower, left-aligned) */}
          <div className="flex flex-col w-full items-start space-y-2">
            <span className="font-semibold mb-1 text-base md:text-lg">Contacto</span>
            <div className="flex flex-col w-full items-start space-y-2 mt-2">
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
      </div> {/* End max-w-6xl mx-auto wrapper */}

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