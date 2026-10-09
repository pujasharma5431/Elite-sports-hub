export type SportCategory = 'cricket' | 'football' | 'limited-edition';

export type Gender = 'men' | 'women' | 'unisex' | 'kids';

export type JerseySize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL';

export interface JerseyColor {
  name: string;
  hex: string;
}

export interface Jersey {
  id: string;
  _id?: string;
  title: string;
  slug: string;
  category: SportCategory;
  sport: 'Cricket' | 'Football';
  team: string;
  player: string;
  playerNumber?: number;
  edition: string;
  price: number; // In NPR
  originalPrice?: number; // In NPR
  isOnSale: boolean;
  isLimitedEdition: boolean;
  limitedEditionNumber?: string;
  stock: number;
  isLowStock: boolean;
  sizes: JerseySize[];
  gender: Gender[];
  colors: JerseyColor[];
  badge?: string;
  image: string;
  gallery?: string[];
  rating: number;
  reviewsCount: number;
  fabric: string;
  quality?: string; // Quality specifications added by admin
  description: string;
  nepalSpecial?: boolean;
  isHeadlineDrop?: boolean; // Admin sets whether featured in Headline Match Drops
  isCustomizable?: boolean; // Admin sets whether customizable with custom name/number
  isVisible?: boolean; // Admin can toggle visibility on customer storefront without re-adding
}

export interface FilterState {
  search: string;
  category: SportCategory | 'all';
  team: string[];
  player: string[];
  sizes: JerseySize[];
  gender: Gender[];
  colors: string[];
  isOnSaleOnly: boolean;
  isLowStockOnly: boolean;
  isLimitedEditionOnly: boolean;
  nepalOnly: boolean;
  minPrice: number;
  maxPrice: number;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

export interface CartItem {
  id: string; // unique item id including custom selection
  jerseyId: string;
  jersey: Jersey;
  selectedSize: JerseySize;
  selectedGender: Gender;
  selectedColor: JerseyColor;
  customPrint?: {
    name: string;
    number: string;
  };
  quantity: number;
  price: number;
}

export interface SanityConfig {
  projectId: string;
  dataset: string;
  apiVersion: string;
  token?: string;
  isConnected: boolean;
}

export type OrderStatus = 'Order Received' | 'Packed' | 'Dispatched' | 'Delivered';

export interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  country: string;
  region: string;
  address: string;
  items: CartItem[];
  totalAmount: number;
  paymentMethod: 'cod' | 'esewa' | 'khalti' | 'bank_transfer';
  status: OrderStatus;
  notes?: string;
}

