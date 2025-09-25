// ASSIGNMENT: Developer 5 - Main App & Settings
// Work on: pages/index.tsx, pages/settings.tsx, components/Layout.tsx, components/Nav.tsx, components/ThemeToggle.tsx
// Focus: Homepage, settings page, shared components, global theming, navigation

import * as React from 'react';
import '../styles/global.css';
import '../styles/tokens.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
