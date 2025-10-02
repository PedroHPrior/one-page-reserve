import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useBookingStore } from '@/store/bookingStore';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { StepService } from './booking-steps/StepService';
import { StepDateTime } from './booking-steps/StepDateTime';
import { StepClientInfo } from './booking-steps/StepClientInfo';
import { StepConfirmation } from './booking-steps/StepConfirmation';

export const InlineBookingModal = () => {
  const isMobile = useIsMobile();
  const {
    isModalOpen,
    currentStep,
    setModalOpen,
    setCurrentStep,
    resetBooking,
  } = useBookingStore();

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleClose = () => {
    setModalOpen(false);
    setTimeout(() => resetBooking(), 300);
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepService onNext={handleNext} />;
      case 2:
        return <StepDateTime onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <StepClientInfo onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <StepConfirmation onClose={handleClose} />;
      default:
        return null;
    }
  };

  if (isMobile) {
    return (
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/50 z-50"
            />
            
            {/* Bottom Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl shadow-elegant max-h-[90vh] overflow-hidden"
            >
              {/* Grip */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-muted rounded-full" />
              </div>
              
              {/* Progress */}
              <div className="px-6 pb-4">
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2 text-center">
                  Passo {currentStep} de {totalSteps}
                </p>
              </div>
              
              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-120px)] px-6 pb-6">
                {renderStep()}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden p-0">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">
              {currentStep === 1 && 'Confirmar Serviço'}
              {currentStep === 2 && 'Escolher Data e Horário'}
              {currentStep === 3 && 'Suas Informações'}
              {currentStep === 4 && 'Confirmação'}
            </DialogTitle>
          </div>
          
          {/* Progress */}
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              Passo {currentStep} de {totalSteps}
            </p>
          </div>
        </DialogHeader>
        
        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)] p-6">
          {renderStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
};
