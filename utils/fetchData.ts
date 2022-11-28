import React from "react";
import { Data } from "../types";

const fetchData = async (url: string) => {
  const res = await fetch(url);
  const data: Data = await res.json();

  return data;
};

export default fetchData;
