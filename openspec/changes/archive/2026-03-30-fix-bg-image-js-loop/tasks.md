## 1. Revert Background Scroll Speed

- [x] 1.1 Change BACKGROUND_SCROLL_SPEED in constants.ts from 2 back to 4

## 2. Implement JS-Driven Background

- [x] 2.1 Add backgroundPosition state to useGameLoop hook (starts at 0)
- [x] 2.2 Update background position each frame: position = (position - scrollSpeed) % canvasWidth
- [x] 2.3 Return backgroundPosition from useGameLoop hook
- [x] 2.4 Update Background.tsx to accept position prop and render two images

## 3. Optimize with 3-Image Array

- [ ] 3.1 Update Background.tsx to use an array of 3 images
- [ ] 3.2 Each image positioned at: position + (index * canvasWidth)
- [ ] 3.3 When first image goes off-screen, remove it and append a new one at the end
- [ ] 3.4 Ensure smooth transition without jumps

## 4. Verify

- [x] 4.1 Run npm run build to verify no build errors
- [x] 4.2 Start dev server and verify background scrolls seamlessly
- [x] 4.3 Verify no visible cuts or gaps in background
