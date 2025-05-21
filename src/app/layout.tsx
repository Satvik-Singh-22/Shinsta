// src/app/layout.tsx
import './globals.css';
import NavBar from '@/components/NavBar';

export const metadata = {
  title: 'Shinsta',
  description: 'A social media web app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
