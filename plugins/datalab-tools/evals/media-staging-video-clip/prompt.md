---
description: Bringing a local video file into the video editor goes through staging, not through datalab_call
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [datalab-video-script, datalab-naver-workbench, coverage-20261020]
---

내 컴퓨터에 있는 intro.mp4 (84MB)를 datalab.tools 영상 편집기 첫 장면 배경 영상으로 넣어줘. 배경 음악 mp3도 하나 있는데 그건 나중에 할게.

Editor state supplied, not executed in this session: video_project_get returned {"projectRef": "v_410", "revision": 3, "editorSession": "es_77", "title": "소개 영상"} and the first scene is s1. The host lists these tools directly: datalab_find_tools, datalab_list_tools, datalab_call, datalab_confirm_status, datalab_session_state, datalab_browsers, media_stage_begin, media_stage_commit, media_stage_status, media_stage_cancel.

No MCP/discovery tool is available in this test; work only from the supplied text and say the exact order of calls you would make and what each returns or needs.
