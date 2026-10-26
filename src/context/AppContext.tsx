import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Currency,
  Booking,
  BookingStatus,
  ClientProject,
  ProjectStage,
  Quotation,
  Invoice,
  PortfolioProject,
  CartItem,
  StoreProduct,
  StoreOrder,
} from '../types';
import {
  INITIAL_BOOKINGS,
  INITIAL_PROJECTS,
  INITIAL_INVOICES,
  STORE_PRODUCTS,
  INITIAL_STORE_ORDERS,
} from '../data/mockData';

export type AppView =
  | 'home'
  | 'about'
  | 'services'
  | 'portfolio'
  | 'blog'
  | 'youtube-media'
  | 'live-events'
  | 'pricing'
  | 'booking'
  | 'quotation'
  | 'equipment'
  | 'client-portal'
  | 'admin-dashboard'
  | 'privacy-policy'
  | 'terms-of-service'
  | 'contact'
  | 'store'
  | 'gear-hire'
  | 'academy'
  | 'sponsorship';

interface MpesaPaymentState {
  invoiceId?: string;
  orderId?: string;
  amountKES: number;
  bookingRef: string;
  description: string;
}

interface AppContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedServiceTab: string;
  setSelectedServiceTab: (tab: string) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatMoney: (amountKES: number) => string;
  bookings: Booking[];
  addBooking: (newBooking: Omit<Booking, 'id' | 'referenceNumber' | 'createdAt' | 'status' | 'depositPaidKES'>) => Booking;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  projects: ClientProject[];
  updateProjectStage: (id: string, stage: ProjectStage) => void;
  addProjectMessage: (projectId: string, text: string, isClient: boolean) => void;
  invoices: Invoice[];
  markInvoicePaid: (invoiceId: string, receiptCode: string, method: 'M-Pesa' | 'Bank Transfer' | 'Card') => void;
  quotations: Quotation[];
  addQuotation: (quote: Quotation) => void;
  currentClientEmail: string;
  setCurrentClientEmail: (email: string) => void;
  showreelOpen: boolean;
  setShowreelOpen: (open: boolean) => void;
  activePortfolioModal: PortfolioProject | null;
  setActivePortfolioModal: (proj: PortfolioProject | null) => void;
  mpesaPayment: MpesaPaymentState | null;
  openMpesaModal: (payment: MpesaPaymentState) => void;
  closeMpesaModal: () => void;
  successNotification: string | null;
  setSuccessNotification: (msg: string | null) => void;
  // E-Commerce & Revenue Engine
  cart: CartItem[];
  addToCart: (product: StoreProduct, option?: string) => void;
  removeFromCart: (productId: string, option?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, option?: string) => void;
  clearCart: () => void;
  cartTotalKES: number;
  cartItemCount: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  storeOrders: StoreOrder[];
  addStoreOrder: (order: StoreOrder) => void;
  activeCheckoutProduct: StoreProduct | null;
  setActiveCheckoutProduct: (p: StoreProduct | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  BOOKINGS: 'gmp_bookings_v1',
  PROJECTS: 'gmp_projects_v1',
  INVOICES: 'gmp_invoices_v1',
  QUOTATIONS: 'gmp_quotations_v1',
  CART: 'gmp_cart_v1',
  STORE_ORDERS: 'gmp_store_orders_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentViewState] = useState<AppView>(
    window.location.pathname === '/admin' ? 'admin-dashboard' : 'home'
  );
  const [selectedServiceTab, setSelectedServiceTab] = useState<string>('all');
  const [currency, setCurrency] = useState<Currency>('KES');
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [activePortfolioModal, setActivePortfolioModal] = useState<PortfolioProject | null>(null);
  const [mpesaPayment, setMpesaPayment] = useState<MpesaPaymentState | null>(null);
  const [successNotification, setSuccessNotification] = useState<string | null>(null);

  // E-Commerce Cart & Store States
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [storeOrders, setStoreOrders] = useState<StoreOrder[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STORE_ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_STORE_ORDERS;
    } catch {
      return INITIAL_STORE_ORDERS;
    }
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [activeCheckoutProduct, setActiveCheckoutProduct] = useState<StoreProduct | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch {
      // ignore storage errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STORE_ORDERS, JSON.stringify(storeOrders));
    } catch {
      // ignore storage errors
    }
  }, [storeOrders]);

  const addToCart = (product: StoreProduct, option?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedOption === option
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prev, { product, quantity: 1, selectedOption: option }];
    });
    setSuccessNotification(`Added "${product.title}" to cart!`);
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (productId: string, option?: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedOption === option))
    );
  };

  const updateCartQuantity = (productId: string, quantity: number, option?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, option);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedOption === option
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotalKES = cart.reduce(
    (total, item) => total + item.product.priceKES * item.quantity,
    0
  );

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const addStoreOrder = (order: StoreOrder) => {
    setStoreOrders((prev) => [order, ...prev]);
    clearCart();
    setSuccessNotification(`Order #${order.orderNumber} confirmed! Receipt issued.`);
  };

  // Client & Admin Auth
  const [currentClientEmail, setCurrentClientEmail] = useState<string>('david@africatech.co.ke');
  // Scroll to top on view change
  const setCurrentView = (view: AppView) => {
    setCurrentViewState(view);
    const nextPath = view === 'admin-dashboard' ? '/admin' : '/';
    if (window.location.pathname !== nextPath) {
      window.history.pushState(null, '', nextPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // State loaded from localStorage or initialized with realistic data
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [projects, setProjects] = useState<ClientProject[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (!saved) return INITIAL_PROJECTS;

      const savedProjects: ClientProject[] = JSON.parse(saved);
      const sampleBlueprint = INITIAL_PROJECTS[0].deliverables[0];
      return savedProjects.map((project) =>
        project.id === INITIAL_PROJECTS[0].id
          ? {
              ...project,
              deliverables: project.deliverables.map((deliverable) =>
                deliverable.id === sampleBlueprint.id && deliverable.downloadUrl === '#'
                  ? sampleBlueprint
                  : deliverable
              ),
            }
          : project
      );
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INVOICES);
      return saved ? JSON.parse(saved) : INITIAL_INVOICES;
    } catch {
      return INITIAL_INVOICES;
    }
  });

  const [quotations, setQuotations] = useState<Quotation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUOTATIONS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    } catch {
      // Ignore storage errors
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch {
      // Ignore
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
    } catch {
      // Ignore
    }
  }, [invoices]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.QUOTATIONS, JSON.stringify(quotations));
    } catch {
      // Ignore
    }
  }, [quotations]);

  // Flash notification auto-clear
  useEffect(() => {
    if (successNotification) {
      const timer = setTimeout(() => setSuccessNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [successNotification]);

  // Currency Converter: 1 USD = ~130 KES
  const formatMoney = (amountKES: number): string => {
    if (currency === 'USD') {
      const usd = Math.round(amountKES / 130);
      return `$${usd.toLocaleString()}`;
    }
    return `KES ${amountKES.toLocaleString()}`;
  };

  const addBooking = (
    data: Omit<Booking, 'id' | 'referenceNumber' | 'createdAt' | 'status' | 'depositPaidKES'>
  ): Booking => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const ref = `GMP-2026-${randomNum}`;
    const newBooking: Booking = {
      ...data,
      id: `b-${Date.now()}`,
      referenceNumber: ref,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Pending',
      depositPaidKES: 0,
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Also auto-create a tracking project
    const newProject: ClientProject = {
      id: `proj-${Date.now()}`,
      bookingRef: ref,
      projectName: `${data.eventType} - ${data.clientName}`,
      clientName: data.clientName,
      clientEmail: data.email,
      currentStage: 'Consultation',
      startDate: new Date().toISOString().split('T')[0],
      deliveryDeadline: data.eventDate,
      teamLead: 'Sebastien Dennis (Technical Director)',
      revisionCount: 0,
      deliverables: [],
      messages: [
        {
          sender: 'Guru Production Team',
          time: 'Just now',
          text: `Booking request received for ${data.eventType} on ${data.eventDate}. Reference code: ${ref}. Our technical director is reviewing your requirements.`,
          isClient: false,
        },
      ],
    };
    setProjects((prev) => [newProject, ...prev]);

    setSuccessNotification(`Booking details saved in this browser. Send the request via WhatsApp to contact Guru Creations. Reference: ${ref}.`);
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
    setSuccessNotification(`Booking status updated to ${status}.`);
  };

  const updateProjectStage = (id: string, stage: ProjectStage) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, currentStage: stage } : p))
    );
    setSuccessNotification(`Project advanced to ${stage} stage.`);
  };

  const addProjectMessage = (projectId: string, text: string, isClient: boolean) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            messages: [
              ...p.messages,
              {
                sender: isClient ? p.clientName : 'Guru Production Team',
                time: 'Just now',
                text,
                isClient,
              },
            ],
          };
        }
        return p;
      })
    );
  };

  const markInvoicePaid = (
    invoiceId: string,
    receiptCode: string,
    method: 'M-Pesa' | 'Bank Transfer' | 'Card'
  ) => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === invoiceId) {
          return {
            ...inv,
            amountPaidKES: inv.amountKES,
            status: 'Paid',
            paymentMethod: method,
            mpesaReceiptNumber: receiptCode,
          };
        }
        return inv;
      })
    );

    // Update corresponding booking if found
    const targetInvoice = invoices.find((i) => i.id === invoiceId);
    if (targetInvoice) {
      setBookings((prev) =>
        prev.map((b) => {
          if (b.referenceNumber === targetInvoice.bookingRef) {
            return {
              ...b,
              depositPaidKES: targetInvoice.amountKES,
              status: b.status === 'Pending' || b.status === 'Under Review' ? 'Confirmed' : b.status,
            };
          }
          return b;
        })
      );
    }

    setSuccessNotification(`Payment verified! Receipt code: ${receiptCode}`);
  };

  const addQuotation = (quote: Quotation) => {
    setQuotations((prev) => [quote, ...prev]);
    setSuccessNotification(`Estimate #${quote.quoteNumber} saved in this browser. Contact Guru Creations to confirm the final quote.`);
  };

  const openMpesaModal = (payment: MpesaPaymentState) => {
    setMpesaPayment(payment);
  };

  const closeMpesaModal = () => {
    setMpesaPayment(null);
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedServiceTab,
        setSelectedServiceTab,
        currency,
        setCurrency,
        formatMoney,
        bookings,
        addBooking,
        updateBookingStatus,
        projects,
        updateProjectStage,
        addProjectMessage,
        invoices,
        markInvoicePaid,
        quotations,
        addQuotation,
        currentClientEmail,
        setCurrentClientEmail,
        showreelOpen,
        setShowreelOpen,
        activePortfolioModal,
        setActivePortfolioModal,
        mpesaPayment,
        openMpesaModal,
        closeMpesaModal,
        successNotification,
        setSuccessNotification,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotalKES,
        cartItemCount,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        storeOrders,
        addStoreOrder,
        activeCheckoutProduct,
        setActiveCheckoutProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
