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
  const [data, setData] = useState<DailyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<number>(1); // 0:left, 1:center, 2:right

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    // Get base URL from import.meta.env.BASE_URL (provided by Vite)
    const baseUrl = import.meta.env.BASE_URL || '/';
    const url = `${baseUrl}data/sample-${yyyy}-${mm}-${dd}.json`;
    console.log('Fetching data from:', url);
    setLoading(true);
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Data not found');
        return res.json();
      })
      .then(setData)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error || !data) return <div className="text-center text-red-600 p-8">{error || 'No data available.'}</div>;

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4 pb-12 flex flex-col items-center">
        <Header title="Puzzle-A-Day" date={new Date(data.date)} />
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