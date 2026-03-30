## ADDED Requirements

### Requirement: Pipes spawn at fixed position
The system SHALL spawn pipes at a fixed X coordinate within the game container.

#### Scenario: Pipe spawn position
- **WHEN** game starts and PIPE_SPAWN_RATE elapses
- **THEN** new pipe shall be created at x = CANVAS_WIDTH

### Requirement: Pipes move from right to left
The system SHALL move pipes leftward each frame by PIPE_SPEED.

#### Scenario: Pipe movement
- **WHEN** game loop updates
- **THEN** each pipe's x position shall decrease by GAME_CONFIG.PIPE_SPEED

### Requirement: Fixed canvas dimensions
The system SHALL use fixed CANVAS_WIDTH for consistent coordinate system.

#### Scenario: Canvas width
- **WHEN** game initializes
- **THEN** CANVAS_WIDTH shall be a fixed value (e.g., 800)
