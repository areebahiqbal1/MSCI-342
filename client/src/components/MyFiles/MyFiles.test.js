import * as React from 'react';
import { render, screen } from '@testing-library/react';
import App from './index';
import "@testing-library/jest-dom";

describe('App', () => {
    it('displays document title', () => {
        const { getByText } = render(<App />);
        const titleElement = getByText('My Files');
        expect(titleElement).toBeInTheDocument();
    });
    it('displays caption', () => {
        const { getByText } = render(<App />);
        const titleElement = getByText('Manage your uploads and view their feedback');
        expect(titleElement).toBeInTheDocument();
    });
    it('displays the toolbar buttons', () => {
        const { getByText } = render(<App />);
        const titleElement = getByText('Home');
        expect(titleElement).toBeInTheDocument();
    });
});
