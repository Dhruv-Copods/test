import { AddNotes, NotesShowcase } from "components";
import React from "react";

export const Notes = () => {
  return (
    <div className="flex flex-col justify-start items-center w-full">
      <AddNotes />
      <span className="h-0.5 rounded-sm border w-full my-3"></span>
      <NotesShowcase />
    </div>
  );
};
