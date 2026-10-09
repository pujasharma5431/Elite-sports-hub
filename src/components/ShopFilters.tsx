'use client';

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { JerseySize, Gender } from '../types/jersey';
import { Filter, RotateCcw, ChevronDown, ChevronUp, Sparkles, Tag, Flame, ShieldAlert } from 'lucide-react';

const SIZES_LIST: JerseySize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
const GENDERS_LIST: { id: Gender; label: string }[] = [
  { id: 'men', label: "Men's Fit" },
  { id: 'women', label: "Women's Fit" },
  { id: 'unisex', label: 'Unisex' },
  { id: 'kids', label: 'Junior / Kids' },
];

const COLORS_LIST = [
  { name: 'Blue', hex: '#2563eb' },
  { name: 'Red', hex: '#dc2626' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Black', hex: '#18181b' },
  { name: 'Gold', hex: '#eab308' },
  { name: 'Sky Blue', hex: '#38bdf8' },
  { name: 'Pink', hex: '#f472b6' },
  { name: 'Green', hex: '#16a34a' },
];

export const ShopFilters: React.FC = () => {
  const { filters, setFilters, resetFilters, availableTeams, availablePlayers } = useStore();

  const [expandedSections, setExpandedSections] = useState({
    teams: true,
    players: true,
    sizes: true,
    gender: true,
    colors: false,
    price: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSizeToggle = (size: JerseySize) => {
    setFilters((prev) => {
      const exists = prev.sizes.includes(size);
      return {
        ...prev,
        sizes: exists ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size],
      };
    });
  };

  const handleGenderToggle = (gender: Gender) => {
    setFilters((prev) => {
      const exists = prev.gender.includes(gender);
      return {
        ...prev,
        gender: exists ? prev.gender.filter((g) => g !== gender) : [...prev.gender, gender],
      };
    });
  };

  const handleTeamToggle = (team: string) => {
    setFilters((prev) => {
      const exists = prev.team.includes(team);
      return {
        ...prev,
        team: exists ? prev.team.filter((t) => t !== team) : [...prev.team, team],
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

  const handleColorToggle = (colorName: string) => {
    setFilters((prev) => {
      const exists = prev.colors.includes(colorName);
      return {
        ...prev,
        colors: exists ? prev.colors.filter((c) => c !== colorName) : [...prev.colors, colorName],
      };
    });
  };

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

  return (
    <aside
      id="shop-filters-sidebar"
      className="glass-panel"
      style={{
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        position: 'sticky',
        top: '80px',
        maxHeight: 'calc(100vh - 100px)',
        overflowY: 'auto',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '1rem',
          borderBottom: '1px solid var(--border-light)',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={18} color="#e63946" />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Filter Jerseys</h3>
          {activeFiltersCount > 0 && (
            <span
              style={{
                background: '#e63946',
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-full)',
                padding: '0.1rem 0.45rem',
              }}
            >
              {activeFiltersCount}
            </span>
          )}
        </div>

        {activeFiltersCount > 0 && (
          <button
            id="reset-filters-btn"
            onClick={resetFilters}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Quick Toggles: Sale, Low Stock, Nepal, Limited */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {/* On Sale */}
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.55rem 0.75rem',
            background: filters.isOnSaleOnly ? 'rgba(230, 57, 70, 0.15)' : 'rgba(255, 255, 255, 0.03)',
            border: `1px solid ${filters.isOnSaleOnly ? 'rgba(230, 57, 70, 0.4)' : 'var(--border-light)'}`,
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            transition: 'var(--transition)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
            <Flame size={15} color="#e63946" />
            <span>On Sale Jerseyes</span>
          </div>
          <input
            id="filter-toggle-sale"
            type="checkbox"
            checked={filters.isOnSaleOnly}
            onChange={(e) => setFilters((prev) => ({ ...prev, isOnSaleOnly: e.target.checked }))}
            style={{ accentColor: '#e63946', cursor: 'pointer' }}
          />
        </label>

        {/* Low Stock Alert */}
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.55rem 0.75rem',
            background: filters.isLowStockOnly ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.03)',
            border: `1px solid ${filters.isLowStockOnly ? 'rgba(239, 68, 68, 0.4)' : 'var(--border-light)'}`,
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            transition: 'var(--transition)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
            <ShieldAlert size={15} color="#f87171" />
            <span>Low Stock / Almost Sold Out</span>
          </div>
          <input
            id="filter-toggle-low-stock"
            type="checkbox"
            checked={filters.isLowStockOnly}
            onChange={(e) => setFilters((prev) => ({ ...prev, isLowStockOnly: e.target.checked }))}
            style={{ accentColor: '#f87171', cursor: 'pointer' }}
          />
        </label>

        {/* Nepal Pride */}
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.55rem 0.75rem',
            background: filters.nepalOnly ? 'rgba(37, 99, 235, 0.2)' : 'rgba(255, 255, 255, 0.03)',
            border: `1px solid ${filters.nepalOnly ? 'rgba(37, 99, 235, 0.5)' : 'var(--border-light)'}`,
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            transition: 'var(--transition)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
            <span>🇳🇵</span>
            <span>Nepal National Kits Only</span>
          </div>
          <input
            id="filter-toggle-nepal"
            type="checkbox"
            checked={filters.nepalOnly}
            onChange={(e) => setFilters((prev) => ({ ...prev, nepalOnly: e.target.checked }))}
            style={{ accentColor: '#2563eb', cursor: 'pointer' }}
          />
        </label>

        {/* Limited Editions Only */}
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.55rem 0.75rem',
            background: filters.isLimitedEditionOnly ? 'rgba(245, 158, 11, 0.18)' : 'rgba(255, 255, 255, 0.03)',
            border: `1px solid ${filters.isLimitedEditionOnly ? 'rgba(245, 158, 11, 0.5)' : 'var(--border-light)'}`,
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            transition: 'var(--transition)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
            <Sparkles size={15} color="#fbbf24" />
            <span>Limited Edition Series</span>
          </div>
          <input
            id="filter-toggle-limited-edition"
            type="checkbox"
            checked={filters.isLimitedEditionOnly}
            onChange={(e) => setFilters((prev) => ({ ...prev, isLimitedEditionOnly: e.target.checked }))}
            style={{ accentColor: '#f59e0b', cursor: 'pointer' }}
          />
        </label>
      </div>

      {/* Sport Category Radio Pills */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', marginBottom: '0.6rem' }}>
          Sport Category
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.4rem' }}>
          {[
            { id: 'all', label: 'All Sports' },
            { id: 'cricket', label: '🏏 Cricket' },
            { id: 'football', label: '⚽ Football' },
            { id: 'limited-edition', label: '✨ Limited' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilters((p) => ({ ...p, category: cat.id as any }))}
              style={{
                padding: '0.5rem 0.6rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.8rem',
                fontWeight: 600,
                textAlign: 'center',
                border: filters.category === cat.id ? '1px solid #3b82f6' : '1px solid var(--border-light)',
                background: filters.category === cat.id ? 'rgba(37, 99, 235, 0.25)' : 'rgba(255, 255, 255, 0.02)',
                color: filters.category === cat.id ? '#ffffff' : '#94a3b8',
                cursor: 'pointer',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Size Selector Pills */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div
          onClick={() => toggleSection('sizes')}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: '#94a3b8',
            marginBottom: '0.6rem',
          }}
        >
          <span>Available Sizes</span>
          {expandedSections.sizes ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </div>
        {expandedSections.sizes && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {SIZES_LIST.map((size) => {
              const active = filters.sizes.includes(size);
              return (
                <button
                  key={size}
                  id={`filter-size-${size}`}
                  onClick={() => handleSizeToggle(size)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: active ? '1px solid #e63946' : '1px solid var(--border-light)',
                    background: active ? '#e63946' : 'rgba(255, 255, 255, 0.04)',
                    color: active ? '#ffffff' : '#cbd5e1',
                    transition: 'var(--transition)',
                  }}
                >
                  {size}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Gender / Fit Selector */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div
          onClick={() => toggleSection('gender')}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: '#94a3b8',
            marginBottom: '0.6rem',
          }}
        >
          <span>Gender & Fit</span>
          {expandedSections.gender ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </div>
        {expandedSections.gender && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {GENDERS_LIST.map((g) => {
              const active = filters.gender.includes(g.id);
              return (
                <button
                  key={g.id}
                  id={`filter-gender-${g.id}`}
                  onClick={() => handleGenderToggle(g.id)}
                  style={{
                    padding: '0.35rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: active ? '1px solid #3b82f6' : '1px solid var(--border-light)',
                    background: active ? 'rgba(37, 99, 235, 0.3)' : 'rgba(255, 255, 255, 0.03)',
                    color: active ? '#93c5fd' : '#94a3b8',
                  }}
                >
                  {g.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Player Filter (Kohli, Messi, Ronaldo, Rohit Paudel, etc.) */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div
          onClick={() => toggleSection('players')}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: '#94a3b8',
            marginBottom: '0.6rem',
          }}
        >
          <span>Featured Player ({availablePlayers.length})</span>
          {expandedSections.players ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </div>
        {expandedSections.players && (
          <div
            style={{
              maxHeight: '180px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem',
            }}
          >
            {availablePlayers.map((player) => {
              const active = filters.player.includes(player);
              return (
                <label
                  key={player}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.82rem',
                    color: active ? '#ffffff' : '#cbd5e1',
                    cursor: 'pointer',
                    padding: '0.25rem 0.4rem',
                    borderRadius: '6px',
                    background: active ? 'rgba(255, 255, 255, 0.06)' : 'transparent',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => handlePlayerToggle(player)}
                    style={{ accentColor: '#e63946', cursor: 'pointer' }}
                  />
                  <span>{player}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Team Filter */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div
          onClick={() => toggleSection('teams')}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: '#94a3b8',
            marginBottom: '0.6rem',
          }}
        >
          <span>Team / Club ({availableTeams.length})</span>
          {expandedSections.teams ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </div>
        {expandedSections.teams && (
          <div
            style={{
              maxHeight: '160px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem',
            }}
          >
            {availableTeams.map((team) => {
              const active = filters.team.includes(team);
              return (
                <label
                  key={team}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.82rem',
                    color: active ? '#ffffff' : '#cbd5e1',
                    cursor: 'pointer',
                    padding: '0.25rem 0.4rem',
                    borderRadius: '6px',
                    background: active ? 'rgba(255, 255, 255, 0.06)' : 'transparent',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => handleTeamToggle(team)}
                    style={{ accentColor: '#2563eb', cursor: 'pointer' }}
                  />
                  <span>{team}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Color Filter Swatches */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div
          onClick={() => toggleSection('colors')}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: '#94a3b8',
            marginBottom: '0.6rem',
          }}
        >
          <span>Jersey Color Palette</span>
          {expandedSections.colors ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </div>
        {expandedSections.colors && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {COLORS_LIST.map((color) => {
              const active = filters.colors.includes(color.name);
              return (
                <button
                  key={color.name}
                  onClick={() => handleColorToggle(color.name)}
                  title={color.name}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: color.hex,
                    border: active ? '3px solid #38bdf8' : '2px solid rgba(255,255,255,0.2)',
                    boxShadow: active ? '0 0 10px rgba(56, 189, 248, 0.7)' : 'none',
                    cursor: 'pointer',
                    transform: active ? 'scale(1.15)' : 'scale(1)',
                    transition: 'var(--transition)',
                  }}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Price Range in NPR */}
      <div>
        <div
          onClick={() => toggleSection('price')}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: '#94a3b8',
            marginBottom: '0.6rem',
          }}
        >
          <span>Price Range (NPR)</span>
          {expandedSections.price ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </div>
        {expandedSections.price && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.5rem' }}>
              <span>Rs. {filters.minPrice.toLocaleString()}</span>
              <span>Rs. {filters.maxPrice.toLocaleString()}</span>
            </div>
            <input
              id="filter-price-slider"
              type="range"
              min="0"
              max="15000"
              step="500"
              value={filters.maxPrice}
              onChange={(e) => setFilters((p) => ({ ...p, maxPrice: Number(e.target.value) }))}
              style={{
                width: '100%',
                accentColor: '#e63946',
                cursor: 'pointer',
              }}
            />
          </div>
        )}
      </div>
    </aside>
  );
};
