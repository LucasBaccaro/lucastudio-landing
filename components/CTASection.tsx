import * as React from 'react';
import Button from './ui/Button';

// WhatsApp Icon Component
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <img 
    src="https://img.icons8.com/?size=100&id=85088&format=png&color=FFFFFF" // Changed color to FFFFFF (white)
    alt="WhatsApp Icon" 
    className={className} 
    width="40" // Base width from URL, actual display size controlled by className
    height="40" // Base height from URL
  />
);


const CTASection: React.FC = () => {
  const handleWhatsAppRedirect = () => {
    const phoneNumber = "5491133372466"; 
    const message = encodeURIComponent("Hola! Quisiera solicitar una demo gratuita de LucaStudio para conocer cómo un Agente de IA personalizado puede ayudar a mi negocio.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    console.log('Redirigiendo a WhatsApp para solicitar demo...');
  };

  return (
    <section id="contacto" className="section-spacing bg-brandBlack text-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-surface mb-6">
          ¿Listo para que un agente de IA <br className="hidden sm:inline"/> potencie tu negocio?
        </h2>
        <Button 
          variant="primary"
          size="lg"
          onClick={handleWhatsAppRedirect}
          aria-label="Contactate a través de WhatsApp"
          className="space-x-2.5"
        >
          <WhatsAppIcon className="w-7 h-7" />
          <span>Contactate con nosotros</span>
        </Button>
        <p className="mt-8 text-sm text-surface/70">
          O escríbenos a: <a href="mailto:lucastudio.ba@gmail.com" className="underline hover:text-surface">lucastudio.ba@gmail.com</a>
        </p>
      </div>
    </section>
  );
};

export default CTASection;