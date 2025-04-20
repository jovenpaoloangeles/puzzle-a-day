import React from 'react';
import { PuzzlePiece as PuzzlePieceType } from '../types';

interface PuzzlePieceProps {
  piece: PuzzlePieceType;
  onClick?: () => void;
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = ({ piece, onClick }) => {
  const shape = piece.shape;
  return (
    <div
      className="rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center"
      style={{ 
        backgroundColor: '#00000000', // neutral background
        width: '90px', 
        height: '90px',
        color: '#333',
        fontWeight: 500 
      }}
      onClick={onClick}
    >
      {shape ? (
        <div className="flex flex-col items-center justify-center" style={{width: '90px', height: '90px'}}>
          {shape.map((row, rowIdx) => (
            <div key={rowIdx} className="flex flex-row justify-center" style={{height: '30px'}}>
              {row.split('').map((cell, colIdx) => (
                <div
                  key={colIdx}
                  style={{
                    width: '15px',
                    height: '15px',
                    backgroundColor: cell === '#' ? piece.color : 'transparent',
                    margin: '1px',
                    borderRadius: '0px',
                    border: cell === '#' ? '1px solid #888' : '1px solid transparent',
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default PuzzlePiece;