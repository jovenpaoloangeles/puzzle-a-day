# Technology Stack - Puzzle-A-Day Solutions

## Frontend
- **React (v18+)**: UI library for building the interactive board and date selection.
- **TypeScript**: Ensures type safety across the frontend application.
- **Vite**: Fast build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for styling, following Material Design principles.
- **Lucide React**: Icon library for UI elements.
- **Vitest & React Testing Library**: Frameworks for unit and component testing.
- **Playwright**: Framework for end-to-end and visual verification.

## Data Generation (Python)
- **Python (3.x)**: Core language for the puzzle-solving algorithm and data consolidation.
- **uv**: Modern Python package manager for fast dependency management and execution.
- **BeautifulSoup4**: Used for parsing or processing puzzle-related data.
- **Core Algorithm**: Implements an Exact Cover solver (Algorithm X) for finding puzzle solutions.
- **pytest & pytest-cov**: Frameworks for unit testing and coverage reporting.

## Infrastructure & DevOps
- **GitHub Actions**: Automates the application deployment and batched (monthly/manual) data updates.
- **GitHub Pages**: Static hosting for the React application and consolidated JSON data.
- **Integrated Deployment Pipeline**: Data generation now commits directly to the main branch, triggering automated application builds and keeping code and data in sync.
