'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '../context/StoreContext';
import {
  Share2,
  Truck,
  ShieldCheck,
  Search,
  Lock,
} from 'lucide-react';

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
  </svg>
);

const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.4a6.33 6.33 0 0 0-.86-.06A6.34 6.34 0 0 0 3.1 15.68a6.34 6.34 0 0 0 10.82 4.48c.38-.38.7-.82.94-1.31V9.92a8.28 8.28 0 0 0 4.73 1.48V7.95a4.8 4.8 0 0 1-.0-.05z" />
  </svg>
);

const PinterestIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0a12 12 0 0 0-4.37 23.18c-.06-.94-.12-2.39.02-3.42l.96-4.08s-.24-.49-.24-1.22c0-1.14.66-2 1.49-2 .7 0 1.04.53 1.04 1.16 0 .71-.45 1.77-.69 2.75-.2.83.42 1.5 1.23 1.5 1.48 0 2.62-1.56 2.62-3.81 0-1.99-1.43-3.38-3.47-3.38-2.53 0-4.02 1.9-4.02 3.86 0 .77.29 1.59.66 2.04a.26.26 0 0 1 .06.25c-.07.28-.22.88-.25 1a.2.2 0 0 1-.29.14c-1.39-.65-2.26-2.67-2.26-4.3 0-3.5 2.54-6.72 7.34-6.72 3.86 0 6.85 2.75 6.85 6.42 0 3.83-2.42 6.92-5.77 6.92-1.13 0-2.19-.59-2.55-1.28l-.69 2.64c-.25.96-.93 2.16-1.39 2.9A12 12 0 1 0 12 0z" />
  </svg>
);

export const Footer: React.FC = () => {
  const { setIsTrackerOpen } = useStore();

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=61591797608948',
      icon: <FacebookIcon size={17} />,
      label: 'Elite Sports Hub Nepal',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/elite.sports.hub',
      icon: <InstagramIcon size={17} />,
      label: '@elite.sports.hub',
    },
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@elite.sports.hub',
      icon: <TikTokIcon size={17} />,
      label: '@elite.sports.hub',
    },
    {
      name: 'Pinterest',
      href: '#pinterest',
      icon: <PinterestIcon size={17} />,
      label: 'Elite Jersey Moodboards',
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@EliteSportsHub-k2k',
      icon: <YoutubeIcon size={17} />,
      label: 'Elite Sports Match Drops',
    },
  ];

  return (
    <footer
      id="main-store-footer"
      style={{
        background: '#040507',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#a1a1aa',
        padding: '4.5rem 0 2rem 0',
        position: 'relative',
        fontSize: '0.82rem',
      }}
    >
      <div className="container">
        {/* Top Grid: Logo, Socials, Navigation, Delivery Info */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            paddingBottom: '3.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Brand & Identity */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  background: '#ffffff',
                  color: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 900,
                  fontSize: '1rem',
                  letterSpacing: '-0.05em',
                }}
              >
                ESH
              </div>
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: '1.15rem',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    color: '#ffffff',
                    display: 'block',
                    textTransform: 'uppercase',
                  }}
                >
                  ELITE SPORTS HUB
                </span>
                <span style={{ fontSize: '0.68rem', color: '#71717a', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em' }}>
                  KATHMANDU // NEPAL
                </span>
              </div>
            </div>

            <p style={{ lineHeight: 1.6, color: '#94a3b8', fontSize: '0.82rem', maxWidth: '300px' }}>
              Wear the Victory. Authentic match & fan-issue cricket & football jerseys engineered with international player specifications.
            </p>

            {/* Social Icons Strip */}
            <div>
              <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', color: '#71717a', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
                Follow Our Drops:
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.name}
                    aria-label={s.name}
                    style={{
                      width: '36px',
                      height: '36px',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      background: 'rgba(255, 255, 255, 0.03)',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#ffffff';
                      e.currentTarget.style.color = '#000000';
                      e.currentTarget.style.borderColor = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links & Catalog */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: '#ffffff',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              Collections
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li>
                <a href="#catalog-section" style={{ color: '#a1a1aa', textDecoration: 'none', transition: 'color 0.2s' }}>
                  Nepal National Rhinos Cricket Kit
                </a>
              </li>
              <li>
                <a href="#catalog-section" style={{ color: '#a1a1aa', textDecoration: 'none', transition: 'color 0.2s' }}>
                  World Cup & European Football Jerseys
                </a>
              </li>
              <li>
                <a href="#catalog-section" style={{ color: '#a1a1aa', textDecoration: 'none', transition: 'color 0.2s' }}>
                  Limited Edition Vault (1 of 500)
                </a>
              </li>
              <li>
                <a href="#trending-drops-reel" style={{ color: '#a1a1aa', textDecoration: 'none', transition: 'color 0.2s' }}>
                  Headline Match Drops
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service & Order Tracking */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: '#ffffff',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              Order & Support
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li>
                <button
                  onClick={() => setIsTrackerOpen(true)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    padding: 0,
                    color: '#ffffff',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                  }}
                >
                  <Search size={14} color="#10b981" />
                  <span style={{ textDecoration: 'underline' }}>Track Your Order Status</span>
                </button>
              </li>
              <li>
                <span style={{ color: '#a1a1aa' }}>Payment: Cash on Delivery • eSewa • Khalti • Bank Transfer</span>
              </li>
              <li>
                <span style={{ color: '#a1a1aa' }}>Kathmandu Valley: Same-Day Dispatch</span>
              </li>
              <li>
                <span style={{ color: '#a1a1aa' }}>Nepal 77 Districts • Dubai (UAE) • India • Worldwide</span>
              </li>
            </ul>
          </div>

          {/* Staff & Admin Direct Access */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: '#ffffff',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              Management
            </div>
            <p style={{ fontSize: '0.78rem', color: '#71717a', lineHeight: 1.5, marginBottom: '0.85rem' }}>
              Dedicated admin workstation for managing match drops, custom print toggles, and live customer orders.
            </p>
            <Link
              href="/admin"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.55rem 0.85rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                textDecoration: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                borderRadius: '4px',
                transition: 'all 0.2s',
              }}
            >
              <Lock size={12} />
              <span>Admin Portal (/admin)</span>
            </Link>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Compliance, Regions */}
        <div
          style={{
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.75rem',
            color: '#71717a',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <div>
            © {new Date().getFullYear()} Elite Sports Hub Pvt. Ltd. All rights reserved. Registered in Kathmandu, Nepal.
          </div>

          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span>🇳🇵 Nepal (77 Districts)</span>
            <span>•</span>
            <span>🇦🇪 Dubai (UAE)</span>
            <span>•</span>
            <span>🇮🇳 India</span>
            <span>•</span>
            <span>🌐 International Air Cargo</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
