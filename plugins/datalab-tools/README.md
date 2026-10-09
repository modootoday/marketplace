# datalab-tools

Skills for Naver blog, Place, Smart Store, shopping demand, search ads, and news-comment analysis through the datalab.tools browser extension. They also prepare card news, video scenes, tutorials, style guides, sourced briefs, and social copy. Figures come from returned data or supplied sources; estimates and unsupported claims stay explicit.

## What it registers

Twenty skills, with no hooks, commands, services, or bundled MCP server:

| Skill | Purpose |
| --- | --- |
| `datalab-naver-workbench` | Discover real extension tools, select the target, and follow confirmation tickets |
| `datalab-ad-budget-review` | Actual spend, remaining budget, and separate bid estimates |
| `datalab-ad-disclosure-check` | Compare pasted disclosure wording with bundled translated excerpts |
| `datalab-blog-diagnosis` | Measured blog changes, possible explanations, and checks |
| `datalab-blog-widget` | Static Naver-compatible widget HTML |
| `datalab-card-news` | Gallery-first slide plans and photo-editor builds |
| `datalab-comment-reaction` | Comment activity and its interpretation limits |
| `datalab-commerce-health` | Settlement gaps and operations ordered by deadline |
| `datalab-cta-rewrite` | Copyable CTA alternatives grounded in supplied claims |
| `datalab-material-suggestion` | Varied topic ideas backed by demand and competition facts |
| `datalab-neighbor-post-reply-draft` | Explain an actual neighbour's post and draft a reply grounded in the user's questions and opinion |
| `datalab-place-reputation` | Review facts, response priorities, and unposted reply drafts |
| `datalab-pumasi` | Read-only likes and neighbour-state checks |
| `datalab-reader-simulation` | Aggregate audience profile and confirmed-question checklist |
| `datalab-research-brief` | Facts cited to pages actually read |
| `datalab-shopping-demand` | Shopping trend and audience interpretation |
| `datalab-social-repurpose` | Platform-specific captions within working limits |
| `datalab-tone-manner` | Provisional or multi-post style instructions with quotes |
| `datalab-tutorial-post` | One beginner tutorial within a 12,000-character drafting budget |
| `datalab-video-script` | Image, subtitle, and voice scene plans and timeline builds |

## Requirements

For live data and editor actions, connect the datalab.tools browser extension and its `datalab` MCP tools in the calling runtime. Relevant Naver access and any required service credentials must be configured by the user. This plugin does not configure authentication or install a server. With no extension, skills work from pasted tool output or source text and explain what they could not execute. Disclosure checks use pasted text and bundled sources only.

Editor work preserves existing projects and requests a project choice when needed. AI image and narration generation bills separately; confirm a billed count before starting. Read-only analyses do not publish replies, like posts, send neighbour requests, change bids, or process orders.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | Procedures available; untested | No behavioral measurement |
| Codex CLI | 16/20 skills have measured lift; see per-case results | codex-cli 0.160.1; gpt-6.1-sol |
| Gemini CLI | Extension manifest provided; untested | No behavioral measurement |
| Grok CLI | Procedures available; untested | No behavioral measurement |
| Antigravity CLI | Procedures available; untested | No behavioral measurement |

## Evaluation

Each case uses both arms, two runs per arm, concurrency 2, gpt-6.1-sol as subject and judge, three judge votes per scored grader, and threshold 0. Scores are the mean fraction of scored graders passed; threshold 0 is not a quality gate. Positive skill firing is recorded separately. These fixtures use pasted data and plans; they do not verify a live MCP connection or paid editor execution.

The latest pre-wrap-up results cover 20 cases. Thirteen scored below With 1.00, including one case whose runs had runtime errors. The C-Rank negative case already scored Without 1.00 and remains a regression check; it provides no evidence of lift or runtime support. Final measurements follow.

Second-round changes clarify unsupported scores/personas, gallery-first paid-generation choices, existing-project choices, spoken subtitles, deadline priorities, read-only action ownership, and source qualifiers. Supporting references are English; duplicate localized skill bodies were removed. Prompts and graders are unchanged.

Final rows use the latest complete measurement. Widget, card-news, video, commerce, research, and review cases received focused clarifications and reruns after measured misses.

| Runtime | Model | Case | Skill | Before With | Before Without | With | Without | Fired | Use |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Codex CLI | gpt-6.1-sol | `ad-week-spend` | datalab-ad-budget-review | 1.00 | 0.00 | 1.00 | 0.00 | 2/2 | Measured lift |
| Codex CLI | gpt-6.1-sol | `beginner-tutorial` | datalab-tutorial-post | 0.00 | 0.00 | 0.00 | 0.00 | 2/2 | Needs follow-up |
| Codex CLI | gpt-6.1-sol | `c-rank-question-negative` | negative; must not fire | 1.00 | 1.00 | 1.00 | 1.00 | 0/2 | Regression check; no lift claim |
| Codex CLI | gpt-6.1-sol | `card-news-build` | datalab-card-news | 0.25 | 0.00 | 1.00 | 0.00 | 2/2 | Measured lift |
| Codex CLI | gpt-6.1-sol | `closing-cta` | datalab-cta-rewrite | 1.00 | 0.50 | 1.00 | 0.50 | 2/2 | Measured lift |
| Codex CLI | gpt-6.1-sol | `comment-surge` | datalab-comment-reaction | 0.50 | 0.25 | 0.75 | 0.25 | 2/2 | Needs follow-up |
| Codex CLI | gpt-6.1-sol | `draft-reader` | datalab-reader-simulation | 0.50 | 0.00 | 0.50 | 0.00 | 2/2 | Needs follow-up |
| Codex CLI | gpt-6.1-sol | `inflow-drop` | datalab-blog-diagnosis | 1.00 | 0.00 | 1.00 | 0.00 | 2/2 | Measured lift |
| Codex CLI | gpt-6.1-sol | `like-check` | datalab-pumasi | 0.75 | 0.50 | 1.00 | 0.25 | 2/2 | Measured lift |
| Codex CLI | gpt-6.1-sol | `next-topics` | datalab-material-suggestion | 0.50 | 0.00 | 0.75 | 0.00 | 2/2 | Needs follow-up |
| Codex CLI | gpt-6.1-sol | `reels-build` | datalab-video-script | 0.00 | 0.00 | 1.00 | 0.00 | 2/2 | Measured lift |
| Codex CLI | gpt-6.1-sol | `season-demand` | datalab-shopping-demand | 1.00 | 0.25 | 1.00 | 0.25 | 2/2 | Measured lift |
| Codex CLI | gpt-6.1-sol | `settlement-gap` | datalab-commerce-health | 0.50 | 0.25 | 1.00 | 0.25 | 2/2 | Measured lift |
| Codex CLI | gpt-6.1-sol | `sidebar-widget` | datalab-blog-widget | 0.50 | 0.00 | 1.00 | 0.00 | 2/2 | Measured lift |
| Codex CLI | gpt-6.1-sol | `sns-repurpose` | datalab-social-repurpose | 1.00 | 0.00 | 1.00 | 0.00 | 2/2 | Measured lift |
| Codex CLI | gpt-6.1-sol | `sourced-brief` | datalab-research-brief | 0.50 | 0.50 | 1.00 | 0.00 | 2/2 | Measured lift |
| Codex CLI | gpt-6.1-sol | `sponsored-review-draft` | datalab-ad-disclosure-check | 1.00 | 0.50 | 1.00 | 0.00 | 2/2 | Measured lift |
| Codex CLI | gpt-6.1-sol | `store-reviews` | datalab-place-reputation | 0.25 | 0.00 | 1.00 | 0.25 | 2/2 | Measured lift |
| Codex CLI | gpt-6.1-sol | `style-spec` | datalab-tone-manner | 0.50 | 0.00 | 0.50 | 0.00 | 2/2 | Needs follow-up |
| Codex CLI | gpt-6.1-sol | `tool-routing` | datalab-naver-workbench | 0.00 | 0.00 | 1.00 | 0.00 | 2/2 | Measured lift |

Final measurements: 2026-10-06; codex-cli 0.160.1; 80 runs across both arms. Positive cases are the runtime-support evidence only when With is 1.00, Without is below 1.00, and the skill fired. Cases whose baseline or final Without is 1.00 remain regression checks.

The pre-wrap-up tool-routing zeros came from runtime errors and are not valid quality scores. Its final rerun is reported separately in the table.

- beginner-tutorial: With 0.00, Without 0.00, fired 2/2. Follow-up graders: refused-extras, structure.
- comment-surge: With 0.75, Without 0.25, fired 2/2. Follow-up graders: activity.
- draft-reader: With 0.50, Without 0.00, fired 2/2. Follow-up graders: no-persona-no-forecast.
- next-topics: With 0.75, Without 0.00, fired 2/2. Follow-up graders: evidence-not-scores.
- style-spec: With 0.50, Without 0.00, fired 2/2. Follow-up graders: sample-and-no-scores.

The answers still honor the requested long minimum and include a score table and attributed quotation. The drafting budget is not presented as a universal model or platform limit.

Comment counts establish greater activity per participant, but not the identity of participants across dates. The skill retains that limitation; the grader requires a same-person conclusion.

The answers now identify aggregate data and missing demographics but still include the requested fictional persona, contrary to the intended checklist workflow.

One answer still gives subjective recommendation points and difficulty stars rather than restricting the output to checked facts and qualitative tradeoffs.

Both answers still give subjective formality and friendliness scores instead of the intended evidence-only style specification.

Other runtime measurements and live MCP/editor execution remain untested.

### Hidden-tool discovery regression

Measured 2026-10-07 on Codex CLI 0.160.1 with gpt-6.1-sol as subject and judge, two runs per arm and three judge votes. The new `tool-discovery-fallback` case uses `datalab-cta-rewrite` to plan discovery, schema-bound reads and confirmation-ticket polling when specialist tools are hidden.

| Case                      | Skill               | With | Without | Fired | Use                                |
| ------------------------- | ------------------- | ---- | ------- | ----- | ---------------------------------- |
| `tool-discovery-fallback` | datalab-cta-rewrite | 1.00 | 1.00    | 2/2   | Regression check; no measured lift |

All four responses and twelve judge verdicts passed. This synthetic next-call exercise made no application or MCP calls; it does not establish live connection success or behavioral coverage of the other sixteen changed skills. Existing runtime qualifications remain unchanged. No model retries were performed.

### Neighbour replies and returned-output review

The 2026-10-08 update adds one neighbour-post comprehension and personal-reply draft workflow, plus bounded checks for returned tutorial requirements, photo-to-paragraph evidence, editor component semantics and local video readability. Existing descriptions, tiers, levels and domains are preserved. The new skill is open/L3/blog-community in this plugin; it drafts answer text and never enters or submits a browser comment.

Measurements use Codex CLI 0.160.1 and gpt-6.1-sol, two runs per arm and three judge votes. Prompts use supplied synthetic observations; no live extension, browser, paid generation or posting is exercised. The new normal and truncated cases used the initial body. A conditional next-call-plan clarification affects the missing-source branch; its original prompt and criteria remain unchanged.

### Other runtimes

| Runtime | Model | Case | Skill | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Codex CLI | gpt-6.1-sol | `neighbor-post-grounded-personal-reply` | datalab-neighbor-post-reply-draft | 0.00 | 1.00 | 2/2 | 2026-10-08 |
| Codex CLI | gpt-6.1-sol | `neighbor-post-truncated-source` | datalab-neighbor-post-reply-draft | 1.00 | 1.00 | 2/2 | 2026-10-08 |
| Codex CLI | gpt-6.1-sol | `neighbor-post-missing-body-and-opinion` | datalab-neighbor-post-reply-draft | 0.50 | 1.00 | 2/2 | 2026-10-08 |
| Codex CLI | gpt-6.1-sol | `promotion-output-constraints` | datalab-tutorial-post | 0.00 | 1.00 | 2/2 | 2026-10-08 |
| Codex CLI | gpt-6.1-sol | `promotion-photo-paragraphs` | datalab-reader-simulation | 0.00 | 0.50 | 2/2 | 2026-10-08 |
| Codex CLI | gpt-6.1-sol | `promotion-heading-components` | datalab-naver-workbench | 1.00 | 1.00 | 2/2 | 2026-10-08 |
| Codex CLI | gpt-6.1-sol | `promotion-video-readability` | datalab-video-script | 1.00 | 1.00 | 2/2 | 2026-10-08 |

The normal reply result supports explicit unposted-draft disclosure only: both arms already explain the post and ground the personal response. The repaired missing-source result supports completeness of an optional original-intent discovery and schema-bound next-call plan. The repaired tutorial result supports reporting the supplied duplicate and its bounded repair; both arms already produce distinct tasks. These are narrow planning/reporting effects, not comprehension, publishing, readership or live tool-execution guarantees. The original-generation beginner-tutorial recheck completed on 2026-10-09 without effect qualification; its quality shortcomings remain unresolved, separately from the earlier supplied-draft repair result.

The truncated-source and corrected heading cases are regression checks with baseline 1.00. Initial missing-source 0.50/0.00 and tutorial 0.00/0.00 results remain preserved before one diagnosed body clarification each. Heading's original 0.00/1.00 comparison omitted known discovery-adapter contracts from its context; it is invalid quality evidence. The corrected prompt and mirrored context retain the same four semantic criteria. No workbench body repair or retrospective regrading followed that context correction.

Photo review remains unresolved at With0.50/Without0.00: one answer explicitly calls the profile aggregate but fails the not-a-person criterion, while another similarly bounded answer passes. The existing rule already covers that distinction. No repeated instruction, rerun or new reader runtime qualification follows. All original failures and judge disagreements are retained.

Video's first comparison had one capacity error before a With answer, leaving three valid answers and nine judge votes. One identical-condition infrastructure replacement completed both arms and is a baseline-perfect regression check. No video body or fixture change followed that error.

This update measured seven cases across eleven comparisons: 44 subject attempts, 43 valid answers and 129 judge votes. Two comparisons follow diagnosed body clarifications, one corrects missing fixture context and one replaces the capacity-failed comparison. No original result was overwritten or regraded. Only Codex subscription models were used; USD conversion was not measured. No other runtime qualification is inferred.

### Original-generation tutorial recheck

On 2026-10-09, the existing `beginner-tutorial` case completed a fresh Codex comparison with gpt-6.1-sol as subject and judge, two runs per arm and three votes per semantic grader. Without was 0.00, With was 0.00, and firing was 2/2. All four answers completed; all 24 semantic judge votes were FAIL. The result was not partial and contained no run errors. Reported input plus output usage was 775,907 tokens; USD cost was not reported.

The eight tutorial inputs were unchanged, and both With answers read the actual skill body. This does not claim immutability of the entire plugin, which contained unrelated authorized reader and sponsor changes. Original historical scores remain preserved. The earlier `promotion-output-constraints` qualification concerns supplied-draft repair traceability only; this generation recheck neither qualifies original tutorial generation nor expands that narrow result. Existing runtime metadata is unchanged.

### Other runtimes: aggregate activity completeness

Measured 2026-10-08 on Codex CLI 0.161.0 with gpt-6.1-sol as subject and judge, two runs per arm and three judge votes. The original comparison completed with four answers and twelve valid votes: nine PASS and three FAIL. Threshold-zero process success is not quality evidence.

| Runtime   | Model       | Case                                | Skill                    | Without | With | Fired | Date       |
| --------- | ----------- | ----------------------------------- | ------------------------ | ------- | ---- | ----- | ---------- |
| Codex CLI | gpt-6.1-sol | `comment-aggregate-identity-limits` | datalab-comment-reaction | 0.50    | 1.00 | 2/2   | 2026-10-08 |

The accepted effect is completeness of absolute-count reporting: both With answers report the absolute and percentage changes and daily comments per commenter. One baseline also meets every requirement; the other omits the absolute increases of 33,100 comments and 1,200 commenters. All four answers correctly limit cross-date identity, sentiment and population inference. This comparison therefore establishes no improvement in identity safety, sentiment interpretation or causal attribution.

The two-sentence clarification distinguishes aggregate activity from individual behavior, but regenerated answers do not isolate its causal effect. The original invalid `comment-surge` case and its historical results remain unchanged. Only supplied synthetic reports were assessed; no extension collection, identity tracking, posting or public-opinion verification occurred. This qualification applies only to datalab-comment-reaction and this bounded reporting effect.

## Configuration and data

Load or disable the plugin using the runtime's plugin controls. There is no plugin configuration. The skills themselves write nothing automatically. Following an editor workflow can modify the selected project; draft copy stays in the answer unless an authorized editor action is performed. Evaluation artifacts belong outside the plugin.

## License

MIT; see [LICENSE](LICENSE).
