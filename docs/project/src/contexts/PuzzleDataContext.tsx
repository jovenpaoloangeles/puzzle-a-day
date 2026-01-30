import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  solutions?: Solution[];
  solution?: Solution;
  total_solutions: number;
}

export interface DailyData {
  date: string;
  main_solution: Solution;
  panels: PanelData[];
}

interface PuzzleDataContextType {
  data: Record<string, DailyData> | null;
  loading: boolean;
  error: string | null;
  getDataForDate: (date: Date) => DailyData | null;
}

const PuzzleDataContext = createContext<PuzzleDataContextType | undefined>(undefined);

interface PuzzleDataProviderProps {
  children: ReactNode;
  year?: number;
}

export function PuzzleDataProvider({ children, year = 2025 }: PuzzleDataProviderProps) {
  const [data, setData] = useState<Record<string, DailyData> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const baseUrl = import.meta.env.BASE_URL || '/';
    const url = `${baseUrl}data/puzzles_${year}.json`;
    
    console.log(`Loading consolidated puzzle data from: ${url}`);
    setLoading(true);
    setError(null);

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to load puzzle data for ${year}: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((jsonData: Record<string, DailyData>) => {
        console.log(`✅ Loaded ${Object.keys(jsonData).length} days of puzzle data`);
        setData(jsonData);
      })
      .catch(e => {
        console.error('❌ Error loading puzzle data:', e);
        setError(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [year]);

  const getDataForDate = (date: Date): DailyData | null => {
    if (!data) return null;
    
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const dateKey = `${yyyy}-${mm}-${dd}`;
    
    return data[dateKey] || null;
  };

  return (
    <PuzzleDataContext.Provider value={{ data, loading, error, getDataForDate }}>
      {children}
    </PuzzleDataContext.Provider>
  );
}

export function usePuzzleData() {
  const context = useContext(PuzzleDataContext);
  if (context === undefined) {
    throw new Error('usePuzzleData must be used within a PuzzleDataProvider');
  }
  return context;
}
