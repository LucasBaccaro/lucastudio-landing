import * as React from 'react';
import { HowItWorksStep } from '../types';

const IconStepWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-accentOne/20 to-accentOne/40 shadow-xl backdrop-blur-xl border-2 border-accentOne/30 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
    <div className="relative z-10">
      {children}
    </div>
  </div>
);

// Improved SVG Icons with better styling
const StepOneIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" className="w-8 h-8">
    <text 
      x="50%" 
      y="50%" 
      dominantBaseline="middle" 
      textAnchor="middle" 
      fontSize="16" 
      fontWeight="700" 
      fill="currentColor"
      className="text-accentOne"
    >
      1
    </text>
  </svg>
);

const StepTwoIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" className="w-8 h-8">
    <text 
      x="50%" 
      y="50%" 
      dominantBaseline="middle" 
      textAnchor="middle" 
      fontSize="16" 
      fontWeight="700" 
      fill="currentColor"
      className="text-accentOne"
    >
      2
    </text>
  </svg>
);

const StepThreeIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" className="w-8 h-8">
    <text 
      x="50%" 
      y="50%" 
      dominantBaseline="middle" 
      textAnchor="middle" 
      fontSize="16" 
      fontWeight="700" 
      fill="currentColor"
      className="text-accentOne"
    >
      3
    </text>
  </svg>
);

const steps: HowItWorksStep[] = [
  {
    id: 1,
    title: 'Conversamos con vos',
    description: 'Definimos juntos los desafíos y objetivos.',
    icon: <StepOneIcon />,
    image: 'https://img.icons8.com/?size=100&id=61864&format=png&color=000000',
  },
  {
    id: 2,
    title: 'Diseñamos tu agente IA',
    description: 'Con la info que nos brindás, creamos un agente que representa tu marca.',
    icon: <StepTwoIcon />,
    image: 'https://via.placeholder.com/800x600/374151/F5F1EA?text=Diseño+Agente+IA',
  },
  {
    id: 3,
    title: 'Lo activamos y te acompañamos',
    description: 'Entrenamos, integramos y hacemos seguimiento continuo para que funcione al 100%.',
    icon: <StepThreeIcon />,
    image: 'https://via.placeholder.com/800x600/374151/F5F1EA?text=Agente+IA+Activo',
  },
];

// Enhanced intersection observer hook
function useInView(ref: React.RefObject<HTMLDivElement>, options = { threshold: 0.3, rootMargin: '-50px' }) {
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

const HowItWorksSection: React.FC = () => {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef);

  return (
    <section 
      ref={sectionRef}
      id="como-funciona" 
      className="relative section-spacing bg-transparent overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="w-[50vw] h-[50vw] bg-gradient-to-br from-accentOne/15 to-accentOne/5 rounded-full blur-3xl absolute top-0 right-[-10vw] animate-pulse" />
        <div className="w-[30vw] h-[30vw] bg-gradient-to-tl from-accentOne/10 to-transparent rounded-full blur-2xl absolute bottom-0 left-[-5vw] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Title Section */}
        <div 
          ref={titleRef}
          className={`text-left mb-20 max-w-3xl transition-all duration-1000 ease-out ${
            titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-5xl md:text-7xl font-extralight text-brandBlack mb-6 tracking-tight drop-shadow-lg relative text-left">
    Cómo lo hacemos
    {/* Animated underline */}
    <div 
      className={`absolute -bottom-2 left-0 transform h-1 bg-gradient-to-r from-transparent via-accentOne/50 to-transparent transition-all duration-1000 ${
        titleInView ? 'w-32' : 'w-0'
      }`} 
    />
  </h2>
          <p className="text-xl md:text-2xl text-textSecondary/80 font-light leading-relaxed">
            Nuestro proceso para crear tu agente de IA personalizado.
          </p>
        </div>

        {/* Enhanced Steps Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connection Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accentOne/30 via-accentOne/50 to-accentOne/30 hidden md:block" />
          
          {steps.map((step, i) => {
            const ref = React.useRef<HTMLDivElement>(null);
            const inView = useInView(ref);
            
            return (
              <div
                key={step.id}
                ref={ref}
                className={`relative flex items-center mb-16 last:mb-0 w-full transition-all duration-1000 ease-out ${
                  inView 
                    ? 'opacity-100 translate-x-0' 
                    : i % 2 === 0 
                      ? 'opacity-0 -translate-x-20' 
                      : 'opacity-0 translate-x-20'
                }`}
                style={{ 
                  transitionDelay: `${i * 0.2 + 0.2}s`,
                  transform: inView ? 'translateX(0)' : (i % 2 === 0 ? 'translateX(-80px)' : 'translateX(80px)')
                }}
              >
                {/* Step Number/Icon */}
                <div className="relative z-20 mr-8 flex-shrink-0">
                  <IconStepWrapper>{step.icon}</IconStepWrapper>
                </div>

                {/* Enhanced Card */}
                <div className={`flex-1 group transition-all duration-700 ease-out ${
                  inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                  <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/70 to-white/50 rounded-3xl shadow-2xl hover:shadow-3xl p-8 md:p-12 border border-white/20 transition-all duration-500 hover:scale-[1.02] hover:bg-white/80">
                    {/* Card shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-2xl md:text-3xl font-light text-brandBlack mb-4 break-words whitespace-pre-line leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-base md:text-lg text-textSecondary/80 font-light break-words whitespace-pre-line max-w-[95%] leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-2 h-2 bg-accentOne/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-4 right-6 w-1 h-1 bg-accentOne/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add custom keyframes for more advanced animations */}
      <style jsx>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
};

export default HowItWorksSection;