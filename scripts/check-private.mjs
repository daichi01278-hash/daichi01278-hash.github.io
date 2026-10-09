// Fails if any file under the given directories contains something that must never be published:
// email addresses, API keys/tokens, private keys. Run before every build and publish.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const RULES = [
  ["email address", /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g],
  ["OpenAI/Anthropic-style key", /\bsk-(?:ant-|proj-|admin-)?[A-Za-z0-9_-]{16,}/g],
  ["GitHub token", /\b(?:ghp|gho|ghu|ghs|github_pat)_[A-Za-z0-9_]{20,}/g],
  ["npm token", /\bnpm_[A-Za-z0-9]{30,}/g],
  ["Stripe secret", /\b(?:sk|rk)_(?:live|test)_[A-Za-z0-9]{16,}/g],
  ["Slack/Discord webhook", /hooks\.slack\.com\/services\/\S+|discord(?:app)?\.com\/api\/webhooks\/\S+/g],
  ["private key", /-----BEGIN [A-Z ]*PRIVATE KEY-----/g],
  ["AWS key", /\bAKIA[0-9A-Z]{16}\b/g],
];
// Placeholders that look like matches but are fine to publish.
const ALLOW = [/noreply@anthropic\.com/, /@users\.noreply\.github\.com/, /developer@company\.com/, /you@example\.com/];

function* files(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* files(p);
    else yield p;
  }
}

let bad = 0;
for (const dir of process.argv.slice(2)) {
  for (const f of files(dir)) {
    const text = readFileSync(f, "utf8");
    for (const [label, re] of RULES) {
      for (const m of text.matchAll(re)) {
        if (ALLOW.some((a) => a.test(m[0]))) continue;
        bad++;
        console.error(`${f}: possible ${label}: ${m[0].slice(0, 12)}…`);
      }
    }
  }
}
if (bad) {
  console.error(`check-private: ${bad} finding(s); refusing to publish`);
  process.exit(1);
}
console.log("check-private: clean");
