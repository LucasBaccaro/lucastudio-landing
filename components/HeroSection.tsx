import * as React from 'react';
import Button from './ui/Button';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-x-clip bg-gradient-to-br from-brandBeige via-surface to-accentTwo/30 pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-[70vw] h-[70vw] bg-brandBlack/10 rounded-full blur-3xl absolute -top-32 -left-32 animate-pulse" />
        <div className="w-[40vw] h-[40vw] bg-accentOne/20 rounded-full blur-2xl absolute top-1/2 right-0 animate-pulse" />
      </div>
      <div className="relative z-10 flex flex-col items-start max-w-2xl px-6 py-12 md:py-20 backdrop-blur-xl bg-white/60 rounded-3xl shadow-2xl gap-8 animate-fadeInUp w-full">
        <h1 className="text-5xl md:text-7xl font-extralight text-brandBlack leading-tight drop-shadow-lg w-full text-left break-words">IA a <span className="font-bold text-accentOne">medida</span> para tu negocio.</h1>
        <p className="text-xl md:text-2xl text-textSecondary/80 font-light max-w-xl w-full text-left break-words">Tu nuevo equipo no duerme, no se estresa, y responde en segundos.</p>
        <Button variant="primary" size="lg" className="mt-4 shadow-xl hover:scale-105 transition-transform" onClick={() => window.location.href = '#impacto'}>
          Descubrí el impacto
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;