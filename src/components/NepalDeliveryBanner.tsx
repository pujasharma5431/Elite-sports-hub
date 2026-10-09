'use client';

import React from 'react';

export const NepalDeliveryBanner: React.FC = () => {
  const marqueeItems = [
    { text: 'DELIVERY ALL OVER NEPAL (ALL 77 DISTRICTS)' },
    { text: '🇦🇪 DUBAI (UAE) EXPRESS AIR SHIPPING' },
    { text: '🇮🇳 INDIA COURIER DISPATCH' },
    { text: '🌐 WORLDWIDE / OVERALL INTERNATIONAL DELIVERY' },
    { text: '⚡ SAME-DAY DISPATCH IN KATHMANDU VALLEY' },
    { text: '★ AUTHENTIC MATCH-GRADE CRICKET & FOOTBALL KITS' },
    { text: 'CASH ON DELIVERY • eSEWA • KHALTI • CARDS' },
    { text: 'ELITE SPORTS HUB — PREMIUM JERSEY STORE NEPAL' },
  ];

  const renderTickerTrack = (keyPrefix: string) => (
    <div className="marquee-content" style={{ display: 'inline-flex', alignItems: 'center' }}>
      {marqueeItems.map((item, idx) => (
        <span
          key={`${keyPrefix}-${idx}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.65rem',
            padding: '0 1.25rem',
            fontSize: '0.73rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: '#ffffff',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ color: '#fef08a' }}>✦</span>
          <span>{item.text}</span>
        </span>
      ))}
    </div>
  );

  return (
    <aside
      id="red-animated-delivery-marquee"
      aria-label="Delivery Announcements"
      style={{
        background: 'linear-gradient(90deg, #b91c1c 0%, #dc2626 50%, #b91c1c 100%)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.25)',
        height: '35px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 55,
        boxShadow: '0 2px 12px rgba(220, 38, 38, 0.35)',
      }}
    >
      <div className="marquee-container" style={{ width: '100%' }}>
        {renderTickerTrack('track-1')}
        {renderTickerTrack('track-2')}
      </div>
    </aside>
  );
};


