# Teleprompter App — Project Context

## Project Overview
- **Name**: Professional Solo Creator Teleprompter
- **Stack**: Vanilla HTML/CSS/JS — single `index.html` file, no build step
- **Deploy**: Vercel via GitHub repo `rachidchfira/telepromptervercel`
- **Live at**: Vercel deployment (auto-deploys on push to `main`)

## Architecture
- Everything lives in `index.html` — styles, markup, and JS in one file
- No frameworks, no npm, no bundler — keep it that way
- Vercel serves it as a static site (`vercel.json` routes all to `index.html`)

## Key Features & How They Work
- **Teleprompter**: single `<textarea id="scriptInput">` — edit and read from the same element, scrolled via `setInterval`
- **Voice control**: Web `SpeechRecognition` API — scrolls when words detected, pauses 100ms after last word
- **Camera preview**: `getUserMedia` fixed to top-right, 200×150px
- **Speed modal**: 6 preset speeds (0.5x–6x), default 2x
- **Go Live**: opens platform native pages in new window (no API/SDK needed)
- **Recording**: `MediaRecorder` API, saves `.webm`
- **Templates**: 4 presets stored in JS object, loaded into textarea

## Rules — Always Follow
- Keep everything in `index.html` — do NOT split into separate files unless explicitly asked
- After every change: `git add index.html && git commit && git push origin main`
- No Facebook SDK — it was removed because the FB app was in dev mode ("App not active" error)
- The "Go Live" flow simply opens `facebook.com/live/create` in a new window — no login needed
- Buttons must stay small (`.75rem`, `flex-wrap`) so camera preview doesn't overlap them
- Teleprompter box uses `height: 60vh` (fixed, not min-height) so scrolling works

## What NOT to Do
- Do not add a build system or package.json dependencies
- Do not re-add the Facebook SDK or pages API
- Do not change `min-height` back — scroll requires fixed `height`
- Do not separate the script input and display into two elements again

## Git Workflow
- Branch: `main`
- Always push after every change — Vercel auto-deploys
- Commit message format: short description of what changed and why
