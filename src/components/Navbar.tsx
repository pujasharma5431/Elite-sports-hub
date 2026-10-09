'use client';

import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Heart, Sliders, Database, Search } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    filters,
    setFilters,
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsAdminOpen,
    setIsSanityModalOpen,
    sanityConfig,
  } = useStore();

  const handleCategoryClick = (category: 'all' | 'cricket' | 'football' | 'limited-edition', nepalOnly = false) => {
    setFilters((prev) => ({
      ...prev,
      category,
      nepalOnly,
    }));
  };

  return (
    <header
      id="main-navbar"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(0, 0, 0, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '1rem',
          paddingBottom: '1rem',
          gap: '1.5rem',
        }}
      >
        {/* Brand / Minimalist Wordmark */}
        <div
          id="brand-logo"
          onClick={() => handleCategoryClick('all')}
          style={{
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 800,
              fontSize: '1.25rem',
              letterSpacing: '0.08em',
              lineHeight: 1,
              color: '#ffffff',
              textTransform: 'uppercase',
            }}
          >
            ELITE SPORTS HUB
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              letterSpacing: '0.2em',
              color: '#71717a',
              textTransform: 'uppercase',
              marginTop: '0.2rem',
              fontWeight: 600,
            }}
          >
            KATHMANDU // EDITION 2026
          </div>
        </div>

        {/* Minimal Search Bar */}
        <div
          style={{
            flex: '1',
            maxWidth: '360px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Search
            size={15}
            color="#71717a"
            style={{ position: 'absolute', left: '14px', pointerEvents: 'none' }}
          />
          <input
            id="global-search-input"
            type="text"
            className="form-input"
            placeholder="SEARCH PLAYER, TEAM, EDITION..."
            value={filters.search}
            onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
            style={{
              paddingLeft: '2.5rem',
              fontSize: '0.78rem',
              height: '38px',
              borderRadius: '4px',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.04em',
            }}
          />
          {filters.search && (
            <button
              onClick={() => setFilters((prev) => ({ ...prev, search: '' }))}
              style={{
                position: 'absolute',
                right: '12px',
                background: 'transparent',
                border: 'none',
                color: '#a1a1aa',
                cursor: 'pointer',
                fontSize: '0.8rem',
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Navigation Categories */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
          className="desktop-nav"
        >
          {[
            { id: 'all', label: 'ALL KITS', nepal: false },
            { id: 'all', label: 'NEPAL SQUAD', nepal: true },
            { id: 'cricket', label: 'CRICKET', nepal: false },
            { id: 'football', label: 'FOOTBALL', nepal: false },
            { id: 'limited-edition', label: 'LIMITED 1/500', nepal: false },
          ].map((cat, i) => {
            const isSel = cat.nepal
              ? filters.nepalOnly
              : filters.category === cat.id && !filters.nepalOnly;
            return (
              <button
                key={i}
                onClick={() => handleCategoryClick(cat.id as any, cat.nepal)}
                style={{
                  background: isSel ? '#ffffff' : 'transparent',
                  color: isSel ? '#000000' : '#a1a1aa',
                  border: isSel ? '1px solid #ffffff' : '1px solid transparent',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.06em',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </nav>

        {/* Right Tools & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Sanity CMS Pill */}
          <button
            id="sanity-connect-pill-btn"
            onClick={() => setIsSanityModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              borderRadius: '4px',
              padding: '0.45rem 0.75rem',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              cursor: 'pointer',
            }}
            title="Sanity CMS Connection Status"
          >
            <Database size={12} />
            <span>{sanityConfig.isConnected ? 'SANITY LINKED' : 'SANITY CMS'}</span>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: sanityConfig.isConnected ? '#ffffff' : '#71717a',
              }}
            />
          </button>

          {/* Store Inventory Management */}
          <button
            id="open-inventory-manager-btn"
            onClick={() => setIsAdminOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              borderRadius: '4px',
              padding: '0.45rem 0.75rem',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              cursor: 'pointer',
            }}
            title="Store Stock & Product Management"
          >
            <Sliders size={12} />
            <span>INVENTORY</span>
          </button>

          {/* Wishlist */}
          <div
            id="wishlist-counter-btn"
            style={{
              position: 'relative',
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              width: '38px',
              height: '38px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#ffffff',
            }}
            title="Wishlist"
          >
            <Heart size={16} fill={wishlist.length > 0 ? '#ffffff' : 'none'} />
            {wishlist.length > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: '#ffffff',
                  color: '#000000',
                  borderRadius: '50%',
                  fontSize: '0.62rem',
                  width: '15px',
                  height: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                }}
              >
                {wishlist.length}
              </span>
            )}
          </div>

          {/* Cart Trigger */}
          <button
            id="open-cart-drawer-btn"
            onClick={() => setIsCartOpen(true)}
            style={{
              height: '38px',
              padding: '0 1rem',
              borderRadius: '4px',
              background: '#ffffff',
              color: '#000000',
              border: '1px solid #ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            <ShoppingBag size={15} />
            <span>BAG</span>
            {cartCount > 0 && (
              <span
                id="cart-badge-count"
                style={{
                  background: '#000000',
                  color: '#ffffff',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.1rem 0.45rem',
                  fontSize: '0.68rem',
                  fontWeight: 900,
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
