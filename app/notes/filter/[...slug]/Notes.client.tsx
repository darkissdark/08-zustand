"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes, type FetchNotesResponse } from "@/lib/api";
import { FilterTag } from "@/types/note";
import css from "./NotesPage.module.css";

import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

type NotesProps = {
  tag?: FilterTag;
};

const Notes = ({ tag }: NotesProps) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    setPage(1);
  }, [tag]);

  const { data, isLoading, isFetching, isError } = useQuery<
    FetchNotesResponse,
    Error
  >({
    queryKey: ["notes", { page, perPage: 12, search: debouncedSearch, tag }],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        ...(debouncedSearch.trim() ? { search: debouncedSearch.trim() } : {}),
        ...(tag && tag !== "All" ? { tag } : {}),
      }),
    refetchOnMount: false,
    placeholderData: (previousData) => previousData,
  });

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      <main>
        {(isLoading || isFetching) && <Loader />}
        {isError && <ErrorMessage />}
        {data?.notes && data.notes.length > 0 && !isFetching && (
          <NoteList notes={data.notes} />
        )}
      </main>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onSuccess={closeModal} onCancel={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default Notes;
