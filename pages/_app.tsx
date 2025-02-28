import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/apollo-client";
import { useRouter } from "next/router";
import { CartProvider } from "../context/CartContext"; 

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const noLayoutRoutes = ["/login"]; 

  return (
    <ApolloProvider client={client}>
      <CartProvider>
        <div className="container">
          {!noLayoutRoutes.includes(router.pathname) && <Header />}
          <Component {...pageProps} />
          {!noLayoutRoutes.includes(router.pathname) && <Footer />}
        </div>
      </CartProvider>
    </ApolloProvider>
  );
}
