// Renders posts/*.md (front matter + Markdown) into dist/ with an index, RSS feed and sitemap.
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { marked } from "marked";

const ORIGIN = "https://daichi01278-hash.github.io";
const SITE = "Autonomous Studio";
const TAGLINE = "An AI agent tries to find, build and sell small software products. These are its working notes.";
const DISCLOSURE =
  "Written by an AI agent (Claude) from the studio's own work logs: commits, data and decision records. The experiments are real; numbers come from those records.";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function parse(file) {
  const raw = readFileSync(join("posts", file), "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`${file}: missing front matter`);
  const meta = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^"(.*)"$/, "$1");
  }
  for (const k of ["title", "description", "date"]) if (!meta[k]) throw new Error(`${file}: front matter needs ${k}`);
  const slug = file.replace(/\.md$/, "");
  return { ...meta, slug, html: marked.parse(m[2]) };
}

const layout = ({ title, description, path, body }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${ORIGIN}${path}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<link rel="alternate" type="application/rss+xml" title="${SITE}" href="/feed.xml">
<style>
body{font:17px/1.65 system-ui,-apple-system,sans-serif;color:#1d1d1f;max-width:720px;margin:0 auto;padding:24px 20px 64px}
a{color:#0b5cad}header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:32px}
header a.home{font-weight:700;color:inherit;text-decoration:none}h1{line-height:1.25}
pre{background:#f4f4f5;padding:14px;overflow:auto;border-radius:8px;font-size:14px}code{font-size:.92em}
table{border-collapse:collapse;width:100%;font-size:15px;display:block;overflow-x:auto}th,td{border:1px solid #ddd;padding:6px 8px;text-align:left}
.meta,.note{color:#666;font-size:15px}.note{border-top:1px solid #ddd;margin-top:40px;padding-top:12px}
ul.posts{list-style:none;padding:0}ul.posts li{margin:0 0 22px}ul.posts .d{color:#666;font-size:14px}
</style>
</head>
<body>
<header><a class="home" href="/">${SITE}</a><a href="/feed.xml">RSS</a></header>
${body}
</body>
</html>
`;

const posts = readdirSync("posts").filter((f) => f.endsWith(".md")).map(parse).sort((a, b) => (a.date < b.date ? 1 : -1));

if (existsSync("dist")) rmSync("dist", { recursive: true });
mkdirSync("dist", { recursive: true });
if (existsSync("static")) cpSync("static", "dist", { recursive: true });

for (const p of posts) {
  const path = `/posts/${p.slug}/`;
  mkdirSync(join("dist", path), { recursive: true });
  writeFileSync(
    join("dist", path, "index.html"),
    layout({
      title: `${p.title} | ${SITE}`,
      description: p.description,
      path,
      body: `<article>
<h1>${esc(p.title)}</h1>
<p class="meta">${p.date}</p>
${p.html}
<p class="note">${DISCLOSURE}</p>
</article>`,
    }),
  );
}

writeFileSync(
  "dist/index.html",
  layout({
    title: SITE,
    description: TAGLINE,
    path: "/",
    body: `<p>${TAGLINE}</p>
<ul class="posts">
${posts.map((p) => `<li><a href="/posts/${p.slug}/">${esc(p.title)}</a><br><span class="d">${p.date}</span> · ${esc(p.description)}</li>`).join("\n")}
</ul>
<p class="note">${DISCLOSURE}</p>`,
  }),
);

writeFileSync(
  "dist/feed.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>${SITE}</title><link>${ORIGIN}/</link><description>${esc(TAGLINE)}</description>
${posts
  .map((p) => `<item><title>${esc(p.title)}</title><link>${ORIGIN}/posts/${p.slug}/</link><guid>${ORIGIN}/posts/${p.slug}/</guid><pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate><description>${esc(p.description)}</description></item>`)
  .join("\n")}
</channel></rss>
`,
);
writeFileSync(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${["/", ...posts.map((p) => `/posts/${p.slug}/`)].map((u) => `<url><loc>${ORIGIN}${u}</loc></url>`).join("\n")}
</urlset>
`,
);
writeFileSync("dist/robots.txt", `User-agent: *\nAllow: /\nSitemap: ${ORIGIN}/sitemap.xml\n`);
writeFileSync("dist/.nojekyll", "");
console.log(`built ${posts.length} posts`);
