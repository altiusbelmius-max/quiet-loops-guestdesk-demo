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

What changes when the business changes:

- **The ledger becomes today's order board** — order no., items with kg amounts, pickup time, estimated price, status. Two notes are pinned above it: the allergen note and the dead-window note. A second panel shows the menu board, priced per kg.
- **The price is set at the scale.** Everything on the grill is sold by weight, so no ticket or reply ever shows a fixed total. The board column is `est.`, and every reply says it in the customer's language: *"estimado ~15€ — pagas ao levantar; o preço certo é ao pesar."*
- **A new frame: the kitchen ticket.** A WhatsApp order ("meio frango + arroz + esparregado, levantar às 13h") is captured as a structured ticket — order no., lines with weight and per-line estimate, pickup time, estimate — before the reply is drafted. Step 1 becomes *Capture order* for new orders and *Check the board* for everything else.
- **The dead window.** One message arrives at 15:40, when the shop is closed between services. The loop verifies the order against the board and answers at 15:41; the page captions it *"shop closed 14h30–18h · answered by the loop"*. Nobody was at the counter, and the owner was not interrupted.
- **Two gates, restaurant-shaped.** A group order for 15 on Saturday escalates on the commercial gate (the owner quotes; the draft holds the date, time and a per-person guide). An undercooked-chicken complaint escalates on the safety/reputation gate: owner phoned, holding reply sent at once with the one line that matters — *"não comas a parte mal passada"* — and a make-good drafted for the owner to confirm.
- **Allergens: quoted, never inferred.** A severe-allergy question from the Uber Eats inbox is answered from the allergen note that is visible on the board, and the reply leaves a visible margin: confirm at the counter when collecting, the kitchen double-checks.

The 90-second demo runs the same way: point at the list (two NEEDS YOU marks, one NEEDS YOU NOW), tap Nuno for the ticket, tap Rui for the dead-window answer, tap Cláudia for the safety gate and confirm, open the board.

### Re-seeding a vertical is about an hour

This second page was built by copying the guesthouse page and changing the seed, not the engine. The layout, design tokens, channel frames, escalation-visible list and language-first reply rules carried over untouched. The work was: six messages, a six-row board, one new frame type (the ticket), one caption (the dead window), and the header. That is the claim the two pages make together: the loop is the product; the vertical is a seed file.

## Running it

Each demo is one file. Open `index.html` (guesthouse) or `brasa/index.html` (churrasqueira) in a browser, or serve the folder:

```
python3 -m http.server 8000
```

No build, no backend, no API calls, no storage. Fonts load from Google Fonts; everything else is inline.

## Roadmap

- The owner view can ship as an installable app (PWA) — future.

## Fences

- All names, bookings, orders and messages are fictional. Brasa do Bairro is not a real restaurant and does not reference one.
- Prices on the menu board are per kg; every estimate in the demo is illustrative and the final price is set at weighing.
- Timings shown ("drafted in 1.2s") are staged for the demo, not measured.
- Design tokens follow the Quiet Loops v2 site so demo and site read as one brand.
