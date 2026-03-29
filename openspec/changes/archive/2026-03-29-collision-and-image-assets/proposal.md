## Why

The current game uses colored div elements for the bird and pipes. Players want to customize the game with custom images for sprites while maintaining accurate collision detection. Additionally, the collision detection logic may need fixes to ensure fair gameplay.

## What Changes

- Add image asset support for bird and pipes
- Create a configurable sprite system that swaps visual assets without changing hitbox logic
- Fix any issues with pipe collision detection
- Add sprite configuration to GAME_CONFIG

## Capabilities

### New Capabilities
- `sprite-system`: Configurable image-based sprites with preserved hitboxes

### Modified Capabilities
- None - collision detection improvements are bug fixes

## Impact

- **Files Modified**:
  - `src/components/Bird.tsx` - Add image rendering support
  - `src/components/Pipe.tsx` - Add image rendering support
  - `src/lib/constants.ts` - Add sprite configuration
  - `src/hooks/useGameLoop.ts` - Verify collision detection logic
