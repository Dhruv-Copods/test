import React from "react";
import { noteConstants } from "constants/constants";
import { useNoteContext } from "context/Notes.context";
import { useState } from "react";
import { NotesContextType } from "interface/interface";

export const AddNotes = () => {
  const { createNewNote } = useNoteContext() as NotesContextType;
  const [note, setNote] = useState("");

  const addNewNote = () => {
    if (!note) {
      alert(noteConstants.emptyNoteAlert);
    } else {
      createNewNote(note);
      setNote("");
    }
  };

  return (
    <div className="text-2xl flex flex-col">
      <textarea
        name="note"
        id="write-note"
        cols={50}
        rows={10}
        value={note}
        placeholder={noteConstants.textareaPlaceholder}
        className="rounded-lg p-2 border resize-none mt-3"
        onChange={(e) => setNote(e.target.value)}
      ></textarea>
      <button
        onClick={addNewNote}
        data-cy="submit"
        className="border py-3 my-2 rounded-lg hover:border-blue-500"
      >
        {noteConstants.addNote}
      </button>
    </div>
  );
};
