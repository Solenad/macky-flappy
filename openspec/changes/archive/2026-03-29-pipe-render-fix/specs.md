## ADDED Requirements

<!-- No new capabilities - this is a bug fix -->

## MODIFIED Requirements

<!-- No spec-level behavior changes - this is an implementation-level bug fix -->

## Notes

This change is a pure bug fix with no capability or requirement changes:

- **Problem**: Pipes not visible due to z-index and hardcoded constants
- **Solution**: Fix z-index values and pass actual canvas width to game loop
- **Scope**: Limited to 3 files (constants.ts, useGameLoop.ts, Pipe.tsx)

No specification files required as this does not introduce new behavior or change existing requirements.
