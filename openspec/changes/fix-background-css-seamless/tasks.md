## 1. Implement CSS Background

- [x] 1.1 Rewrite Background.tsx with pure CSS approach - render two Next.js Image components with fill prop
- [x] 1.2 Remove all useState, useEffect, useRef from Background component
- [x] 1.3 Use CSS animation with translateX(-50%) on wrapper div
- [x] 1.4 Ensure no window access or client-side state
- [x] 1.5 Import Image from next/image (fixes lint warning)

## 2. Update CSS Animation

- [x] 2.1 Ensure globals.css has correct scroll animation
- [x] 2.2 Calibrate animation duration to ~10s for smooth scrolling

## 3. Verify

- [x] 3.1 Run npm run build to verify no build errors
- [x] 3.2 Start dev server and verify no hydration error on refresh
- [x] 3.3 Verify background scrolls seamlessly without gaps
