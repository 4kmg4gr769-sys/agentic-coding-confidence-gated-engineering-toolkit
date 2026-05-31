# Acceptance Criteria Test Map

Generated: 2026-05-31T00:01:40.363Z

## AC 1

Show the Renewal Risk banner on Account records when Renewal_Risk_Score__c is greater than or equal to 80.

Suggested checks:
- Jest: verifies threshold boundary behavior
- Apex: verifies server side threshold logic if applicable

## AC 2

Hide the banner when Renewal_Risk_Score__c is blank.

Suggested checks:
- Jest: verifies empty or hidden state
- Manual: verify record with missing data

## AC 3

Only users with the Renewal Risk permission set should see the banner.

Suggested checks:
- Jest: renders or hides UI based on permission state
- Apex: verifies permission aware data access where server logic is used

## AC 4

Show an error state if the risk service is unavailable.

Suggested checks:
- Jest: displays error state when service call fails
- Manual: verify user facing error copy in Lightning
