# Azure Cloud Portfolio Project

## Project Overview

The Azure Cloud Portfolio Project is a collaborative cloud deployment project designed to manage, test, and deploy multiple student portfolios through a central GitHub repository and a structured CI/CD workflow.

The repository contains the main project and deployment code along with the individual portfolio applications contributed by the team members. Each portfolio is maintained separately within the repository while following a common source-control and deployment process.

The project follows a structured GitHub workflow using feature branches, development, staging, and main branches. Feature branches are used for individual development, while the `dev` branch is used for ongoing integration. The `staging` branch acts as the release candidate and User Acceptance Testing (UAT) environment. After successful validation and approval, changes are promoted to the `main` branch, which serves as the approved source for production releases.

Continuous Integration and automated validation are used to perform build, dependency, lint, and testing checks. The workflow also includes review and approval stages to maintain code quality and ensure that only validated changes progress toward production.

Microsoft Azure is used as the cloud platform for deploying the portfolio applications. The project demonstrates the integration of source control, collaborative development, CI/CD, automated testing, and cloud deployment into a single deployment workflow.

## Project Objectives

- Maintain the main project and multiple portfolio applications in a central repository.
- Provide a structured GitHub-based source-control workflow.
- Enable collaborative development through feature branches and pull requests.
- Integrate automated build, dependency, lint, and testing checks.
- Use staging for release candidate validation and UAT.
- Promote only reviewed and approved changes toward production.
- Deploy the approved applications to Microsoft Azure.

## Repository Structure

The repository contains:

- **Main Project Code** – Core project and deployment-related code.
- **Portfolio Applications** – Individual student portfolios maintained in separate folders.
- **CI/CD Configuration** – Workflow and automation configuration required for validation and deployment.
- **Documentation** – Project-related documentation and configuration details.

## Development Workflow

The project follows the workflow:

`Feature Branch → Dev → Staging → Main → Production`

- **Feature Branch** – Individual student development.
- **Dev** – Ongoing integration of approved changes.
- **Staging** – Release candidate validation and UAT.
- **Main** – Approved source for production releases.
- **Production** – Deployment environment for the approved release.

## Technology

- Git
- GitHub
- CI/CD
- Microsoft Azure
- Automated Testing and Validation

## Team

This project is collaboratively developed and maintained by the assigned project team members.
