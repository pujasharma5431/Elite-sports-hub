'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Jersey, JerseySize } from '../types/jersey';
import { useStore } from '../context/StoreContext';
import { Heart, ArrowUpRight, Sparkles } from 'lucide-react';

interface JerseyCardProps {
  jersey: Jersey;
}

export const JerseyCard: React.FC<JerseyCardProps> = ({ jersey }) => {
  const { wishlist, toggleWishlist, setQuickViewJersey, addToCart } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [justAddedSize, setJustAddedSize] = useState<string | null>(null);

  const isWishlisted = wishlist.includes(jersey.id);

  const handleDirectAddSize = (e: React.MouseEvent, size: JerseySize) => {
    e.stopPropagation();
    addToCart({
      jerseyId: jersey.id,
      jersey,
      selectedSize: size,
      selectedGender: jersey.gender[0] || 'unisex',
      selectedColor: jersey.colors[0] || { name: 'Standard', hex: '#ffffff' },
      quantity: 1,
      price: jersey.price,
    });
    setJustAddedSize(size);
    setTimeout(() => setJustAddedSize(null), 1400);
  };

  return (
    <article
      id={`jersey-card-${jersey.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: '#0d0f15',
        border: isHovered
          ? '1px solid rgba(255, 255, 255, 0.28)'
          : '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isHovered
          ? '0 16px 40px rgba(0, 0, 0, 0.7)'
          : '0 4px 20px rgba(0, 0, 0, 0.4)',
        transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Photo Frame */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '115%',
          background: '#0a0b10',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onClick={() => setQuickViewJersey(jersey)}
      >
        <Image
          src={jersey.image}
          alt={jersey.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          style={{
            objectFit: 'cover',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Subtle Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(13, 15, 21, 0.95) 0%, rgba(13, 15, 21, 0.05) 50%, rgba(13, 15, 21, 0.2) 100%)',
          }}
        />

        {/* Top Badges */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            zIndex: 10,
          }}
        >
          {jersey.isLimitedEdition && (
            <span
              style={{
                fontSize: '0.68rem',
                background: 'rgba(245, 158, 11, 0.18)',
                color: '#fbbf24',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                padding: '0.2rem 0.55rem',
                borderRadius: '6px',
                fontWeight: 700,
                letterSpacing: '0.02em',
                backdropFilter: 'blur(6px)',
              }}
            >
              ★ Limited 1/500
            </span>
          )}

          {jersey.nepalSpecial && (
            <span
              style={{
                fontSize: '0.68rem',
                background: 'rgba(239, 68, 68, 0.18)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#f87171',
                padding: '0.2rem 0.55rem',
                borderRadius: '6px',
                fontWeight: 700,
                letterSpacing: '0.02em',
                backdropFilter: 'blur(6px)',
              }}
            >
              🇳🇵 Nepal Squad
            </span>
          )}

          {jersey.isOnSale && (
            <span
              style={{
                fontSize: '0.68rem',
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                padding: '0.2rem 0.55rem',
                borderRadius: '6px',
                fontWeight: 700,
                backdropFilter: 'blur(6px)',
              }}
            >
              On Sale
            </span>
          )}
        </div>

        {/* Player Squad Number Stencil */}
        {jersey.playerNumber && (
          <div
            style={{
              position: 'absolute',
              top: '10px',
              right: '46px',
              fontSize: '1.1rem',
              fontWeight: 800,
              color: 'rgba(255, 255, 255, 0.45)',
              fontFamily: 'var(--font-mono)',
              zIndex: 10,
            }}
          >
            #{jersey.playerNumber}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          id={`wishlist-btn-${jersey.id}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(jersey.id);
          }}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(13, 15, 21, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all 0.2s ease',
          }}
          title="Wishlist"
        >
          <Heart size={14} fill={isWishlisted ? '#ef4444' : 'none'} color={isWishlisted ? '#ef4444' : '#ffffff'} />
        </button>

        {/* Quick Size Strip on Hover */}
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            left: '8px',
            right: '8px',
            background: 'rgba(13, 15, 21, 0.94)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '8px',
            padding: '0.4rem 0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(6px)',
            transition: 'all 0.2s ease-out',
            zIndex: 15,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#94a3b8' }}>
            Quick Add:
          </span>

          <div style={{ display: 'flex', gap: '0.25rem' }}>
            {jersey.sizes.slice(0, 5).map((sz) => {
              const isAdded = justAddedSize === sz;
              return (
                <button
                  key={sz}
                  onClick={(e) => handleDirectAddSize(e, sz)}
                  style={{
                    padding: '0.2rem 0.45rem',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    borderRadius: '4px',
                    border: isAdded ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.15)',
                    background: isAdded ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                    color: isAdded ? '#08090d' : '#f1f5f9',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                  }}
                >
                  {isAdded ? '✓' : sz}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div
        style={{
          padding: '1.15rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
          gap: '0.75rem',
        }}
      >
        <div>
          {/* Sport & Team */}
          <div
            style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: '#64748b',
              marginBottom: '0.25rem',
            }}
          >
            {jersey.sport} • {jersey.team}
          </div>

          {/* Player & Title */}
          <h3
            onClick={() => setQuickViewJersey(jersey)}
            style={{
              fontFamily: 'var(--font-primary)',
              fontSize: '1.05rem',
              fontWeight: 700,
              lineHeight: 1.3,
              color: '#ffffff',
              cursor: 'pointer',
              marginBottom: '0.2rem',
            }}
          >
            {jersey.player} {jersey.playerNumber ? `#${jersey.playerNumber}` : ''}
          </h3>

          <div style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.4 }}>
            {jersey.edition}
          </div>
        </div>

        {/* Bottom Price & Customize Trigger */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.45rem' }}>
              <span
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: '#ffffff',
                }}
              >
                रू {jersey.price.toLocaleString()}
              </span>
              {jersey.originalPrice && (
                <span
                  style={{
                    fontSize: '0.8rem',
                    color: '#64748b',
                    textDecoration: 'line-through',
                  }}
                >
                  रू {jersey.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.15rem' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: jersey.stock <= 5 ? '#f87171' : '#10b981' }} />
              <span style={{ fontSize: '0.68rem', color: jersey.stock <= 5 ? '#f87171' : '#94a3b8' }}>
                {jersey.stock <= 5 ? `Low Stock (${jersey.stock} left)` : `${jersey.stock} units ready`}
              </span>
            </div>
          </div>

          <button
            onClick={() => setQuickViewJersey(jersey)}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '6px',
              padding: '0.45rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              transition: 'var(--transition)',
            }}
          >
            <span>Customize</span>
            <ArrowUpRight size={13} />
          </button>
        </div>
      </div>
    </article>
  );
};
