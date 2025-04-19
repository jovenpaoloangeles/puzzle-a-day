import * as React from 'react';

export interface Piece {
  id: string;
  position: [number, number];
  orientation: number;
}

export interface SolutionMiniBoardProps {
  board?: string;
  pieces: Piece[];
  emojiBoard?: string[];
  cellSize?: number;
}

// Simple visualization: 6x6 grid, pieces as colored blocks
const COLORS = [
  '#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f472b6', '#facc15', '#4ade80', '#38bdf8', '#818cf8'
];

export const SolutionMiniBoard: React.FC<SolutionMiniBoardProps> = ({ pieces, emojiBoard, cellSize = 18 }) => {
  const gridSize = 6;
  if (emojiBoard && emojiBoard.length > 0) {
    return (
      <div
        className="emoji-board"
        style={{
          background: 'lightgray',
          border: '1px solid #e5e7eb',
          borderRadius: 0,
          padding: 0,
          display: 'inline-block',
          width: '130px',
          height: '130px',
        }}
      >
        <div className="grid grid-cols-7 gap-0">
          {emojiBoard.map((row, rowIdx) => (
            Array.from(row).map((cell, colIdx) => (
              <div
                key={`${rowIdx}-${colIdx}`}
                className="flex items-center justify-center"
                style={{
                  width: '16px',
                  height: '16px',
                  visibility: cell === '⬛' ? 'hidden' : 'visible',
                  fontSize: 16,
                }}
              >
                {cell}
              </div>
            ))
          ))}
        </div>
      </div>
    );
  }
  // fallback to old rendering if emojiBoard not provided
  // Map piece id to color
  const colorMap: Record<string, string> = Object.fromEntries(pieces.map((p: Piece, i: number) => [p.id, COLORS[i % COLORS.length]]));

  // Build a grid with piece ids or null
  const grid: (string | null)[][] = Array.from({ length: gridSize }, () => Array(gridSize).fill(null));
  pieces.forEach((piece: Piece) => {
    const [r, c] = piece.position;
    if (r >= 0 && r < gridSize && c >= 0 && c < gridSize) {
      grid[r][c] = piece.id;
    }
  });

  return (
    <svg width={cellSize * gridSize} height={cellSize * gridSize} style={{ background: '#f3f4f6', borderRadius: 6 }}>
      {grid.map((row: (string | null)[], r: number) => row.map((pid: string | null, c: number) => (
        <rect
          key={r + '-' + c}
          x={c * cellSize}
          y={r * cellSize}
          width={cellSize - 2}
          height={cellSize - 2}
          fill={pid ? colorMap[pid] : '#e5e7eb'}
          stroke="#fff"
          strokeWidth={1}
          rx={3}
        />
      )))}
    </svg>
  );
};

export default SolutionMiniBoard;
