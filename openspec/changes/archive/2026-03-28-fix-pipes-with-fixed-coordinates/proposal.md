## Why

Pipes are not appearing on screen despite being spawned. The current implementation uses dynamic window-based coordinates which causes positioning issues. Pipes need fixed coordinates that work reliably.

## What Changes

- Use fixed GAME_CONFIG values for pipe spawning instead of dynamic window.innerWidth
- Set pipe spawn X position to a fixed value within the game container
- Ensure pipes spawn and move from right to left using consistent coordinate system

## Capabilities

### New Capabilities
- `fixed-pipe-coordinates`: Pipes use fixed coordinates for reliable spawning and movement

### Modified Capabilities
- None

## Impact

- `src/lib/constants.ts`: May need fixed CANVAS_WIDTH value
- `src/hooks/useGameLoop.ts`: Pipe spawning logic
- `src/components/Pipe.tsx`: Pipe rendering
