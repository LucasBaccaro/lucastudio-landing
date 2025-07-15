import * as React from 'react';
import Card from './ui/Card';

const metrics = [
  {
    id: 1,
    value: '120h+',
    label: 'Horas ahorradas/mes',
    description: 'Automatización de tareas repetitivas y gestión de comunicaciones.'
  },
  {
    id: 2,
    value: '85%',
    label: 'Reducción de tareas manuales',
    description: 'Procesos internos optimizados con IA.'
  },
  {
    id: 3,
    value: 'Ya',
    label: 'Tiempo de respuesta',
    description: 'Respuestas automáticas a clientes y consultas internas.'
  },
  {
    id: 4,
    value: '∞',
    label: 'Escalabilidad',
    description: 'Tu IA nunca duerme, nunca se cansa.'
  }
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

// Counter animation hook
function useCounterAnimation(targetValue: string, inView: boolean, duration: number = 2000) {
  const [currentValue, setCurrentValue] = React.useState('0');
  
  React.useEffect(() => {
    if (!inView) return;
    
    // Handle numeric values
    const numericMatch = targetValue.match(/(\d+)/);
    if (numericMatch) {
      const target = parseInt(numericMatch[1]);
      const increment = target / (duration / 16); // 60fps
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          setCurrentValue(targetValue);
          clearInterval(timer);
        } else {
          setCurrentValue(Math.floor(current) + targetValue.replace(/\d+/, ''));
        }
      }, 16);
      
      return () => clearInterval(timer);
    } else {
      // Handle non-numeric values with delay
      const timer = setTimeout(() => {
        setCurrentValue(targetValue);
      }, duration * 0.7);
      
      return () => clearTimeout(timer);
    }
  }, [inView, targetValue, duration]);
  
  return currentValue;
}

const MetricsSection: React.FC = () => {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef);

  // Animation directions - staggered entrance
  const getAnimationDirection = (index: number) => {
    const directions = ['bottom', 'top', 'bottom', 'top'];
    return directions[index % directions.length];
  };

  return (
    <section 
      ref={sectionRef}
      id="impacto" 
      className="relative section-spacing bg-transparent overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        {/* Main background orbs */}
        <div className="w-[70vw] h-[70vw] bg-gradient-to-br from-brandBlack/15 to-brandBlack/5 rounded-full blur-3xl absolute -top-40 -left-40 animate-pulse" />
        <div className="w-[50vw] h-[50vw] bg-gradient-to-tl from-accentOne/20 to-accentOne/5 rounded-full blur-2xl absolute top-1/2 right-[-10vw] animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.5) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Title Section */}
        <div 
          ref={titleRef}
          className={`text-center mb-20 transition-all duration-1000 ease-out ${
            titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-5xl md:text-7xl font-extralight text-brandBlack mb-6 tracking-tight drop-shadow-lg relative">
            Impacto real
            {/* Animated underline */}
            <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-accentOne/50 to-transparent transition-all duration-1000 ${
              titleInView ? 'w-32' : 'w-0'
            }`} />
          </h2>
          <p className="text-xl md:text-2xl text-textSecondary/80 max-w-3xl mx-auto font-light leading-relaxed">
            Mirá lo que podés lograr con agentes de IA personalizados para tu negocio.
          </p>
        </div>

        {/* Enhanced Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 items-stretch">
          {metrics.map((metric, i) => {
            const ref = React.useRef<HTMLDivElement>(null);
            const inView = useInView(ref);
            const direction = getAnimationDirection(i);
            const animatedValue = useCounterAnimation(metric.value, inView, 1800);
            return (
              <div
                key={metric.id}
                ref={ref}
                className={`relative transition-all duration-1000 ease-out ${
                  inView 
                    ? 'opacity-100 translate-x-0 translate-y-0' 
                    : direction === 'bottom'
                      ? 'opacity-0 translate-y-12'
                      : 'opacity-0 -translate-y-12'
                }`}
                style={{ 
                  transitionDelay: `${i * 0.2 + 0.3}s`,
                }}
              >
                <Card
                  className={`group flex flex-col items-center justify-center min-h-[340px] h-[340px] max-w-[320px] w-full mx-auto overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/80 to-white/60 border border-white/30 hover:border-white/50 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105 hover:bg-white/90 relative`}
                >
                  {/* Card shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  {/* Content */}
                  <div className="relative z-10 p-8 text-center flex flex-col justify-between h-full">
                    {/* Animated metric value */}
                    <div className="flex flex-col justify-between h-full">
                      <div className="text-5xl md:text-6xl font-bold text-brandBlack mb-4 transition-all duration-500 group-hover:scale-110">
                        <span className="inline-block transform transition-transform duration-500 group-hover:scale-110">
                          {animatedValue}
                        </span>
                      </div>
                      <div className="text-lg md:text-xl font-medium mb-3 text-center break-words max-w-full transition-colors duration-500 text-textSecondary group-hover:text-brandBlack">
                        {metric.label}
                      </div>
                      <div className="text-base text-textSecondary/80 text-center font-light break-words max-w-[95%] mx-auto whitespace-pre-line leading-relaxed group-hover:text-textSecondary/90 transition-colors duration-500">
                        {metric.description}
                      </div>
                    </div>
                  </div>
                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-accentOne/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </Card>
                {/* Floating shadow effect */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br from-accentOne/10 to-transparent rounded-3xl blur-xl opacity-0 transition-all duration-700 -z-10 ${
                    inView ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ 
                    transitionDelay: `${i * 0.2 + 1}s`,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-accentOne/30 to-transparent opacity-50" />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-t from-accentOne/30 to-transparent opacity-50" />
      </div>

      {/* Advanced animations */}
      <style jsx>{`
        @keyframes countUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes glow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
        
        @keyframes ripple {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        .metric-value {
          animation: countUp 0.8s ease-out forwards;
        }
        
        .glow-effect {
          animation: glow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default MetricsSection;