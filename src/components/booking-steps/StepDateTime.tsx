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
      className="space-y-6 md:space-y-8"
    >
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-2 hover:bg-muted/50 -ml-2"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        <span className="font-medium">Voltar</span>
      </Button>

      <div className="space-y-6 md:space-y-8">
        {/* Calendar Section */}
        <div>
          <div className="mb-4 md:mb-6">
            <h3 className="text-xl md:text-2xl font-bold mb-2">Escolha a data</h3>
            <p className="text-sm md:text-base text-muted-foreground">Selecione o melhor dia para sua sessão</p>
          </div>
          <div className="flex justify-center bg-gradient-card rounded-2xl p-4 md:p-6 border border-border/50">
            <Calendar
              mode="single"
              selected={selectedDate || undefined}
              onSelect={(date) => setSelectedDate(date || null)}
              disabled={(date) => date < new Date() || date.getDay() === 0}
              locale={ptBR}
              className={cn("rounded-xl pointer-events-auto")}
            />
          </div>
        </div>

        {/* Time Slots Section */}
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 md:space-y-6"
          >
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">Escolha o horário</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Disponíveis para {format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
              </p>
            </div>
            
            <div className="bg-gradient-card rounded-2xl p-5 md:p-6 border border-border/50">
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                {timeSlots.map((time) => (
                  <motion.button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      'p-4 md:p-5 rounded-xl border-2 transition-smooth text-sm md:text-base font-semibold',
                      selectedTime === time
                        ? 'border-primary bg-primary text-primary-foreground shadow-glow'
                        : 'border-border bg-background hover:border-primary hover:shadow-card'
                    )}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span>{time}</span>
                      {selectedTime === time && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-1.5 h-1.5 rounded-full bg-primary-foreground"
                        />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          onClick={handleContinue}
          disabled={!selectedDate || !selectedTime}
          className="w-full gradient-primary shadow-glow text-base md:text-lg h-14 md:h-16 rounded-xl font-semibold disabled:opacity-50"
        >
          Continuar para Informações →
        </Button>
      </motion.div>
    </motion.div>
  );
};
