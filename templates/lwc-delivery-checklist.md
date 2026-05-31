# Salesforce/LWC Agentic Delivery Checklist

Use this checklist before allowing an agent assisted sandbox build or before handing the issue to a developer.

## Requirement

- [ ] User goal is clear.
- [ ] Acceptance criteria are observable and testable.
- [ ] Edge cases are documented.
- [ ] Empty, loading, and error states are defined.
- [ ] Mobile, desktop, and Experience Cloud behavior are specified where relevant.

## Salesforce Surface

- [ ] Target app, page, record type, or experience is known.
- [ ] Related object or objects are identified.
- [ ] Required fields are identified.
- [ ] Page placement or Lightning App Builder target is understood.
- [ ] Existing flows, validation rules, and triggers have been considered.

## LWC And Apex

- [ ] Existing LWC components have been checked for reuse.
- [ ] New or changed LWC components are named.
- [ ] Apex controller or service dependencies are identified.
- [ ] Lightning Data Service versus Apex direction is clear.
- [ ] Wire, imperative Apex, caching, and refresh behavior are considered.

## Security And Permissions

- [ ] Profiles or permission sets are specified.
- [ ] Field level security impact is understood.
- [ ] Sharing model assumptions are stated.
- [ ] Guest or Experience Cloud access is addressed if applicable.
- [ ] Sensitive data exposure has been reviewed.

## Testing

- [ ] Jest scenarios are listed for LWC behavior.
- [ ] Apex tests are listed where server logic is affected.
- [ ] Manual validation steps are listed.
- [ ] Negative/error scenarios are included.
- [ ] Deployment validation path is identified.

## Release

- [ ] Metadata dependencies are known.
- [ ] Deployment order concerns are identified.
- [ ] Rollback or mitigation plan is understood.
- [ ] Developer authorization is required before promotion.
- [ ] Release manager has enough evidence for the next region.

