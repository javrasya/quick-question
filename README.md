# pi-quick-question

A [pi](https://pi.dev) package: type `??` before a question to get the shortest possible answer.

```
?? does git pull delete local branches
```

is rewritten to `/skill:q does git pull delete local branches`. The bundled `q` skill answers yes/no questions with `Yes.` / `No.` (plus at most one short sentence), and everything else with just the answer.

## Install

```bash
pi install git:github.com/javrasya/pi-quick-question
```

Then `/reload` (or restart pi).

## Notes

- Only a leading `??` followed by text triggers it; a bare `??` passes through unchanged.
- If another `q` skill is already loaded, pi keeps the first one it discovers and logs a name-collision warning. `??` uses whichever `q` won.
