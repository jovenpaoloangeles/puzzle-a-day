# Track Specification: Project Cleanup and Optimization

## Overview
This track aims to streamline the project repository by removing obsolete scripts, redundant directories, and unnecessary documentation as outlined in the `CLEANUP_GUIDE.md`. This will reduce technical debt and improve maintainability.

## Functional Requirements
- **Logic Consolidation & Verification**:
    - Perform a final comparison between the root versions of `algox.py`, `pentomino.py`, and `generate_consolidated_json_ultra_fast.py` and their counterparts in the `puzzle-data-generator/` directory.
    - Ensure the root versions are the most up-to-date and include all relevant optimizations.
- **Redundant Directory Removal**:
    - Delete the `puzzle-data-generator/` directory entirely once logic consolidation is verified.
- **Obsolete Script Deletion**:
    - Delete the following legacy scripts from the root directory:
        - `generate_consolidated_json.py`
        - `generate_consolidated_json_fast.py`
        - `generate_daily_json.py`
        - `generate_year_json.py`
        - `pentomino_optimized.py`
- **Documentation & Analysis Cleanup**:
    - Delete the following snapshot and analysis files from the root:
        - `CHANGES_SUMMARY.md`
        - `COMPUTING_SERVER_GUIDE.md`
        - `CORE_OPTIMIZATION_ANALYSIS.md`
        - `GPU_ACCELERATION_ANALYSIS.md`
        - `IMPLEMENTATION_SUMMARY.md`
        - `OPTIMIZATION_GUIDE.md`
        - `PERFORMANCE_SUMMARY.md`
        - `repository-critique.md`
        - `todo.md`
- **Configuration Update**:
    - Update the `.gitignore` file to ensure `__pycache__/`, `.venv/`, and root-level `*.json` files are ignored.

## Acceptance Criteria
- [ ] Final comparison of core scripts is completed and root versions are confirmed as authoritative.
- [ ] `puzzle-data-generator/` directory is removed.
- [ ] All specified legacy scripts and analysis `.md` files are deleted from the root.
- [ ] `.gitignore` is updated with the specified ignore patterns.
- [ ] The repository passes a basic sanity check (e.g., the ultra-fast generator still runs).

## Out of Scope
- Modifying the core logic of the puzzle solver or the React application.
- Changes to the GitHub Actions workflows (unless paths need updating due to deletions).
