import type { Metadata } from 'next';
import BottomNav from '@/components/BottomNav';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from '@/components/Providers';


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
          <div className="relative min-h-screen">
            {children}
          </div>
          <BottomNav />
      </body>
    </html>
  );
}