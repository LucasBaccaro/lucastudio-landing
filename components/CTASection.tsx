import * as React from 'react';
import Button from './ui/Button';

// WhatsApp Icon Component
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <img 
    src="https://img.icons8.com/?size=100&id=85088&format=png&color=FFFFFF"
    alt="WhatsApp Icon" 
    className={className} 
    width="40"
    height="40"
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
    <section id="contacto" className="py-10 md:py-14 bg-brandBlack text-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-surface mb-6">
        ¿Querés que tu negocio <br className="hidden sm:inline"/> trabaje con IA??
        </h2>
        <Button 
          variant="primary"
          size="lg"
          onClick={handleWhatsAppRedirect}
          aria-label="Contactate a través de WhatsApp"
          className="space-x-2.5 border border-white mt-10"
        >
          <WhatsAppIcon className="w-7 h-7" />
          <span>Contactanos por WhatsApp</span>
        </Button>
      </div>
    </section>
  );
};

export default CTASection;