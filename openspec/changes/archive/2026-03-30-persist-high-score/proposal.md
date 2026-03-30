## Why

Currently, when the player crashes, their score is displayed but there's no way to track their best performance across games. Adding persistent high score will motivate players to improve and compete with their previous best.

## What Changes

- **Add highScore state**: Track high score in page.tsx using useState
- **Load from localStorage**: On app mount, retrieve stored high score from localStorage
- **Save on game over**: When game ends, compare current score with high score and save if higher
- **Display on game over only**: Show high score on the crash/game over screen, not during gameplay
- **Storage key**: Use "mackyHighScore" as localStorage key

## Capabilities

### New Capabilities
- `high-score-persistence`: Persist and retrieve high score using localStorage

### Modified Capabilities
- None (UI display only, no gameplay changes)

## Impact

- **Modified Files**:
  - `src/app/page.tsx` - Add highScore state, load/save from localStorage, display on game over
  - May create a simple utility function in `src/lib/` for localStorage operations
