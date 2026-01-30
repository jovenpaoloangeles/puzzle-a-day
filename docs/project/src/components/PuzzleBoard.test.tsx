import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PuzzleBoard from './PuzzleBoard';
import PuzzlePiece from './PuzzlePiece';

describe('PuzzlePiece Component', () => {
  const mockPiece = {
    id: 1,
    color: '#9B59B6',
    label: 'Piece 1',
    shape: ['##', '#.']
  };

  it('renders the piece with correct color', () => {
    const { container } = render(<PuzzlePiece piece={mockPiece as any} />);
    const cells = container.querySelectorAll('div[style*="background-color: rgb(155, 89, 182)"]');
    // '#9B59B6' is rgb(155, 89, 182)
    expect(cells.length).toBe(3); // 3 '#' in shape
  });
});

describe('PuzzleBoard Component', () => {
  it('renders the central solution area', () => {
    render(<PuzzleBoard />);
    expect(screen.getByText("Today's Solution")).toBeInTheDocument();
  });

  it('renders emoji board in solution area', () => {
    const mockEmojiBoard = [
        '🟥🟥',
        '🟥⬛'
    ];
    render(<PuzzleBoard emojiBoard={mockEmojiBoard} />);
    const emojiCells = screen.getAllByText('🟥');
    expect(emojiCells.length).toBe(3);
  });
});