## Context

The Macky Flappy game is a Flappy Bird clone built with Next.js and React. Currently, the game has two main issues:
1. Pipes are not appearing during gameplay (despite being rendered in the JSX)
2. There's an unintended floating bird in the top-left corner of the screen

From examining the code:
- The Bird component is rendered in page.tsx at line 84 with `{gameState === "START" && (...)}` condition
- However, there's another Bird component being rendered at line 84-85 that appears to be always visible regardless of game state
- The pipes are being mapped and rendered in lines 87-89 but may not be visible due to styling or positioning issues
- The game uses absolute positioning for elements within a relative container

## Goals / Non-Goals

**Goals:**
- Fix pipe rendering so pipes appear correctly with proper positioning and scrolling
- Remove the unintended floating bird from the top-left corner
- Ensure pipes move from right to left at consistent speed
- Maintain proper collision detection between bird and pipes
- Preserve existing game aesthetics and feel

**Non-Goals:**
- Changing the core game mechanics (flapping, gravity, scoring)
- Redesigning the visual appearance of birds or pipes
- Adding new features like power-ups or multiple levels
- Changing the technology stack or framework

## Decisions

### Pipe Positioning and Visibility
**Decision:** Fix pipe styling and positioning to ensure they are visible within the game container.
**Rationale:** The pipes are being rendered (as seen in the pipes.map call) but likely have incorrect positioning, sizing, or z-index values that make them invisible. The container uses `overflow-hidden` which might be clipping pipes that are positioned outside its bounds.
**Alternative Considered:** Changing the container to `overflow-visible` - rejected because it would allow pipes to float outside the game area visually.

### Floating Bird Removal
**Decision:** Remove the unintended Bird component that appears to be always rendered.
**Rationale:** Looking at page.tsx line 84-85, there's a Bird component rendered outside of any conditional that should make it appear only during gameplay. This is likely the source of the floating bird in the top-left.
**Alternative Considered:** Keeping the bird but positioning it correctly - rejected because gameplay already has a properly positioned bird component.

### Pipe Generation and Movement
**Decision:** Ensure the game loop properly generates pipes with correct spacing and moves them leftward.
**Rationale:** Even if pipes are styled correctly, they need to be generated at the right intervals and moved consistently to create the gameplay experience.
**Alternative Considered:** Using CSS animations for pipe movement - rejected because it would complicate collision detection and game state management.

## Risks / Trade-offs

[Pipe styling fixes] → May affect responsive behavior on different screen sizes
[Removing floating bird] → Could reveal other rendering issues if the bird was serving as a placeholder
[Fixing pipe generation] → Might alter game difficulty if timing/timing values are changed inadvertently

## Open Questions

- Are there missing assets (pipe images) that should be used instead of the current CSS-rendered pipes?
- What are the exact values for pipe spacing, width, and gap that should be used for authentic Flappy Bird gameplay?
- Should the pipe generation algorithm create pipes with random heights within a specific range?