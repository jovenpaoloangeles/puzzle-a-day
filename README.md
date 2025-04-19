# AlgorithmX Problems and Solvers

Trying to efficiently write a program to provide me solutions to [Dragonfjord's
"A Puzzle a Day"](https://www.dragonfjord.com/product/a-puzzle-a-day/) has lead
me down a slightly mind boggling path of learning what about Donald Knuth's
[AlgorithmX](https://en.wikipedia.org/wiki/Knuth%27s_Algorithm_X), as well as
[Exact Cover](https://en.wikipedia.org/wiki/Exact_cover), and
[Dancing Link](https://en.wikipedia.org/wiki/Dancing_Links)
algorithms. I am definitely not an expert in this algorithm, but was able to get
something working with the help of Ali Assaf's post and implementation of AlgorithmX.

The examples in this repository can solve Sudoku and Pentomino puzzles relativly
quickly. While all these examples work in Python3, I highly recomend using
[pypy](https://www.pypy.org/download.html) as it is much faster for these types
of problems.

## Example Pentomino Solver
```python
from pentomino import Puzzle

BOARD = """
⬛⬛🟫🟫🟫⬛⬛
🟫🟫🟫🟫🟫🟫🟫
🟫🟫🟫🟫🟫🟫🟫
🟫🟫🟫⬛⬛⬛⬛
"""
PIECES = """
🟪🟪🟪 ⬛🟦⬛ ⬛🟥🟥 🟨🟨⬛ 🟩🟩🟩
⬛🟪⬛ 🟦🟦🟦 🟥🟥⬛ 🟨🟨⬛ ⬛⬛🟩
"""

solver = Puzzle(BOARD, PIECES, allow_reflections=True)
solutions = list(solver.find_solutions())
for board in solutions:
    print(board)

>>>
⬛⬛🟪🟩🟩⬛⬛
🟦🟪🟪🟪🟩🟨🟨
🟦🟦🟥🟥🟩🟨🟨
🟦🟥🟥⬛⬛⬛⬛
```

## Example Dragonfjord Command Line Solver
Only a single random solution is displayed when running from the command line
as seeing all solutions was a bit unwieldy.
```bash
> python3 puzzle-a-day.py --date=2025-05-29
🟦🟦🟦🟦⬛🟧⬛
🟨🟦🟨🟧🟧🟧⬛
🟨🟨🟨🟧⬜⬜⬜
🟩🟩🟩⬜⬜🟫🟫
🟩🟪🟪🟥🟫🟫🟫
🟩🟪🟪🟥🟥🟥🟥
⬛🟪🟪⬛⬛⬛⬛

Found 66 solutions after 5.5s.
```

To view all available options, run `python3 puzzle-a-day.py --help`. Available
options for `--puzzle` are `dragonfjord` and `guanglu`, see `puzzle-a-day.ini`
for the puzzle layouts.