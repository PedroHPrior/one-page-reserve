import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useBookingStore } from '@/store/bookingStore';
import { Clock, DollarSign, CheckCircle } from 'lucide-react';

interface StepServiceProps {
  onNext: () => void;
}

export const StepService = ({ onNext }: StepServiceProps) => {
  const { selectedService } = useBookingStore();

  if (!selectedService) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 md:space-y-8"
    >
      {/* Service Image Card */}
      <motion.div 
        className="relative h-56 md:h-64 rounded-2xl overflow-hidden shadow-elegant group"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={selectedService.image}
          alt={selectedService.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">{selectedService.name}</h3>
            <div className="flex items-center gap-2">
              <div className="h-1 w-12 bg-primary rounded-full" />
              <span className="text-white/80 text-sm font-medium">Serviço Premium</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="space-y-5 md:space-y-6">
        {/* Description */}
        <div className="bg-gradient-card rounded-2xl p-6 md:p-8 border border-border/50">
          <p className="text-base md:text-lg leading-relaxed text-foreground/90">
            {selectedService.description}
          </p>
        </div>

        {/* Duration & Price Cards */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            whileHover={{ y: -4 }}
            className="flex flex-col items-start gap-3 p-5 md:p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 shadow-card transition-shadow hover:shadow-elegant"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-xs md:text-sm text-muted-foreground font-medium mb-1">Duração</p>
              <p className="font-bold text-base md:text-lg">{selectedService.duration}</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4 }}
            className="flex flex-col items-start gap-3 p-5 md:p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl border border-secondary/20 shadow-card transition-shadow hover:shadow-elegant"
          >
            <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-xs md:text-sm text-muted-foreground font-medium mb-1">Investimento</p>
              <p className="font-bold text-xl md:text-2xl text-secondary">{selectedService.price}</p>
            </div>
          </motion.div>
        </div>

        {/* Included Features */}
        <motion.div 
          className="bg-gradient-to-br from-primary/5 to-transparent rounded-2xl p-6 md:p-8 border border-primary/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-3 flex-1">
              <p className="font-bold text-lg">O que está incluído:</p>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-3 text-sm md:text-base">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-foreground/80">Sessão individual e personalizada</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-foreground/80">Material de apoio em PDF</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-foreground/80">Suporte por email por 7 dias</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-foreground/80">Gravação da sessão (mediante solicitação)</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          onClick={onNext}
          className="w-full gradient-primary shadow-glow text-base md:text-lg h-14 md:h-16 rounded-xl font-semibold"
        >
          Continuar para Data e Horário →
        </Button>
      </motion.div>
    </motion.div>
  );
};
