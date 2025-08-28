import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import Notes from "./Notes.client";
import { FilterTag } from "@/types/note";
import { notFound } from "next/navigation";

type NotesPageProps = {
  params: Promise<{ slug?: string[] }>;
};

const isNoteTag = (tag: string): tag is FilterTag => {
  return ["Todo", "Work", "Personal", "Meeting", "Shopping", "All"].includes(
    tag
  );
};

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;

  let tag: FilterTag | undefined;
  if (slug?.length) {
    const urlTag = slug[0];
    if (isNoteTag(urlTag)) {
      tag = urlTag;
    } else {
      notFound();
    }
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { page: 1, perPage: 12, search: "", tag }],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        search: "",
        ...(tag && tag !== "All" ? { tag } : {}),
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes tag={tag} />
    </HydrationBoundary>
  );
}
