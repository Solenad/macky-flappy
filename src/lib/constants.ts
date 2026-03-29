export const GAME_CONFIG = {
  BIRD_WIDTH: 38, // 34px body + 4px beak extension
  BIRD_HEIGHT: 24,
  BIRD_X_POSITION: 80, // Horizontal position (matches pl-20 in page.tsx)
  GRAVITY: 0.5,
  JUMP_STRENGTH: -10,
  PIPE_SPEED: 4,
  PIPE_SPAWN_RATE: 1500, // ms
  PIPE_WIDTH: 60,
  PIPE_GAP: 160,
  CANVAS_WIDTH: 100,
  CANVAS_HEIGHT: 100,
  GROUND_HEIGHT: 90,
  // Sprite configuration (set to null to use colored div fallback)
  SPRITES: {
    bird: "/assets/macky.png", // Next.js serves public/ from root
    pipe: null, // e.g., "/assets/pipe.png" - set path to enable
  },
};
