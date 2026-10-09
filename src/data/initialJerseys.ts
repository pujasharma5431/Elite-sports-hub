import { Jersey } from '../types/jersey';

// Single clean Messi World Cup jersey for admin testing & store display
export const INITIAL_JERSEYS: Jersey[] = [
  {
    id: 'ltd-messi-wc-final',
    title: 'Argentina 3-Star World Cup Champions Edition - Lionel Messi #10',
    slug: 'argentina-3-star-messi-10-world-cup',
    category: 'football',
    sport: 'Football',
    team: 'Argentina National Football Team',
    player: 'Lionel Messi',
    playerNumber: 10,
    edition: 'FIFA World Cup Qatar 2022 Champions Special Kit',
    price: 4500,
    originalPrice: 5200,
    isOnSale: true,
    isLimitedEdition: false,
    stock: 20,
    isLowStock: false,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    gender: ['men', 'women', 'unisex'],
    colors: [
      { name: 'Albiceleste Sky Blue & White', hex: '#38BDF8' },
      { name: 'Champions Gold', hex: '#F59E0B' },
    ],
    badge: '3-Star Champions Edition',
    image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=900&q=80',
    rating: 5.0,
    reviewsCount: 42,
    fabric: 'AeroVent™ Pro Player Poly-Mesh with gold champion embroidery',
    quality: '100% Player Match Specification // Micro-perforated breathable fabric with silicone Argentine FA crest',
    description: 'The iconic 3-Star Argentina jersey celebrated in the Lusail final. Features the official gold tournament badge, lightweight match-grade knit, and Lionel Messi 10 lettering.',
    nepalSpecial: false,
    isHeadlineDrop: true,
    isCustomizable: true,
    isVisible: true,
  },
];
