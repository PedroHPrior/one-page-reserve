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
      className="space-y-6"
    >
      <div className="relative h-48 rounded-xl overflow-hidden">
        <img
          src={selectedService.image}
          alt={selectedService.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white text-2xl font-bold">{selectedService.name}</h3>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          {selectedService.description}
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
            <Clock className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Duração</p>
              <p className="font-semibold">{selectedService.duration}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
            <DollarSign className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Investimento</p>
              <p className="font-semibold text-lg">{selectedService.price}</p>
            </div>
          </div>
        </div>

        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="font-semibold">O que está incluído:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Sessão individual e personalizada</li>
                <li>• Material de apoio em PDF</li>
                <li>• Suporte por email por 7 dias</li>
                <li>• Gravação da sessão (mediante solicitação)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={onNext}
        className="w-full gradient-primary shadow-glow"
        size="lg"
      >
        Continuar para Data e Horário
      </Button>
    </motion.div>
  );
};
