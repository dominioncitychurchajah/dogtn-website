import { Metadata } from "next";
import HisStoryClient from "./HisStoryClient";

export const metadata: Metadata = {
  title: "His Story | Dr. David Ogbueli",
  description: "Three decades of apostolic ministry that shaped a generation and touched a world.",
};

export default async function HisStoryPage({
  params,
}: {
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  return <HisStoryClient locale={resolvedParams.locale} />;
}
