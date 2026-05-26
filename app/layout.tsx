import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mirae SMT',
  description: 'OEM/ODM integrated manufacturing partner',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
