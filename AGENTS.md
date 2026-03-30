# AGENTS.md - Agent Coding Guidelines for Macky Flappy

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

## Build, Lint, and Test Commands

```bash
# Development
npm run dev              # Start Next.js dev server (http://localhost:3000)

# Build
npm run build            # Production build
npm run start            # Start production server

# Linting
npm run lint             # Run ESLint on entire project

# TypeScript
npx tsc --noEmit        # Type check without emitting files
```

---

## Code Style Guidelines

### General Principles
- Keep files small and focused (single responsibility)
- Use functional components with hooks over class components
- Prefer composition over inheritance
- Write self-documenting code with clear variable/function names

### TypeScript
- **Always use explicit types** for function parameters and return types
- Use `interface` for object shapes, `type` for unions/aliases
- Avoid `any` - use `unknown` when type is truly unknown
- Use strict null checks (TypeScript strict mode enabled)

```typescript
// Good
interface PipeProps {
  x: number;
  topHeight: number;
  canvasHeight: number;
}

function calculatePosition(x: number, y: number): { left: string; top: string } {
  return { left: `${x}px`, top: `${y}px` };
}

// Avoid
function badExample(x, y) {
  return { left: x, top: y };
}
```

### React/Next.js Conventions
- Use `"use client"` directive for client-side components
- Use `useCallback` for functions passed as props to prevent unnecessary re-renders
- Use `useRef` for values that don't need to trigger re-renders
- Use proper dependency arrays in useEffect/useCallback
- Define component interfaces outside the component (for clarity)

```typescript
// Good - interface outside component
interface BirdProps {
  y: number;
  velocity: number;
}

export default function Bird({ y, velocity }: BirdProps) {
  const rotation = useMemo(() => Math.min(Math.max(velocity * 4, -20), 90), [velocity]);
  return <div style={{ transform: `translateY(${y}px) rotate(${rotation}deg)` }} />;
}
```

### Imports
- Use path aliases (`@/` for src/)
- Order imports: external libs → internal imports → types → constants
- Group by: React imports, other external, internal components/hooks

```typescript
// 1. React (if needed)
import { useState, useEffect, useCallback, useRef } from "react";

// 2. External libraries
import { useRouter } from "next/navigation";

// 3. Internal - components, hooks
import Bird from "@/components/Bird";
import Pipe from "@/components/Pipe";
import { useControls } from "@/hooks/useControls";

// 4. Types
import { GameStatus } from "@/types/game";

// 5. Constants/config
import { GAME_CONFIG } from "@/lib/constants";
```

### Naming Conventions
- **Files**: kebab-case (e.g., `use-game-loop.ts`, `pipe.tsx`)
- **Components**: PascalCase (e.g., `Bird.tsx`, `Score.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useGameLoop`, `useControls`)
- **Interfaces/Types**: PascalCase (e.g., `GameStatus`, `PipeProps`)
- **Constants**: SCREAMING_SNAKE_CASE for config (e.g., `GAME_CONFIG`)

### CSS/Tailwind
- Use Tailwind utility classes where possible
- Use inline styles only for dynamic values (from props/state)
- Keep z-index values documented and consistent
- Prefer Tailwind over custom CSS

```typescript
// Good - Tailwind for static, inline for dynamic
<div className="absolute bottom-0 w-full bg-emerald-500 z-20" 
     style={{ height: GAME_CONFIG.GROUND_HEIGHT + "px" }} />
```

### Error Handling
- Use try-catch for async operations
- Handle edge cases explicitly (empty arrays, null values)
- Return early to avoid nested conditionals

### Game Loop Best Practices
- Use `requestAnimationFrame` for game loops
- Use refs for values that change frequently to avoid stale closures
- Keep game state separate from UI state where possible
- Avoid triggering re-renders on every frame (use refs, batch updates)

---

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── page.tsx         # Main game page
│   └── layout.tsx       # Root layout
├── components/         # React components
│   ├── Bird.tsx        # Bird sprite/render
│   ├── Pipe.tsx        # Pipe sprite/render
│   └── ui/             # UI components (Score, GameOver)
├── hooks/              # Custom React hooks
│   ├── useGameLoop.ts # Main game loop logic
│   └── useControls.ts # Input handling
├── lib/                # Utilities and constants
│   ├── constants.ts    # Game configuration
│   └── physics.ts      # Physics calculations
├── types/              # TypeScript type definitions
│   └── game.ts         # Game-related types
└── utils/              # Helper functions
    └── storage.ts      # LocalStorage helpers
```

---

## Common Patterns

### Game State Updates (avoiding stale closures)
```typescript
// Use refs + useEffect sync pattern
const gameStateRef = useRef(initialState);

useEffect(() => {
  gameStateRef.current = gameState;
}, [gameState]);

// Or use functional updates
setPipes(prevPipes => {
  const newPipes = prevPipes.map(pipe => ({ ...pipe, x: pipe.x - speed }));
  return newPipes;
});
```

### Handling Window Dimensions
```typescript
const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

useEffect(() => {
  setDimensions({ width: window.innerWidth, height: window.innerHeight });
  
  const handleResize = () => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  };
  
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

---

## Debugging Tips

- Use browser DevTools to inspect React components
- Add `console.log` with context for debugging
- Check React DevTools for component state
- Verify z-index layering when elements aren't visible

---

## Lessons Learned (Bugs to Avoid)

### Bug: Pipes not appearing due to game loop state issue

**Date:** March 2026
**Issue:** Pipes spawned but never rendered on screen
**Root Cause:** Using canvas dimensions directly in useCallback dependencies

**The Problem:**
When `canvasWidth` or `canvasHeight` were included in the useCallback dependencies for the game loop, any change to these values (e.g., from window resize) caused React to recreate the callback. This restarted the game loop, and because `setPipes` uses functional updates with `prevPipes`, the new callback ran before React had updated the state - resulting in an empty array every frame.

**The Fix:**
1. Use refs (`canvasWidthRef`, `canvasHeightRef`) for dimension values accessed inside the game loop
2. Sync refs with useEffect when dimensions change
3. Use refs instead of functional state updates when inside requestAnimationFrame

```typescript
// BAD - causes bug
const update = useCallback(() => {
  setPipes((prevPipes) => {
    // prevPipes is stale because React hasn't rendered yet!
    const movedPipes = prevPipes.map(...);
    // ...
  });
}, [canvasWidth, canvasHeight]); // This dependency causes the bug!

// GOOD - use refs
const canvasWidthRef = useRef(canvasWidth);
const canvasHeightRef = useRef(canvasHeight);

useEffect(() => {
  canvasWidthRef.current = canvasWidth;
}, [canvasWidth]);

useEffect(() => {
  canvasHeightRef.current = canvasHeight;
}, [canvasHeight]);

const update = useCallback(() => {
  setPipes(() => {
    // Use ref for latest values
    const currentPipes = pipesRef.current;
    const movedPipes = currentPipes.map(...);
    // ...
  });
}, [status, onGameOver]); // No canvas dimensions in deps!
```

**Key Insight:** In game loops using `requestAnimationFrame`, always use refs for values that change frequently. The React render cycle and the animation frame cycle are not synchronized.
