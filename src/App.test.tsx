import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { HashRouter } from 'react-router-dom';

test('renders app', () => {
  render(
    <HashRouter>
      <App />
    </HashRouter>
  );
  const linkElement = screen.getByText(/Prime Parking/i);
  expect(linkElement).toBeInTheDocument();
});
