import * as React from "react";
import { noteShowcaseConstants } from "constants/constants";
import { useNoteContext } from "context/Notes.context";
import { NotesContextType } from "interface/interface";

export const ArchivedNote = () => {
  const { archivedNotes, deleteNote, unarchiveNote } =
    useNoteContext() as NotesContextType;

  return (
    <div id="all-notes" className="flex m-8 flex-wrap text-2xl gap-5">
      {archivedNotes.map(({ id, text }: { id: string; text: string }) => {
        return (
          <div
            key={id}
            className="archivedNotes selection:border p-2 w-96 flex flex-col justify-center items-center rounded-lg gap-3"
          >
            <h2 className="noteText break-all">{text}</h2>
            <button
              onClick={() => unarchiveNote(id)}
              className="border w-full rounded-lg pb-1 py-1 hover:border-yellow-500"
            >
              {noteShowcaseConstants.unarchiveNote}
            </button>
            <button
              onClick={() => deleteNote(id)}
              data-cy="delete"
              className="border w-full rounded-lg pb-1 py-1 hover:border-red-500"
            >
              {noteShowcaseConstants.deleteNote}
            </button>
          </div>
        );
      })}
    </div>
  );
};
