import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import TheLanding from "./Landing";
import cy from 'cypress';


jest.mock('./resumee.jpg', () => ({})); // Mocks the resumee.jpg file

describe('TheLanding component', () => {
  it('renders the landing page title', () => {
    const { getByText } = render(<TheLanding />);
    const titleElement = getByText('Can do Co-op');
    expect(titleElement).toBeInTheDocument();
  });
  
  
});