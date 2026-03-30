## Why

Pipes are being spawned (console shows "Pipe spawned at x: 430 topHeight: 239") but they are not visible on the game screen. The rendering logic exists but the pipes don't appear, likely due to CSS positioning issues or rendering context problems.

## What Changes

- Fix Pipe component CSS positioning to ensure pipes render within the game container
- Verify pipes use proper absolute positioning relative to the game container
- Ensure pipe elements are not positioned outside the visible viewport

## Capabilities

### New Capabilities
- `pipe-visibility`: Fix CSS positioning to make spawned pipes visible on screen

### Modified Capabilities
- None

## Impact

- `src/components/Pipe.tsx`: CSS positioning and rendering
- `src/app/page.tsx`: Pipe rendering context and container setup
