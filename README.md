# Puzzle-A-Day Solutions

A web application that displays daily puzzle solutions for the "Puzzle-A-Day" board game. This project features a decoupled architecture that separates the React application from the puzzle data, optimizing deployment efficiency and client-side performance.

## 🎯 Features

- **Pre-computed Solutions**: All puzzle solutions for 2025 are pre-generated using Python
- **Interactive UI**: React + TypeScript + Vite + Tailwind CSS
- **Three Solution Modes**:
  - Rough Side Only (set1, no reflections)
  - With Reflections (set1, with reflections)
  - Smooth Side Only (set2, no reflections)
- **Date Selection**: Navigate to any date in 2025
- **Efficient Data Loading**: Single consolidated JSON file for the entire year

## 🏗️ Architecture

### Decoupled Data Pipeline

This project implements a **decoupled data architecture** that separates application code from puzzle data:

```
┌─────────────────────┐     ┌─────────────────────┐
│  React Application  │     │   Puzzle Data       │
│  (Code Changes)     │     │   (Weekly Updates)  │
└──────────┬──────────┘     └──────────┬──────────┘
           │                            │
           ▼                            ▼
    ┌──────────────┐          ┌──────────────┐
    │ deploy-app   │          │ update-data  │
    │   workflow   │          │   workflow   │
    └──────┬───────┘          └──────┬───────┘
           │                         │
           └─────────┬───────────────┘
                     ▼
            ┌─────────────────┐
            │   GitHub Pages  │
            │  (gh-pages)     │
            └─────────────────┘
```

### Key Components

#### 1. **Data Generation** (`generate_consolidated_json.py`)
- Generates a single `puzzles_2025.json` file containing all dates
- Structure: `{ "2025-01-01": {...}, "2025-01-02": {...}, ... }`
- Each date includes main solution and three solution panels

#### 2. **React App** (`docs/project/`)
- **Context Provider** (`PuzzleDataContext.tsx`): Loads consolidated JSON once on app load
- **Single Network Request**: All data fetched in one request and cached in memory
- **Fast Date Switching**: No additional network requests when changing dates

#### 3. **GitHub Actions Workflows**

**Deploy App** (`.github/workflows/deploy-app.yml`)
- Triggers: Push to `main` with changes in `docs/project/`
- Deploys React application to GitHub Pages
- Runs only when code changes

**Update Data** (`.github/workflows/update-data.yml`)
- Triggers: Weekly schedule (Sunday 2 AM UTC) or manual
- Generates consolidated puzzle data
- Deploys data file to GitHub Pages
- Runs independently of application deployment

## 📦 Installation & Setup

### Prerequisites
- Python 3.x
- Node.js 18+
- `uv` (Python package manager)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/puzzle-a-day-solutions.git
   cd puzzle-a-day-solutions
   ```

2. **Set up Python environment**
   ```powershell
   uv venv
   uv pip install -r requirements.txt
   ```

3. **Generate puzzle data**
   ```powershell
   uv run python generate_consolidated_json.py --year 2025 --output docs/project/public/data/puzzles_2025.json
   ```

4. **Install Node dependencies**
   ```powershell
   cd docs/project
   npm install
   ```

5. **Run development server**
   ```powershell
   npm run dev
   ```

6. **Open browser**
   Navigate to `http://localhost:5173`

## 🚀 Deployment

### Automatic Deployment

- **Application**: Automatically deploys when you push code changes to `docs/project/`
- **Data**: Automatically updates weekly via scheduled workflow

### Manual Deployment

**Deploy App**:
```bash
# Trigger via GitHub Actions UI
# Or push code changes to main branch
```

**Update Data**:
```bash
# Trigger via GitHub Actions UI
# Or use the workflow_dispatch option
```

## 📊 Benefits of This Architecture

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **Daily CI runs** | Full rebuild | None (unless code changes) | ~95% reduction |
| **Network requests** | 1 per date | 1 per session | ~99% reduction |
| **Data files** | 257 files × ~14KB | 1 file × ~3.5MB | Consolidation |
| **Cache efficiency** | Per-date cache | Year-long cache | Significant |
| **Git commits** | Daily | Weekly | ~96% reduction |

## 🛠️ Development

### Project Structure

```
puzzle-a-day-solutions/
├── .github/
│   └── workflows/
│       ├── deploy-app.yml      # React app deployment
│       └── update-data.yml     # Data generation & deployment
├── docs/
│   └── project/                # React application
│       ├── public/
│       │   └── data/
│       │       └── puzzles_2025.json  # Consolidated data
│       └── src/
│           ├── components/
│           ├── contexts/
│           │   └── PuzzleDataContext.tsx
│           ├── App.tsx
│           └── main.tsx
├── generate_consolidated_json.py  # New: Consolidated generator
├── generate_year_json.py          # Legacy: Individual files
├── puzzle-a-day.py                # Core puzzle solver
├── pentomino.py                   # Pentomino logic
└── requirements.txt               # Python dependencies
```

### Adding New Years

To add support for a new year (e.g., 2026):

1. Generate the data:
   ```powershell
   uv run python generate_consolidated_json.py --year 2026 --output docs/project/public/data/puzzles_2026.json
   ```

2. Update the React app to support the new year in `main.tsx`:
   ```tsx
   <PuzzleDataProvider year={2026}>
   ```

## 🧪 Testing

### Test Data Generation
```powershell
# Generate test data for a specific year
uv run python generate_consolidated_json.py --year 2025 --output test_puzzles.json
```

### Test React App Locally
```powershell
cd docs/project
npm run dev
```

### Build for Production
```powershell
cd docs/project
npm run build
```

## 📝 License

Copyright information and license details from the original puzzle solver.

## 🙏 Credits

- Original puzzle solver by Michael Shepanski
- Puzzle design by DragonFjord: https://www.dragonfjord.com/product/a-puzzle-a-day/

## 🔗 Links

- **Live Demo**: [Your GitHub Pages URL]
- **Repository**: [Your GitHub Repository URL]
