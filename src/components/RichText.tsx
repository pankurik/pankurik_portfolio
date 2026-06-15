import type { RichTextPart } from "@/data/content";

export function RichText({
  parts,
  emphasisClassName = "text-[#0D0D0D] not-italic font-normal",
}: {
  parts: RichTextPart[];
  emphasisClassName?: string;
}) {
  return (
    <>
      {parts.map((part, index) =>
        part.emphasis ? (
          <em key={index} className={emphasisClassName}>
            {part.text}
          </em>
        ) : (
          <span key={index}>{part.text}</span>
        )
      )}
    </>
  );
}
