# LATTICE

A pattern launcher for clicks, tones and sub-bass, with a generative visualiser. It runs entirely in the browser, works on a phone, and has no dependencies — the whole instrument is one `index.html` file.

Eight voices, five patterns each. Tap a block to loop it. Patterns run at independent lengths and never re-align, so what you get is polyrhythm and drift rather than a grid.

---

## Getting sound

Open the page and tap once to start the audio, then press **RUN**.

On iPhone, check the ring/silent switch is off — iOS mutes browser audio otherwise. Headphones or a decent speaker are worth it; two of the eight voices sit below what a phone speaker can reproduce.

---

## The grid

Each row is a voice, each block a pattern. Colour runs from cyan at the top of the spectrum to deep magenta at the bottom, so a row's colour tells you roughly where it sits.

| | |
|---|---|
| **Tap a block** | Loops it. Tap again to stop. |
| **Long-press a block** | Solos it — every other voice stops on the same beat. |
| **Square at the row's right edge** | Arms that row for the dice. Filled means included. |

Launches land on the next beat, so you can commit early and it will arrive in time. A playing block fills with its own loop phase, so eight blocks sweeping at eight different rates is the polyrhythm made visible.

Selections made while stopped survive pressing RUN — set up a combination, then start it all at once.

### Bottom bar

**1SHOT** arms the next launch to play a single cycle, then disarms itself.

**PIN** arms the next tap to pin a block. Pinned blocks survive rerolls, dice rolls and reloads. The count shows how many you have.

**CLEAR** stops every voice. (Distinct from the transport's STOP, which halts the clock but keeps your selection.)

**⚄** rolls the dice over every armed row. **P** rerolls patterns, **V** rerolls sounds, **ALL** does both. Pinned blocks are never touched.

Rolls aren't arbitrary. Frequencies snap to the ISO third-octave series — the values real test tones use — and each row is confined to its own band, so the spectrum stays balanced however hard you roll. Pattern generation follows the rolled decay: a voice rolled to 2 ms gets dense material, one rolled to two seconds gets single hits and long gaps.

---

## VOICE

Sound design per voice. Pick one of eight engines — CLICK, POP, BEEP, NOISE, TONE, SUB, GROWL, SWELL — then an envelope shape:

- **PERC** — decays from the hit
- **GATE** — flat, then a hard cut
- **REVERSE** — swells into the hit

Sliders for frequency, decay, tone, drive, level, pan and stereo. **STEREO** alternates successive hits across the field, retriggers included, which is where most of the sense of movement comes from.

Changes take effect on the next hit while it's running. **TEST** auditions the current voice. Per-voice and global resets are at the bottom, along with a full wipe of saved data.

---

## SCENES

A scene captures everything: all eight sounds, all forty patterns, and what was playing. Tap a tile to recall it — one tap swaps the entire performance, landing on the next beat.

Tiles show a fingerprint of what they contain: one line per playing voice, drawn from that voice's actual triggers, in its register colour. A dense high scene looks like bright hatching; a sub-and-growl scene is a couple of sparse marks.

Scenes adopt the current tempo rather than restoring one, so you can chain material recorded at different speeds.

**Long-press a tile** to rename it, set its follow action, or delete it.

### Chaining

**CHAIN** arms follow actions. Each scene can play for ⅛, ¼, ½, 1, 2, 4, 8, 16 or 32 bars — or **RND**, which picks a new length every time the scene comes up — then STAY, jump to the NEXT scene, a RANDom one, or a specific one.

Chained transitions land on the interval's own grid, so a ⅛-bar chain snaps to ⅛ bars rather than waiting for a downbeat. The live tile shows bars remaining and a progress line.

Recall overwrites the current patterns and sounds. Save before you recall.

### Full auto

**FULL AUTO** runs the instrument by itself. It moves on an interval that changes every time, and mostly *invents* the next scene rather than recalling one — a random number of voices, fresh sounds on some of them, fresh patterns on others. Roughly a third of the time it drops one of your saved scenes in instead. Pinned blocks are still protected.

It's the fastest way to find material worth keeping: let it run, and hit SAVE when something lands.

### FX

Nine pads at the bottom of the page. **Hold to apply, drag up for depth, release to drop.**

| | |
|---|---|
| **FILTER** | Resonant lowpass sweep |
| **DELAY** | Tempo-synced dotted eighth |
| **SPACE** | Convolution reverb |
| **GATE** | Chops at 8ths, 16ths or 32nds depending on depth |
| **CRUSH** | Down to 2-bit at full |
| **REPEAT** | Captures a fraction of a beat and loops it |
| **TAPE** | Reads the buffer back at a falling rate |
| **PITCH** | ±1 octave |
| **REVERSE** | Plays the recent past backwards |

**LOCK** makes the pads latch — tap on, tap off. Unlocking drops everything held. **PANIC** kills the FX and stops every voice.

REPEAT, TAPE, PITCH and REVERSE share one buffer, so holding several stacks them: release the top and it falls back to the one underneath. If your browser can't load the audio worklet these four grey themselves out; the rest still work.

---

## VIS

A generative visualiser driven by what's actually playing. Not a readout — the audio is the force acting on the form.

Eight forms, or AUTO to let it choose: **SQUARES** (eight different layouts, from concentric through scattered to split), **QUADS**, **BARS** (five modes from hairlines to full-bleed slabs), **WIRE**, **BUILD**, **DIAMOND**, **SEGMENTS** (polygons drawn only in fragments, so the eye completes them).

**BUILD** is the one that develops. Every hit places a vertex and joins it to its neighbours — the voice's row sets its height, its amplitude sets its distance from centre — and edges draw themselves visibly from one vertex toward the other. Six different joining strategies, from nearest-neighbour to mirrored to lattice. A scene change clears it and it starts assembling again.

How the audio drives it:

- The three low rows push zoom and flip the contrast
- The mid rows kick rotation
- **Ratchets fracture the frame** — it shears apart along clean planes as repeats accumulate, and reassembles the moment they stop
- The noise row seeds diffuse clouds
- Scene changes reshuffle the geometry and throw a sweep, often a crash zoom, sometimes a disintegration

Nine parameters: SCALE, ROTATE, ZOOM, FRACTURE, DISSOLVE, TEXTURE, CONTRAST, TRAIL, COLOUR. Colour is rationed by default — everything is white on black with hue used as accents. Turn COLOUR to zero for pure monochrome, or INVERT for black on white.

### Touch

The canvas is playable. A touch drops a vertex into the model wherever your finger lands, and dragging leaves a trail of them, so you can draw structure into the geometry by hand.

Dragging also moves the frame — orbit, zoom, spin or scale — and a flick throws a rotational sweep proportional to how fast you let go. Two fingers start it disintegrating. A quick tap does something on its own: another node, a noise cloud, a crash zoom, a fracture, a sweep, or a reshuffle.

Every touch draws itself in registration marks: a square opening from the contact point with crosshair ticks, a measured line while you drag, a coloured node marker where each vertex lands, and an expanding double square naming whatever a tap fired. Global actions also flash brackets at the four corners. These are drawn on top and are unaffected by TRAIL, so contact is legible however dense the frame gets.

**Which gesture does what is reassigned every time the geometry reshuffles.** Drag axes swap, directions invert, the tap action changes. It isn't meant to be learnable — it's meant to keep surprising you. The on-screen labels tell you what just happened.

Touches also trigger haptics on devices that support the Vibration API — Android Chrome and similar. Safari has never implemented it, so there's no vibration on iPhone or iPad.

**Double-tap** toggles full screen for projecting.

---

## Notes

Pinned patterns, voice settings, scenes and visualiser preferences are stored in the browser on the device you're using. Nothing is uploaded anywhere. Clearing site data clears them; the VOICE page has a wipe button for the same job.

Runs in any current browser with Web Audio. The four buffer-based effects need AudioWorklet support (Safari 14.5+, Chrome 66+, Firefox 76+) and degrade gracefully without it.

Everything is scheduled ahead with a lookahead clock, so it stays in time under load. If the visualiser is open and things start to feel loose, DISSOLVE and TEXTURE are the expensive parameters.
