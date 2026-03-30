## Context

The JS-driven background caused:
1. Next.js hydration errors (server renders 1920px, client renders actual window width)
2. Excessive re-renders (60fps state updates causing performance issues)

The JS approach worked smoothly when it ran, so we need to replicate that with CSS.

## Goals / Non-Goals

**Goals:**
- Seamless infinite scroll (like the JS approach)
- No hydration errors (server/client must match)
- No React re-renders during animation
- 60fps smooth scrolling on compositor thread

**Non-Goals:**
- Don't change scroll speed (keep at 4px/frame)
- Don't add parallax layers

## Decisions

### CSS Animation Setup

**Decision:** Use two separate image elements at 100% width each, positioned side-by-side, with CSS animation on a wrapper

**Rationale:**
- Two 100% width images = 200% total width wrapper
- Animate wrapper with translateX(-50%) 
- When animation completes one cycle, it seamlessly loops because image 2 is identical to image 1

```
┌─────────────────────────────────────────────────────────────┐
│                    WRAPPER (width: 200%)                    │
│  ┌──────────────────────┐  ┌──────────────────────┐        │
│  │    IMAGE 1 (100%)   │  │    IMAGE 2 (100%)   │        │
│  │    city.jpg          │  │    city.jpg         │        │
│  └──────────────────────┘  └──────────────────────┘        │
│  ←─────── translateX(-50%) ───────→                        │
│                                                             │
│  Animation resets at -50%, but since image 2 = image 1,   │
│  there's no visible seam!                                  │
└─────────────────────────────────────────────────────────────┘
```

### Background Component Structure

**Decision:** Use Next.js `<Image />` component with `fill` prop inside a wrapper div with CSS animation

**Implementation:**
```tsx
import Image from "next/image";

<div className="wrapper">
  <div className="image-container">
    <Image src="/assets/city.jpg" fill alt="Background" />
  </div>
  <div className="image-container">
    <Image src="/assets/city.jpg" fill alt="Background" />
  </div>
</div>

<style>
.wrapper {
  width: 200%;
  animation: scroll 10s linear infinite;
}
.image-container {
  position: relative;
  width: 50%;
  height: 100%;
}
.image-container img {
  object-fit: cover;
}
@keyframes scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
</style>
```

**Why Image over img:**
- Fixes lint warning: "Use `<Image />` instead of `<img>`"
- Next.js optimizes images automatically
- Lazy loading built-in
- Better caching and responsive serving

### Fix Hydration Error

**Decision:** Remove all client-side state from Background component - pure CSS, no useState, no window access

**Implementation:**
- Use static props only
- No window.innerWidth access
- No useEffect for resizing
- CSS handles all positioning

### Alternative Considered: CSS background-image

**Decision:** Use img elements instead of background-image

**Rationale:**
- More control over positioning
- Can use object-fit for consistent scaling
- Easier to debug

## Risks / Trade-offs

- [Risk] CSS animation might not sync perfectly with game loop timing
  - [Mitigation] Background doesn't need to sync with game loop - it's decorative

- [Risk] Fixed animation duration might not match visual speed preference
  - [Mitigation] Tune animation-duration to match desired scroll speed

## Open Questions

- Animation duration: 10s for one full cycle at speed 4? (Need to calibrate)
