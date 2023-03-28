import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import App from "./index";

describe('App', () => {
  it('if Profile page renders', () => {
      const render = jest.fn().mockName('render');
      render(<App render={render} />);
  });
  
});

