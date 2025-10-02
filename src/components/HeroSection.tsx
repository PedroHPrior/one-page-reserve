import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Award, Users, Star } from 'lucide-react';
import professionalPhoto from '@/assets/professional-photo.jpg';

export const HeroSection = () => {
  const scrollToServices = () => {
    const element = document.getElementById('servicos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="min-h-screen flex items-center gradient-hero pt-20">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Badge className="mb-4 gradient-primary text-white border-0">
                  Profissional Certificada
                </Badge>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              >
                Ana Paula Silva
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl text-muted-foreground"
              >
                Consultora de Negócios & Coach Executiva
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              Transformo desafios empresariais em oportunidades de crescimento. 
              Com mais de 15 anos de experiência, ajudo profissionais e empresas 
              a alcançarem resultados extraordinários.
            </motion.p>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <div className="flex flex-col items-center p-4 rounded-lg bg-card shadow-card">
                <Award className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm font-semibold text-center">Certificada</span>
              </div>
              <div className="flex flex-col items-center p-4 rounded-lg bg-card shadow-card">
                <Users className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm font-semibold text-center">500+ Clientes</span>
              </div>
              <div className="flex flex-col items-center p-4 rounded-lg bg-card shadow-card">
                <Star className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm font-semibold text-center">15 Anos</span>
              </div>
              <div className="flex flex-col items-center p-4 rounded-lg bg-card shadow-card">
                <CheckCircle className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm font-semibold text-center">Resultados</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                onClick={scrollToServices}
                size="lg"
                className="gradient-primary shadow-glow text-lg px-8 py-6"
              >
                Agendar Consulta Gratuita
              </Button>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img
                src={professionalPhoto}
                alt="Ana Paula Silva - Consultora Profissional"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-elegant"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg">Disponível</p>
                  <p className="text-sm text-muted-foreground">Agende hoje</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
