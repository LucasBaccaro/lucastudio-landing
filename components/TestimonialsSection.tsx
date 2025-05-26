import React from 'react';
import Card from './ui/Card';
import { Testimonial } from '../types';

const testimonialsData: Testimonial[] = [ 
  {
    id: 1,
    quote: 'Desde que implementamos el agente IA de LucaStudio, redujimos el tiempo de respuesta en un 80% y nuestras ventas aumentaron. Es como tener un miembro más en el equipo, disponible 24/7 y con todo nuestro conocimiento.',
    name: 'Ana Pérez',
    role: 'Gerente e-commerce, Tienda ModaGlobal',
    avatar: 'https://i.pravatar.cc/100?img=1',
  },
  {
    id: 2,
    quote: 'La personalización del agente IA fue clave. Realmente entiende nuestro negocio y puede gestionar comunicaciones complejas. Nuestro soporte técnico ha mejorado notablemente su eficiencia.',
    name: 'Carlos Rodríguez',
    role: 'CEO, Soluciones Tech PYME',
    avatar: 'https://i.pravatar.cc/100?img=2',
  },
  {
    id: 3,
    quote: 'Como emprendedor, mi tiempo es oro. El sistema inteligente de LucaStudio me ha permitido escalar la atención y gestión sin contratar más personal. ¡Lo recomiendo totalmente!',
    name: 'Laura Gómez',
    role: 'Fundadora, EmprendeConIdeas',
    avatar: 'https://i.pravatar.cc/100?img=3',
  },
];

const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${className}`}>
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
  </svg>
);

const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonios" className="section-spacing bg-brandBeige">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-textPrimary mb-3">
            Historias de éxito con <span className="text-brandBlack">nuestros agentes IA</span>
          </h2>
          <p className="text-lg text-textSecondary max-w-2xl mx-auto">
            Descubre cómo hemos ayudado a empresas como la tuya a transformar sus operaciones y comunicaciones.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonialsData.map((testimonial) => (
            <Card key={testimonial.id} className="flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
              <div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-textSecondary italic mb-6 text-md md:text-lg leading-relaxed">"{testimonial.quote}"</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;