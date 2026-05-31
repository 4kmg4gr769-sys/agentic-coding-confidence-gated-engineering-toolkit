# Jira Comment Templates

## Build Allowed

```md
Build readiness check completed.

Decision: Build Allowed
Score: {{SCORE}}
Confidence: {{CONFIDENCE}}
Risk: {{RISK}}

Why:
- {{REASON_1}}
- {{REASON_2}}
- {{REASON_3}}

Next step:
Start an isolated sandbox build attempt and attach validation evidence for developer review.
```

## Product Clarification Needed

```md
I cannot start a sandbox build yet because the requirement needs clarification.

Questions:
1. {{QUESTION_1}}
2. {{QUESTION_2}}
3. {{QUESTION_3}}

Once answered, I will rerun the requirements readiness check.
```

## Developer Clarification Needed

```md
The requirement appears product ready, but implementation direction needs confirmation from the assigned developer.

Question:
{{QUESTION}}

Recommended path:
{{RECOMMENDATION}}

Please confirm before sandbox build begins.
```

## Build Failed

```md
Sandbox build attempt did not validate successfully.

What failed:
- {{FAILURE_1}}
- {{FAILURE_2}}

Likely cause:
{{LIKELY_CAUSE}}

Requested action:
{{REQUESTED_ACTION}}
```

## Developer Authorization Request

```md
Sandbox build completed and validation evidence is attached.

Validation:
- LWC Jest: {{JEST_RESULT}}
- Apex tests: {{APEX_RESULT}}
- Metadata validation: {{METADATA_RESULT}}

Changed areas:
- {{AREA_1}}
- {{AREA_2}}

Assigned developer action:
Please approve promotion to {{NEXT_REGION}}, reject, or request a patch.
```

