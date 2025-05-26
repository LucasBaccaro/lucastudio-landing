import React from 'react';
import Button from './ui/Button';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-brandBeige section-spacing">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-textPrimary mb-6 leading-tight">
          Agentes de IA que entienden y <br className="hidden sm:inline" />
          <span className="text-brandBlack">operan como tu negocio.</span>
        </h1>
        <p className="text-lg sm:text-xl text-textSecondary mb-10 max-w-3xl mx-auto">
          En LucaStudio, creamos agentes de inteligencia artificial entrenados con tus datos (emails, documentos, bases de conocimiento, stock y más) para gestionar comunicaciones, automatizar tareas y tomar acciones inteligentes. Revoluciona cómo interactúas y operas.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button variant="primary" size="lg" onClick={() => window.location.href = '#contacto'}>
            Comunicate con nosotros
          </Button>
          <Button variant="outline" size="lg" onClick={() => window.location.href = '#como-funciona'}>
            Cómo funciona
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;