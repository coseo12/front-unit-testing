import { render, waitFor } from "../../../test-utils";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { RenderResult } from "@testing-library/react";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { ALLPODCASTS_QUERY, Podcasts } from "../podcasts";
import { MockedProvider } from '@apollo/client/testing';


describe("<Podcasts />", () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;

  beforeEach(async () => {
    const podcasts = [{
      id: 1,
      description: "코딩은 진짜를 만들어보는거야!. 실제 구현되어 있는 서비스를 한땀 한땀 따라 만들면서 코딩을 배우세요!",
      title: "Nomad Coders",
      thumbnailUrl: "https://www.filepicker.io/api/file/8zhcu9oTtiFw9jQSglsR",
    }]
    const mocks = [
      {
        request: {
          query: ALLPODCASTS_QUERY,
        },
        result: {
          data: {
            getAllPodcasts: {
              ok: true,
              error: 'error',
              podcasts
            }
          },
        },
      },
    ];
    
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <MockedProvider mocks={mocks}>
            <Podcasts />
          </MockedProvider>
        </ApolloProvider>
      );
    });
  });
  it("renders OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe('Home | Nuber-podcasts');
    });
  });

});
