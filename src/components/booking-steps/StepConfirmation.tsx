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
        className="text-center space-y-6 py-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center shadow-glow">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold">Agendamento Confirmado!</h3>
          <p className="text-muted-foreground">
            Seu agendamento foi realizado com sucesso. Você receberá um email de confirmação 
            com todos os detalhes em breve.
          </p>
        </div>

        <div className="bg-muted/50 rounded-lg p-6 space-y-3 text-left">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-primary" />
            <span>{selectedDate && format(selectedDate, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary" />
            <span>{selectedTime}</span>
          </div>
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-primary" />
            <span>{selectedService?.name}</span>
          </div>
        </div>

        <Button
          onClick={onClose}
          className="w-full gradient-primary shadow-glow"
          size="lg"
        >
          Concluir
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold">Revisar Agendamento</h3>
        <p className="text-muted-foreground">
          Confira todos os detalhes antes de confirmar
        </p>
      </div>

      <div className="space-y-4">
        {/* Service Info */}
        <div className="border rounded-lg p-4 space-y-3">
          <h4 className="font-semibold text-lg mb-3">Serviço Selecionado</h4>
          <div className="flex items-start gap-4">
            <img
              src={selectedService?.image}
              alt={selectedService?.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <p className="font-semibold">{selectedService?.name}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedService?.duration}
                </span>
                <span className="font-semibold text-primary">
                  {selectedService?.price}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Date & Time */}
        <div className="border rounded-lg p-4 space-y-3">
          <h4 className="font-semibold text-lg mb-3">Data e Horário</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <span>{selectedDate && format(selectedDate, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <span>{selectedTime}</span>
            </div>
          </div>
        </div>

        {/* Client Info */}
        <div className="border rounded-lg p-4 space-y-3">
          <h4 className="font-semibold text-lg mb-3">Suas Informações</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-primary" />
              <span>{formData.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <span>{formData.email}</span>
            </div>
            {formData.phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span>{formData.phone}</span>
              </div>
            )}
            {formData.notes && (
              <div className="flex items-start gap-3 mt-3 pt-3 border-t">
                <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{formData.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Button
        onClick={handleConfirm}
        className="w-full gradient-primary shadow-glow"
        size="lg"
      >
        Confirmar Agendamento
      </Button>
    </motion.div>
  );
};
