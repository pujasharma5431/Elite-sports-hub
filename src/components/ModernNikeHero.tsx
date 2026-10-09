'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowDown, Sparkles, Globe, MapPin } from 'lucide-react';

interface LuxuryCampaignSlide {
  id: string;
  dropTag: string;
  kitName: string;
  playerTag: string;
  image: string;
  targetCategory?: 'nepal' | 'football' | 'limited';
}

const CAMPAIGN_SLIDES: LuxuryCampaignSlide[] = [
  {
    id: 'campaign-nepal-rhinos',
    dropTag: 'OFFICIAL MATCH ISSUE // 2026',
    kitName: 'Nepal Rhinos T20 & Football Official Kit',
    playerTag: 'Rohit Paudel #17 • Nepal Squad Edition',
    image: '/campaigns/hero-nepal.jpg',
    targetCategory: 'nepal',
  },
  {
    id: 'campaign-world-champions',
    dropTag: 'WORLD FOOTBALL ARCHIVE',
    kitName: 'Champions White & Gold Coronation Edition',
    playerTag: 'Kylian Mbappé #9 • Pro Match AeroVent™',
    image: '/campaigns/hero-champions.jpg',
    targetCategory: 'football',
  },
  {
    id: 'campaign-obsidian-collector',
    dropTag: 'LIMITED TO 500 PIECES WORLDWIDE',
    kitName: 'The Obsidian Series • 24K Gold Trim',
    playerTag: 'Individually Numbered Vault Release',
    image: '/campaigns/hero-obsidian.jpg',
    targetCategory: 'limited',
  },
];

export const ModernNikeHero: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [currentIdx]);

  const handleNextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % CAMPAIGN_SLIDES.length);
      setIsTransitioning(false);
    }, 350);
  };

  const handlePrevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev === 0 ? CAMPAIGN_SLIDES.length - 1 : prev - 1));
      setIsTransitioning(false);
    }, 350);
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCustomizer = () => {
    const el = document.getElementById('customizer-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentSlide = CAMPAIGN_SLIDES[currentIdx];

  return (
    <section
      id="luxury-cinematic-hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: 'clamp(660px, 88vh, 920px)',
        overflow: 'hidden',
        background: '#040507',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3.5rem 1rem 4rem 1rem',
      }}
    >
      {/* Background Campaign Visuals with Ken Burns Scale Animation */}
      {CAMPAIGN_SLIDES.map((slide, idx) => {
        const isActive = idx === currentIdx;
        return (
          <div
            key={slide.id}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: isActive ? 1 : 0,
              transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
              pointerEvents: isActive ? 'auto' : 'none',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                transform: isActive ? 'scale(1.06)' : 'scale(1.0)',
                transition: 'transform 8s cubic-bezier(0.25, 1, 0.5, 1)',
              }}
            >
              <Image
                src={slide.image}
                alt={slide.kitName}
                fill
                priority={idx === 0}
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center 25%',
                }}
              />
            </div>

            {/* High-Fashion Cinematic Vignettes (Ralph Lauren moody shading) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(4, 5, 7, 0.6) 0%, rgba(4, 5, 7, 0.25) 30%, rgba(4, 5, 7, 0.72) 70%, rgba(4, 5, 7, 0.98) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at center, transparent 35%, rgba(4, 5, 7, 0.65) 100%)',
              }}
            />
          </div>
        );
      })}

      {/* Center Cinematic Editorial Overlay */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '960px',
          padding: '0 1rem',
          opacity: isTransitioning ? 0.35 : 1,
          transform: isTransitioning ? 'translateY(6px)' : 'translateY(0)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Exact Tagline Eyebrow: Premium Jersey Store — Nepal */}
        <div
          id="hero-eyebrow-tag"
          style={{
            fontSize: '0.78rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#f8fafc',
            fontWeight: 600,
            marginBottom: '0.9rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.65rem',
            background: 'rgba(0, 0, 0, 0.55)',
            backdropFilter: 'blur(12px)',
            padding: '0.42rem 1.15rem',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#ef4444',
              boxShadow: '0 0 10px #ef4444',
            }}
          />
          <span>Premium Jersey Store — Nepal</span>
        </div>

        {/* Brand Name: Elite Sports Hub */}
        <div
          id="hero-brand-subtitle"
          style={{
            fontFamily: 'var(--font-primary), sans-serif',
            fontSize: 'clamp(0.85rem, 1.4vw, 1.15rem)',
            letterSpacing: '0.35em',
            color: '#cbd5e1',
            fontWeight: 700,
            textTransform: 'uppercase',
            marginBottom: '0.65rem',
            textShadow: '0 2px 12px rgba(0, 0, 0, 0.9)',
          }}
        >
          Elite Sports Hub
        </div>

        {/* Majestic 2-Line Headline: Wear the \n Victory. */}
        <h1
          id="hero-main-heading"
          style={{
            fontFamily: 'var(--font-luxury), Georgia, serif',
            fontSize: 'clamp(3.2rem, 7.8vw, 6.4rem)',
            lineHeight: 0.96,
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: '#ffffff',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
            textShadow: '0 6px 40px rgba(0, 0, 0, 0.95)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              display: 'block',
              color: '#ffffff',
              letterSpacing: '0.12em',
            }}
          >
            Wear the
          </span>
          <span
            style={{
              display: 'block',
              background: 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 45%, #cbd5e1 80%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.14em',
            }}
          >
            Victory.
          </span>
        </h1>

        {/* Exact User Tagline */}
        <p
          id="hero-tagline-text"
          style={{
            fontSize: 'clamp(0.95rem, 1.3vw, 1.12rem)',
            color: '#e2e8f0',
            lineHeight: 1.65,
            maxWidth: '720px',
            marginBottom: '1.5rem',
            textShadow: '0 2px 14px rgba(0, 0, 0, 0.95)',
            fontWeight: 400,
          }}
        >
          Top-grade football & cricket jerseys delivered across Nepal. Authentic designs, fan-perfect fit, prices that won’t break your budget.
        </p>

        {/* Delivery Destinations Ribbon: Nepal, Dubai, India & Worldwide */}
        <div
          id="hero-delivery-destinations"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.65rem 1rem',
            padding: '0.55rem 1.35rem',
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            borderRadius: '9999px',
            fontSize: '0.78rem',
            color: '#cbd5e1',
            fontWeight: 500,
            marginBottom: '2.1rem',
            boxShadow: '0 6px 25px rgba(0, 0, 0, 0.7)',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: '#fbbf24',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              fontSize: '0.72rem',
            }}
          >
            <Globe size={13} color="#fbbf24" />
            <span>Delivery Available:</span>
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#ffffff', fontWeight: 600 }}>
            <span>🇳🇵</span> <span>All Over Nepal (77 Districts)</span>
          </span>
          <span style={{ color: '#475569' }}>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#ffffff', fontWeight: 600 }}>
            <span>🇦🇪</span> <span>Dubai (UAE)</span>
          </span>
          <span style={{ color: '#475569' }}>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#ffffff', fontWeight: 600 }}>
            <span>🇮🇳</span> <span>India</span>
          </span>
          <span style={{ color: '#475569' }}>•</span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: '#38bdf8',
              fontWeight: 700,
            }}
          >
            <span>🌐</span> <span>Worldwide / Overall Shipping</span>
          </span>
        </div>

        {/* Understated Luxury Actions (NO prices or size clutter) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '1.75rem',
          }}
        >
          <button
            id="hero-explore-collection-btn"
            onClick={scrollToCatalog}
            style={{
              height: '52px',
              padding: '0 2.4rem',
              background: '#ffffff',
              color: '#06070a',
              border: '1px solid #ffffff',
              borderRadius: '4px',
              fontFamily: 'var(--font-primary)',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              transition: 'all 0.25s ease',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#06070a';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.color = '#06070a';
            }}
          >
            <span>Explore Collection</span>
            <ArrowDown size={14} />
          </button>

          <button
            id="hero-customize-direct-btn"
            onClick={scrollToCustomizer}
            style={{
              height: '52px',
              padding: '0 2.1rem',
              background: 'rgba(0, 0, 0, 0.45)',
              backdropFilter: 'blur(10px)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              borderRadius: '4px',
              fontFamily: 'var(--font-primary)',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.borderColor = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.45)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
            }}
          >
            <Sparkles size={14} />
            <span>Customize Jersey</span>
          </button>
        </div>

        {/* Live Jersey Showcase Indicator */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.74rem',
            color: '#94a3b8',
            letterSpacing: '0.06em',
            background: 'rgba(0, 0, 0, 0.4)',
            padding: '0.35rem 0.9rem',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <span style={{ color: '#ef4444', fontWeight: 700 }}>ON CAMPAIGN:</span>
          <span style={{ color: '#f1f5f9', fontWeight: 600 }}>{currentSlide.kitName}</span>
          <span style={{ color: '#475569' }}>—</span>
          <span>{currentSlide.playerTag}</span>
        </div>
      </div>

      {/* Side Arrow Navigation Buttons */}
      <button
        id="hero-prev-slide-btn"
        onClick={handlePrevSlide}
        style={{
          position: 'absolute',
          left: '24px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          background: 'rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 15,
          transition: 'all 0.2s ease',
        }}
        aria-label="Previous Campaign Visual"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        id="hero-next-slide-btn"
        onClick={handleNextSlide}
        style={{
          position: 'absolute',
          right: '24px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          background: 'rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 15,
          transition: 'all 0.2s ease',
        }}
        aria-label="Next Campaign Visual"
      >
        <ChevronRight size={20} />
      </button>

      {/* Bottom Minimalist Campaign Switcher Tabs (Ralph Lauren look) */}
      <div
        style={{
          position: 'absolute',
          bottom: '22px',
          left: 0,
          right: 0,
          zIndex: 15,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        {CAMPAIGN_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIdx;
          return (
            <button
              key={slide.id}
              onClick={() => setCurrentIdx(idx)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.3rem 0.5rem',
              }}
            >
              <div
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.15em',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.45)',
                  transition: 'color 0.3s ease',
                }}
              >
                0{idx + 1}. {idx === 0 ? 'NEPAL RHINOS' : idx === 1 ? 'CHAMPIONS ISSUE' : 'OBSIDIAN SERIES'}
              </div>
              <div
                style={{
                  width: isActive ? '52px' : '22px',
                  height: '2px',
                  background: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.25)',
                  transition: 'all 0.4s ease',
                }}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
};

