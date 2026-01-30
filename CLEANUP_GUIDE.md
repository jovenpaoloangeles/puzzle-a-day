# Project Cleanup Guide: Unnecessary Files

This document identifies files and directories that can or must be deleted to reduce redundancy, eliminate obsolete scripts, and maintain a clean repository structure.

## 🗑️ Obsolete Scripts (Root Directory)

These scripts have been superseded by more efficient versions or are no longer needed due to changes in the data architecture (consolidated JSON).

*   **`generate_consolidated_json.py`**: Original version, superseded by the "ultra fast" script.
*   **`generate_consolidated_json_fast.py`**: Iterative improvement, superseded by the "ultra fast" script.
*   **`generate_daily_json.py`**: Legacy script for individual daily files. The app now uses a single consolidated JSON.
*   **`generate_year_json.py`**: Legacy script for year-based generation, superseded by the consolidated generator.
*   **`pentomino_optimized.py`**: Likely a development/testing version of the optimization. If the improvements are already merged into `pentomino.py`, this is redundant.

## 📂 Redundant Directories

*   **`puzzle-data-generator/`**: This directory is a duplicate of the core scripts in the root. It was intended as a "portable package," but maintaining two copies of the same logic leads to version drift.
    *   *Recommendation*: Keep the root scripts and remove this directory.
*   **`__pycache__/`**: Python bytecode caches. Should be added to `.gitignore`.
*   **`.venv/`**: Local virtual environments. Should not be committed; users should create their own from `requirements.txt`.
*   **`docs/project/node_modules/`**: Dependency folder. Should be handled by `npm install`.

## 📄 Build Artifacts & Temporary Files

*   **`puzzle-data-generator/puzzles_2026.json`**: A generated data file. These should live in `docs/project/public/data/` or be ignored if they are just local test runs.
*   **`todo.md`**: If the tasks are complete or tracked elsewhere (e.g., GitHub Issues), this can be removed.

## 📝 Documentation & Analysis Artifacts

The following files appear to be snapshots of an optimization phase and may no longer be necessary for ongoing development:

*   **`CHANGES_SUMMARY.md`**
*   **`COMPUTING_SERVER_GUIDE.md`**
*   **`CORE_OPTIMIZATION_ANALYSIS.md`**
*   **`GPU_ACCELERATION_ANALYSIS.md`**
*   **`IMPLEMENTATION_SUMMARY.md`**
*   **`OPTIMIZATION_GUIDE.md`**
*   **`PERFORMANCE_SUMMARY.md`**
*   **`repository-critique.md`**
*   **`puzzle-data-generator/unnecessary_files.md`** (Superseded by this document)

## 🛠️ Recommended Action Plan

1.  **Consolidate Logic**: Ensure the best versions of `algox.py`, `pentomino.py`, and `generate_consolidated_json_ultra_fast.py` are in the root.
2.  **Delete Obsolete Scripts**: Remove the legacy `generate_*.py` files.
3.  **Remove Duplicates**: Delete the `puzzle-data-generator/` folder.
4.  **Clean Docs**: Archive or delete the optimization analysis files once the performance goals are met.
5.  **Update `.gitignore`**: Ensure `__pycache__`, `.venv`, and `*.json` (in the root) are properly ignored.
