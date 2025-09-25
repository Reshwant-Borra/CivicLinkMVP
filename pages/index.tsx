// ASSIGNMENT: Developer 5 - Main App & Settings
// Work on: pages/index.tsx, pages/settings.tsx, components/Layout.tsx, components/Nav.tsx, components/ThemeToggle.tsx
// Focus: Homepage, settings page, shared components, global theming, navigation

import * as React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

const HomePage = () => {
  return (
    <Layout title="Home">
      <h1>Multi-Feature App</h1>
      <p>Welcome to the multi-feature demo application. Choose a feature below:</p>
      <ul>
        <li><Link href="/deadlines">Deadlines Lookup</Link></li>
        <li><Link href="/translate">Translation Assistant</Link></li>
        <li><Link href="/sms">SMS Simulator</Link></li>
        <li><Link href="/factcheck">News Claim Fact Check</Link></li>
        <li><Link href="/settings">Settings</Link></li>
      </ul>
    </Layout>
  );
};

export default HomePage;
