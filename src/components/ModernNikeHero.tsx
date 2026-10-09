'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroEditorialDrop {
  id: string;
  serial: string;
  sport: 'CRICKET' | 'FOOTBALL';
  team: string;
  player: string;
  number: string;
  title: string;
  edition: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  jerseyId: string;
  specs: { label: string; val: string }[];
}

const HERO_DROPS: HeroEditorialDrop[] = [
  {
    id: 'hero-nepal-rhinos',
    serial: 'REF. NEP-2024-CAP',
    sport: 'CRICKET',
    team: 'NEPAL NATIONAL CRICKET TEAM',
    player: 'ROHIT PAUDEL',
    number: '17',
    title: 'NEPAL RHINOS T20 WORLD CUP MATCH ISSUE',
    edition: 'OFFICIAL MATCH ISSUE // 2024 EDITION',
    description: 'The definitive jersey of the Nepal Rhinos. Engineered with Himalayan contour lines, breathable AeroVent™ poly-mesh, and national crest embroidery.',
    price: 3200,
    originalPrice: 3800,
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
    jerseyId: 'nep-cric-rohit-17',
    specs: [
      { label: 'DISPATCH', val: 'SAME-DAY KTM' },
      { label: 'GRADE', val: 'PLAYER MATCH ISSUE' },
      { label: 'STOCK', val: '24 UNITS READY' },
    ],
  },
  {
    id: 'hero-messi-final',
    serial: 'REF. ARG-2022-LUS',
    sport: 'FOOTBALL',
    team: 'ARGENTINA NATIONAL SQUAD',
    player: 'LIONEL MESSI',
    number: '10',
    title: 'ARGENTINA 3-STAR LUSAIL GOLD-THREAD EDITION',
    edition: 'LIMITED COLLECTOR ISSUE // NUMBERED 114 OF 500',
    description: 'Commemorating the December 18 Lusail Stadium triumph. 3-star gold heat transfer crest, match date embroidery, and player specification fabric.',
    price: 8999,
    originalPrice: 10500,
    image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1200&q=80',
    jerseyId: 'ltd-messi-wc-final',
    specs: [
      { label: 'RARITY', val: '114 / 500 CRAFTED' },
      { label: 'STAMP', val: 'AUTHENTICATED' },
      { label: 'STOCK', val: 'LAST 2 UNITS' },
    ],
  },
  {
    id: 'hero-cr7-milestone',
    serial: 'REF. POR-900-GOAL',
    sport: 'FOOTBALL',
    team: 'PORTUGAL / ALL-TIME RECORD',
    player: 'CRISTIANO RONALDO',
    number: '07',
    title: 'CRISTIANO RONALDO 900 CAREER GOALS EDITION',
    edition: 'HISTORIC COLLECTOR // NUMBERED 087 OF 900',
    description: 'Matte obsidian body with laser-cut gold detailing and career milestone timeline inside the collar. Pure football greatness.',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80',
    jerseyId: 'ltd-ronaldo-900',
    specs: [
      { label: 'SERIES', val: 'RECORD BREAKER' },
      { label: 'EDITION', val: '087 / 900' },
      { label: 'STOCK', val: '3 UNITS' },
    ],
  },
  {
    id: 'hero-kohli-champions',
    serial: 'REF. IND-2024-T20',
    sport: 'CRICKET',
    team: 'TEAM INDIA NATIONAL CRICKET',
    player: 'VIRAT KOHLI',
    number: '18',
    title: 'TEAM INDIA T20 WORLD CHAMPIONS BLUE',
    edition: 'T20 WINNERS MATCH KIT // KING KOHLI #18',
    description: 'The historic T20 World Cup champions kit worn by King Kohli with tricolor collar piping and dynamic breathability mesh.',
    price: 3850,
    originalPrice: 4400,
    image: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=1200&q=80',
    jerseyId: 'ind-cric-kohli-18',
    specs: [
      { label: 'TOURNAMENT', val: 'T20 CHAMPIONS' },
      { label: 'BADGE', val: 'ICC OFFICIAL' },
      { label: 'RATING', val: '4.9 / 5.0 (540+)' },
    ],
  },
];

export const ModernNikeHero: React.FC = () => {
  const { jerseys, setQuickViewJersey } = useStore();
  const [currentIdx, setCurrentIdx] = useState(0);

  // Auto rotate drop every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_DROPS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const drop = HERO_DROPS[currentIdx];

  const handleOpenDrop = () => {
    const target = jerseys.find((j) => j.id === drop.jerseyId);
    if (target) {
      setQuickViewJersey(target);
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
      id="monochrome-editorial-hero"
      style={{
        position: 'relative',
        background: '#000000',
        color: '#ffffff',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        paddingTop: '2.5rem',
        paddingBottom: '3.5rem',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        {/* Top Monospaced Breadcrumb Strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '0.85rem',
            marginBottom: '2.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            color: '#a1a1aa',
            textTransform: 'uppercase',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ color: '#ffffff', fontWeight: 700 }}>[ {drop.serial} ]</span>
            <span>//</span>
            <span>{drop.sport} DIVISION</span>
            <span>//</span>
            <span>{drop.team}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span>KATHMANDU WAREHOUSE: ACTIVE</span>
            <span style={{ color: '#ffffff', fontWeight: 700 }}>
              0{currentIdx + 1} / 0{HERO_DROPS.length}
            </span>
          </div>
        </div>

        {/* 2-Column Architectural Stage */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 1.2fr) minmax(320px, 1fr)',
            gap: '4rem',
            alignItems: 'center',
          }}
          className="hero-main-grid"
        >
          {/* Left: Stark Swiss Typography & Specifications */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Player Stencil Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  letterSpacing: '0.15em',
                  padding: '0.3rem 0.65rem',
                  border: '1px solid #ffffff',
                  color: '#ffffff',
                }}
              >
                #{drop.number}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  color: '#a1a1aa',
                }}
              >
                {drop.player}
              </span>
            </div>

            {/* Giant Monochromatic Headline */}
            <h1
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: 'clamp(2.4rem, 4.8vw, 4.4rem)',
                lineHeight: 0.95,
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#ffffff',
                textTransform: 'uppercase',
              }}
            >
              {drop.title}
            </h1>

            {/* Subtitle / Edition */}
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                letterSpacing: '0.08em',
                color: '#d4d4d8',
                borderLeft: '2px solid #ffffff',
                paddingLeft: '0.85rem',
              }}
            >
              {drop.edition}
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: '0.95rem',
                color: '#a1a1aa',
                lineHeight: 1.6,
                maxWidth: '520px',
              }}
            >
              {drop.description}
            </p>

            {/* Price Row */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '2.4rem',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: '#ffffff',
                }}
              >
                NPR {drop.price.toLocaleString()}
              </span>
              {drop.originalPrice && (
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.15rem',
                    color: '#71717a',
                    textDecoration: 'line-through',
                  }}
                >
                  NPR {drop.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Stark Monochromatic Specs Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '0.85rem 0',
                gap: '1rem',
              }}
            >
              {drop.specs.map((s, idx) => (
                <div key={idx}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#71717a', letterSpacing: '0.1em' }}>
                    {s.label}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#ffffff', fontWeight: 700, marginTop: '0.2rem' }}>
                    {s.val}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <button
                id="hero-buy-now-btn"
                onClick={handleOpenDrop}
                className="btn btn-primary"
                style={{
                  height: '48px',
                  padding: '0 2rem',
                  fontSize: '0.85rem',
                  letterSpacing: '0.08em',
                }}
              >
                <ShoppingBag size={16} />
                <span>CUSTOMIZE & ORDER</span>
              </button>

              <button
                id="hero-scroll-catalog-btn"
                onClick={scrollToCatalog}
                className="btn btn-secondary"
                style={{
                  height: '48px',
                  padding: '0 1.6rem',
                  fontSize: '0.85rem',
                  letterSpacing: '0.08em',
                }}
              >
                <span>EXPLORE ALL 19 KITS</span>
                <ArrowDownIcon size={14} />
              </button>
            </div>
          </div>

          {/* Right: Crisp Architectural Product Frame with Pure B&W Aesthetic */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Minimalist Stark Frame */}
            <div
              onClick={handleOpenDrop}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '460px',
                height: '520px',
                background: '#0a0a0a',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                cursor: 'pointer',
                overflow: 'hidden',
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

              {/* Minimal Dark Gradient Vignette */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.4) 100%)',
                }}
              />

              {/* Stencil Top Tag */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  color: '#ffffff',
                  background: 'rgba(0, 0, 0, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  padding: '0.3rem 0.6rem',
                }}
              >
                {drop.serial}
              </div>

              {/* Bottom Frame Details */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  background: 'rgba(0, 0, 0, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#71717a', letterSpacing: '0.1em' }}>
                    OFFICIAL ATHLETE ISSUE
                  </div>
                  <div style={{ fontFamily: 'var(--font-primary)', fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
                    {drop.player} #{drop.number}
                  </div>
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  <span>CUSTOMIZE</span>
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </div>

            {/* Slider Navigation Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                maxWidth: '460px',
                marginTop: '1.25rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => setCurrentIdx((p) => (p === 0 ? HERO_DROPS.length - 1 : p - 1))}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    width: '36px',
                    height: '36px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setCurrentIdx((p) => (p + 1) % HERO_DROPS.length)}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    width: '36px',
                    height: '36px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Progress indicators */}
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {HERO_DROPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIdx(i)}
                    style={{
                      width: currentIdx === i ? '24px' : '8px',
                      height: '2px',
                      background: currentIdx === i ? '#ffffff' : 'rgba(255, 255, 255, 0.25)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function ArrowDownIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <polyline points="19 12 12 19 5 12"></polyline>
    </svg>
  );
}
