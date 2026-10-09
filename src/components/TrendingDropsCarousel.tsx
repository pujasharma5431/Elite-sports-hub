'use client';

import React from 'react';
import Image from 'next/image';
import { useStore } from '../context/StoreContext';
import { ArrowUpRight, Flame } from 'lucide-react';

export const TrendingDropsCarousel: React.FC = () => {
  const { jerseys, setQuickViewJersey } = useStore();

  // Admin-curated Headline Match Drops (only visible products)
  const visibleJerseys = jerseys.filter((j) => j.isVisible !== false);
  const headlineItems = visibleJerseys.filter((j) => j.isHeadlineDrop === true);
  const trending = headlineItems.length > 0
    ? headlineItems
    : visibleJerseys.filter((j) => j.isLimitedEdition || j.nepalSpecial || j.player.includes('Messi')).slice(0, 4);

  if (trending.length === 0) return null;

  return (
    <section
      id="trending-drops-reel"
      style={{
        padding: '3.5rem 0',
        background: '#07080b',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '2rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '1rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.75rem',
                color: '#f87171',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '0.25rem',
              }}
            >
              <Flame size={13} />
              <span>Curated Releases • Kathmandu Vault</span>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                lineHeight: 1.15,
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.02em',
              }}
            >
              Headline Match Drops
            </h3>
          </div>

          <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Limited production & official squad kits ready for dispatch.
          </div>
        </div>

        {/* 4-Item Grid Showcase */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {trending.map((item) => (
            <div
              key={item.id}
              onClick={() => setQuickViewJersey(item)}
              style={{
                position: 'relative',
                height: '420px',
                background: '#0e1118',
                borderRadius: '14px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '1.5rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
              }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                style={{ objectFit: 'cover' }}
              />

              {/* Shading */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(7, 8, 11, 0.96) 0%, rgba(7, 8, 11, 0.25) 50%, rgba(7, 8, 11, 0.15) 100%)',
                }}
              />

              {/* Top Tags */}
              <div
                style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  display: 'flex',
                  gap: '0.4rem',
                  zIndex: 2,
                }}
              >
                {item.isLimitedEdition && (
                  <span
                    style={{
                      fontSize: '0.68rem',
                      padding: '0.2rem 0.55rem',
                      background: 'rgba(245, 158, 11, 0.2)',
                      color: '#fbbf24',
                      border: '1px solid rgba(245, 158, 11, 0.4)',
                      borderRadius: '6px',
                      fontWeight: 700,
                      backdropFilter: 'blur(6px)',
                    }}
                  >
                    ★ Limited 1/500
                  </span>
                )}
                {item.nepalSpecial && (
                  <span
                    style={{
                      fontSize: '0.68rem',
                      padding: '0.2rem 0.55rem',
                      background: 'rgba(239, 68, 68, 0.2)',
                      border: '1px solid rgba(239, 68, 68, 0.4)',
                      color: '#f87171',
                      borderRadius: '6px',
                      fontWeight: 700,
                      backdropFilter: 'blur(6px)',
                    }}
                  >
                    🇳🇵 Nepal Squad
                  </span>
                )}
              </div>

              {/* Squad Number in top right */}
              {item.playerNumber && (
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    right: '14px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    color: 'rgba(255, 255, 255, 0.45)',
                    zIndex: 2,
                  }}
                >
                  #{item.playerNumber}
                </div>
              )}

              {/* Card Footer Content */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div
                  style={{
                    fontSize: '0.72rem',
                    color: '#94a3b8',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  {item.sport} • {item.team}
                </div>

                <h4
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: 1.3,
                    marginTop: '0.2rem',
                  }}
                >
                  {item.player} {item.playerNumber ? `#${item.playerNumber}` : ''}
                </h4>

                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.15rem' }}>
                  {item.edition}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '0.75rem',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
                    रू {item.price.toLocaleString()}
                  </div>

                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      background: 'rgba(255, 255, 255, 0.08)',
                      padding: '0.35rem 0.65rem',
                      borderRadius: '6px',
                    }}
                  >
                    <span>View Kit</span>
                    <ArrowUpRight size={13} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
