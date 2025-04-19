import React from 'react';
import PuzzlePiece from './PuzzlePiece';
import SolutionArea from './SolutionArea';

const set1ColorMap: Record<number, { color: string; label: string }> = {
  1: { color: '#a78bfa', label: '' },
  2: { color: '#60a5fa', label: '' },
  3: { color: '#34d399', label: '' },
  4: { color: '#fbbf24', label: '' },
  5: { color: '#facc15', label: '' },
  6: { color: '#f87171', label: '' },
  7: { color: '#a16207', label: '' },
  8: { color: '#f3f4f6', label: '' },
  9: { color: '#a78bfa', label: '' }, // duplicate to make 10 pieces
  10: { color: '#60a5fa', label: '' },
};

const gridPositions = [
  { col: 1, row: 1 }, // top‑left
  { col: 3, row: 1 }, // top‑center
  { col: 5, row: 1 }, // top‑right
  { col: 5, row: 3 }, // mid‑right
  { col: 5, row: 5 }, // bottom‑right
  { col: 3, row: 5 }, // bottom‑center
  { col: 1, row: 5 }, // bottom‑left
  { col: 1, row: 3 }, // mid‑left
  { col: 2, row: 1 }, // between tl and tc
  { col: 4, row: 1 }, // between tc and tr
];

interface PuzzleBoardProps {
  emojiBoard?: string[];
}

const PuzzleBoard: React.FC<PuzzleBoardProps> = ({ emojiBoard }) => {
  // Build 10 pieces from mapping for the surrounding layout
  const piecesToRender = Array.from({ length: 10 }, (_, idx) => {
    const id = idx + 1;
    return {
      id,
      color: set1ColorMap[id].color,
      label: set1ColorMap[id].label,
    };
  });

  return (
    <div className="container mx-auto flex flex-col items-center">
      <div className="grid grid-cols-5 grid-rows-5 gap-2 justify-items-center items-center w-[600px] h-[600px]">
        {/* Render puzzle pieces in predefined grid positions */}
        {piecesToRender.map((piece, idx) => (
          <div
            key={piece.id}
            className="transform hover:scale-105 transition-transform duration-200"
            style={{ gridColumnStart: gridPositions[idx].col, gridRowStart: gridPositions[idx].row }}
          >
            <PuzzlePiece piece={piece as any} />
          </div>
        ))}

        {/* Central solution area spanning 3x3 */}
        <div className="col-start-2 col-span-3 row-start-2 row-span-3 flex items-center justify-center">
          <SolutionArea emojiBoard={emojiBoard} />
        </div>
      </div>
    </div>
  );
};

export default PuzzleBoard;