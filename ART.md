# Art direction

Follow this on every screen. `art/reference/family-chat.html` shows the look on
a real screen: open it and match it. `art/cast.html` shows every character with
every face.

## Look

"Warm and cozy". A friendly family chat on a sunny morning: soft, rounded, flat
colors, no outlines. Gentle, never mocking.

## Colors

Use these names in the CSS.

| Name | Hex | Used for |
| --- | --- | --- |
| cream | #FBF3E6 | app background |
| sand | #F3E3C8 | header, bottom panel, day chips |
| white | #FFFFFF | message bubbles and cards |
| ink | #3B2A20 | main text and icons |
| cocoa | #6B5444 | secondary text |
| muted | #7A5E48 | small text (times, site names) |
| rust | #B4472A | group icon, strong accents |
| brick | #9A4A28 | sender names, text on blush |
| terracotta | #E07A55 | ring around the post being judged, Stop button |
| blush | #FBE3D6 | "Forwarded 12 times" chip |
| sage | #3F6B47 | Share button (white text) |
| marigold | #F6D27A | Needs context button; #F2B33D for illustration accents |

## Type

Fredoka 600 for the group name, panel titles and link-preview headlines;
Nunito 400/700/800 for everything else.

| Text | Size |
| --- | --- |
| Group name | 18px |
| Panel title | 17px |
| Headline | 16px |
| Message | 15.5px, line height 1.4 |
| Sender names | 13px, extra bold |
| Small text | 12px |

## Shapes

- Bubbles have 18px corners, except the corner next to the sender's avatar (6px).
- Cards 12px; the bottom panel 22px on its top corners; buttons 16px; chips
  fully round.
- No borders: bubbles get a 1px #EAD9BF shadow under them.
- The post being judged gets a 2.5px terracotta ring.

## Verdict buttons

Share, Stop and Needs context sit in a row of three at the bottom, 64px tall,
icon above the word.

- Share = sage with white text
- Stop = terracotta with ink text
- Needs context = marigold with ink text

They differ in lightness as well as color, and always show an icon and a word.

## Icons

Simple line icons, 2.2px stroke, round ends, drawn as inline SVG. No emoji as
icons.

## Characters

Head-and-shoulders portraits drawn as inline SVG on a 64x64 grid, inside a round
frame with a pastel background. Flat fills, no outlines, rosy cheeks (#E07A63 at
45% opacity). Shoulders run from y=45 to the bottom, the neck is a 10x10 rounded
box at (27,36), the head is an ellipse centered near (32,28), and the eyes sit at
x=27 and x=37. Grandpa Jorge, Cousin Nina and Aunt Rosa are copied exactly from
the reference file.

- **Grandpa Jorge:** bald, white side hair and mustache, round glasses, brown
  cardigan #A86B3C over a cream shirt; marigold background #F6D78B.
- **Cousin Nina (16):** dark hair with a top bun and bangs, terracotta hoodie
  #D9653B with strings, a gold hoop earring; peach background #F4B6A6.
- **Aunt Rosa:** big berry-colored curls #8E3B46, rust round glasses, teal blouse
  #3F7F86, a gold bead necklace; sage background #B9D3B0.
- **Mom:** new, in the same style: shoulder-length wavy brown hair #5A3A2A with a
  side part, small pearl earrings, a mustard top #D9A13B, skin #CF9670; soft blue
  background #CFE0EA.

Every character has four faces. Only the eyes, brows and mouth change (plus arms
for pouting):

| Face | Reaction | Look |
| --- | --- | --- |
| neutral | ignores | dot eyes, soft brows, small closed smile |
| relieved | accepts | closed happy eyes, raised brows, open smile, stronger cheeks |
| stung | accepts, but stung | half-closed eyes looking aside, one brow raised, flat mouth |
| pouting | digs in | brows angled down, small frown, puffed cheeks, arms crossed over the chest |

Each character is one reusable SVG with a face setting (`characters.js`), so a
reaction just switches the face.

## Illustrations

Link-preview photos and morning-after scenes use the same flat shapes and
colors, no outlines, no real photos.

## Accessibility

Text contrast at least 4.5:1 (these colors pass), never color alone for right
or wrong, tap targets at least 44px.

## Decisions (Oct 15, 2026)

- The fonts are kept in the folder (`fonts/`), not loaded from Google, so the
  game works offline and nobody is tracked.
- Every sender name is brick, as above (the reference shows Aunt Rosa's in sage;
  brick wins).
- The language is chosen once, on a welcome screen (title, the Family faces,
  two big language buttons at the bottom). The settings button at the right of
  the chat header holds "Start over".
- No back arrow in the chat header until there is a chat list to go back to.
