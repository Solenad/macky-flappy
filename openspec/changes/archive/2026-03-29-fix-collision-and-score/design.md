## Context

The game uses React state with `requestAnimationFrame` for the game loop. The current implementation has two main issues:

1. **Collision Timing**: The game loop runs `setBird` (with collision check) before `setPipes` (which moves pipes). This means collision is checked against OLD pipe positions, creating a 1-frame (3px at 60fps) offset.

2. **Bird Position Mismatch**: 
   - CSS uses `sm:pl-50 pl-20` → 200px on medium+ screens, 80px on small
   - Collision uses hardcoded `BIRD_X_POSITION: 80`
   - On larger screens, bird is at 200px visually but collision checks at 80px

3. **Scoring Bug**: Same position mismatch affects scoring - score never increments on larger screens.

## Goals / Non-Goals

**Goals:**
- Fix collision to detect accurately when bird visually touches pipe
- Fix score to increment when bird passes through pipe gap
- Align collision/scoring positions with visual bird position

**Non-Goals:**
- Adding sprite/image support (already done in previous change)
- Changing game physics (gravity, speed, gap size)
- Adding animations or visual effects
- Mobile-specific optimizations

## Decisions

### Decision 1: How to fix collision timing?

**Option A:** Move pipes FIRST, then check collision in same frame
- Pro: Single frame, synchronized positions
- Con: Requires restructuring the update function

**Option B:** Check collision against predicted next position
- Pro: Simple - just add PIPE_SPEED to pipe positions
- Con: Still has edge cases, more complex math

**Decision:** Option A - Restructure to move pipes first, then check collision. This ensures visual position matches collision check.

### Decision 2: How to fix bird position?

**Option A:** Remove responsive CSS (`sm:pl-50`), use single position
- Pro: Simple, matches current collision logic
- Con: Less responsive on larger screens

**Option B:** Make collision position responsive
- Pro: Works on all screen sizes
- Con: More complex, needs resize handling

**Decision:** Option A - Remove `sm:pl-50` and use `pl-20` (80px) consistently. This matches the hardcoded `BIRD_X_POSITION` and keeps collision logic simple.

### Decision 3: How to handle bird hitbox vs visual?

**Option A:** Keep hitbox smaller than visual (current)
- Pro: More forgiving gameplay
- Con: Visuals "leak" outside hitbox, looks wrong

**Option B:** Expand hitbox to match visual
- Pro: Collision matches visuals exactly
- Con: Harder gameplay

**Decision:** Option B - Expand hitbox slightly to include visual elements like beak/wing. This makes collision feel fair - what you see is what you hit.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Removing sm:pl-50 makes bird too far left on large screens | Test on various screen sizes, adjust position if needed |
| Changing collision makes game harder | This is expected - previous collision was buggy |
| Score may increment incorrectly during testing | Verify scoring triggers at correct bird position |
