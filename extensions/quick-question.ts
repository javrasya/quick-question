import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { extractQuickQuestion } from "../lib/match.mjs";

// `... ?? ...` -> `/skill:q ...`. The input event fires before skill expansion,
// so pi expands the rewritten command exactly as if `/skill:q` had been typed.
export function toQuickQuestion(text: string): string | undefined {
  const question = extractQuickQuestion(text);
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
