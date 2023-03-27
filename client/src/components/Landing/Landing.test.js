import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import TheLanding from "./Landing";
import { createTheme } from "@material-ui/core/styles";



jest.mock('./resumee.jpg', () => ({})); // Mocks the resumee.jpg file

describe('TheLanding component', () => {
  it('renders the landing page title', () => {
    const { getByText } = render(<TheLanding />);
    const titleElement = getByText('CAN-DO-CO-OP');
    expect(titleElement).toBeInTheDocument();
  });
  describe('TheLanding', () => {
    it('should render Sign In and Sign Up buttons', () => {
      const { getByRole } = render(<TheLanding />);
      const signInButton = getByRole('button', { name: /sign in/i });
      const signUpButton = getByRole('button', { name: /sign up/i });
      expect(signInButton).toBeInTheDocument();
      expect(signUpButton).toBeInTheDocument();
    });
  
  });
  

// const lighttheme = createTheme({
//   palette: {
//     type: "light",
//     background: {
//       default: "#ffedf3", //pinkish
//     },
//     primary: {
//       main: "#facad9", //pink
//     },
//     secondary: {
//       main: "#ff003c", //pinker
//     },
//   },
// });

// describe("Theme colors", () => {
//   test("Primary color should be pink", () => {
//     expect(lighttheme.palette.primary.main).toBe("#facad9");
//   });
// });

});