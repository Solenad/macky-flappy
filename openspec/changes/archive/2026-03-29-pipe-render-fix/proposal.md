## Why

Pipes are spawning (console logs confirm this) but are not visible on screen. The game displays a blank area where pipes should be, making the game unplayable. Debug testing confirmed that static pipes render correctly, indicating the issue is in the game loop's pipe generation and rendering pipeline.

## What Changes

- Fix hardcoded CANVAS_WIDTH constant (currently 100px) to use actual window width from game container
- Fix z-index ordering so pipes render above the ground (ground has z-20, pipes have z-15)
- Update Pipe component to use GAME_CONFIG values instead of hardcoded width/gap values
- Pass canvasWidth parameter to useGameLoop hook (currently only canvasHeight is passed)

## Capabilities

### New Capabilities
<!-- No new capabilities - this is a bug fix -->

### Modified Capabilities
<!-- No spec-level behavior changes - this is implementation-level fixes -->
- None - pure bug fix affecting existing game rendering behavior

## Impact

- **Files Modified**:
  - `src/lib/constants.ts` - CANVAS_WIDTH constant
  - `src/hooks/useGameLoop.ts` - Accept canvasWidth parameter, use it for pipe spawning
  - `src/components/Pipe.tsx` - Use GAME_CONFIG values, fix z-index
  - `src/app/page.tsx` - Pass canvasWidth to useGameLoop

- **No breaking changes** - This is a bug fix with no API changes
