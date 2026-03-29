## Why

The game has three UI issues that need fixing: (1) The Score component has a bug where it assigns 0 instead of comparing, and the zero digit displays as a Flappy Bird logo due to the custom font - players need to see an "O" instead; (2) The crash/game over screen shows the score but the implementation is messy in page.tsx and needs cleanup; (3) The game lacks visual movement parallax - adding a continuously scrolling background that moves with the pipes will create the illusion of forward movement.

## What Changes

1. **Fix Score zero display**: Update the Score component to properly convert score "0" to "O" when displaying, using correct comparison operator instead of assignment
2. **Clean up crash screen score display**: Refactor the Score rendering on the GAME_OVER screen to be cleaner and more maintainable
3. **Add scrolling background**: Implement a continuously moving background layer that scrolls at the same speed as pipes to create parallax movement illusion

## Capabilities

### New Capabilities

- `scrolling-background`: Add a continuously scrolling background that moves in sync with pipes to create forward movement illusion

### Modified Capabilities

- None - the score display fix is a bug fix within existing UI behavior, and the background is a net new visual element

## Impact

- `src/components/ui/Score.tsx`: Fix the zero-to-O conversion logic
- `src/app/page.tsx`: Clean up score display on GAME_OVER screen
- Add new background component with scrolling animation
- May need to add background image asset
