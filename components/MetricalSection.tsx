import * as React from 'react';
import Card from './ui/Card'; // Asegúrate de que este path sea correcto
import { FaInfinity } from "react-icons/fa";

// --- DATOS (sin cambios) ---
const metrics = [
  {
    id: 1,
    value: '120h+',
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
label: 'Expansión operativa continua',
description: 'Tu operación se adapta y crece sin fricciones.'
  }
];

// --- HOOKS (afinadas para un disparo único y limpieza) ---

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

// Hook de animación de contador (MEJORADO Y ROBUSTO)
function useCounterAnimation(targetValue: string, inView: boolean, duration: number = 1800) {
  const [currentValue, setCurrentValue] = React.useState('0');
  const animationFrameRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    // Si no está en vista o el valor ya es el objetivo, no hacer nada.
    // O si ya está animado, no re-animar.
    if (!inView) {
      setCurrentValue('0'); // Reset para la próxima vez que entre en vista
      return;
    }

    // Cancelar cualquier animación previa para evitar conflictos
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    // Regex para capturar prefijo, número (con decimales o signo) y sufijo
    const numericMatch = targetValue.match(/^([^0-9.-]*)([0-9.]+)(.*)$/);
    
    if (numericMatch) {
      const prefix = numericMatch[1] || '';
      const targetNum = parseFloat(numericMatch[2]);
      const suffix = numericMatch[3] || '';
      
      const startTime = Date.now();

      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        
        let animatedNum;
        if (targetNum < 0) {
          animatedNum = Math.ceil(progress * targetNum * 100) / 100; // Para decimales en negativos
        } else if (targetValue.includes('.')) {
          animatedNum = Math.round(progress * targetNum * 100) / 100; // Para decimales
        } else {
          animatedNum = Math.floor(progress * targetNum); // Para enteros
        }
        
        setCurrentValue(`${prefix}${animatedNum}${suffix}`);
        
        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          setCurrentValue(targetValue); // Asegura el valor final exacto
          animationFrameRef.current = null;
        }
      };
      
      animationFrameRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    } else {
      // Para valores no numéricos como 'Ya' o '∞', los mostramos después de un pequeño delay
      const timer = setTimeout(() => {
        setCurrentValue(targetValue);
      }, duration * 0.3); // Un delay más corto
      
      return () => clearTimeout(timer);
    }
  }, [inView, targetValue, duration]); 
  
  return currentValue;
}

// --- SUBCOMPONENTE: MetricCard (REFACTORIZADO Y AJUSTADO AL DISEÑO) ---

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
          flex flex-col items-center justify-center 
          min-h-[340px] h-[340px] max-w-[320px] w-full mx-auto 
          overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/80 to-white/60 
          border border-white/30 
          shadow-2xl transition-all duration-300 relative
          rounded-2xl // Añadido para bordes más redondos como en la imagen
        `}
      >
        {/*
          QUITADO: Efectos de brillo/shimmer y hover, ya que no están en la imagen original.
          Si los quieres de vuelta, puedes reincorporarlos.
        */}
        
        {/* Contenido centrado (AJUSTADO PARA MEJOR CONSISTENCIA VISUAL) */}
        <div className="relative z-10 p-8 text-center"> {/* Solo padding y centrado de texto */}
          {/* Animated metric value */}
          <div className="text-5xl md:text-6xl font-extrabold text-brandBlack mb-4"> {/* Ajustado a font-extrabold como la imagen */}
            {animatedValue}
          </div>
          {/* Metric label */}
          <h3 className="text-lg md:text-xl font-medium text-textSecondary mb-3"> {/* font-medium y color */}
            {metric.label}
          </h3>
          {/* Metric description */}
          <p className="text-sm text-textSecondary/80 font-light leading-relaxed max-w-[220px] mx-auto whitespace-pre-line"> {/* text-sm, color más claro, y max-w */}
            {metric.description}
          </p>
        </div>

        {/* 
          QUITADO: Línea de acento inferior, ya que no está en la imagen original.
          Si la quieres de vuelta, puedes reincorporarla.
        */}
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


// --- COMPONENTE PRINCIPAL ---

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
        <div className="w-[70vw] h-[70vw] bg-gradient-to-br from-brandBlack/15 to-brandBlack/5 rounded-full blur-3xl absolute -top-40 -left-40 animate-pulse" />
        <div className="w-[50vw] h-[50vw] bg-gradient-to-tl from-accentOne/20 to-accentOne/5 rounded-full blur-2xl absolute top-1/2 right-[-10vw] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.5) 1px, transparent 0)`, backgroundSize: '50px 50px' }} />
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