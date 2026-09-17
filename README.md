# Quiet Loops · Guest-desk demo

A front-desk inbox for **Casa Miradouro**, a fictional six-room guesthouse in Alfama, Lisbon. Tap a guest message and watch the loop do its work: verify the booking against the ledger, draft a reply in Portuguese and English, and decide whether it can answer on its own or must hand the message to the owner.

The promise it demonstrates: **answered in seconds, escalated when it matters, watched by machines, confirmed by a human.**

Live: enable GitHub Pages on this repo (Settings → Pages → Source: branch `main`, root) and the demo serves at `https://<owner>.github.io/quiet-loops-guestdesk-demo/`.

## What it shows

- **Verify** — every message is matched to a booking before anything is written. The ledger the loop checks is visible on the page.
- **Draft** — a reply in the guest's own language (PT or EN, inferred from their message), with the other language behind a toggle. Written from the house guide and the booking record.
- **Own channel** — the draft renders in the frame of the channel it came from: an email layout for email, a chat bubble for WhatsApp and Channel Talk, a reservation thread for the booking inbox. This page is the owner's view; the loop answers where the guest wrote.
- **Decide** — a badge: `AUTO-ANSWERED` for routine requests, `ESCALATED TO OWNER` when a human must decide.
- **The human gate** — escalations sit in a "waiting for owner confirmation" state until the owner taps confirm. The demo has two:
  - a **water leak** (safety): the owner is phoned, the guest gets a holding reply immediately.
  - a **booking-date change** (commercial): availability is pre-checked, the reply is drafted and held until the owner confirms.

## The 90-second demo

1. Open the page on a phone. Read the promise strip out loud.
2. Tap **Daniel Kessler** (wifi). Watch verify → draft → `AUTO-ANSWERED`. The reply is an email, in English, because that is how Daniel wrote. Toggle to PT. *"Routine, verified, answered, in the guest's language and channel."*
3. Tap back, then **Tom Hale** (water leak). It escalates. Point at the pulsing gate. Tap **Owner confirms**. The follow-up reply appears. *"When it matters, a human decides. The guest is never left waiting."*
4. Tap back, then **Marta Lopes** (date change). It escalates too, with availability already checked. *"The owner decides in one tap, with the work already done."*
5. Open the **Bookings ledger** at the bottom. *"Nothing is invented. It only answers from what it can verify."*
6. Point at the inbox: status pills now show what was answered, what was escalated, what was confirmed. **Reset demo** clears it.

## Running it

It is one file. Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

No build, no backend, no API calls, no storage. Fonts load from Google Fonts; everything else is inline.

## Roadmap

- The owner view can ship as an installable app (PWA) — future.

## Fences

- All names, bookings and messages are fictional.
- Timings shown ("drafted in 1.2s") are staged for the demo, not measured.
- Design tokens follow the Quiet Loops v2 site so demo and site read as one brand.
