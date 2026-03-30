## Context

The Flappy Bird game currently does not render pipes on the screen. The pipes are a core gameplay element that should be generated, moved from right to left, and provide obstacles for the bird to navigate through. The issue needs to be fixed to restore playable gameplay.

Current state:
- Pipe component exists in `src/components/Pipe.tsx`
- Pipe generation logic exists in `src/hooks/useGameLoop.ts`
- Pipes are rendered in `src/app/page.tsx` but not visible

## Goals / Non-Goals

**Goals:**
- Ensure pipes render and are visible within the game container
- Pipes should spawn at the right edge and move left at constant speed
- Pipes should have proper dimensions (width, height, gap)
- Pipes should be properly positioned within the game container
- Maintain collision detection functionality

**Non-Goals:**
- Changing pipe visual design or colors
- Adding new pipe types or patterns
- Changing game difficulty or pipe spacing

## Decisions

### Pipe Component Structure
**Decision:** Use a wrapper div with `position: relative` and child divs for top and bottom pipes.
**Rationale:** The pipe component needs to be properly positioned within the game container. Using a wrapper ensures the pipe pair moves together as one unit.
**Alternatives Considered:** Using CSS grid for layout - rejected as it adds unnecessary complexity.

### Pipe Positioning
**Decision:** Position pipes using `left` style property for horizontal movement.
**Rationale:** Simple and direct control over horizontal position. Matches how the bird position is handled.
**Alternatives Considered:** Using `transform: translateX()` - considered but using `left` is more consistent with existing code.

### Pipe Container
**Decision:** Render pipes directly in the game container with proper styling.
**Rationale:** Pipes need to be absolutely positioned within the game container to overlay the game area.
**Alternatives Considered:** Using a separate pipe container - unnecessary complexity.

## Risks / Trade-offs

[Pipe not visible] → Ensure pipes have explicit width, height, and proper positioning values
[Collision detection failure] → Verify collision detection uses same coordinate system as pipe positioning
[Performance with many pipes] → Use proper cleanup to remove off-screen pipes
