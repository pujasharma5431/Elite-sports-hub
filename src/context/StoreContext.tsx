'use client';
import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Jersey, FilterState, CartItem, SanityConfig, JerseySize, Gender, Order, OrderStatus } from '../types/jersey';
import { INITIAL_JERSEYS } from '../data/initialJerseys';
import { fetchJerseys, isSanityConfigured } from '../lib/sanity';

interface StoreContextType {
  jerseys: Jersey[];
  filteredJerseys: Jersey[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  quickViewJersey: Jersey | null;
  setQuickViewJersey: (jersey: Jersey | null) => void;
  // Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, qty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  // Wishlist
  wishlist: string[];
  toggleWishlist: (jerseyId: string) => void;
  // Checkout
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  // Orders & Tracking
  orders: Order[];
  placeOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  isTrackerOpen: boolean;
  setIsTrackerOpen: (open: boolean) => void;
  trackingOrderCode: string;
  setTrackingOrderCode: (code: string) => void;
  adminWhatsAppNumber: string;
  setAdminWhatsAppNumber: (phone: string) => void;
  // Admin & Inventory Management
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  updateJerseyInventory: (id: string, updates: Partial<Jersey>) => void;
  addNewJersey: (jersey: Omit<Jersey, 'id'>) => void;
  deleteJersey: (id: string) => void;
  toggleJerseyVisibility: (id: string) => void;
  resetAllJerseys: () => void;
  // Sanity
  sanityConfig: SanityConfig;
  saveSanityConfig: (config: { projectId: string; dataset: string; token?: string }) => Promise<boolean>;
  isSanityModalOpen: boolean;
  setIsSanityModalOpen: (open: boolean) => void;
  isLoading: boolean;
  availableTeams: string[];
  availablePlayers: string[];
}

const defaultFilters: FilterState = {
  search: '',
  category: 'all',
  team: [],
  player: [],
  sizes: [],
  gender: [],
  colors: [],
  isOnSaleOnly: false,
  isLowStockOnly: false,
  isLimitedEditionOnly: false,
  nepalOnly: false,
  minPrice: 0,
  maxPrice: 15000,
  sortBy: 'featured',
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_JERSEYS = 'elitesportshub_jerseys_v2';
const LOCAL_STORAGE_KEY_CART = 'elitesportshub_cart_v1';
const LOCAL_STORAGE_KEY_WISHLIST = 'elitesportshub_wishlist_v1';
const LOCAL_STORAGE_KEY_SANITY = 'elitesportshub_sanity_v1';
const LOCAL_STORAGE_KEY_ORDERS = 'elitesportshub_orders_v1';
const LOCAL_STORAGE_KEY_WHATSAPP = 'elitesportshub_whatsapp_v1';

const INITIAL_SAMPLE_ORDERS: Order[] = [];

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [jerseys, setJerseys] = useState<Jersey[]>(INITIAL_JERSEYS);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSanityModalOpen, setIsSanityModalOpen] = useState(false);
  const [quickViewJersey, setQuickViewJersey] = useState<Jersey | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Orders & Tracking state
  const [orders, setOrders] = useState<Order[]>([]);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [trackingOrderCode, setTrackingOrderCode] = useState('');
  const [adminWhatsAppNumber, setAdminWhatsAppNumber] = useState('9779821952621');

  const [sanityConfig, setSanityConfig] = useState<SanityConfig>({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-03-01',
    token: '',
    isConnected: false,
  });

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const storedSanity = localStorage.getItem(LOCAL_STORAGE_KEY_SANITY);
      if (storedSanity) {
        const parsed = JSON.parse(storedSanity);
        setSanityConfig((prev) => ({
          ...prev,
          ...parsed,
          isConnected: isSanityConfigured(parsed.projectId),
        }));
      } else if (isSanityConfigured()) {
        setSanityConfig((prev) => ({ ...prev, isConnected: true }));
      }

      const storedJerseys = localStorage.getItem(LOCAL_STORAGE_KEY_JERSEYS);
      if (storedJerseys) {
        const parsed: Jersey[] = JSON.parse(storedJerseys);
        const merged = parsed.map((item) => {
          const init = INITIAL_JERSEYS.find((i) => i.id === item.id);
          if (init) {
            return {
              ...init,
              ...item,
              quality: item.quality || init.quality,
              description: item.description || init.description,
              isHeadlineDrop: item.isHeadlineDrop !== undefined ? item.isHeadlineDrop : init.isHeadlineDrop,
              isCustomizable: item.isCustomizable !== undefined ? item.isCustomizable : init.isCustomizable,
            };
          }
          return item;
        });
        setJerseys(merged);
      }

      const storedCart = localStorage.getItem(LOCAL_STORAGE_KEY_CART);
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }

      const storedWishlist = localStorage.getItem(LOCAL_STORAGE_KEY_WISHLIST);
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }

      const storedOrders = localStorage.getItem(LOCAL_STORAGE_KEY_ORDERS);
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      } else {
        setOrders(INITIAL_SAMPLE_ORDERS);
      }

      const storedWhatsApp = localStorage.getItem(LOCAL_STORAGE_KEY_WHATSAPP);
      if (storedWhatsApp) {
        setAdminWhatsAppNumber(storedWhatsApp);
      }
    } catch (e) {
      console.error('LocalStorage hydration error:', e);
    }
  }, []);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_JERSEYS, JSON.stringify(jerseys));
    } catch (e) {
      console.error(e);
    }
  }, [jerseys]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_CART, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_WISHLIST, JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_WHATSAPP, adminWhatsAppNumber);
    } catch (e) {
      console.error(e);
    }
  }, [adminWhatsAppNumber]);

  // Load from Sanity if configured
  useEffect(() => {
    if (sanityConfig.isConnected && sanityConfig.projectId) {
      setIsLoading(true);
      fetchJerseys({ projectId: sanityConfig.projectId, dataset: sanityConfig.dataset })
        .then((fetched) => {
          if (fetched && fetched.length > 0) {
            setJerseys(fetched);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [sanityConfig.isConnected, sanityConfig.projectId, sanityConfig.dataset]);

  // Save Sanity Credentials
  const saveSanityConfig = async (config: { projectId: string; dataset: string; token?: string }) => {
    try {
      const isConfigured = isSanityConfigured(config.projectId);
      const newConfig: SanityConfig = {
        projectId: config.projectId,
        dataset: config.dataset || 'production',
        apiVersion: '2024-03-01',
        token: config.token || '',
        isConnected: isConfigured,
      };
      setSanityConfig(newConfig);
      localStorage.setItem(LOCAL_STORAGE_KEY_SANITY, JSON.stringify(newConfig));

      if (isConfigured) {
        setIsLoading(true);
        const data = await fetchJerseys({ projectId: config.projectId, dataset: config.dataset });
        if (data && data.length > 0) {
          setJerseys(data);
        }
        setIsLoading(false);
      }
      return true;
    } catch (e) {
      console.error('Failed to configure Sanity:', e);
      setIsLoading(false);
      return false;
    }
  };

  // Cart Handlers
  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const customSuffix = item.customPrint ? `_${item.customPrint.name}_${item.customPrint.number}` : '';
    const cartItemId = `${item.jerseyId}_${item.selectedSize}_${item.selectedGender}_${item.selectedColor.name}${customSuffix}`;

    setCart((prev) => {
      const existing = prev.find((i) => i.id === cartItemId);
      if (existing) {
        return prev.map((i) =>
          i.id === cartItemId ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, { ...item, id: cartItemId }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) => prev.map((i) => (i.id === cartItemId ? { ...i, quantity: qty } : i)));
  };

  const clearCart = () => setCart([]);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  // Wishlist
  const toggleWishlist = (jerseyId: string) => {
    setWishlist((prev) =>
      prev.includes(jerseyId) ? prev.filter((id) => id !== jerseyId) : [...prev, jerseyId]
    );
  };

  // Admin & Inventory Actions
  const updateJerseyInventory = (id: string, updates: Partial<Jersey>) => {
    setJerseys((prev) =>
      prev.map((j) => {
        if (j.id === id) {
          const updated = { ...j, ...updates };
          // Auto sync low stock flag if stock <= 5
          if (typeof updates.stock === 'number') {
            updated.isLowStock = updates.stock <= 5;
          }
          return updated;
        }
        return j;
      })
    );
  };

  const addNewJersey = (jerseyData: Omit<Jersey, 'id'>) => {
    const newId = `custom-jersey-${Date.now()}`;
    const newJersey: Jersey = {
      ...jerseyData,
      id: newId,
      isVisible: jerseyData.isVisible !== undefined ? jerseyData.isVisible : true,
      rating: 5.0,
      reviewsCount: 1,
    };
    setJerseys((prev) => [newJersey, ...prev]);
  };

  const deleteJersey = (id: string) => {
    setJerseys((prev) => prev.filter((j) => j.id !== id));
    setCart((prev) => prev.filter((c) => c.jerseyId !== id));
    setWishlist((prev) => prev.filter((wid) => wid !== id));
  };

  const toggleJerseyVisibility = (id: string) => {
    setJerseys((prev) =>
      prev.map((j) => {
        if (j.id === id) {
          const currentlyVisible = j.isVisible !== false;
          return { ...j, isVisible: !currentlyVisible };
        }
        return j;
      })
    );
  };

  const resetAllJerseys = () => {
    setJerseys(INITIAL_JERSEYS);
    localStorage.removeItem(LOCAL_STORAGE_KEY_JERSEYS);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  // Available unique teams and players for filters
  const availableTeams = useMemo(() => {
    const set = new Set<string>();
    jerseys.forEach((j) => set.add(j.team));
    return Array.from(set).sort();
  }, [jerseys]);

  const availablePlayers = useMemo(() => {
    const set = new Set<string>();
    jerseys.forEach((j) => {
      if (j.player) set.add(j.player);
    });
    return Array.from(set).sort();
  }, [jerseys]);

  // Filtered & Sorted Jerseys
  const filteredJerseys = useMemo(() => {
    return jerseys.filter((item) => {
      // Visibility toggle (admin can hide/show product without re-adding)
      if (item.isVisible === false) return false;

      // Search
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const matchesSearch =
          item.title.toLowerCase().includes(q) ||
          item.player.toLowerCase().includes(q) ||
          item.team.toLowerCase().includes(q) ||
          item.edition.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      // Category
      if (filters.category !== 'all') {
        if (item.category !== filters.category) return false;
      }

      // Teams
      if (filters.team.length > 0 && !filters.team.includes(item.team)) {
        return false;
      }

      // Players
      if (filters.player.length > 0 && !filters.player.includes(item.player)) {
        return false;
      }

      // Sizes
      if (filters.sizes.length > 0) {
        const hasSize = item.sizes.some((s) => filters.sizes.includes(s));
        if (!hasSize) return false;
      }

      // Gender
      if (filters.gender.length > 0) {
        const hasGender = item.gender.some((g) => filters.gender.includes(g));
        if (!hasGender) return false;
      }

      // Colors
      if (filters.colors.length > 0) {
        const hasColor = item.colors.some((c) =>
          filters.colors.some((fc) => c.name.toLowerCase().includes(fc.toLowerCase()))
        );
        if (!hasColor) return false;
      }

      // Status switches
      if (filters.isOnSaleOnly && !item.isOnSale) return false;
      if (filters.isLowStockOnly && !item.isLowStock) return false;
      if (filters.isLimitedEditionOnly && !item.isLimitedEdition) return false;
      if (filters.nepalOnly && !item.nepalSpecial) return false;

      // Price
      if (item.price < filters.minPrice || item.price > filters.maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'newest') return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      // Default: featured (limited edition first, then on sale)
      if (a.isLimitedEdition && !b.isLimitedEdition) return -1;
      if (!a.isLimitedEdition && b.isLimitedEdition) return 1;
      return 0;
    });
  }, [jerseys, filters]);
  // Orders & Tracking Actions
  const placeOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Order => {
    const code = `ESH-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      ...orderData,
      id: code,
      createdAt: new Date().toISOString(),
      status: 'Order Received',
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  return (
    <StoreContext.Provider
      value={{
        jerseys,
        filteredJerseys,
        filters,
        setFilters,
        resetFilters,
        quickViewJersey,
        setQuickViewJersey,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isCheckoutOpen,
        setIsCheckoutOpen,
        orders,
        placeOrder,
        updateOrderStatus,
        isTrackerOpen,
        setIsTrackerOpen,
        trackingOrderCode,
        setTrackingOrderCode,
        adminWhatsAppNumber,
        setAdminWhatsAppNumber,
        isAdminOpen,
        setIsAdminOpen,
        updateJerseyInventory,
        addNewJersey,
        deleteJersey,
        toggleJerseyVisibility,
        resetAllJerseys,
        sanityConfig,
        saveSanityConfig,
        isSanityModalOpen,
        setIsSanityModalOpen,
        isLoading,
        availableTeams,
        availablePlayers,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
