import React from "react";
import Main from "@/components/Main";
import client from "@/graphql/apollo-client";
import { GET_PRODUCTS } from "@/graphql/queries";
import { GetServerSidePropsContext } from "next";
import { ProductType } from "@/types/types";

type Props = {
  data: ProductType[];
};

export default function Home({ data }: Props) {

  return (
    <div>
      <Main productsData={data} />
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
      data: data.getProducts.products || null,
    },
  };
}
