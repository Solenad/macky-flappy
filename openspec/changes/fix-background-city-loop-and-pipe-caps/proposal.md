## Why

The background city image stops showing after scrolling once, leaving an empty blue background. This breaks the visual immersion of the game. Additionally, the pipes lack the characteristic cap/ends seen in the original Flappy Bird game, and the background scrolls at the same speed as pipes, making it feel less dynamic.

## What Changes

- **Fix background city looping**: Implement seamless infinite scroll for the city background so it continuously loops without visible seams or gaps
- **Add pipe caps**: Add the signature flared cap/ends to both top and bottom pipes to match the Flappy Bird aesthetic
- **Adjust background scroll speed**: Slow down the city background to scroll slightly faster than the bird and pipes, creating parallax depth

## Capabilities

### New Capabilities
- `background-scrolling`: Seamless infinite scrolling background with adjustable speed
- `pipe-caps`: Flared cap ends on pipes for authentic Flappy Bird appearance

### Modified Capabilities
- None (these are visual/implementation improvements without spec-level behavior changes)

## Impact

- **Modified Files**:
  - `src/components/Background.tsx` - Fix looping logic and add speed prop
  - `src/components/Pipe.tsx` - Add cap elements to pipe rendering
  - `src/lib/constants.ts` - Add new background scroll speed configuration
  - `src/app/globals.css` - Fix CSS animation for seamless loop
