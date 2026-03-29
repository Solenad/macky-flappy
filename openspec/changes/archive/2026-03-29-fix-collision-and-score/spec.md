# Game Physics Specification

## ADDED Requirements

### Requirement: Collision Detection Accuracy
The collision detection system SHALL accurately detect when the bird's hitbox overlaps with pipe hitboxes, aligned with visual representation.

#### Scenario: Bird hits top pipe
- **WHEN** the bird's horizontal position overlaps with a pipe's horizontal range AND the bird's top edge is above the gap
- **THEN** the game SHALL trigger game over

#### Scenario: Bird hits bottom pipe
- **WHEN** the bird's horizontal position overlaps with a pipe's horizontal range AND the bird's bottom edge is below the gap start
- **THEN** the game SHALL trigger game over

#### Scenario: Bird passes through gap safely
- **WHEN** the bird's horizontal position overlaps with a pipe's horizontal range BUT the bird is within the vertical gap
- **THEN** the game SHALL NOT trigger game over

### Requirement: Scoring Accuracy
The scoring system SHALL increment the score exactly once when the bird successfully passes through a pipe gap.

#### Scenario: Bird passes through pipe gap
- **WHEN** the bird's right edge exceeds the pipe's right edge AND the bird was previously positioned before the pipe
- **THEN** the score SHALL increment by 1

#### Scenario: Score only counts once per pipe
- **WHEN** the bird has already passed a specific pipe
- **THEN** the score SHALL NOT increment again for that pipe

### Requirement: Frame-Synchronized Collision
The collision detection SHALL use pipe positions that are synchronized with the current frame, not the previous frame.

#### Scenario: Collision checked at current pipe positions
- **WHEN** the game loop executes a frame
- **THEN** collision detection SHALL use pipe positions after movement for that frame

#### Scenario: Scoring checked at current pipe positions
- **WHEN** the game loop executes a frame
- **THEN** scoring detection SHALL use pipe positions after movement for that frame
