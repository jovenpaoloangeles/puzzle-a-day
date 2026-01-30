import pytest
from algox import exact_cover, solve

def test_exact_cover_basic():
    X = {1, 2, 3}
    Y = {
        'A': [1, 2],
        'B': [2, 3],
        'C': [1]
    }
    matrix = exact_cover(X, Y)
    assert matrix[1] == {'A', 'C'}
    assert matrix[2] == {'A', 'B'}
    assert matrix[3] == {'B'}

def test_solve_basic():
    # Classic exact cover example from Wikipedia
    # X = {1, 2, 3, 4, 5, 6, 7}
    # Y = {
    #     'A': [1, 4, 7],
    #     'B': [1, 4],
    #     'C': [4, 5, 7],
    #     'D': [3, 5, 6],
    #     'E': [2, 3, 6, 7],
    #     'F': [2, 7]
    # }
    X = {1, 2, 3, 4, 5, 6, 7}
    Y = {
        'A': [1, 4, 7],
        'B': [1, 4],
        'C': [4, 5, 7],
        'D': [3, 5, 6],
        'E': [2, 3, 6, 7],
        'F': [2, 7]
    }
    X_matrix = exact_cover(X, Y)
    solutions = list(solve(X_matrix, Y))
    
    # One solution is {B, D, F} -> {1,4}, {3,5,6}, {2,7}
    assert len(solutions) == 1
    assert set(solutions[0]) == {'B', 'D', 'F'}

def test_solve_max_solutions():
    X = {1, 2}
    Y = {
        'A': [1, 2],
        'B': [1, 2],
        'C': [1, 2]
    }
    X_matrix = exact_cover(X, Y)
    
    # Test finding all
    all_solutions = list(solve(X_matrix.copy(), Y))
    assert len(all_solutions) == 3
    
    # Test max_solutions = 1
    limited_solutions = list(solve(X_matrix.copy(), Y, max_solutions=1))
    assert len(limited_solutions) == 1

def test_solve_no_solution():
    X = {1, 2}
    Y = {
        'A': [1],
        'B': [1]
    }
    X_matrix = exact_cover(X, Y)
    solutions = list(solve(X_matrix, Y))
    assert len(solutions) == 0
