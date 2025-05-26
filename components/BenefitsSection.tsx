import React from 'react';
import Card from './ui/Card';
import { BenefitItem } from '../types';

const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="text-brandBlack w-10 h-10 mb-5">
    {children}
  </div>
);

const AutomationIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

const PersonalizationIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

const TimeSavingIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const ScalabilityIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
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

const BenefitsSection: React.FC = () => {
  return (
    <section id="beneficios" className="section-spacing bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-textPrimary mb-3">
            Potencia tu negocio con <span className="text-brandBlack">agentes de IA</span> a medida
          </h2>
          <p className="text-lg text-textSecondary max-w-3xl mx-auto">
            Descubrí cómo nuestros agentes de IA, entrenados específicamente para tu empresa, pueden automatizar comunicaciones, gestionar información y optimizar tus procesos.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit) => (
            <Card key={benefit.id} className="text-left hover:shadow-md transition-shadow duration-300">
              <IconWrapper>{benefit.icon}</IconWrapper>
              <h3 className="text-xl font-semibold text-brandBlack mb-2">{benefit.title}</h3>
              <p className="text-textSecondary text-sm leading-relaxed">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;