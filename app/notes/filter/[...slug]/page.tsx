import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import Notes from "./Notes.client";
import { FilterTag } from "@/types/note";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { OG_IMAGE, SITE_DOMAIN, SITE_NAME } from "@/config/metadata";

type NotesPageProps = {
  params: Promise<{ slug?: string[] }>;
};

const isNoteTag = (tag: string): tag is FilterTag => {
  return ["Todo", "Work", "Personal", "Meeting", "Shopping", "All"].includes(
    tag
  );
};

const validateTag = (slug?: string[]): FilterTag => {
  if (!slug?.length) {
    notFound();
  }
  const urlTag = slug[0];
  if (!isNoteTag(urlTag)) {
    notFound();
  }
  return urlTag;
};

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;

  const tag = validateTag(slug);

  const title = `${SITE_NAME} - ${
    tag === "All" ? "All notes" : `Notes filtered by ${tag}`
  }`;
  const description = `Browse ${tag} notes to stay organized and productive.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_DOMAIN}/notes/filter/${tag}`,
      siteName: SITE_NAME,
      images: [OG_IMAGE],
      type: "website",
    },
  };
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;

  const tag = validateTag(slug);

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
