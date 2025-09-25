// ASSIGNMENT: Developer 5 - Main App & Settings
// Work on: pages/index.tsx, pages/settings.tsx, components/Layout.tsx, components/Nav.tsx, components/ThemeToggle.tsx
// Focus: Homepage, settings page, shared components, global theming, navigation

import * as React from 'react';
import Layout from '../components/Layout';
import ThemeToggle from '../components/ThemeToggle';

const SettingsPage = () => (
  <Layout title="Settings">
    <h1>Settings</h1>
    <p>Customize your preferences:</p>
    <ThemeToggle />
  </Layout>
);

export default SettingsPage;
