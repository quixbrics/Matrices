# MATRIX — standalone

A block sequencer that runs entirely in the browser. Clicks, pops, beeps and
low-end, arranged as fixed loops chained per voice, with a cap on how many
sound at once and a hard re-align that pulls the odd lengths back into phase.

No install, no server. One file. Works on iPhone.

## Host it on GitHub Pages

1. Make a repo, put `index.html` at its root.
2. Settings → Pages → Source: **Deploy from a branch**, branch `main`, folder
   `/ (root)`.
3. Give it a minute, then open `https://<you>.github.io/<repo>/` on the phone.

That's the whole deployment. It's a static page — nothing to build.

## First run

Tap the opening screen once. Browsers only allow audio to start from a real
touch, so that tap is what unlocks the audio engine. After that, **Run** (or the
space bar on a keyboard) starts the sequencer.

**Use headphones.** The SUB and GROWL voices run below 40 Hz, which a phone
speaker cannot reproduce at all — on the built-in speaker they will be
inaudible while still using up the headroom. On headphones or a monitor they're
the whole bottom end.

## What it is

Two tiers per voice. A **pool** of up to eight fixed blocks (A–H), each a loop
of 1–64 steps. A **chain** of slots that plays those blocks in order, each slot
with a repeat count and an on/off toggle. Blocks repeat across slots, which is
where structure comes from; they never change unless you regenerate them.

The top panel is the arrangement — ten voices, blocks drawn at true width in
bars. Solid is the editable first pass, dimmed is the repeat, hollow is a slot
switched off, magenta is sounding now, a magenta right-edge means the re-align
cuts that block short. Tap a block to toggle it.

Below: the block editor (tap or drag across the grid to place hits), a
per-voice **Generate** tab (algorithm, density, allowed lengths, pool and chain
size — trigs only by default, everything else opt-in), a **Chain** editor, and
a per-step inspector.

**Cap** limits simultaneous voices; the mode next to it decides who wins when
more want in than the cap allows. **Re-align** resets every chain to its start
every N bars, and the `∞` button on a voice exempts it so it runs long against
the others.

Full behaviour is in the SuperCollider build's README; the model is identical.

## Differences from the SuperCollider build

- **Synthesis is Web Audio**, not SynthDefs. The voices are close but not
  sample-identical — the FM growl and the rung-filter click are approximations
  of the SC originals.
- **No microtiming.** The per-step micro offsets are gone here; the browser
  scheduler is a lookahead design and negative offsets aren't worth the added
  latency on a phone. Everything else — conditional trigs, retrigs, p-locks,
  probability — is intact.
- **Drag-to-paint on the arrangement** isn't supported on touch; tap to toggle
  blocks. Dragging across the step grid does work on touch.

## Known limits

- **iOS mute switch:** the page promotes itself to media playback so the
  physical silent switch shouldn't kill the audio, but iOS versions vary. If
  it's silent, check the switch and the volume.
- **The screen may sleep** mid-performance. iOS has no reliable web API to
  prevent this; for a fixed installation, disable auto-lock in Settings.
- **State is saved to the browser** (localStorage), per device. There's no
  export yet. Clearing site data wipes your patterns.
- **Heavy retrigs on long voices** stack synths; a limiter catches the level
  but the CPU on an older phone may not keep up. Back off retrig counts on SUB
  and SWELL if it stutters.

## Editing the sound

The voice builders are in `buildVoice()` inside `index.html`, one `case` per
engine. They're plain Web Audio graphs — oscillators, filters, a shared tanh
waveshaper for drive. Change one and reload.
