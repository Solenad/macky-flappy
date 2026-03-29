## 1. Fix Pipe Component z-indexing

- [x] 1.1 Update Pipe.tsx zIndex from 15 to 25 (above ground's z-20)
- [x] 1.2 Replace hardcoded width=100 with GAME_CONFIG.PIPE_WIDTH
- [x] 1.3 Replace hardcoded gap/height with calculated values using GAME_CONFIG

## 2. Pass canvasWidth to useGameLoop

- [x] 2.1 Add canvasWidth parameter to useGameLoop hook signature
- [x] 2.2 Update useGameLoop to use canvasWidth for pipe spawning position
- [x] 2.3 Update page.tsx to calculate and pass canvasWidth to useGameLoop

## 3. Verify and Test

- [x] 3.1 Remove debug red box from page.tsx
- [x] 3.2 Test that pipes appear and scroll from right to left
- [x] 3.3 Verify collision detection still works correctly
- [x] 3.4 Test game over triggers properly
