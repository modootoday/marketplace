# Browser tabs

Measured against Datalab MCP 1.17.1; the schema in the discovery result decides the exact fields.

Only tabs on Naver blog and datalab.tools addresses are visible to these tools, because the extension has access to
those two and nothing else. Any other tab (mail, a shop, a search page) does not appear in `tab_list`, and `tab_open`
refuses any other address.

| Tool | Tier | What it does |
| ---- | ---- | ------------ |
| `tab_list` | write | Returns the open Naver blog and datalab.tools tabs with their `tabId`. Changes nothing. |
| `tab_open` | write | Opens the given Naver blog or datalab.tools address as a new tab and returns its `tabId`. |
| `tab_focus` | write | Brings the tab with that `tabId` to the front, including its window. Changes what the user sees. |
| `tab_close` | destructive | Closes the tab with that `tabId`. Writing not yet saved in it is lost and cannot be restored. |

- Every call asks the user, including `tab_list`. Say what the call will do before making it.
- `tabId` comes from `tab_list` or from `tab_open`. Do not reuse an id from earlier in the conversation without listing
  again: the user may have closed or moved the tab.
- Before `tab_close`, say which tab (title or address from `tab_list`) and that unsaved writing in it would be lost. If
  the tab is a post editor, suggest checking or saving first. The tool returns a result, not just a request: list the
  tabs again afterwards to confirm it is gone.
- Some tools need a particular tab. The pumasi tools need the target post's tab: the user has it open (`tab_open`) or
  active (`tab_focus`), or the tool opens one itself. The post-editor tools need the writing window: if a writing tool
  says no window is open, use `editor_open_window`, not `tab_open`.
- Opening a tab is not a change to a post or account. It is still a visible change to the user's browser, which is why
  it is confirmed each time.
