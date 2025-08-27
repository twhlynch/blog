---
title: "Component Tests"
description: "Showcase this pages interactive features"
pubDate: "Aug 28 2025"
heroImage: "/hero/smokedex_TheWhiteCrescent.webp"
tags: ["meta"]
---

## View counter

The view counter increments for every new view with individuals counting as new views after an hour since they last viewed the page. This is implemented through a cloudflare KV ([Github](https://github.com/twhlynch/views))
> The 1 hour cooldown is disabled here, go wild!

## Code Spotlighting

Hover over code `snippets` to spotlight them in relating code blocks.

```javascript
// greet the user
function greet(user) {
	return `Hello, ${user}!`;
}

const message = greet("Tom");
console.log(message);
```

The above code implements a function `greet` that outputs `Hello,` then the `user`. It then uses the function to greet `Tom`, and `console.log` to print out the result.

```python
import json

def write_json(file_name: str, json_data: dict) -> None:
	"""Stringify json data and write it to a file"""
	with open(file_name, 'w') as file:
		json.dump(json_data, file)

data = { "key": "value" }
write_json("example.json", data)
```

The above code implements a function `write_json` that writes a json `dict` to a file. `write_json` takes a `file_name` and some `json_data` as input, and uses `json.dump`; `import`ed from the `json` python library to convert it to a string and write it to a file.

## Code Copying

Code blocks have a copy button in the top right that appears on hover.

```bash
git clone https://github.com/twhlynch/blog.git
```
