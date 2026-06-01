# Roadmap & Help Wanted

This document outlines planned improvements and where community contributions are most valuable.

---

## Current Status: Early Draft (v0.1)

**What's working**:
- ✅ Core framework: Confidence gating model, readiness rubric, human control principles
- ✅ Templates: Jira scoring, LWC checklists, clarification questions, prompt packs
- ✅ Utilities: Dependency-free Node.js tools for scoring, scanning, handoff generation
- ✅ Salesforce/LWC implementation pack (first concrete platform)
- ✅ Hugging Face Space: Interactive demo of scoring model

**What needs work**:
- 🔄 Integration examples (GitHub, Jira, Azure DevOps, Jenkins)
- 🔄 Non-Salesforce implementation packs
- 🔄 Case studies and validation results
- 🔄 Automated CI/CD pipeline templates
- 🔄 Advanced risk detection (performance, security, data privacy)

---

## Planned (Next 60 Days)

### High Priority

**1. GitHub Integration** (2 weeks)
- [ ] GitHub Actions workflow template
- [ ] Example: Gate PR merges on readiness score
- [ ] Example: Attach impact map to PR checks
- [ ] Example: Block merge if confidence < threshold
- **Why**: GitHub is primary for many teams; natural integration point
- **Help wanted**: GitHub Actions expertise, example workflows

**2. Test Coverage Patterns** (1 week)
- [ ] LWC Jest test mapping templates
- [ ] Apex test structure recommendations
- [ ] Coverage threshold guidance (70%? 80%? 90%?)
- [ ] Example test suites (mocked, runnable)
- **Why**: Test coverage is top readiness signal
- **Help wanted**: Jest/Apex test experts, coverage benchmarks

**3. Examples & Sample Outputs** (1 week)
- [ ] Before/after readiness cards (real-world-like)
- [ ] Sample impact maps for common patterns
- [ ] Annotated developer handoff documents
- [ ] Metadata risk reports
- **Why**: Show don't tell—examples build credibility
- **Help wanted**: Example contributions, case studies

**4. Jira Integration Webhook** (2 weeks)
- [ ] Jira server/cloud webhook template
- [ ] Custom field mappings (Score, Confidence, Risk, Build Decision)
- [ ] Automatic comment templates for clarifications
- [ ] Example: Score on issue creation, daily rescore
- **Why**: Jira is dominant in enterprise; tight integration needed
- **Help wanted**: Jira admin experience, webhook debugging

---

### Medium Priority

**5. Azure DevOps Pipe Lines** (2 weeks)
- [ ] Azure Pipelines YAML template
- [ ] Work item readiness checks
- [ ] Build gate based on confidence score
- [ ] Example: Gate release to QA, Staging, Prod
- **Why**: Azure DevOps gaining adoption
- **Help wanted**: Azure DevOps pipeline experience

**6. Spring Boot Implementation Pack** (2 weeks)
- [ ] Spring Boot equivalent of LWC checklist
- [ ] Dependency scanning (Maven, Gradle)
- [ ] Test coverage mapping (JUnit, integration tests)
- [ ] Permission/security impact (Spring Security, roles)
- **Why**: Java/Spring dominates backend development
- **Help wanted**: Spring Boot experts, example scanning logic

**7. Django / Python Implementation Pack** (2 weeks)
- [ ] Django model and view impact mapping
- [ ] Test pattern recommendations (pytest, Django TestCase)
- [ ] Permission/auth scanning (Django permissions, groups)
- [ ] Example scanning utilities
- **Why**: Python/Django widely used; complements Salesforce focus
- **Help wanted**: Django experts, scanning logic

**8. Performance & Security Risk Scanners** (2 weeks)
- [ ] Detect common performance anti-patterns
- [ ] Flag security issues (hardcoded secrets, SQL injection patterns)
- [ ] Suggest performance thresholds (API latency, query time)
- [ ] Security checklist (OWASP top 10, CWE patterns)
- **Why**: Risk detection is key differentiator
- **Help wanted**: Security experts, performance profiling experience

---

### Lower Priority (60+ Days)

**9. Copado Integration** (Backlog)
- [ ] Pre-validated requirements fed into Copado
- [ ] Metadata risk assessment as deployment check
- [ ] Developer handoff linked in Copado
- **Why**: Enterprise Salesforce teams use Copado
- **Help wanted**: Copado expert users, API examples

**10. AutoRABIT Integration** (Backlog)
- [ ] Similar to Copado
- [ ] Custom field mappings to AutoRABIT metadata
- **Why**: Complement Copado, serve broader Salesforce ecosystem
- **Help wanted**: AutoRABIT expert users

**11. GitLab CI / Jenkins Integration** (Backlog)
- [ ] GitLab CI template
- [ ] Jenkins Declarative Pipeline template
- [ ] Merge request / PR approval gating
- **Why**: Jenkins and GitLab complement GitHub
- **Help wanted**: GitLab CI and Jenkins expertise

**12. Internal Tool Adapters** (Backlog)
- [ ] Custom Linear integration
- [ ] Custom Plane integration
- [ ] Template for custom issue trackers
- **Why**: Every team has unique tooling
- **Help wanted**: Integration pattern examples

---

## Validation & Case Studies

### What We Need

1. **Real-world pilots** (anonymized)
   - What readiness signals actually prevent rework?
   - Do confidence gates reduce deployment failures?
   - How much time savings from clarity questions?
   - What is realistic confidence threshold?

2. **Benchmark data**
   - Baseline: tickets reaching developers with missing info
   - After gating: reduction in rework
   - Before/after cycle time
   - Team satisfaction scores

3. **Integration learnings**
   - What broke in your platform?
   - How did you adapt templates?
   - Gotchas and workarounds?

### How to Contribute

- [ ] Run a 2-week pilot, track metrics, share findings
- [ ] Post case study (anonymized) in `docs/case-studies/`
- [ ] Include: baseline, implementation, results, lessons learned
- [ ] Tag: `case-study`, `validation`

---

## Community Contribution Ideas

### "I'm a [role], how can I help?"

#### Software Engineers
- [ ] Implement integration templates (GitHub, Jira, Azure DevOps)
- [ ] Create implementation packs (Spring Boot, Django, Node.js)
- [ ] Build platform-specific risk scanners
- [ ] Write example utilities or adapters
- [ ] Test current utilities, file bugs

#### Architects / Technical Leads
- [ ] Review framework for enterprise fit
- [ ] Suggest platform dependencies we're missing
- [ ] Propose release gate patterns
- [ ] Validate confidence thresholds

#### Product Managers
- [ ] Suggest clarification questions we're missing
- [ ] Review question bank for your domain
- [ ] Contribute use cases
- [ ] Help with competing frameworks / comparisons

#### QA / Test Engineers
- [ ] Define test mapping patterns
- [ ] Create test plan templates
- [ ] Suggest coverage thresholds
- [ ] Build test validation examples

#### Security / Compliance
- [ ] Review for data privacy risks
- [ ] Suggest security scanning rules
- [ ] Contribute compliance checklist
- [ ] Help with audit trail design

#### DevOps / Release Management
- [ ] Design release gate templates
- [ ] Integrate with Copado, AutoRABIT, other platforms
- [ ] Test in your infrastructure
- [ ] Contribute deployment patterns

#### Thought Leaders / Writers
- [ ] Write case studies
- [ ] Publish adaptations to your platform
- [ ] Discuss "AI agents + human control" framing
- [ ] Contribute to go-to-market materials

---

## How to Get Started Contributing

### Option 1: Join Discussions
- Start a discussion: "How would this work for [your platform]?"
- Vote on features
- Share feedback on templates

### Option 2: Create an Issue
- Report a bug or missing feature
- Propose a new integration
- Suggest a platform-specific implementation pack
- Tag: `help-wanted`, `good-first-issue`, `integration`

### Option 3: Submit a PR
- Fork the repo
- Create a branch: `feature/github-integration` or `pack/spring-boot`
- Add your work
- Submit PR with description
- See `CONTRIBUTING.md` for guidelines

### Option 4: Start a Pilot
- Implement this in your organization
- Measure and track results
- Share findings and metrics
- Contribute case study

---

## Success Criteria

We'll know the framework is working when:

✅ **Adoption**: 50+ teams using confidence gating
✅ **Integrations**: Available for GitHub, Jira, Azure DevOps, Copado, AutoRABIT
✅ **Platforms**: Salesforce/LWC, Spring Boot, Django, Node.js packs
✅ **Results**: Teams report:
  - 30%+ reduction in rework due to unclear requirements
  - 20%+ faster cycle time from intake to build
  - 40%+ fewer deployment failures from missing dependencies
  - Higher developer satisfaction (stronger handoffs)
✅ **Community**: Regular contributions, active discussions, shared learnings

---

## Questions?

Open a discussion or issue with `[roadmap]` tag. We want to build what's most valuable for your team.
