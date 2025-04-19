import os
import datetime
import json
import configparser
import importlib.util
import sys

spec = importlib.util.spec_from_file_location("puzzle_a_day", "./puzzle-a-day.py")
puzzle_a_day = importlib.util.module_from_spec(spec)
sys.modules["puzzle_a_day"] = puzzle_a_day
spec.loader.exec_module(puzzle_a_day)
find_solutions_for_date = puzzle_a_day.find_solutions_for_date

# Helper to serialize solution objects (customize as needed)
def solution_to_dict(solution):
    # Convert the solution (Shape) to an emoji board for display
    emoji_board = str(solution).splitlines()
    return {
        'pieces': getattr(solution, 'pieces', []),
        'board': getattr(solution, 'board', ''),
        'emoji_board': emoji_board,
    }

def main(year, out_dir):
    config = configparser.ConfigParser()
    config.read('puzzle-a-day.ini', encoding='utf-8')
    board = config['guanglu']['board']
    set1 = config['guanglu']['set1']
    set2 = config['guanglu']['set2']

    os.makedirs(out_dir, exist_ok=True)
    start_date = datetime.date(year, 1, 1)
    end_date = datetime.date(year, 12, 31)
    delta = datetime.timedelta(days=1)
    date = start_date
    
    class Opts: pass

    while date <= end_date:
        date_str = date.strftime('%Y-%m-%d')
        out_path = os.path.join(out_dir, f'sample-{date_str}.json')

        # Panel 1: set1, no reflections
        opts1 = Opts(); opts1.no_reflections=True; opts1.allow_duplicates=False; opts1.showx=False; opts1.showy=False
        sol1, total1 = find_solutions_for_date(board, set1, date, opts1)
        # Panel 2: set1, with reflections
        opts2 = Opts(); opts2.no_reflections=False; opts2.allow_duplicates=False; opts2.showx=False; opts2.showy=False
        sol2, total2 = find_solutions_for_date(board, set1, date, opts2)
        # Panel 3: set2, no reflections
        opts3 = Opts(); opts3.no_reflections=True; opts3.allow_duplicates=False; opts3.showx=False; opts3.showy=False
        sol3, total3 = find_solutions_for_date(board, set2, date, opts3)

        # Pick up to 10 solutions for each panel
        panels = [
            {
                'label': 'Rough Side Only',
                'set': 'set1',
                'reflections': False,
                'solutions': [solution_to_dict(s) for s in sol1[:10]],
                'total_solutions': total1
            },
            {
                'label': 'With Reflections',
                'set': 'set1',
                'reflections': True,
                'solutions': [solution_to_dict(s) for s in sol2[:10]],
                'total_solutions': total2
            },
            {
                'label': 'Smooth Side Only',
                'set': 'set2',
                'reflections': False,
                'solutions': [solution_to_dict(s) for s in sol3[:10]],
                'total_solutions': total3
            }
        ]
        # For main_solution, just show the first solution of panel 1 if available
        data = {
            'date': date_str,
            'main_solution': solution_to_dict(sol2[0]) if sol2 else {},
            'panels': panels
        }
        with open(out_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f'Wrote {out_path}')
        date += delta

if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('--year', type=int, required=True, help='Year to generate (e.g. 2025)')
    parser.add_argument('--outdir', required=True, help='Output directory for JSON files')
    args = parser.parse_args()
    main(args.year, args.outdir)
