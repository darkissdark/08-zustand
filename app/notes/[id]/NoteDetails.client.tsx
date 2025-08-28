"use client";

import css from "./NoteDetails.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";

type NoteDetailsProps = {
  id: string;
};

export default function NoteDetailsClient({ id }: NoteDetailsProps) {
  const { data, isLoading, error } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => {
      if (!id) throw new Error("No note ID provided");
      return fetchNoteById(id);
    },
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p className={css.flexWrap}>Loading, please wait...</p>;
  }

  if (error || !data) {
    return <p className={css.flexWrap}>Something went wrong.</p>;
  }

  return (
    <div className={css.flexWrap}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{data.title}</h2>
          </div>
          <p className={css.content}>{data.content}</p>
          <p className={css.date}>
            {new Date(data.createdAt).toLocaleString("uk-UA")}
          </p>
        </div>
      </div>
    </div>
  );
}
