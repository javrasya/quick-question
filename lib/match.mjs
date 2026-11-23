// Shared by the pi extension and the Claude Code hook.
// A standalone `??` anywhere in the message marks it as a quick question.
// Standalone means: at the start, at the end (even glued to a word, `again??`),
// or surrounded by whitespace. `a??b` does not count, and neither does a `??`
// inside inline code or a fenced code block, so `x ?? y` in a snippet is safe.
const MARKER = /(^|\s)\?\?(?=\s|$)|\?\?(?=\s*$)/g;
const CODE = /```[\s\S]*?```|`[^`\n]*`/g;

/**
 * Returns the message with its `??` markers removed, or undefined when the
 * message is not a quick question.
 * @param {string} text
 * @returns {string | undefined}
 */
export function extractQuickQuestion(text) {
  if (text.trimStart().startsWith("/")) return undefined;

  // Blank code spans (same length keeps offsets) so markers inside code are skipped.
  const outsideCode = text.replace(CODE, (m) => " ".repeat(m.length));
  const hits = [];
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
  return question || undefined;
}
