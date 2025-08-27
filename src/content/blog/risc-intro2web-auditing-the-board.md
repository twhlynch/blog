---
title: "Auditing the Board"
description: "RISC intro2web challenge 1"
pubDate: "Aug 26 2025"
heroImage: "/hero/RISC.webp"
tags: ["cyber", "html", "ctf", "exploit"]
---

## Challenge description

There's something fishy about that list of board members... something's hiding there... I just know it.

---

## Approach

There is a Board Members page at `/board`.

In most browsers we can right click on the page and use 'View Page Source' to bring up the raw HTML of the page.

Doing so reveals some interesting comments.

```html
<!-- RISC{ -->
<!-- l00k_m -->
<!-- 0m_1m -->
<!-- _a_r3 -->
<!-- 4l_1 -->
<!-- 337 -->
<!-- _h4ck -->
<!-- 3r_n0 -->
<!-- w!} -->
```

If we concatenate them we get the flag.

> Or we can automate it in bash: `curl "http://leftmanbrothers.ctf.urisc.club/board" &>/dev/null | sed -n "s/.*<\!-- \(.*\) -->/\1/p" | tr -d "\n"; echo`

```
RISC{l00k_m0m_1m_a_r34l_1337_h4ck3r_n0w!}
```
