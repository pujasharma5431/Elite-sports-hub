'use client';

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ModernNikeHero } from '../components/ModernNikeHero';
import { TrendingDropsCarousel } from '../components/TrendingDropsCarousel';
import { JerseyCustomizerSection } from '../components/JerseyCustomizerSection';
import { NikeFilterBar } from '../components/NikeFilterBar';
import { JerseyCard } from '../components/JerseyCard';
import { JerseyQuickView } from '../components/JerseyQuickView';
import { CartDrawer } from '../components/CartDrawer';
import { CheckoutModal } from '../components/CheckoutModal';
import { InventoryManagerModal } from '../components/InventoryManagerModal';
import { SanityConnectModal } from '../components/SanityConnectModal';
import {
  Sparkles,
  Truck,
  RotateCcw,
  Shield,
  SlidersHorizontal,
  CheckCircle,
} from 'lucide-react';

export default function ShopPage() {
  const {
    filteredJerseys,
    resetFilters,
    isLoading,
  } = useStore();

  const [gridCols, setGridCols] = useState<3 | 4>(4);

  return (
    <main style={{ minHeight: '100vh', background: '#06080d', color: '#f8fafc' }}>
      {/* 1. Cinematic Nike/Adidas Flagship Hero */}
      <ModernNikeHero />

      {/* 2. Trending Drops & Hype Releases Carousel */}
      <TrendingDropsCarousel />

      {/* 3. Interactive Kit Customizer ("Elite By You") */}
      <JerseyCustomizerSection />

      {/* 4. Sticky Nike-Style Modern Filter Bar */}
      <div id="catalog-section">
        <NikeFilterBar gridCols={gridCols} setGridCols={setGridCols} />
      </div>

      {/* 5. Main Catalog Grid */}
      <section style={{ padding: '2.5rem 0 5rem 0' }}>
        <div className="container">
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: '#94a3b8' }}>
              <div className="pulse-animation" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                ⚡
              </div>
              <p style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.1em', fontSize: '1.2rem' }}>
                LOADING RELEASES FROM SANITY CMS...
              </p>
            </div>
          ) : filteredJerseys.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px dashed rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(230, 57, 70, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#e63946',
                }}
              >
                <SlidersHorizontal size={30} />
              </div>
              <h3 style={{ fontSize: '1.35rem', color: '#ffffff', fontFamily: 'var(--font-display)' }}>
                NO RELEASES FOUND FOR THIS SELECTION
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', maxWidth: '420px' }}>
                Adjust your size, player, or team filter to discover other official jerseys available in our Kathmandu hub.
              </p>
              <button onClick={resetFilters} className="btn btn-primary" style={{ padding: '0.65rem 1.4rem' }}>
                <RotateCcw size={15} />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            <div
              id="nike-catalog-grid"
              style={{
                display: 'grid',
                gridTemplateColumns:
                  gridCols === 4
                    ? 'repeat(auto-fill, minmax(260px, 1fr))'
                    : 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {filteredJerseys.map((jersey) => (
                <JerseyCard key={jersey.id} jersey={jersey} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6. Brand Specifications & Nepal Dispatch Strip */}
      <section
        style={{
          padding: '3.5rem 0',
          background: '#040404',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '2rem',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.1em', color: '#71717a' }}>
                // LOGISTICS 01
              </div>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                NEPAL EXPRESS DISPATCH
              </h4>
              <p style={{ fontSize: '0.78rem', color: '#a1a1aa', lineHeight: 1.5 }}>
                Same-day dispatch in Kathmandu Valley (free over NPR 3,500). 2-3 business days delivery across all 77 districts of Nepal.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.1em', color: '#71717a' }}>
                // FABRICATION 02
              </div>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                PLAYER MATCH GRADE
              </h4>
              <p style={{ fontSize: '0.78rem', color: '#a1a1aa', lineHeight: 1.5 }}>
                Sublimated moisture-control poly knit, silicone crests, and tournament specification heat-pressed lettering.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.1em', color: '#71717a' }}>
                // WORKSHOP 03
              </div>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                CUSTOM NAME & NUMBER
              </h4>
              <p style={{ fontSize: '0.78rem', color: '#a1a1aa', lineHeight: 1.5 }}>
                Applied in Kathmandu using authentic tournament fonts and temperature-controlled heat application.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.1em', color: '#71717a' }}>
                // ASSURANCE 04
              </div>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                SEAMLESS SIZE EXCHANGE
              </h4>
              <p style={{ fontSize: '0.78rem', color: '#a1a1aa', lineHeight: 1.5 }}>
                Hassle-free 7-day size replacement guarantee. Cash on Delivery, eSewa, and Khalti accepted across Nepal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Minimalist Black & White Footer */}
      <footer style={{ padding: '3.5rem 0', background: '#000000', textAlign: 'center', color: '#71717a', fontSize: '0.8rem' }}>
        <div className="container">
          <div
            style={{
              fontFamily: 'var(--font-primary)',
              fontSize: '1.2rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              color: '#ffffff',
              marginBottom: '0.5rem',
            }}
          >
            ELITE SPORTS HUB // KATHMANDU
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
            © 2026 ELITE SPORTS HUB NEPAL. ARCHIVE EDITION.
          </p>
          <p style={{ marginTop: '0.35rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#52525b' }}>
            CONNECTED TO SANITY CMS // PROJECT ID: cfa5sriy
          </p>
        </div>
      </footer>

      {/* 8. Global Interactive Modals */}
      <JerseyQuickView />
      <CartDrawer />
      <CheckoutModal />
      <InventoryManagerModal />
      <SanityConnectModal />
    </main>
  );
}
