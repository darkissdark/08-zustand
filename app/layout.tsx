import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { SITE_NAME, OG_IMAGE, SITE_DOMAIN } from "@/config/metadata";

const roboto = Roboto({
  variable: "--font-roboto",
  display: "swap",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const title = `${SITE_NAME} - Your Personal Note Organizer`;
const description =
  "Create, tag, search, filter, and manage your notes effortlessly with NoteHub. Stay organized and in control of your ideas.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: SITE_DOMAIN,
    siteName: SITE_NAME,
    images: [OG_IMAGE],
    type: "website",
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
