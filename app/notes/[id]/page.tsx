import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetails from "./NoteDetails.client";
import { SITE_NAME, OG_IMAGE, SITE_DOMAIN } from "@/config/metadata";
import { notFound } from "next/navigation";

type NoteDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: NoteDetailsPageProps) {
  const { id } = await params;
  const note = await fetchNoteById(id).catch(() => null);
  if (!note) {
    notFound();
  }
  return {
    title: `${SITE_NAME} - Note: ${note.title}`,
    description: note.content.slice(0, 30),
    openGraph: {
      title: `${SITE_NAME} - Note: ${note.title}`,
      description: note.content.slice(0, 100),
      url: `${SITE_DOMAIN}/notes/${id}`,
      siteName: SITE_NAME,
      images: [OG_IMAGE],
      type: "article",
    },
  };
}

export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const { id } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails id={id} />
    </HydrationBoundary>
  );
}
