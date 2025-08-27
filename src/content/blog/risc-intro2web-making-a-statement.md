---
title: "Making a Statement"
description: "RISC intro2web challenge 3"
pubDate: "Aug 26 2025"
heroImage: "/hero/risc-index_Raaquilla.webp"
tags: ["cyber", "ctf", "exploit"]
---

## Challenge description

There's an account with id 99999 that has made some interesting transactions. See if you can find out more.

---

## Approach

We can look at our own transactions first through `dashboard.php` and clicking `View Transactions` on one of our accounts.

Upon doing so we are redirected to `statements.php?account=100003`

Looks like the account id has been passed as a query parameter in the URL.

Changing the URL to `statements.php?account=99999` reveals an account with one transaction with a description of `RISC{one_of_the_statements_of_the_century_017b378f8127b557be756bdf12487bff}`

So our flag is:

```
RISC{one_of_the_statements_of_the_century_017b378f8127b557be756bdf12487bff}
```
