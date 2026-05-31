# Release Region Gate Template

Use this to define controlled movement through agent assisted engineering delivery regions.

## Intake

Entry:
- Jira issue created or updated.
- Issue matches the team's agent assisted build criteria.

Exit:
- requirements check has run.
- score, confidence, risk, and feedback are logged.

Authorization:
- automatic.

## Requirements Validated

Entry:
- readiness score meets threshold, or Product clarifications have been answered.
- no product intent blockers remain.

Exit:
- build decision is recorded.
- assigned developer is identified.

Authorization:
- Product for product intent closure.
- assigned developer for technical ambiguity.

## Sandbox Build

Entry:
- build allowed by score, confidence, and risk rules.
- issue has enough implementation detail.

Exit:
- patch or spike exists.
- LWC/Apex/metadata impact is documented.
- tests or validation checks have run where applicable.

Authorization:
- automatic entry only above threshold.
- no promotion from this region without developer review.

## Developer Review

Entry:
- sandbox build or implementation handoff is available.
- validation evidence is attached.

Exit:
- developer approves, rejects, or requests patch.

Authorization:
- assigned developer.

## QA / Integration

Entry:
- developer authorizes promotion.
- release platform receives validated evidence.

Exit:
- QA or integration validation completes.

Authorization:
- release manager or configured release process.

## Release Candidate

Entry:
- integration validation passes.
- deployment package is complete.

Exit:
- production release is approved.

Authorization:
- release governance.

## Production

Entry:
- release is approved.
- deployment window and rollback plan are confirmed.

Exit:
- post release validation is complete.

Authorization:
- release governance.
