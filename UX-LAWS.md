# Laws of UX & UI principles in this portfolio

Part 1 covers all **30** laws on [lawsofux.com](https://lawsofux.com/). Part 2 covers the classic UI
principles (Nielsen, Norman, Shneiderman, Gestalt and visual design). Each entry says where it shows up on
the site. Updated for the round-3 redesign (IBM Plex, Carbon Gray 100, no cards or motion kit).

## Part 1 — Laws of UX

---

### 1. Aesthetic-Usability Effect
*People see good-looking design as easier to use.*
One consistent system: IBM Plex Sans for everything, Plex Mono for small facts, neutral greys, square
corners and hairline rules. The real product screenshots are the most colourful thing on the page, so the
work is what looks good.

### 2. Choice Overload
*Too many options make people freeze.*
The header has five plain links and a theme switch. Each project offers two links at most (the case study
and the live product). The contact form has three fields (name, email, message).

### 3. Chunking
*Information is easier to take in when it's grouped into small, meaningful pieces.*
Each project is name → niche and status → two-line story → stack → links. Services are five groups of four
to nine items, plus four ways to work together. Case studies are short sections with plain headings.
Experience is one role per row with its dates beside it, and the WhatsApp number is written in groups
(+234 811 320 9561).

### 4. Cognitive Bias
*People take mental shortcuts; design should work with them honestly.*
Claims are backed by things a visitor can check: live links, real screenshots, a Google Play listing, a
public GitHub, a downloadable CV. The live projects come first. There are no fake testimonials, invented
mockups, countdowns or "only 2 spots left" pressure.

### 5. Cognitive Load
*Every extra thing on screen costs mental effort.*
One idea per section and no decoration: no glows, grain, tickers or animated reveals. The homepage gives
each project in two sentences and saves the detail for its own page. No pop-ups, cookie banners or chat
widgets. Secondary text is dimmer so the eye lands on what matters first.

### 6. Doherty Threshold
*People stay engaged when the interface responds in under 400ms.*
Plain HTML with the header and footer already in the page, so content paints without waiting for
JavaScript. Fonts are self-hosted and preloaded, images are WebP and lazy-loaded with their size reserved,
and hover states respond in about 150ms. The form switches to "Sending…" the moment you click.

### 7. Fitts's Law
*Bigger, closer targets are faster to hit.*
Buttons are 44px tall; the theme switch and copy button are 36px. Project titles, screenshots and the
"Also building" rows are all links, and each row is clickable across its full width.

### 8. Flow
*People do their best when nothing breaks their concentration.*
The page reads top to bottom: who I am → the work → services → about → experience → contact. Nothing
animates in your way, and every project page ends with a contact line and "Previous" / "Next".

### 9. Goal-Gradient Effect
*People speed up as they get closer to a goal.*
The form's three fields make it feel almost done before it's started, and the success message offers
WhatsApp straight away if it's urgent.

### 10. Hick's Law
*The more choices, the longer the decision.*
The intro has two buttons (get in touch, download CV) and three text links. Contact offers three direct
channels and one short form.

### 11. Jakob's Law
*People expect your site to work like the sites they already know.*
Name top-left links home, navigation top-right, underlined text links, a plain form, "Back to top" in the
footer, and a 404 page with a clear way home. On phones the nav stays visible as one row instead of hiding
behind a menu button.

### 12. Law of Common Region
*Things inside the same boundary are seen as a group.*
Hairline rules do the grouping instead of boxes: each services group, each role and each "Also building"
row sits between two rules, and the key facts on each project page sit under one rule.

### 13. Law of Proximity
*Things close together are seen as related.*
Labels sit right above their inputs. A project's name, niche and status are tight together, while projects
have generous space between them. Space inside a section is always smaller than space between sections.

### 14. Law of Prägnanz
*People read shapes in their simplest form.*
Rectangles and lines only: square buttons, square screenshots, an "EO" monogram on a square, and a 404 maze
drawn with nothing but lines.

### 15. Law of Similarity
*Things that look alike are seen as alike.*
Every featured project uses the same layout, and every small fact (stack, status, dates) is set in Plex
Mono. Status colours mean the same thing everywhere: green for live, yellow for in development. Blue is
only ever a link or focus ring.

### 16. Law of Uniform Connectedness
*Visually connected things feel more related than things that aren't.*
Dates sit on the same row as the role they belong to, and each project's screenshot sits beside its text in
one grid row.

### 17. Mental Model
*People bring expectations from similar sites.*
The structure matches what anyone expects from a developer portfolio: intro, work, services, about,
experience, contact. Project pages follow the usual case-study shape: what it is, the brief, what I built,
tech.

### 18. Miller's Law
*People hold roughly 7 (±2) things in working memory.*
Seven projects on the homepage (five featured, two listed). Five navigation links. Services in five
groups, none longer than nine. Four tool groups. Four key facts at the top of each project page.

### 19. Occam's Razor
*Don't add anything that isn't needed.*
Round 3 removed the serif display font, glows, film grain, grid backgrounds, cards, fake browser frames,
the ticker, extra clocks, numbered counters, the progress bar, keyboard-shortcut tips, and the drawn mockups.

### 20. Paradox of the Active User
*People don't read instructions; they start using things straight away.*
Nothing needs explaining. Links look like links (underlined), buttons look like buttons, and form errors
appear in plain words right under the field that needs fixing.

### 21. Pareto Principle
*Roughly 80% of the value comes from 20% of the things.*
The two things visitors come for, seeing the work and getting in touch, come first and are reachable from
everywhere: the header, the intro, the footer, and the end of every project page.

### 22. Parkinson's Law
*A task expands to fill the time you give it.*
The form takes seconds: three fields, autofill for name and email, and the email keyboard on phones.
WhatsApp opens with a message already written, and the email address copies with one tap.

### 23. Peak-End Rule
*People judge an experience by its best moment and its ending.*
The peaks are the real product screenshots. The ending is a plain contact section and a clear "Message
sent" with WhatsApp offered if it's urgent. Even the 404 page has a maze that solves itself.

### 24. Postel's Law
*Be liberal in what you accept and conservative in what you send.*
The form trims stray spaces, uses a forgiving email check and asks for no phone number. It still posts to
Formspree if JavaScript fails. The site respects each visitor's settings (reduced motion, dark or light
theme) and works on any screen width.

### 25. Selective Attention
*People filter out anything that looks like noise or ads.*
Colour is saved for meaning: green status, yellow status, blue links. There are no banner-shaped boxes,
pop-ups or moving elements for visitors to learn to ignore.

### 26. Serial Position Effect
*People remember the first and last items best.*
The page opens with my name and ends with the contact section. The work starts with the strongest live
project (Ogascounty).

### 27. Tesler's Law
*Some complexity can't be removed, so the system should carry it, not the user.*
The site does the fiddly work: it converts to Lagos time for you ("It's 14:32 in Lagos"), pre-writes the
WhatsApp message, remembers your theme, and copies the email with one tap. Behind the scenes, contact
details live in one config file and the header/footer in one place each.

### 28. Von Restorff Effect
*The thing that's different is the thing that's remembered.*
Only the primary action is a solid button. On an otherwise grey page, the product screenshots and the green
"Live" labels are what stand out.

### 29. Working Memory
*Don't make people remember things between screens.*
Every project page repeats the key facts at the top (client, role, stack, status). The header marks "Work"
as current on project pages, and "Previous" and "Next" name the project they lead to.

### 30. Zeigarnik Effect
*People remember unfinished tasks and want to complete them.*
"Read the case study →" on every featured project promises the rest of the story, and "Also building"
shows work that's still in progress.

---

## Part 2 — UI principles

### Nielsen's 10 usability heuristics

| Heuristic | Where it shows up |
|---|---|
| Visibility of system status | "Work" underlined in the nav on project pages, "Sending…" on the form, "Message sent", live Lagos clock, toast when the email is copied |
| Match with the real world | Plain words everywhere ("Get in touch", "Read the case study"), no jargon in client-facing copy |
| User control and freedom | "Send another" after sending, "All work" back link, theme switch works both ways, "Back to top" |
| Consistency and standards | One button style per role, the same layout for every featured project, conventional header and footer |
| Error prevention | Correct input types and autofill, required fields checked before sending, spam trap instead of a CAPTCHA |
| Recognition rather than recall | Key facts repeated on project pages, next/previous projects named |
| Flexibility and efficiency | Works with keyboard only (skip link, visible focus rings), and without JavaScript |
| Aesthetic and minimalist design | Only the person, the work, services and contact; everything decorative was cut |
| Recognise and recover from errors | Plain-language messages under the field at fault, plus a direct email link if sending fails |
| Help and documentation | None needed |

### Don Norman's design principles

| Principle | Where it shows up |
|---|---|
| Affordances | Buttons, fields and underlined links look pressable, typeable or clickable |
| Signifiers | Underlines on links, "→" for pages on this site and "↗" for other sites |
| Feedback | Hover states respond in ~150ms; the form, copy button and theme switch all confirm what happened |
| Mapping | "Previous" sits on the left and "Next" on the right |
| Constraints | The send button is disabled while sending; email and name fields only accept what makes sense |
| Conceptual model | A portfolio that works like every portfolio: intro, work, services, about, experience, contact |

### Shneiderman's 8 golden rules

Consistency (one visual system), shortcuts (skip link, keyboard focus), informative feedback (states and
toasts), dialogs that close (a clear "Message sent"), simple error handling (inline messages), easy
reversal (theme, "Send another"), the user in control (no autoplay, no pop-ups, nothing animates on its
own) and low memory load (facts repeated where they're needed).

### Gestalt and visual design (contrast, repetition, alignment, proximity)

- **Contrast & hierarchy:** semibold Plex Sans headings over regular body text; mono for small facts;
  secondary text dimmed.
- **Repetition:** the same heading → intro → ruled list rhythm in every section.
- **Alignment:** one left edge for all text; screenshots and lists share the same content width.
- **Figure/ground & focal point:** each section has one focal element (the name, a screenshot, a heading)
  on a flat background.

Sources: [Nielsen Norman Group, 10 usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) ·
[UX Magazine, Don Norman's principles](https://uxmag.com/articles/understanding-don-normans-principles-of-interaction) ·
[IxDF, Shneiderman's eight golden rules](https://ixdf.org/literature/article/shneiderman-s-eight-golden-rules-will-help-you-design-better-interfaces)
