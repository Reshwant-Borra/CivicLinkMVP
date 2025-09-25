// ASSIGNMENT: Developer 2 - Translation Feature
// Work on: features/translation/TranslationPage.tsx and pages/translate.tsx
// Focus: Text translation functionality, language selection, API integration

import * as React from 'react';
import Layout from '../components/Layout';
import TranslationPage from '../features/translation/TranslationPage';

const TranslateRoute = () => (
  <Layout title="Translation Assistant">
    <TranslationPage />
  </Layout>
);

export default TranslateRoute;
