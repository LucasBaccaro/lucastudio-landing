import * as React from 'react';
import Card from './ui/Card'; // Asegúrate de que este path sea correcto
import { FaInfinity } from "react-icons/fa";

// --- DATOS (con el cambio en el label) ---
const metrics = [
  {
    id: 1,
    value: '99h+',
    label: 'Horas ahorradas/mes',
    description: 'Automatización de tareas repetitivas y gestión de comunicaciones.'
  },
  {
    id: 2,
    value: '-85%',
    label: 'Tareas manuales reducidas',
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
    value: 'Progreso',
    // === CAMBIO AQUÍ: Añadido el salto de línea \n ===
    label: 'Expansión operativa\ncontinua', 
    description: 'Tu operación se adapta y crece sin fricciones.'
  }
];

// --- HOOKS (sin cambios, ya están bien) ---

// Hook de Intersection Observer
function useInView(ref: React.RefObject<HTMLElement>, options = { threshold: 0.2, rootMargin: '-50px' }) {
  const [inView, setInView] = React.useState(false);
  const hasAnimated = React.useRef(false); // Para asegurar que la animación ocurre solo una vez

  React.useEffect(() => {
    const element = ref.current;
    if (!element || hasAnimated.current) return; // Si ya animó, no observar más

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setInView(true);
          hasAnimated.current = true; // Marcar como animado
          observer.unobserve(element); // Dejar de observar una vez que se activa
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
  }, [ref, options]); // Dependencias: ref y options

  return inView;
}

// Hook de animación de contador (sin cambios, ya está bien)
function useCounterAnimation(targetValue: string, inView: boolean, duration: number = 1800) {
  const [currentValue, setCurrentValue] = React.useState('0');
  const animationFrameRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    // Si no está en vista, resetear y parar cualquier animación
    if (!inView) {
      setCurrentValue('0'); // Resetear a 0 cuando sale de vista
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    // Cancelar cualquier animación pendiente antes de iniciar una nueva
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // Regex mejorado: acepta prefijos, negativos y porcentajes, y sufijos
    // Captura: [1]prefijo, [2]numero (incluyendo negativo y decimal), [3]sufijo
    const numericMatch = targetValue.match(/^([^0-9-]*)(-?[0-9]+(?:\.[0-9]+)?)(.*)$/);

    if (numericMatch) {
      const prefix = numericMatch[1] || '';
      const targetNum = parseFloat(numericMatch[2]);
      const suffix = numericMatch[3] || '';
      
      const startTime = Date.now();
      const startNum = 0; // Siempre empezar desde 0

      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1); // Clamp progress to 1

        let animatedNum = startNum + (targetNum - startNum) * progress;

        let displayNum: number | string;

        // Lógica de redondeo: usar Math.round para enteros y mantener decimales para flotantes
        if (targetValue.includes('.')) {
          displayNum = Math.round(animatedNum * 100) / 100; // Redondear a 2 decimales
        } else {
          displayNum = Math.round(animatedNum); // Redondear al entero más cercano para una transición suave
        }
        
        // Cuando la animación ha terminado (progress es 1), usar el targetValue exacto
        if (progress === 1) {
          setCurrentValue(targetValue); // Asegura que el valor final sea EXACTAMENTE el targetValue
          animationFrameRef.current = null; // Detener la animación
        } else {
          setCurrentValue(`${prefix}${displayNum}${suffix}`);
          animationFrameRef.current = requestAnimationFrame(animate);
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);

      // Función de limpieza para cancelar la animación si el componente se desmonta o las dependencias cambian
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      };
    } else {
      // Para valores no numéricos ('Ya', 'Progreso'), simplemente mostrarlos después de un pequeño retraso
      const timer = setTimeout(() => {
        setCurrentValue(targetValue);
      }, duration * 0.3); // Aparece más rápido para no-numéricos
      return () => clearTimeout(timer);
    }
  }, [inView, targetValue, duration]); // Dependencias: re-ejecutar si estos cambian

  return currentValue;
}

// --- SUBCOMPONENTE: MetricCard (con el cambio en la h3) ---

interface MetricCardProps {
  metric: typeof metrics[0];
  index: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric, index }) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { threshold: 0.3 }); // Threshold ligeramente más alto
  const animatedValue = useCounterAnimation(metric.value, inView, 1800);

  // Define las direcciones de animación para un efecto escalonado
  const animationDirections = ['bottom', 'top', 'bottom', 'top'];
  const direction = animationDirections[index % animationDirections.length];
  
  // Retraso para el efecto escalonado de las cards
  const transitionDelay = `${index * 0.15 + 0.3}s`;

  return (
    <div
      ref={cardRef}
      className={`relative transition-all duration-1000 ease-out ${
        inView 
          ? 'opacity-100 translate-y-0' 
          : direction === 'bottom'
            ? 'opacity-0 translate-y-12'
            : 'opacity-0 -translate-y-12'
      }`}
      style={{ transitionDelay }}
    >
      <Card
        className={`
          flex flex-col items-center
          min-h-[340px] h-[340px] max-w-[320px] w-full mx-auto 
          overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/80 to-white/60 
          border border-white/30 
          shadow-2xl transition-all duration-300 relative
          rounded-2xl
        `}
      >
        {/* Contenido centrado (AJUSTADO PARA MEJOR CONSISTENCIA VISUAL) */}
        <div className="relative z-10 p-8 text-center"> {/* Solo padding y centrado de texto */}
          {/* Animated metric value */}
          <div className="text-5xl md:text-6xl font-extrabold text-brandBlack mb-4">
            {animatedValue}
          </div>
          {/* Metric label */}
          {/* === CAMBIO AQUÍ: Añadido whitespace-pre-line a la h3 === */}
          <h3 className="text-base md:text-lg font-medium text-textSecondary mb-3 whitespace-pre-line">
            {metric.label}
          </h3>
          {/* Metric description */}
          <p className="text-sm text-textSecondary/80 font-light leading-relaxed max-w-[220px] mx-auto whitespace-pre-line min-h-[72px]">
            {metric.description}
          </p>
        </div>
      </Card>
      
      {/* Sombra flotante (sin cambios - asumiendo que quieres mantenerla) */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-accentOne/10 to-transparent rounded-3xl blur-xl transition-all duration-700 -z-10 ${
          inView ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: `${index * 0.2 + 0.8}s` }}
      />
    </div>
  );
};


// --- COMPONENTE PRINCIPAL (sin cambios) ---

const MetricsSection: React.FC = () => {
  const titleRef = React.useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef);

  return (
    <section 
      id="impacto" 
      className="relative section-spacing bg-transparent overflow-hidden"
    >
      {/* Fondos y decoraciones (sin cambios) */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="w-[80vw] h-[80vw] bg-gradient-to-br from-brandBlack/7 to-brandBlack/2 rounded-full blur-[140px] absolute -top-40 -left-40 opacity-10 animate-pulse" />
        <div className="w-[60vw] h-[60vw] bg-gradient-to-tl from-accentOne/10 to-accentOne/2 rounded-full blur-[100px] absolute top-1/2 right-[-10vw] opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 opacity-2" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0)`, backgroundSize: '50px 50px' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Título de la sección (sin cambios, ya se veía bien) */}
        <div 
          ref={titleRef}
          className={`text-left mb-20 max-w-3xl transition-all duration-1000 ease-out ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h2 className="text-5xl md:text-7xl font-extralight text-brandBlack mb-6 tracking-tight drop-shadow-lg relative text-left">
          Impacto real
            {/* Animated underline */}
            <div 
              className={`absolute -bottom-2 left-0 transform h-1 bg-gradient-to-r from-transparent via-accentOne/50 to-transparent transition-all duration-1000 ${
                titleInView ? 'w-32' : 'w-0'
              }`} 
            />
          </h2>
          <p className="text-xl md:text-2xl text-textSecondary/80 font-light leading-relaxed max-w-full">
            Mirá lo que podés lograr con agentes de IA personalizados para tu negocio.
          </p>
        </div>

        {/* Grid de métricas (manteniendo los gaps y alineación) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 items-stretch justify-items-center">
          {metrics.map((metric, i) => (
            <MetricCard key={metric.id} metric={metric} index={i} />
          ))}
        </div>
        
        {/* Elementos decorativos (sin cambios) */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-accentOne/30 to-transparent opacity-50" />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-t from-accentOne/30 to-transparent opacity-50" />
      </div>

      {/* CSS adicional (sin cambios) */}
      <style jsx>{`
        @keyframes countUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes glow { 0%, 100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 1; transform: scale(1.05); } }
        @keyframes ripple { 0% { transform: scale(0.8); opacity: 1; } 100% { transform: scale(2); opacity: 0; } }
        .metric-value { animation: countUp 0.8s ease-out forwards; }
        .glow-effect { animation: glow 3s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default MetricsSection;