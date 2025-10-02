import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { useBookingStore } from '@/store/bookingStore';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface StepDateTimeProps {
  onNext: () => void;
  onBack: () => void;
}

const timeSlots = [
  '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00',
];

export const StepDateTime = ({ onNext, onBack }: StepDateTimeProps) => {
  const { selectedDate, selectedTime, setSelectedDate, setSelectedTime } = useBookingStore();

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      onNext();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar
      </Button>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-3">Escolha a data</h3>
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate || undefined}
              onSelect={(date) => setSelectedDate(date || null)}
              disabled={(date) => date < new Date() || date.getDay() === 0}
              locale={ptBR}
              className={cn("rounded-lg border shadow-card pointer-events-auto")}
            />
          </div>
        </div>

        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-lg font-semibold mb-3">
              Horários disponíveis para {format(selectedDate, "d 'de' MMMM", { locale: ptBR })}
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={cn(
                    'p-3 rounded-lg border-2 transition-smooth text-sm font-medium',
                    selectedTime === time
                      ? 'border-primary bg-primary text-primary-foreground shadow-glow'
                      : 'border-border hover:border-primary hover:bg-primary/5'
                  )}
                >
                  {time}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <Button
        onClick={handleContinue}
        disabled={!selectedDate || !selectedTime}
        className="w-full gradient-primary shadow-glow"
        size="lg"
      >
        Continuar para Informações
      </Button>
    </motion.div>
  );
};
