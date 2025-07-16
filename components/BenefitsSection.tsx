import * as React from 'react';
import Card from './ui/Card'; // Asegúrate de que este path sea correcto
import { CiSearch } from "react-icons/ci";
import { CiFolderOn } from "react-icons/ci";
import { CiCircleChevUp } from "react-icons/ci";
import { CiCircleQuestion } from "react-icons/ci";


// Define BenefitItem type if not already defined globally
export interface BenefitItem {
  id: number;
  title: string; // Se mantiene en el tipo pero no se renderiza en la card
  description: string;
  icon: JSX.Element;
}

// Data for benefits (title prop still exists in data, but not rendered in card)
const benefits: BenefitItem[] = [
  {
    id: 1,
    title: '💬Atención instantánea 24/7', // This text title will no longer be rendered in the card
    description: 'Respondé consultas, emails y mensajes sin demoras.',
    icon: <CiCircleQuestion />
  },
  {
    id: 2,
    title: '📂Procesos automatizados',
    description: 'Desde tareas operativas hasta gestión de información.',
    icon: <CiFolderOn />
  },
  {
    id: 3,
    title: '🔍IA entrenada',
    description: 'Nuestros agentes aprenden como si fueran parte de tu equipo.',
    icon: <CiSearch />
  },
  {
    id: 4,
    title: '📈Escalabilidad sin límites',
    description: 'Tu operación crece sin que tu equipo colapse.',
    icon: <CiCircleChevUp />
  },
];

// --- HOOK: useInView (La misma versión robusta que en MetricsSection) ---
function useInView(ref: React.RefObject<HTMLElement>, options = { threshold: 0.2, rootMargin: '-50px' }) {
  const [inView, setInView] = React.useState(false);
  const hasAnimated = React.useRef(false); 

  React.useEffect(() => {
    const element = ref.current;
    if (!element || hasAnimated.current) return; 

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setInView(true);
          hasAnimated.current = true; 
          observer.unobserve(element); 
        }
      },
      options
    );
    
    observer.observe(element);
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
      observer.disconnect();
    };
  }, [ref, options]); 

  return inView;
}

// --- SUBCOMPONENTE: BenefitCard (Refactorizado para coincidir con la imagen) ---

interface BenefitCardProps {
  benefit: BenefitItem;
  index: number;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ benefit, index }) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { threshold: 0.3 });

  const animationDirections = ['left', 'right', 'left', 'right'];
  const direction = animationDirections[index % animationDirections.length];
  const transitionDelay = `${index * 0.15 + 0.2}s`;

  return (
    <div
      ref={cardRef}
      className={`relative transition-all duration-1000 ease-out ${
        inView 
          ? 'opacity-100 translate-x-0 translate-y-0' 
          : direction === 'left'
            ? 'opacity-0 -translate-x-24 translate-y-8'
            : 'opacity-0 translate-x-24 translate-y-8'
      }`}
      style={{ transitionDelay }}
    >
      <Card
        className={`
          flex flex-col items-center justify-center
          min-h-[340px] h-[340px] max-w-[320px] w-full mx-auto 
          overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/80 to-white/60 
          border border-white/30 
          shadow-2xl transition-all duration-300 relative
          rounded-2xl 
        `}
      >
        {/* Íconos centrados y espaciado ajustado */}
        <div className="flex items-center justify-center mb-4 mt-0">
          {React.cloneElement(benefit.icon as React.ReactElement, {
            className: "w-20 h-20 text-brandBlack",
          })}
        </div>

        {/* Descripción ajustada hacia arriba */}
        <div className="relative z-10 p-8 text-center mt-[-15px]">
          <p className="text-base text-textSecondary/80 font-light leading-relaxed max-w-[220px] mx-auto whitespace-pre-line">
            {benefit.description}
          </p>
        </div>
      </Card>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL: BenefitsSection ---
const BenefitsSection: React.FC = () => {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef);

  return (
    <section
      ref={sectionRef}
      id="beneficios"
      className="relative section-spacing bg-transparent overflow-hidden"
    >
      {/* Enhanced Background Effects (ajustados para ser sutiles) */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="w-[60vw] h-[60vw] bg-gradient-to-br from-accentOne/10 to-accentOne/5 rounded-full blur-[120px] absolute -top-32 right-[-10vw] opacity-10 animate-pulse" />
        <div className="w-[45vw] h-[45vw] bg-gradient-to-tl from-accentOne/5 to-transparent rounded-full blur-[90px] absolute bottom-[-10vw] left-[-5vw] opacity-10 animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Título de la sección (AHORA CON SUBRAYADO CENTRADO) */}
        <div
          ref={titleRef}
          className={`text-left mb-20 max-w-3xl transition-all duration-1000 ease-out ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <h2 className="text-5xl md:text-7xl font-extralight text-brandBlack mb-6 tracking-tight drop-shadow-lg relative text-left">
    Qué podes lograr
    {/* Animated underline */}
    <div 
      className={`absolute -bottom-2 left-0 transform h-1 bg-gradient-to-r from-transparent via-accentOne/50 to-transparent transition-all duration-1000 ${
        titleInView ? 'w-32' : 'w-0'
      }`} 
    />
  </h2>
        </div>

        {/* Grid de Beneficios (manteniendo gaps y items-stretch) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 items-stretch justify-items-center">
          {benefits.map((benefit, i) => (
            <BenefitCard key={benefit.id} benefit={benefit} index={i} />
          ))}
        </div>

        {/* Enhanced decorative elements (ajustados para ser sutiles) */}
        <div className="absolute top-1/2 left-0 w-px h-16 bg-gradient-to-b from-transparent via-accentOne/20 to-transparent opacity-20" />
        <div className="absolute top-1/2 right-0 w-px h-16 bg-gradient-to-b from-transparent via-accentOne/20 to-transparent opacity-20" />
      </div>

      {/* Custom animations (se mantienen aunque algunos ya no se usen explícitamente) */}
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