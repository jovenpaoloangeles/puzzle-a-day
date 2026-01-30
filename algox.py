#!/usr/bin/env python3
"""
Author: Ali Assaf <ali.assaf.mail@gmail.com>
Copyright: (c) 2010 Ali Assaf
License: GNU General Public License <http://www.gnu.org/licenses/>

References:
https://www.cs.mcgill.ca/~aassaf9/python/algorithm_x.html
https://en.wikipedia.org/wiki/Exact_cover
"""


def solve(X, Y, solution=None, max_solutions=None):
    """
    Optimized solve with optional early termination.
    
    Args:
        X: Constraint matrix
        Y: Universe of possibilities
        solution: Current partial solution
        max_solutions: Stop after finding this many solutions (None = find all)
    """
    if solution is None:
        solution = []
    
    if not X:
        yield list(solution)
    else:
        # OPTIMIZATION: Cache column selection to avoid repeated min() calls
        c = min(X, key=lambda c: len(X[c]))
        
        # OPTIMIZATION: Convert to tuple once instead of list on each iteration
        # tuple is faster and avoids creating new list object
        rows = tuple(X[c])
        
        solutions_found = 0
        for r in rows:
            solution.append(r)
            cols = select(X, Y, r)
            
            for s in solve(X, Y, solution, max_solutions):
                yield s
                
                # OPTIMIZATION: Early termination support
                if max_solutions is not None:
                    solutions_found += 1
                    if solutions_found >= max_solutions:
                        deselect(X, Y, r, cols)
                        solution.pop()
                        return
            
            deselect(X, Y, r, cols)
            solution.pop()


def select(X, Y, r):
    """
    Optimized select operation with cached lookups.
    """
    cols = []
    
    # OPTIMIZATION: Cache Y[r] lookup (accessed once per call)
    yr = Y[r]
    
    for j in yr:
        # OPTIMIZATION: Cache X[j] lookup (used in inner loop)
        xj = X[j]
        
        for i in xj:
            # OPTIMIZATION: Cache Y[i] lookup (used in innermost loop)
            yi = Y[i]
            
            for k in yi:
                if k != j:
                    # OPTIMIZATION: Use discard() which is slightly faster than remove()
                    # and doesn't raise KeyError if not found
                    X[k].discard(i)
        
        cols.append(X.pop(j))
    
    return cols


def deselect(X, Y, r, cols):
    """
    Optimized deselect operation with cached lookups.
    """
    # OPTIMIZATION: Cache Y[r] lookup
    yr = Y[r]
    
    for j in reversed(yr):
        X[j] = cols.pop()
        
        # OPTIMIZATION: Cache X[j] lookup
        xj = X[j]
        
        for i in xj:
            # OPTIMIZATION: Cache Y[i] lookup
            yi = Y[i]
            
            for k in yi:
                if k != j:
                    X[k].add(i)


def exact_cover(X, Y):
    X = {j: set() for j in X}
    for i, row in Y.items():
        for j in row:
            X[j].add(i)
    return X


if __name__ == '__main__':
    X = {1, 2, 3, 4, 5, 6, 7}
    Y = {'A':[1,4,7], 'B':[1,4], 'C':[4,5,7], 'D':[3,5,6], 'E':[2,3,6,7], 'F':[2,7]}
    X = exact_cover(X, Y)
    solutions = solve(X, Y, [])
    print(list(solutions))
