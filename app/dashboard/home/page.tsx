"use client";
import { getSession, useSession } from "next-auth/react";
import React from "react";

const HomePage = () => {
  const { data: session, status, update } = useSession();
  console.log(session);

  return (
    <div>
      <h2>welcome to my home</h2>
    </div>
  );
};

export default HomePage;
