// ASSIGNMENT: Developer 1 - Deadlines Feature
// Work on: features/deadlines/DeadlinesPage.tsx and pages/deadlines.tsx
// Focus: ZIP code lookup functionality, deadline display, API integration

import * as React from 'react';
import Layout from '../components/Layout';
import DeadlinesPage from '../features/deadlines/DeadlinesPage';

const DeadlinesRoute = () => (
  <Layout title="Deadlines Lookup">
    <DeadlinesPage />
  </Layout>
);

export default DeadlinesRoute;
