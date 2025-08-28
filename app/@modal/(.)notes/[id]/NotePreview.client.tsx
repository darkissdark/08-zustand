"use client";

import { fetchNoteById } from "@/lib/api";
import css from "./NotePreview.module.css";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import type { Note } from "@/types/note";
import Modal from "@/components/Modal/Modal";

type NotePreviewProps = {
  id: string;
};

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();

  const { data, isLoading, error } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => {
      if (!id) throw new Error("No note ID provided");
      return fetchNoteById(id);
    },
    refetchOnMount: false,
  });

  if (isLoading) {
    return <Modal onClose={() => close()}>Loading, please wait...</Modal>;
  }

  if (error || !data) {
    return <Modal onClose={() => close()}>Something went wrong.</Modal>;
  }

  const close = () => router.back();

  return (
    <Modal onClose={() => close()}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{data?.title}</h2>
        </div>
        <p className={css.content}>{data?.content}</p>
        <div className={css.fSpace}>
          <span className={css.tag}>{data?.tag}</span>
          {data?.createdAt && (
            <p className={css.date}>
              {new Date(data.createdAt).toLocaleString("uk-UA")}
            </p>
          )}
        </div>
        <button className={css.backBtn} onClick={() => close()}>
          Назад
        </button>
      </div>
    </Modal>
  );
}
