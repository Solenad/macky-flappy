## MODIFIED Requirements

### Requirement: Background scrolls infinitely without visible gaps
The background city image SHALL scroll continuously in a seamless loop without any visible gaps or abrupt resets.

#### Scenario: CSS animation with two images
- **WHEN** the background component renders
- **THEN** it renders two Next.js Image components with fill prop side-by-side, each at 50% of wrapper width

#### Scenario: Seamless loop animation
- **WHEN** the CSS animation translates to -50%
- **THEN** it resets to 0 and loops seamlessly because image 2 is identical to image 1

#### Scenario: No hydration mismatch
- **WHEN** the page loads on server and client
- **THEN** both render identical HTML with no client-side state changes

### Requirement: Pure CSS implementation with no client-side state
The background SHALL use only CSS for animation with no JavaScript state or effects.

#### Scenario: No useState in component
- **WHEN** Background component is examined
- **THEN** it contains no useState hooks

#### Scenario: No useEffect in component
- **WHEN** Background component is examined
- **THEN** it contains no useEffect hooks

#### Scenario: No window access
- **WHEN** Background component renders
- **THEN** it does not access window.innerWidth or other browser APIs

### Requirement: Background scrolls at configured speed
The background SHALL scroll at 4 pixels per frame equivalent speed.

#### Scenario: Animation duration matches scroll speed
- **WHEN** BACKGROUND_SCROLL_SPEED is 4 and canvas width is 1920px
- **THEN** animation duration is calibrated to complete one cycle in ~10 seconds
