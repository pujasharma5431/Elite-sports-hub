'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowDown, Sparkles } from 'lucide-react';

interface LuxuryCampaignSlide {
  id: string;
  editionTag: string;
  kitName: string;
  image: string;
}

const CAMPAIGN_SLIDES: LuxuryCampaignSlide[] = [
  {
    id: 'campaign-jersey-focus',
    editionTag: 'PRO-GRADE ATHLETIC ISSUE',
    kitName: 'Official Match Kit • White & Gold Edition',
    image: '/campaigns/hero-standing-clean.jpg',
  },
  {
    id: 'campaign-football-action',
    editionTag: 'MATCHDAY IN MOTION',
    kitName: 'Pro Stadium Issue • Match Tested',
    image: '/campaigns/hero-football-action.jpg',
  },
  {
    id: 'campaign-cricket-action',
    editionTag: 'STADIUM TOURNAMENT PLAY',
    kitName: 'National Cricket Arena Issue',
    image: '/campaigns/hero-cricket-action.jpg',
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
        minHeight: 'clamp(640px, 86vh, 900px)',
        overflow: 'hidden',
        background: '#040507',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.25rem 4.5rem 1.25rem',
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
              transition: 'opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
              pointerEvents: isActive ? 'auto' : 'none',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                transform: isActive ? 'scale(1.08)' : 'scale(1.0)',
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
                  objectPosition: idx === 0 ? 'center 30%' : idx === 1 ? 'center 35%' : 'center 40%',
                }}
              />
            </div>

            {/* Bright, Clean Atmospheric Overlays (Clean light with subtle contrast) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(8, 9, 13, 0.52) 0%, rgba(8, 9, 13, 0.18) 32%, rgba(8, 9, 13, 0.55) 72%, rgba(8, 9, 13, 0.94) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at center, transparent 40%, rgba(8, 9, 13, 0.55) 100%)',
              }}
            />
          </div>
        );
      })}

      {/* Center Clean, Ultra-Premium Editorial Overlay */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '920px',
          padding: '0 1rem',
          opacity: isTransitioning ? 0.35 : 1,
          transform: isTransitioning ? 'translateY(6px)' : 'translateY(0)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Minimalist Eyebrow Kicker */}
        <div
          id="hero-eyebrow-tag"
          style={{
            fontSize: '0.76rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#f8fafc',
            fontWeight: 700,
            marginBottom: '1rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            padding: '0.42rem 1.15rem',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#ef4444',
              boxShadow: '0 0 8px #ef4444',
            }}
          />
          <span>Premium Jersey Store — Nepal</span>
        </div>

        {/* Majestic 2-Line Headline: Wear the \n Victory. */}
        <h1
          id="hero-main-heading"
          style={{
            fontFamily: 'var(--font-luxury), Georgia, serif',
            fontSize: 'clamp(3.4rem, 8.2vw, 6.8rem)',
            lineHeight: 0.94,
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
              background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 45%, #cbd5e1 80%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.14em',
            }}
          >
            Victory.
          </span>
        </h1>

        {/* Clean, Refined Professional Tagline */}
        <p
          id="hero-tagline-text"
          style={{
            fontSize: 'clamp(0.95rem, 1.35vw, 1.14rem)',
            color: '#e2e8f0',
            lineHeight: 1.65,
            maxWidth: '680px',
            marginBottom: '2.1rem',
            textShadow: '0 2px 14px rgba(0, 0, 0, 0.95)',
            fontWeight: 400,
          }}
        >
          Top-grade football & cricket jerseys delivered across Nepal. Authentic designs, fan-perfect fit, prices that won’t break your budget.
        </p>

        {/* Understated Luxury Actions (Clean, Premium, Zero Retail Clutter) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <button
            id="hero-explore-collection-btn"
            onClick={scrollToCatalog}
            style={{
              height: '52px',
              padding: '0 2.5rem',
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
              padding: '0 2.2rem',
              background: 'rgba(0, 0, 0, 0.45)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
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
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)';
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
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
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
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
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

      {/* Bottom Minimalist Slide Indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          left: 0,
          right: 0,
          zIndex: 15,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.65rem',
        }}
      >
        {CAMPAIGN_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIdx;
          return (
            <button
              key={slide.id}
              onClick={() => setCurrentIdx(idx)}
              style={{
                width: isActive ? '36px' : '14px',
                height: '3px',
                borderRadius: '9999px',
                background: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.3)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s ease',
              }}
              aria-label={`Slide ${idx + 1}`}
            />
          );
        })}
      </div>
    </section>
  );
};


