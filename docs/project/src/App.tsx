import { useState } from 'react';
import Header from './components/Header';
import PuzzleBoard from './components/PuzzleBoard';
import SolutionModes from './components/SolutionModes';
import { usePuzzleData } from './contexts/PuzzleDataContext';

// PuzzlePiece shape is now handled directly in the PuzzlePiece component

function App() {
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const today = new Date();
    // Default to today if it's 2026
    if (today.getFullYear() === 2026) return today;
    return new Date(2026, 0, 1); // Jan 1, 2026
  });
  const [selectedMode, setSelectedMode] = useState<number>(1); // 0:left, 1:center, 2:right

  // Get puzzle data from context
  const { loading, error, getDataForDate } = usePuzzleData();
  const data = getDataForDate(selectedDate);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-2xl font-semibold mb-2">Loading Puzzle Data...</div>
          <div className="text-gray-600">Please wait while we load the puzzle solutions</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="text-xl text-red-600 font-semibold mb-2">
          Failed to load puzzle data
        </div>
        <div className="text-gray-700 mb-4">
          {error}
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] p-8">
        <div className="text-xl text-red-600 font-semibold mb-2">
          No puzzle data found for this date.
        </div>
        <div className="text-gray-700 mb-4">
          Please select another date from the dropdown above.
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          onClick={() => {
            const today = new Date();
            if (today.getFullYear() === 2026) {
              setSelectedDate(today);
            } else {
              setSelectedDate(new Date(2026, 0, 1));
            }
          }}
        >
          Reset to Today
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4 pb-12 flex flex-col items-center">
        <Header
          title="Puzzle-A-Day Solution"
          date={selectedDate}
          onDateChange={setSelectedDate}
        />
        <div className="my-4">
          <PuzzleBoard emojiBoard={data.main_solution.emoji_board} />
        </div>
        <div className="mt-8 mb-4 w-full max-w-4xl">
          <SolutionModes
            panels={data.panels.map((panel, idx) => {
              // Prefer first solution in 'solutions' array, fallback to 'solution' object
              const sol = (panel.solutions && panel.solutions.length > 0) ? panel.solutions[0] : panel.solution;
              return {
                label: panel.label,
                solution: sol,
                emojiBoard: sol?.emoji_board,
                total: panel.total_solutions,
                selected: selectedMode === idx,
                onSelect: () => setSelectedMode(idx)
              };
            })}
          />
        </div>
      </div>
    </div>
  );
}

export default App;