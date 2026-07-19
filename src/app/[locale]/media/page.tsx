import { Metadata } from "next";
import MediaClient from "./MediaClient";

export const metadata: Metadata = {
  title: "Media | Dr. David Ogbueli",
  description: "Decades of transformative teaching, now available wherever you are.",
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function MediaPage({ params }: Props) {
  const { locale } = await params;
  
  return <MediaClient locale={locale} />;
}
