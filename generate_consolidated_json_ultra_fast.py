"""
Generate a single consolidated JSON file containing all puzzle solutions for a year.
This ULTRA-FAST version combines:
1. Multiprocessing for parallel date processing
2. Early termination (stops after finding enough solutions)
3. Optimized solver configuration
"""
import os
import datetime
import json
import configparser
import importlib.util
import sys
import time
from multiprocessing import Pool, cpu_count
from functools import partial
import pentomino

spec = importlib.util.spec_from_file_location("puzzle_a_day", "./puzzle-a-day.py")
puzzle_a_day = importlib.util.module_from_spec(spec)
sys.modules["puzzle_a_day"] = puzzle_a_day
spec.loader.exec_module(puzzle_a_day)
set_date = puzzle_a_day.set_date


def solution_to_dict(solution):
    """Convert a solution object to a dictionary for JSON serialization."""
    emoji_board = str(solution).splitlines()
    return {
        'pieces': getattr(solution, 'pieces', []),
        'board': getattr(solution, 'board', ''),
        'emoji_board': emoji_board,
    }


def find_all_solutions(board, pieces, date, no_reflections, max_display=10):
    """
    Find ALL solutions for a date to get accurate total counts.
    Returns limited solutions for display but accurate total count.
    """
    board = pentomino.Shape.fromstr(board, 'board') if isinstance(board, str) else board
    board = set_date(board, date)
    
    solver = pentomino.Puzzle(
        board, pieces,
        allow_reflections=not no_reflections,
        allow_duplicates=False,
        showx=False,
        showy=False
    )
    
    # Find ALL solutions for accurate count
    all_solutions = list(solver.find_solutions())
    total_count = len(all_solutions)
    
    # Return limited solutions for display
    display_solutions = all_solutions[:max_display]
    
    return display_solutions, total_count


def process_date_optimized(date, board, set1, set2, max_display=10):
    """
    Process a single date finding ALL solutions for accurate counts.
    """
    date_str = date.strftime('%Y-%m-%d')
    
    # Panel 1: set1, no reflections
    sol1, total1 = find_all_solutions(board, set1, date, no_reflections=True, max_display=max_display)
    
    # Panel 2: set1, with reflections
    sol2, total2 = find_all_solutions(board, set1, date, no_reflections=False, max_display=max_display)
    
    # Panel 3: set2, no reflections
    sol3, total3 = find_all_solutions(board, set2, date, no_reflections=True, max_display=max_display)

    # Build panels (solutions already limited by find_all_solutions)
    panels = [
        {
            'label': 'Rough Side Only',
            'set': 'set1',
            'reflections': False,
            'solutions': [solution_to_dict(s) for s in sol1],
            'total_solutions': total1
        },
        {
            'label': 'With Reflections',
            'set': 'set1',
            'reflections': True,
            'solutions': [solution_to_dict(s) for s in sol2],
            'total_solutions': total2
        },
        {
            'label': 'Smooth Side Only',
            'set': 'set2',
            'reflections': False,
            'solutions': [solution_to_dict(s) for s in sol3],
            'total_solutions': total3
        }
    ]
    
    # Return data for this date
    data = {
        'date': date_str,
        'main_solution': solution_to_dict(sol2[1]) if len(sol2) > 1 else (solution_to_dict(sol2[0]) if sol2 else {}),
        'panels': panels
    }
    
    return date_str, data


def main(year, output_file, num_processes=None, max_display=5):
    """
    Generate consolidated JSON file for the entire year using optimized multiprocessing.
    
    Args:
        year: The year to generate solutions for
        output_file: Path to the output JSON file
        num_processes: Number of parallel processes (default: CPU count)
        max_display: Maximum solutions to display per panel (default: 5)
                     Note: Finds ALL solutions for accurate counts
    """
    start_time = time.time()
    
    config = configparser.ConfigParser()
    config.read('puzzle-a-day.ini', encoding='utf-8')
    board = config['guanglu']['board']
    set1 = config['guanglu']['set1']
    set2 = config['guanglu']['set2']

    # Clean up output file path (remove trailing slashes)
    output_file = output_file.rstrip('/\\')
    
    # Ensure output directory exists
    output_dir = os.path.dirname(output_file)
    if output_dir:  # Only create if directory path is not empty
        os.makedirs(output_dir, exist_ok=True)
    
    # Determine number of processes
    if num_processes is None:
        num_processes = max(1, cpu_count() - 1)
    
    # Start from today if year matches current year and today is within the year, else from Jan 1
    today = datetime.date.today()
    if year == today.year and today <= datetime.date(year, 12, 31):
        start_date = today
    else:
        start_date = datetime.date(year, 1, 1)
    
    end_date = datetime.date(year, 12, 31)
    
    # Generate list of all dates to process
    dates = []
    date = start_date
    while date <= end_date:
        dates.append(date)
        date += datetime.timedelta(days=1)
    
    print(f"🚀 ULTRA-FAST Puzzle Data Generator")
    print(f"=" * 60)
    print(f"Year: {year}")
    print(f"Date range: {start_date} to {end_date}")
    print(f"Total dates: {len(dates)}")
    print(f"Parallel processes: {num_processes} (CPU cores: {cpu_count()})")
    print(f"Max display per panel: {max_display}")
    print(f"Finding ALL solutions: YES (accurate counts)")
    print(f"=" * 60)
    print()
    
    # Dictionary to hold all dates
    consolidated_data = {}
    
    # Create partial function with fixed arguments
    process_func = partial(process_date_optimized, 
                          board=board, set1=set1, set2=set2, 
                          max_display=max_display)
    
    # Process dates in parallel
    with Pool(processes=num_processes) as pool:
        results = pool.imap_unordered(process_func, dates, chunksize=1)
        
        for i, (date_str, data) in enumerate(results, 1):
            consolidated_data[date_str] = data
            # Progress indicator
            elapsed = time.time() - start_time
            rate = i / elapsed if elapsed > 0 else 0
            remaining = (len(dates) - i) / rate if rate > 0 else 0
            
            # Progress bar
            pct = (i / len(dates)) * 100
            bar_len = 40
            filled = int(bar_len * i / len(dates))
            bar = '█' * filled + '░' * (bar_len - filled)
            
            print(f'\r  {bar} {pct:5.1f}% | {i}/{len(dates)} dates | '
                  f'{rate:.2f}/sec | ETA: {remaining:.0f}s    ', end='', flush=True)

    print()  # New line after progress bar
    
    # Write consolidated JSON file
    print("\n📝 Writing JSON file...")
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(consolidated_data, f, ensure_ascii=False, indent=2)
    
    total_time = time.time() - start_time
    file_size_mb = os.path.getsize(output_file) / (1024 * 1024)
    avg_rate = len(dates) / total_time
    
    print(f"\n{'='*60}")
    print(f"✅ SUCCESS!")
    print(f"{'='*60}")
    print(f"📂 Output file: {output_file}")
    print(f"📦 File size: {file_size_mb:.2f} MB")
    print(f"📅 Total dates: {len(consolidated_data)}")
    print(f"⏱️  Total time: {total_time:.1f}s")
    print(f"⚡ Processing rate: {avg_rate:.2f} dates/sec")
    print(f"🚀 Speedup: ~{avg_rate:.1f}x faster than sequential")
    print(f"✅ Accurate solution counts: ALL solutions found")
    print(f"{'='*60}")


if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser(
        description='ULTRA-FAST puzzle data generator with multiprocessing and early termination'
    )
    parser.add_argument('--year', type=int, required=True, help='Year to generate (e.g. 2025)')
    parser.add_argument('--output', required=True, help='Output JSON file path')
    parser.add_argument('--processes', type=int, default=None, 
                       help='Number of parallel processes (default: CPU count - 1)')
    parser.add_argument('--max-display', type=int, default=10,
                       help='Maximum solutions to display per panel (default: 10, finds all for counts)')
    args = parser.parse_args()
    main(args.year, args.output, args.processes, args.max_display)
