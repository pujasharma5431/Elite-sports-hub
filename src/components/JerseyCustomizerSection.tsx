'use client';

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Check, Sparkles, Shirt } from 'lucide-react';
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
    name: 'Nepal Rhinos T20 World Cup Kit',
    sport: 'Cricket',
    team: 'Nepal National Cricket Team',
    defaultNum: '17',
    defaultName: 'PAUDEL',
    jerseyId: 'nep-cric-rohit-17',
    price: 3200,
  },
  {
    id: 'india-champions-custom',
    name: 'Team India T20 Champions Kit',
    sport: 'Cricket',
    team: 'Team India',
    defaultNum: '18',
    defaultName: 'KOHLI',
    jerseyId: 'ind-cric-kohli-18',
    price: 3850,
  },
  {
    id: 'argentina-3star-custom',
    name: 'Argentina 3-Star World Cup Edition',
    sport: 'Football',
    team: 'Argentina',
    defaultNum: '10',
    defaultName: 'MESSI',
    jerseyId: 'ltd-messi-wc-final',
    price: 8999,
  },
  {
    id: 'real-madrid-custom',
    name: 'Real Madrid 2024/25 Home Kit',
    sport: 'Football',
    team: 'Real Madrid',
    defaultNum: '09',
    defaultName: 'MBAPPE',
    jerseyId: 'foot-rm-mbappe-9',
    price: 4200,
  },
  {
    id: 'portugal-cr7-custom',
    name: 'Portugal Euro 2024 Heritage Kit',
    sport: 'Football',
    team: 'Portugal',
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
  const [printColor, setPrintColor] = useState<'#ffffff' | '#f59e0b' | '#ef4444'>('#ffffff');
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
    setTimeout(() => setIsAdded(false), 2200);
  };

  return (
    <section
      id="customizer-section"
      style={{
        position: 'relative',
        background: '#090a0f',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '5rem 0',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '3rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#f87171',
              padding: '0.3rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              marginBottom: '0.75rem',
            }}
          >
            <Sparkles size={13} />
            <span>Official Heat-Press Printing Studio</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-primary)',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              lineHeight: 1.15,
              fontWeight: 800,
              letterSpacing: '-0.025em',
              color: '#ffffff',
            }}
          >
            Personalize Your Jersey
          </h2>

          <p style={{ fontSize: '0.95rem', color: '#94a3b8', maxWidth: '580px', marginTop: '0.5rem', lineHeight: 1.5 }}>
            Official thermal-pressed tournament lettering applied at our Kathmandu workshop. Select any kit, input your name and squad number, and preview in real time.
          </p>
        </div>

        {/* 2-Column Customizer Workspace */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 1.1fr) minmax(320px, 1fr)',
            gap: '3.5rem',
            alignItems: 'center',
          }}
          className="customizer-grid"
        >
          {/* Left: Jersey Back Simulator */}
          <div
            style={{
              position: 'relative',
              height: '520px',
              background: 'linear-gradient(180deg, #0e1118 0%, #131722 100%)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2.5rem',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
            }}
          >
            {/* Subtle Grid Blueprint */}
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

            {/* Print Color Selector Pills */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(8px)',
                padding: '0.35rem 0.65rem',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                zIndex: 5,
              }}
            >
              <span style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 600 }}>Print Color:</span>
              {[
                { hex: '#ffffff', label: 'White' },
                { hex: '#f59e0b', label: 'Gold' },
                { hex: '#ef4444', label: 'Crimson' },
              ].map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setPrintColor(c.hex as any)}
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: c.hex,
                    border: printColor === c.hex ? '2px solid #ffffff' : '1px solid rgba(255,255,255,0.3)',
                    cursor: 'pointer',
                    transform: printColor === c.hex ? 'scale(1.2)' : 'scale(1)',
                    transition: 'transform 0.15s ease',
                  }}
                  title={c.label}
                />
              ))}
            </div>

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
                  fontSize: '0.72rem',
                  letterSpacing: '0.15em',
                  color: '#64748b',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                  fontWeight: 700,
                }}
              >
                // Live Back-Print Preview
              </div>

              {/* Rendered Back Name */}
              <div
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
                  lineHeight: 1,
                  fontWeight: 900,
                  letterSpacing: '0.12em',
                  color: printColor,
                  textTransform: 'uppercase',
                  transition: 'all 0.15s ease',
                  textShadow: '0 4px 15px rgba(0, 0, 0, 0.8)',
                }}
              >
                {customName.toUpperCase() || 'YOUR NAME'}
              </div>

              {/* Rendered Back Number */}
              <div
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'clamp(6.5rem, 12vw, 9.5rem)',
                  lineHeight: 0.85,
                  fontWeight: 900,
                  color: printColor,
                  letterSpacing: '-0.03em',
                  marginTop: '0.6rem',
                  transition: 'all 0.15s ease',
                  textShadow: '0 10px 30px rgba(0, 0, 0, 0.9)',
                }}
              >
                {customNumber || '10'}
              </div>

              {/* Spec Tag */}
              <div
                style={{
                  marginTop: '2rem',
                  fontSize: '0.75rem',
                  color: '#cbd5e1',
                  background: 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '9999px',
                  padding: '0.35rem 1rem',
                  fontWeight: 600,
                }}
              >
                {selectedPreset.name} • Size {selectedSize} • {selectedGender === 'men' ? "Men's Fit" : selectedGender === 'women' ? "Women's Fit" : 'Unisex Fit'}
              </div>
            </div>
          </div>

          {/* Right: Customization Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Step 1: Select Kit Preset */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
                01. Select Jersey Base
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
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
                        padding: '0.7rem 1rem',
                        borderRadius: '8px',
                        border: isSel ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.1)',
                        background: isSel ? '#ffffff' : 'rgba(255, 255, 255, 0.03)',
                        color: isSel ? '#08090d' : '#e2e8f0',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'var(--transition)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Shirt size={15} color={isSel ? '#08090d' : '#94a3b8'} />
                        <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                          {kit.name}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                        रू {kit.price.toLocaleString()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Custom Name & Number */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
                02. Input Squad Name & Number
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
                      height: '44px',
                      fontSize: '0.95rem',
                      letterSpacing: '0.08em',
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
                      height: '44px',
                      fontSize: '1.05rem',
                      fontWeight: 800,
                      textAlign: 'center',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Size & Fit */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
                03. Choose Size & Fit
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.6rem' }}>
                {(['S', 'M', 'L', 'XL', 'XXL'] as JerseySize[]).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    style={{
                      flex: 1,
                      height: '38px',
                      borderRadius: '6px',
                      border: selectedSize === sz ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.1)',
                      background: selectedSize === sz ? '#ffffff' : 'rgba(255, 255, 255, 0.04)',
                      color: selectedSize === sz ? '#08090d' : '#cbd5e1',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      transition: 'var(--transition)',
                    }}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[
                  { id: 'men', label: "Men's Fit" },
                  { id: 'women', label: "Women's Fit" },
                  { id: 'unisex', label: 'Unisex Fit' },
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGender(g.id as any)}
                    style={{
                      flex: 1,
                      height: '34px',
                      borderRadius: '6px',
                      border: selectedGender === g.id ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.1)',
                      background: selectedGender === g.id ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                      color: selectedGender === g.id ? '#ffffff' : '#94a3b8',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price & Add to Bag */}
            <div
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                  Total with Thermal Pressing:
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff' }}>
                  रू {(selectedPreset.price + 350).toLocaleString()}
                </div>
              </div>

              <button
                id="add-custom-jersey-to-bag-btn"
                onClick={handleAddCustomToBag}
                className="btn btn-primary"
                style={{
                  height: '46px',
                  padding: '0 1.6rem',
                  fontSize: '0.88rem',
                }}
              >
                {isAdded ? (
                  <>
                    <Check size={16} color="#10b981" />
                    <span>Added to Bag ✓</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    <span>Add Custom Kit</span>
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
