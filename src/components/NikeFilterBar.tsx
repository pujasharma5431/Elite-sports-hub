'use client';

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { JerseySize } from '../types/jersey';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';

const SIZES: JerseySize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

export const NikeFilterBar: React.FC<{
  gridCols: 3 | 4;
  setGridCols: (cols: 3 | 4) => void;
}> = ({ gridCols, setGridCols }) => {
  const { filters, setFilters, resetFilters, filteredJerseys, availablePlayers } = useStore();
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const activeFiltersCount =
    (filters.category !== 'all' ? 1 : 0) +
    filters.team.length +
    filters.player.length +
    filters.sizes.length +
    filters.gender.length +
    filters.colors.length +
    (filters.isOnSaleOnly ? 1 : 0) +
    (filters.isLowStockOnly ? 1 : 0) +
    (filters.isLimitedEditionOnly ? 1 : 0) +
    (filters.nepalOnly ? 1 : 0);

  const handleSizeToggle = (size: JerseySize) => {
    setFilters((prev) => {
      const exists = prev.sizes.includes(size);
      return {
        ...prev,
        sizes: exists ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size],
      };
    });
  };

  const handlePlayerToggle = (player: string) => {
    setFilters((prev) => {
      const exists = prev.player.includes(player);
      return {
        ...prev,
        player: exists ? prev.player.filter((p) => p !== player) : [...prev.player, player],
      };
    });
  };

  return (
    <div
      id="nike-filter-bar-sticky"
      style={{
        position: 'sticky',
        top: '64px',
        zIndex: 35,
        background: '#000000',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '0.85rem 0',
      }}
    >
      <div className="container">
        {/* Horizontal Filter Pill Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          {/* Left: Quick Category Chips (Monochrome minimal pills) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              overflowX: 'auto',
              paddingBottom: '2px',
            }}
          >
            {/* All */}
            <button
              onClick={() => setFilters((p) => ({ ...p, category: 'all', nepalOnly: false }))}
              style={{
                padding: '0.45rem 0.9rem',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                border: filters.category === 'all' && !filters.nepalOnly ? '1px solid #ffffff' : '1px solid rgba(255,255,255,0.15)',
                background: filters.category === 'all' && !filters.nepalOnly ? '#ffffff' : 'transparent',
                color: filters.category === 'all' && !filters.nepalOnly ? '#000000' : '#a1a1aa',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'var(--transition)',
              }}
            >
              ALL [{filteredJerseys.length}]
            </button>

            {/* Nepal Squad */}
            <button
              onClick={() => setFilters((p) => ({ ...p, category: 'all', nepalOnly: !p.nepalOnly }))}
              style={{
                padding: '0.45rem 0.9rem',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                border: filters.nepalOnly ? '1px solid #ffffff' : '1px solid rgba(255,255,255,0.15)',
                background: filters.nepalOnly ? '#ffffff' : 'transparent',
                color: filters.nepalOnly ? '#000000' : '#a1a1aa',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'var(--transition)',
              }}
            >
              NEPAL SQUAD
            </button>

            {/* Cricket */}
            <button
              onClick={() => setFilters((p) => ({ ...p, category: p.category === 'cricket' ? 'all' : 'cricket', nepalOnly: false }))}
              style={{
                padding: '0.45rem 0.9rem',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                border: filters.category === 'cricket' ? '1px solid #ffffff' : '1px solid rgba(255,255,255,0.15)',
                background: filters.category === 'cricket' ? '#ffffff' : 'transparent',
                color: filters.category === 'cricket' ? '#000000' : '#a1a1aa',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'var(--transition)',
              }}
            >
              CRICKET
            </button>

            {/* Football */}
            <button
              onClick={() => setFilters((p) => ({ ...p, category: p.category === 'football' ? 'all' : 'football', nepalOnly: false }))}
              style={{
                padding: '0.45rem 0.9rem',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                border: filters.category === 'football' ? '1px solid #ffffff' : '1px solid rgba(255,255,255,0.15)',
                background: filters.category === 'football' ? '#ffffff' : 'transparent',
                color: filters.category === 'football' ? '#000000' : '#a1a1aa',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'var(--transition)',
              }}
            >
              FOOTBALL
            </button>

            {/* Limited */}
            <button
              onClick={() => setFilters((p) => ({ ...p, category: p.category === 'limited-edition' ? 'all' : 'limited-edition', nepalOnly: false }))}
              style={{
                padding: '0.45rem 0.9rem',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                border: filters.category === 'limited-edition' ? '1px solid #ffffff' : '1px solid rgba(255,255,255,0.15)',
                background: filters.category === 'limited-edition' ? '#ffffff' : 'transparent',
                color: filters.category === 'limited-edition' ? '#000000' : '#a1a1aa',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'var(--transition)',
              }}
            >
              LIMITED 1/500
            </button>

            {/* Sale */}
            <button
              onClick={() => setFilters((p) => ({ ...p, isOnSaleOnly: !p.isOnSaleOnly }))}
              style={{
                padding: '0.45rem 0.9rem',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                border: filters.isOnSaleOnly ? '1px solid #ffffff' : '1px solid rgba(255,255,255,0.15)',
                background: filters.isOnSaleOnly ? '#ffffff' : 'transparent',
                color: filters.isOnSaleOnly ? '#000000' : '#a1a1aa',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              SALE
            </button>
          </div>

          {/* Right: Refine & Layout Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {/* Filter Toggle Button */}
            <button
              id="open-refine-filter-btn"
              onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.45rem 0.95rem',
                border: isFilterDrawerOpen || activeFiltersCount > 0 ? '1px solid #ffffff' : '1px solid rgba(255,255,255,0.2)',
                background: isFilterDrawerOpen || activeFiltersCount > 0 ? '#ffffff' : 'transparent',
                color: isFilterDrawerOpen || activeFiltersCount > 0 ? '#000000' : '#ffffff',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'var(--transition)',
              }}
            >
              <SlidersHorizontal size={13} />
              <span>{isFilterDrawerOpen ? 'CLOSE REFINE' : 'REFINE SPECIFICATIONS'}</span>
              {activeFiltersCount > 0 && <span>({activeFiltersCount})</span>}
            </button>

            {/* Sort Selector */}
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters((p) => ({ ...p, sortBy: e.target.value as any }))}
              style={{
                background: '#000000',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '0.45rem 0.85rem',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                letterSpacing: '0.05em',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              <option value="featured">SORT: FEATURED</option>
              <option value="price-asc">PRICE: ASCENDING</option>
              <option value="price-desc">PRICE: DESCENDING</option>
              <option value="rating">HIGHEST RATED</option>
            </select>

            {/* Grid Switcher */}
            <div
              style={{
                display: 'flex',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
              className="desktop-nav"
            >
              <button
                onClick={() => setGridCols(3)}
                style={{
                  padding: '0.45rem 0.65rem',
                  border: 'none',
                  background: gridCols === 3 ? '#ffffff' : 'transparent',
                  color: gridCols === 3 ? '#000000' : '#71717a',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                3-COL
              </button>
              <button
                onClick={() => setGridCols(4)}
                style={{
                  padding: '0.45rem 0.65rem',
                  border: 'none',
                  background: gridCols === 4 ? '#ffffff' : 'transparent',
                  color: gridCols === 4 ? '#000000' : '#71717a',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                4-COL
              </button>
            </div>
          </div>
        </div>

        {/* Minimalist Refine Drawer */}
        {isFilterDrawerOpen && (
          <div
            style={{
              marginTop: '1rem',
              padding: '1.5rem',
              background: '#090909',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              animation: 'fadeIn 0.2s ease-out',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.1em' }}>
                // PARAMETERS [{filteredJerseys.length} MATCHING]
              </div>

              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#ffffff',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    textDecoration: 'underline',
                  }}
                >
                  <RotateCcw size={12} />
                  <span>RESET PARAMETERS</span>
                </button>
              )}
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {/* Sizes */}
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#71717a', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                  AVAILABLE SIZES
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {SIZES.map((sz) => {
                    const sel = filters.sizes.includes(sz);
                    return (
                      <button
                        key={sz}
                        onClick={() => handleSizeToggle(sz)}
                        style={{
                          width: '40px',
                          height: '34px',
                          border: sel ? '1px solid #ffffff' : '1px solid rgba(255,255,255,0.15)',
                          background: sel ? '#ffffff' : 'transparent',
                          color: sel ? '#000000' : '#ffffff',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                        }}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Featured Players */}
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#71717a', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                  ATHLETE ROSTER
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', maxHeight: '100px', overflowY: 'auto' }}>
                  {availablePlayers.map((pl) => {
                    const sel = filters.player.includes(pl);
                    return (
                      <button
                        key={pl}
                        onClick={() => handlePlayerToggle(pl)}
                        style={{
                          padding: '0.25rem 0.6rem',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          border: sel ? '1px solid #ffffff' : '1px solid rgba(255,255,255,0.15)',
                          background: sel ? '#ffffff' : 'transparent',
                          color: sel ? '#000000' : '#a1a1aa',
                          cursor: 'pointer',
                        }}
                      >
                        {pl}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#71717a', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                  MAX PRICE: NPR {filters.maxPrice.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="2000"
                  max="12000"
                  step="500"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters((p) => ({ ...p, maxPrice: Number(e.target.value) }))}
                  style={{ width: '100%', accentColor: '#ffffff', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
