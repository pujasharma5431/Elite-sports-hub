'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '../context/StoreContext';
import { Jersey, JerseySize, Gender } from '../types/jersey';
import {
  X,
  Sliders,
  PlusCircle,
  Check,
  AlertTriangle,
  Flame,
  RotateCcw,
  Star,
  Lock,
  Unlock,
  FileText,
  ShieldCheck,
} from 'lucide-react';

const ALL_SIZES: JerseySize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
const ALL_GENDERS: { id: Gender; label: string }[] = [
  { id: 'men', label: "Men's Fit" },
  { id: 'women', label: "Women's Fit" },
  { id: 'unisex', label: 'Unisex Fit' },
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
  } = useStore();

  const [activeTab, setActiveTab] = useState<'manage' | 'add'>('manage');
  const [searchQuery, setSearchQuery] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
  const [newIsHeadlineDrop, setNewIsHeadlineDrop] = useState(false);
  const [newIsCustomizable, setNewIsCustomizable] = useState(true);
  const [newQuality, setNewQuality] = useState('Player Specification Grade // Authentic Aero-Knit Dry-Fit Polyester');
  const [newDescription, setNewDescription] = useState('Official authentic match jersey. Engineered for elite athlete performance and fan durability.');
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
      isHeadlineDrop: newIsHeadlineDrop,
      isCustomizable: newIsCustomizable,
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
      quality: newQuality || 'Player Specification Grade // Authentic Fabric',
      description: newDescription || `Official authentic ${newTeam} match jersey. Engineered for performance and fans.`,
      nepalSpecial: newIsNepalSpecial,
    });

    showNotification(`✅ "${newTitle}" added to store catalog!`);
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
          maxWidth: '920px',
          width: '95vw',
          maxHeight: '90vh',
          padding: '1.75rem',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexShrink: 0 }}>
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
                Admin Catalog & Match Drops Manager
              </h2>
              <p style={{ fontSize: '0.75rem', color: '#888888', letterSpacing: '0.02em' }}>
                Set Headline Match Drops, toggle Custom Printing eligibility, Flash Sales, stock, and item specifications.
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
              flexShrink: 0,
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
            flexShrink: 0,
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
              Manage Catalog ({jerseys.length})
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
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
            {/* Search filter for manager */}
            <div style={{ marginBottom: '1rem', flexShrink: 0 }}>
              <input
                type="text"
                placeholder="Search by player, team, or jersey name to edit headline drops, custom print, quality..."
                className="form-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ height: '38px', fontSize: '0.85rem' }}
              />
            </div>

            {/* Jerseys Inventory List */}
            <div
              style={{
                overflowY: 'auto',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
                paddingRight: '0.35rem',
              }}
            >
              {filteredItems.map((jersey) => {
                const isExpanded = expandedId === jersey.id;
                const isHeadline = !!jersey.isHeadlineDrop;
                const isCustomizable = jersey.isCustomizable !== false;

                return (
                  <div
                    key={jersey.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: isHeadline ? '1px solid #ffffff' : '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                      transition: 'border-color 0.2s ease',
                    }}
                  >
                    {/* Top row: thumbnail + Title + Team + Headline/Custom Status */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div
                        style={{
                          position: 'relative',
                          width: '56px',
                          height: '66px',
                          border: '1px solid var(--border-hairline)',
                          overflow: 'hidden',
                          flexShrink: 0,
                          background: '#0a0a0a',
                        }}
                      >
                        <Image src={jersey.image} alt={jersey.title} fill style={{ objectFit: 'cover' }} />
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em' }}>
                            {jersey.title}
                          </span>
                          {isHeadline && (
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.2rem',
                                background: '#ffffff',
                                color: '#000000',
                                fontSize: '0.62rem',
                                fontWeight: 800,
                                padding: '0.15rem 0.4rem',
                                letterSpacing: '0.04em',
                                textTransform: 'uppercase',
                              }}
                            >
                              <Star size={10} fill="#000000" />
                              Headline Drop
                            </span>
                          )}
                          {!isCustomizable && (
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.2rem',
                                background: 'rgba(239, 68, 68, 0.15)',
                                border: '1px solid rgba(239, 68, 68, 0.4)',
                                color: '#f87171',
                                fontSize: '0.62rem',
                                fontWeight: 700,
                                padding: '0.15rem 0.4rem',
                                letterSpacing: '0.04em',
                                textTransform: 'uppercase',
                              }}
                            >
                              <Lock size={10} />
                              Custom Locked
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#888888', fontFamily: 'monospace', marginTop: '0.2rem' }}>
                          {jersey.team} • {jersey.player} {jersey.playerNumber ? `#${jersey.playerNumber}` : ''}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', fontFamily: 'monospace' }}>
                          रू {jersey.price.toLocaleString()}
                        </div>
                        {jersey.isOnSale && jersey.originalPrice && (
                          <div style={{ fontSize: '0.7rem', color: '#aaaaaa', textDecoration: 'line-through' }}>
                            WAS रू {jersey.originalPrice.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Admin Feature Buttons Bar */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: '0.5rem',
                      }}
                    >
                      {/* Toggle Headline Match Drop */}
                      <button
                        onClick={() => {
                          const nextVal = !isHeadline;
                          updateJerseyInventory(jersey.id, { isHeadlineDrop: nextVal });
                          showNotification(nextVal ? `⭐ Set "${jersey.title}" as Headline Drop!` : `Removed "${jersey.title}" from Headline Drops.`);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.45rem',
                          padding: '0.5rem 0.75rem',
                          background: isHeadline ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                          border: isHeadline ? '1px solid #ffffff' : '1px solid var(--border-hairline)',
                          color: isHeadline ? '#000000' : '#cccccc',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <Star size={13} fill={isHeadline ? '#000000' : 'none'} />
                        <span>{isHeadline ? 'HEADLINE DROP: ACTIVE' : 'SET AS HEADLINE DROP'}</span>
                      </button>

                      {/* Toggle Custom Print Eligibility */}
                      <button
                        onClick={() => {
                          const nextVal = !isCustomizable;
                          updateJerseyInventory(jersey.id, { isCustomizable: nextVal });
                          showNotification(nextVal ? `✅ Custom Printing enabled for "${jersey.title}".` : `🔒 Custom Printing locked for "${jersey.title}".`);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.45rem',
                          padding: '0.5rem 0.75rem',
                          background: isCustomizable ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                          border: isCustomizable ? '1px solid rgba(34, 197, 94, 0.4)' : '1px solid rgba(239, 68, 68, 0.4)',
                          color: isCustomizable ? '#4ade80' : '#f87171',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {isCustomizable ? <Unlock size={13} /> : <Lock size={13} />}
                        <span>{isCustomizable ? 'CUSTOM PRINT: ALLOWED' : 'CUSTOM PRINT: LOCKED'}</span>
                      </button>

                      {/* Toggle Flash Sale */}
                      <button
                        onClick={() => {
                          const nextVal = !jersey.isOnSale;
                          updateJerseyInventory(jersey.id, {
                            isOnSale: nextVal,
                            originalPrice: nextVal ? (jersey.originalPrice || Math.round(jersey.price * 1.2)) : undefined,
                          });
                          showNotification(nextVal ? `🔥 Flash sale activated for "${jersey.title}"!` : `Flash sale removed for "${jersey.title}".`);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.45rem',
                          padding: '0.5rem 0.75rem',
                          background: jersey.isOnSale ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                          border: jersey.isOnSale ? '1px solid rgba(239, 68, 68, 0.5)' : '1px solid var(--border-hairline)',
                          color: jersey.isOnSale ? '#ff4d4f' : '#cccccc',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                        }}
                      >
                        <Flame size={13} />
                        <span>{jersey.isOnSale ? 'FLASH SALE: ACTIVE' : 'ENABLE FLASH SALE'}</span>
                      </button>

                      {/* Expand Details & Quality Specs */}
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : jersey.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.45rem',
                          padding: '0.5rem 0.75rem',
                          background: isExpanded ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid var(--border-hairline)',
                          color: isExpanded ? '#000000' : '#aaaaaa',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                        }}
                      >
                        <FileText size={13} />
                        <span>{isExpanded ? 'CLOSE DETAILS' : 'EDIT QUALITY & SPECS'}</span>
                      </button>
                    </div>

                    {/* Numeric Controls: Stock, Price, Original Price */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                        gap: '0.65rem',
                        background: '#0a0a0a',
                        border: '1px solid var(--border-hairline)',
                        padding: '0.65rem 0.85rem',
                      }}
                    >
                      {/* Stock Count */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.65rem', color: '#888888', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Units In Stock:
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
                            width: '100%',
                            padding: '0.35rem 0.5rem',
                            background: '#000000',
                            border: '1px solid var(--border-hairline)',
                            color: '#ffffff',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            fontFamily: 'monospace',
                          }}
                        />
                      </div>

                      {/* Price (NPR) */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.65rem', color: '#888888', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Price (NPR):
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={jersey.price}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            updateJerseyInventory(jersey.id, { price: val });
                          }}
                          style={{
                            width: '100%',
                            padding: '0.35rem 0.5rem',
                            background: '#000000',
                            border: '1px solid var(--border-hairline)',
                            color: '#ffffff',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            fontFamily: 'monospace',
                          }}
                        />
                      </div>

                      {/* Original Price */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.65rem', color: '#888888', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Original Price:
                        </label>
                        <input
                          type="number"
                          min="0"
                          placeholder="e.g. 4500"
                          value={jersey.originalPrice || ''}
                          onChange={(e) => {
                            const val = e.target.value ? Number(e.target.value) : undefined;
                            updateJerseyInventory(jersey.id, { originalPrice: val });
                          }}
                          style={{
                            width: '100%',
                            padding: '0.35rem 0.5rem',
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
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.72rem', color: jersey.isLowStock ? '#ffffff' : '#777777', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          <input
                            type="checkbox"
                            checked={jersey.isLowStock}
                            onChange={(e) => updateJerseyInventory(jersey.id, { isLowStock: e.target.checked })}
                            style={{ accentColor: '#ffffff' }}
                          />
                          <AlertTriangle size={12} />
                          <span>Low Stock Alert</span>
                        </label>
                      </div>
                    </div>

                    {/* Expandable Section: Quality & Description Details */}
                    {isExpanded && (
                      <div
                        style={{
                          background: '#050505',
                          border: '1px solid #333333',
                          padding: '0.85rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.75rem',
                        }}
                      >
                        <div>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.68rem', color: '#aaaaaa', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.3rem' }}>
                            <ShieldCheck size={12} />
                            <span>Quality & Material Specification:</span>
                          </label>
                          <input
                            type="text"
                            value={jersey.quality || jersey.fabric || ''}
                            onChange={(e) => updateJerseyInventory(jersey.id, { quality: e.target.value, fabric: e.target.value })}
                            placeholder="e.g. 100% Player Specification Match Grade // Authentic Aero-Knit Dry-Fit Polyester"
                            style={{
                              width: '100%',
                              padding: '0.45rem 0.65rem',
                              background: '#000000',
                              border: '1px solid var(--border-hairline)',
                              color: '#ffffff',
                              fontSize: '0.78rem',
                            }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.68rem', color: '#aaaaaa', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.3rem' }}>
                            <FileText size={12} />
                            <span>Product Details & Admin Description:</span>
                          </label>
                          <textarea
                            rows={3}
                            value={jersey.description || ''}
                            onChange={(e) => updateJerseyInventory(jersey.id, { description: e.target.value })}
                            placeholder="Detailed description shown to customers when they click the item..."
                            style={{
                              width: '100%',
                              padding: '0.45rem 0.65rem',
                              background: '#000000',
                              border: '1px solid var(--border-hairline)',
                              color: '#ffffff',
                              fontSize: '0.78rem',
                              resize: 'vertical',
                              lineHeight: 1.45,
                            }}
                          />
                        </div>
                      </div>
                    )}

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

                      {/* Genders / Fit Toggle */}
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
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Add New Jersey */}
        {activeTab === 'add' && (
          <form onSubmit={handleCreateJersey} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', flex: 1, paddingRight: '0.35rem' }}>
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

            {/* Quality Specification */}
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.25rem' }}>
                Quality & Material Specifications (Shown to Customer on Click)
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 100% Player Specification Grade // Micro-Perforated Aero-Knit"
                value={newQuality}
                onChange={(e) => setNewQuality(e.target.value)}
              />
            </div>

            {/* Product Details & Admin Description */}
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.25rem' }}>
                Item Details Description (Shown to Customer on Click)
              </label>
              <textarea
                rows={3}
                className="form-input"
                placeholder="Detailed description of the jersey, heritage, stitching, and match history..."
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                style={{ resize: 'vertical' }}
              />
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

            {/* Feature Flags */}
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', padding: '0.5rem 0' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#ffffff', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <input
                  type="checkbox"
                  checked={newIsHeadlineDrop}
                  onChange={(e) => setNewIsHeadlineDrop(e.target.checked)}
                  style={{ accentColor: '#ffffff' }}
                />
                <span>⭐ Feature in Headline Match Drops</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#ffffff', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <input
                  type="checkbox"
                  checked={newIsCustomizable}
                  onChange={(e) => setNewIsCustomizable(e.target.checked)}
                  style={{ accentColor: '#ffffff' }}
                />
                <span>Allow Custom Name & Number Print</span>
              </label>

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
