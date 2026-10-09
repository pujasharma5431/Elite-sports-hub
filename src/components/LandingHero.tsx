'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useStore } from '../context/StoreContext';
import {
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  Flame,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Star,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeroSlide {
  id: string;
  badge: string;
  badgeType: 'nepal' | 'gold' | 'sale';
  title: string;
  subtitle: string;
  playerTag: string;
  price: number;
  originalPrice?: number;
  image: string;
  glowColor: string;
  stats: { label: string; value: string }[];
  jerseyId: string;
  categoryFilter: 'all' | 'cricket' | 'football' | 'limited-edition';
  nepalOnlyFilter?: boolean;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'nepal-rhinos',
    badge: '🇳🇵 NEPAL NATIONAL CRICKET • OFFICIAL WORLD CUP KIT',
    badgeType: 'nepal',
    title: 'Nepal Rhinos T20 World Cup Official Match Kit',
    subtitle: 'Worn by Captain Rohit Paudel and the Rhinos on the world stage. Styled with authentic mountain contours & moisture-wicking AeroVent™ mesh.',
    playerTag: 'Rohit Paudel #17',
    price: 3200,
    originalPrice: 3800,
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=900&q=80',
    glowColor: 'rgba(37, 99, 235, 0.45)',
    stats: [
      { label: 'Edition', value: 'T20 World Cup 2024' },
      { label: 'Kathmandu Stock', value: '24 Available' },
      { label: 'Dispatch', value: 'Same-Day' },
    ],
    jerseyId: 'nep-cric-rohit-17',
    categoryFilter: 'cricket',
    nepalOnlyFilter: true,
  },
  {
    id: 'messi-argentina',
    badge: '⭐⭐⭐ 3-STAR WORLD CHAMPIONS • LUSAIL GOLD EDITION',
    badgeType: 'gold',
    title: 'Lionel Messi 2022 World Cup Final Gold-Thread Jersey',
    subtitle: 'Ultra-exclusive commemorative edition celebrating the historic victory at Lusail Stadium. Heat-pressed 3rd star and match details.',
    playerTag: 'Lionel Messi #10',
    price: 8999,
    originalPrice: 10500,
    image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=900&q=80',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    stats: [
      { label: 'Rarity', value: 'Numbered 114/500' },
      { label: 'Material', value: 'HEAT.RDY Pro Match' },
      { label: 'Certificate', value: 'Included' },
    ],
    jerseyId: 'ltd-messi-wc-final',
    categoryFilter: 'limited-edition',
  },
  {
    id: 'cr7-900',
    badge: '👑 ALL-TIME TOP SCORER • 900 CAREER GOALS',
    badgeType: 'gold',
    title: 'Cristiano Ronaldo 900 Historic Career Goals Edition',
    subtitle: 'Matte obsidian black body with laser-cut gold detailing and career milestone timeline inside the collar. Pure football greatness.',
    playerTag: 'Cristiano Ronaldo #7',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=900&q=80',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    stats: [
      { label: 'Collector Batch', value: 'Numbered 087/900' },
      { label: 'Emblem', value: '3D Golden Aurum' },
      { label: 'Stock in KTM', value: 'Only 3 Left' },
    ],
    jerseyId: 'ltd-ronaldo-900',
    categoryFilter: 'limited-edition',
  },
  {
    id: 'kohli-india',
    badge: '🏏 ICC WORLD CHAMPIONS 2024 • KING KOHLI',
    badgeType: 'sale',
    title: 'Team India T20 Champions Blue - Virat Kohli #18',
    subtitle: 'Official 2024 ICC T20 World Cup champions jersey with tricolor collar accents and championship star. Engineered for true cricket fans.',
    playerTag: 'Virat Kohli #18',
    price: 3850,
    originalPrice: 4400,
    image: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=900&q=80',
    glowColor: 'rgba(30, 58, 138, 0.5)',
    stats: [
      { label: 'Tournament', value: 'T20 Winners Kit' },
      { label: 'Fit', value: 'Athlete Pro Vent' },
      { label: 'Rating', value: '4.9 ★ (540+)' },
    ],
    jerseyId: 'ind-cric-kohli-18',
    categoryFilter: 'cricket',
  },
];

export const LandingHero: React.FC = () => {
  const { jerseys, setQuickViewJersey, setFilters } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  const handleOpenSlideProduct = () => {
    const matchedJersey = jerseys.find((j) => j.id === slide.jerseyId);
    if (matchedJersey) {
      setQuickViewJersey(matchedJersey);
    }
  };

  const handleCategoryCTA = () => {
    setFilters((prev) => ({
      ...prev,
      category: slide.categoryFilter,
      nepalOnly: Boolean(slide.nepalOnlyFilter),
    }));
    // Scroll to catalog smoothly
    const catalogEl = document.getElementById('shop-catalog-anchor');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCatalog = () => {
    const catalogEl = document.getElementById('shop-catalog-anchor');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      id="landing-hero-showcase"
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #090c14 0%, #0c101c 60%, #07090e 100%)',
        borderBottom: '1px solid var(--border-light)',
        paddingTop: '2.5rem',
        paddingBottom: '2.5rem',
        overflow: 'hidden',
      }}
    >
      {/* Background Dynamic Glow Sphere */}
      <div
        className="hero-glow-sphere"
        style={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          width: '520px',
          height: '520px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${slide.glowColor} 0%, transparent 70%)`,
          filter: 'blur(75px)',
          pointerEvents: 'none',
          transition: 'all 0.8s ease',
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Top Ticker Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            padding: '0.5rem 1rem',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '2rem',
            fontSize: '0.8rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontWeight: 600 }}>
            <Sparkles size={14} />
            <span>EXPRESS LOCKER DROP 2026</span>
          </div>

          <div style={{ color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🇳🇵 Same-Day Kathmandu Delivery</span>
            <span style={{ color: '#475569' }}>•</span>
            <span style={{ color: '#34d399' }}>Cash on Delivery / eSewa / Khalti</span>
            <span style={{ color: '#475569' }}>•</span>
            <span style={{ color: '#38bdf8' }}>Official Numbered Collector Kits</span>
          </div>

          <button
            onClick={scrollToCatalog}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#38bdf8',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <span>Jump to Filters</span>
            <ChevronDown size={14} />
          </button>
        </div>

        {/* Main 2-Column Hero Stage */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 1.15fr) 1fr',
            gap: '3rem',
            alignItems: 'center',
          }}
          className="hero-main-grid"
        >
          {/* Left Column: Headlines, Copy, Stats & Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Dynamic Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span
                className={`badge ${
                  slide.badgeType === 'nepal'
                    ? 'badge-nepal'
                    : slide.badgeType === 'gold'
                    ? 'badge-gold'
                    : 'badge-sale'
                }`}
                style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
              >
                {slide.badge}
              </span>
            </div>

            {/* Big Impact Headline */}
            <h1
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
                lineHeight: 1.08,
                fontWeight: 900,
                letterSpacing: '-0.03em',
                color: '#ffffff',
              }}
            >
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: '1rem',
                color: '#94a3b8',
                lineHeight: 1.55,
                maxWidth: '560px',
              }}
            >
              {slide.subtitle}
            </p>

            {/* Pricing & Offer */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.85rem' }}>
              <span
                style={{
                  fontSize: '2rem',
                  fontWeight: 900,
                  fontFamily: 'var(--font-primary)',
                  color: slide.badgeType === 'gold' ? '#fbbf24' : '#ffffff',
                }}
              >
                रू {slide.price.toLocaleString()}
              </span>
              {slide.originalPrice && (
                <span
                  style={{
                    fontSize: '1.1rem',
                    color: '#64748b',
                    textDecoration: 'line-through',
                  }}
                >
                  रू {slide.originalPrice.toLocaleString()}
                </span>
              )}
              {slide.originalPrice && (
                <span
                  style={{
                    background: 'rgba(230, 57, 70, 0.2)',
                    color: '#f87171',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.5rem',
                    borderRadius: 'var(--radius-full)',
                  }}
                >
                  SAVE {Math.round(((slide.originalPrice - slide.price) / slide.originalPrice) * 100)}%
                </span>
              )}
            </div>

            {/* Spec Highlights Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.75rem',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem',
              }}
            >
              {slide.stats.map((st, i) => (
                <div key={i}>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {st.label}
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#e2e8f0', marginTop: '0.2rem' }}>
                    {st.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Primary Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <button
                id="hero-buy-now-btn"
                onClick={handleOpenSlideProduct}
                className={slide.badgeType === 'gold' ? 'btn btn-gold' : 'btn btn-primary'}
                style={{
                  height: '48px',
                  padding: '0 1.6rem',
                  fontSize: '0.95rem',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <ShoppingBag size={18} />
                <span>Customize & Order Now</span>
              </button>

              <button
                id="hero-explore-collection-btn"
                onClick={handleCategoryCTA}
                className="btn btn-secondary"
                style={{
                  height: '48px',
                  padding: '0 1.4rem',
                  fontSize: '0.95rem',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <span>Browse Category</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Column: Floating 3D Jersey Display & Slide Switcher */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Main Floating Jersey Display Card */}
            <div
              className="floating-hero-jersey"
              onClick={handleOpenSlideProduct}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '430px',
                height: '470px',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                background: '#0d131f',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
                cursor: 'pointer',
              }}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                style={{
                  objectFit: 'cover',
                  transform: 'scale(1.02)',
                }}
              />

              {/* Shading overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(7, 9, 14, 0.95) 0%, rgba(7, 9, 14, 0.2) 50%, rgba(0, 0, 0, 0.4) 100%)',
                }}
              />

              {/* Floating Top Player Card */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  background: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.35rem 0.85rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <span style={{ color: '#38bdf8' }}>★</span>
                <span>{slide.playerTag}</span>
              </div>

              {/* Bottom Card Overlay */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  background: 'rgba(15, 23, 42, 0.9)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>
                    Quick Preview
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>
                    रू {slide.price.toLocaleString()}
                  </div>
                </div>

                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#38bdf8',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                  }}
                >
                  <span>Click to Customize</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            </div>

            {/* Slide Navigation Dots & Arrows */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginTop: '1.5rem',
              }}
            >
              <button
                onClick={() => setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid var(--border-light)',
                  color: '#ffffff',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ChevronLeft size={18} />
              </button>

              <div style={{ display: 'flex', gap: '0.45rem' }}>
                {HERO_SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSlide(idx)}
                    style={{
                      height: '8px',
                      width: currentSlide === idx ? '28px' : '8px',
                      borderRadius: 'var(--radius-full)',
                      background: currentSlide === idx ? '#e63946' : 'rgba(255, 255, 255, 0.2)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid var(--border-light)',
                  color: '#ffffff',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Feature Pill Cards below hero */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            marginTop: '2.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border-light)',
          }}
        >
          <div
            className="hero-feature-card"
            onClick={() => setFilters((p) => ({ ...p, category: 'all', nepalOnly: true }))}
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontSize: '1.5rem' }}>🇳🇵</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#ffffff' }}>Nepal Rhinos & Gorkhalis</div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Rohit, Paras, Sandeep & Bimal</div>
            </div>
          </div>

          <div
            className="hero-feature-card"
            onClick={() => setFilters((p) => ({ ...p, category: 'cricket', nepalOnly: false }))}
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontSize: '1.5rem' }}>🏏</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#ffffff' }}>Cricket Masters</div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Virat Kohli, Rohit & Dhoni 2011</div>
            </div>
          </div>

          <div
            className="hero-feature-card"
            onClick={() => setFilters((p) => ({ ...p, category: 'football', nepalOnly: false }))}
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontSize: '1.5rem' }}>⚽</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#ffffff' }}>World Football Giants</div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Messi, Ronaldo, Mbappé & Haaland</div>
            </div>
          </div>

          <div
            className="hero-feature-card"
            onClick={() => setFilters((p) => ({ ...p, category: 'limited-edition', nepalOnly: false }))}
            style={{
              background: 'rgba(245, 158, 11, 0.05)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontSize: '1.5rem' }}>✨</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#fbbf24' }}>Numbered Limited 1/500</div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Gold Thread Collector Editions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
