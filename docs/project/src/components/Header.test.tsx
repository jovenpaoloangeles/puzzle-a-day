import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Header from './Header';

describe('Header Component', () => {
  const mockOnDateChange = vi.fn();
  const testDate = new Date(2026, 0, 30); // Jan 30, 2026

  beforeEach(() => {
    mockOnDateChange.mockClear();
  });

  it('renders the title correctly', () => {
    render(<Header title="Test Title" date={testDate} onDateChange={mockOnDateChange} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('displays the correct month, day, and year', () => {
    render(<Header title="Title" date={testDate} onDateChange={mockOnDateChange} />);
    
    // Check for "January" (month 0)
    expect(screen.getByDisplayValue('January')).toBeInTheDocument();
    // Check for day "30"
    expect(screen.getByDisplayValue('30')).toBeInTheDocument();
    // Check for year "2026"
    expect(screen.getByDisplayValue('2026')).toBeInTheDocument();
  });

  it('calls onDateChange when month is changed', () => {
    render(<Header title="Title" date={testDate} onDateChange={mockOnDateChange} />);
    
    const monthSelect = screen.getByDisplayValue('January');
    fireEvent.change(monthSelect, { target: { value: '1' } }); // February
    
    expect(mockOnDateChange).toHaveBeenCalled();
    const callDate = mockOnDateChange.mock.calls[0][0];
    expect(callDate.getMonth()).toBe(1); // February
  });

  it('calls onDateChange when day is changed', () => {
    render(<Header title="Title" date={testDate} onDateChange={mockOnDateChange} />);
    
    const daySelect = screen.getByDisplayValue('30');
    fireEvent.change(daySelect, { target: { value: '15' } });
    
    expect(mockOnDateChange).toHaveBeenCalled();
    const callDate = mockOnDateChange.mock.calls[0][0];
    expect(callDate.getDate()).toBe(15);
  });
});