import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import {Header} from '../header'
import { ME_QUERY } from '../../hooks/useMe';
import { BrowserRouter as Router } from 'react-router-dom';

describe('<Header />', () => {
    it('should render to header', async () => {
        const mocks = [
            {
              request: {
                query: ME_QUERY,
              },
              result: {
                data: {
                  id: 1,
                  email: 'test@test.com',
                  role: 'Host',
                  verified: false,
                },
              },
            },
          ];
          await waitFor(async () => {
            const { getByText } = render(
              <MockedProvider mocks={mocks}>
                  <Router>
                    <Header />
                  </Router>
              </MockedProvider>
            );
            await new Promise(resolve => setTimeout(resolve, 0));
            getByText('Nuber-Podcasts');
          });
    })
})