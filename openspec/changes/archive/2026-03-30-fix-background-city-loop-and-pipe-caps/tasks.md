## 1. Fix Background City Scrolling

- [x] 1.1 Update globals.css animation to use translateX(-50%) for seamless loop
- [x] 1.2 Add BACKGROUND_SCROLL_SPEED constant to constants.ts (set to 2)
- [x] 1.3 Update Background.tsx to use new scroll speed constant and pass it as prop

## 2. Add Pipe Caps

- [x] 2.1 Add PIPE_CAP_WIDTH constant to constants.ts (set to 8)
- [x] 2.2 Update Pipe.tsx to render cap on top pipe (using pseudo-element or inline div)
- [x] 2.3 Update Pipe.tsx to render cap on bottom pipe
- [x] 2.4 Apply matching green color and border style to caps

## 3. Verify and Test

- [x] 3.1 Run npm run dev to start development server
- [x] 3.2 Verify background scrolls infinitely without gaps
- [x] 3.3 Verify background scrolls slower than pipes (parallax effect)
- [x] 3.4 Verify top pipe has downward-pointing cap
- [x] 3.5 Verify bottom pipe has upward-pointing cap
- [x] 3.6 Run npm run build to verify no build errors
