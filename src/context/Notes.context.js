import { v4 as uuidv4 } from "uuid";
import { createContext, useContext, useState } from "react";

const NoteContext = createContext();

const NoteProvider = ({ children }) => {
  const [allNotes, setAllNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);

  const createNewNote = (noteText) => {
    setAllNotes([...allNotes, { id: uuidv4(), text: noteText }]);
  };

  const filterNotesUsingSearchString = (searchString) => {
    setAllNotes(allNotes.filter((note) => note.text.includes(searchString)));
  };

  const deleteNote = (noteId) => {
    setAllNotes(allNotes.filter((note) => noteId !== note.id));
    if (archivedNotes.length) {
      setArchivedNotes(archivedNotes.filter((note) => noteId !== note.id));
    }
  };

  const archiveNote = (noteId) => {
    setArchivedNotes([
      ...archivedNotes,
      allNotes.find((note) => note.id === noteId),
    ]);
    setAllNotes(allNotes.filter((note) => noteId !== note.id));
  };

  const unarchiveNote = (noteId) => {
    setAllNotes([
      ...allNotes,
      archivedNotes.find((note) => noteId === note.id),
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
