# Agentic Coding Confidence-Gated Prompt Pack

These prompts are designed for internal agents, coding assistants, or human-assisted workflows. Remove confidential data before using them with any external system.

## 1. Score Jira Ticket Readiness

```text
You are an engineering delivery readiness agent. Score the following Jira issue for agent-assisted build readiness.

Evaluate:
- requirement clarity
- acceptance criteria quality
- platform surface clarity
- code/service impact
- data model clarity
- permissions/FLS
- UX states
- testability
- release risk

Return:
- score from 0 to 100
- confidence: low, medium, high
- decision: Build Allowed, Needs Product Clarification, Needs Developer Clarification, Needs Technical Spike, Needs Reproduction, Blocked
- top 3 reasons
- top 5 clarification questions

Jira issue:
{{JIRA_ISSUE}}
```

## 2. Turn Gaps Into Product Questions

```text
Convert this requirements feedback into concise Product questions.

Rules:
- ask only questions that block implementation
- avoid jargon where possible
- group related questions
- do not criticize the ticket
- return a Jira-ready comment

Feedback:
{{REQUIREMENTS_FEEDBACK}}
```

## 3. Turn Gaps Into Developer Questions

```text
Convert this technical ambiguity into questions for the assigned developer.

Context:
- replace this section with the team's stack and architecture norms
- for the included Salesforce/LWC implementation pack, Lightning Web Components and Apex may be relevant
- developer must authorize promotion to the next release region

Return:
- recommended implementation direction
- questions needing confirmation
- evidence the agent should collect before build

Ambiguity:
{{TECHNICAL_AMBIGUITY}}
```

## 4. Map Implementation Impact

```text
Given the Jira issue and repo scan output, identify likely implementation impact.

Return:
- likely UI components
- services, controllers, or backend modules
- objects, fields, data models, or APIs
- permission, role, or data-access dependencies
- workflow, automation, or integration dependencies
- test files to inspect or create
- deployment risks

Jira issue:
{{JIRA_ISSUE}}

Repo scan:
{{REPO_SCAN}}
```

## 5. Generate Developer Handoff

```text
Create a developer handoff for this agent-assisted coding issue.

Include:
- summary
- requirement score and confidence
- implementation assumptions
- affected files
- metadata and permission dependencies
- test plan
- validation evidence
- open risks
- requested developer action

Inputs:
{{JIRA_ISSUE}}
{{READINESS_SCORE}}
{{REPO_SCAN}}
{{VALIDATION_RESULTS}}
```

## 6. Decide Sandbox Build Eligibility

```text
Decide whether an agent-assisted sandbox build should begin.

Rules:
- do not allow build if product intent is ambiguous
- do not allow build if permissions are unclear for sensitive data
- allow low-risk UI work at lower thresholds
- require developer confirmation for technical ambiguity
- explain the decision in one short Jira comment

Inputs:
Score: {{SCORE}}
Confidence: {{CONFIDENCE}}
Risk: {{RISK}}
Feedback: {{FEEDBACK}}
```
