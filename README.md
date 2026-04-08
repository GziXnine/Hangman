<p align="center">
	<img src="https://capsule-render.vercel.app/api?type=waving&height=220&text=Hangman%20Studio&fontAlignY=38&fontSize=50&desc=TypeScript%20Game%20with%20Bold%20UI%20Motion&descAlignY=60&color=0:050505,25:B6FF00,60:FFD52F,100:FF367F&fontColor=ffffff" alt="Hangman Studio banner" />
</p>

<p align="center">
	<img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white" alt="TypeScript Strict" />
	<img src="https://img.shields.io/badge/UI-Vanilla%20HTML%2FCSS-111111" alt="Vanilla UI" />
	<img src="https://img.shields.io/badge/Game%20State-Single%20Source%20of%20Truth-0A7E8C" alt="State" />
	<img src="https://img.shields.io/badge/Mistake%20Limit-8%20Parts-D7263D" alt="Mistake Limit" />
	<img src="https://img.shields.io/badge/Dependencies-None-2E7D32" alt="No Dependencies" />
</p>

## Hangman Studio

A modern, animated Hangman game built with TypeScript and zero framework overhead.

This project is designed to feel visual and dynamic:

- Animated ambient background glows
- Progressive gallows reveal transitions
- Bold typography and high-contrast panels
- Fast keyboard + mouse gameplay loop

## Visual Effects

The UI uses deliberate visual motion and color contrast, not a plain static layout.

- Entrance motion: hero and board rise-in animations
- Ambient layers: fixed blurred color orbs for depth
- Gallows animation: each part fades/scales into view
- Focus states: high-visibility dashed outlines for keyboard users

## Color System

Primary palette from the UI theme:

<p>
	<img src="https://img.shields.io/badge/Ink-050505-050505" alt="Ink" />
	<img src="https://img.shields.io/badge/Paper-FFFFFF-FFFFFF" alt="Paper" />
	<img src="https://img.shields.io/badge/Accent_A1-B6FF00-B6FF00" alt="Accent A1" />
	<img src="https://img.shields.io/badge/Accent_A2-FFD52F-FFD52F" alt="Accent A2" />
	<img src="https://img.shields.io/badge/Accent_A3-8C1EFF-8C1EFF" alt="Accent A3" />
	<img src="https://img.shields.io/badge/Accent_A4-FF367F-FF367F" alt="Accent A4" />
</p>

## Charts

### 1) Game Flow Chart

```mermaid
flowchart LR
	A[Start New Round] --> B[Pick Random Category]
	B --> C[Pick Random Word + Hint]
	C --> D[Render Boards + Gallows]
	D --> E{Player Guess}
	E -->|Correct| F[Reveal Matching Slots]
	E -->|Wrong| G[Misses +1 and Reveal Next Part]
	F --> H{Solved All Letters?}
	G --> I{Misses >= 8?}
	H -->|Yes| J[Win Overlay]
	H -->|No| E
	I -->|Yes| K[Loss Overlay]
	I -->|No| E
```

### 2) Word Bank Distribution

```mermaid
pie showData
	title Word Distribution by Category (80 Total)
	"Movies" : 10
	"Programming" : 10
	"Countries" : 10
	"Landmarks" : 10
	"Science" : 10
	"Sports" : 10
	"Food" : 10
	"Animals" : 10
```

### 3) Miss Progression Chart

| Misses | Visible Parts | Risk Meter |
|---|---:|---|
| 0 | 0/8 | [........] Safe |
| 1 | 1/8 | [#.......] |
| 2 | 2/8 | [##......] |
| 3 | 3/8 | [###.....] |
| 4 | 4/8 | [####....] Mid |
| 5 | 5/8 | [#####...] |
| 6 | 6/8 | [######..] |
| 7 | 7/8 | [#######.] Critical |
| 8 | 8/8 | [########] Lost |

## Feature Highlights

- Randomized rounds from an 8-category word bank
- Hints with category and metadata display
- Full keyboard input handling (A-Z)
- Clickable on-screen alphabet grid
- Round-end dialog with quick replay
- Strict TypeScript setup for safer maintenance

## Project Structure

```text
.
|- index.html
|- style.css
|- main.ts
|- tsconfig.json
|- dist/
|  |- main.min.js
|  |- main.d.ts
|  |- main.d.ts.map
|  |- main.js.map
```

## Run Locally

Open index.html directly in a browser to play.

For development, run TypeScript compile checks:

```powershell
tsc
```

Use watch mode while editing:

```powershell
tsc --watch
```

Note: index.html loads dist/main.min.js. Keep that file updated in your build workflow.

## Quick Customization

- Add words: edit WORD_BANK in main.ts
- Change difficulty: edit MAX_MISSES in main.ts
- Change visual style: edit CSS variables in style.css under :root

## Troubleshooting

- If UI is visible but not interactive, confirm dist/main.min.js exists.
- If changes do not appear, hard refresh the browser cache.
- If startup fails, verify required data attributes in index.html were not removed.

## License

Use this as a learning or portfolio project. Add a LICENSE file for public distribution.