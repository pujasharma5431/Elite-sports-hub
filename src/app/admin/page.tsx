'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '../../context/StoreContext';
import { Jersey, JerseySize, Gender, OrderStatus } from '../../types/jersey';
import { AdminImageUploader } from '../../components/AdminImageUploader';
import {
  Package,
  Sliders,
  PlusCircle,
  Check,
  AlertTriangle,
  Flame,
  Star,
  Lock,
  Unlock,
  FileText,
  ShieldCheck,
  Search,
  MessageSquare,
  Clock,
  MapPin,
  ArrowLeft,
  Phone,
  RefreshCw,
  Eye,
  EyeOff,
  Trash2,
  LogOut,
  Copy,
  Save,
} from 'lucide-react';

const ALL_SIZES: JerseySize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
const ALL_GENDERS: { id: Gender; label: string }[] = [
  { id: 'men', label: "Men's Fit" },
  { id: 'women', label: "Women's Fit" },
  { id: 'unisex', label: 'Unisex Fit' },
  { id: 'kids', label: 'Junior' },
];

const ORDER_STATUS_OPTIONS: OrderStatus[] = [
  'Order Received',
  'Packed',
  'Dispatched',
  'Delivered',
];

export default function AdminPage() {
  const {
    jerseys,
    updateJerseyInventory,
    addNewJersey,
    deleteJersey,
    duplicateJersey,
    toggleJerseyVisibility,
    resetAllJerseys,
    orders,
    updateOrderStatus,
    adminWhatsAppNumber,
    setAdminWhatsAppNumber,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'catalog' | 'add'>('orders');
  const [orderSearch, setOrderSearch] = useState('');
  const [catalogSearch, setCatalogSearch] = useState('');
  const [expandedJerseyId, setExpandedJerseyId] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState('');
  const [tempWaNumber, setTempWaNumber] = useState(adminWhatsAppNumber);

  // Form state for adding new drop
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
  const [newIsVisible, setNewIsVisible] = useState(true);
  const [newQuality, setNewQuality] = useState('100% Pro Player Match Specification // AeroVent™ Poly-Mesh');
  const [newDescription, setNewDescription] = useState('Official authentic match jersey. Engineered for elite athlete performance and fan durability.');
  const [newSizes, setNewSizes] = useState<JerseySize[]>(['S', 'M', 'L', 'XL']);
  const [newGenders, setNewGenders] = useState<Gender[]>(['men', 'unisex']);
  const [newImageUrl, setNewImageUrl] = useState('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=900&q=80');

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const isAuth = sessionStorage.getItem('esh_admin_session_auth');
    if (isAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim().toLowerCase() === 'admin' && passwordInput.trim() === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('esh_admin_session_auth', 'true');
      setLoginError('');
      showNotification('✅ Authenticated as Admin');
    } else {
      setLoginError('Invalid username or password. Default is admin / admin.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('esh_admin_session_auth');
    showNotification('🔒 Logged out of Admin Portal');
  };

  const showNotification = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  const handleSaveWaNumber = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminWhatsAppNumber(tempWaNumber);
    showNotification(`✅ Admin WhatsApp updated to ${tempWaNumber}!`);
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
      isVisible: newIsVisible,
      isLimitedEdition: newCategory === 'limited-edition',
      stock: Number(newStock) || 10,
      isLowStock: Number(newStock) <= 5,
      sizes: newSizes,
      gender: newGenders,
      colors: [{ name: 'Team Shade', hex: '#1d4ed8' }],
      image: newImageUrl,
      rating: 5.0,
      reviewsCount: 1,
      fabric: 'Dry-fit pro-stretch breathable polyester',
      quality: newQuality,
      description: newDescription,
    });

    showNotification(`✅ "${newTitle}" added to catalog!`);
    setActiveTab('catalog');
    setNewTitle('');
  };

  // Filter orders
  const filteredOrders = orders.filter((o) => {
    if (!orderSearch) return true;
    const q = orderSearch.toLowerCase();
    return (
      o.id.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.phone.includes(q) ||
      o.region.toLowerCase().includes(q) ||
      o.country.toLowerCase().includes(q)
    );
  });

  // Filter catalog
  const filteredJerseys = jerseys.filter((j) => {
    if (!catalogSearch) return true;
    const q = catalogSearch.toLowerCase();
    return (
      j.title.toLowerCase().includes(q) ||
      j.player.toLowerCase().includes(q) ||
      j.team.toLowerCase().includes(q)
    );
  });

  // Render Login Card if not authenticated
  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#040507',
          color: '#f1f5f9',
          fontFamily: 'var(--font-primary), sans-serif',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1rem',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#a1a1aa',
              textDecoration: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              padding: '0.4rem 0.75rem',
              borderRadius: '4px',
            }}
          >
            <ArrowLeft size={14} />
            <span>Return to Store</span>
          </Link>
        </div>

        <div
          style={{
            width: '100%',
            maxWidth: '420px',
            background: '#090a10',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '12px',
            padding: '2.5rem 2rem',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto',
                color: '#ef4444',
              }}
            >
              <Lock size={22} />
            </div>
            <h1
              style={{
                fontSize: '1.35rem',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                color: '#ffffff',
                margin: '0 0 0.35rem 0',
              }}
            >
              Admin Access Control
            </h1>
            <p style={{ fontSize: '0.78rem', color: '#71717a', margin: 0, fontFamily: 'var(--font-mono)' }}>
              Elite Sports Hub // Kathmandu Workstation
            </p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
            {loginError && (
              <div
                style={{
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  color: '#f87171',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                }}
              >
                <AlertTriangle size={15} />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', color: '#a1a1aa', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                ADMIN USERNAME
              </label>
              <input
                type="text"
                required
                autoFocus
                placeholder="Enter username (admin)"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="form-input"
                style={{ height: '42px', fontSize: '0.85rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', color: '#a1a1aa', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                ADMIN PASSWORD
              </label>
              <input
                type="password"
                required
                placeholder="Enter password (admin)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="form-input"
                style={{ height: '42px', fontSize: '0.85rem' }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{
                height: '44px',
                fontWeight: 800,
                letterSpacing: '0.06em',
                fontSize: '0.82rem',
                marginTop: '0.5rem',
              }}
            >
              <Unlock size={15} />
              <span>AUTHENTICATE & ACCESS PORTAL</span>
            </button>

            <div style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.7rem', color: '#52525b', fontFamily: 'var(--font-mono)' }}>
              Master credentials: username <strong style={{ color: '#a1a1aa' }}>admin</strong> / password <strong style={{ color: '#a1a1aa' }}>admin</strong>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#040507',
        color: '#f1f5f9',
        fontFamily: 'var(--font-primary), sans-serif',
      }}
    >
      {/* Top Admin Header */}
      <header
        style={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          background: '#07080b',
          padding: '1.25rem 2rem',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: '#a1a1aa',
                textDecoration: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                padding: '0.4rem 0.75rem',
                borderRadius: '4px',
              }}
            >
              <ArrowLeft size={14} />
              <span>Back to Store</span>
            </Link>

            <button
              onClick={handleLogout}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: '#f87171',
                background: 'rgba(239, 68, 68, 0.1)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                padding: '0.4rem 0.75rem',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              title="Log out of the admin panel"
            >
              <LogOut size={13} />
              <span>Logout</span>
            </button>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', color: '#ffffff', margin: 0 }}>
                  Elite Sports Hub // Admin Portal
                </h1>
                <span style={{ fontSize: '0.62rem', background: '#ffffff', color: '#000000', fontWeight: 800, padding: '0.15rem 0.45rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                  PORTAL: /ADMIN
                </span>
              </div>
              <p style={{ fontSize: '0.74rem', color: '#71717a', margin: '0.2rem 0 0 0', fontFamily: 'var(--font-mono)' }}>
                Live orders management, Headline drops curation, custom print permissions & parcel dispatch status.
              </p>
            </div>
          </div>

          {/* Quick WhatsApp Configuration */}
          <form
            onSubmit={handleSaveWaNumber}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: '#0b0d13',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              padding: '0.35rem 0.65rem',
              borderRadius: '4px',
            }}
          >
            <Phone size={14} color="#22c55e" />
            <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#a1a1aa' }}>
              WhatsApp:
            </span>
            <input
              type="text"
              value={tempWaNumber}
              onChange={(e) => setTempWaNumber(e.target.value)}
              placeholder="9821952621"
              style={{
                width: '130px',
                background: '#000000',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                padding: '0.25rem 0.45rem',
              }}
            />
            <button
              type="submit"
              style={{
                background: '#ffffff',
                border: 'none',
                color: '#000000',
                fontSize: '0.68rem',
                fontWeight: 800,
                padding: '0.3rem 0.6rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
              }}
            >
              Save
            </button>
          </form>
        </div>

        {/* Success toast if any */}
        {successToast && (
          <div
            style={{
              background: '#ffffff',
              color: '#000000',
              padding: '0.5rem 1rem',
              fontSize: '0.78rem',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              marginTop: '0.85rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
            }}
          >
            <Check size={14} />
            <span>{successToast}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <button
            onClick={() => setActiveTab('orders')}
            style={{
              padding: '0.65rem 1.25rem',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'orders' ? '2px solid #ffffff' : 'none',
              color: activeTab === 'orders' ? '#ffffff' : '#71717a',
              fontWeight: 800,
              fontSize: '0.82rem',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
            }}
          >
            <Package size={15} />
            <span>Live Customer Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            style={{
              padding: '0.65rem 1.25rem',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'catalog' ? '2px solid #ffffff' : 'none',
              color: activeTab === 'catalog' ? '#ffffff' : '#71717a',
              fontWeight: 800,
              fontSize: '0.82rem',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
            }}
          >
            <Sliders size={15} />
            <span>Catalog & Match Drops ({jerseys.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('add')}
            style={{
              padding: '0.65rem 1.25rem',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'add' ? '2px solid #ffffff' : 'none',
              color: activeTab === 'add' ? '#ffffff' : '#71717a',
              fontWeight: 800,
              fontSize: '0.82rem',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
            }}
          >
            <PlusCircle size={15} />
            <span>Add New Match Drop</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ maxWidth: '1360px', margin: '0 auto', padding: '2rem' }}>
        {/* TAB 1: LIVE ORDERS DASHBOARD */}
        {activeTab === 'orders' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase', margin: 0 }}>
                  Customer Orders & Dispatch Pipeline
                </h2>
                <p style={{ fontSize: '0.78rem', color: '#71717a', margin: '0.2rem 0 0 0', fontFamily: 'var(--font-mono)' }}>
                  View full order items with product images, sizes, quantities, payment medium, and update dispatch status.
                </p>
              </div>

              <div style={{ width: '320px' }}>
                <input
                  type="text"
                  placeholder="Search by Order ID, Customer, Phone, or City..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="form-input"
                  style={{ height: '38px', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}
                />
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', background: '#0b0d13', border: '1px dashed rgba(255, 255, 255, 0.15)' }}>
                <p style={{ color: '#a1a1aa', fontFamily: 'var(--font-mono)' }}>No customer orders found matching your query.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {filteredOrders.map((order) => {
                  const cleanWa = order.phone.replace(/[^0-9]/g, '');
                  const waCustomerLink = `https://wa.me/${cleanWa}?text=${encodeURIComponent(
                    `Hello ${order.customerName}, this is Elite Sports Hub Kathmandu regarding your order #${order.id}. Your current dispatch status is: ${order.status}.`
                  )}`;

                  return (
                    <div
                      key={order.id}
                      style={{
                        background: '#090a0f',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.15rem',
                      }}
                    >
                      {/* Order Header Row */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '1rem',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                          paddingBottom: '1rem',
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                            <span style={{ fontSize: '1.15rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: '#ffffff' }}>
                              #{order.id}
                            </span>
                            <span style={{ fontSize: '0.72rem', color: '#71717a', fontFamily: 'var(--font-mono)' }}>
                              {new Date(order.createdAt).toLocaleString()}
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginTop: '0.35rem', flexWrap: 'wrap' }}>
                            <strong style={{ color: '#ffffff', fontSize: '0.9rem' }}>{order.customerName}</strong>
                            <span style={{ color: '#71717a' }}>•</span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#cbd5e1' }}>
                              Phone: {order.phone}
                            </span>
                            <span style={{ color: '#71717a' }}>•</span>
                            <span style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>
                              <MapPin size={12} style={{ display: 'inline', marginRight: '3px' }} />
                              {order.country} &gt; {order.region} ({order.address})
                            </span>
                          </div>
                        </div>

                        {/* Status Updater & Total */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.68rem', color: '#71717a', fontFamily: 'var(--font-mono)' }}>
                              TOTAL PAYABLE
                            </div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                              NPR {order.totalAmount.toLocaleString()}
                            </div>
                            <div style={{ fontSize: '0.68rem', color: '#a855f7', textTransform: 'uppercase', fontWeight: 700 }}>
                              {order.paymentMethod.replace('_', ' ')}
                            </div>
                          </div>

                          {/* Order Status Selector */}
                          <div>
                            <label style={{ display: 'block', fontSize: '0.68rem', color: '#71717a', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                              Update Status:
                            </label>
                            <select
                              value={order.status}
                              onChange={(e) => {
                                const nextStatus = e.target.value as OrderStatus;
                                updateOrderStatus(order.id, nextStatus);
                                showNotification(`Status of #${order.id} updated to ${nextStatus}!`);
                              }}
                              style={{
                                background:
                                  order.status === 'Delivered'
                                    ? '#22c55e'
                                    : order.status === 'Dispatched'
                                    ? '#3b82f6'
                                    : order.status === 'Packed'
                                    ? '#fbbf24'
                                    : '#ffffff',
                                color: '#000000',
                                fontWeight: 800,
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.75rem',
                                padding: '0.45rem 0.65rem',
                                border: 'none',
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                              }}
                            >
                              {ORDER_STATUS_OPTIONS.map((st) => (
                                <option key={st} value={st} style={{ background: '#000000', color: '#ffffff' }}>
                                  {st}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* WhatsApp Chat with Customer */}
                          <a
                            href={waCustomerLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.4rem',
                              background: 'rgba(34, 197, 94, 0.15)',
                              border: '1px solid rgba(34, 197, 94, 0.4)',
                              color: '#4ade80',
                              fontSize: '0.72rem',
                              fontFamily: 'var(--font-mono)',
                              fontWeight: 700,
                              padding: '0.5rem 0.8rem',
                              textDecoration: 'none',
                              borderRadius: '4px',
                            }}
                          >
                            <MessageSquare size={13} />
                            <span>WhatsApp Customer</span>
                          </a>
                        </div>
                      </div>

                      {/* Items Ordered List With Full Thumbnails */}
                      <div>
                        <div style={{ fontSize: '0.7rem', color: '#71717a', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                          Items In This Order ({order.items.length}):
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0.75rem' }}>
                          {order.items.map((item, i) => (
                            <div
                              key={i}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.85rem',
                                background: '#040507',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                padding: '0.65rem',
                              }}
                            >
                              <div
                                style={{
                                  position: 'relative',
                                  width: '54px',
                                  height: '64px',
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
                                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.25 }}>
                                  {item.jersey.title}
                                </div>
                                <div style={{ fontSize: '0.7rem', color: '#a1a1aa', fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>
                                  Fit: <strong style={{ color: '#ffffff' }}>{item.selectedGender.toUpperCase()}</strong> • Size: <strong style={{ color: '#ffffff' }}>{item.selectedSize}</strong> • Qty: <strong style={{ color: '#ffffff' }}>{item.quantity}</strong>
                                </div>
                                {item.customPrint && (
                                  <div style={{ fontSize: '0.68rem', color: '#fbbf24', fontFamily: 'var(--font-mono)', marginTop: '0.15rem' }}>
                                    ⚡ Heat-Press: {item.customPrint.name} #{item.customPrint.number}
                                  </div>
                                )}
                              </div>

                              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 800, color: '#ffffff', textAlign: 'right', flexShrink: 0 }}>
                                NPR {(item.price * item.quantity).toLocaleString()}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CATALOG & HEADLINE MATCH DROPS CONTROL */}
        {activeTab === 'catalog' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase', margin: 0 }}>
                  Catalog, Headline Drops & Customization Rules
                </h2>
                <p style={{ fontSize: '0.78rem', color: '#71717a', margin: '0.2rem 0 0 0', fontFamily: 'var(--font-mono)' }}>
                  Control which jerseys appear in the Headline Match Drops reel, allow/lock custom name & number printing, set flash sales, and update quality specifications.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Search catalog (e.g. Messi, Rohit, Nepal)..."
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  className="form-input"
                  style={{ width: '280px', height: '38px', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}
                />
                <button
                  onClick={() => {
                    if (confirm('Reset store catalog to initial defaults?')) {
                      resetAllJerseys();
                      showNotification('Catalog reset to initial demo products.');
                    }
                  }}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#a1a1aa',
                    padding: '0 0.75rem',
                    height: '38px',
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <RefreshCw size={12} />
                  <span>Reset Defaults</span>
                </button>
              </div>
            </div>

            {filteredJerseys.length === 0 ? (
              <div
                style={{
                  padding: '3.5rem 2rem',
                  textAlign: 'center',
                  background: '#090a0f',
                  border: '1px dashed rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                }}
              >
                <Package size={36} color="#71717a" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '0.4rem', fontWeight: 800 }}>
                  No Products in Store Inventory
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#71717a', maxWidth: '440px', margin: '0 auto 1.5rem auto', lineHeight: 1.5 }}>
                  The catalog is currently empty. Click &quot;Add New Match Drop&quot; to upload your first jersey with automatic WebP compression and custom player specs.
                </p>
                <button
                  onClick={() => setActiveTab('add')}
                  className="btn btn-primary"
                  style={{ padding: '0.6rem 1.35rem', fontSize: '0.78rem', fontWeight: 800 }}
                >
                  <PlusCircle size={15} />
                  <span>ADD NEW MATCH DROP</span>
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {filteredJerseys.map((jersey) => {
                const isExpanded = expandedJerseyId === jersey.id;
                const isHeadline = !!jersey.isHeadlineDrop;
                const isCustomizable = jersey.isCustomizable !== false;

                return (
                  <div
                    key={jersey.id}
                    style={{
                      background: '#090a0f',
                      border: isHeadline ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.1)',
                      padding: '1.15rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.85rem',
                    }}
                  >
                    {/* Top Row: Thumbnail + Title + Pricing */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <div
                        style={{
                          position: 'relative',
                          width: '56px',
                          height: '66px',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          overflow: 'hidden',
                          background: '#000000',
                          flexShrink: 0,
                        }}
                      >
                        <Image src={jersey.image} alt={jersey.title} fill style={{ objectFit: 'cover' }} />
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>
                            {jersey.title}
                          </span>
                          {isHeadline && (
                            <span
                              style={{
                                background: '#ffffff',
                                color: '#000000',
                                fontSize: '0.62rem',
                                fontWeight: 800,
                                padding: '0.15rem 0.45rem',
                                fontFamily: 'var(--font-mono)',
                                textTransform: 'uppercase',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.2rem',
                              }}
                            >
                              <Star size={10} fill="#000000" />
                              Headline Drop
                            </span>
                          )}
                          {!isCustomizable && (
                            <span
                              style={{
                                background: 'rgba(239, 68, 68, 0.15)',
                                border: '1px solid rgba(239, 68, 68, 0.4)',
                                color: '#f87171',
                                fontSize: '0.62rem',
                                fontWeight: 700,
                                padding: '0.15rem 0.45rem',
                                fontFamily: 'var(--font-mono)',
                                textTransform: 'uppercase',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.2rem',
                              }}
                            >
                              <Lock size={10} />
                              Custom Locked
                            </span>
                          )}
                          {jersey.isVisible === false && (
                            <span
                              style={{
                                background: 'rgba(234, 179, 8, 0.15)',
                                border: '1px solid rgba(234, 179, 8, 0.5)',
                                color: '#facc15',
                                fontSize: '0.62rem',
                                fontWeight: 800,
                                padding: '0.15rem 0.45rem',
                                fontFamily: 'var(--font-mono)',
                                textTransform: 'uppercase',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.2rem',
                              }}
                            >
                              <EyeOff size={10} />
                              Hidden from Store
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#71717a', fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>
                          {jersey.team} • {jersey.player} {jersey.playerNumber ? `#${jersey.playerNumber}` : ''} • Stock: {jersey.stock} units
                        </div>
                      </div>

                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontSize: '1rem', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                          रू {jersey.price.toLocaleString()}
                        </div>
                        {jersey.isOnSale && jersey.originalPrice && (
                          <div style={{ fontSize: '0.72rem', color: '#71717a', textDecoration: 'line-through' }}>
                            WAS रू {jersey.originalPrice.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Admin Action Buttons */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.5rem' }}>
                      {/* Headline Drop Toggle */}
                      <button
                        onClick={() => {
                          const next = !isHeadline;
                          updateJerseyInventory(jersey.id, { isHeadlineDrop: next });
                          showNotification(next ? `⭐ Set "${jersey.title}" as Headline Drop!` : `Removed "${jersey.title}" from Headline Drops.`);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.45rem',
                          padding: '0.55rem 0.75rem',
                          background: isHeadline ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                          border: isHeadline ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.15)',
                          color: isHeadline ? '#000000' : '#d4d4d8',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          fontFamily: 'var(--font-mono)',
                          textTransform: 'uppercase',
                        }}
                      >
                        <Star size={13} fill={isHeadline ? '#000000' : 'none'} />
                        <span>{isHeadline ? 'HEADLINE DROP: ACTIVE' : 'SET AS HEADLINE DROP'}</span>
                      </button>

                      {/* Custom Print Permission Toggle */}
                      <button
                        onClick={() => {
                          const next = !isCustomizable;
                          updateJerseyInventory(jersey.id, { isCustomizable: next });
                          showNotification(next ? `✅ Custom Printing enabled for "${jersey.title}".` : `🔒 Custom Printing locked for "${jersey.title}".`);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.45rem',
                          padding: '0.55rem 0.75rem',
                          background: isCustomizable ? 'rgba(34, 197, 94, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                          border: isCustomizable ? '1px solid rgba(34, 197, 94, 0.4)' : '1px solid rgba(239, 68, 68, 0.4)',
                          color: isCustomizable ? '#4ade80' : '#f87171',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          fontFamily: 'var(--font-mono)',
                          textTransform: 'uppercase',
                        }}
                      >
                        {isCustomizable ? <Unlock size={13} /> : <Lock size={13} />}
                        <span>{isCustomizable ? 'CUSTOM PRINT: ALLOWED' : 'CUSTOM PRINT: LOCKED'}</span>
                      </button>

                      {/* Flash Sale Toggle */}
                      <button
                        onClick={() => {
                          const next = !jersey.isOnSale;
                          updateJerseyInventory(jersey.id, {
                            isOnSale: next,
                            originalPrice: next ? (jersey.originalPrice || Math.round(jersey.price * 1.25)) : undefined,
                          });
                          showNotification(next ? `🔥 Flash sale activated for "${jersey.title}"!` : `Flash sale removed for "${jersey.title}".`);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.45rem',
                          padding: '0.55rem 0.75rem',
                          background: jersey.isOnSale ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                          border: jersey.isOnSale ? '1px solid rgba(239, 68, 68, 0.5)' : '1px solid rgba(255, 255, 255, 0.15)',
                          color: jersey.isOnSale ? '#ff4d4f' : '#d4d4d8',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          fontFamily: 'var(--font-mono)',
                          textTransform: 'uppercase',
                        }}
                      >
                        <Flame size={13} />
                        <span>{jersey.isOnSale ? 'FLASH SALE: ACTIVE' : 'ENABLE FLASH SALE'}</span>
                      </button>

                      {/* Edit Quality & Description Details */}
                      <button
                        onClick={() => setExpandedJerseyId(isExpanded ? null : jersey.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.45rem',
                          padding: '0.55rem 0.75rem',
                          background: isExpanded ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: isExpanded ? '#000000' : '#a1a1aa',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          fontFamily: 'var(--font-mono)',
                          textTransform: 'uppercase',
                        }}
                      >
                        <FileText size={13} />
                        <span>{isExpanded ? 'CLOSE SPECS' : 'EDIT QUALITY & SPECS'}</span>
                      </button>

                      {/* Live Store Visibility Toggle */}
                      <button
                        onClick={() => {
                          toggleJerseyVisibility(jersey.id);
                          const nextVis = jersey.isVisible === false;
                          showNotification(
                            nextVis
                              ? `🟢 "${jersey.title}" is now LIVE on the website!`
                              : `👁️‍🗨️ "${jersey.title}" is now HIDDEN from the website.`
                          );
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.45rem',
                          padding: '0.55rem 0.75rem',
                          background: jersey.isVisible !== false ? 'rgba(16, 185, 129, 0.12)' : 'rgba(234, 179, 8, 0.12)',
                          border: jersey.isVisible !== false ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(234, 179, 8, 0.4)',
                          color: jersey.isVisible !== false ? '#34d399' : '#facc15',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          fontFamily: 'var(--font-mono)',
                          textTransform: 'uppercase',
                        }}
                        title="Toggle customer visibility on storefront without deleting"
                      >
                        {jersey.isVisible !== false ? <Eye size={13} /> : <EyeOff size={13} />}
                        <span>{jersey.isVisible !== false ? 'STORE: LIVE / VISIBLE' : 'STORE: HIDDEN (DRAFT)'}</span>
                      </button>

                      {/* Duplicate Product */}
                      <button
                        onClick={() => {
                          const dup = duplicateJersey(jersey.id);
                          if (dup) {
                            setExpandedJerseyId(dup.id);
                            showNotification(`📋 Duplicated "${jersey.title}"! You can now edit its details or photo below.`);
                          }
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.45rem',
                          padding: '0.55rem 0.75rem',
                          background: 'rgba(59, 130, 246, 0.1)',
                          border: '1px solid rgba(59, 130, 246, 0.35)',
                          color: '#60a5fa',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          fontFamily: 'var(--font-mono)',
                          textTransform: 'uppercase',
                        }}
                        title="Duplicate this product so you can easily modify text or photo"
                      >
                        <Copy size={13} />
                        <span>DUPLICATE</span>
                      </button>

                      {/* Delete Product */}
                      <button
                        onClick={() => {
                          if (window.confirm(`⚠️ Permanently delete "${jersey.title}" from store inventory? This cannot be undone.`)) {
                            deleteJersey(jersey.id);
                            showNotification(`🗑️ Deleted "${jersey.title}".`);
                          }
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.45rem',
                          padding: '0.55rem 0.75rem',
                          background: 'rgba(239, 68, 68, 0.08)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          color: '#ef4444',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          fontFamily: 'var(--font-mono)',
                          textTransform: 'uppercase',
                        }}
                        title="Permanently remove this jersey from the store"
                      >
                        <Trash2 size={13} />
                        <span>DELETE PRODUCT</span>
                      </button>
                    </div>

                    {/* Numeric Controls: Price, Stock, Original Price */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                        gap: '0.65rem',
                        background: '#040507',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        padding: '0.65rem 0.85rem',
                      }}
                    >
                      <div>
                        <label style={{ display: 'block', fontSize: '0.65rem', color: '#71717a', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '0.2rem' }}>
                          Price (NPR):
                        </label>
                        <input
                          type="number"
                          value={jersey.price}
                          onChange={(e) => updateJerseyInventory(jersey.id, { price: Number(e.target.value) })}
                          style={{
                            width: '100%',
                            padding: '0.35rem 0.5rem',
                            background: '#000000',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: '#ffffff',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.65rem', color: '#71717a', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '0.2rem' }}>
                          Original Price:
                        </label>
                        <input
                          type="number"
                          placeholder="e.g. 4500"
                          value={jersey.originalPrice || ''}
                          onChange={(e) => updateJerseyInventory(jersey.id, { originalPrice: e.target.value ? Number(e.target.value) : undefined })}
                          style={{
                            width: '100%',
                            padding: '0.35rem 0.5rem',
                            background: '#000000',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: '#ffffff',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.85rem',
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.65rem', color: '#71717a', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '0.2rem' }}>
                          Units in Stock:
                        </label>
                        <input
                          type="number"
                          value={jersey.stock}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            updateJerseyInventory(jersey.id, { stock: val, isLowStock: val <= 5 });
                          }}
                          style={{
                            width: '100%',
                            padding: '0.35rem 0.5rem',
                            background: '#000000',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: '#ffffff',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                          }}
                        />
                      </div>
                    </div>

                    {/* Expandable Editor for Quality & Admin Description */}
                    {isExpanded && (
                      <div
                        style={{
                          background: '#020305',
                          border: '1px solid rgba(255, 255, 255, 0.25)',
                          padding: '1.25rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '1rem',
                          borderRadius: '6px',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '0.65rem' }}>
                          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                            Edit Specs & Product Details: {jersey.title}
                          </span>
                          <span style={{ fontSize: '0.7rem', color: '#71717a', fontFamily: 'var(--font-mono)' }}>
                            ID: {jersey.id}
                          </span>
                        </div>

                        {/* Title & Player row */}
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '0.75rem' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.68rem', color: '#a1a1aa', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '0.25rem' }}>
                              Product Title:
                            </label>
                            <input
                              type="text"
                              value={jersey.title}
                              onChange={(e) => updateJerseyInventory(jersey.id, { title: e.target.value })}
                              className="form-input"
                              style={{ fontSize: '0.82rem', height: '38px' }}
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.68rem', color: '#a1a1aa', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '0.25rem' }}>
                              Team / Club:
                            </label>
                            <input
                              type="text"
                              value={jersey.team}
                              onChange={(e) => updateJerseyInventory(jersey.id, { team: e.target.value })}
                              className="form-input"
                              style={{ fontSize: '0.82rem', height: '38px' }}
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.68rem', color: '#a1a1aa', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '0.25rem' }}>
                              Player & Number:
                            </label>
                            <input
                              type="text"
                              value={`${jersey.player || ''} ${jersey.playerNumber ? `#${jersey.playerNumber}` : ''}`}
                              onChange={(e) => updateJerseyInventory(jersey.id, { player: e.target.value })}
                              className="form-input"
                              style={{ fontSize: '0.82rem', height: '38px' }}
                            />
                          </div>
                        </div>

                        {/* Sizes Pill Selector */}
                        <div>
                          <label style={{ display: 'block', fontSize: '0.68rem', color: '#a1a1aa', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '0.35rem' }}>
                            Available Sizes:
                          </label>
                          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                            {ALL_SIZES.map((sz) => {
                              const active = jersey.sizes.includes(sz);
                              return (
                                <button
                                  key={sz}
                                  type="button"
                                  onClick={() => {
                                    const nextSizes = active
                                      ? jersey.sizes.filter((s) => s !== sz)
                                      : [...jersey.sizes, sz];
                                    updateJerseyInventory(jersey.id, { sizes: nextSizes });
                                  }}
                                  style={{
                                    padding: '0.3rem 0.6rem',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.72rem',
                                    fontWeight: 700,
                                    border: active ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.15)',
                                    background: active ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                                    color: active ? '#000000' : '#a1a1aa',
                                    cursor: 'pointer',
                                  }}
                                >
                                  {sz}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Quality Specs */}
                        <div>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.68rem', color: '#a1a1aa', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '0.3rem' }}>
                            <ShieldCheck size={13} color="#22c55e" />
                            <span>Quality & Material Specification (Shown to Customer on Click):</span>
                          </label>
                          <input
                            type="text"
                            value={jersey.quality || jersey.fabric || ''}
                            onChange={(e) => updateJerseyInventory(jersey.id, { quality: e.target.value, fabric: e.target.value })}
                            placeholder="e.g. 100% Pro Player Match Specification // AeroVent™ Poly-Mesh with silicone crest"
                            className="form-input"
                            style={{ fontSize: '0.82rem', height: '38px' }}
                          />
                        </div>

                        {/* Description */}
                        <div>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.68rem', color: '#a1a1aa', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '0.3rem' }}>
                            <FileText size={13} />
                            <span>Detailed Item Description (Shown to Customer on Click):</span>
                          </label>
                          <textarea
                            rows={3}
                            value={jersey.description || ''}
                            onChange={(e) => updateJerseyInventory(jersey.id, { description: e.target.value })}
                            placeholder="Detailed description of the jersey, heritage, stitching, and match history..."
                            className="form-input"
                            style={{ fontSize: '0.82rem', resize: 'vertical' }}
                          />
                        </div>

                        {/* Replace Image with Auto WebP Compressor */}
                        <div>
                          <AdminImageUploader
                            value={jersey.image}
                            onChange={(newWebp) => {
                              updateJerseyInventory(jersey.id, { image: newWebp });
                              showNotification(`✅ Photo for "${jersey.title}" updated and compressed to WebP!`);
                            }}
                            label="PRODUCT PHOTO (DRAG & DROP OR BROWSE — AUTO WEBP COMPRESSED)"
                          />
                        </div>

                        {/* Save & Update Action Bar */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                          <button
                            type="button"
                            onClick={() => setExpandedJerseyId(null)}
                            style={{
                              padding: '0.55rem 1.15rem',
                              background: 'transparent',
                              border: '1px solid rgba(255, 255, 255, 0.2)',
                              color: '#a1a1aa',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                            }}
                          >
                            CLOSE
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setExpandedJerseyId(null);
                              showNotification(`✅ Changes for "${jersey.title}" saved successfully!`);
                            }}
                            className="btn btn-primary"
                            style={{
                              padding: '0.55rem 1.5rem',
                              fontSize: '0.78rem',
                              fontWeight: 800,
                              letterSpacing: '0.06em',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.45rem',
                            }}
                          >
                            <Save size={15} />
                            <span>SAVE & UPDATE PRODUCT</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            )}
          </div>
        )}

        {/* TAB 3: ADD NEW MATCH DROP */}
        {activeTab === 'add' && (
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, textTransform: 'uppercase', margin: 0, letterSpacing: '0.04em' }}>
                  Add New Product
                </h2>
                <p style={{ fontSize: '0.78rem', color: '#71717a', margin: '0.25rem 0 0 0', fontFamily: 'var(--font-mono)' }}>
                  Create and publish a new official jersey drop with specifications, photo, and sizing.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('catalog')}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#e4e4e7',
                  padding: '0.45rem 0.85rem',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  borderRadius: '4px',
                }}
              >
                ← Back to Catalog
              </button>
            </div>

            <form onSubmit={handleCreateJersey} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              {/* CARD 1: PRODUCT IDENTITY */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '1.25rem',
                borderRadius: '6px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '0.6rem' }}>
                  <span style={{ fontSize: '0.9rem' }}>🏷️</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    1. Product Identity & Team
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.85rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: '#a1a1aa', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                      PRODUCT / JERSEY TITLE *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Argentina 3-Star World Cup Champions Edition"
                      className="form-input"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: '#a1a1aa', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                      CATEGORY *
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
                      <option value="football">Football</option>
                      <option value="cricket">Cricket</option>
                      <option value="limited-edition">Limited Edition</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: '#a1a1aa', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                      TEAM / CLUB / NATION *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Argentina / Real Madrid"
                      className="form-input"
                      value={newTeam}
                      onChange={(e) => setNewTeam(e.target.value)}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: '#a1a1aa', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                      FEATURED PLAYER (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Lionel Messi"
                      className="form-input"
                      value={newPlayer}
                      onChange={(e) => setNewPlayer(e.target.value)}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: '#a1a1aa', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                      SQUAD NUMBER (OPTIONAL)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 10"
                      className="form-input"
                      value={newPlayerNumber}
                      onChange={(e) => setNewPlayerNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* CARD 2: PRICING & INVENTORY */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '1.25rem',
                borderRadius: '6px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '0.6rem' }}>
                  <span style={{ fontSize: '0.9rem' }}>💰</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    2. Pricing & Inventory Stock
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: '#a1a1aa', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                      SELLING PRICE (NPR) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 3200"
                      className="form-input"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: '#a1a1aa', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                      ORIGINAL PRICE (FOR STRIKETHROUGH)
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
                    <label style={{ display: 'block', fontSize: '0.72rem', color: '#a1a1aa', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                      STOCK QUANTITY IN HAND *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 25"
                      className="form-input"
                      value={newStock}
                      onChange={(e) => setNewStock(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* CARD 3: PRODUCT PHOTO WITH WEBP AUTO-COMPRESSION */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '1.25rem',
                borderRadius: '6px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '0.6rem' }}>
                  <span style={{ fontSize: '0.9rem' }}>📸</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    3. Product Photo (Auto Compressed to WebP)
                  </span>
                </div>

                <AdminImageUploader
                  value={newImageUrl}
                  onChange={setNewImageUrl}
                  label="UPLOAD JERSEY PHOTO (DRAG & DROP OR CHOOSE FILE)"
                />
              </div>

              {/* CARD 4: SIZES & FIT MATRIX */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '1.25rem',
                borderRadius: '6px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '0.6rem' }}>
                  <span style={{ fontSize: '0.9rem' }}>📐</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    4. Available Sizes & Fit Specifications
                  </span>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', color: '#a1a1aa', marginBottom: '0.45rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                    AVAILABLE SIZES (CLICK TO TOGGLE):
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {ALL_SIZES.map((sz) => {
                      const active = newSizes.includes(sz);
                      return (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => {
                            setNewSizes(
                              active ? newSizes.filter((s) => s !== sz) : [...newSizes, sz]
                            );
                          }}
                          style={{
                            padding: '0.4rem 0.85rem',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            borderRadius: '4px',
                            border: active ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.15)',
                            background: active ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                            color: active ? '#000000' : '#a1a1aa',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          {active ? `✓ ${sz}` : sz}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', color: '#a1a1aa', marginBottom: '0.45rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                    FIT SPECIFICATIONS (CLICK TO TOGGLE):
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {ALL_GENDERS.map((g) => {
                      const active = newGenders.includes(g.id);
                      return (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() => {
                            setNewGenders(
                              active ? newGenders.filter((x) => x !== g.id) : [...newGenders, g.id]
                            );
                          }}
                          style={{
                            padding: '0.4rem 0.85rem',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            borderRadius: '4px',
                            border: active ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.15)',
                            background: active ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                            color: active ? '#000000' : '#a1a1aa',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          {active ? `✓ ${g.label}` : g.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* CARD 5: QUALITY SPECS & DESCRIPTION */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '1.25rem',
                borderRadius: '6px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '0.6rem' }}>
                  <ShieldCheck size={16} color="#22c55e" />
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    5. Quality Specifications & Details (Shown to Customer on Click)
                  </span>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', color: '#a1a1aa', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                    QUALITY & MATERIAL SPECIFICATION:
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 100% Pro Player Match Specification // AeroVent™ Poly-Mesh with silicone crest"
                    value={newQuality}
                    onChange={(e) => setNewQuality(e.target.value)}
                  />
                  <div style={{ fontSize: '0.68rem', color: '#71717a', marginTop: '0.3rem', fontFamily: 'var(--font-mono)' }}>
                    Shown directly inside the customer modal under &quot;Quality &amp; Specifications&quot;.
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', color: '#a1a1aa', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                    DETAILED ITEM DESCRIPTION:
                  </label>
                  <textarea
                    rows={3}
                    className="form-input"
                    placeholder="Official player edition jersey featuring breathable performance knit, heat-applied crest, and authentic tournament sleeve details..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    style={{ resize: 'vertical' }}
                  />
                </div>
              </div>

              {/* CARD 6: STOREFRONT VISIBILITY & BADGES */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '1.25rem',
                borderRadius: '6px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '0.6rem' }}>
                  <span style={{ fontSize: '0.9rem' }}>⚙️</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    6. Storefront Visibility & Badges
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    fontSize: '0.8rem',
                    color: '#ffffff',
                    cursor: 'pointer',
                    background: newIsVisible ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                    border: newIsVisible ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '4px',
                  }}>
                    <input
                      type="checkbox"
                      checked={newIsVisible}
                      onChange={(e) => setNewIsVisible(e.target.checked)}
                      style={{ accentColor: '#10b981', transform: 'scale(1.15)' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.78rem' }}>🟢 Visible Immediately</div>
                      <div style={{ fontSize: '0.68rem', color: '#a1a1aa' }}>Uncheck to save as hidden draft</div>
                    </div>
                  </label>

                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    fontSize: '0.8rem',
                    color: '#ffffff',
                    cursor: 'pointer',
                    background: newIsHeadlineDrop ? 'rgba(245, 158, 11, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                    border: newIsHeadlineDrop ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '4px',
                  }}>
                    <input
                      type="checkbox"
                      checked={newIsHeadlineDrop}
                      onChange={(e) => setNewIsHeadlineDrop(e.target.checked)}
                      style={{ accentColor: '#f59e0b', transform: 'scale(1.15)' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.78rem' }}>⭐ Headline Reel Drop</div>
                      <div style={{ fontSize: '0.68rem', color: '#a1a1aa' }}>Featured in top carousel</div>
                    </div>
                  </label>

                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    fontSize: '0.8rem',
                    color: '#ffffff',
                    cursor: 'pointer',
                    background: newIsCustomizable ? 'rgba(59, 130, 246, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                    border: newIsCustomizable ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '4px',
                  }}>
                    <input
                      type="checkbox"
                      checked={newIsCustomizable}
                      onChange={(e) => setNewIsCustomizable(e.target.checked)}
                      style={{ accentColor: '#3b82f6', transform: 'scale(1.15)' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.78rem' }}>✍️ Custom Print Option</div>
                      <div style={{ fontSize: '0.68rem', color: '#a1a1aa' }}>Allow custom name &amp; number</div>
                    </div>
                  </label>

                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    fontSize: '0.8rem',
                    color: '#ffffff',
                    cursor: 'pointer',
                    background: newIsOnSale ? 'rgba(239, 68, 68, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                    border: newIsOnSale ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '4px',
                  }}>
                    <input
                      type="checkbox"
                      checked={newIsOnSale}
                      onChange={(e) => setNewIsOnSale(e.target.checked)}
                      style={{ accentColor: '#ef4444', transform: 'scale(1.15)' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.78rem' }}>🔥 Flash Sale Badge</div>
                      <div style={{ fontSize: '0.68rem', color: '#a1a1aa' }}>Display RED sale tag on card</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* PUBLISH SUBMIT BUTTON */}
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  height: '52px',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  letterSpacing: '0.08em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  boxShadow: '0 8px 24px rgba(255, 255, 255, 0.12)',
                }}
              >
                <PlusCircle size={20} />
                <span>PUBLISH NEW PRODUCT TO CATALOG</span>
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
