'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useStore } from '../context/StoreContext';
import { X, CheckCircle2, MessageSquare, MapPin, Truck, ChevronDown } from 'lucide-react';
import { Order } from '../types/jersey';

// Popular Nepal Cities for quick suggestion/autocomplete
const NEPAL_POPULAR_CITIES = [
  'Kathmandu',
  'Lalitpur',
  'Bhaktapur',
  'Pokhara',
  'Chitwan (Bharatpur)',
  'Dharan',
  'Butwal',
  'Biratnagar',
  'Bhairahawa',
  'Nepalgunj',
  'Birgunj',
  'Birtamod',
  'Hetauda',
  'Damak',
  'Itahari',
  'Dhangadhi',
];

const UAE_CITIES = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'];
const INDIA_CITIES = ['Delhi NCR', 'Mumbai', 'Bengaluru', 'Kolkata', 'Chandigarh', 'Punjab', 'Chennai', 'Pune', 'Noida'];

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

  const activeWaNumber = adminWhatsAppNumber || '9779821952621';

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState<'Nepal' | 'Dubai' | 'India'>('Nepal');
  const [cityName, setCityName] = useState('Kathmandu');
  const [streetName, setStreetName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'esewa' | 'khalti' | 'bank_transfer'>('cod');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Dynamic delivery fee according to exact location & city (NOT random, NOT free anywhere)
  const deliveryFee = useMemo(() => {
    if (location === 'Dubai') return 1500;
    if (location === 'India') return 800;

    // Nepal Cities logic
    const lowerCity = cityName.toLowerCase().trim();
    if (
      lowerCity.includes('kathmandu') ||
      lowerCity.includes('ktm') ||
      lowerCity.includes('lalitpur') ||
      lowerCity.includes('bhaktapur') ||
      lowerCity.includes('patan') ||
      lowerCity.includes('kirtipur')
    ) {
      return 100; // Kathmandu Valley Same-Day Dispatch
    }

    if (
      lowerCity.includes('pokhara') ||
      lowerCity.includes('chitwan') ||
      lowerCity.includes('bharatpur') ||
      lowerCity.includes('dharan') ||
      lowerCity.includes('butwal') ||
      lowerCity.includes('biratnagar') ||
      lowerCity.includes('bhairahawa') ||
      lowerCity.includes('nepalgunj') ||
      lowerCity.includes('birgunj') ||
      lowerCity.includes('birtamod') ||
      lowerCity.includes('hetauda') ||
      lowerCity.includes('itahari') ||
      lowerCity.includes('damak') ||
      lowerCity.includes('dhangadhi')
    ) {
      return 150; // Major Cities Courier
    }

    return 200; // Other 77 Districts Courier
  }, [location, cityName]);

  const totalPayable = cartTotal + deliveryFee;

  if (!isCheckoutOpen) return null;

  const handleLocationChange = (loc: 'Nepal' | 'Dubai' | 'India') => {
    setLocation(loc);
    if (loc === 'Nepal') setCityName('Kathmandu');
    if (loc === 'Dubai') setCityName('Dubai');
    if (loc === 'India') setCityName('Delhi NCR');
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    // Save order into StoreContext
    const created = placeOrder({
      customerName: fullName,
      phone,
      country: location,
      region: cityName,
      address: streetName,
      items: [...cart],
      totalAmount: totalPayable,
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
📱 *Phone:* ${phone}
📍 *Location:* ${location} > City: ${cityName}
🏠 *Street Address:* ${streetName}
💳 *Payment Medium:* ${paymentLabel}
🚚 *Delivery Charge:* NPR ${deliveryFee.toLocaleString()}
💰 *Total Payable:* NPR ${totalPayable.toLocaleString()}

*Items Ordered:*
${itemsText}

Please confirm my order and dispatch schedule!`;

    const cleanNum = '9779821952621';
    const waUrl = `https://wa.me/${cleanNum}?text=${encodeURIComponent(waMessage)}`;

    try {
      window.open(waUrl, '_blank');
    } catch (err) {
      console.log('WhatsApp open error:', err);
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setConfirmedOrder(null);
  };

  const getWhatsAppUrl = (order: Order) => {
    const itemsText = order.items
      .map(
        (it, idx) =>
          `${idx + 1}. *${it.jersey.title}* (${it.selectedGender.toUpperCase()} - Size ${it.selectedSize} - Qty ${it.quantity})`
      )
      .join('\n');

    const text = `*ELITE SPORTS HUB ORDER #${order.id}*\nCustomer: ${order.customerName} (${order.phone})\nLocation: ${order.country} > ${order.region}\nAddress: ${order.address}\nPayment: ${order.paymentMethod.toUpperCase()}\nTotal: NPR ${order.totalAmount.toLocaleString()}\n\nItems:\n${itemsText}`;
    return `https://wa.me/9779821952621?text=${encodeURIComponent(text)}`;
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
                // OFFICIAL MATCH KIT ORDER REQUEST
              </div>
              <h2 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.55rem', color: '#ffffff', textTransform: 'uppercase', marginTop: '0.2rem' }}>
                Order Request & Dispatch
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.35rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
                <span style={{ color: '#a1a1aa' }}>Items Subtotal: NPR {cartTotal.toLocaleString()}</span>
                <span style={{ color: '#71717a' }}>•</span>
                <span style={{ color: '#10b981', fontWeight: 700 }}>
                  Delivery: NPR {deliveryFee.toLocaleString()} ({cityName || location})
                </span>
              </div>
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

              {/* Location: 3 Options Dropdown */}
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#ffffff', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '0.45rem' }}>
                  LOCATION *
                </label>
                <div style={{ position: 'relative' }}>
                  <select
                    className="form-input"
                    value={location}
                    onChange={(e) => handleLocationChange(e.target.value as any)}
                    style={{
                      height: '44px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      paddingRight: '2rem',
                    }}
                  >
                    <option value="Nepal" style={{ background: '#000000', color: '#ffffff' }}>
                      🇳🇵 Nepal (77 Districts)
                    </option>
                    <option value="Dubai" style={{ background: '#000000', color: '#ffffff' }}>
                      🇦🇪 Dubai (UAE)
                    </option>
                    <option value="India" style={{ background: '#000000', color: '#ffffff' }}>
                      🇮🇳 India
                    </option>
                  </select>
                </div>
              </div>

              {/* Dependent City Box with Delete/Clear option & Street Name Box */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
                {/* City Box */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#a1a1aa', letterSpacing: '0.08em' }}>
                      {location === 'Nepal' ? 'CITY (SELECT OR TYPE) *' : location === 'Dubai' ? 'EMIRATE / CITY *' : 'STATE / CITY *'}
                    </label>
                    {cityName && (
                      <button
                        type="button"
                        onClick={() => setCityName('')}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#f87171',
                          fontSize: '0.68rem',
                          fontFamily: 'var(--font-mono)',
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          padding: 0,
                        }}
                      >
                        ✕ Clear City
                      </button>
                    )}
                  </div>

                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      required
                      placeholder={location === 'Nepal' ? 'e.g. Kathmandu, Pokhara, Chitwan...' : 'e.g. Dubai, Abu Dhabi...'}
                      className="form-input"
                      value={cityName}
                      onChange={(e) => setCityName(e.target.value)}
                      style={{ height: '42px', paddingRight: '2.5rem' }}
                    />
                    {cityName && (
                      <button
                        type="button"
                        onClick={() => setCityName('')}
                        title="Delete city name"
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'rgba(255, 255, 255, 0.1)',
                          border: 'none',
                          borderRadius: '50%',
                          width: '20px',
                          height: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ffffff',
                          cursor: 'pointer',
                          fontSize: '0.7rem',
                        }}
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Quick City Suggestions for Nepal */}
                  {location === 'Nepal' && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.45rem' }}>
                      {NEPAL_POPULAR_CITIES.slice(0, 6).map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setCityName(c.replace(/ \(.*\)/, ''))}
                          style={{
                            padding: '0.15rem 0.45rem',
                            fontSize: '0.65rem',
                            fontFamily: 'var(--font-mono)',
                            background: cityName.toLowerCase() === c.toLowerCase() ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                            color: cityName.toLowerCase() === c.toLowerCase() ? '#000000' : '#a1a1aa',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            cursor: 'pointer',
                            borderRadius: '3px',
                          }}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Street Name Box */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#a1a1aa', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
                    STREET NAME / WARD / LANDMARK *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={location === 'Nepal' ? 'e.g. New Baneshwor, Ward 10, Near Eye Hospital' : 'e.g. Al Barsha 1, Street 14, Villa 3'}
                    className="form-input"
                    value={streetName}
                    onChange={(e) => setStreetName(e.target.value)}
                    style={{ height: '42px' }}
                  />
                </div>
              </div>

              {/* Exact Delivery Pricing Breakdown (According to City) */}
              <div
                style={{
                  background: '#0d0f15',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#cbd5e1' }}>
                  <Truck size={15} color="#10b981" />
                  <span>
                    Delivery Rate to <strong>{cityName || location}</strong>:
                  </span>
                </div>
                <div style={{ color: '#ffffff', fontWeight: 800 }}>
                  + NPR {deliveryFee.toLocaleString()}
                  <span style={{ fontSize: '0.68rem', color: '#71717a', marginLeft: '0.35rem' }}>
                    {location === 'Nepal'
                      ? deliveryFee === 100
                        ? '(KTM Valley Same-Day)'
                        : deliveryFee === 150
                        ? '(Major City Courier)'
                        : '(District Courier)'
                      : `(${location} Air Shipping)`}
                  </span>
                </div>
              </div>

              {/* Payment Methods Selection */}
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#ffffff', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                  PAYMENT MEDIUM (SELECT OPTION TO VIEW DETAILS) *
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem' }}>
                  {[
                    { id: 'cod', label: 'CASH ON DELIVERY (COD)', sub: 'Pay upon delivery' },
                    { id: 'esewa', label: 'ESEWA WALLET', sub: 'Instant Transfer' },
                    { id: 'khalti', label: 'KHALTI WALLET', sub: 'Instant Transfer' },
                    { id: 'bank_transfer', label: 'BANK TRANSFER', sub: 'Direct Bank Transfer' },
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

                {/* Specific Payment Medium Details with Real WhatsApp / eSewa number 9821952621 */}
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
                      <strong style={{ color: '#ffffff' }}>✓ Cash on Delivery (COD) Selected:</strong> Pay the exact amount (NPR {totalPayable.toLocaleString()}) to our delivery rider when the kit arrives.
                    </div>
                  )}

                  {paymentMethod === 'esewa' && (
                    <div>
                      <div style={{ color: '#4ade80', fontWeight: 700, marginBottom: '0.25rem' }}>
                        eSewa Wallet Payment Details:
                      </div>
                      <div style={{ color: '#ffffff', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
                        eSewa ID / Number: <strong>9821952621</strong>
                      </div>
                      <div style={{ color: '#a1a1aa', fontSize: '0.72rem', marginTop: '0.2rem' }}>
                        Account Name: <strong>Elite Sports Hub Nepal</strong>. Send receipt/screenshot to WhatsApp (<strong>9821952621</strong>) after placing order!
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'khalti' && (
                    <div>
                      <div style={{ color: '#a855f7', fontWeight: 700, marginBottom: '0.25rem' }}>
                        Khalti Digital Wallet Payment Details:
                      </div>
                      <div style={{ color: '#ffffff', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
                        Khalti ID / Number: <strong>9821952621</strong>
                      </div>
                      <div style={{ color: '#a1a1aa', fontSize: '0.72rem', marginTop: '0.2rem' }}>
                        Account Name: <strong>Elite Sports Hub</strong>. Send screenshot to WhatsApp (<strong>9821952621</strong>) after placing order!
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

              {/* Final Summary & Submit */}
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#a1a1aa' }}>
                  <span>Subtotal + Delivery ({cityName}):</span>
                  <span style={{ color: '#ffffff', fontWeight: 800 }}>NPR {totalPayable.toLocaleString()}</span>
                </div>

                <button
                  type="submit"
                  id="place-order-confirm-btn"
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    height: '52px',
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
                  <span>CONFIRM ORDER REQUEST & SEND ON WHATSAPP // NPR {totalPayable.toLocaleString()}</span>
                </button>
              </div>
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
                <span style={{ color: '#71717a' }}>LOCATION & CITY:</span>
                <span style={{ color: '#ffffff' }}>{confirmedOrder.country} • {confirmedOrder.region} ({confirmedOrder.address})</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#71717a' }}>PAYMENT METHOD:</span>
                <span style={{ color: '#ffffff', textTransform: 'uppercase' }}>{confirmedOrder.paymentMethod.replace('_', ' ')}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '0.5rem' }}>
                <span style={{ color: '#71717a' }}>TOTAL PAYABLE:</span>
                <strong style={{ color: '#ffffff', fontSize: '1.05rem' }}>NPR {confirmedOrder.totalAmount.toLocaleString()}</strong>
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
                <span>Chat on WhatsApp (9821952621)</span>
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
