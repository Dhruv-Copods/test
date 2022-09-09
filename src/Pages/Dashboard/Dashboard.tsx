import { TotalNotesCount } from "components";
import React from "react";

export const Dashboard = () => {
  return (
    <div className="w-full flex flex-col items-start justify-start">
      <h1 className="m-4 text-2xl w-full text-center">Dashboard</h1>
      <TotalNotesCount />
    </div>
  );
};
