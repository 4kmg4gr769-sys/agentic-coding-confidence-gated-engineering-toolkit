# Examples & Sample Outputs

This document shows what readiness scoring, impact mapping, and developer handoffs actually look like.

---

## Example 1: Readiness Scoring in Action

### Scenario
A Product Manager creates a Jira ticket for a new dashboard feature in Salesforce.

### Before: Unclear Requirement

```
Jira Ticket: CRM-4821
Title: Add metrics to the Account dashboard
Description: We need to show some numbers on the Account dashboard
Assignee: @sarah_dev
Acceptance Criteria:
- Metrics should display
- It should be fast
```

**Problem**: Vague. Missing platform, permission, and technical details.

### Readiness Scoring Input

```json
{
  "jiraKey": "CRM-4821",
  "title": "Add metrics to the Account dashboard",
  "description": "We need to show some numbers on the Account dashboard",
  "acceptanceCriteria": [
    "Metrics should display",
    "It should be fast"
  ],
  "assignee": "sarah_dev",
  "epic": "Reporting & Analytics",
  "storyPoints": 5
}
```

### Agent Scoring Output

```
## Readiness Assessment: CRM-4821

**Overall Score**: 42 / 100
**Confidence**: Low (Agent is uncertain about several dimensions)
**Recommendation**: ❌ BLOCKED - Needs Product Clarification

---

### Scoring Breakdown

| Category | Score | Notes |
|----------|-------|-------|
| **Requirement clarity** | 2/5 | "Add metrics" is too vague. Which metrics? Which users? |
| **Acceptance criteria** | 1/5 | "Should display" and "should be fast" are not testable. |
| **Platform surface** | 1/5 | No mention of Account page, Lighting Experience, mobile, or Experience Cloud. |
| **Code impact** | 1/5 | LWC component? Apex? Apex integration? Unknown. |
| **Data model** | 2/5 | Which Account fields are needed? Custom fields? Related objects? |
| **Permissions** | 0/5 | No mention of who sees this or permission sets. |
| **UX states** | 0/5 | Empty state? Error state? Loading? Offline? Not defined. |
| **Testability** | 1/5 | How do we know "fast" is fast? No thresholds defined. |
| **Release risk** | 3/5 | Account page is stable, but unknown scope adds risk. |

---

### Confidence Analysis

**High confidence in**: Account page is a real place; the team has deployed there before
**Low confidence in**: Everything else—this is severely underspecified

---

### Clarification Questions for Product

```
I cannot authorize a sandbox build for CRM-4821 yet. Three key clarifications are needed:

1. **Which metrics?**
   - Are these new calculations, or do they already exist in Salesforce?
   - Examples: Total revenue? Pipeline forecast? Win rate?

2. **Audience & permissions?**
   - Who should see these metrics? (All Account viewers? Sales only? Managers only?)
   - Are there data access restrictions? (e.g., can a rep see all accounts or just their region?)

3. **Desktop or all platforms?**
   - Lightning desktop only, or also:
     - Salesforce Mobile app?
     - Experience Cloud portal?

Once answered, I will rescore and determine if a sandbox build can start.
Please update Jira thread with answers.
```

**Estimated time to clarify**: 1-2 hours

---

## Example 2: After Clarification → Build Authorized

### Updated Ticket: CRM-4821 (After Product Answers)

```
Jira Ticket: CRM-4821
Title: Add metrics to the Account dashboard
Description:
  Show Account YTD Revenue and Pipeline Forecast on the Account detail page.
  Metrics use existing Salesforce data: Account.AnnualRevenue and Opportunity rollup.

Acceptance Criteria:
  1. Display YTD Revenue (read from Account.AnnualRevenue) in a card
  2. Display Pipeline Forecast (sum of open Opportunities) in a card
  3. Load within 1 second (including network latency)
  4. Show "-" if no data (empty state)
  5. Show error message if rollup fails
  6. Visible to all Account viewers (no custom permissions needed)
  7. Desktop Lightning only (not mobile or Experience Cloud initially)

Release Gates:
  - QA: Account page functional testing
  - Staging: Performance testing with production-like data
  - Production: Account owner approval (Brandi Martinez)

Dependencies:
  - No changes to data model (existing fields)
  - No permission set changes
  - Jest and Apex test coverage required
```

### Agent Rescoring Output

```
## Readiness Assessment: CRM-4821 (Rescored)

**Overall Score**: 87 / 100
**Confidence**: High
**Recommendation**: ✅ BUILD ALLOWED (Low-risk feature, well-specified)

---

### Scoring Breakdown

| Category | Score | Notes |
|----------|-------|-------|
| **Requirement clarity** | 5/5 | Clear: YTD Revenue + Pipeline Forecast, existing data. |
| **Acceptance criteria** | 5/5 | All criteria are observable and testable. |
| **Platform surface** | 5/5 | Account detail page, Lightning desktop, no special considerations. |
| **Code impact** | 5/5 | New LWC component + existing Apex utilities (low risk). |
| **Data model** | 5/5 | Uses existing Account and Opportunity fields. No migrations. |
| **Permissions** | 5/5 | No custom permissions. Uses existing Account viewer visibility. |
| **UX states** | 5/5 | Empty state defined. Error state defined. |
| **Testability** | 4/5 | 1-second load time is testable. Jest + Apex tests required. |
| **Release risk** | 4/5 | Low risk. No metadata changes. Isolated to Account page. |

---

### Impact Map

```
Requirement: Add metrics cards to Account page
  ↓
  ├─ LWC Component
  │  └─ MetricsCard.lwc
  │     └─ Uses: LWC utilities (existing)
  │     └─ Uses: Apex service (existing)
  │     └─ Tests: MetricsCard.test.js (new)
  │
  ├─ Apex Service (Existing - No changes)
  │  └─ AccountMetricsService.cls
  │     └─ getYTDRevenue()
  │     └─ getPipelineForecast()
  │     └─ Tests: AccountMetricsService_Test.cls (existing)
  │
  ├─ Data Dependencies
  │  ├─ Account.AnnualRevenue (existing field)
  │  ├─ Opportunity (related object, no FLS changes)
  │  └─ RecordType (no changes)
  │
  ├─ Permission Impact
  │  └─ None—uses existing "View Account" permission
  │
  └─ Deployment
     └─ LWC component only
     └─ No metadata changes
     └─ No permission set changes
```

---

### Developer Handoff Document

```markdown
# Developer Handoff: CRM-4821

## Requirement Summary
Add YTD Revenue and Pipeline Forecast metric cards to Account detail page.
Use existing data sources. Desktop Lightning only.

## Readiness Score: 87/100 ✅ BUILD ALLOWED

### Score Breakdown
- Requirement clarity: 5/5
- Acceptance criteria: 5/5 (all testable)
- Platform surface: 5/5 (isolated to Account page)
- Data model: 5/5 (no migration)
- Permissions: 5/5 (existing visibility)
- UX states: 5/5 (defined)
- Testability: 4/5 (load time measurable)
- Release risk: 4/5 (low)

## Technical Recommendations

### Component Structure
```
src/
  lwc/
    metricsCard/
      metricsCard.js
      metricsCard.html
      metricsCard.css
      metricsCard.test.js (new)
      __tests__/
        metricsCard.test.js
```

### Test Plan

**Jest Unit Tests** (New)
- Render with data → displays YTD Revenue and Forecast
- Render with empty data → shows "-"
- Render with error state → shows error message
- Load time < 1 second (mock)

**Apex Test** (Existing - No changes needed)
- AccountMetricsService tests already cover YTD and Forecast logic

**Manual Test** (QA)
- Load Account detail page
- Verify cards render
- Verify load time < 1 second (use browser DevTools)
- Verify empty state (Account with no revenue data)
- Verify error state (if Apex service fails)

### Known Dependencies
- LWC utilities (existing): `lwc/utils/*`
- Apex service (existing): `AccountMetricsService.cls`

### Assumptions
- Account.AnnualRevenue is populated for test data
- Opportunity rollup logic in AccountMetricsService is correct
- Desktop Lightning is sufficient scope (mobile deferred)

### Next Steps
1. Developer reviews handoff
2. Create feature branch from `main`
3. Implement LWC component
4. Run `npm test` (Jest)
5. Run `sfdx force:apex:test:run` (Apex)
6. Sandbox build & manual test
7. Developer approves or returns to agent for patches
8. Promote through QA → Staging → Production gates

## Questions for Developer?
Reply in Jira or `@mention` the agent.
```

---

## Example 3: Blocked by Risk — Metadata Safety Gate

### Scenario
Another ticket arrives: "Add custom permission set to control feature visibility."

### Agent Scoring Output

```
## Readiness Assessment: CRM-4822

**Overall Score**: 52 / 100
**Confidence**: Medium
**Recommendation**: ⚠️ BLOCKED BY METADATA RISK - Needs Technical Spike

---

### Risk Analysis

**Metadata Risk Detected**:

| Risk Type | Finding | Impact |
|-----------|---------|--------|
| **Permission Sets** | New custom permission set required | Affects: 5 permission sets, 120+ users, 3 profile overrides |
| **FLS** | New field may need FLS updates | Existing pattern: 8 custom objects, 50+ fields with FLS rules |
| **Sharing** | Potential sharing impact | Account sharing rules interact with object sharing |
| **Deployment** | No metadata tests in repo | Cannot validate impact before production |

**Recommended Path**:

1. **Technical Spike (2-3 days)**
   - Map all permission set dependencies
   - Review existing FLS patterns
   - Draft sharing impact assessment
   - Propose metadata test strategy

2. **Then Rescore**
   - Once spike completes, technical uncertainty drops
   - Readiness score will likely increase to 75+
   - Build can proceed

**Questions for Developer**:
```
Technical spike needed before build authorization:

1. Which permission set is the new "Custom Permission" tied to?
   - Is it a new custom permission or leveraging existing?
   - How many users are affected?

2. Are there existing FLS rules that intersect?
   - Example: if this controls access to a new field, which fields on which objects?

3. Is there a test pattern in the codebase for permission set validation?
   - Or should we create one as part of this spike?

Estimated spike time: 2 days
After spike: rerun readiness scoring
```

---

## Example 4: Clarification Loop in Action

### Jira Thread Flow

**Initial Ticket**:
```
CRM-4823: "Update reporting filters"
Description: Users need better filters on reports
```

**Agent Comment (1) - First Assessment**:
```
🤖 Readiness Score: 38/100 ❌ NEEDS PRODUCT CLARIFICATION

I cannot authorize a sandbox build yet. Three clarifications:

1. Which reports? (5 reports in the Reporting dashboard, or specific ones?)
2. What filters? (Date range? Owner? Status? Custom fields?)
3. Performance: Must filter complete in <2 seconds on 1M+ records?

Please reply in this thread.
```

**Product Manager Replies**:
```
Good questions!

1. Just the Pipeline report for now (CRM_Pipeline_Forecast)
2. Add filters for: Date range (default last 90 days), Owner, Stage
3. Yes, should be fast—users get impatient if >2 seconds
```

**Agent Comment (2) - Rescore**:
```
🤖 Updated Score: 71/100 ⚠️ NEEDS DEVELOPER CONFIRMATION

Thanks! Much clearer. Two technical questions:

1. The Pipeline report pulls from Opportunity. Should filters be:
   - JavaScript (client-side, instant but limited data)?
   - Apex (server-side, slower but handles 1M+ records)?
   
2. Can we reuse existing filter utilities from `ReportFilters.cls`?
   - Or are these filters unique to Pipeline report?

@sarah_dev please confirm before sandbox build.
```

**Developer Replies**:
```
Good catches!

1. Use Apex server-side filters for 1M+ records.
2. Yes, we can reuse ReportFilters.cls—I'll use the existing patterns.

Approved to build. Moving forward.
```

**Agent Comment (3) - Build Authorized**:
```
✅ BUILD AUTHORIZED

Confidence: 88/100 (High)
Recommended Implementation:
- Use Apex server-side filtering (ReportFilters.cls patterns)
- Jest tests for filter logic
- Apex tests for performance (ensure <2 second response)
- Sandbox build starting...
```

---

## Example 5: Test Mapping from Acceptance Criteria

### Input: Acceptance Criteria

```
Given a user is viewing the Account dashboard
When the metrics cards are loaded
Then:
  1. YTD Revenue card displays
  2. Pipeline Forecast card displays
  3. Both cards load within 1 second
  4. If no data exists, show "-" placeholder
  5. If Apex service fails, show error message
```

### Agent Output: Test Plan

```markdown
## Test Plan Generated from Acceptance Criteria

### Unit Tests (Jest - New)

**Test 1: Render with Data**
```javascript
describe('MetricsCard', () => {
  test('displays YTD Revenue and Pipeline Forecast cards', () => {
    const mockData = {
      ytdRevenue: '2,500,000',
      pipelineForecast: '1,200,000'
    };
    const element = createElement('c-metrics-card', {
      object: { ...mockData }
    });
    expect(element.querySelector('.ytd-revenue').textContent)
      .toBe('2,500,000');
    expect(element.querySelector('.pipeline-forecast').textContent)
      .toBe('1,200,000');
  });
});
```

**Test 2: Empty State**
```javascript
test('shows placeholder when no data', () => {
  const mockData = { ytdRevenue: null, pipelineForecast: null };
  // ...
  expect(element.querySelector('.empty-state').textContent).toBe('-');
});
```

**Test 3: Error State**
```javascript
test('shows error message on Apex failure', () => {
  // Mock Apex service error
  // ...
  expect(element.querySelector('.error-message')).toBeTruthy();
});
```

**Test 4: Performance (Load Time)**
```javascript
test('loads data within 1 second', async () => {
  const startTime = performance.now();
  // Trigger data load
  // ...
  const endTime = performance.now();
  expect(endTime - startTime).toBeLessThan(1000); // 1 second
});
```

### Integration Tests (Apex)

**Test: Fetch YTD Revenue**
```apex
@isTest
static void testGetYTDRevenue() {
  Account testAccount = new Account(Name = 'Test', AnnualRevenue = 100000);
  insert testAccount;
  
  Decimal revenue = AccountMetricsService.getYTDRevenue(testAccount.Id);
  System.assertEquals(100000, revenue);
}
```

### Manual Test (QA)

- [ ] Load Account detail page in Lightning desktop
- [ ] Verify both cards render within 1 second (browser DevTools)
- [ ] Verify YTD Revenue matches Account.AnnualRevenue
- [ ] Verify Pipeline Forecast matches Opportunity rollup
- [ ] Create Account with null revenue, verify empty state
- [ ] Mock Apex error, verify error message displays

---

## Example 6: Metadata Risk Report

### Scenario
Before a Salesforce deployment, the toolkit scans for deployment risk.

### Command
```powershell
node sfdx-agentic-toolkit.js metadata-risk --repo C:\salesforce-repo --out metadata-risk.md
```

### Output

```markdown
# Metadata Risk Assessment

**Repository**: C:\salesforce-repo
**Scan Date**: 2024-06-15
**Risk Level**: 🟡 MEDIUM

## Overview

| Metric | Count | Risk |
|--------|-------|------|
| LWC Components | 24 | ✅ Normal |
| Apex Classes | 18 | ✅ Normal |
| Apex Triggers | 8 | ⚠️ High density (1 trigger per 20 objects) |
| Custom Objects | 12 | ✅ Normal |
| Permission Sets | 15 | ⚠️ Complex (5 permission set dependencies) |
| Flows | 22 | 🔴 HIGH RISK (22 flows is large) |
| Validation Rules | 45 | 🔴 HIGH RISK (45 validation rules is very high) |

## Risk Flags

### 🔴 HIGH RISK: Validation Rule Density (45 rules)
**Impact**: Deployment validation failures common; can block deployments
**Recommendation**: 
- Review and consolidate validation rules
- Add validation rule testing to CI/CD
- Consider Flows as alternative (more maintainable)

### 🔴 HIGH RISK: Flow Count (22 flows)
**Impact**: Execution order unpredictable; hard to test
**Recommendation**:
- Map flow dependencies
- Test in sandbox with production-like data
- Verify subflow trigger order

### ⚠️ MEDIUM RISK: Permission Set Complexity (5 dependencies)
**Impact**: Permission set changes can break multiple profiles
**Recommendation**:
- Document permission set inheritance tree
- Test permission set changes in sandbox
- Get security team approval before deployment

### ⚠️ MEDIUM RISK: Trigger Density (1 per 20 objects)
**Impact**: Hidden logic; hard to trace bugs
**Recommendation**:
- Document trigger purpose and dependencies
- Consider consolidating triggers on same object
- Add trigger test coverage

## Deployment Readiness

**Status**: ⚠️ PROCEED WITH CAUTION

**Before deploying**:
1. [ ] Run Apex test suite (must pass)
2. [ ] Test validation rules in sandbox
3. [ ] Test flow execution order in sandbox
4. [ ] Security team approval for permission set changes
5. [ ] Dry-run deployment check (validate only)
6. [ ] Change advisory board approval

**Estimated deployment time**: 45-60 minutes (due to validation rule count)
```

---

## Key Takeaways

These examples show:

✅ **Scoring** differentiates vague from well-specified tickets
✅ **Clarification loops** surface missing context early
✅ **Impact maps** show platform dependencies
✅ **Risk gates** prevent deployment failures
✅ **Test plans** map from requirements to coverage
✅ **Handoffs** give developers everything they need

All outputs are **human-readable, Jira-shareable, and audit-traceable**.
