## Why

The current JavaScript-driven background approach causes Next.js hydration errors (server/client HTML mismatch) and triggers excessive React re-renders. Need to replace with a CSS-only approach that replicates the same smooth seamless scrolling without hydration issues.

## What Changes

- **Replace JS background with CSS-only approach**: Use CSS animation with two side-by-side images that animate together, creating seamless infinite scroll
- **Fix hydration error**: Ensure server and client render the same HTML by using CSS-only solution with no client-side state
- **Maintain smooth scrolling**: Use CSS animation at 60fps which runs on the compositor thread

## Capabilities

### New Capabilities
- `css-background-scroll`: CSS-only seamless infinite scrolling background

### Modified Capabilities
- `background-scrolling`: Update to use CSS animation approach instead of JS-driven

## Impact

- **Modified Files**:
  - `src/components/Background.tsx` - Replace JS logic with pure CSS approach
  - `src/app/globals.css` - Ensure scroll animation is properly configured
