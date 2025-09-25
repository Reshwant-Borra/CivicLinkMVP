// ASSIGNMENT: Developer 5 - Main App & Settings
// Work on: pages/index.tsx, pages/settings.tsx, components/Layout.tsx, components/Nav.tsx, components/ThemeToggle.tsx
// Focus: Homepage, settings page, shared components, global theming, navigation

import * as React from 'react';
import Link from 'next/link';

const Nav = () => {
  return (
    <nav style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #ccc' }}>
      <Link href="/">Home</Link> |{' '}
      <Link href="/deadlines">Deadlines</Link> |{' '}
      <Link href="/translate">Translate</Link> |{' '}
      <Link href="/sms">SMS</Link> |{' '}
      <Link href="/factcheck">FactCheck</Link> |{' '}
      <Link href="/settings">Settings</Link>
    </nav>
  );
};

export default Nav;
