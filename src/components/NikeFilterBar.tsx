'use client';

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { JerseySize } from '../types/jersey';
import { SlidersHorizontal, RotateCcw, LayoutGrid, Grid3X3 } from 'lucide-react';

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
        background: 'rgba(8, 9, 13, 0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
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
          {/* Left: Quick Category Chips */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              overflowX: 'auto',
              paddingBottom: '2px',
            }}
          >
            {/* All */}
            <button
              onClick={() => setFilters((p) => ({ ...p, category: 'all', nepalOnly: false }))}
              style={{
                padding: '0.45rem 0.95rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                borderRadius: '9999px',
                border: filters.category === 'all' && !filters.nepalOnly ? '1px solid #ffffff' : '1px solid rgba(255,255,255,0.12)',
                background: filters.category === 'all' && !filters.nepalOnly ? '#ffffff' : 'transparent',
                color: filters.category === 'all' && !filters.nepalOnly ? '#08090d' : '#94a3b8',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'var(--transition)',
              }}
            >
              All Kits ({filteredJerseys.length})
            </button>

            {/* Nepal Squad */}
            <button
              onClick={() => setFilters((p) => ({ ...p, category: 'all', nepalOnly: !p.nepalOnly }))}
              style={{
                padding: '0.45rem 0.95rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                borderRadius: '9999px',
                border: filters.nepalOnly ? '1px solid #f87171' : '1px solid rgba(255,255,255,0.12)',
                background: filters.nepalOnly ? 'rgba(239, 68, 68, 0.18)' : 'transparent',
                color: filters.nepalOnly ? '#f87171' : '#94a3b8',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'var(--transition)',
              }}
            >
              🇳🇵 Nepal Squad
            </button>

            {/* Cricket */}
            <button
              onClick={() => setFilters((p) => ({ ...p, category: p.category === 'cricket' ? 'all' : 'cricket', nepalOnly: false }))}
              style={{
                padding: '0.45rem 0.95rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                borderRadius: '9999px',
                border: filters.category === 'cricket' ? '1px solid #ffffff' : '1px solid rgba(255,255,255,0.12)',
                background: filters.category === 'cricket' ? '#ffffff' : 'transparent',
                color: filters.category === 'cricket' ? '#08090d' : '#94a3b8',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'var(--transition)',
              }}
            >
              Cricket
            </button>

            {/* Football */}
            <button
              onClick={() => setFilters((p) => ({ ...p, category: p.category === 'football' ? 'all' : 'football', nepalOnly: false }))}
              style={{
                padding: '0.45rem 0.95rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                borderRadius: '9999px',
                border: filters.category === 'football' ? '1px solid #ffffff' : '1px solid rgba(255,255,255,0.12)',
                background: filters.category === 'football' ? '#ffffff' : 'transparent',
                color: filters.category === 'football' ? '#08090d' : '#94a3b8',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'var(--transition)',
              }}
            >
              Football
            </button>

            {/* Limited */}
            <button
              onClick={() => setFilters((p) => ({ ...p, category: p.category === 'limited-edition' ? 'all' : 'limited-edition', nepalOnly: false }))}
              style={{
                padding: '0.45rem 0.95rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                borderRadius: '9999px',
                border: filters.category === 'limited-edition' ? '1px solid #fbbf24' : '1px solid rgba(255,255,255,0.12)',
                background: filters.category === 'limited-edition' ? 'rgba(245, 158, 11, 0.18)' : 'transparent',
                color: filters.category === 'limited-edition' ? '#fbbf24' : '#94a3b8',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'var(--transition)',
              }}
            >
              ★ Limited 1/500
            </button>

            {/* Sale */}
            <button
              onClick={() => setFilters((p) => ({ ...p, isOnSaleOnly: !p.isOnSaleOnly }))}
              style={{
                padding: '0.45rem 0.95rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                borderRadius: '9999px',
                border: filters.isOnSaleOnly ? '1px solid #f87171' : '1px solid rgba(255,255,255,0.12)',
                background: filters.isOnSaleOnly ? 'rgba(239, 68, 68, 0.18)' : 'transparent',
                color: filters.isOnSaleOnly ? '#f87171' : '#94a3b8',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              🔥 On Sale
            </button>
          </div>

          {/* Right: Refine & Sort Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {/* Filter Toggle Button */}
            <button
              id="open-refine-filter-btn"
              onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 0.95rem',
                borderRadius: '8px',
                border: isFilterDrawerOpen || activeFiltersCount > 0 ? '1px solid #ffffff' : '1px solid rgba(255,255,255,0.16)',
                background: isFilterDrawerOpen || activeFiltersCount > 0 ? '#ffffff' : 'rgba(255,255,255,0.03)',
                color: isFilterDrawerOpen || activeFiltersCount > 0 ? '#08090d' : '#f1f5f9',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'var(--transition)',
              }}
            >
              <SlidersHorizontal size={14} />
              <span>{isFilterDrawerOpen ? 'Close Filters' : 'Refine Filters'}</span>
              {activeFiltersCount > 0 && <span>({activeFiltersCount})</span>}
            </button>

            {/* Sort Selector */}
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters((p) => ({ ...p, sortBy: e.target.value as any }))}
              style={{
                background: '#0d0f15',
                color: '#f1f5f9',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                borderRadius: '8px',
                padding: '0.45rem 0.85rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            {/* Grid Switcher */}
            <div
              style={{
                display: 'flex',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.16)',
              }}
              className="desktop-nav"
            >
              <button
                onClick={() => setGridCols(3)}
                style={{
                  padding: '0.45rem 0.65rem',
                  border: 'none',
                  background: gridCols === 3 ? '#ffffff' : '#0d0f15',
                  color: gridCols === 3 ? '#08090d' : '#94a3b8',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
                title="3 Columns"
              >
                3-Col
              </button>
              <button
                onClick={() => setGridCols(4)}
                style={{
                  padding: '0.45rem 0.65rem',
                  border: 'none',
                  borderLeft: '1px solid rgba(255,255,255,0.1)',
                  background: gridCols === 4 ? '#ffffff' : '#0d0f15',
                  color: gridCols === 4 ? '#08090d' : '#94a3b8',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
                title="4 Columns"
              >
                4-Col
              </button>
            </div>
          </div>
        </div>

        {/* Refine Drawer */}
        {isFilterDrawerOpen && (
          <div
            style={{
              marginTop: '1rem',
              padding: '1.5rem',
              background: '#0d0f15',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '12px',
              animation: 'fadeIn 0.2s ease-out',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
                Refine by Specifications ({filteredJerseys.length} matching)
              </div>

              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#f87171',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <RotateCcw size={12} />
                  <span>Reset All Filters</span>
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
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Filter by Size
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {SIZES.map((sz) => {
                    const sel = filters.sizes.includes(sz);
                    return (
                      <button
                        key={sz}
                        onClick={() => handleSizeToggle(sz)}
                        style={{
                          width: '40px',
                          height: '34px',
                          borderRadius: '6px',
                          border: sel ? '1px solid #ffffff' : '1px solid rgba(255,255,255,0.12)',
                          background: sel ? '#ffffff' : 'rgba(255,255,255,0.03)',
                          color: sel ? '#08090d' : '#f1f5f9',
                          fontWeight: 700,
                          fontSize: '0.78rem',
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
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Athlete Roster
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', maxHeight: '110px', overflowY: 'auto' }}>
                  {availablePlayers.map((pl) => {
                    const sel = filters.player.includes(pl);
                    return (
                      <button
                        key={pl}
                        onClick={() => handlePlayerToggle(pl)}
                        style={{
                          padding: '0.3rem 0.65rem',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          border: sel ? '1px solid #ffffff' : '1px solid rgba(255,255,255,0.12)',
                          background: sel ? '#ffffff' : 'rgba(255,255,255,0.03)',
                          color: sel ? '#08090d' : '#94a3b8',
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
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Maximum Price: रू {filters.maxPrice.toLocaleString()}
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
