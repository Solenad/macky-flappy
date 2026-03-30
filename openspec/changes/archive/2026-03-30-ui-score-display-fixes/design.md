## Context

The Macky Flappy game has three UI improvements needed:

1. **Score zero bug**: The Score component (line 8) uses assignment `=` instead of comparison `===`: `if ((score = 0)) score = "O";`. This assigns 0 to score rather than checking if it's zero. Additionally, the custom "Flappy Bird" font displays a bird logo for the digit "0", so we need to show "O" instead.

2. **Messy crash screen**: In page.tsx lines 83-85, the Score is rendered inline with the GAME_OVER screen using flex-col classes that mix presentation with game state. This should be cleaned up.

3. **No parallax background**: Currently the game has static sky background. Adding a continuously scrolling background that moves with pipe speed will create the illusion of forward movement.

## Goals / Non-Goals

**Goals:**
- Fix Score component to correctly display "O" instead of "0" when score is zero
- Clean up the GAME_OVER screen score rendering for better maintainability
- Add scrolling background that moves in sync with pipes

**Non-Goals:**
- Not adding new game mechanics or changing gameplay
- Not modifying the pipe rendering logic
- Not adding audio or sound effects

## Decisions

### Decision 1: Fix Score zero conversion

**Choice**: Change `if ((score = 0))` to `if (score === 0 || score === "0")`

**Rationale**: The current code has a bug - it uses assignment instead of comparison. We need to check if score equals zero and convert it to "O". Since score can be either string or number type (based on the interface), we check for both.

### Decision 2: Clean up GAME_OVER score rendering

**Choice**: Extract score display into a dedicated component or clean up inline rendering

**Rationale**: Rather than inlining the Score component with flex-col classes in page.tsx, create a cleaner separation. Could either:
- Move the Score to a separate area of the screen with proper styling
- Create a GameOverScreen component that encapsulates the crash UI

We'll go with cleaning up the inline JSX in page.tsx to be more readable.

### Decision 3: Scrolling background implementation

**Choice**: Use CSS animation with translateX for smooth scrolling, synchronized with pipe movement

**Rationale**: 
- CSS animations are more performant than JS-based position updates
- Using `animation: scroll` with infinite loop creates seamless scrolling
- The background speed should match pipe speed (GAME_CONFIG.PIPE_SPEED) for proper parallax

**Alternatives considered**:
- JS-based scrolling in game loop: More complex, triggers more re-renders
- Canvas-based background: Would require significant refactoring of rendering approach

### Decision 4: Background image source

**Choice**: Use a simple pattern/gradient or find a suitable public domain background

**Rationale**: User will provide/add background image. The implementation should support any image URL and handle seamless tiling.

## Risks / Trade-offs

- **Risk**: Background image may not tile seamlessly → Mitigation: Use CSS background-repeat and ensure image dimensions work for tiling, or use two overlapping background elements for smooth looping
- **Risk**: Animation speed may not perfectly sync with pipes → Mitigation: Use CSS animation duration calculated from pipe speed, allow easy adjustment via constants
- **Risk**: Custom font may have other special characters → Mitigation: Focus only on the "0" to "O" fix for now

## Migration Plan

1. Fix Score.tsx - update the zero comparison logic
2. Clean up page.tsx GAME_OVER section - improve readability
3. Add Background component with scrolling animation
4. Update page.tsx to include Background component
5. Test all three features work together
