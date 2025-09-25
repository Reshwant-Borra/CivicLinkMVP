// ASSIGNMENT: Developer 5 - Main App & Settings
// Work on: pages/index.tsx, pages/settings.tsx, components/Layout.tsx, components/Nav.tsx, components/ThemeToggle.tsx
// Focus: Homepage, settings page, shared components, global theming, navigation

import * as React from 'react';
import Head from 'next/head';
import Nav from './Nav';

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

const Layout = ({ title, children }: LayoutProps) => {
  const pageTitle = title ? `${title} - Multi-Feature App` : 'Multi-Feature App';
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Nav />
      <main className="container mx-auto p-4">
        {children}
      </main>
    </>
  );
};

export default Layout;
