'use client';

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, CheckCircle2, Truck } from 'lucide-react';

const NEPAL_CITIES = [
  'Kathmandu',
  'Lalitpur (Patan)',
  'Bhaktapur',
  'Pokhara',
  'Chitwan (Bharatpur / Narayangarh)',
  'Biratnagar',
  'Dharan',
  'Butwal',
  'Bhairahawa',
  'Hetauda',
  'Nepalgunj',
  'Other District (All Nepal)',
];

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, cartTotal, clearCart } = useStore();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(NEPAL_CITIES[0]);
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'esewa' | 'khalti' | 'fonepay'>('cod');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderCode = `ESH-NEP-${Math.floor(100000 + Math.random() * 900000)}`;
    setTrackingNumber(orderCode);
    setIsSubmitted(true);
    clearCart();
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setIsSubmitted(false);
  };

  return (
    <div
      id="checkout-modal-overlay"
      className="modal-overlay"
      onClick={handleClose}
      style={{ zIndex: 140 }}
    >
      <div
        id="checkout-modal-content"
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '640px',
          padding: '2.5rem',
          background: '#050505',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          position: 'relative',
        }}
      >
        <button
          id="close-checkout-btn"
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
          }}
        >
          <X size={18} />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <div style={{ marginBottom: '1.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '1rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.1em', color: '#71717a', textTransform: 'uppercase' }}>
                // ORDER DISPATCH // KATHMANDU
              </div>
              <h2 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.6rem', color: '#ffffff', textTransform: 'uppercase', marginTop: '0.2rem' }}>
                COMPLETE DISPATCH
              </h2>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#a1a1aa', marginTop: '0.25rem' }}>
                PAYABLE: NPR {cartTotal.toLocaleString()} // {cart.length} ITEMS
              </p>
            </div>

            <form onSubmit={handleSubmitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              {/* Recipient Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#71717a', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Puja Sharma"
                    className="form-input"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#71717a', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
                    CONTACT NUMBER *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="98XXXXXXXX"
                    className="form-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              {/* City & Address */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#71717a', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
                    DELIVERY ZONE (NEPAL) *
                  </label>
                  <select
                    className="form-input"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{ cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
                  >
                    {NEPAL_CITIES.map((c) => (
                      <option key={c} value={c} style={{ background: '#000000', color: '#ffffff' }}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#71717a', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
                    STREET ADDRESS / WARD *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="New Baneshwor, Ward 10"
                    className="form-input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#71717a', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                  PAYMENT METHOD
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem' }}>
                  {[
                    { id: 'cod', label: 'CASH ON DELIVERY (COD)', sub: 'Pay upon arrival at door' },
                    { id: 'esewa', label: 'ESEWA WALLET', sub: 'Instant Digital Wallet' },
                    { id: 'khalti', label: 'KHALTI WALLET', sub: 'Instant Scan & Pay' },
                    { id: 'fonepay', label: 'FONEPAY / BANK QR', sub: 'All Nepali Banks' },
                  ].map((pm) => {
                    const sel = paymentMethod === pm.id;
                    return (
                      <div
                        key={pm.id}
                        onClick={() => setPaymentMethod(pm.id as any)}
                        style={{
                          padding: '0.75rem',
                          border: sel ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.15)',
                          background: sel ? '#ffffff' : 'transparent',
                          color: sel ? '#000000' : '#ffffff',
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800 }}>
                          {pm.label}
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: sel ? '#3f3f46' : '#71717a', marginTop: '0.2rem' }}>
                          {pm.sub}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                id="place-order-confirm-btn"
                className="btn btn-primary"
                style={{
                  width: '100%',
                  height: '48px',
                  fontSize: '0.85rem',
                  letterSpacing: '0.08em',
                  marginTop: '0.5rem',
                }}
              >
                <span>CONFIRM DISPATCH // NPR {cartTotal.toLocaleString()}</span>
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                border: '1px solid #ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
                color: '#ffffff',
              }}
            >
              <CheckCircle2 size={32} />
            </div>

            <h2 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.5rem', color: '#ffffff', textTransform: 'uppercase' }}>
              DISPATCH CONFIRMED
            </h2>
            <p style={{ fontFamily: 'var(--font-mono)', color: '#a1a1aa', fontSize: '0.8rem', marginTop: '0.35rem', marginBottom: '1.5rem' }}>
              Your official kit has been routed to our packing station in Kathmandu.
            </p>

            <div
              style={{
                background: '#090909',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '1.25rem',
                maxWidth: '420px',
                margin: '0 auto 1.5rem auto',
                textAlign: 'left',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#71717a' }}>TRACKING CODE:</span>
                <strong style={{ color: '#ffffff' }}>{trackingNumber}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#71717a' }}>RECIPIENT:</span>
                <span style={{ color: '#ffffff' }}>{fullName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#71717a' }}>DESTINATION:</span>
                <span style={{ color: '#ffffff' }}>{city}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#71717a' }}>PAYMENT:</span>
                <span style={{ color: '#ffffff', textTransform: 'uppercase' }}>{paymentMethod}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="btn btn-primary"
              style={{ minWidth: '180px' }}
            >
              RETURN TO CATALOG
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
