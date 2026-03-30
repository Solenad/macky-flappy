# BUGS.md - Bug Documentation

This file documents bugs that have been fixed in the project, serving as a reference to avoid similar issues in future development.

---

## Bug #1: Pipes Not Rendering - Game Loop State Issue

### Summary
Pipes were spawning (console logs confirmed spawn events) but were never visible on screen.

### Date Fixed
March 29, 2026

### Symptoms
- Console showed "Pipe spawned at x: 100" messages
- Static test pipes rendered correctly
- Game pipes never appeared

### Root Cause
The game loop in `useGameLoop.ts` had two related issues:

1. **Hardcoded canvas dimensions**: `CANVAS_WIDTH` was set to 100px in constants.ts, but the game container was full-screen (~1500px+). Pipes spawned at x=100 and were filtered out after ~53 frames (~0.9 seconds).

2. **Stale closure in requestAnimationFrame**: When `canvasWidth` and `canvasHeight` were passed as useCallback dependencies, any change to these values (e.g., from window resize) caused React to recreate the callback function. This restarted the game loop. Because `setPipes(prevPipes => ...)` uses functional updates, the new callback ran before React had updated the state - so `prevPipes` was always empty.

### Files Affected
- `src/lib/constants.ts` - CANVAS_WIDTH = 100
- `src/hooks/useGameLoop.ts` - Dependencies and state handling
- `src/app/page.tsx` - Missing canvasWidth parameter
- `src/components/Pipe.tsx` - z-index conflict with ground

### Fix Applied
1. Added `canvasWidth` state and passed it to `useGameLoop`
2. Used refs (`canvasWidthRef`, `canvasHeightRef`) for dimension values inside the game loop
3. Synced refs with useEffect when dimensions changed
4. Used refs instead of functional state updates for pipe management
5. Fixed z-index: changed pipes from z-15 to z-25 (above ground's z-20)

### Key Lesson
In game loops using `requestAnimationFrame`, the animation frame cycle and React's render cycle are not synchronized. Always use refs for values that change frequently to avoid stale closures.

### Related Issues Fixed Simultaneously
- **z-index conflict**: Ground had z-20, pipes had z-15. Bottom pipes rendered behind ground.
- **Hardcoded values**: Pipe component used hardcoded width=100 instead of GAME_CONFIG.PIPE_WIDTH.

---

## Bug #2: Background City Image Cuts Off

### Summary
The background city image would cut off after scrolling once, leaving empty blue space.

### Date Fixed
March 30, 2026

### Symptoms
- Background scrolled for one cycle then stopped showing
- Empty blue space appeared where background should continue

### Root Cause
CSS animation (`translateX(-50%)`) with `width: 200%` stretched a single image. The animation just revealed more of the stretched image, then reset abruptly causing visible seams.

### Files Affected
- `src/components/Background.tsx` - Complete rewrite with JS-driven scrolling
- `src/lib/constants.ts` - BACKGROUND_SCROLL_SPEED
- `src/app/globals.css` - CSS animation removed

### Fix Applied
Replaced CSS animation with JavaScript-driven approach:
1. Uses `requestAnimationFrame` directly in component (runs at 60fps+)
2. Tracks position with `useRef` (no React re-renders for smooth updates)
3. Renders 3 images in an array
4. Each image positioned at `index * width + positionRef.current`
5. When first image scrolls off-screen (`position <= -width`), array cycles seamlessly

### Key Lesson
CSS animations run on a separate thread from JavaScript game loops, causing frame drops. For synchronized scrolling, use JS-driven position tracking.

## Contributing to This File

When fixing a bug:
1. Document the issue here with symptoms, root cause, and fix
2. Add a summary to AGENTS.md "Lessons Learned" section
3. Include code examples of both broken and fixed versions
