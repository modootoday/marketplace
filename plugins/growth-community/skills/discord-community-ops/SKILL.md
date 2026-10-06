---
name: discord-community-ops
description: Run a Discord community server deliberately - channel and role structure that matches what members come to do, onboarding, forum and FAQ upkeep that cannot go stale, moderation rules with consistent actions, announcements that are read, and bots with the least permissions. Use when setting up or reorganising a Discord server, writing its rules or onboarding, handling a moderation case, or adding a bot. Not for building a Discord bot's code.
metadata:
  tier: open
  level: L3
  domain: community
  install: optional
  keywords: [Discord server, community management, moderation, onboarding, forum channel, announcements]
  verified-runtimes: [claude-code]
---

# Running a Discord community

A server degrades the same way every time: too many channels, a FAQ that
describes last year's product, rules enforced differently by each moderator.
Each section below prevents one of those.

## Structure

- Channels follow what members come to do (ask, share, get news, talk), not the
  team's org chart. Merge channels with little traffic; a quiet channel makes
  the server feel empty.
- Roles for access and for identity are separate. Give the fewest permissions
  that work, and never "Administrator" to a role members can get.

## Onboarding

Use Discord's onboarding questions to route newcomers to the channels for their
interest; one welcome message with the three things to do first. Test it with a
fresh account.

## Forums and FAQ

One question per post, a pinned index, and no post that states things that will
change (prices, versions, dates) without a link to where the current value
lives. Review the FAQ against the product on a schedule and close posts that no
longer apply.

## Moderation

Written rules with examples, a fixed ladder of actions (note, warn, timeout,
ban), a private log of each action with the evidence, and the same response from
every moderator. Appeals go to someone other than the moderator who acted.

## Announcements

Few and specific: what changed, who it affects, what to do. Use the
announcement channel for those only, so following it is worth it.

## Bots

Each bot gets only the permissions its features need; review them when features
change. Rate-limit what bots post so they do not drown people.
