import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";
("next/router");
import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import PaginationButton from "../../components/PaginationButton";
import { Response } from "../../types";

export const getServerSideProps: GetServerSideProps<{
  data: Response;
}> = async (context: GetServerSidePropsContext) => {
  const res = await fetch(
    `https://reqres.in/api/users?page=${context.query.page}`
  );
  const data: Response = await res.json();

  return {
    props: {
      data,
    },
  };
};

const Users = ({
  data: response,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [data, setData] = useState(response);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { data: users, total, total_pages } = data;

  const router = useRouter();

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`https://reqres.in/api/users?&page=${page + 1}`);
      const fetchedData: Response = await res.json();

      setData({
        ...data,
        data: [...data.data, ...fetchedData.data],
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.query.page) {
      setPage(+router.query.page);
    }

    return () => {};
  }, [page, router.query]);

  useEffect(() => {
    let isSubscribed = true;

    const fetchData = async () => {
      try {
        const res = await fetch(`https://reqres.in/api/users?page=${page}`);
        const fetchedData: Response = await res.json();

        if (isSubscribed) {
          setData({ ...fetchedData });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      isSubscribed = false;
    };
  }, [page]);

  return (
    <main className="max-w-4xl mx-auto grid grid-cols-3 gap-4 min-h-screen py-8">
      {users.length > 0 && (
        <>
          {users.map((user) => (
            <Card user={user} key={user.id} />
          ))}
        </>
      )}

      {isLoading && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-20 animate-spin fill-blue-400 col-span-full mx-auto"
        >
          <path d="M304 48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm0 416c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM48 304c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm464-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM142.9 437c18.7-18.7 18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zm0-294.2c18.7-18.7 18.7-49.1 0-67.9S93.7 56.2 75 75s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zM369.1 437c18.7 18.7 49.1 18.7 67.9 0s18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9z" />
        </svg>
      )}

      {users.length > 0 && (
        <div className="col-span-full flex flex-col items-center gap-4">
          {/* Load More Button */}
          <button
            className="bg-blue-500 text-white px-8 py-2 rounded-xl font-medium w-fit hover:scale-105 shadow-lg shadow-blue-300 disabled:hover:scale-100 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleClick}
            disabled={users[users.length - 1]?.id === total}
          >
            Load More
          </button>

          {/* Pagination */}
          <div className="flex gap-4 text-2xl font-bold">
            <PaginationButton
              intent="previous"
              disabled={page === 1}
              onClick={() => router.push(`users?page=${page - 1}`)}
            ></PaginationButton>
            {page}
            <PaginationButton
              intent="next"
              disabled={page === total_pages}
              onClick={() => router.push(`users?page=${page + 1}`)}
            ></PaginationButton>
          </div>
        </div>
      )}
    </main>
  );
};

export default Users;
