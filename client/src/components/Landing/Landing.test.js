import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import TheLanding from "./Landing";




jest.mock('./resumee.jpg', () => ({})); // Mock the resumee.jpg file

describe('TheLanding component', () => {
  it('renders the landing page title', () => {
    const { getByText } = render(<TheLanding />);
    const titleElement = getByText('Can do Co-op');
    expect(titleElement).toBeInTheDocument();
  });

  // Add additional test cases as needed
});


// module.exports = {
//     // other configuration options...
  
//     moduleNameMapper: {
//       "\\.(jpg|jpeg|png|gif)$": "client/__mocks__/resumee.jpg",
//     },
//   };
//  test("renders the landing page title", () => {
//    const { getByText } = render(<TheLanding />);
//    const titleElement = getByText("Can do Co-op");
//    expect(titleElement).toBeInTheDocument();
//  });

// it("renders Landing component", () => {
//   render(<TheLanding />);
//   expect(screen.getByText("Can do Co-op")).toBeInTheDocument();
// });
