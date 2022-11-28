import Image from "next/image";
import React from "react";
import { User } from "../types";

const Card = ({
  user: { id, email, first_name, last_name, avatar },
}: {
  user: User;
}) => {
  return (
    <div className="border border-slate-200 rounded-xl shadow-xl shadow-slate-200 p-6 flex flex-col justify-between m-4 w-[275px]">
      <div className="min-h-[250px] relative flex-grow">
        <Image
          alt={`${first_name}'s Avatar`}
          src={avatar}
          className="rounded-lg mx-auto object-cover object-center"
          fill
        />
      </div>
      <div className="flex flex-col justify-between mt-8">
        <div className="text-xl flex justify-between font-bold ">
          <h1>
            {first_name} {last_name}
          </h1>
          <h2>#{id}</h2>
        </div>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default Card;
