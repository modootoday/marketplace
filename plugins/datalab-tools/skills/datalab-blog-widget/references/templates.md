# Widget templates

Follow [Naver constraints](naver-constraints.md). Bracketed fields need the user's real content. Static counters use 0000 until a measured value is supplied; a real count needs an as-of date and stays frozen.

## Profile

```html
<span style="display:block;width:170px;font:11px sans-serif;padding:10px;background:#fff"><img src="[IMAGE_URL]" alt="Profile" style="width:48px;height:48px"><br><span style="font-weight:bold">[NAME]</span><br>[INTRODUCTION]</span>
```

## Counter

```html
<span style="display:block;width:170px;font:11px sans-serif;background:#03c75a;color:#fff;text-align:center;padding:10px"><span style="font-size:24px">0000</span><br>Visitors: replace with your real number<br>[AS_OF_DATE]</span>
```

## Links and categories

```html
<span style="display:block;width:170px;font:11px sans-serif"><a href="#" target="_top" style="display:block;padding:8px;color:#333;text-decoration:none">[TITLE_OR_CATEGORY]</a><span style="display:block;color:#888">[DATE_OR_COUNT]</span></span>
```

Replace # with the real destination before use. Recent posts repeat this link block. Body profiles can use a block span with max-width:960px; body lists can use block spans with max-height:400px and overflow-y:auto. No hover or click counter.
