## Context

The game currently uses `window.innerWidth` for pipe spawning coordinates, which causes issues because:
1. The game container is not the full window width
2. Dynamic coordinates cause pipes to spawn off-screen
3. CSS positioning doesn't match the coordinate system being used

## Goals / Non-Goals

**Goals:**
- Use fixed coordinates for pipe spawning and movement
- Make pipes spawn at a predictable position within the game container
- Ensure pipes move from right to left smoothly

**Non-Goals:**
- Changing pipe visual design
- Modifying game difficulty

## Decisions

### Fixed Spawn Position
**Decision:** Use a fixed X position (e.g., 800px) for pipe spawning.
**Rationale:** Eliminates dependency on dynamic window dimensions.
**Alternative:** Using percentage-based positions - rejected as it adds complexity.

### Canvas Width
**Decision:** Use a fixed CANVAS_WIDTH in GAME_CONFIG (e.g., 800 or 1000).
**Rationale:** Provides consistent coordinate system for the entire game.
**Alternative:** Keeping dynamic - rejected due to ongoing issues.

## Risks / Trade-offs

[Responsive issues] → Fixed width may not work on all screen sizes
[Alternative] → Could use percentage but adds complexity
