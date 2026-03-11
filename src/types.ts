export type Mode = 'read' | 'game';
export type Difficulty = 'one_tone' | 'colored';
export type GridSize = 3 | 4 | 5;

export interface GameConfig {
  mode: Mode;
  difficulty: Difficulty;
  gridSize: GridSize;
  timeLimit: number;
}

export interface GridNumber {
  value: number;
  color: string;
  found?: boolean;
}

export interface GameStat {
  number: number;
  timeTaken: number;
}
