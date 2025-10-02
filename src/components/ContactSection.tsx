import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, MessageCircle, Phone } from 'lucide-react';

export const ContactSection = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/5511999999999', '_blank');
  };

  const handleEmail = () => {
    window.location.href = 'mailto:contato@anapaulasilva.com';
  };

  return (
    <section id="contato" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 gradient-primary text-white border-0">
            Entre em Contato
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Vamos Conversar?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tem alguma dúvida? Entre em contato pelos canais abaixo
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Button
              onClick={handleWhatsApp}
              variant="outline"
              size="lg"
              className="w-full h-auto py-6 px-6 flex items-center justify-start gap-4 group hover:border-primary hover:bg-primary/5 transition-smooth"
            >
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-smooth">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-base mb-1">WhatsApp</p>
                <p className="text-sm text-muted-foreground">(11) 99999-9999</p>
              </div>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button
              onClick={handleEmail}
              variant="outline"
              size="lg"
              className="w-full h-auto py-6 px-6 flex items-center justify-start gap-4 group hover:border-primary hover:bg-primary/5 transition-smooth"
            >
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-smooth">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-base mb-1">Email</p>
                <p className="text-sm text-muted-foreground">contato@anapaulasilva.com</p>
              </div>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-block bg-card rounded-lg p-6 shadow-card">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Phone className="w-5 h-5" />
              <p>Horário de atendimento: Segunda a Sexta, 9h às 18h</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
