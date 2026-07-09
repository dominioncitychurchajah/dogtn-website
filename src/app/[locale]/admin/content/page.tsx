import type { Metadata } from "next";
import { ContentEditor } from "@/components/admin/ContentEditor";

export const metadata: Metadata = { title: "Admin · Content Studio" };

export default function AdminContentPage() {
  return (
    <div>
      <p className="mb-6 text-body-m text-ink-500">
        Upload, tag, and schedule teachings — preview across breakpoints before publishing.
      </p>
      <ContentEditor />
    </div>
  );
}
