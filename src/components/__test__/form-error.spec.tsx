import React from 'react';
import { render } from '@testing-library/react';
import { FormError } from '../form-error'

const errorMessage = 'test';

describe('<FormError />', () => {
    it('should error message print', () => {
        const { getByText } = render(<FormError errorMessage={errorMessage} />);
        getByText('test');
    })
})