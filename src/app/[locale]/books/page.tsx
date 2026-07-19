import { Metadata } from "next";
import BooksClient from "./BooksClient";

export const metadata: Metadata = {
  title: "Books | Dr. David Ogbueli",
  description: "The Library of a Reformer - Books by Dr. David Ogbueli",
};

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function BooksPage({ params }: PageProps) {
  const { locale } = await params;
  return <BooksClient locale={locale} />;
}
