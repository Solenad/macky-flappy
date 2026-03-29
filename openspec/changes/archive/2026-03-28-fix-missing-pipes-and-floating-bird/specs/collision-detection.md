## ADDED Requirements

### Requirement: Collision detection between bird and pipes
The system SHALL detect when the bird collides with a pipe and trigger game over.

#### Scenario: Bird collides with pipe
- **WHEN** the bird's position intersects with a pipe's position
- **THEN** the game state shall change to GAME_OVER
- **AND** the bird shall stop moving
- **AND** the pipes shall stop moving

#### Scenario: Bird passes through pipe gap safely
- **WHEN** the bird passes through the gap between two pipes without touching them
- **THEN** no collision shall be detected
- **AND** the game shall continue normally
- **AND** the score shall increment when the bird passes the center of the pipe pair

#### Scenario: Collision detection accounts for bird size
- **WHEN** the bird's hitbox (considering its width and height) touches a pipe's hitbox
- **THEN** a collision shall be detected
- **AND** the game state shall change to GAME_OVER