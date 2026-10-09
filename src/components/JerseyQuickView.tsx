'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '../context/StoreContext';
import { JerseySize, Gender, JerseyColor } from '../types/jersey';
import { X, ShoppingBag, ShieldCheck, Truck, ArrowUpRight } from 'lucide-react';

export const JerseyQuickView: React.FC = () => {
  const { quickViewJersey, setQuickViewJersey, addToCart } = useStore();

  const jersey = quickViewJersey;

  const [selectedSize, setSelectedSize] = useState<JerseySize>(jersey?.sizes[0] || 'M');
  const [selectedGender, setSelectedGender] = useState<Gender>(jersey?.gender[0] || 'unisex');
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
      setSelectedGender(jersey.gender[0] || 'unisex');
      setSelectedColor(jersey.colors[0] || { name: 'Standard', hex: '#ffffff' });
      setActiveImage(jersey.image);
      setQuantity(1);
      setEnableCustomPrint(false);
      setCustomName('');
      setCustomNumber('');
    }
  }, [jersey]);

  if (!jersey) return null;

  const handleAddToCart = () => {
    const finalPrice = jersey.price + (enableCustomPrint ? 350 : 0);

    addToCart({
      jerseyId: jersey.id,
      jersey,
      selectedSize,
      selectedGender,
      selectedColor,
      customPrint: enableCustomPrint && customName.trim()
        ? {
            name: customName.toUpperCase().trim(),
            number: customNumber.trim() || '10',
          }
        : undefined,
      quantity,
      price: finalPrice,
    });

    setQuickViewJersey(null);
  };

  const imagesList = [jersey.image, ...(jersey.gallery || [])];

  return (
    <div
      id="quick-view-modal-backdrop"
      className="modal-overlay"
      onClick={() => setQuickViewJersey(null)}
      style={{ zIndex: 120 }}
    >
      <div
        id="quick-view-modal-content"
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '920px',
          padding: 0,
          background: '#050505',
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
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            cursor: 'pointer',
            zIndex: 30,
          }}
        >
          <X size={16} />
        </button>

        {/* Left Column: Media Preview */}
        <div
          style={{
            background: '#090909',
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
                height: '360px',
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
              {enableCustomPrint && customName && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0, 0, 0, 0.92)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#71717a', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    // CUSTOM BACK PRINT
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

          <div style={{ marginTop: '1.25rem', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: '#71717a', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#d4d4d8' }}>
              <ShieldCheck size={14} />
              <span>100% PLAYER SPECIFICATION GRADE</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Truck size={14} />
              <span>SAME-DAY KATHMANDU DISPATCH</span>
            </div>
          </div>
        </div>

        {/* Right Column: Specifications & Actions */}
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#71717a', letterSpacing: '0.1em', marginBottom: '0.35rem' }}>
              {jersey.sport} // {jersey.team}
            </div>

            <h2 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', textTransform: 'uppercase', lineHeight: 1.2, marginBottom: '0.35rem' }}>
              {jersey.title}
            </h2>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#a1a1aa' }}>
              {jersey.edition} // STOCK: {jersey.stock} UNITS
            </div>
          </div>

          {/* Pricing */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.85rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.85rem', fontWeight: 700, color: '#ffffff' }}>
              NPR {(jersey.price + (enableCustomPrint ? 350 : 0)).toLocaleString()}
            </span>
            {jersey.originalPrice && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: '#71717a', textDecoration: 'line-through' }}>
                NPR {jersey.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Gender / Fit Selector */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#71717a', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
              FIT SPECIFICATION
            </div>
            <div style={{ display: 'flex', gap: '0.45rem' }}>
              {jersey.gender.map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  style={{
                    padding: '0.45rem 0.85rem',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    border: selectedGender === g ? '1px solid #ffffff' : '1px solid rgba(255,255,255,0.15)',
                    background: selectedGender === g ? '#ffffff' : 'transparent',
                    color: selectedGender === g ? '#000000' : '#a1a1aa',
                    cursor: 'pointer',
                  }}
                >
                  {g}
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
                S: 36-38" | M: 38-40" | L: 40-42" | XL: 42-44" | XXL: 44-46"
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

          {/* Custom Name & Number Print Option */}
          <div
            style={{
              background: '#090909',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              padding: '0.85rem',
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700, color: '#ffffff' }}>
                CUSTOM NAME & NUMBER PRINT (+ NPR 350)
              </div>
              <input
                type="checkbox"
                checked={enableCustomPrint}
                onChange={(e) => setEnableCustomPrint(e.target.checked)}
                style={{ accentColor: '#ffffff', cursor: 'pointer' }}
              />
            </label>

            {enableCustomPrint && (
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.5rem', marginTop: '0.75rem' }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="NAME (MAX 13)"
                  maxLength={13}
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value.toUpperCase())}
                  style={{ fontSize: '0.82rem', height: '36px', fontFamily: 'var(--font-mono)' }}
                />
                <input
                  type="text"
                  className="form-input"
                  placeholder="NO."
                  maxLength={2}
                  value={customNumber}
                  onChange={(e) => setCustomNumber(e.target.value.replace(/[^0-9]/g, ''))}
                  style={{ fontSize: '0.85rem', height: '36px', fontFamily: 'var(--font-mono)', textAlign: 'center' }}
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              id="confirm-quickview-add-to-cart-btn"
              onClick={handleAddToCart}
              className="btn btn-primary"
              style={{
                flex: 1,
                height: '46px',
                fontSize: '0.85rem',
                letterSpacing: '0.08em',
              }}
            >
              <ShoppingBag size={16} />
              <span>ADD TO BAG // NPR {((jersey.price + (enableCustomPrint ? 350 : 0)) * quantity).toLocaleString()}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
