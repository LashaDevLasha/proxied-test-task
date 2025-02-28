import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import Cookies from 'js-cookie';

const token = Cookies.get('authToken'); 

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://take-home-be.onrender.com/api', 
    credentials: 'same-origin', 
    headers: {
      Authorization: token ? `Bearer ${token}` : '',  
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
