'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Jersey, JerseySize } from '../types/jersey';
import { useStore } from '../context/StoreContext';
import { Heart, Eye, ArrowUpRight } from 'lucide-react';

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
        background: '#070707',
        border: isHovered
          ? '1px solid rgba(255, 255, 255, 0.4)'
          : '1px solid rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Photo Frame */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '120%', // Clean vertical proportion
          background: '#090909',
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

        {/* Minimal Monochrome Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.25) 100%)',
          }}
        />

        {/* Minimalist Top Tags */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            zIndex: 10,
          }}
        >
          {jersey.isLimitedEdition && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                background: '#ffffff',
                color: '#000000',
                padding: '0.2rem 0.5rem',
                fontWeight: 800,
              }}
            >
              LIMITED 1/500
            </span>
          )}

          {jersey.nepalSpecial && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                background: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#ffffff',
                padding: '0.2rem 0.5rem',
                fontWeight: 700,
              }}
            >
              NEPAL SQUAD
            </span>
          )}

          {jersey.isOnSale && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                padding: '0.2rem 0.5rem',
                fontWeight: 700,
              }}
            >
              SALE ISSUE
            </span>
          )}
        </div>

        {/* Stencil Number Top Right */}
        {jersey.playerNumber && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '48px',
              fontFamily: 'var(--font-mono)',
              fontSize: '1.2rem',
              fontWeight: 800,
              color: 'rgba(255, 255, 255, 0.5)',
              zIndex: 10,
            }}
          >
            #{jersey.playerNumber}
          </div>
        )}

        {/* Minimal Wishlist Button */}
        <button
          id={`wishlist-btn-${jersey.id}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(jersey.id);
          }}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '32px',
            height: '32px',
            background: 'rgba(0, 0, 0, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            cursor: 'pointer',
            zIndex: 10,
          }}
          title="Wishlist"
        >
          <Heart size={14} fill={isWishlisted ? '#ffffff' : 'none'} />
        </button>

        {/* Monochrome Quick Size Bar on Hover */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            right: '10px',
            background: '#000000',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            padding: '0.4rem',
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
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 800, color: '#71717a', paddingLeft: '0.3rem' }}>
            QUICK ADD:
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
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    border: isAdded ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.15)',
                    background: isAdded ? '#ffffff' : 'transparent',
                    color: isAdded ? '#000000' : '#ffffff',
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
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
          gap: '0.75rem',
        }}
      >
        <div>
          {/* Division & Team */}
          <div
            style={{
              fontSize: '0.68rem',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#71717a',
              marginBottom: '0.3rem',
            }}
          >
            {jersey.sport} // {jersey.team}
          </div>

          {/* Player Name */}
          <h3
            onClick={() => setQuickViewJersey(jersey)}
            style={{
              fontFamily: 'var(--font-primary)',
              fontSize: '1.05rem',
              fontWeight: 700,
              lineHeight: 1.25,
              color: '#ffffff',
              textTransform: 'uppercase',
              cursor: 'pointer',
              marginBottom: '0.2rem',
            }}
          >
            {jersey.player} {jersey.playerNumber ? `#${jersey.playerNumber}` : ''}
          </h3>

          <div style={{ fontSize: '0.72rem', color: '#a1a1aa' }}>
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
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                }}
              >
                NPR {jersey.price.toLocaleString()}
              </span>
              {jersey.originalPrice && (
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    color: '#71717a',
                    textDecoration: 'line-through',
                  }}
                >
                  NPR {jersey.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#71717a' }}>
              STOCK: {jersey.stock} UNITS
            </div>
          </div>

          <button
            onClick={() => setQuickViewJersey(jersey)}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              padding: '0.45rem 0.75rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              transition: 'var(--transition)',
            }}
          >
            <span>CUSTOMIZE</span>
            <ArrowUpRight size={13} />
          </button>
        </div>
      </div>
    </article>
  );
};
