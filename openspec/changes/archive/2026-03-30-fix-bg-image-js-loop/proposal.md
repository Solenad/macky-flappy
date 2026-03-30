## Why

The background city image uses a CSS animation that causes it to cut off and reset after scrolling once, leaving empty blue space. The previous CSS-only fix (translateX(-50%)) didn't work because it stretches a single image rather than creating a seamless loop. A JavaScript-driven approach is needed to track position and render two actual image copies side-by-side.

## What Changes

- **Replace CSS animation with JavaScript-driven background scrolling**: Use the existing game loop to track background position and render two side-by-side images that seamlessly loop
- **Revert background scroll speed**: Set to 4 to match pipe speed (was incorrectly changed to 2)
- **Keep pipe caps**: The caps added in the previous change should remain

## Capabilities

### New Capabilities
- `js-background-scroll`: JavaScript-driven infinite scrolling background using the game loop

### Modified Capabilities
- `background-scrolling`: Update existing spec to reflect JS-driven approach instead of CSS

## Impact

- **Modified Files**:
  - `src/components/Background.tsx` - Replace CSS animation with JS-driven rendering
  - `src/lib/constants.ts` - Revert BACKGROUND_SCROLL_SPEED to 4
  - `src/app/globals.css` - May remove or simplify scroll animation (if not needed)
