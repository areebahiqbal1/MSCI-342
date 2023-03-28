import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import HomeBase from "./index";

describe("App", () => {
  it("if Home page renders", () => {
    const render = jest.fn().mockName("render");
    render(<HomeBase render={render} />);
  });
});