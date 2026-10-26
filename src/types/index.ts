export type Currency = 'KES' | 'USD';

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  fullDesc: string;
  category: 'photography' | 'videography' | 'livestreaming' | 'sound' | 'events' | 'digital';
  iconName: string;
  heroImage: string;
  features: string[];
  deliverables: string[];
  equipmentHighlights: string[];
  samplePriceKES: number;
}

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: 'photography' | 'videography' | 'livestreaming' | 'weddings' | 'corporate' | 'church' | 'concerts' | 'documentaries';
  year: string;
  location: string;
  thumbnail: string;
  galleryImages: string[];
  videoUrl?: string;
  summary: string;
  challengeSolution: string;
  equipmentUsed: string[];
  servicesDelivered: string[];
  stats?: { label: string; value: string }[];
}

export interface LiveEventItem {
  id: string;
  title: string;
  organization: string;
  scheduledTime: string;
  status: 'live' | 'upcoming' | 'ended';
  viewersCount?: number;
  thumbnail: string;
  streamUrl: string;
  platform: 'YouTube' | 'Facebook' | 'Custom RTMP';
  description: string;
  schedule: { time: string; activity: string }[];
}

export interface PackageTier {
  id: string;
  name: string;
  category: 'photography' | 'videography' | 'livestreaming' | 'corporate';
  priceKES: number;
  popular?: boolean;
  duration: string;
  inclusions: string[];
  deliverables: string[];
  equipment: string[];
}

export type BookingStatus = 
  | 'Pending' 
  | 'Under Review' 
  | 'Quotation Sent' 
  | 'Awaiting Deposit' 
  | 'Confirmed' 
  | 'In Progress' 
  | 'Completed' 
  | 'Cancelled';

export interface Booking {
  id: string;
  referenceNumber: string;
  createdAt: string;
  clientName: string;
  organization?: string;
  email: string;
  phone: string;
  whatsapp: string;
  serviceCategory: string;
  eventType: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
  estimatedBudgetKES: number;
  guestCount?: number;
  camerasRequired: number;
  livestreamPlatform?: string;
  specialRequirements?: string;
  status: BookingStatus;
  depositPaidKES: number;
  totalCostKES: number;
}

export type ProjectStage = 
  | 'Consultation'
  | 'Planning'
  | 'Pre-production'
  | 'Production'
  | 'Editing'
  | 'Client Review'
  | 'Revisions'
  | 'Approved'
  | 'Delivered';

export interface DeliverableFile {
  id: string;
  title: string;
  type: 'video_4k' | 'photo_highres' | 'audio_master' | 'raw_assets';
  size: string;
  downloadUrl: string;
  status: 'Ready' | 'Processing';
}

export interface ClientProject {
  id: string;
  bookingRef: string;
  projectName: string;
  clientName: string;
  clientEmail: string;
  currentStage: ProjectStage;
  startDate: string;
  deliveryDeadline: string;
  teamLead: string;
  deliverables: DeliverableFile[];
  revisionCount: number;
  messages: { sender: string; time: string; text: string; isClient: boolean }[];
}

export interface Quotation {
  id: string;
  quoteNumber: string;
  date: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceName: string;
  packageName: string;
  basePriceKES: number;
  camerasCount: number;
  cameraAddonKES: number;
  audioDeskAddonKES: number;
  droneCoverageKES: number;
  travelDistanceKm: number;
  travelCostKES: number;
  taxVAT16Percent: number;
  subtotalKES: number;
  totalKES: number;
  depositRequiredKES: number;
  status: 'Draft' | 'Sent' | 'Approved' | 'Converted to Booking';
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  bookingRef: string;
  date: string;
  dueDate: string;
  clientName: string;
  amountKES: number;
  amountPaidKES: number;
  status: 'Unpaid' | 'Partially Paid' | 'Paid';
  paymentMethod?: 'M-Pesa' | 'Bank Transfer' | 'Card';
  mpesaReceiptNumber?: string;
}

export interface EquipmentItem {
  id: string;
  category: 'Cameras' | 'Lenses' | 'Audio & Sound' | 'Livestream & Video Switching' | 'Lighting & Grip' | 'Drones & Gimbals';
  name: string;
  specs: string;
  quantity: number;
  description: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  category: 'Aerial & Nature' | 'Documentary' | 'Corporate & Events' | 'Memorial & Cultural' | 'Livestream';
  duration: string;
  views: string;
  date: string;
  thumbnail: string;
  description: string;
  youtubeUrl: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  date: string;
}

export type StoreCategory = 
  | 'digital-assets' 
  | 'merchandise' 
  | 'gear-hire' 
  | 'masterclass' 
  | 'sponsorship';

export interface StoreProduct {
  id: string;
  title: string;
  category: StoreCategory;
  priceKES: number;
  originalPriceKES?: number;
  priceUSD?: number;
  thumbnail: string;
  badge?: string;
  rating?: number;
  reviewCount?: number;
  description: string;
  details: string[];
  formatOrDuration?: string;
  downloadSize?: string;
  instantDownloadUrl?: string;
  inStock?: boolean;
  options?: string[];
}

export interface CartItem {
  product: StoreProduct;
  quantity: number;
  selectedOption?: string;
}

export interface StoreOrder {
  id: string;
  orderNumber: string;
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: CartItem[];
  subtotalKES: number;
  discountKES: number;
  totalKES: number;
  paymentMethod: 'M-Pesa' | 'Card' | 'Bank Transfer';
  mpesaReceiptCode?: string;
  status: 'Completed' | 'Processing' | 'Shipped';
  downloadAccessGranted: boolean;
}

