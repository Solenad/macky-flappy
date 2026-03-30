## Context

The game uses a CSS animation for background scrolling that runs independently from the game loop. This causes the background to:
1. Stretch a single image to 200% width
2. Translate -50% which just reveals more of the stretched image
3. Abruptly reset when animation completes, creating a visible seam

The CSS animation runs on a separate thread from the JavaScript game loop, causing potential frame drops.

## Goals / Non-Goals

**Goals:**
- Create seamless infinite scroll using JavaScript-driven position tracking
- Use the same game loop as pipes/bird for synchronized timing
- Revert background scroll speed to 4 (matching pipes)
- Keep existing pipe caps from previous change

**Non-Goals:**
- Don't add additional parallax layers
- Don't change pipe speed or spacing logic

## Decisions

### Approach: JS-Driven via useGameLoop Hook

**Decision:** Add background position tracking to the existing useGameLoop hook

**Rationale:**
- Already runs on requestAnimationFrame, synchronized with game timing
- Avoids CSS animation frame drops
- Can easily pause/resume with game status

**Implementation:**
```
Background position starts at 0
Each frame: position = (position - scrollSpeed) % canvasWidth
Render TWO images:
  - Image 1 at left: position
  - Image 2 at right: position + canvasWidth
```

When position goes below -canvasWidth, reset to 0 seamlessly.

### Alternative: Separate Background Hook
- Created a new useBackgroundScroll hook
- More isolated but adds complexity
- **Rejected**: Over-engineering for simple need

## Risks / Trade-offs

- [Risk] Background renders twice per frame (two img elements)
  - [Mitigation] Background is simple, should be performant. If issues arise, optimize later.

- [Risk] Need to pass position from game loop to Background component
  - [Solution] Return background position from useGameLoop, pass as prop to Background

## Open Questions

- Should the background be its own separate hook for cleaner separation? (Decided: Keep it simple for now, integrate into game loop)
