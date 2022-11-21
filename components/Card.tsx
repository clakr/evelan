import Image from "next/image";
import React from "react";
import { User } from "../types";

const Card = ({
  user: { id, email, first_name, last_name, avatar },
}: {
  user: User;
}) => {
  return (
    <div className="border border-slate-200 rounded-xl shadow-xl shadow-slate-200 p-6 min-h-[400px] flex flex-col justify-between">
      <Image
        alt={`${first_name}'s Avatar`}
        src={avatar}
        width={300}
        height={300}
        className="rounded-lg mx-auto"
      />
      <div className="flex flex-col justify-between">
        <div className="text-xl flex justify-between font-bold flex-grow">
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
