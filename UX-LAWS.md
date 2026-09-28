# Laws of UX & UI principles in this portfolio

Part 1 covers all **30** laws on [lawsofux.com](https://lawsofux.com/). Part 2 covers the classic UI
principles (Nielsen, Norman, Shneiderman, Gestalt and visual design) plus the motion guidelines the
animations follow. Each entry says exactly where and how it shows up on the site.

## Part 1 — Laws of UX

---

### 1. Aesthetic-Usability Effect
*People see good-looking design as easier to use.*
The whole site is built on one careful visual system: a big editorial serif for headings, a clean sans
for reading, one warm accent colour, film grain and soft glows. Real screenshots sit inside browser and
phone frames so the work looks as polished as it is. First impressions buy patience for everything else.

### 2. Choice Overload
*Too many options make people freeze.*
The header has four links, a theme switch and one button. Each project card does one thing: open the project. The
contact form was cut from seven fields to three (name, email, message).

### 3. Chunking
*Information is easier to take in when it's grouped into small, meaningful pieces.*
Every project card is split the same way: niche → name → two-line story → status and stack. Services are
split into five groups of four to nine items, plus four ways to work together. Project pages are short
sections with plain headings (The brief, What I built, Making it sell…). Skills sit in four small groups, experience is one role per row, and the WhatsApp number is written in groups
(+234 811 320 9561).

### 4. Cognitive Bias
*People take mental shortcuts; design should work with them honestly.*
Claims are backed by things a visitor can check: live links, real screenshots, a public GitHub, a
downloadable CV. The strongest live work (Ogascounty) comes first to set the bar. There are no fake
testimonials, countdowns or "only 2 spots left" pressure, because those shortcuts backfire on trust.

### 5. Cognitive Load
*Every extra thing on screen costs mental effort.*
One idea per section. The homepage gives each project in two sentences and saves the detail for its own
page. No pop-ups, cookie banners or chat widgets. Secondary text is dimmer so the eye lands on what
matters first.

### 6. Doherty Threshold
*People stay engaged when the interface responds in under 400ms.*
Plain HTML, CSS and a little JavaScript, with no framework to download. Fonts are self-hosted and
preloaded, images are WebP and lazy-loaded, and every image has its size reserved so nothing jumps.
Buttons react instantly on hover and press, the form switches to "Sending…" the moment you click, and
copying the email shows a confirmation straight away.

### 7. Fitts's Law
*Bigger, closer targets are faster to hit.*
Whole project cards are clickable, not just their titles. Buttons are 40–56px tall and icon buttons are at
least 40px square (checked automatically on every page). "Get in touch" is always in the header, the send
button runs the full width of the form on phones, and the mobile menu uses large, full-width links.

### 8. Flow
*People do their best when nothing breaks their concentration.*
The page reads like a story: who I am → the work → about → experience → contact. Scrolling is smooth,
nothing interrupts, and every project page ends with "Previous" and "Next project" so you can keep going
without jumping back to the start.

### 9. Goal-Gradient Effect
*People speed up as they get closer to a goal.*
Project pages have a reading-progress bar across the top. Cards are numbered "03 / 07" so visitors can see
how far through the work they are. The form's three fields make it feel almost done before it's started.

### 10. Hick's Law
*The more choices, the longer the decision.*
Every step offers very few options. The hero has two buttons (see my work, download CV) plus two small
icons. Contact offers three direct channels and one short form, and each card has one action.

### 11. Jakob's Law
*People expect your site to work like the sites they already know.*
It follows familiar portfolio conventions: name top-left links home, navigation top-right, a hamburger
menu on phones, underlined text links, social icons and "Back to top" in the footer, a normal-looking
form, and a friendly 404 page with a clear way home.

### 12. Law of Common Region
*Things inside the same boundary are seen as a group.*
Each project's picture and details live inside one bordered card. The form sits in its own card. "Ways I
can help" is a bordered grid, each services group sits between two rules, and the key facts on each project page sit in one ruled strip.

### 13. Law of Proximity
*Things close together are seen as related.*
Labels sit right above their inputs. Within a card, niche, name and summary are tight together, while cards
have generous space between them. Space inside a section is always smaller than space between sections.

### 14. Law of Prägnanz
*People read shapes in their simplest form.*
Simple shapes and a restrained palette throughout: a round "E." monogram, plain rectangles and circles in
the illustrated covers, and a maze drawn with nothing but lines and one accent colour.

### 15. Law of Similarity
*Things that look alike are seen as alike.*
All seven project cards share the same layout. Every tag uses the same chip style. Status colours mean
the same thing everywhere: green for live or open source, amber for in progress. Every text link is
underlined the same way.

### 16. Law of Uniform Connectedness
*Visually connected things feel more related than things that aren't.*
The experience timeline is one continuous line joining every role, and it draws itself as you scroll. Screenshots sit inside browser and phone
frames that tie them to their project, and each card's status and stack sit on a rule attached to that card.
A single underline slides between nav links, tying the header to the section on screen.

### 17. Mental Model
*People bring expectations from similar sites.*
The structure matches what anyone expects from a portfolio: intro, work, about, experience, contact.
Project pages follow the usual case-study shape: what it is, the brief, what I built, results, tech.

### 18. Miller's Law
*People hold roughly 7 (±2) things in working memory.*
Seven projects on the homepage. Five navigation targets. Services in five groups, none longer than nine. Four skill groups of no more than six chips each.
Four key facts at the top of each project page.

### 19. Occam's Razor
*Don't add anything that isn't needed.*
The first draft had a services list, process steps, pricing-style cards, an FAQ and a stats strip. They were all
removed. What's left is the person, the work and a way to get in touch, built without a framework.

### 20. Paradox of the Active User
*People don't read instructions; they start using things straight away.*
Nothing needs explaining. Every card carries an arrow that invites a click, buttons look like buttons, and
form errors appear in plain words right under the field that needs fixing. The Chomp maze plays itself.

### 21. Pareto Principle
*Roughly 80% of the value comes from 20% of the things.*
The two things visitors come for, seeing the work and getting in touch, get the most space and are
reachable from everywhere: the header button, the hero, the footer, and the end of every project page.

### 22. Parkinson's Law
*A task expands to fill the time you give it.*
The form takes seconds: three fields, autofill for name and email, and the email keyboard on phones.
WhatsApp opens with a message already written, and the email address copies with one tap.

### 23. Peak-End Rule
*People judge an experience by its best moment and its ending.*
The peaks are the hero (your name rising in letter by letter as the photo wipes in), the real product
screenshots, the card that morphs into its project page, and the live maze. The ending is a
big, warm "Let's work together", then a friendly "Got it. Thank you!" after sending, with WhatsApp offered if
it's urgent. Even the 404 page ends on a smile.

### 24. Postel's Law
*Be liberal in what you accept and conservative in what you send.*
The form trims stray spaces, uses a forgiving email check and asks for no phone number or rigid formats.
It still posts to Formspree if JavaScript fails. The site respects each visitor's settings (reduced motion,
dark or light theme) and works on any screen width.

### 25. Selective Attention
*People filter out anything that looks like noise or ads.*
The accent colour is saved for what matters: the main button, niche labels and one word in each heading.
There are no banner-shaped boxes, pop-ups or flashing elements for visitors to learn to ignore.

### 26. Serial Position Effect
*People remember the first and last items best.*
The page opens with my name and ends with the contact section. The work starts with the strongest live
project (Ogascounty) and ends on the most memorable one (Chomp's live maze). The header starts with
"Work" and ends with "Get in touch".

### 27. Tesler's Law
*Some complexity can't be removed, so the system should carry it, not the user.*
The site does the fiddly work: it converts to Lagos time for you ("It's 14:32 in Lagos"), pre-writes the
WhatsApp message, remembers your theme, and copies the email with one tap. Behind the scenes, contact
details live in one config file, so they never get out of sync.

### 28. Von Restorff Effect
*The thing that's different is the thing that's remembered.*
Only the primary action uses the solid amber button. The amber full stop after my name and the italic
amber word in each heading are the details people remember.

### 29. Working Memory
*Don't make people remember things between screens.*
Every project page repeats the key facts at the top (client, role, stack, status). The header stays pinned and
highlights which section you're in. "Previous" and "Next" name the project they lead to. On desktop, the
About and Experience headings stay in view while you read.

### 30. Zeigarnik Effect
*People remember unfinished tasks and want to complete them.*
The reading-progress bar shows a story that isn't finished yet. "03 / 07" tells you there's more to see, and
"See how I built it →" on every card promises the rest of the story. The maze keeps generating new levels.

---

## Part 2 — UI principles

### Nielsen's 10 usability heuristics

| Heuristic | Where it shows up |
|---|---|
| Visibility of system status | Active nav underline, reading-progress bar, "Sending…" on the form, success tick, live Lagos clock, toast when the email is copied |
| Match with the real world | Plain words everywhere ("Get in touch", "See how I built it"), no jargon in client-facing copy |
| User control and freedom | Escape closes the menu, "Send another" after sending, "All work" back link, theme switch works both ways, "Back to top" |
| Consistency and standards | One button style per role, same card layout for every project, conventional header and footer |
| Error prevention | Correct input types and autofill, required fields checked before sending, spam trap instead of a CAPTCHA |
| Recognition rather than recall | Key facts repeated on project pages, next/previous projects named, sticky section headings |
| Flexibility and efficiency | Hidden shortcuts for keyboard users: T switches theme, ← → move between projects |
| Aesthetic and minimalist design | Only the person, the work, services and contact; everything else was cut |
| Recognise and recover from errors | Plain-language messages under the field at fault, plus a direct email link if sending fails |
| Help and documentation | Little needed; a one-line shortcut tip on project pages and in the footer |

### Don Norman's design principles

| Principle | Where it shows up |
|---|---|
| Affordances | Cards, buttons and fields look pressable, typeable or clickable |
| Signifiers | Arrow circles on cards, the "View" cursor label, underlines on links, amber on the main action |
| Feedback | Every hover and press responds within ~120ms; the form, copy button and theme switch all confirm what happened |
| Mapping | "Previous" sits on the left and "Next" on the right, and the ← → keys match them |
| Constraints | The send button is disabled while sending; email and name fields only accept what makes sense |
| Conceptual model | A portfolio that works like every portfolio: intro, work, services, about, experience, contact |

### Shneiderman's 8 golden rules

Consistency (one visual system), shortcuts (T, ← →), informative feedback (states and toasts), dialogs that
close (a clear "Got it. Thank you!" after sending), simple error handling (inline messages), easy reversal
(theme, menu, "Send another"), the user in control (no autoplay sound, no pop-ups, motion respects system
settings) and low memory load (facts repeated where they're needed).

### Gestalt and visual design (contrast, repetition, alignment, proximity)

- **Contrast & hierarchy:** a big serif for headings against a quiet sans for reading; amber reserved for
  what matters; secondary text dimmed.
- **Repetition:** the same eyebrow → heading → body rhythm in every section; the "E." mark and amber full
  stop repeat from the logo to the footer.
- **Alignment:** everything sits on one 12-column grid with shared left edges.
- **Figure/ground & focal point:** each section has one clear focal element (the name, a cover, a heading),
  with grain and soft glows kept in the background.

### Motion guidelines

The animations follow [NN/g](https://www.nngroup.com/articles/animation-duration/) and
[Material Design](https://m3.material.io/styles/motion/easing-and-duration) guidance:

- **Durations:** hover and press feedback 120–220ms, larger UI changes around 380ms, page transitions under
  500ms. Scroll reveals run a little longer because they carry no interaction.
- **Easing:** things entering ease out (fast start, gentle stop), things leaving ease in, nothing moves at a
  linear speed.
- **Purpose:** motion either orients (a card morphing into its project page, the timeline drawing),
  gives feedback (press, send, copy), or directs attention (the hero choreography). Nothing loops for
  decoration except the slow ticker and background glows.
- **Performance:** only transform, opacity and clip-path are animated, so it stays smooth.
- **Respect:** with "reduce motion" turned on, every animation, parallax and page transition switches off.

Sources: [Nielsen Norman Group, 10 usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) ·
[UX Magazine, Don Norman's principles](https://uxmag.com/articles/understanding-don-normans-principles-of-interaction) ·
[IxDF, Shneiderman's eight golden rules](https://ixdf.org/literature/article/shneiderman-s-eight-golden-rules-will-help-you-design-better-interfaces) ·
[NN/g, animation duration](https://www.nngroup.com/articles/animation-duration/) ·
[Material Design 3, easing and duration](https://m3.material.io/styles/motion/easing-and-duration)
