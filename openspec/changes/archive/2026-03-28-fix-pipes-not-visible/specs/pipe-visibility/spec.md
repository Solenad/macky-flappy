## ADDED Requirements

### Requirement: Pipes render with correct CSS positioning
The system SHALL render pipes using CSS that positions them visibly within the game container.

#### Scenario: Pipe wrapper positioning
- **WHEN** Pipe component is rendered
- **THEN** pipe elements shall use absolute positioning relative to game container

#### Scenario: Pipe z-index
- **WHEN** pipes are rendered
- **THEN** pipes shall have z-index that places them above background but below UI overlays

### Requirement: Pipes are visible on screen
The system SHALL ensure pipes appear visually within the game area.

#### Scenario: Pipe visibility
- **WHEN** game state is PLAYING and pipes exist
- **THEN** pipes shall be visible on screen

#### Scenario: Pipe dimensions
- **WHEN** pipe is rendered
- **THEN** pipe shall have non-zero width and height that matches GAME_CONFIG values
