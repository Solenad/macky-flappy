## Context

The Flappy Macky game has pipes that spawn but are not visible on screen. Debug testing confirmed:
- Static pipes render correctly when hardcoded in JSX
- Console logs show pipes are spawning at x=100 with varying topHeight values
- The game container is full-screen (100vw x 100vh)

**Root causes identified:**
1. **CANVAS_WIDTH = 100** - Pipes spawn at x=100, which is only 100px from left edge. On a typical 1920px screen, pipes appear for ~53 frames (0.9 seconds at PIPE_SPEED=3) before being filtered out as "off-screen".

2. **z-index conflict** - Ground element has `z-20` (Tailwind = zIndex: 20), pipes have zIndex: 15. Bottom pipes render BEHIND the ground, making them invisible.

3. **Hardcoded values** - Pipe.tsx uses hardcoded width=100 and gap=160 instead of GAME_CONFIG values (PIPE_WIDTH=60, PIPE_GAP=160).

## Goals / Non-Goals

**Goals:**
- Fix pipes so they are visible and render correctly
- Pass actual canvas width to game loop for proper pipe spawning
- Fix z-index layering so pipes appear above ground

**Non-Goals:**
- No new game features or mechanics
- No changes to game physics or collision detection
- No spec modifications - this is pure bug fix

## Decisions

### Decision 1: How to get actual canvas width to useGameLoop?

**Option A (better option as set by user):** Add canvasWidth parameter to useGameLoop (parallel to canvasHeight)
- Pro: Simple, follows existing pattern
- Con: Requires updating page.tsx to pass width

**Option B:** Use window.innerWidth directly in useGameLoop
- Pro: No prop drilling needed
- Con: Not testable, couples to browser API

**Decision:** Option A - Add canvasWidth parameter. This follows the existing pattern used for canvasHeight and keeps the code testable.

### Decision 2: What z-index value for pipes?

**Option A:** Set pipes to z-25 (above ground's z-20)
- Pro: Simple fix, guarantees visibility
- Con: Slightly above ground visually

**Option B:** Set ground to z-10, pipes at z-15
- Pro: More semantic layering
- Con: Requires changing ground, may affect other elements

**Decision:** Option A - Set pipes to z-25. Minimal change, guaranteed to work.

### Decision 3: Should CANVAS_WIDTH constant be removed?

**Option A:** Keep constant but set to actual window width on init
- Pro: Keeps configuration centralized
- Con: Still requires runtime update

**Option B:** Remove CANVAS_WIDTH from constants entirely
- Pro: No stale constants
- Con: Need to pass width everywhere

**Decision:** Option A - Update CANVAS_WIDTH to window.innerWidth in page.tsx after mount, or pass as parameter.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Resize during gameplay | Currently canvasHeight already handles resize; canvasWidth should follow same pattern |
| Performance from frequent width reads | Width is read once on mount; pipes spawn based on stored value |
| Other z-index elements affected | Only pipes and ground involved; this fix is localized |

## Open Questions

- None - the fix is straightforward and localized to 3 files
