## Context

The game currently tracks and displays the current score during gameplay and on game over, but has no way to persist or display the player's best score across sessions. The GameState type already includes `highScore` but it's not implemented.

## Goals / Non-Goals

**Goals:**
- Load high score from localStorage on app mount
- Save high score to localStorage when player beats their record
- Display high score only on game over screen
- Handle edge cases (first time player, corrupted data)

**Non-Goals:**
- Show high score during gameplay (only on game over)
- Leaderboard or multiplayer (out of scope)
- Reset high score functionality

## Decisions

### Storage Implementation

**Decision:** Implement localStorage helpers directly in page.tsx

**Rationale:**
- Simple feature, doesn't need separate module
- localStorage is browser-only, need to handle SSR safely
- Key: "mackyHighScore"

**Implementation:**
```tsx
// Load on mount
const [highScore, setHighScore] = useState(0);
useEffect(() => {
  const stored = localStorage.getItem('mackyHighScore');
  if (stored) setHighScore(parseInt(stored, 10));
}, []);

// Save when game over
useEffect(() => {
  if (gameState === 'GAME_OVER' && score > highScore) {
    localStorage.setItem('mackyHighScore', score.toString());
    setHighScore(score);
  }
}, [gameState, score, highScore]);
```

### Display Implementation

**Decision:** Add high score display to game over screen, below current score

**Rationale:**
- Clear visual hierarchy: current score prominent, high score below
- Consistent with the existing score display component

### Edge Case Handling

| Case | Handling |
|------|----------|
| First time player | localStorage returns null, default to 0 |
| Corrupted data | parseInt returns NaN, default to 0 |
| Same score | Don't update (not a new high) |

## Risks / Trade-offs

- [Risk] localStorage might be unavailable (private browsing)
  - [Mitigation] Wrap in try-catch, fall back to session-only

- [Risk] Hydration mismatch (server has no localStorage)
  - [Mitigation] Use useEffect to load after mount

## Open Questions

- Should we show a "NEW HIGH SCORE!" indicator when player beats their record? (Decided: Keep simple for now, just show the score)
