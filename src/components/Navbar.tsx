'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Heart, Sliders, Database, Search, Truck, Lock } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    filters,
    setFilters,
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsTrackerOpen,
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
        background: 'rgba(8, 9, 13, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '0.85rem',
          paddingBottom: '0.85rem',
          gap: '1.25rem',
        }}
      >
        {/* Brand / Logo */}
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
              fontSize: '1.3rem',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              color: '#ffffff',
            }}
          >
            ELITE SPORTS HUB
          </div>
          <div
            style={{
              fontSize: '0.66rem',
              letterSpacing: '0.12em',
              color: '#64748b',
              marginTop: '0.2rem',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            Kathmandu • Edition 2026
          </div>
        </div>

        {/* Search Bar */}
        <div
          style={{
            flex: '1',
            maxWidth: '320px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Search
            size={15}
            color="#64748b"
            style={{ position: 'absolute', left: '12px', pointerEvents: 'none' }}
          />
          <input
            id="global-search-input"
            type="text"
            className="form-input"
            placeholder="Search player, team, edition..."
            value={filters.search}
            onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
            style={{
              paddingLeft: '2.3rem',
              fontSize: '0.82rem',
              height: '38px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          />
          {filters.search && (
            <button
              onClick={() => setFilters((prev) => ({ ...prev, search: '' }))}
              style={{
                position: 'absolute',
                right: '10px',
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                fontSize: '0.8rem',
              }}
            >
              ✕
            </button>
          )}

          {/* Secret Admin Portal Shortcut when typing 'admin' in Search */}
          {filters.search.toLowerCase().trim() === 'admin' && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: 0,
                right: 0,
                background: '#090a10',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                borderRadius: '8px',
                padding: '0.65rem 0.85rem',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.8)',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Lock size={14} color="#f87171" />
                <div>
                  <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                    Admin Control Terminal
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>
                    Authenticated management access
                  </div>
                </div>
              </div>
              <Link
                href="/admin"
                onClick={() => setFilters((prev) => ({ ...prev, search: '' }))}
                style={{
                  padding: '0.35rem 0.75rem',
                  background: '#dc2626',
                  color: '#ffffff',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.04em',
                }}
              >
                Enter /admin →
              </Link>
            </div>
          )}
        </div>

        {/* Navigation Categories */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
          }}
          className="desktop-nav"
        >
          {[
            { id: 'all', label: 'All Kits', nepal: false },
            { id: 'all', label: '🇳🇵 Nepal Squad', nepal: true },
            { id: 'cricket', label: 'Cricket', nepal: false },
            { id: 'football', label: 'Football', nepal: false },
            { id: 'limited-edition', label: '★ Limited 1/500', nepal: false },
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
                  color: isSel ? '#08090d' : '#94a3b8',
                  border: isSel ? '1px solid #ffffff' : '1px solid transparent',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '9999px',
                  fontSize: '0.82rem',
                  fontWeight: isSel ? 700 : 500,
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
          {/* Track Order Button */}
          <button
            id="navbar-track-order-btn"
            onClick={() => setIsTrackerOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
              borderRadius: '8px',
              padding: '0.45rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
            }}
            title="Track your shipment"
          >
            <Truck size={13} color="#10b981" />
            <span>Track Order</span>
          </button>

          {/* Wishlist */}
          <div
            id="wishlist-counter-btn"
            onClick={() => {
              const el = document.getElementById('catalog-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              position: 'relative',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#ffffff',
            }}
            title="Wishlist"
          >
            <Heart size={16} fill={wishlist.length > 0 ? '#ef4444' : 'none'} color={wishlist.length > 0 ? '#ef4444' : '#cbd5e1'} />
            {wishlist.length > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: '#ef4444',
                  color: '#ffffff',
                  borderRadius: '50%',
                  fontSize: '0.62rem',
                  width: '16px',
                  height: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
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
              borderRadius: '8px',
              background: '#ffffff',
              color: '#08090d',
              border: '1px solid #ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'var(--transition)',
            }}
          >
            <ShoppingBag size={15} />
            <span>Bag</span>
            {cartCount > 0 && (
              <span
                id="cart-badge-count"
                style={{
                  background: '#ef4444',
                  color: '#ffffff',
                  borderRadius: '9999px',
                  padding: '0.1rem 0.45rem',
                  fontSize: '0.68rem',
                  fontWeight: 800,
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
