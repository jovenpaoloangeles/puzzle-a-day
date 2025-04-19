export interface PuzzlePiece {
  id: number;
  color: string;
  label: string;
}

export type SolutionMode = 'rough' | 'reflections' | 'smooth';

export interface SolutionOption {
  id: string;
  title: string;
  count: number;
  color: string;
  textColor: string;
}