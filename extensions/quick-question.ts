import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

// `?? <question>` -> `/skill:q <question>`.
// The input event fires before skill expansion, so pi expands the rewritten
// command exactly as if `/skill:q` had been typed.
const PREFIX = /^\s*\?\?\s*(\S[\s\S]*)$/;

export default function (pi: ExtensionAPI) {
  pi.on("input", async (event) => {
    if (event.source === "extension") return { action: "continue" };

    const match = event.text.match(PREFIX);
    if (!match) return { action: "continue" };

    return { action: "transform", text: `/skill:q ${match[1].trim()}` };
  });
}
