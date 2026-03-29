## Why

The Flappy Macky game has critical bugs in collision detection and scoring. The collision check is inaccurate due to timing issues (checking pipes before they move) and incorrect bird position values (hardcoded 80px doesn't match responsive CSS). Additionally, the score counter doesn't increment properly because it uses the same incorrect bird position. These bugs make the game unplayable - players crash into pipes that appear safe, and scores don't reflect actual progress.

## What Changes

- Fix collision timing: check collision AFTER moving pipes in the same frame
- Fix bird X position: align collision/scoring logic with responsive CSS (remove `sm:pl-50`)
- Fix score detection: use correct bird position for scoring logic
- Ensure hitbox matches visual representation

## Capabilities

### New Capabilities
None - these are bug fixes for existing functionality.

### Modified Capabilities
- `game-physics`: Collision detection and scoring logic need fixes to align with visual representation

## Impact

**Files Modified:**
- `src/hooks/useGameLoop.ts` - Fix collision timing and scoring logic
- `src/app/page.tsx` - Fix responsive bird positioning
- `src/lib/constants.ts` - May need adjustments to bird X position
- `src/components/Bird.tsx` - Ensure hitbox matches visual
