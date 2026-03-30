## ADDED Requirements

### Requirement: Scrolling background displays and moves continuously
The game SHALL display a background that scrolls continuously from right to left to create the illusion of forward movement.

#### Scenario: Background scrolls when game is playing
- **WHEN** the game status is "PLAYING"
- **THEN** the background SHALL animate continuously from right to left

#### Scenario: Background position resets for seamless looping
- **WHEN** the background has scrolled past its visible width
- **THEN** the background SHALL reset to its starting position creating a seamless loop

#### Scenario: Background scrolls at same speed as pipes
- **WHEN** the background is scrolling
- **THEN** the scroll speed SHALL match the pipe movement speed defined in GAME_CONFIG.PIPE_SPEED

### Requirement: Background displays behind game elements
The scrolling background SHALL render behind all other game elements (bird, pipes, ground, UI).

#### Scenario: Background renders behind bird
- **WHEN** the game is rendering
- **THEN** the background SHALL appear behind the bird sprite (lower z-index)

#### Scenario: Background renders behind pipes
- **WHEN** the game is rendering
- **THEN** the background SHALL appear behind the pipe sprites (lower z-index)

### Requirement: Background covers entire game area
The scrolling background SHALL cover the full width and height of the game container.

#### Scenario: Background fills game width
- **WHEN** the game container is rendered
- **THEN** the background SHALL extend across the full width of the container

#### Scenario: Background fills game height
- **WHEN** the game container is rendered
- **THEN** the background SHALL extend across the full height of the container

## MODIFIED Requirements

### Requirement: Score displays zero as letter O
The Score component SHALL display "O" (letter O) instead of "0" (digit zero) when the score value is zero, due to the custom Flappy Bird font displaying a logo for the digit.

#### Scenario: Score shows O when score is zero
- **WHEN** the score value is 0 or "0"
- **THEN** the Score component SHALL display "O" instead of "0"

#### Scenario: Score shows actual number when not zero
- **WHEN** the score value is greater than 0
- **THEN** the Score component SHALL display the actual numeric value

### Requirement: Score visible on crash screen
The Score SHALL be displayed on the GAME_OVER (crash) screen so players can see their final score.

#### Scenario: Score displays on game over screen
- **WHEN** game status changes to "GAME_OVER"
- **THEN** the final score SHALL be visible on the crash screen

#### Scenario: Score display is cleanly rendered
- **WHEN** rendering the GAME_OVER screen
- **THEN** the score SHALL be rendered in a maintainable way without inline flex-col styling mixed with game state
