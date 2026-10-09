'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '../context/StoreContext';
import { OrderStatus } from '../types/jersey';
import { X, Search, CheckCircle2, Package, Truck, Clock, ShieldCheck, MapPin } from 'lucide-react';

const STATUS_STEPS: { id: OrderStatus; label: string; desc: string }[] = [
  { id: 'Order Received', label: 'Order Received', desc: 'Order request received & logged' },
  { id: 'Packed', label: 'Packed', desc: 'Quality checked & heat-pressed in Kathmandu vault' },
  { id: 'Dispatched', label: 'Dispatched', desc: 'En route with courier / air cargo' },
  { id: 'Delivered', label: 'Delivered', desc: 'Package received by customer' },
];

export const OrderTrackerModal: React.FC = () => {
  const { isTrackerOpen, setIsTrackerOpen, trackingOrderCode, setTrackingOrderCode, orders } = useStore();
  const [searchInput, setSearchInput] = useState(trackingOrderCode || '');
  const [hasSearched, setHasSearched] = useState(false);

  // Sync state if trackingOrderCode is set from external action
  React.useEffect(() => {
    if (trackingOrderCode) {
      setSearchInput(trackingOrderCode);
      setHasSearched(true);
    }
  }, [trackingOrderCode]);

  if (!isTrackerOpen) return null;

  const currentQuery = (searchInput || trackingOrderCode).trim().toUpperCase();

  const foundOrder = orders.find(
    (o) =>
      o.id.toUpperCase() === currentQuery ||
      o.phone.replace(/[^0-9]/g, '').includes(searchInput.replace(/[^0-9]/g, ''))
  );

  const getStepStatus = (stepId: OrderStatus, currentStatus: OrderStatus) => {
    const order = ['Order Received', 'Packed', 'Dispatched', 'Delivered'];
    const stepIdx = order.indexOf(stepId);
    const currIdx = order.indexOf(currentStatus);
    if (currIdx > stepIdx) return 'completed';
    if (currIdx === stepIdx) return 'current';
    return 'upcoming';
  };

  return (
    <div
      id="order-tracker-overlay"
      className="modal-overlay"
      onClick={() => setIsTrackerOpen(false)}
      style={{ zIndex: 150 }}
    >
      <div
        id="order-tracker-content"
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '680px',
          width: '95vw',
          maxHeight: '90vh',
          padding: '2rem',
          background: '#07080b',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          overflowY: 'auto',
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsTrackerOpen(false)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            padding: '4px',
          }}
          aria-label="Close Tracker"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#71717a', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            // LOGISTICS & DISPATCH LOOKUP
          </div>
          <h2 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', textTransform: 'uppercase', marginTop: '0.2rem' }}>
            Track Your Jersey Order
          </h2>
          <p style={{ fontSize: '0.8rem', color: '#a1a1aa', marginTop: '0.25rem' }}>
            Enter your order tracking code (e.g. <span style={{ color: '#ffffff', fontFamily: 'monospace' }}>ESH-89241</span>) or contact phone number to view live parcel status.
          </p>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setHasSearched(true);
          }}
          style={{ display: 'flex', gap: '0.5rem' }}
        >
          <input
            type="text"
            required
            placeholder="Order Code (ESH-XXXXX) or Phone (98XXXXXXXX)..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="form-input"
            style={{ height: '44px', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}
          />
          <button
            type="submit"
            className="btn btn-primary"
            style={{ height: '44px', padding: '0 1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Search size={16} />
            <span>Search</span>
          </button>
        </form>

        {/* Found Order Results */}
        {foundOrder ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Order Summary Header */}
            <div
              style={{
                background: '#0d0f15',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                padding: '1.15rem',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem',
              }}
            >
              <div>
                <div style={{ fontSize: '0.68rem', color: '#71717a', fontFamily: 'var(--font-mono)' }}>
                  ORDER ID
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                  {foundOrder.id}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#a1a1aa', marginTop: '0.15rem' }}>
                  Recipient: <strong style={{ color: '#ffffff' }}>{foundOrder.customerName}</strong> ({foundOrder.phone})
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.68rem', color: '#71717a', fontFamily: 'var(--font-mono)' }}>
                  PAYABLE AMOUNT
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                  NPR {foundOrder.totalAmount.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#a1a1aa', textTransform: 'uppercase', marginTop: '0.15rem' }}>
                  {foundOrder.paymentMethod.replace('_', ' ')}
                </div>
              </div>
            </div>

            {/* 4-Step Visual Progress Bar */}
            <div
              style={{
                background: '#0b0d12',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '1.25rem',
              }}
            >
              <div style={{ fontSize: '0.72rem', color: '#71717a', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', marginBottom: '1rem', textTransform: 'uppercase' }}>
                LIVE DISPATCH STATUS: <span style={{ color: '#ffffff', fontWeight: 700 }}>{foundOrder.status}</span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '0.5rem',
                  position: 'relative',
                }}
              >
                {STATUS_STEPS.map((step, idx) => {
                  const state = getStepStatus(step.id, foundOrder.status);
                  const isDone = state === 'completed';
                  const isCurrent = state === 'current';

                  return (
                    <div
                      key={step.id}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        gap: '0.35rem',
                      }}
                    >
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: isDone ? '#ffffff' : isCurrent ? '#10b981' : '#1e293b',
                          color: isDone ? '#000000' : isCurrent ? '#000000' : '#64748b',
                          fontWeight: 800,
                          fontSize: '0.8rem',
                          border: isCurrent ? '2px solid #34d399' : 'none',
                        }}
                      >
                        {isDone ? <CheckCircle2 size={16} /> : idx + 1}
                      </div>

                      <div
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: isDone || isCurrent ? '#ffffff' : '#64748b',
                          fontFamily: 'var(--font-mono)',
                          textTransform: 'uppercase',
                        }}
                      >
                        {step.label}
                      </div>

                      <div style={{ fontSize: '0.65rem', color: '#71717a', lineHeight: 1.2 }}>
                        {step.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Destination Info */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '0.85rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                fontSize: '0.78rem',
                color: '#cbd5e1',
              }}
            >
              <MapPin size={16} color="#f87171" style={{ flexShrink: 0 }} />
              <div>
                <strong>Destination:</strong> {foundOrder.country} • {foundOrder.region} • {foundOrder.address}
              </div>
            </div>

            {/* Items List With Thumbnail Images */}
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#71717a', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                ITEMS IN THIS SHIPMENT ({foundOrder.items.length})
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {foundOrder.items.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      background: '#0d0f15',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      padding: '0.75rem',
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        width: '54px',
                        height: '62px',
                        overflow: 'hidden',
                        background: '#000000',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={item.jersey.image}
                        alt={item.jersey.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>
                        {item.jersey.title}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#a1a1aa', fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>
                        Fit: <strong style={{ color: '#ffffff' }}>{item.selectedGender.toUpperCase()}</strong> • Size: <strong style={{ color: '#ffffff' }}>{item.selectedSize}</strong> • Qty: <strong style={{ color: '#ffffff' }}>{item.quantity}</strong>
                      </div>
                      {item.customPrint && (
                        <div style={{ fontSize: '0.7rem', color: '#fbbf24', fontFamily: 'var(--font-mono)', marginTop: '0.15rem' }}>
                          ⚡ Heat-Press: {item.customPrint.name} #{item.customPrint.number}
                        </div>
                      )}
                    </div>

                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', fontWeight: 700, color: '#ffffff', textAlign: 'right', flexShrink: 0 }}>
                      NPR {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : hasSearched ? (
          <div
            style={{
              padding: '2rem 1rem',
              textAlign: 'center',
              background: '#0d0f15',
              border: '1px dashed rgba(255, 255, 255, 0.15)',
            }}
          >
            <div style={{ color: '#ef4444', fontWeight: 700, marginBottom: '0.35rem' }}>
              No order found for "{searchInput}"
            </div>
            <p style={{ fontSize: '0.78rem', color: '#a1a1aa' }}>
              Please verify your tracking code or phone number. Sample demo orders you can test: <br />
              <button
                onClick={() => setSearchInput('ESH-89241')}
                style={{ background: 'transparent', border: 'none', color: '#ffffff', textDecoration: 'underline', cursor: 'pointer', fontFamily: 'monospace', margin: '0.25rem 0.5rem' }}
              >
                ESH-89241
              </button>
              •
              <button
                onClick={() => setSearchInput('ESH-92015')}
                style={{ background: 'transparent', border: 'none', color: '#ffffff', textDecoration: 'underline', cursor: 'pointer', fontFamily: 'monospace', margin: '0.25rem 0.5rem' }}
              >
                ESH-92015
              </button>
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
