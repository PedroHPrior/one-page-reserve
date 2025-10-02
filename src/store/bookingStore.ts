import { create } from 'zustand';
import { BookingState, BookingFormData, Service } from '@/types/booking';

export const useBookingStore = create<BookingState>((set) => ({
  isModalOpen: false,
  selectedService: null,
  selectedDate: null,
  selectedTime: null,
  currentStep: 1,
  formData: {
    name: '',
    email: '',
    phone: '',
    notes: '',
  },
  setModalOpen: (open) => set({ isModalOpen: open }),
  setSelectedService: (service) => set({ selectedService: service, currentStep: 1 }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedTime: (time) => set({ selectedTime: time }),
  setCurrentStep: (step) => set({ currentStep: step }),
  setFormData: (data) => set({ formData: data }),
  resetBooking: () =>
    set({
      isModalOpen: false,
      selectedService: null,
      selectedDate: null,
      selectedTime: null,
      currentStep: 1,
      formData: {
        name: '',
        email: '',
        phone: '',
        notes: '',
      },
    }),
}));
