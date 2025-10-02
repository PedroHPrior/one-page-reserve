export interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  image: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface BookingFormData {
  name?: string;
  email?: string;
  phone?: string;
  notes?: string;
}

export interface BookingState {
  isModalOpen: boolean;
  selectedService: Service | null;
  selectedDate: Date | null;
  selectedTime: string | null;
  currentStep: number;
  formData: BookingFormData;
  setModalOpen: (open: boolean) => void;
  setSelectedService: (service: Service | null) => void;
  setSelectedDate: (date: Date | null) => void;
  setSelectedTime: (time: string | null) => void;
  setCurrentStep: (step: number) => void;
  setFormData: (data: BookingFormData) => void;
  resetBooking: () => void;
}
