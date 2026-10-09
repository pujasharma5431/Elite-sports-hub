'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, ArrowRight, ArrowDown, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { JerseySize } from '../types/jersey';

interface HeroEditorialDrop {
  id: string;
  serial: string;
  sport: 'Cricket' | 'Football';
  team: string;
  player: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  jerseyId: string;
  tag: string;
  tagType: 'nepal' | 'gold' | 'sale' | 'emerald';
  specs: { label: string; val: string }[];
}

const HERO_DROPS: HeroEditorialDrop[] = [
  {
    id: 'hero-nepal-rhinos',
    serial: 'REF. NEP-2024-CAP',
    sport: 'Cricket',
    team: 'Nepal National Cricket Team',
    player: 'Rohit Paudel',
    number: '17',
    title: 'Nepal Rhinos T20 World Cup Official Match Kit',
    subtitle: 'Official Tournament Edition • Rohit Paudel #17',
    description: 'The definitive jersey of the Nepal Rhinos. Engineered with Himalayan contour lines, lightweight AeroVent™ poly-mesh, and high-definition national crest embroidery.',
    price: 3200,
    originalPrice: 3800,
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
    jerseyId: 'nep-cric-rohit-17',
    tag: '🇳🇵 Nepal Squad Official',
    tagType: 'nepal',
    specs: [
      { label: 'Kathmandu Dispatch', val: 'Same-Day Delivery' },
      { label: 'Tournament Grade', val: 'Player Match Issue' },
      { label: 'Warehouse Stock', val: '24 Units Ready' },
    ],
  },
  {
    id: 'hero-messi-final',
    serial: 'REF. ARG-2022-LUS',
    sport: 'Football',
    team: 'Argentina National Squad',
    player: 'Lionel Messi',
    number: '10',
    title: 'Argentina 3-Star Lusail Gold Champions Edition',
    subtitle: 'Numbered Collector Issue • 114 of 500 Worldwide',
    description: 'Commemorating the Lusail Stadium world triumph. Features the 3-star gold heat transfer crest, match date embroidery, and player-specification jacquard knit.',
    price: 8999,
    originalPrice: 10500,
    image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1200&q=80',
    jerseyId: 'ltd-messi-wc-final',
    tag: '★ 3-Star World Champions',
    tagType: 'gold',
    specs: [
      { label: 'Limited Rarity', val: '114 / 500 Worldwide' },
      { label: 'Authentication', val: 'Certificate Included' },
      { label: 'Current Inventory', val: 'Last 2 Units' },
    ],
  },
  {
    id: 'hero-cr7-milestone',
    serial: 'REF. POR-900-GOAL',
    sport: 'Football',
    team: 'Portugal National Team',
    player: 'Cristiano Ronaldo',
    number: '07',
    title: 'Cristiano Ronaldo 900 Career Goals Edition',
    subtitle: 'Historic Collector Edition • 087 of 900 Worldwide',
    description: 'Matte obsidian body with laser-cut gold detailing and career milestone timeline inside the collar. Crafted for true football collectors.',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80',
    jerseyId: 'ltd-ronaldo-900',
    tag: '⚡ 900 Goals Collector',
    tagType: 'gold',
    specs: [
      { label: 'Milestone Issue', val: 'Record Breaker 087/900' },
      { label: 'Fabric Grade', val: 'Pro-Vapor Engineered' },
      { label: 'Kathmandu Stock', val: '3 Units Left' },
    ],
  },
  {
    id: 'hero-kohli-champions',
    serial: 'REF. IND-2024-T20',
    sport: 'Cricket',
    team: 'Team India Cricket',
    player: 'Virat Kohli',
    number: '18',
    title: 'Team India T20 World Champions Victory Blue',
    subtitle: 'King Kohli #18 • ICC T20 Tournament Winners Kit',
    description: 'The historic T20 World Cup champions kit worn by King Kohli with tricolor collar piping, dynamic breathability mesh, and champion star crest.',
    price: 3850,
    originalPrice: 4400,
    image: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=1200&q=80',
    jerseyId: 'ind-cric-kohli-18',
    tag: '🏆 T20 World Champions',
    tagType: 'sale',
    specs: [
      { label: 'Authentic Kit', val: 'ICC Official Issue' },
      { label: 'Player Cut', val: 'Slim Athletic Fit' },
      { label: 'Fan Rating', val: '4.9 ★ (540+ Reviews)' },
    ],
  },
];

export const ModernNikeHero: React.FC = () => {
  const { jerseys, addToCart, setQuickViewJersey } = useStore();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<JerseySize>('L');
  const [addedToast, setAddedToast] = useState(false);

  // Auto rotate drop every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_DROPS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const drop = HERO_DROPS[currentIdx];

  const handleQuickAdd = () => {
    const target = jerseys.find((j) => j.id === drop.jerseyId);
    if (target) {
      addToCart({
        jerseyId: target.id,
        jersey: target,
        selectedSize,
        selectedGender: 'men',
        selectedColor: target.colors[0] || { name: 'Standard', hex: '#ffffff' },
        quantity: 1,
        price: target.price,
      });
      setAddedToast(true);
      setTimeout(() => setAddedToast(false), 2200);
    }
  };

  const handleOpenDetails = () => {
    const target = jerseys.find((j) => j.id === drop.jerseyId);
    if (target) {
      setQuickViewJersey(target);
    }
  };

  const scrollToCustomizer = () => {
    const el = document.getElementById('customizer-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="modern-hero-showcase"
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #08090d 0%, #0d0f15 100%)',
        color: '#ffffff',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        paddingTop: '2.5rem',
        paddingBottom: '3.5rem',
        overflow: 'hidden',
      }}
    >
      {/* Background Radial Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '5%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.08) 0%, rgba(245, 158, 11, 0.04) 40%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(60px)',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Top Header Pill Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '1rem',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                padding: '0.3rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                color: '#e2e8f0',
                fontWeight: 600,
              }}
            >
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981' }} className="pulse-animation" />
              <span>Kathmandu Central Vault • Official 2024–2026 Drops</span>
            </span>

            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>//</span>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>{drop.serial}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              Drop <strong style={{ color: '#ffffff' }}>0{currentIdx + 1}</strong> of <strong>0{HERO_DROPS.length}</strong>
            </span>
          </div>
        </div>

        {/* 2-Column Showcase */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 1.25fr) minmax(320px, 1fr)',
            gap: '3.5rem',
            alignItems: 'center',
          }}
          className="hero-main-grid"
        >
          {/* Left Column: Clean Modern Headline & Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Tag & Athlete Stencil */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
              <span
                style={{
                  background:
                    drop.tagType === 'nepal'
                      ? 'rgba(239, 68, 68, 0.15)'
                      : drop.tagType === 'gold'
                      ? 'rgba(245, 158, 11, 0.15)'
                      : 'rgba(59, 130, 246, 0.15)',
                  border:
                    drop.tagType === 'nepal'
                      ? '1px solid rgba(239, 68, 68, 0.4)'
                      : drop.tagType === 'gold'
                      ? '1px solid rgba(245, 158, 11, 0.4)'
                      : '1px solid rgba(59, 130, 246, 0.4)',
                  color:
                    drop.tagType === 'nepal'
                      ? '#f87171'
                      : drop.tagType === 'gold'
                      ? '#fbbf24'
                      : '#60a5fa',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                }}
              >
                {drop.tag}
              </span>

              <span
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  padding: '0.3rem 0.65rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                #{drop.number} {drop.player}
              </span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: 'clamp(2.2rem, 3.8vw, 3.5rem)',
                lineHeight: 1.12,
                fontWeight: 800,
                letterSpacing: '-0.025em',
                color: '#ffffff',
              }}
            >
              {drop.title}
            </h1>

            {/* Subtitle */}
            <div style={{ color: '#cbd5e1', fontSize: '0.95rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '4px', height: '18px', background: '#ffffff', borderRadius: '2px' }} />
              <span>{drop.subtitle}</span>
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: '0.95rem',
                color: '#94a3b8',
                lineHeight: 1.6,
                maxWidth: '540px',
              }}
            >
              {drop.description}
            </p>

            {/* Size Selector Strip */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.25rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>Select Your Fit:</span>
                <span style={{ color: '#ffffff', fontWeight: 700 }}>Size {selectedSize}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {(['S', 'M', 'L', 'XL', 'XXL'] as JerseySize[]).map((sz) => {
                  const isSel = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      style={{
                        width: '42px',
                        height: '38px',
                        borderRadius: '6px',
                        border: isSel ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.15)',
                        background: isSel ? '#ffffff' : 'rgba(255, 255, 255, 0.04)',
                        color: isSel ? '#08090d' : '#cbd5e1',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'var(--transition)',
                      }}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price & Value Row */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.85rem', marginTop: '0.25rem' }}>
              <span
                style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  fontFamily: 'var(--font-primary)',
                }}
              >
                रू {drop.price.toLocaleString()}
              </span>
              {drop.originalPrice && (
                <span
                  style={{
                    fontSize: '1.05rem',
                    color: '#64748b',
                    textDecoration: 'line-through',
                  }}
                >
                  रू {drop.originalPrice.toLocaleString()}
                </span>
              )}
              {drop.originalPrice && (
                <span
                  style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    color: '#f87171',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                  }}
                >
                  Save रू {(drop.originalPrice - drop.price).toLocaleString()}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <button
                id="hero-quick-add-btn"
                onClick={handleQuickAdd}
                className="btn btn-primary"
                style={{
                  height: '46px',
                  padding: '0 1.6rem',
                  fontSize: '0.88rem',
                }}
              >
                <ShoppingBag size={17} />
                <span>{addedToast ? 'Added to Bag ✓' : `Add Size ${selectedSize} to Bag`}</span>
              </button>

              <button
                id="hero-customize-nav-btn"
                onClick={scrollToCustomizer}
                className="btn btn-secondary"
                style={{
                  height: '46px',
                  padding: '0 1.4rem',
                  fontSize: '0.88rem',
                }}
              >
                <Sparkles size={16} />
                <span>Custom Name & #</span>
              </button>
            </div>

            {/* Specs Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.75rem',
                marginTop: '0.75rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '1rem',
              }}
            >
              {drop.specs.map((s, idx) => (
                <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '8px', padding: '0.65rem 0.75rem' }}>
                  <div style={{ fontSize: '0.68rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#ffffff', fontWeight: 600, marginTop: '0.2rem' }}>
                    {s.val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Visual Container & Slide Selector */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Visual Box */}
            <div
              onClick={handleOpenDetails}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '460px',
                height: '490px',
                background: '#11141c',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                cursor: 'pointer',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
              }}
            >
              <Image
                src={drop.image}
                alt={drop.title}
                fill
                priority
                style={{
                  objectFit: 'cover',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />

              {/* Gradient Vignette */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(8, 9, 13, 0.95) 0%, rgba(8, 9, 13, 0.15) 50%, rgba(8, 9, 13, 0.3) 100%)',
                }}
              />

              {/* Floating Athlete Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: 'rgba(8, 9, 13, 0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '9999px',
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.75rem',
                  color: '#ffffff',
                  fontWeight: 600,
                }}
              >
                <ShieldCheck size={14} color="#10b981" />
                <span>Authentic Pro Issue</span>
              </div>

              {/* Bottom Card Strip */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  background: 'rgba(15, 17, 24, 0.88)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  borderRadius: '12px',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {drop.team}
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', marginTop: '0.1rem' }}>
                    {drop.player} #{drop.number}
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.75rem',
                    color: '#ffffff',
                    fontWeight: 700,
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '0.4rem 0.7rem',
                    borderRadius: '6px',
                  }}
                >
                  <span>Quick View</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            </div>

            {/* Thumbnail Navigation Strip */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${HERO_DROPS.length}, 1fr)`,
                gap: '0.65rem',
                width: '100%',
                maxWidth: '460px',
                marginTop: '1rem',
              }}
            >
              {HERO_DROPS.map((h, i) => {
                const isActive = currentIdx === i;
                return (
                  <button
                    key={h.id}
                    onClick={() => setCurrentIdx(i)}
                    style={{
                      background: isActive ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                      border: isActive ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      padding: '0.5rem 0.6rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'var(--transition)',
                    }}
                  >
                    <div style={{ fontSize: '0.65rem', color: isActive ? '#f87171' : '#64748b', fontWeight: 700 }}>
                      0{i + 1} // {h.sport}
                    </div>
                    <div
                      style={{
                        fontSize: '0.72rem',
                        color: isActive ? '#ffffff' : '#94a3b8',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        marginTop: '0.1rem',
                      }}
                    >
                      {h.player}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
