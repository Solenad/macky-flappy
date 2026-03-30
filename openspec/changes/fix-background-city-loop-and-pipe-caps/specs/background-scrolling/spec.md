## ADDED Requirements

### Requirement: Background scrolls infinitely without visible gaps
The background city image SHALL scroll continuously in a seamless loop without any visible gaps or abrupt resets.

#### Scenario: Background starts scrolling on game load
- **WHEN** the game loads and Background component renders
- **THEN** the city background begins scrolling from left to right

#### Scenario: Background loops seamlessly
- **WHEN** the background scrolls past the first image width
- **THEN** it seamlessly continues from the second copy of the image without visible seam or gap

#### Scenario: Background scrolls indefinitely
- **WHEN** the game continues running
- **THEN** the background continues scrolling forever without stopping or showing empty space

### Requirement: Background scrolls at configurable speed
The background SHALL support a configurable scroll speed prop to control how fast the background moves.

#### Scenario: Default scroll speed
- **WHEN** Background component renders without scrollSpeed prop
- **THEN** it scrolls at default speed of 2 pixels per frame

#### Scenario: Custom scroll speed
- **WHEN** Background component renders with scrollSpeed prop set to a value
- **THEN** it scrolls at that specified speed

#### Scenario: Slower than pipes for parallax effect
- **WHEN** background scroll speed is set to 2 and pipe speed is 4
- **THEN** the background moves at half the speed of pipes, creating depth
