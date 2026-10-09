'use client';

import React from 'react';
import { MapPin, Zap, Globe, Truck } from 'lucide-react';

export const NepalDeliveryBanner: React.FC = () => {
  return (
    <div
      id="nepal-delivery-banner"
      style={{
        background: '#040507',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        fontSize: '0.74rem',
        padding: '0.45rem 1rem',
        color: '#94a3b8',
        fontWeight: 500,
        position: 'relative',
        zIndex: 40,
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ color: '#ffffff', fontWeight: 800, letterSpacing: '0.04em' }}>
            ELITE SPORTS HUB
          </span>
          <span style={{ color: '#334155' }}>/</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#e2e8f0', fontWeight: 600 }}>
            <span>Premium Jersey Store — Nepal</span>
          </span>
        </div>

        {/* Global Delivery Destinations */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap', fontSize: '0.73rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#fbbf24', fontWeight: 700 }}>
            <Truck size={12} color="#fbbf24" />
            <span>Delivery:</span>
          </span>
          <span style={{ color: '#f1f5f9' }}>🇳🇵 All Over Nepal (77 Districts)</span>
          <span style={{ color: '#334155' }}>•</span>
          <span style={{ color: '#f1f5f9' }}>🇦🇪 Dubai (UAE)</span>
          <span style={{ color: '#334155' }}>•</span>
          <span style={{ color: '#f1f5f9' }}>🇮🇳 India</span>
          <span style={{ color: '#334155' }}>•</span>
          <span style={{ color: '#38bdf8', fontWeight: 700 }}>🌐 Worldwide Shipping</span>
          <span style={{ color: '#334155' }}>|</span>
          <span style={{ color: '#cbd5e1' }}>COD • eSewa • Khalti • Cards</span>
        </div>
      </div>
    </div>
  );
};

