## 1. Fix Score Zero Display Bug

- [x] 1.1 Fix the comparison operator in Score.tsx - change `if ((score = 0))` to `if (score === 0 || score === "0")`
- [x] 1.2 Verify score displays "O" instead of "0" when score is zero
- [x] 1.3 Test score displays correctly for non-zero values
- [x] 1.4 Use Arial/Helvetica font for Score instead of Flappy Bird font (add font-sans class)

## 2. Clean Up Crash Screen Score Display

- [x] 2.1 Review current Score rendering in GAME_OVER section of page.tsx
- [x] 2.2 Refactor inline flex-col styling to be cleaner and more maintainable
- [x] 2.3 Verify score is visible on crash screen after refactoring

## 3. Implement Scrolling Background

- [x] 3.1 Create Background component in src/components/
- [x] 3.2 Implement CSS animation for continuous right-to-left scrolling
- [x] 3.3 Set scroll speed to match GAME_CONFIG.PIPE_SPEED
- [x] 3.4 Ensure background has lower z-index than pipes and bird
- [x] 3.5 Make background cover full game container width and height
- [x] 3.6 Implement seamless looping (reset position when scrolled past)
- [x] 3.7 Add background image support (user will provide image)

## 4. Integrate Background into Game

- [x] 4.1 Import and add Background component to page.tsx
- [x] 4.2 Position Background behind other game elements
- [ ] 4.3 Test that background scrolls during gameplay
- [ ] 4.4 Verify parallax effect with pipes moving together

## 5. Testing and Verification

- [ ] 5.1 Test score displays "O" at zero
- [ ] 5.2 Test score displays correctly on crash screen
- [ ] 5.3 Test background scrolls smoothly
- [ ] 5.4 Test all features work together during gameplay
- [ ] 5.5 Run linting to ensure code quality
