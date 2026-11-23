import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

// A standalone `??` anywhere in the message turns it into `/skill:q <message>`.
// Standalone means: at the start, at the end (even glued to a word, `again??`),
// or surrounded by whitespace. `a??b` does not count, and neither does a `??`
// inside inline code or a fenced code block, so `x ?? y` in a snippet is safe.
const MARKER = /(^|\s)\?\?(?=\s|$)|\?\?(?=\s*$)/g;
const CODE = /```[\s\S]*?```|`[^`\n]*`/g;

export function toQuickQuestion(text: string): string | undefined {
  if (text.trimStart().startsWith("/")) return undefined;

  // Find markers outside code by blanking code spans (same length keeps offsets).
  const outsideCode = text.replace(CODE, (m) => " ".repeat(m.length));
  const hits: Array<[number, number]> = [];
  for (const m of outsideCode.matchAll(MARKER)) {
    const start = m.index + (m[1]?.length ?? 0);
    hits.push([start, start + 2]);
  }
  if (hits.length === 0) return undefined;

  let question = text;
  for (const [start, end] of hits.reverse()) {
    question = question.slice(0, start) + question.slice(end);
  }
  question = question.replace(/[ \t]{2,}/g, " ").trim();
  return question ? `/skill:q ${question}` : undefined;
}

export default function (pi: ExtensionAPI) {
  pi.on("input", async (event) => {
    if (event.source === "extension") return { action: "continue" };

    const rewritten = toQuickQuestion(event.text);
    if (!rewritten) return { action: "continue" };

    return { action: "transform", text: rewritten };
  });
}
