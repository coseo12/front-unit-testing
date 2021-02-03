import { render, waitFor } from "../../../test-utils";
import React from "react";
import { Episodes, GET_EPISODES_QUERY } from "../episodes";
import { ApolloProvider } from "@apollo/client";
import { RenderResult } from "@testing-library/react";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { MockedProvider } from '@apollo/client/testing';

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom')!,
//   useParams: jest.fn().mockReturnValue({ id: 6 }),
// }))

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client')!,
  useQuery: () => ({ 
    data: {
      getPodcast: {
        podcast:[{
          title: '',
          description: '',
          thumbnailUrl: '',
        }]
      },
      getEpisodes: {
        episodes: [{
          title: '',
          description: '',
        }]
      }
    }, 
    loading: false, 
    error: null }),
}))

describe("<Episodes />", () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    // const mocks = [
    //   {
    //     request: {
    //       query: GET_EPISODES_QUERY,
    //       variables: {
    //         input: {
    //           id: 6
    //         }
    //       },
    //     },
    //     result: {
    //       data: {
    //         getPodcast: {
    //           ok: true,
    //           error: 'error',
    //           podcasts: [{id:1}],
    //         },
    //         getEpisodes: {
    //           ok: true,
    //           error: 'error',
    //           episodes: [{id:1}],
    //         }, 
    //       },
    //     },
    //   },
    // ];
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          {/* <MockedProvider mocks={mocks}> */}
            <Episodes />
          {/* </MockedProvider> */}
        </ApolloProvider>
      );
    });
  });
  it("renders OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe('Episode List | Nuber-podcasts');
    });
  });
});
