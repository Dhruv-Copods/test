import { noteShowcaseConstants } from "constants/constants";
import { useNoteContext } from "context/Notes.context";

export const NotesShowcase = () => {
  const { allNotes, filterNotesUsingSearchString, deleteNote, archiveNote } =
    useNoteContext();

  return (
    <div className="p-5 w-full">
      <div className="flex justify-around items-center">
        <h2 className="text-2xl">
          {!allNotes.length
            ? noteShowcaseConstants.noNotes
            : noteShowcaseConstants.allNotes}
        </h2>
        <input
          type="text"
          className="border pr-14 pl-3 py-2 rounded-lg"
          placeholder={noteShowcaseConstants.inputPlaceholder}
          onChange={(e) => filterNotesUsingSearchString(e.target.value)}
        />
      </div>
      <div className="flex mt-8 flex-wrap text-2xl gap-5">
        {allNotes.map(({ id, text }) => {
          return (
            <div
              key={id}
              id="all-notes"
              className="allNotes border p-2 w-96 flex flex-col justify-center items-center rounded-lg gap-3"
            >
              <h2 className="noteText break-all">{text}</h2>
              <button
                onClick={() => archiveNote(id)}
                data-cy="archive"
                className="border w-full rounded-lg pb-1 py-1 hover:border-yellow-500"
              >
                {noteShowcaseConstants.archiveNote}
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
    </div>
  );
};
