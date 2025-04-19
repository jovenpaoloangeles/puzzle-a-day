# TODO: Puzzle-A-Day GitHub Page Roadmap

## 1. Data Generation
- [x] Define JSON data structure for daily puzzle solutions
- [x] Update `puzzle-a-day.py` to output required data for the web UI
    - Main solution for the current date
    - Three panel solutions (rough side only, with reflections, smooth side only)
    - Total number of solutions for each panel
    - Note: Some days generate thousands of solutions (e.g. 2139+), consider performance for UI display.
- [x] Pre-generate data for a year (one JSON per day, for 365 days)

## 2. Web UI Implementation
- [x] Set up project with Tailwind CSS for styling
- [x] Display the current date at the top
- [x] Render main puzzle solution area, with pieces arranged around it
- [ ] Create three solution panels below:
    - [ ] Left: Set 1, no reflections ("Rough Side Only")
    - [ ] Center: Set 1, with reflections
    - [ ] Right: Set 2, no reflections ("Smooth Side Only")
    - [ ] For each panel, display only 10 pre-generated solutions and the total number of solutions (do not show all solutions in the app)
- [ ] Fetch and display data from JSON
- [x] Ensure responsive layout for desktop/mobile

## 3. Deployment

- [ ] Optimize web UI for performance with large solution sets

- [ ] Prepare static build for GitHub Pages
- [ ] Deploy to GitHub Pages repository

## Stretch Goals
- [ ] Add interactivity (e.g., select different dates)
- [ ] Animate puzzle pieces/solutions
- [ ] Add dark mode toggle

---
- All layout and styling with Tailwind CSS
- Data source: puzzle-a-day.py + puzzle-a-day.ini (set1 = rough side, set2 = smooth side)
