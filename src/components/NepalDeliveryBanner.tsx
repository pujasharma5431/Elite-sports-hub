'use client';

import React from 'react';
import { MapPin, Zap, CheckCircle2 } from 'lucide-react';

export const NepalDeliveryBanner: React.FC = () => {
  return (
    <div
      id="nepal-delivery-banner"
      style={{
        background: '#06070a',
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
          <span style={{ color: '#ffffff', fontWeight: 700, letterSpacing: '0.02em' }}>
            ELITE SPORTS HUB
          </span>
          <span style={{ color: '#334155' }}>/</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#cbd5e1' }}>
            <MapPin size={12} color="#f87171" /> Kathmandu, Nepal
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.73rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <Zap size={12} color="#fbbf24" />
            <span>Same-Day Dispatch in Kathmandu Valley</span>
          </span>
          <span style={{ color: '#334155' }}>•</span>
          <span>Courier Delivery to all 77 Districts</span>
          <span style={{ color: '#334155' }}>•</span>
          <span style={{ color: '#f1f5f9', fontWeight: 600 }}>
            Cash on Delivery • eSewa • Khalti
          </span>
        </div>
      </div>
    </div>
  );
};
