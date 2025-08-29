"use client";

import css from "./CreateNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";

const CreateNoteClientPage = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm onSuccess={() => console.log("Note created successfully!")} />
      </div>
    </main>
  );
};

export default CreateNoteClientPage;
