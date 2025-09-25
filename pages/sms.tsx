// ASSIGNMENT: Developer 3 - SMS Feature
// Work on: features/sms/SMSPage.tsx and pages/sms.tsx
// Focus: SMS simulation, chat interface, message handling

import * as React from 'react';
import Layout from '../components/Layout';
import SMSPage from '../features/sms/SMSPage';

const SMSRoute = () => (
  <Layout title="SMS Simulator">
    <SMSPage />
  </Layout>
);

export default SMSRoute;
