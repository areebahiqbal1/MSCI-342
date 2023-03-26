import "@testing-library/jest-dom";
import React from "react";
import HomeBase from "./index";
import { render, screen } from "@testing-library/react";


describe('TheLanding component', () => {
        it('renders the landing page title', () => {
          const { getByText } = render(<HomeBase />);
          const titleElement = getByText('CAN-DO-CO-OP');
          expect(titleElement).toBeInTheDocument();
       
  });
});