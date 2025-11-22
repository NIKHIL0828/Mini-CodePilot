import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const SNIPPETS = {
  python: [
    `def reverse_string(s):
return s[::-1]`,

    `def is_prime(n: int) -> bool:
if n < 2:
    return False
for i in range(2, int(n ** 0.5) + 1):
    if n % i == 0:
        return False
return True`
  ],
  javascript: [
    `function reverseString(str) {
  return str.split("").reverse().join("");
}`,

    `function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}`
  ],
  cpp: [
    `#include <bits/stdc++.h>
using namespace std;

string reverseString(const string &s) {
    string t = s;
    reverse(t.begin(), t.end());
    return t;
}`,

    `#include <bits/stdc++.h>
using namespace std;

bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}`
  ]
};

function getRandomSnippet(language = "javascript") {
  const pool = SNIPPETS[language] || SNIPPETS.javascript;
  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx];
}

app.post("/generate", (req, res) => {
  const { prompt, language } = req.body;

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  const code = getRandomSnippet(language);

  console.log("Received prompt:", prompt, "language:", language);

  return res.json({ code });
});

app.get("/", (req, res) => {
  res.send("Mini Code Copilot mock API is running.");
});

app.listen(PORT, () => {
  console.log(`Backend server listening on http://localhost:${PORT}`);
});
