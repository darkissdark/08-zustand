import { HydrationBoundary } from "@tanstack/react-query";
import { SITE_NAME, OG_IMAGE, SITE_DOMAIN } from "@/config/metadata";
import CreateNoteClient from "./CreateNote.client";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Create Note";
  const description = "Create a new note with title, content, and tags";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_DOMAIN}/notes/action/create`,
      siteName: SITE_NAME,
      images: [OG_IMAGE],
      type: "website",
    },
  };
}

export default async function CreateNotePage() {
  return (
    <HydrationBoundary state={undefined}>
      <CreateNoteClient />
    </HydrationBoundary>
  );
}
