## 1. Fix Game Constants

- [x] 1.1 Set CANVAS_WIDTH to fixed value (800) in GAME_CONFIG
- [x] 1.2 Remove window.innerWidth usage from constants

## 2. Fix Pipe Spawning

- [x] 2.1 Update useGameLoop to spawn pipes at CANVAS_WIDTH
- [x] 2.2 Remove dynamic canvasWidth parameter
- [x] 2.3 Use GAME_CONFIG.CANVAS_WIDTH for pipe spawning

## 3. Test Pipes

- [x] 3.1 Verify pipes spawn at right edge
- [x] 3.2 Verify pipes move left each frame
- [x] 3.3 Confirm pipes are visible on screen
