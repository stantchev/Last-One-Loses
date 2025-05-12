export type Player = 'human' | 'ai';

export interface GameState {
  rows: number[];
  currentPlayer: Player;
  gameOver: boolean;
  winner: Player | null;
  message: string;
  lastMove: string | null;
}

export type GameAction =
  | { type: 'REMOVE_LINES'; payload: { count: number; rowIndex: number } }
  | { type: 'AI_MOVE' }
  | { type: 'RESET_GAME' };
