## 1. Add High Score State

- [x] 1.1 Add highScore state to page.tsx using useState (default 0)
- [x] 1.2 Add useEffect to load highScore from localStorage on mount (key: "mackyHighScore")

## 2. Save High Score on Game Over

- [x] 2.1 Add useEffect to detect game over and save new high score
- [x] 2.2 Compare current score with high score before saving
- [x] 2.3 Wrap localStorage operations in try-catch for error handling

## 3. Display High Score on Game Over

- [x] 3.1 Update game over screen to display high score below current score
- [x] 3.2 Style high score to be visually distinct but secondary to current score

## 4. Verify

- [x] 4.1 Run npm run build to verify no build errors
- [ ] 4.2 Test: Play game, crash, verify score saves
- [ ] 4.3 Test: Refresh page, verify high score persists
- [ ] 4.4 Test: Beat high score, verify it updates
