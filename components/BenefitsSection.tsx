import * as React from 'react';
import Card from './ui/Card';
import { BenefitItem } from '../types';

const IconWrapper: React.FC<{ children: React.ReactNode; index: number }> = ({ children, index }) => (
  <div className="relative text-brandBlack w-20 h-20 mb-8 flex items-center justify-center bg-gradient-to-br from-white/60 to-white/30 rounded-3xl shadow-lg backdrop-blur-xl border border-white/20 group-hover:scale-110 transition-all duration-500">
    <div className="absolute inset-0 bg-gradient-to-br from-accentOne/10 to-accentOne/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
      {children}
    </div>
    {/* Animated rings */}
    <div className="absolute inset-0 rounded-3xl border-2 border-accentOne/20 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500" />
  </div>
);

const AutomationIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

const PersonalizationIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

const TimeSavingIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const ScalabilityIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
  </svg>
);

const benefits: BenefitItem[] = [
  {
    id: 1,
    title: 'Automatización inteligente de tareas',
    description: 'Nuestros agentes IA gestionan emails, responden mensajes y ejecutan procesos, liberando a tu equipo para tareas de alto valor.',
    icon: <AutomationIcon />,
  },
  {
    id: 2,
    title: 'Conocimiento profundo de tu negocio',
    description: 'Entrenamos a cada agente IA con tus datos (documentos, FAQs, bases de datos, etc.) para que actúe con la voz y el conocimiento de tu marca.',
    icon: <PersonalizationIcon />,
  },
  {
    id: 3,
    title: 'Eficiencia operativa multiplicada',
    description: 'Reduce drásticamente el tiempo en tareas manuales y optimiza costos al tener agentes IA trabajando 24/7 en tus operaciones.',
    icon: <TimeSavingIcon />,
  },
  {
    id: 4,
    title: 'Capacidad de respuesta escalable',
    description: 'Maneja un volumen creciente de interacciones y tareas sin aumentar proporcionalmente tu equipo. Crece de forma inteligente.',
    icon: <ScalabilityIcon />,
  },
];

// Enhanced intersection observer hook
function useInView(ref: React.RefObject<HTMLDivElement>, options = { threshold: 0.2, rootMargin: '-50px' }) {
  const [inView, setInView] = React.useState(false);
  
  React.useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView) {
          setInView(true);
        }
      },
      options
    );
    
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options, inView]);
  
  return inView;
}

const BenefitsSection: React.FC = () => {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef);

  // Animation directions for cards
  const getAnimationDirection = (index: number) => {
    const directions = ['left', 'right', 'left', 'right'];
    return directions[index % directions.length];
  };

  return (
    <section 
      ref={sectionRef}
      id="beneficios" 
      className="relative section-spacing bg-transparent overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="w-[50vw] h-[50vw] bg-gradient-to-br from-accentOne/15 to-accentOne/5 rounded-full blur-3xl absolute -top-32 right-[-10vw] animate-pulse" />
        <div className="w-[35vw] h-[35vw] bg-gradient-to-tl from-accentOne/8 to-transparent rounded-full blur-2xl absolute bottom-[-10vw] left-[-5vw] animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Title Section */}
        <div 
          ref={titleRef}
          className={`text-left mb-20 max-w-3xl transition-all duration-1000 ease-out ${
            titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-5xl md:text-7xl font-extralight text-brandBlack mb-6 tracking-tight drop-shadow-lg relative">
            Beneficios
            {/* Animated underline */}
            <div className={`absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-transparent via-accentOne/50 to-transparent transition-all duration-1000 ${
              titleInView ? 'w-32' : 'w-0'
            }`} />
          </h2>
          <p className="text-xl md:text-2xl text-textSecondary/80 font-light leading-relaxed">
            Lo que tu negocio puede lograr con IA personalizada.
          </p>
        </div>

        {/* Enhanced Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 items-stretch">
          {benefits.map((benefit, i) => {
            const ref = React.useRef<HTMLDivElement>(null);
            const inView = useInView(ref);
            const direction = getAnimationDirection(i);
            return (
              <div
                key={benefit.id}
                ref={ref}
                className={`relative transition-all duration-1000 ease-out ${
                  inView 
                    ? 'opacity-100 translate-x-0 translate-y-0' 
                    : direction === 'left'
                      ? 'opacity-0 -translate-x-24 translate-y-8'
                      : 'opacity-0 translate-x-24 translate-y-8'
                }`}
                style={{ 
                  transitionDelay: `${i * 0.15 + 0.2}s`,
                }}
              >
                <Card
                  className={`group flex flex-col items-center justify-center min-h-[340px] h-[340px] max-w-[320px] w-full mx-auto overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/80 to-white/60 border border-white/30 hover:border-white/50 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105 hover:bg-white/90 relative`}
                >
                  {/* Card shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Content */}
                  <div className="relative z-10 p-8 text-center">
                    <h3 className="text-2xl md:text-2xl font-light text-brandBlack mb-4 text-center break-words whitespace-pre-line leading-tight group-hover:text-accentOne/90 transition-colors duration-500">
                      {benefit.title}
                    </h3>
                    <p className="text-base text-textSecondary/80 text-center font-light break-words whitespace-pre-line max-w-[95%] mx-auto leading-relaxed group-hover:text-textSecondary/90 transition-colors duration-500">
                      {benefit.description}
                    </p>
                  </div>
                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accentOne/50 to-accentOne/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </Card>
                {/* Floating shadow effect */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br from-accentOne/10 to-transparent rounded-3xl blur-xl opacity-0 transition-all duration-700 -z-10 ${
                    inView ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ 
                    transitionDelay: `${i * 0.15 + 0.8}s`,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Enhanced decorative elements */}
        <div className="absolute top-1/2 left-0 w-px h-20 bg-gradient-to-b from-transparent via-accentOne/30 to-transparent opacity-30" />
        <div className="absolute top-1/2 right-0 w-px h-20 bg-gradient-to-b from-transparent via-accentOne/30 to-transparent opacity-30" />
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes floatIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .shimmer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default BenefitsSection;