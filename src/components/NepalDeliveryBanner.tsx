'use client';

import React from 'react';
import { Truck, ShieldCheck, MapPin } from 'lucide-react';

export const NepalDeliveryBanner: React.FC = () => {
  return (
    <div
      id="nepal-delivery-banner"
      style={{
        background: '#000000',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        fontSize: '0.74rem',
        padding: '0.5rem 1rem',
        color: '#a1a1aa',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        fontWeight: 600,
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
          <span style={{ color: '#ffffff', fontWeight: 700 }}>ELITE SPORTS HUB</span>
          <span style={{ color: '#3f3f46' }}>/</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            <MapPin size={12} color="#ffffff" /> KATHMANDU, NEPAL
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span>SAME-DAY DISPATCH IN KATHMANDU VALLEY</span>
          <span style={{ color: '#3f3f46' }}>•</span>
          <span>ALL 77 DISTRICTS VIA COURIER</span>
          <span style={{ color: '#3f3f46' }}>•</span>
          <span style={{ color: '#ffffff' }}>CASH ON DELIVERY / ESEWA / KHALTI</span>
        </div>
      </div>
    </div>
  );
};
