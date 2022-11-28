import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import React, { useState } from "react";
import Card from "../../components/Card";
import { Data } from "../../types";
import fetchData from "../../utils/fetchData";

export const getStaticProps: GetStaticProps<{
  data: Data;
}> = async () => {
  const data = await fetchData("https://reqres.in/api/users?&page=1");

  return {
    props: {
      data,
    },
  };
};

const Users = ({
  data: response,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [data, setData] = useState(response);

  const { data: users, total } = data;

  const handleClick = async () => {
    try {
      const { data: newUsers } = await fetchData(
        "https://reqres.in/api/users?&page=2"
      );

      setData({
        ...data,
        data: [...users, ...newUsers],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Evelan - Users</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="This is for a frontend practical exam for a company called Evelan GmbH"
        ></meta>
      </Head>

      <main className="max-w-4xl mx-auto grid grid-cols-1 min-h-screen sm:grid-cols-2 lg:grid-cols-3 place-items-center">
        {users.length > 0 && (
          <>
            {users.map((user) => (
              <Card user={user} key={user.id} />
            ))}
          </>
        )}

        {users.length > 0 && (
          <div className="col-span-full flex flex-col items-center">
            {/* Load More Button */}
            <button
              className="bg-blue-600 text-white px-8 py-2 rounded-xl font-medium w-fit hover:scale-105 shadow-lg shadow-blue-300 disabled:hover:scale-100 disabled:opacity-50 disabled:cursor-not-allowed my-4"
              onClick={handleClick}
              disabled={users[users.length - 1]?.id === total}
            >
              Load More
            </button>
          </div>
        )}
      </main>
    </>
  );
};

export default Users;
