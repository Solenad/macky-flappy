## 1. Fix Collision Timing

- [x] 1.1 Restructure useGameLoop.ts to move pipes first, then check collision in same frame
- [x] 1.2 Verify collision uses current frame pipe positions (not previous frame)

## 2. Fix Bird Position

- [x] 2.1 Remove sm:pl-50 from page.tsx, use consistent pl-20 (80px)
- [x] 2.2 Verify BIRD_X_POSITION: 80 matches visual bird position

## 3. Fix Scoring

- [x] 3.1 Update scoring logic to use correct bird X position (80px)
- [x] 3.2 Test score increments when bird passes through pipe gap
- [x] 3.3 Verify score only increments once per pipe

## 4. Fix Hitbox Alignment

- [x] 4.1 Expand bird hitbox to include visual elements (beak, wing)
- [x] 4.2 Verify collision feels fair - visual contact = crash

## 5. Test and Verify

- [x] 5.1 Run TypeScript type check
- [x] 5.2 Run production build
- [x] 5.3 Manual test: crash when touching pipe visually
- [x] 5.4 Manual test: score increments when passing through gap
