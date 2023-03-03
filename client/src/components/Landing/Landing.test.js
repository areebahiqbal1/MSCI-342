import '@testing-library/jest-dom'
import React from 'react';
import { render, screen } from '@testing-library/react';
import TheLanding from './Landing';

// test("renders the landing page title", () => {
//   const { getByText } = render(<TheLanding />);
//   const titleElement = getByText("Can do Co-op");
//   expect(titleElement).toBeInTheDocument();
// });

it('renders Landing component', () => {
    render(<TheLanding />);
  expect(screen.getByText("Can do Co-op")).toBeInTheDocument();
  });