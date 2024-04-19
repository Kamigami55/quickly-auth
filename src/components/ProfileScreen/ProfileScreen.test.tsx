import '@testing-library/jest-dom';

import { render } from '@testing-library/react';

import { ProfileScreen } from './ProfileScreen';

const profile = {
  user: {
    first_name: 'Eason',
    last_name: 'Chang',
    email: 'eason@example.com',
    Company: {
      legal_name: 'ACME Inc.',
      business_registration: 'corporate',
      business_type: 'Digital products',
      industry: 'Apps',
      expected_activity: 'Get my invoices paid early',
      early_pay_intent: 1,
      website: 'https://acme.com',
      business_number: '123456789',
      phone: '1234567890',
      has_trade_name: false,
    },
  },
  company: {
    legal_name: 'ACME Inc.',
    business_registration: 'corporate',
    business_type: 'Digital products',
    industry: 'Apps',
    expected_activity: 'Get my invoices paid early',
    early_pay_intent: 1,
    website: 'https://acme.com',
    business_number: '123456789',
    phone: '1234567890',
    has_trade_name: false,
  },
};

describe('ProfileScreen', () => {
  it('renders profile screen unchanged', () => {
    const { container } = render(<ProfileScreen profile={profile} />);
    expect(container).toMatchSnapshot();
  });
});
