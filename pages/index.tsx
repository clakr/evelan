import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col gap-2 items-center justify-center text-2xl">
      <h1>
        Created by: <b>Clark Kenneth C. Tolosa</b>
      </h1>
      <h2>
        Source code:{" "}
        <a
          href="https://github.com/clakr/evelan"
          className="font-bold text-blue-500 underline"
          target="_blank"
          rel="noreferrer"
        >
          https://github.com/clakr/evelan
        </a>
      </h2>
      <Link href="users">
        <span className="text-blue-500 underline">/users</span>
      </Link>
    </div>
  );
}
