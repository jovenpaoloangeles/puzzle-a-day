# Track Specification: Optimize Deployment & Data Efficiency

## Overview
This track focuses on streamlining the project's CI/CD pipeline and improving user experience by transitioning from daily data updates to a batched approach. The goal is to eliminate daily commits while ensuring the application remains "fresh" by automatically showing the current day's puzzle and accurate solution counts.

## Functional Requirements
- **Workflow Optimization**:
    - **Consolidate Data Updates**: Update the `update-data.yml` workflow to run less frequently (e.g., monthly or on-demand) rather than daily. It should generate data for a significant range (e.g., the rest of the year).
    - **Eliminate Daily Commits**: Remove any scheduled jobs that commit data daily.
    - **Pipeline Integration**: Ensure that a single workflow run (or a coordinated set) can build the app and deploy the consolidated data.
- **Frontend Refinement**:
    - **Robust Date Defaulting**: Verify and refine the `App.tsx` logic to ensure `selectedDate` defaults to the user's current local date if it falls within the supported data range (e.g., 2025).
    - **Total Solutions Display**: Confirm that the "Total Solutions" count is correctly wired from the consolidated JSON to the `SolutionModeCard` component. (Code review suggests it is, but verification is needed).

## Non-Functional Requirements
- **Efficiency**: Drastically reduce GitHub Actions usage and repository commit noise.
- **UX**: The app should feel "live" without needing a daily deployment.

## Acceptance Criteria
- [ ] `update-data.yml` is modified to run on a batched schedule (e.g., monthly) or manual trigger, not daily.
- [ ] Daily commits to the repository are stopped.
- [ ] The React app automatically shows the current date's puzzle when opened (if the date is within the supported year).
- [ ] The UI correctly displays the "Total possible solutions" count for the selected date.

## Out of Scope
- Changing the core Algorithm X solver logic.
- Major UI redesigns.
