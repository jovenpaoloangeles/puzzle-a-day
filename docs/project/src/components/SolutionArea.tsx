import React from 'react';

interface SolutionAreaProps {
  emojiBoard?: string[];
}

const SolutionArea: React.FC<SolutionAreaProps> = ({ emojiBoard }) => {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center aspect-square bg-gray-50 w-[280px] h-[280px]">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Today's Solution</h3>
        {emojiBoard && emojiBoard.length > 0 ? (
          <div className="emoji-board bg-gray-300 rounded-md p-1 inline-block" style={{ width: '200px', height: '200px' }}>
            <div className="grid grid-cols-7 gap-0">
              {emojiBoard.map((row, rowIdx) => (
                Array.from(row).map((cell, colIdx) => (
                  <div 
                    key={`${rowIdx}-${colIdx}`}
                    className="flex items-center justify-center"
                    style={{
                      width: '24px', 
                      height: '24px',
                      visibility: cell === '⬛' ? 'hidden' : 'visible',
                      fontSize: 24,
                    }}
                  >
                    {cell}
                  </div>
                ))
              ))}
            </div>
          </div>
        ) : (
          <div className="h-44 w-44 bg-gray-200 rounded-md flex items-center justify-center mx-auto">
            <div className="h-2 w-2 bg-white rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};


export default SolutionArea;