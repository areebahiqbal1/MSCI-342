import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import SignInFormBase from "./SignIn";

describe('SignInFormBase', () => {
    it('if Sign In page renders', () => {
        const render = jest.fn().mockName('render');
        render(<SignInFormBase render={render} />);
    });
});
