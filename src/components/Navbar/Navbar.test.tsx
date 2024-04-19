import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { Navbar } from './Navbar';

describe('Navbar', () => {
  it('renders a navbar', () => {
    render(<Navbar />);

    const navbar = screen.getByRole('navigation');

    expect(navbar).toBeInTheDocument();
  });
});
