# Quiet Loops · Guest-desk demo

Two fictional Lisbon businesses, one engine. The guesthouse is at the root (`index.html`); the churrasqueira is at [`brasa/`](brasa/index.html). Each page links to the other: *same loop, different business*.

## Vertical 1 · Casa Miradouro (guesthouse)

A front-desk inbox for **Casa Miradouro**, a fictional six-room guesthouse in Alfama, Lisbon. Tap a guest message and watch the loop do its work: verify the booking against the ledger, draft a reply in Portuguese and English, and decide whether it can answer on its own or must hand the message to the owner.

The promise it demonstrates: **answered in seconds, escalated when it matters, watched by machines, confirmed by a human.**

Live: enable GitHub Pages on this repo (Settings → Pages → Source: branch `main`, root) and the demo serves at `https://<owner>.github.io/quiet-loops-guestdesk-demo/`.

## What it shows

- **Verify** — every message is matched to a booking before anything is written. The ledger the loop checks is visible on the page.
- **Draft** — a reply in the guest's own language (PT or EN, inferred from their message), with the other language behind a toggle. Written from the house guide and the booking record.
- **Own channel** — the draft renders in the frame of the channel it came from: an email layout for email, a chat bubble for WhatsApp and Channel Talk, a reservation thread for the booking inbox. This page is the owner's view; the loop answers where the guest wrote.
- **Decide** — a badge: `AUTO-ANSWERED` for routine requests, `ESCALATED TO OWNER` when a human must decide.
- **Where you're needed, at a glance** — escalated messages carry a lilac edge and a `NEEDS YOU` pill in the list itself (filled, `NEEDS YOU NOW`, for the emergency). Auto-answered cards stay calm. Each card also names its channel.
- **The human gate** — escalations sit in a "waiting for owner confirmation" state until the owner taps confirm. The demo has two:
  - a **water leak** (safety): the owner is phoned, the guest gets a holding reply immediately.
  - a **booking-date change** (commercial): availability is pre-checked, the reply is drafted and held until the owner confirms.

## The 90-second demo

1. Open the page on a phone. Read the promise strip out loud. Before touching anything, point at the list: four calm cards, two marked **NEEDS YOU** with a lilac edge, one of them **NEEDS YOU NOW**. *"The loop absorbs the noise. The list shows only where you're needed."*
2. Tap **Daniel Kessler** (wifi). Watch verify → draft → `AUTO-ANSWERED`. The reply is an email, in English, because that is how Daniel wrote. Toggle to PT. *"Routine, verified, answered, in the guest's language and channel."*
3. Tap back, then **Tom Hale** (water leak). It escalates. Point at the pulsing gate. Tap **Owner confirms**. The follow-up reply appears. *"When it matters, a human decides. The guest is never left waiting."*
4. Tap back, then **Marta Lopes** (date change). It escalates too, with availability already checked. *"The owner decides in one tap, with the work already done."*
5. Open the **Bookings ledger** at the bottom. *"Nothing is invented. It only answers from what it can verify."*
6. Point at the inbox: status pills now show what was answered, what was escalated, what was confirmed, and the NEEDS YOU marks are gone from what you confirmed. **Reset demo** clears it.

## Vertical 2 · Brasa do Bairro (churrasqueira)

The same engine re-seeded for **Brasa do Bairro**, a fictional takeaway-only charcoal grill in Graça: a counter, no tables, hours Tue–Sun 12h–14h30 / 18h–21h30, closed Mondays. Header reads *"Owner's view — the loop takes orders, you cook."*

The page opens on **the owner's phone** (toggle: *O telemóvel do dono* ⇄ *O que o loop vê*). The phone is a WhatsApp-style thread from "Brasa · Balcão": only the two escalations arrive there, each with the customer's message quoted and the loop's proposal, and the owner's reply *is* the confirmation. Tap the quick-reply chip or type anything: the owner's bubble posts, the loop acknowledges what it sent to the customer, and the state flips in the loop view too. Auto-answered work is one quiet line at the bottom: *"o loop respondeu a 4 mensagens hoje — nada precisa de ti."* The second view is the working inbox and order board.

Positioning: **O Uber trata das entregas. O loop trata do balcão.** Uber Eats stays as the delivery channel (the allergy question still arrives from its inbox); the loop steers pickups to the counter and to direct WhatsApp/site orders, *sem comissões nos levantamentos*.

What changes when the business changes:

- **The ledger becomes today's order board** — order no., items with kg amounts, pickup time, estimated price, status. Two notes are pinned above it: the allergen note and the dead-window note. A second panel shows the menu board, priced per kg.
- **The price is set at the scale.** Everything on the grill is sold by weight, so no ticket or reply ever shows a fixed total. The board column is `est.`, and every reply says it in the customer's language: *"estimado ~15€ — pagas ao levantar; o preço certo é ao pesar."*
- **A new frame: the kitchen ticket.** A WhatsApp order ("meio frango + arroz + esparregado, levantar às 13h") is captured as a structured ticket — order no., lines with weight and per-line estimate, pickup time, estimate — before the reply is drafted. Step 1 becomes *Capture order* for new orders and *Check the board* for everything else.
- **The dead window.** One message arrives at 15:40, when the shop is closed between services. The loop verifies the order against the board and answers at 15:41; the page captions it *"shop closed 14h30–18h · answered by the loop"*. Nobody was at the counter, and the owner was not interrupted.
- **Two gates, restaurant-shaped.** A group pickup order for 15 on Saturday escalates on the commercial gate (the owner quotes; the draft holds the date, time and a per-person guide). An undercooked-chicken complaint escalates on the safety/reputation gate: owner phoned, holding reply sent at once with the one line that matters — *"não comas a parte mal passada"* — and a make-good drafted for the owner to confirm.
- **Allergens: quoted, never inferred.** A severe-allergy question from the Uber Eats inbox is answered from the allergen note that is visible on the board, and the reply leaves a visible margin: confirm at the counter when collecting, the kitchen double-checks.

The 90-second demo runs the same way: point at the list (two NEEDS YOU marks, one NEEDS YOU NOW), tap Nuno for the ticket, tap Rui for the dead-window answer, tap Cláudia for the safety gate and confirm, open the board.

### Where it lands

Escalations land in the owner's existing WhatsApp — the caption under every `ESCALATED` badge says so: *"enviado para o WhatsApp do dono — sem apps novas."* Kitchen tickets can print on a cheap thermal printer or show on a counter tablet. This dashboard is an optional check-in view (installable as a PWA, see Roadmap), not a workspace: nobody has to live in it for the loop to run.

### Re-seeding a vertical is about an hour

This second page was built by copying the guesthouse page and changing the seed, not the engine. The layout, design tokens, channel frames, escalation-visible list and language-first reply rules carried over untouched. The work was: six messages, a six-row board, one new frame type (the ticket), one caption (the dead window), and the header. That is the claim the two pages make together: the loop is the product; the vertical is a seed file.

## Unlisted · `xxi/` (prospect mockup, real data)

`xxi/index.html` is a **direct-order mockup for a real prospect**, Churrasqueira XXI (Rua Cervantes 1A, Lisboa), built from their published hours, phone and Uber Eats portions at pickup prices. It is not linked from either demo page and carries `noindex,nofollow`; it is reached by direct URL only. The black banner at the top is non-negotiable: *DEMO · Proposta de encomenda direta preparada pela Quiet Loops para a Churrasqueira XXI — não é o site oficial.* Flow: menu → pickup slot inside real service hours (the 14h30–18h dead window offers *"encomenda agora, levanta às 18h00+"*, Monday offers Tuesday) → counter pickup or a generated Glovo "Qualquer Coisa" text with a copy button → MB Way payment that is visibly simulated → confirmation with order no. and kitchen-ticket preview. No logo files, no backend, no storage, no real payment, no staff names. For pitching at any hour, `?agora=15:10` fixes the clock and `?dia=1` (0–6, Sunday first) fixes the weekday.

## Running it

Each demo is one file. Open `index.html` (guesthouse) or `brasa/index.html` (churrasqueira) in a browser, or serve the folder:

```
python3 -m http.server 8000
```

No build, no backend, no API calls, no storage. Fonts load from Google Fonts; everything else is inline.

Smoke test (Playwright + Chromium, 390 and 1180 wide, all three pages, screenshots in `tests/shots/`):

```
node tests/smoke.mjs
```

## Roadmap

- The owner view can ship as an installable app (PWA) — future.

## Fences

- All names, bookings, orders and messages are fictional. Brasa do Bairro is not a real restaurant and does not reference one.
- Prices on the menu board are per kg; every estimate in the demo is illustrative and the final price is set at weighing.
- Timings shown ("drafted in 1.2s") are staged for the demo, not measured.
- Design tokens follow the Quiet Loops v2 site so demo and site read as one brand.
