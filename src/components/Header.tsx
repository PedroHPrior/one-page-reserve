import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        isScrolled ? 'bg-background/95 backdrop-blur-lg shadow-card' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
              AP
            </div>
            <span className="font-bold text-lg md:text-xl">Ana Paula Silva</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('inicio')}
              className="text-sm font-medium hover:text-primary transition-smooth"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection('servicos')}
              className="text-sm font-medium hover:text-primary transition-smooth"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection('contato')}
              className="text-sm font-medium hover:text-primary transition-smooth"
            >
              Contato
            </button>
            <Button
              onClick={() => scrollToSection('servicos')}
              className="gradient-primary shadow-glow"
            >
              Agendar Agora
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4 space-y-3"
          >
            <button
              onClick={() => scrollToSection('inicio')}
              className="block w-full text-left py-2 text-sm font-medium hover:text-primary transition-smooth"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection('servicos')}
              className="block w-full text-left py-2 text-sm font-medium hover:text-primary transition-smooth"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection('contato')}
              className="block w-full text-left py-2 text-sm font-medium hover:text-primary transition-smooth"
            >
              Contato
            </button>
            <Button
              onClick={() => scrollToSection('servicos')}
              className="w-full gradient-primary"
            >
              Agendar Agora
            </Button>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};
