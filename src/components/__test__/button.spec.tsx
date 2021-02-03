import React from 'react';
import { render } from '@testing-library/react';
import { Button } from '../button';

const props = {
    canClick: false,
    loading: true,
    actionText: 'test',
    className: 'test'
}

describe('<Button />', () => {
    it('renders Loading', () => {
        const { getByText } = render(<Button {...props} />);
        getByText('Loading...');
  });
})