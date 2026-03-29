## ADDED Requirements

### Requirement: Core flappy bird gameplay mechanics
The system SHALL implement the core gameplay mechanics of flappy bird including bird movement, pipe scrolling, and scoring.

#### Scenario: Bird responds to user input
- **WHEN** the user clicks or presses space
- **AND** the game is in PLAYING state
- **THEN** the bird shall receive an upward impulse (flap)
- **AND** the bird's velocity shall be set to a negative value (upward)

#### Scenario: Bird is affected by gravity
- **WHEN** the bird is not flapping
- **THEN** the bird shall experience a downward acceleration (gravity)
- **AND** the bird's velocity shall increase downward over time
- **AND** the bird's position shall update accordingly

#### Scenario: Score increments when passing pipes
- **WHEN** the bird passes the horizontal center of a pipe pair
- **AND** the bird has not already scored for that pipe pair
- **THEN** the score shall increment by 1
- **AND** the bird shall not be able to score again for the same pipe pair

#### Scenario: Game starts and resets correctly
- **WHEN** the game is in START state and user interacts
- **THEN** the game state shall change to PLAYING
- **AND** the bird shall be reset to its starting position
- **AND** the score shall reset to 0
- **AND** any existing pipes shall be cleared

#### Scenario: Game ends on collision
- **WHEN** a collision is detected between bird and pipe or bird and ground
- **THEN** the game state shall change to GAME_OVER
- **AND** the bird and pipes shall stop moving