import React, { useEffect } from "react";
import Main from "@/components/Main";
import client from "@/graphql/apollo-client";
import { GET_PRODUCTS } from "@/graphql/queries";
import { GetServerSidePropsContext } from "next";
import { ProductType } from "@/types/types";
import { useQuery } from "@apollo/client";

type Props = {
  initialData: ProductType[];
};

export default function Home({ initialData }: Props) {
  const { data, loading, error, refetch, called } = useQuery(GET_PRODUCTS, {
    skip: true, 
  });

  useEffect(() => {
    if (!called) {
      refetch();
    }
    const interval = setInterval(() => {
      refetch();
    }, 60000);

    return () => clearInterval(interval);
  }, [refetch, called]);

  if (loading && !called) return <div>Loading...</div>; 
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Main productsData={data?.getProducts?.products || initialData} />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.authToken || null;

  const { data } = await client.query({
    query: GET_PRODUCTS,
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return {
    props: {
      initialData: data.getProducts.products || [],
    },
  };
}
