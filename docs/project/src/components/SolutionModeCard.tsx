import React from 'react';
import SolutionMiniBoard from './SolutionMiniBoard';

interface SolutionModeCardProps {
  label: string;
  solution: any;
  total: number;
}

const SolutionModeCard: React.FC<SolutionModeCardProps> = ({
  label,
  solution,
  total
}) => {
  return (
    <div 
      className={`relative flex flex-col rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-200`}
    >
      <div className="p-4">
        <h3 className="text-center font-medium text-gray-800 mb-4">{label}</h3>
        <div className="flex justify-center mb-4">
          <div className="bg-gray-100 border border-gray-300 rounded-md flex items-center justify-center p-2" style={{ width: 135, height: 145 }}>
            <SolutionMiniBoard pieces={solution.pieces || []} board={solution.board} emojiBoard={solution.emoji_board} cellSize={16} />
          </div>
        </div>
        <div className="text-center text-gray-600 font-medium">
          Total possible solutions: {total}
        </div>
      </div>
    </div>
  );
};

export default SolutionModeCard;