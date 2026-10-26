import { COMPANY_INFO } from '../data/mockData';

export const getWhatsAppUrl = (message: string) =>
  `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
