import React from 'react';
import { PuzzlePiece as PuzzlePieceType } from '../types';

interface PuzzlePieceProps {
  piece: PuzzlePieceType;
  onClick?: () => void;
}

// Piece shapes are no longer used as we're just showing colored blocks

const PuzzlePiece: React.FC<PuzzlePieceProps> = ({ piece, onClick }) => {
  return (
    <div
      className="rounded-lg shadow-sm cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-105 flex items-center justify-center"
      style={{ 
        backgroundColor: piece.color, 
        width: '90px', 
        height: '90px',
        color: '#333',
        fontWeight: 500 
      }}
      onClick={onClick}
    >
      <span className="text-center">{piece.label || `Piece ${piece.id}`}</span>
    </div>
  );
};

export default PuzzlePiece;