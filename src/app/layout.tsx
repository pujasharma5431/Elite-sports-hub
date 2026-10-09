import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '../context/StoreContext';
import { NepalDeliveryBanner } from '../components/NepalDeliveryBanner';
import { Navbar } from '../components/Navbar';

export const metadata: Metadata = {
  title: 'Elite Sports Hub Nepal | Official Cricket, Football & Limited Edition Jerseys',
  description:
    'Nepal’s premier jersey destination. Shop official match kits for Nepal Rhinos, Indian Cricket (Kohli, Rohit, Dhoni), Football giants (Messi, Ronaldo, Mbappé, Real Madrid), and exclusive numbered Limited Editions. Same-day Kathmandu delivery, cash on delivery, and eSewa.',
  keywords: [
    'Nepal jersey store',
    'cricket jersey nepal',
    'football jersey kathmandu',
    'nepal rhinos t20 world cup jersey',
    'virat kohli jersey nepal',
    'messi jersey nepal',
    'ronaldo jersey kathmandu',
    'limited edition jersey',
    'elitesportshub',
  ],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#07090e',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <StoreProvider>
          <NepalDeliveryBanner />
          <Navbar />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
