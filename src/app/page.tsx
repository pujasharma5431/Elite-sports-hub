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
import { Footer } from '../components/Footer';
import { OrderTrackerModal } from '../components/OrderTrackerModal';
import {
  Sparkles,
  Truck,
  RotateCcw,
  ShieldCheck,
  SlidersHorizontal,
  Flame,
  CheckCircle2,
} from 'lucide-react';

export default function ShopPage() {
  const {
    filteredJerseys,
    resetFilters,
    isLoading,
  } = useStore();

  const [gridCols, setGridCols] = useState<3 | 4>(4);

  return (
    <main style={{ minHeight: '100vh', background: '#08090d', color: '#f1f5f9' }}>
      {/* 1. Cinematic Flagship Hero */}
      <ModernNikeHero />

      {/* 2. Trending Drops & Collector Editions Carousel */}
      <TrendingDropsCarousel />

      {/* 3. Interactive Kit Customizer Studio */}
      <JerseyCustomizerSection />

      {/* 4. Sticky Modern Filter Bar */}
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
              <p style={{ letterSpacing: '0.05em', fontSize: '1.1rem', fontWeight: 600 }}>
                Loading jerseys from Sanity Content Lake...
              </p>
            </div>
          ) : filteredJerseys.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px dashed rgba(255, 255, 255, 0.12)',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(239, 68, 68, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ef4444',
                }}
              >
                <SlidersHorizontal size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#ffffff' }}>
                No Kits Found for this Filter
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.88rem', maxWidth: '420px', lineHeight: 1.5 }}>
                Try adjusting your category, size, or athlete filter to explore other official match issues.
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

      {/* 6. Brand Perks & Global Dispatch Strip */}
      <section
        style={{
          padding: '3.5rem 0',
          background: '#0a0c12',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Truck size={18} color="#f87171" />
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                  Nepal, Dubai, India & Worldwide
                </h4>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                Same-day dispatch in Kathmandu Valley, courier across all 77 districts of Nepal, rapid express delivery to Dubai (UAE), India, and worldwide.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={18} color="#10b981" />
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                  Top-Grade Authentic Designs
                </h4>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                Fan-perfect fit engineered with breathable AeroVent™ poly-mesh, moisture-wicking technology, and authentic tournament club & national crests.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={18} color="#fbbf24" />
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                  Thermal-Press Custom Studio
                </h4>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                Personalize your kit with official tournament typography, player numbers, and custom names heat-pressed with laser precision.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <RotateCcw size={18} color="#60a5fa" />
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                  Prices That Won’t Break Your Budget
                </h4>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                Premium pro-grade match kits at fan-friendly prices. 7-day easy size exchange guarantee with Cash on Delivery, eSewa, Khalti, & Cards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Modern Brand Footer with Socials and Admin Link */}
      <Footer />

      {/* 8. Global Interactive Modals */}
      <JerseyQuickView />
      <CartDrawer />
      <CheckoutModal />
      <InventoryManagerModal />
      <SanityConnectModal />
      <OrderTrackerModal />
    </main>
  );
}
