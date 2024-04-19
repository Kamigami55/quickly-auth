import '@testing-library/jest-dom';

import { render } from '@testing-library/react';

import { ProfileUnauthorizedScreen } from './ProfileUnauthorizedScreen';

describe('ProfileUnauthorizedScreen', () => {
  it('renders unauthorized screen unchanged', () => {
    const { container } = render(<ProfileUnauthorizedScreen />);
    expect(container).toMatchSnapshot();
  });
});
