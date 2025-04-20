import { PuzzlePiece, SolutionOption } from '../types';

export const puzzlePieces: PuzzlePiece[] = [
  { id: 1, color: '#9B59B6', label: 'Piece 1', shape: [
    '##..',
    '.#..',
    '.#..',
    '.#..',
    '....',
  ] },
  { id: 2, color: '#3498DB', label: 'Piece 2', shape: [
    '#...',
    '##..',
    '.#..',
    '.#..',
    '....',
  ] },
  { id: 3, color: '#2ECC71', label: 'Piece 3', shape: [
    '####',
    '#...',
    '....',
    '....',
    '....',
  ] },
  { id: 4, color: '#E67E22', label: 'Piece 4', shape: [
    '.##.',
    '.#..',
    '##..',
    '....',
    '....',
  ] },
  { id: 5, color: '#9B59B6', label: 'Piece 5', shape: [
    '#...',
    '#...',
    '#...',
    '#...',
    '....',
  ] },
  { id: 6, color: '#E74C3C', label: 'Piece 6', shape: [
    '#...',
    '#...',
    '###.',
    '....',
    '....',
  ] },
  { id: 7, color: '#3498DB', label: 'Piece 7', shape: [
    '##..',
    '##..',
    '.#..',
    '....',
    '....',
  ] },
  { id: 8, color: '#FFFFFF', label: 'Piece 8', shape: [
    '###.',
    '.#..',
    '.#..',
    '....',
    '....',
  ] },
  { id: 9, color: '#F1C40F', label: 'Piece 9', shape: [
    '##..',
    '#...',
    '##..',
    '....',
    '....',
  ] },
  { id: 10, color: '#8B4513', label: 'Piece 10', shape: [
    '.#..',
    '##..',
    '#...',
    '....',
    '....',
  ] }
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