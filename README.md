# pi-quick-question

A [pi](https://pi.dev) package: put `??` anywhere in a message to get the shortest possible answer.

```
?? does git pull delete local branches
does git pull delete local branches??
does git pull ?? delete local branches
```

are all rewritten to `/skill:q does git pull delete local branches`. The bundled `q` skill answers yes/no questions with `Yes.` / `No.` (plus at most one short sentence), and everything else with just the answer.

## Install

```bash
pi install git:github.com/javrasya/pi-quick-question
```

Then `/reload` (or restart pi).

## Notes

- `??` triggers when it stands alone: at the start, at the end (even glued to a word, `again??`), or between spaces. `a??b` does not, and a bare `??` with no other text passes through unchanged.
- `??` inside inline code or a fenced code block is ignored, so pasting `x ?? y` doesn't trigger it.
- Messages that start with `/` (commands) are left alone.
- If another `q` skill is already loaded, pi keeps the first one it discovers and logs a name-collision warning. `??` uses whichever `q` won.
