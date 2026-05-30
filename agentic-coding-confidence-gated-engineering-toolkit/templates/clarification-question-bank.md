# Clarification Question Bank

Use these questions when a Jira issue does not meet the confidence threshold for agent-assisted build.

## Product Questions

- What user role is this change for?
- What problem should the user be able to solve after this ships?
- What should happen when the relevant field or data source is blank?
- What is the expected loading state?
- What should the user see when the backend call fails?
- Is this required on desktop Lightning, mobile, Experience Cloud, or all three?
- Which acceptance criterion is the highest priority?
- Are there existing screens or components this should match?
- What is explicitly out of scope?
- Who can approve the final behavior if implementation tradeoffs appear?

## Salesforce Data Questions

- Which object or objects does this depend on?
- Which fields are required?
- Are record types relevant?
- Are there expected threshold values or business rules?
- Does this need to work for historical data?
- Are validation rules or flows part of the expected behavior?

## Permission And Security Questions

- Which profiles or permission sets should see this feature?
- Should the component hide when a user lacks access, or show a disabled/error state?
- Are field-level security rules expected to control visibility?
- Are there sharing model assumptions?
- Is any sensitive or regulated data displayed?

## Developer Questions

- Should this follow an existing LWC pattern in the repo?
- Should the component use Lightning Data Service, UI API, or Apex?
- Is there an existing Apex service that should be reused?
- Are there performance or governor-limit concerns?
- Should this be implemented as a new component or an enhancement to an existing one?
- Which tests would give you confidence before promotion?

## Bug Reproduction Questions

- Which org or sandbox did this happen in?
- What user profile or permission set was active?
- What exact record was used?
- What browser and device were used?
- What were the steps to reproduce?
- What was expected?
- What actually happened?
- Were there console errors, Apex errors, or failed network calls?
- Has this worked before?
- Is the issue intermittent or consistent?

