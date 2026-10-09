'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '../context/StoreContext';
import { X, CheckCircle2, MessageSquare, MapPin, CreditCard, ShieldCheck } from 'lucide-react';
import { Order } from '../types/jersey';

// Country & Dependent Region definitions
const NEPAL_DISTRICTS = [
  'Kathmandu Valley (Same-Day Dispatch)',
  'Lalitpur (Patan)',
  'Bhaktapur',
  'Kaski (Pokhara)',
  'Chitwan (Bharatpur / Narayangarh)',
  'Morang (Biratnagar)',
  'Sunsari (Dharan / Itahari)',
  'Rupandehi (Butwal / Bhairahawa)',
  'Banke (Nepalgunj)',
  'Jhapa (Birtamod / Damak)',
  'Parsa (Birgunj)',
  'Kailali (Dhangadhi)',
  'Makwanpur (Hetauda)',
  'Kavre (Dhulikhel / Banepa)',
  'All Other Nepal Districts (77 Districts Courier)',
];

const UAE_REGIONS = [
  'Dubai (Downtown / Marina / JBR / Deira)',
  'Abu Dhabi',
  'Sharjah',
  'Ajman',
  'Ras Al Khaimah',
  'Fujairah',
  'Umm Al Quwain',
];

const INDIA_REGIONS = [
  'Delhi NCR',
  'Maharashtra (Mumbai / Pune)',
  'Karnataka (Bengaluru)',
  'West Bengal (Kolkata)',
  'Punjab (Chandigarh / Amritsar)',
  'Tamil Nadu (Chennai)',
  'Uttar Pradesh (Noida / Lucknow)',
  'Gujarat (Ahmedabad / Surat)',
  'Telangana (Hyderabad)',
  'Other State / City in India',
];

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    clearCart,
    placeOrder,
    adminWhatsAppNumber,
    setIsTrackerOpen,
    setTrackingOrderCode,
  } = useStore();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<'Nepal' | 'UAE' | 'India'>('Nepal');
  const [selectedRegion, setSelectedRegion] = useState(NEPAL_DISTRICTS[0]);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'esewa' | 'khalti' | 'bank_transfer'>('cod');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (!isCheckoutOpen) return null;

  // Handle Country switch and update default region
  const handleCountryChange = (country: 'Nepal' | 'UAE' | 'India') => {
    setSelectedCountry(country);
    if (country === 'Nepal') setSelectedRegion(NEPAL_DISTRICTS[0]);
    if (country === 'UAE') setSelectedRegion(UAE_REGIONS[0]);
    if (country === 'India') setSelectedRegion(INDIA_REGIONS[0]);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    // Save order into StoreContext
    const created = placeOrder({
      customerName: fullName,
      phone,
      country: selectedCountry,
      region: selectedRegion,
      address,
      items: [...cart],
      totalAmount: cartTotal,
      paymentMethod,
    });

    setConfirmedOrder(created);
    clearCart();

    // Prepare WhatsApp Message
    const itemsText = cart
      .map(
        (it, idx) =>
          `${idx + 1}. *${it.jersey.title}*\n   • Fit: ${it.selectedGender.toUpperCase()} | Size: ${it.selectedSize} | Qty: ${it.quantity}\n   ${
            it.customPrint ? `• Custom Heat-Press: ${it.customPrint.name} #${it.customPrint.number}\n` : ''
          }   • Price: NPR ${(it.price * it.quantity).toLocaleString()}`
      )
      .join('\n');

    const paymentLabel =
      paymentMethod === 'cod'
        ? 'Cash on Delivery (COD)'
        : paymentMethod === 'esewa'
        ? 'eSewa Digital Wallet'
        : paymentMethod === 'khalti'
        ? 'Khalti Digital Wallet'
        : 'Bank Transfer';

    const waMessage = `*ELITE SPORTS HUB — NEW ORDER REQUEST*
📦 *Order Code:* #${created.id}
👤 *Customer:* ${fullName}
📱 *Contact Phone:* ${phone}
📍 *Delivery Destination:* ${selectedCountry} > ${selectedRegion}
🏠 *Street Address:* ${address}
💳 *Payment Chosen:* ${paymentLabel}
💰 *Total Payable:* NPR ${cartTotal.toLocaleString()}

*Items Requested:*
${itemsText}

Please confirm my dispatch and delivery timeline! Thank you!`;

    const cleanWaNum = (adminWhatsAppNumber || '9779801234567').replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanWaNum}?text=${encodeURIComponent(waMessage)}`;

    // Open WhatsApp in new tab automatically
    try {
      window.open(waUrl, '_blank');
    } catch (err) {
      console.log('WhatsApp popup blocked or unsupported:', err);
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setConfirmedOrder(null);
  };

  // Build WhatsApp URL for confirmation view button
  const getWhatsAppUrl = (order: Order) => {
    const itemsText = order.items
      .map(
        (it, idx) =>
          `${idx + 1}. *${it.jersey.title}* (${it.selectedGender.toUpperCase()} - Size ${it.selectedSize} - Qty ${it.quantity})`
      )
      .join('\n');

    const text = `*ELITE SPORTS HUB ORDER #${order.id}*\nCustomer: ${order.customerName} (${order.phone})\nDestination: ${order.country} > ${order.region}\nPayment: ${order.paymentMethod.toUpperCase()}\nTotal: NPR ${order.totalAmount.toLocaleString()}\n\nItems:\n${itemsText}`;
    const cleanWaNum = (adminWhatsAppNumber || '9779801234567').replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanWaNum}?text=${encodeURIComponent(text)}`;
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
          maxWidth: '680px',
          width: '95vw',
          maxHeight: '92vh',
          padding: '2.25rem',
          background: '#07080b',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          position: 'relative',
          overflowY: 'auto',
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

        {!confirmedOrder ? (
          <div>
            {/* Header */}
            <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '1rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.1em', color: '#71717a', textTransform: 'uppercase' }}>
                // OFFICIAL MATCH KIT DISPATCH REQUEST
              </div>
              <h2 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.55rem', color: '#ffffff', textTransform: 'uppercase', marginTop: '0.2rem' }}>
                Order Request & Dispatch
              </h2>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#a1a1aa', marginTop: '0.25rem' }}>
                TOTAL PAYABLE: NPR {cartTotal.toLocaleString()} // {cart.length} ITEMS SELECTED
              </p>
            </div>

            <form onSubmit={handleSubmitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Recipient Details */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#a1a1aa', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Puja Sharma"
                    className="form-input"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#a1a1aa', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
                    CONTACT NUMBER (PHONE / WHATSAPP) *
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

              {/* STEP 1: Select Country First */}
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#ffffff', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                  STEP 1: SELECT YOUR DESTINATION COUNTRY *
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                  {(['Nepal', 'UAE', 'India'] as const).map((country) => {
                    const isSelected = selectedCountry === country;
                    const flag = country === 'Nepal' ? '🇳🇵' : country === 'UAE' ? '🇦🇪' : '🇮🇳';
                    const label = country === 'Nepal' ? 'Nepal (77 D.)' : country === 'UAE' ? 'Dubai / UAE' : 'India';

                    return (
                      <button
                        key={country}
                        type="button"
                        onClick={() => handleCountryChange(country)}
                        style={{
                          padding: '0.65rem 0.5rem',
                          border: isSelected ? '2px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.15)',
                          background: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.03)',
                          color: isSelected ? '#000000' : '#d4d4d8',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.4rem',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <span>{flag}</span>
                        <span>{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 2: Dependent Region / District Selection */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#ffffff', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
                    {selectedCountry === 'Nepal' ? 'DISTRICT / VALLEY ZONE *' : selectedCountry === 'UAE' ? 'EMIRATE *' : 'STATE / PROVINCE *'}
                  </label>
                  <select
                    className="form-input"
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    style={{ cursor: 'pointer', fontFamily: 'var(--font-mono)', height: '42px' }}
                  >
                    {selectedCountry === 'Nepal' &&
                      NEPAL_DISTRICTS.map((d) => (
                        <option key={d} value={d} style={{ background: '#000000', color: '#ffffff' }}>
                          {d}
                        </option>
                      ))}
                    {selectedCountry === 'UAE' &&
                      UAE_REGIONS.map((r) => (
                        <option key={r} value={r} style={{ background: '#000000', color: '#ffffff' }}>
                          {r}
                        </option>
                      ))}
                    {selectedCountry === 'India' &&
                      INDIA_REGIONS.map((s) => (
                        <option key={s} value={s} style={{ background: '#000000', color: '#ffffff' }}>
                          {s}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#a1a1aa', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
                    STREET ADDRESS / WARD / LANDMARK *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={selectedCountry === 'Nepal' ? 'e.g. New Baneshwor, Ward 10, Near Eye Hospital' : 'e.g. Al Barsha 1, Villa 4B / Street 12'}
                    className="form-input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              {/* Payment Methods Selection */}
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#ffffff', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                  SELECT PAYMENT METHOD & VIEW DETAILS *
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem' }}>
                  {[
                    { id: 'cod', label: 'CASH ON DELIVERY (COD)', sub: 'Pay cash at door' },
                    { id: 'esewa', label: 'ESEWA WALLET', sub: 'Instant Transfer' },
                    { id: 'khalti', label: 'KHALTI WALLET', sub: 'Instant Transfer' },
                    { id: 'bank_transfer', label: 'BANK TRANSFER', sub: 'Direct Nepali Bank' },
                  ].map((pm) => {
                    const sel = paymentMethod === pm.id;
                    return (
                      <div
                        key={pm.id}
                        onClick={() => setPaymentMethod(pm.id as any)}
                        style={{
                          padding: '0.65rem',
                          border: sel ? '2px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.15)',
                          background: sel ? '#ffffff' : 'rgba(255, 255, 255, 0.02)',
                          color: sel ? '#000000' : '#ffffff',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 800 }}>
                          {pm.label}
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: sel ? '#3f3f46' : '#71717a', marginTop: '0.15rem' }}>
                          {pm.sub}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Payment Specific Details Box */}
                <div
                  style={{
                    marginTop: '0.75rem',
                    padding: '0.85rem 1rem',
                    background: '#0d0f15',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    fontSize: '0.76rem',
                    lineHeight: 1.5,
                  }}
                >
                  {paymentMethod === 'cod' && (
                    <div style={{ color: '#cbd5e1' }}>
                      <strong style={{ color: '#ffffff' }}>✓ Cash on Delivery (COD) Selected:</strong> Pay the exact amount (NPR {cartTotal.toLocaleString()}) to our courier rider when the package arrives at your doorstep. Same-day Kathmandu Valley dispatch available.
                    </div>
                  )}

                  {paymentMethod === 'esewa' && (
                    <div>
                      <div style={{ color: '#4ade80', fontWeight: 700, marginBottom: '0.25rem' }}>
                        eSewa Wallet Payment Details:
                      </div>
                      <div style={{ color: '#ffffff', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                        eSewa ID: <strong>9801234567</strong> / <strong>elitesportshub.esewa</strong>
                      </div>
                      <div style={{ color: '#a1a1aa', fontSize: '0.72rem', marginTop: '0.2rem' }}>
                        Account Name: <strong>Elite Sports Hub Nepal</strong>. Send receipt on WhatsApp after placing order!
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'khalti' && (
                    <div>
                      <div style={{ color: '#a855f7', fontWeight: 700, marginBottom: '0.25rem' }}>
                        Khalti Digital Wallet Payment Details:
                      </div>
                      <div style={{ color: '#ffffff', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                        Khalti ID / Number: <strong>9801234567</strong>
                      </div>
                      <div style={{ color: '#a1a1aa', fontSize: '0.72rem', marginTop: '0.2rem' }}>
                        Account Name: <strong>Elite Sports Hub</strong>. Send screenshot on WhatsApp after placing order!
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'bank_transfer' && (
                    <div>
                      <div style={{ color: '#60a5fa', fontWeight: 700, marginBottom: '0.25rem' }}>
                        Nepali Bank Transfer Details:
                      </div>
                      <div style={{ color: '#ffffff', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
                        Bank: <strong>Global IME Bank Ltd.</strong> • A/C: <strong>019010001234567</strong>
                      </div>
                      <div style={{ color: '#a1a1aa', fontSize: '0.72rem', marginTop: '0.2rem' }}>
                        A/C Name: <strong>ELITE SPORTS HUB PVT. LTD.</strong> • Branch: <strong>Kathmandu Main</strong>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                id="place-order-confirm-btn"
                className="btn btn-primary"
                style={{
                  width: '100%',
                  height: '50px',
                  fontSize: '0.88rem',
                  letterSpacing: '0.08em',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                <MessageSquare size={17} />
                <span>CONFIRM ORDER REQUEST & SEND ON WHATSAPP // NPR {cartTotal.toLocaleString()}</span>
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation View */
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                border: '2px solid #ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
                color: '#ffffff',
                background: '#000000',
              }}
            >
              <CheckCircle2 size={34} />
            </div>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#10b981', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              // DISPATCH REQUEST LOGGED //
            </div>

            <h2 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.7rem', color: '#ffffff', textTransform: 'uppercase', marginTop: '0.35rem' }}>
              We Received Your Order Request!
            </h2>
            <p style={{ fontFamily: 'var(--font-mono)', color: '#a1a1aa', fontSize: '0.82rem', marginTop: '0.35rem', marginBottom: '1.5rem', maxWidth: '500px', margin: '0.35rem auto 1.5rem auto' }}>
              Our Kathmandu squad has received your request. We have initiated the WhatsApp dispatch thread with your order number.
            </p>

            {/* Order Confirmation Card */}
            <div
              style={{
                background: '#090a0f',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '1.25rem',
                textAlign: 'left',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                marginBottom: '1.5rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '0.5rem' }}>
                <span style={{ color: '#71717a' }}>ORDER ID:</span>
                <strong style={{ color: '#ffffff', fontSize: '0.95rem' }}>{confirmedOrder.id}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#71717a' }}>RECIPIENT:</span>
                <span style={{ color: '#ffffff' }}>{confirmedOrder.customerName} ({confirmedOrder.phone})</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#71717a' }}>DESTINATION:</span>
                <span style={{ color: '#ffffff' }}>{confirmedOrder.country} • {confirmedOrder.region}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#71717a' }}>PAYMENT METHOD:</span>
                <span style={{ color: '#ffffff', textTransform: 'uppercase' }}>{confirmedOrder.paymentMethod.replace('_', ' ')}</span>
              </div>

              {/* Items breakdown with images */}
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '0.65rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#71717a', textTransform: 'uppercase', marginBottom: '0.45rem' }}>
                  Ordered Products ({confirmedOrder.items.length}):
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {confirmedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        background: '#040507',
                        padding: '0.5rem',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      <div
                        style={{
                          position: 'relative',
                          width: '44px',
                          height: '52px',
                          overflow: 'hidden',
                          background: '#000000',
                          flexShrink: 0,
                        }}
                      >
                        <Image src={item.jersey.image} alt={item.jersey.title} fill style={{ objectFit: 'cover' }} />
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>
                          {item.jersey.title}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#a1a1aa' }}>
                          Fit: {item.selectedGender.toUpperCase()} • Size: {item.selectedSize} • Qty: {item.quantity}
                        </div>
                        {item.customPrint && (
                          <div style={{ fontSize: '0.68rem', color: '#fbbf24' }}>
                            Print: {item.customPrint.name} #{item.customPrint.number}
                          </div>
                        )}
                      </div>

                      <div style={{ fontWeight: 700, color: '#ffffff', textAlign: 'right' }}>
                        NPR {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions: Re-open WhatsApp & Track Status */}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href={getWhatsAppUrl(confirmedOrder)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: '#22c55e',
                  color: '#000000',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                <MessageSquare size={17} />
                <span>Chat on WhatsApp ({adminWhatsAppNumber})</span>
              </a>

              <button
                onClick={() => {
                  setTrackingOrderCode(confirmedOrder.id);
                  setIsTrackerOpen(true);
                  handleClose();
                }}
                className="btn btn-secondary"
                style={{ fontSize: '0.82rem' }}
              >
                TRACK THIS ORDER LIVE
              </button>

              <button
                onClick={handleClose}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  padding: '0.75rem 1rem',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                BACK TO CATALOG
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
