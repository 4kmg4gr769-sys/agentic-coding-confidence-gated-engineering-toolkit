# Contributing

Thanks for helping improve the Agentic Coding Confidence Gated Engineering Toolkit.

This project is an early draft framework for confidence gated agentic engineering. The most useful contributions are practical, specific, and grounded in real delivery experience.

## Good Feedback

Useful feedback includes:

- a readiness signal that should be added to the scorecard
- a platform or metadata risk the scanner should detect
- a better LWC/Apex test mapping pattern
- a release gate that is missing or unrealistic
- an example of where the workflow would slow a team down
- a vendor or release management integration that would make the model more useful

## Public Safety Reminder

Please do not include confidential employer, customer, vendor, Jira, Salesforce org, or production data in issues, discussions, examples, or pull requests.

Use fictional examples or sanitized patterns.

## Local Utility Checks

From the `utilities` folder:

```powershell
node sfdx-agentic-toolkit.js --help
node sfdx-agentic-toolkit.js readiness-lint --input sample-issue.json --out sample-readiness-card.md
node sfdx-agentic-toolkit.js ac-test-map --input sample-acceptance-criteria.txt --out sample-test-map.md
```

The utility is dependency free by design.
