## ADDED Requirements

### Requirement: High score loads from localStorage on app mount
The game SHALL load the stored high score from localStorage when the app initializes.

#### Scenario: First time player
- **WHEN** the app loads and no high score exists in localStorage
- **THEN** high score defaults to 0

#### Scenario: Returning player
- **WHEN** the app loads and a high score exists in localStorage
- **THEN** high score is loaded from storage

#### Scenario: Corrupted localStorage data
- **WHEN** localStorage contains invalid data (non-numeric)
- **THEN** high score defaults to 0

### Requirement: High score updates when player beats record
The game SHALL save the new high score to localStorage when the current score exceeds the previous high score.

#### Scenario: New high score achieved
- **WHEN** the game ends with a score higher than the stored high score
- **THEN** the new score is saved to localStorage

#### Scenario: Score does not beat high score
- **WHEN** the game ends with a score lower than or equal to the stored high score
- **THEN** the stored high score remains unchanged

### Requirement: High score displays only on game over screen
The game SHALL display the high score exclusively on the game over screen, not during gameplay.

#### Scenario: Game over screen displays high score
- **WHEN** gameState is "GAME_OVER"
- **THEN** the high score is displayed alongside the current score

#### Scenario: High score not shown during gameplay
- **WHEN** gameState is "PLAYING"
- **THEN** the high score is not visible

### Requirement: High score persists across browser sessions
The game SHALL retain the high score even after closing and reopening the browser.

#### Scenario: Browser closed and reopened
- **WHEN** the player closes the browser and returns later
- **THEN** the previously stored high score is still available
