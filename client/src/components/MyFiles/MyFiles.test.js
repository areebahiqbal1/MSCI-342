import * as React from 'react';
import { render, screen } from '@testing-library/react';
import App from './index.js';
import preview from 'jest-preview'

describe('App', () => {
    it('loads documents on first render', () => {
        const createList = jest.fn().mockName('createList');
        render(<App createList={createList} />);
        expect(createList).toHaveBeenCalled();
    });
    it('displays the document names', () => {
        const noop = () => { };
        const docs = [
            {doc_name: 'test1.txt'},
            {doc_name: 'test2.pdf'},
        ];
        render(<App />);
        expect(screen.getByText('test1.txt')).toBeInTheDocument();
        expect(screen.getByText('test2.txt')).toBeInTheDocument();
        preview.debug();
    });
});
