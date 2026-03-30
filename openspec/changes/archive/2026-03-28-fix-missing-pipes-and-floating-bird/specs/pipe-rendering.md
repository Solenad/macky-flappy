## ADDED Requirements

### Requirement: Pipes render correctly in the game container
The system SHALL render pipe obstacles that are visible within the game boundaries and move from right to left.

#### Scenario: Pipes appear during gameplay
- **WHEN** the game is in the PLAYING state
- **THEN** pipe obstacles shall be visible within the game container
- **AND** pipes shall move continuously from right to left
- **AND** pipes shall maintain consistent spacing between each other

#### Scenario: Pipes have correct dimensions
- **WHEN** pipes are rendered
- **THEN** each pipe shall have a width of 52 pixels (as defined in GAME_CONFIG.PIPE_WIDTH)
- **AND** the gap between top and bottom pipes shall be 100 pixels (as defined in GAME_CONFIG.PIPE_GAP)
- **AND** pipes shall extend from the top of the container to the ground for the bottom pipe
- **AND** pipes shall extend from the top of the container downward for the top pipe

#### Scenario: Pipes are generated at correct intervals
- **WHEN** the game is running
- **THEN** new pipes shall be generated every 1.5 seconds
- **AND** each new pipe shall appear at the right edge of the container
- **AND** the top height of each pipe shall be randomized within a valid range