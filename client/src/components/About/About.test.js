import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import App from "./index";

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';

import Home from "./index";
import { createTheme } from "@material-ui/core/styles";

describe('Home component', () => {
    it('renders the Home page title', () => {
      const { getByText } = render(
        <MemoryRouter>
        <Home />
      </MemoryRouter>
      );
      const titleElement = getByText('CAN-DO-CO-OP');
      expect(titleElement).toBeInTheDocument();
    });
});