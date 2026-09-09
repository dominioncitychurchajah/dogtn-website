/**
 * Renders a schema.org graph as JSON-LD. Server component — the script is in
 * the exported HTML, so crawlers that do not run JS still see it.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is escaped below; `<` is the only sequence that
      // can break out of a script element.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
