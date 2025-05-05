import { useEffect, useState } from 'react';
import Header from './components/Header';
import PuzzleBoard from './components/PuzzleBoard';
import SolutionModes from './components/SolutionModes';
// import { puzzlePieces, solutionOptions } from './data/puzzleData';

interface Piece {
  id: string;
  position: [number, number];
  orientation: number;
}
interface Solution {
  board: string;
  pieces: Piece[];
  emoji_board?: string[];
}
interface PanelData {
  label: string;
  set: string;
  reflections: boolean;
  solutions?: Solution[]; // new structure: array of solutions
  solution?: Solution;    // old structure: single solution
  total_solutions: number;
}
interface DailyData {
  date: string;
  main_solution: Solution;
  panels: PanelData[];
}

// PuzzlePiece shape is now handled directly in the PuzzlePiece component

function App() {
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const today = new Date();
    // Only allow 2025
    if (today.getFullYear() === 2025) return today;
    return new Date(2025, 4, 5); // May 5, 2025
  });
  const [data, setData] = useState<DailyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<number>(1); // 0:left, 1:center, 2:right

  useEffect(() => {
    const yyyy = selectedDate.getFullYear();
    const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const dd = String(selectedDate.getDate()).padStart(2, '0');
    // Get base URL from import.meta.env.BASE_URL (provided by Vite)
    const baseUrl = import.meta.env.BASE_URL || '/';
    const url = `${baseUrl}data/sample-${yyyy}-${mm}-${dd}.json`;
    console.log('Fetching data from:', url);
    setLoading(true);
    setError(null);
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Data not found');
        return res.json();
      })
      .then(setData)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [selectedDate]);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error || !data) return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] p-8">
      <div className="text-xl text-red-600 font-semibold mb-2">
        {error ? `No puzzle data found for this date.` : 'No data available.'}
      </div>
      <div className="text-gray-700 mb-4">
        Please select another date from the dropdown above.
      </div>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        onClick={() => {
          const today = new Date();
          if (today.getFullYear() === 2025) {
            setSelectedDate(today);
          } else {
            setSelectedDate(new Date(2025, 4, 5));
          }
        }}
      >
        Reset to Today
      </button>
    </div>
  );

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