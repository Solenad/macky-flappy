export type GameStatus = "START" | "PLAYING" | "GAME_OVER";

export interface Bird {
  y: number;
  velocity: number;
  width: number;
  height: number;
}

export interface Pipe {
  x: number;
  topHeight: number;
  width: number;
  passed: boolean;
}

export interface GameState {
  status: GameStatus;
  bird: Bird;
  pipes: Pipe[];
  score: number;
  highScore: number;
  canvasHeight: number;
}
