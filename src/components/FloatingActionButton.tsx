import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FloatingActionButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const servicesSection = document.getElementById('servicos');
      const heroSection = document.getElementById('inicio');
      
      if (servicesSection && heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        const servicesTop = servicesSection.getBoundingClientRect().top;
        const servicesBottom = servicesSection.getBoundingClientRect().bottom;
        
        // Show when scrolled past hero but not in services section
        setIsVisible(heroBottom < 0 && (servicesTop > window.innerHeight || servicesBottom < 0));
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToServices = () => {
    const element = document.getElementById('servicos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="md:hidden fixed bottom-6 right-6 z-40"
        >
          <Button
            onClick={scrollToServices}
            size="lg"
            className="w-14 h-14 rounded-full gradient-primary shadow-glow p-0"
            aria-label="Agendar"
          >
            <Calendar className="w-6 h-6" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
