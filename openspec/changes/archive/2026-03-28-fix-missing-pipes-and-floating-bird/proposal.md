## Why

The flappy bird game is missing pipe obstacles and has an unintended floating bird in the top-left corner, making the game unplayable as intended. These issues need to be fixed to restore the core gameplay mechanics.

## What Changes

- Fix pipe rendering so pipes appear correctly during gameplay
- Remove the unintended floating bird from the top-left corner
- Ensure proper collision detection between bird and pipes
- Restore proper game mechanics and scoring

## Capabilities

### New Capabilities
- `pipe-rendering`: Implements proper pipe generation, rendering, and scrolling
- `collision-detection`: Adds collision detection between bird and pipes
- `game-mechanics`: Restores core flappy bird gameplay mechanics

### Modified Capabilities
- None

## Impact

- Game rendering components in src/
- Game logic and state management
- Potentially affects CSS styling for game elements
- May impact asset loading if pipe images are missing