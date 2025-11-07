"use client";
import { Lato } from 'next/font/google';
import './globals.css';
import BottomNav from '@/components/BottomNav';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from '@/components/Providers';
import { usePathname } from 'next/navigation';

const lato = Lato({ 
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-lato',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Hide BottomNav on onboarding page
  const showBottomNav = pathname !== '/onboarding' && pathname !== '/';

  return (
    <html lang="en">
      <body className={lato.className}>
        <Providers>
          <div className="relative min-h-screen">
            {children}
            {showBottomNav && <BottomNav />}
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}