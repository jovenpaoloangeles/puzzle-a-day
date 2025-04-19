import { PuzzlePiece, SolutionOption } from '../types';

export const puzzlePieces: PuzzlePiece[] = [
  { id: 1, color: '#C5DCFA', label: 'Piece 1' },
  { id: 2, color: '#C5F5D5', label: 'Piece 2' },
  { id: 3, color: '#FBBFBF', label: 'Piece 3' },
  { id: 4, color: '#FEF68D', label: 'Piece 4' },
  { id: 5, color: '#E3CBFF', label: 'Piece 5' },
  { id: 6, color: '#FFDCBA', label: 'Piece 6' },
  { id: 7, color: '#A5EEE0', label: 'Piece 7' },
  { id: 8, color: '#FDC5E1', label: 'Piece 8' },
  { id: 9, color: '#B7E4F9', label: 'Piece 9' },
  { id: 10, color: '#FFB7B7', label: 'Piece 10' }
];

export const solutionOptions: SolutionOption[] = [
  { 
    id: 'rough', 
    title: 'Rough Side Only', 
    count: 42,
    color: '#3B82F6',
    textColor: 'white' 
  },
  { 
    id: 'reflections', 
    title: 'With Reflections', 
    count: 78,
    color: '#10B981',
    textColor: 'white' 
  },
  { 
    id: 'smooth', 
    title: 'Smooth Side Only', 
    count: 36,
    color: '#8B5CF6',
    textColor: 'white' 
  },
];