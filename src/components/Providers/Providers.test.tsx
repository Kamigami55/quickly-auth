import '@testing-library/jest-dom';

import { render } from '@testing-library/react';

import { Providers } from './Providers';

describe('Providers', () => {
  it('renders providers unchanged', () => {
    const { container } = render(<Providers>test</Providers>);
    expect(container).toMatchSnapshot();
  });
});
