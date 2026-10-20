---
type: llm
---

Context the reply answers: a user wants a local 84 MB video file used as the first scene's background in the video editor. The host lists media_stage_begin, media_stage_commit, media_stage_status and media_stage_cancel as its own tools. The editor target is project v_410, revision 3, session es_77, scene s1. No tool can run in this test, so the reply is a plan: judge the calls it names and their order. Reading the editor state, which is already supplied, is not a failure.

PASS only if the reply does all of these:
1. Stages the file first with media_stage_begin and media_stage_commit as direct tools, and does not route staging through datalab_call or look for it with datalab_find_tools.
2. Says the bytes are sent outside MCP: a POST to the returned upload path with the returned upload token as a bearer header, then media_stage_commit with the file's sha256 and byte count, which returns a handle.
3. Then uses video_source_add with that handle, as clip, on scene s1, with the editor session, project and revision, and follows the returned job with video_job_status before saying the clip is in.
4. Does not add the mp3 now, does not claim anything was uploaded or added, and does not invent a path argument.

The reply may be in Korean. Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
