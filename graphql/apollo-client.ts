import { ApolloClient, InMemoryCache, HttpLink, from, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import Cookies from "js-cookie";

const authLink = setContext((_, { headers }) => {
  if (typeof window !== "undefined") {
    const token = Cookies.get("authToken");
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  }
  return { headers };
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://take-home-be.onrender.com/api",
    connectionParams: () => {
      const token = Cookies.get("authToken");
      console.log('Sending connection params:', { authToken: token });
      return {
        authToken: token,
      };
    },
    on: {
      connected: () => {
        console.log("WebSocket connection established");
      },
      error: (error) => {
        console.error("WebSocket error:", error);
      },
    },
  })
);

const httpLink = new HttpLink({
  uri: "https://take-home-be.onrender.com/api",
  credentials: "same-origin",
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  ssrMode: true,
  link: from([authLink, splitLink]),
  cache: new InMemoryCache(),
});

export default client;
