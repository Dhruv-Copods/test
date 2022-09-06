export interface Notes {
  id: string;
  text: string;
}

export interface ArchivedNotes {
  id: string;
  text: string;
}

export type NotesContextType = {
  allNotes: Notes[];
  archivedNotes: ArchivedNotes[];
  createNewNote: (noteString: string) => void;
  filterNotesUsingSearchString: (searchString: string) => void;
  deleteNote: (noteId: string) => void;
  archiveNote: (noteId: string) => void;
  unarchiveNote: (noteId: string) => void;
};
