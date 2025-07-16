import * as React from 'react';
import Card from './ui/Card';
import { UseCaseItem } from '../types';

const IconUseCaseWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="text-brandBlack w-16 h-16 mb-6 flex items-center justify-center bg-white/40 rounded-2xl shadow-md backdrop-blur-xl">
    {children}
  </div>
);

const CustomerServiceIcon: React.FC = () => ( // Renamed from FAQIcon
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0Zm-9 5.25h.008v.008H12v-.008Z" />
  </svg>
);

const CommsManagementIcon: React.FC = () => ( // Renamed from PostSaleIcon
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const ProcessOptimizationIcon: React.FC = () => ( // Renamed from LeadGenIcon, new icon better suits "Process Optimization"
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12M3.75 3h16.5M3.75 12h16.5m-16.5 5.25h16.5M5.625 3.75h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75zm0 9.75h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
  </svg>
);

const ExpertSupportIcon: React.FC = () => ( // Renamed from SupportIcon
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
  </svg>
);

const useCases: UseCaseItem[] = [
  {
    id: 1,
    title: 'Atención al cliente inteligente 24/7',
    description: 'Tu agente IA responde FAQs, resuelve consultas y guía a los clientes, basándose en toda la información de tu negocio, mejorando la satisfacción.',
    icon: <CustomerServiceIcon />,
  },
  {
    id: 2,
    title: 'Gestión de comunicaciones proactiva',
    description: 'El agente IA puede redactar y enviar emails, gestionar mensajes, realizar seguimientos y mantener una comunicación fluida y personalizada.',
    icon: <CommsManagementIcon />,
  },
  {
    id: 3,
    title: 'Optimización de procesos internos',
    description: 'Automatiza tareas como la consulta de stock, actualización de datos en tus sistemas, generación de reportes básicos y más, con tu agente IA.',
    icon: <ProcessOptimizationIcon />,
  },
  {
    id: 4,
    title: 'Asistencia experta y soporte especializado',
    description: 'Tu agente IA, entrenado con tus documentos técnicos y bases de conocimiento, ofrece soporte preciso y eficiente, escalando solo casos complejos.',
    icon: <ExpertSupportIcon />,
  },
];

const UseCasesSection: React.FC = () => {
  return (
    <section id="casos-de-uso" className="relative section-spacing bg-transparent overflow-x-clip">
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="w-[40vw] h-[40vw] bg-brandBlack/10 rounded-full blur-2xl absolute top-0 left-0 animate-pulse" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-left mb-16 max-w-2xl">
          <h2 className="text-5xl md:text-7xl font-extralight text-brandBlack mb-4 tracking-tight drop-shadow-lg">Casos de uso</h2>
          <p className="text-xl md:text-2xl text-textSecondary/80 font-light">Descubrí lo que podés automatizar y escalar con IA.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {useCases.map((useCase, i) => (
            <Card key={useCase.id} className="flex flex-col items-center justify-center min-h-[260px] max-w-xs mx-auto overflow-hidden">
              <IconUseCaseWrapper>{useCase.icon}</IconUseCaseWrapper>
              <h3 className="text-2xl font-light text-brandBlack mb-2 text-center break-words whitespace-pre-line">{useCase.title}</h3>
              <p className="text-base text-textSecondary/80 text-center font-light break-words whitespace-pre-line max-w-[90%] mx-auto">{useCase.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;