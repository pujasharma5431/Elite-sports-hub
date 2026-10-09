'use client';

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Check } from 'lucide-react';
import { JerseySize, Gender } from '../types/jersey';

interface KitPreset {
  id: string;
  name: string;
  sport: string;
  team: string;
  defaultNum: string;
  defaultName: string;
  jerseyId: string;
  price: number;
}

const PRESETS: KitPreset[] = [
  {
    id: 'nepal-rhinos-custom',
    name: 'NEPAL RHINOS T20 WORLD CUP',
    sport: 'CRICKET',
    team: 'NEPAL NATIONAL CRICKET TEAM',
    defaultNum: '17',
    defaultName: 'PAUDEL',
    jerseyId: 'nep-cric-rohit-17',
    price: 3200,
  },
  {
    id: 'india-champions-custom',
    name: 'TEAM INDIA T20 CHAMPIONS',
    sport: 'CRICKET',
    team: 'TEAM INDIA',
    defaultNum: '18',
    defaultName: 'KOHLI',
    jerseyId: 'ind-cric-kohli-18',
    price: 3850,
  },
  {
    id: 'argentina-3star-custom',
    name: 'ARGENTINA 3-STAR WORLD CUP',
    sport: 'FOOTBALL',
    team: 'ARGENTINA',
    defaultNum: '10',
    defaultName: 'MESSI',
    jerseyId: 'ltd-messi-wc-final',
    price: 8999,
  },
  {
    id: 'real-madrid-custom',
    name: 'REAL MADRID 2024/25 HOME',
    sport: 'FOOTBALL',
    team: 'REAL MADRID',
    defaultNum: '09',
    defaultName: 'MBAPPE',
    jerseyId: 'foot-rm-mbappe-9',
    price: 4200,
  },
  {
    id: 'portugal-cr7-custom',
    name: 'PORTUGAL EURO 2024 HERITAGE',
    sport: 'FOOTBALL',
    team: 'PORTUGAL',
    defaultNum: '07',
    defaultName: 'RONALDO',
    jerseyId: 'foot-por-ronaldo-7',
    price: 4600,
  },
];

export const JerseyCustomizerSection: React.FC = () => {
  const { jerseys, addToCart } = useStore();
  const [selectedPreset, setSelectedPreset] = useState<KitPreset>(PRESETS[0]);
  const [customName, setCustomName] = useState('SHARMA');
  const [customNumber, setCustomNumber] = useState('10');
  const [selectedSize, setSelectedSize] = useState<JerseySize>('L');
  const [selectedGender, setSelectedGender] = useState<Gender>('men');
  const [isAdded, setIsAdded] = useState(false);

  const matchedJersey = jerseys.find((j) => j.id === selectedPreset.jerseyId) || jerseys[0];

  const handleAddCustomToBag = () => {
    const finalPrice = selectedPreset.price + 350;
    addToCart({
      jerseyId: matchedJersey.id,
      jersey: matchedJersey,
      selectedSize,
      selectedGender,
      selectedColor: matchedJersey.colors[0] || { name: 'Standard', hex: '#ffffff' },
      customPrint: {
        name: customName.toUpperCase().trim() || 'CUSTOM',
        number: customNumber.trim() || '10',
      },
      quantity: 1,
      price: finalPrice,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section
      id="customizer-studio"
      style={{
        position: 'relative',
        background: '#000000',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '5rem 0',
      }}
    >
      <div className="container">
        {/* Monochromatic Section Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '3.5rem' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.15em',
              color: '#a1a1aa',
              textTransform: 'uppercase',
              marginBottom: '0.4rem',
            }}
          >
            CUSTOM STUDIO // ARCHIVE PRINTING
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-primary)',
              fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
              lineHeight: 0.95,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: '#ffffff',
            }}
          >
            CUSTOM NAME & NUMBER
          </h2>

          <p style={{ fontSize: '0.9rem', color: '#71717a', maxWidth: '520px', marginTop: '0.5rem' }}>
            Official thermal-pressed tournament lettering applied in Kathmandu. Clean, stark, and permanent.
          </p>
        </div>

        {/* 2-Column Customizer Workspace */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 1.1fr) minmax(320px, 1fr)',
            gap: '4rem',
            alignItems: 'center',
          }}
          className="customizer-grid"
        >
          {/* Left: Minimalist Stark Jersey Back Simulator */}
          <div
            style={{
              position: 'relative',
              height: '520px',
              background: '#090909',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2.5rem',
            }}
          >
            {/* Subtle Grid Watermark */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                pointerEvents: 'none',
              }}
            />

            <div
              style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.2em',
                  color: '#71717a',
                  textTransform: 'uppercase',
                  marginBottom: '1.25rem',
                }}
              >
                // BACK PRINT SIMULATION
              </div>

              {/* Rendered Back Name */}
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                  lineHeight: 1,
                  fontWeight: 800,
                  letterSpacing: '0.2em',
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  transition: 'all 0.15s ease',
                }}
              >
                {customName.toUpperCase() || 'YOUR NAME'}
              </div>

              {/* Rendered Back Number */}
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(6.5rem, 13vw, 10rem)',
                  lineHeight: 0.85,
                  fontWeight: 900,
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                  marginTop: '0.5rem',
                  transition: 'all 0.15s ease',
                }}
              >
                {customNumber || '10'}
              </div>

              {/* Monospaced Spec Tag */}
              <div
                style={{
                  marginTop: '2rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  color: '#a1a1aa',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  padding: '0.35rem 0.85rem',
                }}
              >
                {selectedPreset.name} // SIZE: {selectedSize} // {selectedGender.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Right: Architectural Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {/* Step 1: Select Kit Preset */}
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: '#a1a1aa', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                01 // SELECT OFFICIAL KIT BASE
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {PRESETS.map((kit) => {
                  const isSel = selectedPreset.id === kit.id;
                  return (
                    <button
                      key={kit.id}
                      onClick={() => {
                        setSelectedPreset(kit);
                        setCustomName(kit.defaultName);
                        setCustomNumber(kit.defaultNum);
                      }}
                      style={{
                        padding: '0.65rem 0.85rem',
                        border: isSel ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.1)',
                        background: isSel ? '#ffffff' : 'transparent',
                        color: isSel ? '#000000' : '#a1a1aa',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'var(--transition)',
                      }}
                    >
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700 }}>
                        {kit.name}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
                        NPR {kit.price.toLocaleString()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Custom Name & Number */}
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: '#a1a1aa', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                02 // INPUT NAME & NUMBER
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.75rem' }}>
                <div>
                  <input
                    type="text"
                    maxLength={13}
                    placeholder="NAME (MAX 13)"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value.toUpperCase())}
                    className="form-input"
                    style={{
                      height: '46px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1rem',
                      letterSpacing: '0.15em',
                      fontWeight: 700,
                    }}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    maxLength={2}
                    placeholder="NO."
                    value={customNumber}
                    onChange={(e) => setCustomNumber(e.target.value.replace(/[^0-9]/g, ''))}
                    className="form-input"
                    style={{
                      height: '46px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      textAlign: 'center',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Size & Fit */}
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: '#a1a1aa', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                03 // SPECIFY SIZE & FIT
              </label>
              <div style={{ display: 'flex', gap: '0.45rem', marginBottom: '0.6rem' }}>
                {(['S', 'M', 'L', 'XL', 'XXL'] as JerseySize[]).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    style={{
                      flex: 1,
                      height: '38px',
                      border: selectedSize === sz ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.1)',
                      background: selectedSize === sz ? '#ffffff' : 'transparent',
                      color: selectedSize === sz ? '#000000' : '#a1a1aa',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                    }}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.45rem' }}>
                {[
                  { id: 'men', label: "MEN'S" },
                  { id: 'women', label: "WOMEN'S" },
                  { id: 'unisex', label: 'UNISEX' },
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGender(g.id as any)}
                    style={{
                      flex: 1,
                      height: '34px',
                      border: selectedGender === g.id ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.1)',
                      background: selectedGender === g.id ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                      color: selectedGender === g.id ? '#ffffff' : '#71717a',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price & Action */}
            <div
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                paddingTop: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#71717a' }}>
                  TOTAL INCL. CUSTOM PRINTING:
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.75rem', fontWeight: 700, color: '#ffffff' }}>
                  NPR {(selectedPreset.price + 350).toLocaleString()}
                </div>
              </div>

              <button
                id="add-custom-jersey-to-bag-btn"
                onClick={handleAddCustomToBag}
                className="btn btn-primary"
                style={{
                  height: '48px',
                  padding: '0 2rem',
                  fontSize: '0.82rem',
                  letterSpacing: '0.08em',
                }}
              >
                {isAdded ? (
                  <>
                    <Check size={16} />
                    <span>ADDED TO BAG</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    <span>ADD CUSTOM KIT</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
