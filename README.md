# MATRICES

A pattern launcher with a generative visualiser, running entirely in the browser. Works on a phone, no dependencies — the whole instrument is one `index.html` file.

Eight voices, five patterns each. Tap a block to loop it. Patterns run at independent lengths and never re-align, so what you get is polyrhythm and drift rather than a grid.

## Packs

The transport, scheduler, scenes, gestures and FX are one machine. What it *sounds and looks like* is a pack, chosen on the opening screen.

**LATTICE** — clicks, sine tones and sub-bass, tuned to the ISO third-octave test-tone series. Monochrome geometry, hard contrast, fracture and disintegration.

**SFERIC** — shortwave. Static, crackle and interference under carriers that drift off station, heterodyne beating, keyed morse, and formant shapes that sound like speech without being any, over a deep sub floor. A band is never silent: the bed forms run almost every step, and signals sit on top of them rather than in gaps. Tuned to an irregular dial series, deliberately not a scale. The visuals are a receiver — a scrolling spectral waterfall, a tuning dial with signals sitting on it, phosphor traces, a sweeping scan line. Green on near-black.

**CANTUS** — sustained tones placed by scale degree: organ, reed, bowed noise, choir, bell, pedal. Each voice is rolled a diatonic interval from the one before it, so a rig reads as a chord voicing rather than eight unrelated pitches — mostly fourths and fifths, with seconds and sevenths for colour. Root and scale are selectable on the patterns screen, and everything re-rolls into the new key. Decays run 8–40 seconds against short cycles, so entries always arrive over the tail of the last and the texture never empties. The reverb runs a 22-second far tail. The visuals are fluid rather than constructed: MURMUR is a flock that tightens and bursts with the audio, NIMBUS a noise cloud billowing from the inside, HAZE overlapping soft masses, CURRENT particles following a slow curl, WAVE two wavefields at slightly different wavelengths beating against each other the way the tones do, BLOOM the accretive model drawn as soft blooms on curved edges. Nothing has a hard edge — even the ratchet fracture becomes a soft swell rather than a shear.

**STRATA** — resonant models, granulated. Eight physical models (struck, plucked, bowed, tube, glass, wood, metal, deep) are each rendered into a buffer once; playback loops a window of it, always a whole number of periods, so the pitch never changes — only the character does. **TONE moves that window continuously from spectral freeze through granular texture to rhythmic stutter**, because at a few milliseconds the loop reads the same instant over and over, and at half a second you hear the model's own decay repeat. The three envelope shapes chop at the same rate, so the rhythm comes from the number that sets the freeze. Placed by scale degree like CANTUS, and pitched an octave lower than these models want to sit — they get harsh in the top two octaves however carefully they're voiced. Visuals are depositional — a core sample building downward, faulted beds, settling grains, a held smear — in rust through plum to slate.

Each pack keeps its own patterns, sounds, scenes and visualiser settings, so switching doesn't disturb the others. Add `?pack=lattice`, `?pack=sferic`, `?pack=cantus` or `?pack=strata` to the URL to open one directly.

---

## Getting sound

Open the page and tap once. It starts playing immediately, in the visualiser, generating and moving through scenes on its own.

On iPhone, check the ring/silent switch is off — iOS mutes browser audio otherwise. Headphones or a decent speaker are worth it; two of the eight voices sit below what a phone speaker can reproduce.

---

## Patterns

Each row is a voice, each block a pattern. Colour runs from cyan at the top of the spectrum to deep magenta at the bottom, so a row's colour tells you roughly where it sits.

| | |
|---|---|
| **Tap a block** | Loops it. Tap again to stop. |
| **Long-press a block** | Pins it against rerolls. |
| **Square at the row's right edge** | Selects the track — for the dice, and for the voice editor. |

Launches land on the next beat, so you can commit early and it will arrive in time. A playing block fills with its own loop phase, so eight blocks sweeping at eight different rates is the polyrhythm made visible.

Selections made while stopped survive pressing RUN — set up a combination, then start it all at once.

**Long-press a block** to pin it. Pinned blocks survive rerolls, dice rolls and reloads.

**The square at a row's right edge selects that track.** A selected track is the one the dice touches and the one the voice editor shows. Select nothing and the dice takes everything — so selecting one track effectively solos it for randomisation.

### Bottom bar

**⚄** rolls the dice over the selected tracks. **P** rerolls patterns, **V** rerolls sounds, **ALL** does both. Pinned blocks are never touched.

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

## FX

On the patterns screen, below the grid. Nine pads. **Hold to apply, drag up for depth, release to drop.**

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

**PAD X** and **PAD Y** choose which two effects the visualiser's FX gesture drives. Crush and Gate by default.

On tonal packs, **ROOT** and **SCALE** sit above the FX section. Changing either re-tunes every voice into the new key on the next roll.

SPACE crossfades as you push it: the bottom of the control is a near room, the top a long tail.

REPEAT, TAPE, PITCH and REVERSE share one buffer, so holding several stacks them: release the top and it falls back to the one underneath. If your browser can't load the audio worklet these four grey themselves out; the rest still work.

---

## VIS

The main surface, and where the instrument opens. A generative visualiser driven by what's actually playing — not a readout, the audio is the force acting on the form. Transport sits along the top.

### Gesture modes

Three toggles — **FX**, **P**, **V** — any combination at once.

**FX** turns the whole canvas into an XY pad for the two effects assigned on the patterns screen. X is one, Y is the other. They drop when you lift.

**P** shapes the material: X is density — thinning what's playing below centre, filling gaps and lengthening ratchets above it — and Y is a ceiling on how many voices you hear. Both persist after you let go, and the generator keeps working underneath. A tap moves the performance on to the next scene.

**V** steers the geometry, as below.

With all three on, one drag rides two effects, reshapes the patterns and moves the form at once. They end differently on purpose: FX drop, pattern character persists, geometry relaxes.

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

Every touch draws itself in registration marks: the path your finger takes is traced as a ribbon that lags, swings wide on a fast turn and keeps drifting after you let go, plus a square opening from the contact point with crosshair ticks, a measured line while you drag, a coloured node marker where each vertex lands, and an expanding double square naming whatever a tap fired. Global actions also flash brackets at the four corners. These are drawn on top and are unaffected by TRAIL, so contact is legible however dense the frame gets.

**Which gesture does what is reassigned every time the geometry reshuffles.** Drag axes swap, directions invert, the tap action changes. It isn't meant to be learnable — it's meant to keep surprising you. The on-screen labels tell you what just happened.

Touches also trigger haptics on devices that support the Vibration API — Android Chrome and similar. Safari has never implemented it, so there's no vibration on iPhone or iPad.

**Double-tap** toggles full screen for projecting.

---

## Notes

Pinned patterns, voice settings, scenes and visualiser preferences are stored in the browser on the device you're using. Nothing is uploaded anywhere. Clearing site data clears them; the VOICE page has a wipe button for the same job.

Runs in any current browser with Web Audio. The four buffer-based effects need AudioWorklet support (Safari 14.5+, Chrome 66+, Firefox 76+) and degrade gracefully without it.

Everything is scheduled ahead with a lookahead clock, so it stays in time under load. If frames start slipping the visualiser thins itself automatically — particle counts first, then TRAIL and DISSOLVE — and recovers when there's headroom again.

