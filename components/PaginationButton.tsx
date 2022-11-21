import React, { MouseEventHandler, PropsWithChildren } from "react";

const PaginationButton = ({
  intent,
  disabled,
  onClick,
  children,
}: PropsWithChildren<{
  intent: "previous" | "next";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}>) => {
  return (
    <button
      className="bg-blue-400 text-white p-2 rounded-xl font-medium w-fit hover:scale-105 shadow-lg shadow-blue-300 disabled:hover:scale-100 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={disabled}
      onClick={onClick}
    >
      {intent === "next" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export default PaginationButton;
