# Non-visual wording

Read this with `screen-reader-keys.md` before sending a route. Sources were read on 2026-10-05.

- WCAG-SC: W3C, Understanding SC 1.3.3 Sensory Characteristics, https://www.w3.org/WAI/WCAG22/Understanding/sensory-characteristics.html
- WCAG-AUTH: W3C, Understanding SC 3.3.8 Accessible Authentication (Minimum), https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html
- WEBAIM: WebAIM, Designing for Screen Reader Compatibility, https://webaim.org/techniques/screenreader/
- MSA: Microsoft, How to add your accounts to Microsoft Authenticator, https://support.microsoft.com/en-us/account-billing/how-to-add-your-accounts-to-microsoft-authenticator-92544b53-7706-4581-a142-30344a2a2a57 (read from a search excerpt)
- UG: NVDA User Guide, https://download.nvaccess.org/documentation/userGuide.html

## Rules

| Rule | Say instead | Source |
| --- | --- | --- |
| Do not point by shape, colour, size or place ("the round button", "the button on the right", "the icon at the top") | Name the control by its label and role, then give the key that reaches it: "the button named Next; press B until NVDA reads it" | WCAG-SC (name controls, not appearance or location) |
| Describe controls by name; a label with a position added is allowed for sighted readers, but a screen reader reply should lead with the label | "the link named Security" | WCAG-SC, example 2 |
| In a long reply, "the steps below" or "the list above" is understood in reading order, but prefer "the next step" or "the previous step" | "the next heading", "the previous step" | WCAG-SC (above and below as reading order is acceptable if unambiguous) |
| Mouse words (click, hover, drag, scroll) | "press Enter on", "move to", "go to" | UG (keys act on the same controls; Enter and Space activate) |
| "Scan the QR code" alone | "Ask the page for the setup key shown as text. Look for a link or button such as one named like Can't scan the code or Enter code manually; NVDA+F7 and the links list help. Type or paste the key into your authenticator app." State that wording differs by site | WCAG-AUTH (a code or QR step needs a non-visual path, and a choice of methods helps); MSA (a "can't scan" option with manual entry exists in a vendor flow) |
| "Type the code you see" | "Listen for the six digits, or copy them and paste with Ctrl+V into the field; the page should accept paste" | WCAG-AUTH (copy and paste avoids re-typing a one-time code; blocking paste fails the criterion) |
| A hardware key or device prompt | Mention it as another method the user may prefer, if the site offers it | WCAG-AUTH (offering a choice of methods) |
| Headings: say how to move through the reply | "Press H to move to the next heading" only when the reader is known | WEBAIM (users jump heading to heading; headings should be an accurate outline); UG |
| "All these keys are documented", "every command here is official" | "These are common NVDA keys; check your NVDA version's key list: NVDA+N, Help, Commands Quick Reference" | UG (NVDA menu, Help submenu, Commands Quick Reference) |
| "The NVDA equivalent of X is Y" for a key not in the table | Say what you want done in words ("copy the text") or mark the key unverified | the NVDA guide lists its own keys; an equivalent not in it is a guess |
| "You will see / the page has / the button is called" for an unseen app | "usually", "often", "may be announced as"; ask the user to read back what NVDA says | WCAG-SC intent (controls vary); UG (NVDA+Tab reports focus) |

## Words to remove

left, right (except the Left Arrow and Right Arrow keys), top, bottom, above, below, under,
next to, nearby, beside, side, corner, round, big, small, colour names, icon, image, logo,
click, hover, scroll, drag, "see", "look at", "QR code" without the setup key route.

## One line a route may carry

"The key names here are common NVDA ones. If something does not match your setup, press NVDA+N,
then H for Help, then the Commands Quick Reference."
