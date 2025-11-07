import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './globals.css';
import BottomNav from '@/components/BottomNav';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from '@/components/Providers';

const lato = Lato({ 
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-lato',
});

export const metadata: Metadata = {
  title: 'Celo Naija - Send Money Home, Fast',
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
        <Providers>
          <div className="relative min-h-screen">
            {children}
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}