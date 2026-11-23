# Changelog

## [0.4.0]

- Any `??` anywhere in the message triggers the quick answer, including `foo??bar` and `??` inside code.

## [0.3.0]

- Claude Code plugin: a `UserPromptSubmit` hook answers `??` messages with the `q` skill.
- Repository renamed to `javrasya/quick-question`; the matcher moved to `lib/match.mjs`, shared by pi and Claude Code.

## [0.2.0]

- `??` now triggers anywhere in the message, not only at the start. `??` inside code is ignored.

## [0.1.0]

- `?? <question>` shortcut for the bundled `q` skill.
