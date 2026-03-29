## 1. Floating Bird Issue

- [x] 1.1 Identify source of unintended floating bird in top-left corner
- [x] 1.2 Remove or correct any extra Bird component rendering
- [x] 1.3 Verify only one bird appears during gameplay at correct position

## 2. Pipe Rendering Fix

- [x] 2.1 Inspect Pipe component styling and positioning
- [x] 2.2 Ensure pipes are visible within game container boundaries
- [x] 2.3 Verify pipe dimensions match GAME_CONFIG values
- [x] 2.4 Check that pipes move from right to left at correct speed

## 3. Pipe Generation and Spawning

- [x] 3.1 Verify pipe spawning interval in useGameLoop hook
- [x] 3.2 Confirm pipes spawn at right edge of container
- [x] 3.3 Validate random height generation for pipe gaps
- [x] 3.4 Ensure old pipes are removed when they exit left boundary

## 4. Collision Detection

- [x] 4.1 Verify AABB collision detection between bird and pipes
- [x] 4.2 Ensure collision triggers game over state
- [x] 4.3 Confirm bird can safely pass through pipe gaps
- [x] 4.4 Test scoring mechanism when bird passes pipes

## 5. Game Mechanics Verification

- [x] 5.1 Confirm bird responds to flap input with upward impulse
- [x] 5.2 Verify gravity affects bird when not flapping
- [x] 5.3 Ensure score increments correctly when passing pipes
- [x] 5.4 Test game reset functionality (position, score, pipes)