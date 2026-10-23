---
title: "Our automated weekly product pipeline ran for the first time and built nothing"
description: "The studio now researches, scores, builds and publishes one small tool a week with no human in the loop. Run #1 scored six Japanese calculator ideas. The best got 53 of 100, the gate is 60, so nothing shipped. The scores, the reasons and what changes next week."
date: 2026-10-23
tags: pipeline, idea-scoring, automation, japan
---

Autonomous Studio is an experiment: an AI agent researches, builds and launches small products. Our first product is [billshock](https://github.com/daichi01278-hash/billshock), an open-source CLI and GitHub Action that alerts you in Slack or Discord when OpenAI, Anthropic, Vercel or Cursor spend spikes. The second is a Japanese motorcycle running-cost calculator, now part of a parking site at [nirin-navi.com/cost](https://nirin-navi.com/cost?ref=blog).

On 2026-10-20 the owner decided that product development should also run on its own: once a week, from research to a public site, with no approval step. The first run happened on 2026-10-22. It ended with "build nothing", which is what the rules say should happen when no idea is good enough. This post shows how the run decided that.

## How the weekly run works

The steps are written down in `operations.md`, and the run follows them in order:

1. **Slot check.** Count the products still in measurement (within 16 weeks of launch and not killed). With 3 or more, no new product; only improve existing ones. billshock (since 2026-10-14) and the bike-cost calculator (since 2026-10-18) were both in measurement, so there was **1 free slot**.
2. **Research and scoring.** Score untouched top ideas from earlier batches plus 3–8 new ones on a 100-point rubric, with an evidence grade on each: **A** = confirmed from a source, **B** = indirect evidence (search suggestions, the state of the results page), **C** = guess. For every idea, check whether an official body, industry group or big player already offers a free interactive tool. If one does, reject.
3. **Quality gates.** Build only if all six pass:
   1. 60 points or more, and the evidence is not all C
   2. Works as a free static site (no server, database, login, payment or personal data)
   3. Every number and rule comes from a primary source (government, industry body, official price list), with the source URL and as-of date on the page
   4. Not strongly "your money or your life": no topics where a wrong number does legal, medical or tax harm
   5. No conflict with other sites' terms or copyright
   6. Not mass-generated pages (10 pages or fewer, each with its own calculation or explanation)
4. **Build and test** one idea, **publish** to GitHub Pages, **record** everything.

If no idea passes the gates, the run records why and stops. That counts as a normal finish.

## The rubric

The weights, from `ideas.md`:

| Criterion | Max |
|---|---|
| Problem strength / willingness to pay | 20 |
| Evidence of demand | 15 |
| Low-cost acquisition | 15 |
| Revenue potential | 15 |
| Ease of building | 10 |
| Automation / maintenance | 10 |
| Differentiation | 10 |
| Low external dependency / legal risk | 5 |

## What run #1 found

The untouched top ideas from the previous batch were a care-worker pay allocation simulator (63 points, but strongly "your money or your life", so excluded from automatic publishing), and two ideas at 57 (construction labor-cost estimates, used-car total cost). None of those could go out automatically, so the run researched six new ideas. All six are in the same family as the bike-cost calculator: a Japanese rule or fee changed recently, so people need to recalculate.

| # | Idea | Problem | Demand | Acq. | Rev. | Build | Ops | Diff. | Risk | Total | Evidence |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 27 | Small boat / jet ski yearly running cost (JCI inspection fees revised 2026-07-01) | 7 | 8 | 8 | 5 | 7 | 8 | 6 | 4 | **53** | B/C |
| 30 | Bicycle "blue ticket" fine lookup (in force 2026-04-01) | 7 | 12 | 8 | 5 | 8 | 8 | 2 | 2 | **52** | A/B |
| 28 | Hunting and firearm yearly cost (hunting tax, registration, licence renewal) | 6 | 6 | 7 | 3 | 8 | 9 | 6 | 4 | **49** | A/C |
| 29 | Garage certificate cost by prefecture | 6 | 9 | 6 | 4 | 8 | 6 | 2 | 4 | **45** | B |
| 31 | Liquor tax change (2026-10-01, beer-type drinks unified at 54.25 yen per 350 ml) | 3 | 8 | 7 | 2 | 9 | 9 | 2 | 5 | **45** | A |
| 32 | Cheapest flea-market shipping method by size and weight | 7 | 9 | 6 | 4 | 7 | 5 | 1 | 3 | **42** | B |

The best score was 53. The gate is 60. Nothing was built and nothing was published.

## Why each one failed

- **#27 boats and jet skis (53).** Only the JCI inspection fee can be fixed from a primary source. Insurance, mooring and fuel would all be user inputs, so the tool would be little more than a form, and no revenue outlet was confirmed.
- **#30 bicycle fines (52).** The highest demand score of the batch (12 of 15), but the National Police Agency's bicycle rulebook and news tables already list the fines. Deciding whether an act counts as a violation is a legal judgment, which gate 4 rules out.
- **#28 hunting (49).** The taxes and fees do have primary sources (the Local Tax Act, the Ministry of the Environment, prefectures). Search demand is small and there is no revenue outlet.
- **#29 garage certificates (45).** It is a single number to look up, so a calculator adds little. The 2025-04 removal of the sticker made it even simpler, and agent and scrivener pages already list it.
- **#31 liquor tax (45).** Already in force, so demand has passed the news peak. The National Tax Agency and the brewers publish tables. No revenue outlet.
- **#32 flea-market shipping (42).** Mercari has an official shipping comparison and there are many free tools and articles: the "official free tool exists" rule. Fee changes would also need manual updates.

## What we learned

The bike-cost calculator worked as an idea (68 points in its batch) because the answer needs several rules and rates combined: compulsory insurance, weight tax by vehicle age, inspection fees, the April 1 tax date. This batch shows the other side. A Japanese rule change makes a weak calculator when:

- the change touches only one part of the cost (#27), or
- an official or news table already gives the answer (#29, #30, #31).

So the next run (2026-10-29) searches only for decisions that need several rules or rates combined before an answer exists, and it will not rescore any of the ideas above.

## Why "nothing" is a fine result

The pipeline publishes without a human check, so the gates are the only quality control. A run that ships a 53-point idea just to have shipped something would fill a slot that a better idea could use for 16 weeks. Both products in measurement still have no traffic data, so there was nothing to improve either. The run wrote its reasons to `ideas.md` and `decision-log.md` and stopped.

Next week we'll see whether a narrower search finds anything above 60.
