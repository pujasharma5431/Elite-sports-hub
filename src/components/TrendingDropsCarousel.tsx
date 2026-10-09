'use client';

import React from 'react';
import Image from 'next/image';
import { useStore } from '../context/StoreContext';
import { ArrowUpRight } from 'lucide-react';

export const TrendingDropsCarousel: React.FC = () => {
  const { jerseys, setQuickViewJersey } = useStore();

  const trending = jerseys.filter(
    (j) => j.isLimitedEdition || j.nepalSpecial || j.player.includes('Messi') || j.player.includes('Kohli')
  ).slice(0, 4);

  return (
    <section
      id="trending-drops-reel"
      style={{
        padding: '3.5rem 0',
        background: '#050505',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div className="container">
        {/* Editorial Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '2rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '1rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.15em',
                color: '#a1a1aa',
                textTransform: 'uppercase',
              }}
            >
              CURATED RELEASES // KATHMANDU VAULT
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
                lineHeight: 1,
                fontWeight: 800,
                color: '#ffffff',
                textTransform: 'uppercase',
                marginTop: '0.35rem',
              }}
            >
              SELECTED MATCH ISSUES
            </h3>
          </div>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#71717a', letterSpacing: '0.08em' }}>
            LIMITED PRODUCTION // NUMBERED SPECIFICATIONS
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
                background: '#090909',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '1.5rem',
                transition: 'all 0.3s ease',
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
                    'linear-gradient(to top, rgba(0, 0, 0, 0.96) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.2) 100%)',
                }}
              />

              {/* Top Tags */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  display: 'flex',
                  gap: '0.4rem',
                  zIndex: 2,
                }}
              >
                {item.isLimitedEdition && (
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      letterSpacing: '0.1em',
                      padding: '0.2rem 0.5rem',
                      background: '#ffffff',
                      color: '#000000',
                      fontWeight: 700,
                    }}
                  >
                    LIMITED 1/500
                  </span>
                )}
                {item.nepalSpecial && (
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      letterSpacing: '0.1em',
                      padding: '0.2rem 0.5rem',
                      background: 'rgba(0, 0, 0, 0.75)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: '#ffffff',
                      fontWeight: 700,
                    }}
                  >
                    NEPAL SQUAD
                  </span>
                )}
              </div>

              {/* Stencil Number in top right */}
              {item.playerNumber && (
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    color: 'rgba(255, 255, 255, 0.5)',
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
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-mono)',
                    color: '#a1a1aa',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.sport} // {item.team}
                </div>

                <h4
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: 1.25,
                    marginTop: '0.25rem',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.player}
                </h4>

                <div style={{ fontSize: '0.74rem', color: '#71717a', marginTop: '0.2rem' }}>
                  {item.edition}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '0.85rem',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>
                    NPR {item.price.toLocaleString()}
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      letterSpacing: '0.08em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                    }}
                  >
                    <span>VIEW ISSUE</span>
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
