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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            
            {/* Bottom Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-[2rem] shadow-elegant max-h-[92vh] overflow-hidden"
            >
              {/* Gradient Header */}
              <div className="gradient-primary h-2 w-full" />
              
              {/* Grip */}
              <div className="flex justify-center pt-4 pb-3">
                <motion.div 
                  className="w-12 h-1.5 bg-muted rounded-full"
                  whileTap={{ scale: 0.95 }}
                />
              </div>
              
              {/* Progress */}
              <div className="px-6 pb-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold">
                    {currentStep === 1 && 'Serviço'}
                    {currentStep === 2 && 'Data & Hora'}
                    {currentStep === 3 && 'Informações'}
                    {currentStep === 4 && 'Confirmação'}
                  </span>
                  <span className="text-sm text-muted-foreground font-medium">
                    {currentStep}/{totalSteps}
                  </span>
                </div>
                <Progress value={progress} className="h-2.5 shadow-sm" />
              </div>
              
              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(92vh-140px)] px-6 pb-8 scrollbar-thin">
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
      <DialogContent className="max-w-3xl max-h-[92vh] overflow-hidden p-0 gap-0">
        {/* Gradient Header Accent */}
        <div className="gradient-primary h-1.5 w-full" />
        
        {/* Header */}
        <DialogHeader className="px-8 pt-8 pb-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-3xl font-bold">
                {currentStep === 1 && 'Confirmar Serviço'}
                {currentStep === 2 && 'Escolher Data e Horário'}
                {currentStep === 3 && 'Suas Informações'}
                {currentStep === 4 && 'Confirmação'}
              </DialogTitle>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <span className="text-sm font-semibold text-primary">
                  {currentStep}/{totalSteps}
                </span>
              </div>
            </div>
            
            {/* Progress */}
            <div>
              <Progress value={progress} className="h-2.5 shadow-sm" />
              <div className="flex justify-between mt-3 text-xs font-medium text-muted-foreground">
                <span className={currentStep >= 1 ? 'text-primary' : ''}>Serviço</span>
                <span className={currentStep >= 2 ? 'text-primary' : ''}>Data & Hora</span>
                <span className={currentStep >= 3 ? 'text-primary' : ''}>Informações</span>
                <span className={currentStep >= 4 ? 'text-primary' : ''}>Confirmação</span>
              </div>
            </div>
          </div>
        </DialogHeader>
        
        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(92vh-220px)] px-8 pb-8 scrollbar-thin">
          {renderStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
};
