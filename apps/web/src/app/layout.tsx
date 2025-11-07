import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './globals.css';

import { Navbar } from '@/components/navbar';
import { WalletProvider } from "@/components/wallet-provider"

const lato = Lato({ 
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-lato',
});

export const metadata: Metadata = {
  title: 'NaijaSend - Send Money Home, Fast',
  description: 'Send money to Nigeria using cNGN on the Celo blockchain',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <div className="relative flex min-h-screen flex-col">
          <WalletProvider>
            <main className="flex-1">
              {children}
            </main>
          </WalletProvider>
        </div>
      </body>
    </html>
  );
}