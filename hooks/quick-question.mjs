#!/usr/bin/env node
// Claude Code UserPromptSubmit hook. Claude Code can't rewrite the prompt, so on
// a `??` message this adds the q skill's instructions as additional context.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { extractQuickQuestion } from "../lib/match.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

let input;
try {
  input = JSON.parse(readFileSync(0, "utf8"));
} catch {
  process.exit(0); // Not our business to block the prompt on bad input.
}

const question = extractQuickQuestion(String(input?.prompt ?? ""));
if (!question) process.exit(0);

const skill = readFileSync(join(root, "skills/q/SKILL.md"), "utf8").replace(/^---\n[\s\S]*?\n---\n/, "");

const context = [
  "The user marked this message with `??`: it is a quick question. Answer it following the q skill below.",
  `The question, with the \`??\` removed: ${question}`,
  "",
  skill.trim(),
].join("\n");

process.stdout.write(
  JSON.stringify({ hookSpecificOutput: { hookEventName: "UserPromptSubmit", additionalContext: context } }),
);
