import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { LoggedInRouter } from '../logged-in-router'
import { MockedProvider } from '@apollo/client/testing';
import { ME_QUERY } from '../../hooks/useMe';

describe('<LoggedInRouter />', () => {
    it('should render logged-in-router', async () => {
      const mocks = [
          {
            request: {
              query: ME_QUERY,
            },
            result: {
              data: {
                me: {
                  id: 1,
                  email: 'test1@test.com',
                  role: 'Host'
                }
              },
            },
          },
        ];
      await waitFor(async () => {
        const { getByText } = render(
          <MockedProvider mocks={mocks}>
            <LoggedInRouter />
          </MockedProvider>
        );
        await new Promise(resolve => setTimeout(resolve, 0));
        getByText('Page Not Found');
      });
    })
})