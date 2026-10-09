'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '../context/StoreContext';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    cartCount,
    setIsCheckoutOpen,
  } = useStore();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; error?: boolean } | null>(null);
  const [deliveryZone, setDeliveryZone] = useState<'ktm' | 'outside' | 'remote'>('ktm');

  if (!isCartOpen) return null;

  const deliveryFee =
    deliveryZone === 'ktm'
      ? 100
      : deliveryZone === 'outside'
      ? 150
      : 200;

  const discountAmount = Math.round((cartTotal * discountPercent) / 100);
  const finalTotal = Math.max(0, cartTotal - discountAmount + deliveryFee);

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'NEPAL10' || code === 'RHINOS10') {
      setDiscountPercent(10);
      setPromoMessage({ text: '10% DISCOUNT APPLIED' });
    } else if (code === 'ELITE15') {
      setDiscountPercent(15);
      setPromoMessage({ text: '15% VIP DISCOUNT APPLIED' });
    } else {
      setPromoMessage({ text: 'INVALID CODE (TRY NEPAL10)', error: true });
    }
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div
      id="cart-drawer-overlay"
      className="modal-overlay"
      onClick={() => setIsCartOpen(false)}
      style={{
        justifyContent: 'flex-end',
        padding: 0,
        zIndex: 130,
      }}
    >
      <div
        id="cart-drawer-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100vh',
          background: '#000000',
          borderLeft: '1px solid rgba(255, 255, 255, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-strong)',
          animation: 'slideInRight 0.25s ease-out',
        }}
      >
        <style>{`
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}</style>

        {/* Drawer Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#050505',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={18} color="#ffffff" />
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 800, letterSpacing: '0.08em', color: '#ffffff' }}>
              BAG [{cartCount}]
            </h3>
          </div>

          <button
            id="close-cart-drawer-btn"
            onClick={() => setIsCartOpen(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              padding: '0.25rem',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Dispatch Info Strip */}
        <div
          style={{
            background: '#080808',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '0.75rem 1.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            letterSpacing: '0.06em',
            color: '#a1a1aa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>EXPRESS DISPATCH</span>
          <span style={{ color: '#ffffff' }}>NEPAL • DUBAI • INDIA</span>
        </div>

        {/* Items List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {cart.length === 0 ? (
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: '#71717a',
                gap: '0.75rem',
              }}
            >
              <ShoppingBag size={28} />
              <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.85rem', color: '#ffffff' }}>
                YOUR BAG IS EMPTY
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                Explore the archive catalog to select your kit.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                id={`cart-item-${item.id}`}
                style={{
                  display: 'flex',
                  gap: '0.85rem',
                  padding: '0.85rem',
                  background: '#080808',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '68px',
                    height: '80px',
                    background: '#000000',
                    flexShrink: 0,
                  }}
                >
                  <Image src={item.jersey.image} alt={item.jersey.title} fill style={{ objectFit: 'cover' }} />
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: '#ffffff',
                        lineHeight: 1.3,
                        marginBottom: '0.2rem',
                      }}
                    >
                      {item.jersey.title}
                    </h4>

                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#71717a' }}>
                      SIZE: {item.selectedSize} // {item.selectedGender.toUpperCase()}
                    </div>

                    {item.customPrint && (
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          color: '#ffffff',
                          background: 'rgba(255, 255, 255, 0.1)',
                          padding: '0.15rem 0.4rem',
                          marginTop: '0.3rem',
                          display: 'inline-block',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                        }}
                      >
                        PRINT: {item.customPrint.name} #{item.customPrint.number}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        style={{ width: '22px', height: '22px', background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer' }}
                      >
                        -
                      </button>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, padding: '0 0.35rem' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        style={{ width: '22px', height: '22px', background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer' }}
                      >
                        +
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
                        NPR {(item.price * item.quantity).toLocaleString()}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{ background: 'transparent', border: 'none', color: '#71717a', cursor: 'pointer' }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              background: '#050505',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
            }}
          >
            {/* Delivery destination */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.35rem' }}>
              {[
                { id: 'ktm', label: 'KATHMANDU', fee: 'NPR 100' },
                { id: 'outside', label: 'OTHER CITIES', fee: 'NPR 150' },
                { id: 'remote', label: 'REGIONAL', fee: 'NPR 200' },
              ].map((z) => (
                <button
                  key={z.id}
                  onClick={() => setDeliveryZone(z.id as any)}
                  style={{
                    padding: '0.45rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    textAlign: 'center',
                    border: deliveryZone === z.id ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.15)',
                    background: deliveryZone === z.id ? '#ffffff' : 'transparent',
                    color: deliveryZone === z.id ? '#000000' : '#a1a1aa',
                    cursor: 'pointer',
                    fontWeight: 700,
                  }}
                >
                  <div>{z.label}</div>
                  <div>{z.fee}</div>
                </button>
              ))}
            </div>

            {/* Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#a1a1aa' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>SUBTOTAL:</span>
                <span style={{ color: '#ffffff' }}>NPR {cartTotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ffffff', fontWeight: 800, fontSize: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '0.5rem' }}>
                <span>TOTAL:</span>
                <span>NPR {finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              id="proceed-to-checkout-btn"
              onClick={handleCheckoutClick}
              className="btn btn-primary"
              style={{
                width: '100%',
                height: '46px',
                fontSize: '0.85rem',
                letterSpacing: '0.08em',
              }}
            >
              <span>PROCEED TO DISPATCH</span>
              <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
