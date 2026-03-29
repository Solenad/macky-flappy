# pipe-rendering Specification

## Purpose
TBD - created by archiving change fix-pipes-2. Update Purpose after archive.
## Requirements
### Requirement: Pipes are visible on screen
The system SHALL render pipes that are visible within the game container boundaries.

#### Scenario: Pipe appears at game start
- **WHEN** game state is PLAYING
- **THEN** pipes should be spawned and rendered on screen

#### Scenario: Pipe visibility
- **WHEN** pipe is rendered
- **THEN** pipe should have non-zero width and height
- **AND** pipe should be positioned within game container boundaries

### Requirement: Pipes move from right to left
The system SHALL move pipes from right to left at a constant speed.

#### Scenario: Pipe horizontal movement
- **WHEN** game loop updates
- **THEN** pipe x position should decrease by PIPE_SPEED each frame
- **AND** pipe should move from right edge toward left edge

### Requirement: Pipes spawn at right edge
The system SHALL spawn new pipes at the right edge of the game container.

#### Scenario: New pipe spawning
- **WHEN** game time exceeds PIPE_SPAWN_RATE since last pipe
- **THEN** new pipe should be created at x position equal to window width

### Requirement: Pipes have proper dimensions
The system SHALL render pipes with correct width and height dimensions.

#### Scenario: Pipe width
- **WHEN** pipe is rendered
- **THEN** pipe width should equal GAME_CONFIG.PIPE_WIDTH

#### Scenario: Pipe gap
- **WHEN** top and bottom pipes are rendered
- **THEN** gap between pipes should equal GAME_CONFIG.PIPE_GAP

### Requirement: Old pipes are removed
The system SHALL remove pipes that have moved completely off screen.

#### Scenario: Pipe cleanup
- **WHEN** pipe x position + PIPE_WIDTH < 0
- **THEN** pipe should be removed from pipes array

