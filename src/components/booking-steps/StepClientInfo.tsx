import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useBookingStore } from '@/store/bookingStore';
import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface StepClientInfoProps {
  onNext: () => void;
  onBack: () => void;
}

const formSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  notes: z.string().optional(),
});

export const StepClientInfo = ({ onNext, onBack }: StepClientInfoProps) => {
  const { formData, setFormData } = useBookingStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setFormData(data);
    onNext();
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
        type="button"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        <span className="font-medium">Voltar</span>
      </Button>

      <div className="mb-6 md:mb-8">
        <h3 className="text-xl md:text-2xl font-bold mb-2">Suas informações</h3>
        <p className="text-sm md:text-base text-muted-foreground">Preencha seus dados para confirmar o agendamento</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 md:space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Nome Completo *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Seu nome completo" 
                    className="h-12 md:h-14 rounded-xl border-2 focus:border-primary transition-smooth text-base"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Email *</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="seu@email.com" 
                    className="h-12 md:h-14 rounded-xl border-2 focus:border-primary transition-smooth text-base"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Telefone <span className="text-muted-foreground font-normal">(opcional)</span></FormLabel>
                <FormControl>
                  <Input 
                    type="tel" 
                    placeholder="(00) 00000-0000" 
                    className="h-12 md:h-14 rounded-xl border-2 focus:border-primary transition-smooth text-base"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Observações <span className="text-muted-foreground font-normal">(opcional)</span></FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Alguma informação adicional que gostaria de compartilhar?"
                    className="min-h-[120px] md:min-h-[140px] rounded-xl border-2 focus:border-primary transition-smooth resize-none text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-2">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                className="w-full gradient-primary shadow-glow text-base md:text-lg h-14 md:h-16 rounded-xl font-semibold"
              >
                Revisar Agendamento →
              </Button>
            </motion.div>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};
