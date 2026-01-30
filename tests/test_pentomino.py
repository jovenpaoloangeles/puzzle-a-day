import pytest
from pentomino import Shape, Puzzle

def test_shape_from_str():
    shapestr = "🟥🟥\n🟥🟥"
    shape = Shape.fromstr(shapestr, "SQ")
    assert shape.name == "SQ"
    assert shape.shape == [['🟥', '🟥'], ['🟥', '🟥']]
    
    # Trim only happens if entire last col/row is empty
    shapestr_with_empty_col = "🟥🟥⬛\n🟥🟥⬛"
    shape2 = Shape.fromstr(shapestr_with_empty_col, "SQ2")
    assert len(shape2.shape[0]) == 2 # Trimmed last col
    
    shapestr_with_empty_row = "🟥🟥\n🟥🟥\n⬛⬛"
    shape3 = Shape.fromstr(shapestr_with_empty_row, "SQ3")
    assert len(shape3.shape) == 2 # Trimmed last row

def test_shape_rotations():
    # Symmetric shape (square)
    square = Shape.fromstr("🟦🟦\n🟦🟦", "sq")
    rotations = list(square.rotations(allow_reflections=True))
    assert len(rotations) == 1
    
    # L shape (3 blocks)
    l_shape = Shape.fromstr("🟩⬛\n🟩🟩", "L")
    rotations = list(l_shape.rotations(allow_reflections=False))
    assert len(rotations) == 4
    
    rotations_with_reflect = list(l_shape.rotations(allow_reflections=True))
    # Reflection of L (3 blocks) is same as some rotation? 
    # 🟩⬛  reflected  ⬛🟩  rotated 180  🟩🟩
    # 🟩🟩             🟩🟩               ⬛🟩
    # Wait, 3-block L:
    # #.
    # ##
    # Rotations:
    # #.  ##  .#  ##
    # ##  #.  ##  .#
    # Reflections add 4 more? 
    # .#  ##  #.  ##
    # ##  .#  ##  #.
    # These are same as rotations. So should be 4.
    assert len(rotations_with_reflect) == 4

def test_puzzle_tiny():
    # 2x3 board
    board = "🟫🟫🟫\n🟫🟫🟫"
    
    # 2 pieces of 1x3, must have space to be parsed as list
    pieces_str = "🟥🟥🟥 🟦🟦🟦"
    
    solver = Puzzle(board, pieces_str)
    solutions = list(solver.find_solutions())
    assert len(solutions) > 0
    # Solutions should be boards with 🟥 and 🟦
    assert '🟥' in str(solutions[0])
    assert '🟦' in str(solutions[0])

def test_puzzle_impossible():
    board = "🟫🟫"
    # Ensure list by using space between two pieces
    pieces_str = "🟥🟥🟥 🟦🟦🟦" 
    solver = Puzzle(board, pieces_str)
    solutions = list(solver.find_solutions())
    assert len(solutions) == 0
