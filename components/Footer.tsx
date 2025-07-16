import * as React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brandBlack text-surface py-10 sm:py-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-6 md:mb-0">
             <a href="#" className="flex items-baseline justify-center md:justify-start space-x-1">
                <span className="font-serif text-3xl font-bold text-surface">Luca</span>
                <span className="font-sans text-xl font-medium text-surface tracking-wider">STUDIO</span>
            </a>
            <p className="text-sm mt-2 text-surface/60">Agentes de IA inteligentes para potenciar tu negocio.</p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8 mb-6 md:mb-0">
            <a href="#beneficios" className="hover:text-surface/80 transition-colors">Beneficios</a>
            <a href="#como-funciona" className="hover:text-surface/80 transition-colors">Cómo funciona</a>
            <a href="#impacto" className="hover:text-surface/80 transition-colors">Impacto</a>
            <a href="#contacto" className="hover:text-surface/80 transition-colors">Contacto</a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-surface/10 text-sm text-center text-surface/50">
            <p>&copy; {currentYear} LucaStudio AI. Todos los derechos reservados.</p>
            <p className="mt-1">
              <a href="#" className="hover:text-surface underline">Política de privacidad</a> | 
              <a href="#" className="hover:text-surface underline"> Términos y condiciones</a>
            </p>
          </div>
      </div>
    </footer>
  );
};

export default Footer;