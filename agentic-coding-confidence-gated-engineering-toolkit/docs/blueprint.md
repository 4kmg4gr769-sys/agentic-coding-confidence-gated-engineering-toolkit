# The Confidence-Gated Engineering Blueprint

## A Practical Framework For Agentic Coding

Engineering teams are often slowed down before code even starts. Jira tickets can be unclear, acceptance criteria may be incomplete, platform dependencies are easy to miss, and release managers inherit risk late in the process.

AI coding agents can help, but the biggest opportunity is not simply asking an agent to write code. The bigger shift is using agents to create a confidence-gated delivery workflow: validate requirements, ask better questions, attempt sandbox builds when ready, and keep developers in control of review and promotion.

This blueprint is platform-neutral. It uses Salesforce/LWC delivery as the first concrete implementation pack because that ecosystem makes the hidden complexity visible: UI components, server code, metadata, permissions, tests, sandbox validation, and release-region promotion.

## Core Idea

Use an agentic workflow to decide whether a Jira issue is ready for build.

If the requirement is clear, testable, and low enough risk, the system can attempt a sandbox build or implementation spike. If the requirement is unclear, the system converts its feedback into targeted questions for Product or the assigned developer. If the build validates, the developer reviews, patches if needed, and authorizes movement to the next release region.

The agent accelerates delivery. The developer remains accountable for judgment.

## The Operating Model

1. Jira issue enters an intake state.
2. A requirements validity agent scores the issue.
3. The orchestration layer reviews score, confidence, and risk.
4. If readiness is too low, the system asks Product or the assigned developer targeted questions.
5. If readiness is high enough, the system starts a sandbox build attempt.
6. The build process inspects code, platform dependencies, permissions, integrations, and tests.
7. The system produces a developer handoff with evidence.
8. The assigned developer reviews, patches, rejects, or authorizes promotion.
9. Release management tools move the work through governed regions.

## Confidence Gates

Confidence gates prevent agentic workflows from becoming uncontrolled automation. A gate answers:

- Is the requirement clear enough to start?
- Are the acceptance criteria testable?
- Is the technical and platform impact understood?
- Are permissions and data access rules defined?
- Is the build risk appropriate for automation?
- Has a human authorized the next region?

Suggested gate outcomes:

- `Build Allowed`
- `Needs Product Clarification`
- `Needs Developer Clarification`
- `Needs Technical Spike`
- `Needs Reproduction`
- `Blocked By Metadata Risk`
- `Blocked By Release Risk`

## Requirement Readiness Rubric

Score each issue from 0 to 5 in the following areas:

| Category | Question |
| --- | --- |
| Requirement clarity | Can a developer explain the desired behavior without guessing? |
| Acceptance criteria | Are the criteria observable and testable? |
| Platform surface | Is the affected app, page, API, workflow, object, or experience known? |
| Code impact | Are likely components, services, controllers, and integrations identifiable? |
| Data model | Are required objects, fields, and relationships clear? |
| Permissions | Are roles, permission sets, sharing, and data-access rules defined? |
| UX states | Are loading, empty, error, and edge states defined? |
| Testability | Can the behavior be covered by unit, integration, end-to-end, manual, or platform tests? |
| Release risk | Are metadata, dependency, and deployment risks understood? |

## Score And Confidence

Separate score from confidence.

Score measures the quality of the requirement. Confidence measures how sure the agent is about its assessment.

Example:

| Score | Confidence | Suggested Decision |
| --- | --- | --- |
| 90+ | High | Build allowed |
| 80-89 | High | Build allowed for low or medium risk |
| 70-79 | Medium | Ask assigned developer before build |
| Below 70 | Any | Ask Product clarification questions |
| Any | Low | Ask for human review before build |

Risk should adjust the threshold. A UI copy change can start at a lower threshold than a permission-sensitive platform and metadata change.

## Implementation Pack: Salesforce/LWC

For Salesforce/LWC delivery, before a sandbox build begins, the system should understand:

- affected LWC components
- Apex classes and methods used by the component
- custom objects and fields referenced
- Lightning page targets and Experience Cloud exposure
- permission sets, profiles, sharing, and FLS implications
- flows, validation rules, and automation dependencies
- Jest and Apex test coverage
- deployment validation path

## Product Clarification Loop

When the requirement is not ready, the agent should avoid dumping a long critique into Jira. It should ask the smallest useful set of questions.

Example:

```md
I cannot start a sandbox build for CRM-4821 yet. Three clarifications are needed:

1. When Renewal Risk Score is blank, should the banner be hidden or show an empty state?
2. Which users should see this component: all Account viewers, Sales only, or users with a specific permission set?
3. Should this appear on desktop Lightning only, or also mobile and Experience Cloud?

Once answered, I will re-run the requirements readiness check.
```

## Developer Discussion Loop

Some issues are product-clear but technically ambiguous. Those should route to the assigned developer.

Example:

```md
CRM-4821 appears product-ready, but implementation direction needs confirmation.

The requirement can be implemented with Lightning Data Service or Apex. Existing components in this area use Apex for permission-aware queries.

Recommended path:
Use the existing Apex service pattern unless you prefer LDS for this component.

Please confirm before the sandbox build starts.
```

## Sandbox Build Attempt

For a platform-specific delivery flow, a sandbox build attempt can include:

- create isolated branch or worktree
- inspect related code, metadata, integrations, permissions, and tests
- apply implementation patch or spike
- run targeted unit and platform tests
- run check-only deployment, preview validation, or sandbox validation
- produce a developer handoff

The build does not automatically promote itself. It creates evidence for review.

## Developer Handoff

A strong handoff includes:

- Jira issue summary
- requirement score and confidence
- build decision
- open assumptions
- affected files and platform dependencies
- object, field, permission, integration, and metadata dependencies
- validation results
- test plan
- requested developer action
- promotion authorization status

## Release Management Fit

This model complements release platforms. It does not replace them.

The agentic readiness layer sits upstream of Copado, AutoRABIT, or other release management tooling. Its job is to improve the quality of work before it enters the release pipeline, then provide evidence for the developer and release manager.

The release platform remains the system of control for deployment regions, approvals, audit history, and production promotion.

## Human Control Principles

- Agents can score, summarize, scan, ask, suggest, and attempt sandbox builds.
- Product owns product intent.
- Developers own implementation judgment and promotion authorization.
- Release managers own governed release flow.
- No agent should silently decide ambiguous product intent.
- No agent should promote across release regions without required human approval.

## Pilot Plan

Start with a narrow pilot. For the Salesforce/LWC implementation pack, that could mean:

- one Jira project
- one Salesforce DX repo
- LWC stories and bugs only
- read-only scoring and scanning first
- Jira comments for clarification questions
- sandbox builds only after explicit confidence thresholds
- assigned developer approval before any region move

The first measurable goal:

> Reduce the number of under-specified Salesforce/LWC tickets reaching developers.

The second measurable goal:

> Shorten cycle time from Jira intake to developer-ready implementation.

## Positioning Line

Confidence-gated engineering uses agents to accelerate delivery without surrendering control: requirements are scored, ambiguity is surfaced early, sandbox builds create evidence, and developers authorize promotion.
