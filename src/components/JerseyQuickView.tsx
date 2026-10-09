'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '../context/StoreContext';
import { JerseySize, Gender, JerseyColor } from '../types/jersey';
import { X, ShoppingBag, ShieldCheck, Truck, Sparkles, Lock, Minus, Plus, Info } from 'lucide-react';

export const JerseyQuickView: React.FC = () => {
  const { quickViewJersey, setQuickViewJersey, addToCart } = useStore();

  const jersey = quickViewJersey;

  const [selectedSize, setSelectedSize] = useState<JerseySize>(jersey?.sizes[0] || 'M');
  const [selectedGender, setSelectedGender] = useState<Gender>(jersey?.gender[0] || 'men');
  const [selectedColor, setSelectedColor] = useState<JerseyColor>(jersey?.colors[0] || { name: 'Standard', hex: '#ffffff' });
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(jersey?.image || '');

  // Customization print
  const [enableCustomPrint, setEnableCustomPrint] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customNumber, setCustomNumber] = useState('');
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Sync state if jersey changes
  React.useEffect(() => {
    if (jersey) {
      setSelectedSize(jersey.sizes[0] || 'M');
      setSelectedGender(jersey.gender.includes('men') ? 'men' : jersey.gender[0] || 'unisex');
      setSelectedColor(jersey.colors[0] || { name: 'Standard', hex: '#ffffff' });
      setActiveImage(jersey.image);
      setQuantity(1);
      setEnableCustomPrint(false);
      setCustomName('');
      setCustomNumber('');
    }
  }, [jersey]);

  if (!jersey) return null;

  const isCustomizable = jersey.isCustomizable !== false;
  const singleItemPrice = jersey.price + (enableCustomPrint && isCustomizable ? 350 : 0);
  const totalPrice = singleItemPrice * quantity;

  const handleAddToCart = () => {
    addToCart({
      jerseyId: jersey.id,
      jersey,
      selectedSize,
      selectedGender,
      selectedColor,
      customPrint: enableCustomPrint && isCustomizable && customName.trim()
        ? {
            name: customName.toUpperCase().trim(),
            number: customNumber.trim() || String(jersey.playerNumber || '10'),
          }
        : undefined,
      quantity,
      price: singleItemPrice,
    });

    setQuickViewJersey(null);
  };

  const imagesList = [jersey.image, ...(jersey.gallery || [])];

  // Available fits (guarantee Men, Women, Unisex are selectable)
  const availableFits: { id: Gender; label: string }[] = [
    { id: 'men', label: 'MEN FIT' },
    { id: 'women', label: 'WOMEN FIT' },
    { id: 'unisex', label: 'UNISEX' },
  ];

  return (
    <div
      id="quick-view-modal-backdrop"
      className="modal-overlay"
      onClick={() => setQuickViewJersey(null)}
      style={{ zIndex: 120, padding: '1rem' }}
    >
      <div
        id="quick-view-modal-content"
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '960px',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: 0,
          background: '#06070a',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 420px) 1fr',
          position: 'relative',
        }}
      >
        {/* Close Button */}
        <button
          id="close-quickview-btn"
          onClick={() => setQuickViewJersey(null)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '4px',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            cursor: 'pointer',
            zIndex: 30,
            transition: 'all 0.2s',
          }}
          aria-label="Close details"
        >
          <X size={16} />
        </button>

        {/* Left Column: Media Preview & Quality Highlights */}
        <div
          style={{
            background: '#090a0f',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '380px',
                overflow: 'hidden',
                background: '#000000',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                marginBottom: '1rem',
              }}
            >
              <Image
                src={activeImage || jersey.image}
                alt={jersey.title}
                fill
                style={{ objectFit: 'cover' }}
              />

              {/* Live Jersey Back print preview */}
              {enableCustomPrint && isCustomizable && customName && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0, 0, 0, 0.94)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#71717a', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    // CUSTOM HEAT-PRESS PRINT
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '2.5rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      letterSpacing: '0.15em',
                      lineHeight: 1,
                    }}
                  >
                    {customName.toUpperCase()}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '6rem',
                      fontWeight: 900,
                      color: '#ffffff',
                      lineHeight: 0.9,
                    }}
                  >
                    {customNumber || jersey.playerNumber || '10'}
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {imagesList.length > 1 && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {imagesList.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    style={{
                      width: '54px',
                      height: '54px',
                      overflow: 'hidden',
                      position: 'relative',
                      border: activeImage === img ? '1px solid #ffffff' : '1px solid rgba(255,255,255,0.15)',
                      background: '#000000',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    <Image src={img} alt="Thumbnail" fill style={{ objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quality & Dispatch Badges */}
          <div style={{ marginTop: '1.5rem', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#10b981', fontWeight: 700 }}>
              <ShieldCheck size={14} />
              <span>{jersey.quality ? 'AUTHENTIC MATCH SPECIFICATION' : '100% PLAYER SPECIFICATION GRADE'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#cbd5e1' }}>
              <Truck size={14} color="#f87171" />
              <span>Same-Day Dispatch in Kathmandu Valley</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
              Courier delivery to all 77 districts • Dubai • India • Worldwide
            </div>
          </div>
        </div>

        {/* Right Column: Specifications, Description & Controls */}
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#71717a', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              {jersey.sport} // {jersey.team}
            </div>

            <h2 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', textTransform: 'uppercase', lineHeight: 1.2, marginBottom: '0.4rem' }}>
              {jersey.title}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#a1a1aa' }}>
              <span>{jersey.edition}</span>
              <span>//</span>
              <span style={{ color: jersey.stock <= 5 ? '#f87171' : '#10b981', fontWeight: 700 }}>
                STOCK: {jersey.stock} UNITS {jersey.stock <= 5 ? '(LOW STOCK)' : 'READY'}
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.85rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.9rem', fontWeight: 700, color: '#ffffff' }}>
              NPR {singleItemPrice.toLocaleString()}
            </span>
            {jersey.originalPrice && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: '#71717a', textDecoration: 'line-through' }}>
                NPR {jersey.originalPrice.toLocaleString()}
              </span>
            )}
            {jersey.isOnSale && (
              <span style={{ fontSize: '0.72rem', background: '#dc2626', color: '#ffffff', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                FLASH SALE
              </span>
            )}
          </div>

          {/* Quality & Admin Product Description */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '0.85rem 1rem',
              borderRadius: '6px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#fbbf24', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              <Info size={13} />
              <span>Quality & Match Specification:</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '0.6rem' }}>
              {jersey.quality || jersey.fabric || '100% Pro-grade AeroVent™ poly-mesh engineered with moisture-wicking technology and official 3D heat-transferred national crest.'}
            </p>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.25rem', fontWeight: 700 }}>
              Product Details:
            </div>
            <p style={{ fontSize: '0.82rem', color: '#f1f5f9', lineHeight: 1.55 }}>
              {jersey.description || 'Official authentic match kit engineered for fans and international athletic performance.'}
            </p>
          </div>

          {/* Fit Selector: Men / Women / Unisex */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#71717a', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
              FIT SPECIFICATION (MEN / WOMEN / UNISEX)
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {availableFits.map((fit) => (
                <button
                  key={fit.id}
                  onClick={() => setSelectedGender(fit.id)}
                  style={{
                    padding: '0.45rem 1rem',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    border: selectedGender === fit.id ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.15)',
                    background: selectedGender === fit.id ? '#ffffff' : 'transparent',
                    color: selectedGender === fit.id ? '#000000' : '#a1a1aa',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {fit.label}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#71717a', letterSpacing: '0.1em' }}>
                SIZE: {selectedSize}
              </span>
              <button
                onClick={() => setShowSizeGuide(!showSizeGuide)}
                style={{ background: 'transparent', border: 'none', color: '#ffffff', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', cursor: 'pointer', textDecoration: 'underline' }}
              >
                {showSizeGuide ? 'HIDE CHART' : 'SIZE CHART'}
              </button>
            </div>

            {showSizeGuide && (
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '0.65rem',
                  marginBottom: '0.65rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: '#d4d4d8',
                }}
              >
                Men: S (36-38") | M (38-40") | L (40-42") | XL (42-44") | XXL (44-46")<br />
                Women: XS (30-32") | S (32-34") | M (34-36") | L (36-38") | XL (38-40")
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {jersey.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  style={{
                    minWidth: '42px',
                    height: '36px',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    border: selectedSize === s ? '1px solid #ffffff' : '1px solid rgba(255,255,255,0.15)',
                    background: selectedSize === s ? '#ffffff' : 'transparent',
                    color: selectedSize === s ? '#000000' : '#a1a1aa',
                    cursor: 'pointer',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Number of Jerseys (Quantity Selector) */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#71717a', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
              NUMBER OF JERSEYS (QUANTITY)
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid rgba(255, 255, 255, 0.2)', background: '#090a0f' }}>
              <button
                type="button"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                style={{
                  width: '38px',
                  height: '36px',
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                disabled={quantity <= 1}
              >
                <Minus size={14} />
              </button>
              <div
                style={{
                  minWidth: '46px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  color: '#ffffff',
                }}
              >
                {quantity}
              </div>
              <button
                type="button"
                onClick={() => setQuantity((prev) => Math.min(jersey.stock || 10, prev + 1))}
                style={{
                  width: '38px',
                  height: '36px',
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                disabled={quantity >= (jersey.stock || 10)}
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Custom Name & Number Print Option (Admin Governed) */}
          {isCustomizable ? (
            <div
              style={{
                background: '#090a0f',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                padding: '0.85rem',
              }}
            >
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700, color: '#ffffff' }}>
                  <Sparkles size={14} color="#fbbf24" />
                  <span>CUSTOM NAME & NUMBER PRINT (+ NPR 350)</span>
                </div>
                <input
                  type="checkbox"
                  checked={enableCustomPrint}
                  onChange={(e) => setEnableCustomPrint(e.target.checked)}
                  style={{ accentColor: '#ffffff', cursor: 'pointer', width: '16px', height: '16px' }}
                />
              </label>

              {enableCustomPrint && (
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.5rem', marginTop: '0.75rem' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="PLAYER NAME (MAX 13)"
                    maxLength={13}
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value.toUpperCase())}
                    style={{ fontSize: '0.82rem', height: '38px', fontFamily: 'var(--font-mono)' }}
                  />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="NUMBER"
                    maxLength={2}
                    value={customNumber}
                    onChange={(e) => setCustomNumber(e.target.value.replace(/[^0-9]/g, ''))}
                    style={{ fontSize: '0.85rem', height: '38px', fontFamily: 'var(--font-mono)', textAlign: 'center' }}
                  />
                </div>
              )}
            </div>
          ) : (
            <div
              style={{
                background: 'rgba(239, 68, 68, 0.06)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                padding: '0.75rem 0.9rem',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
                fontSize: '0.74rem',
                color: '#fca5a5',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <Lock size={14} color="#ef4444" style={{ flexShrink: 0 }} />
              <span>
                CUSTOM PRINTING NOT AVAILABLE: This edition is a fixed player/archival collector release.
              </span>
            </div>
          )}

          {/* Add to Bag Action */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              id="confirm-quickview-add-to-cart-btn"
              onClick={handleAddToCart}
              className="btn btn-primary"
              style={{
                flex: 1,
                height: '48px',
                fontSize: '0.88rem',
                letterSpacing: '0.08em',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
              }}
            >
              <ShoppingBag size={17} />
              <span>ADD {quantity > 1 ? `${quantity} JERSEYS` : 'TO BAG'} // NPR {totalPrice.toLocaleString()}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

