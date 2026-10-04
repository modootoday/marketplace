---
name: voice-rights-review
description: Check the rights behind a voice before it is used in a product or ad - a voice actor's contract scope, consent and limits for a cloned or synthetic voice, the TTS provider's licence for the use, the publicity-right protection of a person's voice under Korean unfair competition law, and AI disclosure - and list what is missing. Use when using a human voice recording, a voice clone or a TTS voice commercially, or when someone asks to make a voice that sounds like a specific person. Not for audio quality.
metadata:
  tier: open
  level: L3
  domain: legal-review
  install: optional
  keywords: [voice rights, voice clone consent, voice actor contract, TTS licence, publicity right]
  requires:
    mcp: [korean-law]
---

# Voice rights review

A voice can identify a person, and using it commercially without the right
permission can be a legal problem even when no recording was copied.

## Identify the voice source

| Source | What to check |
| --- | --- |
| A recorded actor | the contract: media, territory, duration, whether synthetic training or cloning is allowed, credit, payment for reuse |
| A clone of a real person | written, specific consent for this use, how it can be revoked, what happens to the model after |
| A provider's stock TTS voice | the provider's terms: commercial use, advertising, broadcast, redistribution of audio, attribution |
| A voice that "sounds like" someone famous | treat as using that person's identity, even without their recordings |

## Korean law

Retrieve the current text with the `korean-law` server and cite it with its
effective date. The Unfair Competition Prevention Act lists the unauthorised use
of a well-known person's name, likeness, voice or signature for business in a way
that harms their economic interest as unfair competition (Article 2(1), item on
identity markers). Also check privacy rules when recordings of identifiable
people are processed, and any AI-content labelling rules.

## Disclosure

Where the voice is synthetic, follow the platform's and the law's labelling
rules (ai-content-disclosure covers this when installed).

## Output

A table: voice, source, right needed, evidence on file, gap. Refuse to proceed
with a sound-alike of a real person without their consent, and recommend counsel
for contracts.
