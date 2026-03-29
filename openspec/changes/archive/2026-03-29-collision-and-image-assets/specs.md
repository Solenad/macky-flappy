## ADDED Requirements

### Requirement: Image sprites with preserved hitboxes
The game SHALL support image-based sprites for bird and pipes while maintaining the same hitbox dimensions as the current colored div implementation.

#### Scenario: Bird renders with image
- **WHEN** a valid image path is configured in GAME_CONFIG
- **THEN** the Bird component displays the image instead of colored div
- **AND** the hitbox remains 34x24 pixels

#### Scenario: Pipe renders with image
- **WHEN** a valid image path is configured in GAME_CONFIG
- **THEN** the Pipe component displays the image instead of colored div
- **AND** the hitbox remains the configured width and dynamic height

## MODIFIED Requirements

None - this is a visual enhancement that does not change existing game behavior.
