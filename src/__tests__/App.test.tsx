import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { HashRouter } from 'react-router-dom';

const MockApp = () => {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  )
}

describe("App", () => {
  test('should render app', async () => {

    render(
      <MockApp />
    );

    const linkElement = screen.getByText(/Prime Parking/i);
    expect(linkElement).toBeInTheDocument();

    const headerElement = screen.getByTestId("header");
    const navigationElement = screen.getByTestId("navigation");
    const mainElement = screen.getByTestId("header");

    expect(headerElement).toBeInTheDocument();
    expect(navigationElement).toBeInTheDocument();
    expect(mainElement).toBeInTheDocument();
  });
})
