'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowDown, Sparkles } from 'lucide-react';

interface LuxuryCampaignSlide {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  tagline: string;
  image: string;
  targetCategory?: 'nepal' | 'football' | 'limited';
}

const CAMPAIGN_SLIDES: LuxuryCampaignSlide[] = [
  {
    id: 'campaign-nepal-rhinos',
    tag: 'OFFICIAL MATCH ISSUE // 2026',
    title: 'THE RHINOS COLLECTION',
    subtitle: 'NEPAL NATIONAL CRICKET & FOOTBALL HERITAGE',
    tagline: 'Engineered for the international arena. Worn with national pride across the Himalayas.',
    image: '/campaigns/hero-nepal.jpg',
    targetCategory: 'nepal',
  },
  {
    id: 'campaign-world-champions',
    tag: 'WORLD FOOTBALL ARCHIVE',
    title: 'THE CHAMPIONS ISSUE',
    subtitle: 'WHITE & GOLD CORONATION KITS',
    tagline: 'Precision tailoring, aerodynamic moisture-control mesh, and iconic tournament crests.',
    image: '/campaigns/hero-champions.jpg',
    targetCategory: 'football',
  },
  {
    id: 'campaign-obsidian-collector',
    tag: 'LIMITED TO 500 PIECES WORLDWIDE',
    title: 'THE OBSIDIAN SERIES',
    subtitle: 'NUMBERED COLLECTOR EDITIONS',
    tagline: 'Stealth black jacquard knit accented with metallic 24K gold embroidery and authenticity seals.',
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
    }, 7500);
    return () => clearInterval(timer);
  }, [currentIdx]);

  const handleNextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % CAMPAIGN_SLIDES.length);
      setIsTransitioning(false);
    }, 400);
  };

  const handlePrevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev === 0 ? CAMPAIGN_SLIDES.length - 1 : prev - 1));
      setIsTransitioning(false);
    }, 400);
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
        height: 'clamp(620px, 84vh, 900px)',
        overflow: 'hidden',
        background: '#040507',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
                transform: isActive ? 'scale(1.05)' : 'scale(1.0)',
                transition: 'transform 8s ease-out',
              }}
            >
              <Image
                src={slide.image}
                alt={slide.title}
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
                  'linear-gradient(180deg, rgba(6, 7, 10, 0.5) 0%, rgba(6, 7, 10, 0.2) 35%, rgba(6, 7, 10, 0.75) 75%, rgba(6, 7, 10, 0.96) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at center, transparent 30%, rgba(6, 7, 10, 0.6) 100%)',
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
          maxWidth: '920px',
          padding: '0 1.5rem',
          opacity: isTransitioning ? 0.3 : 1,
          transform: isTransitioning ? 'translateY(8px)' : 'translateY(0)',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Subtle Category Eyebrow */}
        <div
          style={{
            fontSize: '0.78rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#cbd5e1',
            fontWeight: 600,
            marginBottom: '1rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(10px)',
            padding: '0.4rem 1rem',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444' }} />
          <span>{currentSlide.tag}</span>
        </div>

        {/* Majestic Classical Luxury Title (Ralph Lauren styling) */}
        <h1
          style={{
            fontFamily: 'var(--font-luxury), Georgia, serif',
            fontSize: 'clamp(2.6rem, 5.8vw, 5.2rem)',
            lineHeight: 1.05,
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: '#ffffff',
            textTransform: 'uppercase',
            marginBottom: '0.85rem',
            textShadow: '0 4px 30px rgba(0, 0, 0, 0.9)',
          }}
        >
          {currentSlide.title}
        </h1>

        {/* Subtitle */}
        <div
          style={{
            fontFamily: 'var(--font-primary), sans-serif',
            fontSize: 'clamp(0.85rem, 1.4vw, 1.15rem)',
            letterSpacing: '0.25em',
            color: '#e2e8f0',
            fontWeight: 600,
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
            textShadow: '0 2px 15px rgba(0, 0, 0, 0.8)',
          }}
        >
          {currentSlide.subtitle}
        </div>

        {/* Atmospheric Tagline */}
        <p
          style={{
            fontSize: '0.95rem',
            color: '#cbd5e1',
            lineHeight: 1.6,
            maxWidth: '640px',
            marginBottom: '2.2rem',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)',
            fontWeight: 400,
          }}
        >
          {currentSlide.tagline}
        </p>

        {/* Understated Luxury Actions (NO prices or size clutter) */}
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
              height: '50px',
              padding: '0 2.2rem',
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
              gap: '0.5rem',
              transition: 'all 0.25s ease',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
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
              height: '50px',
              padding: '0 2rem',
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
              gap: '0.5rem',
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
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 15,
          transition: 'all 0.2s ease',
        }}
        aria-label="Previous Slide"
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
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 15,
          transition: 'all 0.2s ease',
        }}
        aria-label="Next Slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Bottom Minimalist Campaign Switcher Tabs (Ralph Lauren look) */}
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
                  color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.4)',
                  transition: 'color 0.3s ease',
                }}
              >
                0{idx + 1}. {slide.title.replace('THE ', '')}
              </div>
              <div
                style={{
                  width: isActive ? '48px' : '20px',
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
