import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import SignInFormBase from "./SignIn";
import { MemoryRouter } from "react-router-dom";

describe('SignInFormBase', () => {
    it('if Sign In page renders', () => {
        const mockRender = jest.fn().mockName('mockRender');
        render(
            <MemoryRouter>
            <SignInFormBase render={mockRender} />
            </MemoryRouter>
            );
       const signInButton = screen.getByRole('button', { name: 'Sign In' });
       expect(signInButton).toBeInTheDocument();
    });
  });
  