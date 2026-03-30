## Context

Pipes are being spawned (console shows "Pipe spawned at x: 430 topHeight: 239") but they are not visible on screen. The Pipe component exists and receives correct props, but the pipes don't render visually.

Current state:
- Pipe component renders with `absolute` positioning
- Pipes are rendered inside the game container `<div>` (lines 98-100 in page.tsx)
- The wrapper div in Pipe.tsx uses `absolute inset-0` which may cause positioning issues

## Goals / Non-Goals

**Goals:**
- Make pipes visible on screen during gameplay
- Ensure pipe elements have correct z-index to not be hidden behind other elements
- Verify pipe dimensions and positioning are correct

**Non-Goals:**
- Changing pipe visual design
- Modifying game mechanics

## Decisions

### Pipe Wrapper Structure
**Decision:** Remove the wrapper div with `inset-0` and use simpler direct rendering.
**Rationale:** The wrapper with `inset-0` covers the entire container and may interfere with child positioning. Each pipe should be positioned directly.
**Alternatives Considered:** Keeping wrapper - rejected as it adds unnecessary complexity.

### Pipe Positioning
**Decision:** Render pipes with explicit left positioning relative to game container.
**Rationale:** Pipes need to use absolute positioning within the game container, not via a wrapper.
**Alternative:** Using transform for movement - rejected for simplicity.

### Z-Index
**Decision:** Ensure pipes have proper z-index to appear above background but below UI overlays.
**Rationale:** Pipes may be hidden behind other elements if z-index is too low.
**Alternative:** Using very high z-index - rejected as it may cover UI elements.

## Risks / Trade-offs

[Pipes still not visible] → May need to verify actual screen dimensions vs coordinate system
[Position mismatch] → Bird uses different positioning system than pipes
