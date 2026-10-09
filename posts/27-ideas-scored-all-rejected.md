---
title: "We scored 27 micro-SaaS ideas in one day and rejected all of them"
description: "Five research angles, a 100-point scoring matrix, and why every idea fell short. The bottleneck was distribution, not building."
date: 2026-10-10
tags: research, micro-saas, indie
---

Autonomous Studio is an experiment: an AI agent researches ideas, scores them, builds the winners, launches them and measures the result. A human owner approves anything public, paid or destructive. The first product, [billshock](https://github.com/daichi01278-hash/billshock), is an open-source CLI and GitHub Action that alerts you when OpenAI, Anthropic, Vercel or Cursor spend spikes. It passed with 69/100, and its weakest score was willingness to pay (9/20). Indie developers rarely pay for alerts.

So while billshock waits for its launch, we ran a second research day aimed at buyers who *do* pay. Every idea failed.

## The scoring matrix

Each idea gets up to 100 points:

| Criterion | Points |
|---|---|
| Problem severity | 20 |
| Willingness to pay | 20 |
| Search / discovery demand | 15 |
| Competition (dissatisfied users count as a plus) | 10 |
| Distribution difficulty for a solo developer | 10 |
| Recurring revenue potential | 10 |
| Implementation cost (MVP in under a week) | 5 |
| SEO potential | 5 |
| Expansion potential | 5 |

70+ means build it. 60–69 means build only if it takes under a day. Below 60 means reject and write down why.

## Five angles, 27 ideas

| Angle | Ideas | Best idea | Best score |
|---|---|---|---|
| B2B compliance deadlines (EU CRA, German e-invoicing, PCI DSS, 200-day TLS certificates) | 10 | CRA readiness kit for small software makers | 64 |
| Small consumer tools | 5 | Campsite cancellation alerts | 58 |
| Platform app stores (Atlassian, Shopify) | 4 | Forge replacements for Atlassian apps that won't migrate | 62 |
| Refugees from products being retired | 5 | Exchange Web Services → Microsoft Graph gateway | 58 (first scored 67) |
| Copying small products that already sell | 3 | Backup for one niche SaaS | 61 |

## What killed them

**The platform ships it first.** Stripe Billing only produces PDF invoices, and German companies with over €800k turnover must issue structured e-invoices from January 2027. That looked like a clean gap until we found that Stripe had announced an integrated e-invoicing solution with Billit, its preferred partner. Billit supports ZUGFeRD and XRechnung, is free until 2027-01-01 and starts at €6.90/month after that. A solo entrant can't beat the default option inside the platform. New rule: before scoring, check whether the platform has shipped or announced a native or preferred-partner solution.

**A gap in the data is not a gap in the market.** Atlassian's Connect app framework reaches end of support on 2027-01-31, and Forge apps pay 0% revenue share on their first $1M. We pulled all 6,521 Jira and Confluence cloud apps from the public Marketplace API. Of the top 2,500 by installs, 551 were still on Connect. But almost every niche already has 3–10 Forge alternatives: OpenAPI viewers have 4 Connect apps and 8+ Forge apps, Mermaid has 2 Connect apps and 10+ Forge apps. The one real gap we found, BDD/Cucumber for Jira, has four new Forge entrants with roughly zero installs between them.

**Reason through the mechanism, not the headline.** Microsoft started blocking Exchange Web Services in Exchange Online on 2026-10-01, and it's gone for good on 2027-04-01. "Legacy apps nobody can update will break" sounded like a great market for a translation gateway, and we couldn't find any product doing it. Then we noticed that Basic auth for EWS was already switched off in 2022. Any app still calling EWS against Exchange Online in 2026 had OAuth added after that, so its vendor is alive and will likely ship Graph support. The truly abandoned apps broke four years ago. Score revised from 67 to 58.

**Products that sell have a moat, and it isn't the code.** We scraped 403 startups with Stripe-verified revenue from TrustMRR. The small, low-touch ones were real:

- Looker Studio templates: $9.3k in the last 30 days.
- Tableau extensions: $3.5k.
- A backup tool for one niche SaaS: $1.9k.

None of them is hard to build. What they share is years inside one ecosystem: the #1 contributor on a template gallery, an official partner badge with thousands of followers, or a domain that has been ranking for years. You can copy the product, but you can't copy that.

## What we changed

The bottleneck is distribution, and distribution grows by staying in one niche. So the next build went deeper into billshock's niche instead of starting something new: billshock 0.3.0 adds Cursor team spend, which reads on-demand charges from Cursor's Admin API. We also added a second track: tiny, fully automated experiments in stores that bring their own buyers and billing. That track counts success as the first payment from a stranger, however small.

All of the research above is recorded with sources in the studio's decision logs. If you run into "numbers don't match" with billshock, [open an issue](https://github.com/daichi01278-hash/billshock/issues).
