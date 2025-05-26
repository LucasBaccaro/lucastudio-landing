import React from 'react';
import { HowItWorksStep } from '../types';

const IconStepWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="text-brandBlack w-8 h-8 flex items-center justify-center"> {/* Ensure numbers are centered */}
    {children}
  </div>
);

// New Numerical SVG Icons
const StepOneIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" // Changed viewBox
       fill="currentColor"
       className="w-full h-full">
    <text 
      x="50%" 
      y="50%" 
      dominantBaseline="middle" 
      textAnchor="middle" 
      fontSize="14" 
      fontWeight="bold" 
      fill="currentColor"
      stroke="none" // Ensure no stroke
    >
      1
    </text>
  </svg>
);

const StepTwoIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" // Changed viewBox
       fill="currentColor"
       className="w-full h-full">
    <text 
      x="50%" 
      y="50%" 
      dominantBaseline="middle" 
      textAnchor="middle" 
      fontSize="14" 
      fontWeight="bold" 
      fill="currentColor"
      stroke="none" // Ensure no stroke
    >
      2
    </text>
  </svg>
);

const StepThreeIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" // Changed viewBox
       fill="currentColor"
       className="w-full h-full">
    <text 
      x="50%" 
      y="50%" 
      dominantBaseline="middle" 
      textAnchor="middle" 
      fontSize="14" 
      fontWeight="bold" 
      fill="currentColor"
      stroke="none" // Ensure no stroke
    >
      3
    </text>
  </svg>
);


const steps: HowItWorksStep[] = [
  {
    id: 1,
    title: 'Contacto inicial y consultoría estratégica',
    description: 'Todo comienza con una conversación. Contactanos para discutir tus necesidades y objetivos. Juntos, exploraremos cómo un agente de IA personalizado puede transformar tu negocio y definiremos el alcance inicial del proyecto.',
    icon: <StepOneIcon />,
    image: 'https://img.icons8.com/?size=100&id=61864&format=png&color=000000', // Image data remains, though not currently rendered
  },
  {
    id: 2,
    title: 'Provisión de información y diseño del agente',
    description: 'Nos compartes la documentación y acceso a los datos relevantes de tu negocio (manuales, FAQs, bases de conocimiento, ejemplos de comunicación, etc.). Con esta base, nuestro equipo diseña la arquitectura y estrategia de entrenamiento específicas para tu agente IA.',
    icon: <StepTwoIcon />,
    image: 'https://via.placeholder.com/800x600/374151/F5F1EA?text=Diseño+Agente+IA', // Image data remains
  },
  {
    id: 3,
    title: 'Desarrollo, puesta en marcha y soporte continuo',
    description: 'Nosotros nos encargamos de la magia. Desarrollamos, entrenamos rigurosamente e integramos tu agente de IA. Tras tu validación, lo activamos y queda operativo, con nuestro equipo brindando monitoreo, optimización y soporte continuo para asegurar su máximo rendimiento.',
    icon: <StepThreeIcon />,
    image: 'https://via.placeholder.com/800x600/374151/F5F1EA?text=Agente+IA+Activo', // Image data remains
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section id="como-funciona" className="section-spacing bg-brandBeige">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-textPrimary mb-3">
            Así creamos tu <span className="text-brandBlack">agente de IA personalizado</span>
          </h2>
          <p className="text-lg text-textSecondary max-w-3xl mx-auto">
            Nuestro proceso probado asegura que tu agente de IA esté perfectamente alineado con los objetivos y la operativa de tu negocio, listo para entregar resultados.
          </p>
        </div>
        <div className="space-y-12 md:space-y-16">
          {steps.map((step, index) => (
            <div key={step.id} className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="md:w-full text-left"> {/* Changed md:w-1/2 to md:w-full as there are no images displayed currently */}
                <div className="flex items-center mb-4">
                  <div className="bg-brandBlack/10 p-3 rounded-full mr-4 flex-shrink-0">
                    <IconStepWrapper>{step.icon}</IconStepWrapper>
                  </div>
                  <div>
                    <h3 id={`step-title-${step.id}`} className="text-2xl font-semibold text-brandBlack">{step.title}</h3>
                  </div>
                </div>
                <p className="text-textSecondary text-base md:text-lg leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;