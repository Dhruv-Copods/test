import { ArchivedNote } from "components";
import React from "react";

export const Archives = () => {
  return (
    <div className="w-full flex flex-col items-start justify-start">
      <h1 className="m-4 text-2xl w-full text-center">Archived Notes</h1>
      <div className="flex items-start mr-3">
        <ArchivedNote />
      </div>
    </div>
  );
};
