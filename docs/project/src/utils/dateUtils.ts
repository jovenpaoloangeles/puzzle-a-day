/**
 * Get today's date or a specific date for the puzzle
 * @param specificDate Optional date string to parse
 * @returns Date object
 */
export const getPuzzleDate = (specificDate?: string): Date => {
  if (specificDate) {
    return new Date(specificDate);
  }
  return new Date();
};

/**
 * Format a date in the Month Day, Year format
 * @param date Date to format
 * @returns Formatted date string
 */
export const formatPuzzleDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};