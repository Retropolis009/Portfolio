# Portfolio completion guide

This guide is for finishing the portfolio in small, verifiable steps. The page is already reorganized around the work; your next job is to add the evidence that lets a studio understand exactly what you built and how you work.

## 1. Confirm your public details

Open `index.html` and check the hero and About section:

1. Confirm that “around 2 years” is still accurate. Change the copy in both places if it is not.
2. Keep “open to long-term work” only while that is true. Update the hero eyebrow if your availability changes.
3. Confirm `retropolis009` is the right Discord username and that people can contact you there.
4. Keep the title **Roblox Gameplay & Systems Programmer** if it describes the work you want. It communicates a role and focus without implying a seniority level.

## 2. Make a fact sheet for each project

Before editing each project card, write short answers in a private note. Do this for the FPS framework, ability system, tower-defense engine, and vehicle mechanics.

| Question | What to write down |
|---|---|
| What was the goal? | The player or developer problem the system was meant to solve. |
| What did you personally build? | Your exact responsibilities. Separate your work from teammates' work. |
| How does it work? | The important modules, data flow, states, or client/server split. |
| What was difficult? | One real technical constraint or bug you had to solve. |
| How did you verify it? | The checks you actually performed in Studio or in a play test. |
| What is the result? | A demonstrated outcome. Use numbers only when you measured them. |
| What can a viewer inspect? | A clear demo timestamp, a safe code excerpt, diagram, or other proof. |

Do not guess about server authority, anti-cheat, performance, reusability, shipped status, team size, or player counts. If you cannot verify a detail, leave it out or describe it as a learning goal instead of claiming it as completed work.

## 3. Turn the project descriptions into mini case studies

For each project in `index.html`, find its `<article class="project-card">` block. The project name is in its `<h3 class="card-title">`; the summary is in `<p class="card-desc">`.

Replace the current summary with 2–4 concise sentences using this pattern:

> **Goal:** [what needed to work]. **My contribution:** [what you implemented]. **Implementation:** [one or two verified technical choices]. **Result:** [what the demo proves or what you measured].

Keep only the parts you can support with your code or demo. If the project was collaborative, say which pieces were yours. Add one short, specific “Focus” sentence only when it adds information beyond the summary; otherwise remove the `<p class="project-proof">` for that card.

Update the chips in `<div class="tech-stack">` to match real tools and techniques. Avoid broad labels like “AI” or “optimization” unless you can explain what they refer to.

## 4. Improve the demo evidence

The four cards use YouTube embeds. For each video:

1. Confirm it still loads and shows the system clearly within the first few seconds.
2. Trim long intros, blank footage, and unrelated gameplay if you control the video.
3. Add a short voiceover, captions, or on-screen labels to identify what you implemented.
4. If useful, link to a timestamp using a `?start=SECONDS` parameter on the YouTube embed URL.
5. Replace a video only with a working public demo; check privacy and permissions before publishing.

If you have source code to show, add a link to a small, readable excerpt or a public repository. Remove credentials, private game data, player identifiers, and proprietary code first. Never put API keys or other secrets in HTML, CSS, JavaScript, or a public repository.

## 5. Add proof of how you work

The **How I work** section is intentionally a clear, general process. Strengthen it with a real example in the About paragraph or a project case study:

- How you clarify requirements and edge cases.
- How you test a feature in Roblox Studio.
- How you handle integration, bugs, and feedback.
- How you keep someone updated during ongoing work.

Use examples from things you have actually done. Avoid promising a workflow you cannot follow consistently.

## 6. Keep the scope focused

The Systems section summarizes what the four current projects show. Add DataStores, inventories, economies, matchmaking, live operations, or other areas only after you have a real example to present. A small, well-explained demo is more useful than an unsupported skill list.

For long-term studio work, you could build a new, self-contained example when you are ready—such as a player inventory with server-side validation and persistent data. Treat it as a personal demo and label it accurately; do not imply it shipped in a live game.

## 7. Review the site before publishing

1. Open `index.html` locally in a browser.
2. Read the page from top to bottom as if you were a studio lead seeing it for the first time. The order is Work → Systems → How I Work → About → Contact.
3. Check every video, navigation link, and the Discord copy button.
4. Check the page at desktop width and at a narrow mobile width.
5. Read every statement and ask: “Can I point to a demo, code, or specific experience that proves this?” Rewrite anything you cannot support.
6. Save your changes and review the Git diff before committing.
7. Publish by pushing to the branch configured as the GitHub Pages source in the repository settings. The repository’s default branch is `main`, but confirm which branch Pages uses before publishing. Allow Pages time to update, then review the live URL on desktop and mobile.

## 8. Suggested order of work

1. Confirm the contact details and availability.
2. Write the four project fact sheets.
3. Rewrite the FPS and tower-defense cards first; they show combat, client-facing gameplay, AI, and progression logic.
4. Rewrite the abilities and vehicle cards.
5. Improve the demos and add safe code or architecture evidence.
6. Add new systems only when you have a real demo to support them.
7. Review, publish, and ask a developer or studio lead to review the live page.

The goal is for a potential collaborator to quickly see what you built, understand how you approached it, and know how to contact you—not just see a list of mechanics.
