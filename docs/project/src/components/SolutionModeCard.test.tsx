import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SolutionModeCard from './SolutionModeCard';

describe('SolutionModeCard Component', () => {
  const mockSolution = {
    pieces: [],
    board: 'board',
    emoji_board: ['🟥🟥', '🟥⬛']
  };

  it('renders label and total solutions', () => {
    render(<SolutionModeCard label="Test Mode" solution={mockSolution} total={42} />);
    
    expect(screen.getByText('Test Mode')).toBeInTheDocument();
    expect(screen.getByText('Total possible solutions: 42')).toBeInTheDocument();
  });

  it('renders the mini board with emoji', () => {
    render(<SolutionModeCard label="Mode" solution={mockSolution} total={1} />);
    // Check for 🟥 which should be in the mini board
    const cells = screen.getAllByText('🟥');
    expect(cells.length).toBeGreaterThan(0);
  });
});
