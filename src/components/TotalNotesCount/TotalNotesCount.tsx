import { useNoteContext } from "context/Notes.context";
import { NotesContextType } from "interface/interface";
import React from "react";

export const TotalNotesCount = () => {
  const { archivedNotes, allNotes } = useNoteContext() as NotesContextType;
  console.log(archivedNotes, allNotes);
  return (
    <div className="p-5 flex flex-col gap-5">
      <h2 className="text-lg">Total Notes: {allNotes.length}</h2>
      <h2 className="text-lg">
        Total Archived Notes: {archivedNotes.length}
      </h2>{" "}
    </div>
  );
};
