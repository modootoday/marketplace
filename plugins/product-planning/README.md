# product-planning

## What it does

Turns a rough product idea into a sharper one: asks the few questions that would
change the answer, argues against each option, and narrows to one thing to test
first.

## Runtime support

| Runtime     | Supported | Measured on                                         |
| ----------- | --------- | --------------------------------------------------- |
| Claude Code | yes       | 2.1.288, with the eval suite in `evals/` (see Verify) |
| Codex CLI   | untested  | -                                                   |
| Grok CLI    | untested  | -                                                   |
| Gemini CLI  | untested  | -                                                   |

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install product-planning@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add product-planning@modootoday
```

## What it registers

| Kind  | Name            | Covers                                                                  |
| ----- | --------------- | ----------------------------------------------------------------------- |
| skill | `idea-sparring` | brainstorm requests: questions first when context is thin, otherwise options argued against and one test to run |

## Failure mode

None. This plugin registers no hooks and runs no commands. It cannot block, slow
or interrupt anything.

## Configuration and how to disable

No configuration. Disable it the way your runtime disables plugins.

## Data written

None. The skill writes no file and opens no connection.

## Verify

Ask for a brainstorm with almost no context:

```
I'm thinking about adding a referral program to our note-taking app. Can you brainstorm this with me?
```

A working install replies with three to five questions and no list of ideas.

The plugin ships an eval suite. With Claude Code 2.1.288 or later:

```
claude plugin eval plugins/product-planning --no-publish
```

Measured on 2.1.288: 3 cases, 3 runs per arm. Both brainstorm cases scored 1.0
with the plugin and 0.0 without it; the acceptance-criteria case scored 1.0 in
both arms and the skill did not fire there, which is the intended behaviour.

## License

MIT
