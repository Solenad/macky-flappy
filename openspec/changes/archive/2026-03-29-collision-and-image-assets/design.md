## Context

The Flappy Macky game currently uses CSS-colored divs for the bird and pipes. The game needs to support custom images while keeping hitbox calculations accurate.

Current implementation:
- Bird is a yellow div with CSS styling (34x24 pixels)
- Pipes are green divs (60 pixels wide, dynamic height)
- Collision detection uses AABB (Axis-Aligned Bounding Box) in useGameLoop.ts

## Goals / Non-Goals

**Goals:**
- Add image support for bird and pipes
- Keep hitbox dimensions unchanged when switching to images
- Make sprite assets configurable via constants
- Fix any collision detection issues

**Non-Goals:**
- Adding animations (only static sprites)
- Support for different sprite sizes (hitboxes stay fixed)
- Multiple sprite themes (single theme only for now)

## Decisions

### Decision 1: How to implement sprite system?

**Option A:** Add image URLs to GAME_CONFIG, render img tags in components
- Pro: Simple, straightforward
- Con: Requires loading images, potential flicker

**Option B:** Use CSS background-image with sprites
- Pro: Better performance, no DOM overhead
- Con: More complex styling

**Decision:** Option A - Use img tags with src from config. Simpler and allows for easy theming.

### Decision 2: Where to store sprite assets?

**Option A:** Store in /public/sprites/ folder
- Pro: Standard Next.js location for static assets
- Con: Need to reference by path

**Option B:** Store as base64 in constants
- Pro: No external dependencies
- Con: Bloated codebase

**Decision:** Option A - Use /public/sprites/ folder. Placeholder colored divs can be used initially.

### Decision 3: How to handle missing images?

**Option A:** Fallback to colored divs if image fails to load
- Pro: Graceful degradation
- Con: More complex code

**Decision:** Start with colored divs as default, add image path to config for future use.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Images not loading | Use colored divs as fallback |
| Hitbox mismatch with images | Keep explicit width/height from config |
| Collision still broken | Review and fix collision math |

## Open Questions

- What default sprites should be used (or use colored placeholders)?
- Should sprites be loaded from external URLs or local files?
