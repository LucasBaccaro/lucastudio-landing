
import * as React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BenefitsSection from './components/BenefitsSection';
import HowItWorksSection from './components/HowItWorksSection';
import MetricsSection from './components/MetricalSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <BenefitsSection />
        <HowItWorksSection />
        <MetricsSection />
        <CTASection />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;