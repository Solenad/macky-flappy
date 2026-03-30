## ADDED Requirements

### Requirement: Top pipe has downward-pointing cap
The top pipe SHALL have a flared cap at its bottom edge that extends beyond the pipe body on both sides.

#### Scenario: Top pipe cap renders correctly
- **WHEN** a top pipe renders at any position
- **THEN** it displays a cap at the bottom that extends 8px beyond the pipe width on each side

#### Scenario: Top pipe cap points downward
- **WHEN** a top pipe with cap is rendered
- **THEN** the cap flares outward toward the bottom, matching Flappy Bird aesthetic

### Requirement: Bottom pipe has upward-pointing cap
The bottom pipe SHALL have a flared cap at its top edge that extends beyond the pipe body on both sides.

#### Scenario: Bottom pipe cap renders correctly
- **WHEN** a bottom pipe renders at any position
- **THEN** it displays a cap at the top that extends 8px beyond the pipe width on each side

#### Scenario: Bottom pipe cap points upward
- **WHEN** a bottom pipe with cap is rendered
- **THEN** the cap flares outward toward the top, matching Flappy Bird aesthetic

### Requirement: Pipe caps use matching visual style
Pipe caps SHALL use the same color scheme as the pipe body for visual consistency.

#### Scenario: Cap color matches pipe
- **WHEN** pipes render with green fallback color
- **THEN** caps also use green color that matches the pipe body

#### Scenario: Cap has border for definition
- **WHEN** pipes render with caps
- **THEN** caps have a darker border to define the cap shape against the pipe body
