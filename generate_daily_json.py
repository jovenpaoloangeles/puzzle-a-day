import argparse
import datetime
import json
import random
import osm
from puzzle_a_day import find_solutions_for_date
import configparser

# Helper to serialize solution objects (customize as needed)
def solution_to_dict(solution):
    # TODO: adapt this to your solution object structure
    return {
        'pieces': getattr(solution, 'pieces', []),
        'board': getattr(solution, 'board', ''),
        # Add more fields as needed for rendering
    }

def main(date_str, out_path):
    config = configparser.ConfigParser()
    config.read('puzzle-a-day.ini', encoding='utf-8')
    board = config['guanglu']['board']
    set1 = config['guanglu']['set1']
    set2 = config['guanglu']['set2']
    date = datetime.datetime.strptime(date_str, '%Y-%m-%d').date()

    # Panel 1: set1, no reflections
    class Opts: pass
    opts1 = Opts(); opts1.no_reflections=True; opts1.allow_duplicates=False; opts1.showx=False; opts1.showy=False
    sol1, total1 = find_solutions_for_date(board, set1, date, opts1)

    # Panel 2: set1, with reflections
    opts2 = Opts(); opts2.no_reflections=False; opts2.allow_duplicates=False; opts2.showx=False; opts2.showy=False
    sol2, total2 = find_solutions_for_date(board, set1, date, opts2)

    # Panel 3: set2, no reflections
    opts3 = Opts(); opts3.no_reflections=True; opts3.allow_duplicates=False; opts3.showx=False; opts3.showy=False
    sol3, total3 = find_solutions_for_date(board, set2, date, opts3)

    # Pick the first solution of each for display (customize as needed)
    data = {
        'date': date_str,
        'main_solution': solution_to_dict(sol1[0]) if sol1 else {},
        'panels': [
            {
                'label': 'Rough Side Only',
                'set': 'set1',
                'reflections': False,
                'solution': solution_to_dict(sol1[0]) if sol1 else {},
                'total_solutions': total1
            },
            {
                'label': 'With Reflections',
                'set': 'set1',
                'reflections': True,
                'solution': solution_to_dict(sol2[0]) if sol2 else {},
                'total_solutions': total2
            },
            {
                'label': 'Smooth Side Only',
                'set': 'set2',
                'reflections': False,
                'solution': solution_to_dict(sol3[0]) if sol3 else {},
                'total_solutions': total3
            }
        ]
    }
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--date', required=True, help='Date in YYYY-MM-DD')
    parser.add_argument('--out', required=True, help='Output JSON file')
    args = parser.parse_args()
    main(args.date, args.out)
