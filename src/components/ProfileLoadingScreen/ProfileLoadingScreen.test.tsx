import '@testing-library/jest-dom';

import { render } from '@testing-library/react';

import { ProfileLoadingScreen } from './ProfileLoadingScreen';

describe('ProfileLoadingScreen', () => {
  it('renders loading screen unchanged', () => {
    const { container } = render(<ProfileLoadingScreen />);
    expect(container).toMatchSnapshot();
  });
});
