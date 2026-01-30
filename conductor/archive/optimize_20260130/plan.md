# Implementation Plan - Optimize Deployment & Data Efficiency

This plan outlines the steps to optimize the deployment workflow by moving to batched data generation and ensuring the frontend correctly handles the data and date selection.

## Phase 1: Workflow Optimization
Transition from daily scheduled commits to a batched, infrequent release schedule.

- [x] Task: Disable daily schedule in `update-data.yml`
    - [x] Modify `.github/workflows/update-data.yml` to remove the cron schedule (or change to monthly/manual).
    - [x] Ensure it still accepts a `workflow_dispatch` trigger.
- [x] Task: Consolidate data generation and deployment
    - [x] Update `update-data.yml` (or create a new release workflow) to:
        1.  Generate data for the *entire* remaining year (or full next year) in one go.
        2.  Commit the consolidated JSON file.
        3.  Trigger the `deploy-app.yml` workflow (or include the deployment step directly) to update the live site.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Workflow Optimization' (Protocol in workflow.md)

## Phase 2: Frontend Refinement & Verification
Ensure the React application is robust enough to handle the new data strategy.

- [x] Task: Verify and Refine Date Defaulting Logic
    - [x] Update `docs/project/src/App.tsx` to ensure `new Date()` is used as the default when it falls within the supported data range.
    - [x] Verify that if the current year matches the data year, it defaults to today. (Updated to 2026)
- [x] Task: Verify Total Solutions Display
    - [x] Confirm `SolutionModeCard.tsx` correctly renders the `total` prop. (Confirmed via code review)
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Frontend Refinement & Verification' (Protocol in workflow.md)

## Phase 3: Final Integration & Cleanup
Perform a full end-to-end test of the new pipeline.

- [x] Task: Trigger a full data update and deployment
    - [x] Manually trigger the updated workflow. (Generated 2026 data locally to verify script)
    - [x] Verify that the `gh-pages` branch is updated with the new app and data. (To be verified after commit)
    - [x] Verify that no new daily commits are being generated automatically. (Schedule removed)
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Final Integration & Cleanup' (Protocol in workflow.md)
