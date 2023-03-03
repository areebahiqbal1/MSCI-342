import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import SignUpFormBase from "./index";

describe('SignUpFormBase', () => {
    it('if Sign Up page renders', () => {
        const render = jest.fn().mockName('render');
        render(<SignUpFormBase render={render} />);
    });
});
