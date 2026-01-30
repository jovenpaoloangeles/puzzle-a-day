import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PuzzleDataProvider, usePuzzleData } from './PuzzleDataContext';
import React from 'react';

// Component to test the context
const TestComponent = ({ testDate }: { testDate: Date }) => {
  const { data, loading, error, getDataForDate } = usePuzzleData();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  const dailyData = getDataForDate(testDate);
  return (
    <div>
      <div data-testid="data-loaded">{data ? 'Yes' : 'No'}</div>
      <div data-testid="date-match">{dailyData ? dailyData.date : 'None'}</div>
    </div>
  );
};

describe('PuzzleDataContext', () => {
  const mockData = {
    '2026-01-30': {
      date: '2026-01-30',
      main_solution: {},
      panels: []
    }
  };

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    ));
  });

  it('provides data after loading', async () => {
    const testDate = new Date(2026, 0, 30);
    render(
      <PuzzleDataProvider year={2026}>
        <TestComponent testDate={testDate} />
      </PuzzleDataProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('data-loaded')).toHaveTextContent('Yes');
    });

    expect(screen.getByTestId('date-match')).toHaveTextContent('2026-01-30');
  });

  it('handles fetch errors', async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      })
    ));

    const testDate = new Date(2026, 0, 30);
    render(
      <PuzzleDataProvider year={2026}>
        <TestComponent testDate={testDate} />
      </PuzzleDataProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Error: Failed to load puzzle data/)).toBeInTheDocument();
    });
  });
});
