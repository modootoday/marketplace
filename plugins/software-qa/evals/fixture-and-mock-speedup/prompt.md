---
description: A suite that reloads a 40 MB JSON in 300 tests and needs a GET /users mock and a port fixture. The reply must keep assertions, report before and after, cover 404 and 429, and free the port in teardown.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [test-fixture-and-mock-build]
---

Our test suite takes 12 minutes. Every one of the 300 tests calls `load_catalog()` which parses the same 40 MB `catalog.json` from disk, and then only reads it. Speed it up without changing what the tests check.

Also write a mock for the users API for local runs. The API spec lists `GET /users` with responses 200 (page of users with `next_cursor`), 404 and 429 (with `Retry-After`).

And write a pytest fixture that occupies TCP port 8081 so we can test our client's "address already in use" handling. I have not run anything yet.

There is no repository in this session, so write the code from what is in this message, with the places you cannot see marked as assumptions. Do not ask me to send files first.
