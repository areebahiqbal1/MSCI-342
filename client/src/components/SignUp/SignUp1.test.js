import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SignUpFormBase from "./index";

describe('SignUpFormBase', () => {
  it('should render the Sign Up page', () => {
    const mockRender = jest.fn().mockName('mockRender');
    render(
      <MemoryRouter>
        <SignUpFormBase render={mockRender} />
      </MemoryRouter>
    );
     const signUpButton = screen.getByRole('button', { name: 'Sign Up' });
     expect(signUpButton).toBeInTheDocument();
  });
});
