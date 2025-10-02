import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, DollarSign } from 'lucide-react';
import { Service } from '@/types/booking';
import { useBookingStore } from '@/store/bookingStore';
import consultoriaImg from '@/assets/service-consultoria.jpg';
import coachingImg from '@/assets/service-coaching.jpg';
import treinamentoImg from '@/assets/service-treinamento.jpg';

const services: Service[] = [
  {
    id: '1',
    name: 'Consultoria Empresarial',
    description: 'Análise completa do seu negócio com estratégias personalizadas para crescimento sustentável e resultados mensuráveis.',
    duration: '90 minutos',
    price: 'R$ 350',
    image: consultoriaImg,
  },
  {
    id: '2',
    name: 'Coaching Executivo',
    description: 'Desenvolvimento de liderança e habilidades estratégicas para executivos que buscam excelência profissional.',
    duration: '60 minutos',
    price: 'R$ 280',
    image: coachingImg,
  },
  {
    id: '3',
    name: 'Treinamento Corporativo',
    description: 'Capacitação de equipes com workshops práticos focados em produtividade, comunicação e gestão de projetos.',
    duration: '120 minutos',
    price: 'R$ 450',
    image: treinamentoImg,
  },
];

export const ServicesGrid = () => {
  const { setSelectedService, setModalOpen } = useBookingStore();

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  return (
    <section id="servicos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 gradient-primary text-white border-0">
            Serviços Profissionais
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Como Posso Ajudar Você
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Escolha o serviço ideal para suas necessidades e agende uma sessão
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col overflow-hidden shadow-card hover:shadow-elegant transition-smooth group cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                
                <CardHeader>
                  <CardTitle className="text-2xl">{service.name}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1">
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-semibold text-lg">
                      <DollarSign className="w-5 h-5" />
                      <span>{service.price}</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button
                    onClick={() => handleServiceClick(service)}
                    className="w-full gradient-primary shadow-glow"
                  >
                    Agendar Agora
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
