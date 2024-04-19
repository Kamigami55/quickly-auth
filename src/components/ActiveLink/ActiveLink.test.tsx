import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { ActiveLink } from './ActiveLink';

describe('ActiveLink', () => {
  it('renders a link', () => {
    render(
      <ActiveLink href="/" activeClassName="active">
        Active Link
      </ActiveLink>
    );

    expect(screen.getByText('Active Link')).toBeInTheDocument();
  });
});
