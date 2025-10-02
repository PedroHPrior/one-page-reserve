import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useBookingStore } from '@/store/bookingStore';
import { CheckCircle, Calendar, Clock, User, Mail, Phone, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';
import { toast } from 'sonner';

interface StepConfirmationProps {
  onClose: () => void;
}

export const StepConfirmation = ({ onClose }: StepConfirmationProps) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { selectedService, selectedDate, selectedTime, formData } = useBookingStore();

  const handleConfirm = () => {
    // Here you would send the booking to your backend
    setIsConfirmed(true);
    toast.success('Agendamento confirmado com sucesso!', {
      description: 'Você receberá um email de confirmação em breve.',
    });
  };

  if (isConfirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-8 py-8 md:py-12"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', delay: 0.2, duration: 0.8 }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 gradient-primary rounded-full blur-xl opacity-50 animate-pulse" />
            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full gradient-primary flex items-center justify-center shadow-glow">
              <CheckCircle className="w-12 h-12 md:w-14 md:h-14 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <h3 className="text-2xl md:text-3xl font-bold">Agendamento Confirmado!</h3>
          <p className="text-base md:text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
            Seu agendamento foi realizado com sucesso. Você receberá um email de confirmação 
            com todos os detalhes em breve.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-card rounded-2xl p-6 md:p-8 space-y-4 text-left border border-border/50"
        >
          <div className="flex items-center gap-4 p-4 bg-background/50 rounded-xl">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Data</p>
              <p className="font-semibold text-base md:text-lg">
                {selectedDate && format(selectedDate, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-background/50 rounded-xl">
            <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Horário</p>
              <p className="font-semibold text-base md:text-lg">{selectedTime}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-background/50 rounded-xl">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Serviço</p>
              <p className="font-semibold text-base md:text-lg">{selectedService?.name}</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.02 }} 
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={onClose}
            className="w-full gradient-primary shadow-glow text-base md:text-lg h-14 md:h-16 rounded-xl font-semibold"
          >
            Concluir ✓
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 md:space-y-8"
    >
      <div className="text-center space-y-3 mb-6 md:mb-8">
        <h3 className="text-2xl md:text-3xl font-bold">Revisar Agendamento</h3>
        <p className="text-base md:text-lg text-muted-foreground">
          Confira todos os detalhes antes de confirmar
        </p>
      </div>

      <div className="space-y-5 md:space-y-6">
        {/* Service Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-card rounded-2xl p-5 md:p-6 border border-border/50"
        >
          <h4 className="font-bold text-lg md:text-xl mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            Serviço Selecionado
          </h4>
          <div className="flex items-start gap-4 bg-background/50 rounded-xl p-4">
            <img
              src={selectedService?.image}
              alt={selectedService?.name}
              className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover shadow-card"
            />
            <div className="flex-1">
              <p className="font-bold text-base md:text-lg mb-2">{selectedService?.name}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {selectedService?.duration}
                </span>
                <span className="font-bold text-lg text-primary">
                  {selectedService?.price}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Date & Time */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-card rounded-2xl p-5 md:p-6 border border-border/50"
        >
          <h4 className="font-bold text-lg md:text-xl mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-secondary" />
            </div>
            Data e Horário
          </h4>
          <div className="space-y-3 bg-background/50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Data</p>
                <p className="font-semibold text-base md:text-lg">
                  {selectedDate && format(selectedDate, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Horário</p>
                <p className="font-semibold text-base md:text-lg">{selectedTime}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Client Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-card rounded-2xl p-5 md:p-6 border border-border/50"
        >
          <h4 className="font-bold text-lg md:text-xl mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            Suas Informações
          </h4>
          <div className="space-y-3 bg-background/50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Nome</p>
                <p className="font-semibold text-base">{formData.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="font-semibold text-base">{formData.email}</p>
              </div>
            </div>
            {formData.phone && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Telefone</p>
                  <p className="font-semibold text-base">{formData.phone}</p>
                </div>
              </div>
            )}
            {formData.notes && (
              <div className="flex items-start gap-3 pt-3 border-t border-border/50">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Observações</p>
                  <p className="text-sm text-foreground/80">{formData.notes}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.02 }} 
        whileTap={{ scale: 0.98 }}
        className="pt-2"
      >
        <Button
          onClick={handleConfirm}
          className="w-full gradient-primary shadow-glow text-base md:text-lg h-14 md:h-16 rounded-xl font-semibold"
        >
          Confirmar Agendamento ✓
        </Button>
      </motion.div>
    </motion.div>
  );
};
