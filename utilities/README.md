# Utilities

This folder contains small starter utilities that make the framework operational.

The current draft utility is dependency free and runs with Node.js.

## Commands

```powershell
node sfdx-agentic-toolkit.js impact-map --repo C:\path\to\salesforce-repo --out impact-report.md
```

Scans a Salesforce DX repo for:

- LWC components
- Apex imports
- schema imports
- Lightning targets
- Jest tests
- custom objects and fields

```powershell
node sfdx-agentic-toolkit.js metadata-risk --repo C:\path\to\salesforce-repo --out metadata-risk.md
```

Scans metadata counts and flags deployment risk.

```powershell
node sfdx-agentic-toolkit.js readiness-lint --input sample-issue.json --out readiness-card.md
```

Scores a Jira like issue JSON and produces a build readiness card.

```powershell
node sfdx-agentic-toolkit.js ac-test-map --input sample-acceptance-criteria.txt --out test-map.md
```

Turns acceptance criteria into initial test ideas.

## Notes

These utilities are intentionally simple. They are meant to be downloadable proof of concept helpers, not a replacement for a secure internal implementation.

