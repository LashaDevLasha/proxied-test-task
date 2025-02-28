import Main from "@/components/Main";
import client from "@/graphql/apollo-client";
import { GET_PRODUCTS } from "@/graphql/queries";
import { GetServerSidePropsContext } from "next";

type Props = {
  data: Array<{
    _id: string;
    title: string;
    cost: number;
    availableQuantity: number;
    isArchived: boolean;
    createdAt: string;
    updatedAt: string;
  }>;
};
export default function Home({ data }: Props) {
  return (
    <div>
      <Main data={data} />
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

  // console.log("Cart data:", data);

  return {
    props: {
      data: data.getProducts.products || null,
    },
  };
}
