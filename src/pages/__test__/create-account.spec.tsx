import { render, waitFor } from "../../test-utils";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { RenderResult } from "@testing-library/react";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { CreateAccount, CREATE_ACCOUNT_MUTATION } from "../create-account";
import userEvent from '@testing-library/user-event';
import { UserRole } from "../../__type_graphql__/globalTypes";

const mockPush = jest.fn();

jest.mock('react-router-dom', () => {
  const realModule = jest.requireActual('react-router-dom');
  return {
    ...realModule,
    useHistory: () => {
      return {
        push: mockPush,
      };
    },
  };
});

describe("<CreateAccount />", () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <CreateAccount />
        </ApolloProvider>
      );
    });
  });

  it("renders OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe('Create Account | Nuber-podcasts');
    });
  });

  
  it('submit mutation with form values', async () => {
    const { getByRole, getByPlaceholderText } = renderResult;
    const email = getByPlaceholderText(/E-mail/i);
    const password = getByPlaceholderText(/Password/i);
    const confirm = getByPlaceholderText(/Confirm/i);
    const button = getByRole('button');
    const formData = {
      email: 'test3@test.com',
      password: '1212121212',
      role: UserRole.Listener,
    };
    const mockedCreateMutaionResponse = jest.fn().mockResolvedValue({
      data: {
        createAccount: {
          ok: true,
          error: 'error',
        },
      },
    });
    mockedClient.setRequestHandler(
      CREATE_ACCOUNT_MUTATION,
      mockedCreateMutaionResponse
    );
    jest.spyOn(window, 'alert').mockImplementation(() => null);
    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.type(confirm, formData.password);
      userEvent.click(button);
    });
    expect(mockedCreateMutaionResponse).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenLastCalledWith(
      'Account Created! Log in now!'
    );
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
});
