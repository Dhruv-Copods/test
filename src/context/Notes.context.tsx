import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import { createContext, useContext, useState } from "react";
import { ArchivedNotes, Notes, NotesContextType } from "interface/interface";

const NoteContext = createContext<NotesContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

const NoteProvider: React.FC<Props> = ({ children }) => {
  const [allNotes, setAllNotes] = useState<Notes[]>([]);
  const [archivedNotes, setArchivedNotes] = useState<ArchivedNotes[]>([]);

  const createNewNote = (noteText: string) => {
    setAllNotes([...allNotes, { id: uuidv4(), text: noteText }]);
  };

  const filterNotesUsingSearchString = (searchString: string) => {
    setAllNotes(
      allNotes.filter((note: Notes) => note.text.includes(searchString))
    );
  };

  const deleteNote = (noteId: string) => {
    setAllNotes(allNotes.filter((note: Notes) => noteId !== note.id));
    if (archivedNotes.length) {
      setArchivedNotes(
        archivedNotes.filter((note: ArchivedNotes) => noteId !== note.id)
      );
    }
  };

  const archiveNote = (noteId: string) => {
    setArchivedNotes([
      ...archivedNotes,
      allNotes.find((note) => note.id === noteId) as Notes,
    ]);
    setAllNotes(allNotes.filter((note) => noteId !== note.id));
  };

  const unarchiveNote = (noteId: string) => {
    setAllNotes([
      ...allNotes,
      archivedNotes.find((note) => noteId === note.id) as ArchivedNotes,
    ]);
    setArchivedNotes(archivedNotes.filter((note) => noteId !== note.id));
  };

  return (
    <NoteContext.Provider
      value={{
        allNotes,
        archivedNotes,
        createNewNote,
        filterNotesUsingSearchString,
        deleteNote,
        archiveNote,
        unarchiveNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

const useNoteContext = () => useContext(NoteContext);

export { useNoteContext, NoteProvider };
