// Shared by the pi extension and the Claude Code hook.
// Any `??` anywhere in the message marks it as a quick question.

const MARKER = /\?{2,}/g;

/**
 * Returns the message with its `??` markers removed, or undefined when the
 * message is not a quick question.
 * @param {string} text
 * @returns {string | undefined}
 */
export function extractQuickQuestion(text) {
  // Leave commands alone: rewriting `/foo ??` would break the command.
  if (text.trimStart().startsWith("/")) return undefined;
  if (!MARKER.test(text)) return undefined;
  MARKER.lastIndex = 0;

  const question = text
    .replace(MARKER, " ")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/[ \t]+([.,!?;:])/g, "$1")
    .trim();
  return question || undefined;
}
