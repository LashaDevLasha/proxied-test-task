import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
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

const httpLink = new HttpLink({
  uri: "https://take-home-be.onrender.com/api",
  credentials: "same-origin",
});

const link = from([authLink, httpLink]);

const client = new ApolloClient({
  ssrMode: true,
  link,
  cache: new InMemoryCache(),
});

export default client;
