'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '../context/StoreContext';
import { Jersey, JerseySize, Gender } from '../types/jersey';
import { X, Sliders, PlusCircle, Check, AlertTriangle, Flame, RotateCcw, Sparkles } from 'lucide-react';

const ALL_SIZES: JerseySize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
const ALL_GENDERS: { id: Gender; label: string }[] = [
  { id: 'men', label: "Men's" },
  { id: 'women', label: "Women's" },
  { id: 'unisex', label: 'Unisex' },
  { id: 'kids', label: 'Junior' },
];

export const InventoryManagerModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    jerseys,
    updateJerseyInventory,
    addNewJersey,
    resetAllJerseys,
    setIsSanityModalOpen,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'manage' | 'add'>('manage');
  const [searchQuery, setSearchQuery] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Form state for adding new jersey
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'cricket' | 'football' | 'limited-edition'>('cricket');
  const [newSport, setNewSport] = useState<'Cricket' | 'Football'>('Cricket');
  const [newTeam, setNewTeam] = useState('Nepal National Cricket Team');
  const [newPlayer, setNewPlayer] = useState('');
  const [newPlayerNumber, setNewPlayerNumber] = useState('');
  const [newEdition, setNewEdition] = useState('Official Match Edition 2024');
  const [newPrice, setNewPrice] = useState('3200');
  const [newOriginalPrice, setNewOriginalPrice] = useState('');
  const [newStock, setNewStock] = useState('15');
  const [newIsOnSale, setNewIsOnSale] = useState(false);
  const [newIsLimited, setNewIsLimited] = useState(false);
  const [newLimitedNumber, setNewLimitedNumber] = useState('Numbered 001 of 500');
  const [newSizes, setNewSizes] = useState<JerseySize[]>(['S', 'M', 'L', 'XL']);
  const [newGenders, setNewGenders] = useState<Gender[]>(['men', 'unisex']);
  const [newImageUrl, setNewImageUrl] = useState('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=900&q=80');
  const [newIsNepalSpecial, setNewIsNepalSpecial] = useState(true);

  if (!isAdminOpen) return null;

  const showNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleCreateJersey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addNewJersey({
      title: newTitle,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: newCategory,
      sport: newSport,
      team: newTeam,
      player: newPlayer || 'Squad Player',
      playerNumber: newPlayerNumber ? Number(newPlayerNumber) : undefined,
      edition: newEdition,
      price: Number(newPrice) || 3000,
      originalPrice: newOriginalPrice ? Number(newOriginalPrice) : undefined,
      isOnSale: newIsOnSale,
      isLimitedEdition: newIsLimited,
      limitedEditionNumber: newIsLimited ? newLimitedNumber : undefined,
      stock: Number(newStock) || 10,
      isLowStock: Number(newStock) <= 5,
      sizes: newSizes,
      gender: newGenders,
      colors: [{ name: 'Team Shade', hex: '#1d4ed8' }],
      image: newImageUrl,
      rating: 5.0,
      reviewsCount: 1,
      fabric: 'Dry-fit pro-stretch breathable polyester',
      description: `Official authentic ${newTeam} match jersey. Engineered for performance and fans.`,
      nepalSpecial: newIsNepalSpecial,
    });

    showNotification(`✅ "${newTitle}" added to store inventory!`);
    setActiveTab('manage');
    setNewTitle('');
  };

  const filteredItems = jerseys.filter((j) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      j.title.toLowerCase().includes(q) ||
      j.player.toLowerCase().includes(q) ||
      j.team.toLowerCase().includes(q)
    );
  });

  return (
    <div
      id="inventory-manager-overlay"
      className="modal-overlay"
      onClick={() => setIsAdminOpen(false)}
      style={{ zIndex: 140 }}
    >
      <div
        id="inventory-manager-content"
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '880px',
          padding: '1.75rem',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                border: '1px solid #ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                background: '#000000',
              }}
            >
              <Sliders size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.15rem', color: '#ffffff', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
                Catalog & Inventory Control
              </h2>
              <p style={{ fontSize: '0.75rem', color: '#888888', letterSpacing: '0.02em' }}>
                Live stock levels, flash sales, inventory flags, and sizing matrices.
              </p>
            </div>
          </div>

          <button
            id="close-inventory-manager-btn"
            onClick={() => setIsAdminOpen(false)}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-hairline)',
              color: '#ffffff',
              cursor: 'pointer',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Success toast if any */}
        {successMsg && (
          <div
            style={{
              background: '#ffffff',
              color: '#000000',
              padding: '0.6rem 1rem',
              fontSize: '0.8rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            <Check size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-hairline)',
            marginBottom: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setActiveTab('manage')}
              style={{
                padding: '0.6rem 1rem',
                border: 'none',
                background: 'transparent',
                color: activeTab === 'manage' ? '#ffffff' : '#666666',
                fontWeight: 700,
                fontSize: '0.82rem',
                borderBottom: activeTab === 'manage' ? '2px solid #ffffff' : 'none',
                cursor: 'pointer',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Catalog List ({jerseys.length})
            </button>

            <button
              onClick={() => setActiveTab('add')}
              style={{
                padding: '0.6rem 1rem',
                border: 'none',
                background: 'transparent',
                color: activeTab === 'add' ? '#ffffff' : '#666666',
                fontWeight: 700,
                fontSize: '0.82rem',
                borderBottom: activeTab === 'add' ? '2px solid #ffffff' : 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              <PlusCircle size={14} />
              <span>Add New Drop</span>
            </button>
          </div>

          <button
            onClick={() => {
              if (confirm('Reset catalog back to initial defaults?')) {
                resetAllJerseys();
                showNotification('Catalog reset to initial demo products.');
              }
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#666666',
              fontSize: '0.72rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            <RotateCcw size={12} />
            <span>Reset Demo Defaults</span>
          </button>
        </div>

        {/* Tab 1: Manage Existing */}
        {activeTab === 'manage' && (
          <div>
            {/* Search filter for manager */}
            <div style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Search catalog to update (e.g. Rohit, Messi, Ronaldo)..."
                className="form-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ height: '38px', fontSize: '0.85rem' }}
              />
            </div>

            {/* Jerseys Inventory List */}
            <div
              style={{
                maxHeight: '480px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
              }}
            >
              {filteredItems.map((jersey) => (
                <div
                  key={jersey.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                  }}
                >
                  {/* Top row: thumbnail + Title + Team */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div
                      style={{
                        position: 'relative',
                        width: '50px',
                        height: '58px',
                        border: '1px solid var(--border-hairline)',
                        overflow: 'hidden',
                        flexShrink: 0,
                        background: '#0a0a0a',
                      }}
                    >
                      <Image src={jersey.image} alt={jersey.title} fill style={{ objectFit: 'cover' }} />
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em' }}>
                        {jersey.title}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#888888', fontFamily: 'monospace' }}>
                        {jersey.team} • {jersey.player} {jersey.playerNumber ? `#${jersey.playerNumber}` : ''}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', fontFamily: 'monospace' }}>
                        रू {jersey.price.toLocaleString()}
                      </div>
                      {jersey.isOnSale && jersey.originalPrice && (
                        <div style={{ fontSize: '0.7rem', color: '#aaaaaa', textDecoration: 'line-through' }}>
                          WAS रू {jersey.originalPrice.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Controls Row: Stock, Low Stock Toggle, On Sale Toggle */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                      gap: '0.65rem',
                      background: '#0a0a0a',
                      border: '1px solid var(--border-hairline)',
                      padding: '0.65rem 0.85rem',
                    }}
                  >
                    {/* Stock Count Input */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.68rem', color: '#888888', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Units in Stock:
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={jersey.stock}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          updateJerseyInventory(jersey.id, {
                            stock: val,
                            isLowStock: val <= 5,
                          });
                        }}
                        style={{
                          width: '100px',
                          padding: '0.35rem 0.6rem',
                          background: '#000000',
                          border: '1px solid var(--border-hairline)',
                          color: '#ffffff',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          fontFamily: 'monospace',
                        }}
                      />
                    </div>

                    {/* Low Stock Flag */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.75rem', color: jersey.isLowStock ? '#ffffff' : '#777777', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        <input
                          type="checkbox"
                          checked={jersey.isLowStock}
                          onChange={(e) => updateJerseyInventory(jersey.id, { isLowStock: e.target.checked })}
                          style={{ accentColor: '#ffffff' }}
                        />
                        <AlertTriangle size={13} />
                        <span>Low Stock Alert</span>
                      </label>
                    </div>

                    {/* On Sale Flag */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.75rem', color: jersey.isOnSale ? '#ffffff' : '#777777', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        <input
                          type="checkbox"
                          checked={jersey.isOnSale}
                          onChange={(e) =>
                            updateJerseyInventory(jersey.id, {
                              isOnSale: e.target.checked,
                              originalPrice: e.target.checked ? (jersey.originalPrice || Math.round(jersey.price * 1.2)) : undefined,
                            })
                          }
                          style={{ accentColor: '#ffffff' }}
                        />
                        <Flame size={13} />
                        <span>Flash Sale Active</span>
                      </label>
                    </div>
                  </div>

                  {/* Sizes & Gender Pills Management */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.72rem', color: '#888888' }}>
                    {/* Sizes Toggle */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span style={{ textTransform: 'uppercase', letterSpacing: '0.04em' }}>Sizes:</span>
                      {ALL_SIZES.map((sz) => {
                        const active = jersey.sizes.includes(sz);
                        return (
                          <button
                            key={sz}
                            onClick={() => {
                              const newSizes = active
                                ? jersey.sizes.filter((s) => s !== sz)
                                : [...jersey.sizes, sz];
                              updateJerseyInventory(jersey.id, { sizes: newSizes });
                            }}
                            style={{
                              padding: '0.15rem 0.45rem',
                              fontSize: '0.68rem',
                              fontWeight: 700,
                              fontFamily: 'monospace',
                              border: active ? '1px solid #ffffff' : '1px solid var(--border-hairline)',
                              background: active ? '#ffffff' : 'transparent',
                              color: active ? '#000000' : '#666666',
                              cursor: 'pointer',
                            }}
                          >
                            {sz}
                          </button>
                        );
                      })}
                    </div>

                    {/* Genders Toggle */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span style={{ textTransform: 'uppercase', letterSpacing: '0.04em' }}>Fit:</span>
                      {ALL_GENDERS.map((g) => {
                        const active = jersey.gender.includes(g.id);
                        return (
                          <button
                            key={g.id}
                            onClick={() => {
                              const newG = active
                                ? jersey.gender.filter((x) => x !== g.id)
                                : [...jersey.gender, g.id];
                              updateJerseyInventory(jersey.id, { gender: newG });
                            }}
                            style={{
                              padding: '0.15rem 0.45rem',
                              fontSize: '0.68rem',
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              border: active ? '1px solid #ffffff' : '1px solid var(--border-hairline)',
                              background: active ? '#ffffff' : 'transparent',
                              color: active ? '#000000' : '#666666',
                              cursor: 'pointer',
                            }}
                          >
                            {g.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Add New Jersey */}
        {activeTab === 'add' && (
          <form onSubmit={handleCreateJersey} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.25rem' }}>
                  Jersey Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nepal T20 World Cup Special Rhinos Kit"
                  className="form-input"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.25rem' }}>
                  Category
                </label>
                <select
                  className="form-input"
                  value={newCategory}
                  onChange={(e) => {
                    const val = e.target.value as any;
                    setNewCategory(val);
                    if (val === 'cricket') setNewSport('Cricket');
                    if (val === 'football') setNewSport('Football');
                  }}
                >
                  <option value="cricket">Cricket</option>
                  <option value="football">Football</option>
                  <option value="limited-edition">Limited Edition</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.25rem' }}>
                  Team / Club
                </label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={newTeam}
                  onChange={(e) => setNewTeam(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.25rem' }}>
                  Featured Player
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rohit Paudel, Messi..."
                  className="form-input"
                  value={newPlayer}
                  onChange={(e) => setNewPlayer(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.25rem' }}>
                  Player Jersey #
                </label>
                <input
                  type="number"
                  placeholder="e.g. 17"
                  className="form-input"
                  value={newPlayerNumber}
                  onChange={(e) => setNewPlayerNumber(e.target.value)}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.25rem' }}>
                  Price (NPR) *
                </label>
                <input
                  type="number"
                  required
                  placeholder="3200"
                  className="form-input"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.25rem' }}>
                  Original Price (if On Sale)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 3800"
                  className="form-input"
                  value={newOriginalPrice}
                  onChange={(e) => setNewOriginalPrice(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.25rem' }}>
                  Initial Stock Count *
                </label>
                <input
                  type="number"
                  required
                  className="form-input"
                  value={newStock}
                  onChange={(e) => setNewStock(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.25rem' }}>
                Jersey Image URL
              </label>
              <input
                type="url"
                className="form-input"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
              />
            </div>

            {/* Checkbox settings */}
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#ffffff', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <input
                  type="checkbox"
                  checked={newIsOnSale}
                  onChange={(e) => setNewIsOnSale(e.target.checked)}
                  style={{ accentColor: '#ffffff' }}
                />
                <span>Flash Sale Drop</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#ffffff', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <input
                  type="checkbox"
                  checked={newIsLimited}
                  onChange={(e) => setNewIsLimited(e.target.checked)}
                  style={{ accentColor: '#ffffff' }}
                />
                <span>Numbered Edition</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#ffffff', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <input
                  type="checkbox"
                  checked={newIsNepalSpecial}
                  onChange={(e) => setNewIsNepalSpecial(e.target.checked)}
                  style={{ accentColor: '#ffffff' }}
                />
                <span>Nepal National Kit</span>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ height: '44px', fontWeight: 700, marginTop: '0.5rem' }}
            >
              <PlusCircle size={18} />
              <span>Add Jersey to Catalog</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
