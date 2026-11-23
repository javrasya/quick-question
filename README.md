# quick-question

Put `??` anywhere in a message to get the shortest possible answer. Works in [pi](https://pi.dev) and in [Claude Code](https://code.claude.com).

```
?? does git pull delete local branches
does git pull delete local branches??
does git pull ?? delete local branches
```

The bundled `q` skill answers yes/no questions with `Yes.` / `No.` (plus at most one short sentence), and everything else with just the answer.

## Install

**pi**

```bash
pi install git:github.com/javrasya/quick-question
```

Then `/reload` (or restart pi).

**Claude Code**

```
/plugin install quick-question --marketplace javrasya/quick-question
```

On Claude Code older than 2.1.275, add the marketplace first:

```
/plugin marketplace add javrasya/quick-question
/plugin install quick-question@javrasya-quick-question
```

## How it works

- **pi**: an `input` extension rewrites the message to `/skill:q <message without ??>` before skill expansion.
- **Claude Code**: hooks can't rewrite a prompt, so a `UserPromptSubmit` hook adds the `q` skill's instructions as extra context when the message has a `??`. The message itself reaches Claude unchanged.

Both use the same matcher in `lib/match.mjs`:

- `??` triggers when it stands alone: at the start, at the end (even glued to a word, `again??`), or between spaces. `a??b` does not, and a bare `??` with no other text passes through unchanged.
- `??` inside inline code or a fenced code block is ignored, so pasting `x ?? y` doesn't trigger it.
- Messages that start with `/` (commands) are left alone.

## Notes

- pi: if another `q` skill is already loaded, pi keeps the first one it discovers and logs a name-collision warning. `??` uses whichever `q` won.
- Claude Code: the hook runs `node`, so Node.js must be on your `PATH`.
