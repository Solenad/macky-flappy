## MODIFIED Requirements

### Requirement: Background scrolls infinitely without visible gaps
The background city image SHALL scroll continuously in a seamless loop without any visible gaps or abrupt resets.

#### Scenario: Background uses JavaScript-driven position tracking
- **WHEN** the game loop runs
- **THEN** background position is updated each frame and two images are rendered side-by-side

#### Scenario: Background loops seamlessly
- **WHEN** the background position goes below negative canvas width
- **THEN** position resets to 0 seamlessly with no visible jump

#### Scenario: Background scrolls indefinitely
- **WHEN** the game continues running
- **THEN** the background continues scrolling forever without stopping or showing empty space

### Requirement: Background scrolls at speed matching pipes
The background SHALL scroll at speed 4 pixels per frame, matching the pipe speed.

#### Scenario: Default scroll speed matches pipes
- **WHEN** Background component renders
- **THEN** it scrolls at 4 pixels per frame, matching PIPE_SPEED

#### Scenario: Synchronized with game loop
- **WHEN** the game pauses
- **THEN** background scrolling pauses along with the game

### Requirement: JavaScript-driven rendering
The background SHALL use JavaScript to track position and render two images side-by-side.

#### Scenario: Two images rendered
- **WHEN** background renders
- **THEN** two copies of the image are rendered at positions: x and x + canvasWidth

#### Scenario: Seamless loop
- **WHEN** first image scrolls off-screen
- **THEN** second image is immediately visible, creating seamless loop effect
