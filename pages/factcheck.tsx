// ASSIGNMENT: Developer 4 - Fact Check Feature
// Work on: features/factcheck/FactCheckPage.tsx and pages/factcheck.tsx
// Focus: Fact-checking functionality, news verification, API integration

import * as React from 'react';
import Layout from '../components/Layout';
import FactCheckPage from '../features/factcheck/FactCheckPage';

const FactCheckRoute = () => (
  <Layout title="News Claim Fact Check">
    <FactCheckPage />
  </Layout>
);

export default FactCheckRoute;
