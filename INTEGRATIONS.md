# Integration Paths

The confidence gated engineering framework is platform-neutral and designed to work upstream of your existing tooling. Below are integration patterns for common platforms.

---

## GitHub / GitHub Copilot

### Use Case
Gate pull requests and code pushes on confidence thresholds. Integrate readiness scoring into code review workflows.

### Integration Points

```yaml
# Example: GitHub Actions workflow
name: Confidence Gate Check
on: [pull_request]
jobs:
  readiness-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Score PR readiness
        run: |
          # Call readiness-lint with PR title/description
          node sfdx-agentic-toolkit.js readiness-lint \
            --input pr-context.json \
            --out readiness-report.md
      - name: Block if confidence too low
        if: failure()
        run: |
          # Gate merge based on confidence score
          exit 1
```

### Artifacts
- Readiness card posted as PR comment
- Confidence score blocks merge if below threshold
- Impact map attached to PR checks

### Implementation Timeline
**Status**: Reference implementation in progress.

---

## Jira / Atlassian

### Use Case
Automatically score issues on creation or at scheduled intervals. Post clarification questions as comments. Update custom fields with confidence scores.

### Integration Points

```yaml
# Example: Jira webhook + scoring service
- Jira issue created → Webhook fires
- Scoring agent receives issue JSON
- Computes readiness score + confidence
- Updates custom fields: "Score", "Confidence Gate", "Risk Level"
- Posts clarification questions as comment if score < threshold
- Updates issue status: "Ready for Build" or "Needs Clarification"
```

### Custom Fields (Suggested)
- **Readiness Score** (0-100 range)
- **Confidence Gate** (Low / Medium / High)
- **Risk Level** (Low / Medium / High)
- **Build Authorized** (Yes / No / Pending)
- **Agent Decision** (Build Allowed / Needs Clarification / Blocked)

### Artifacts
- `templates/jira-readiness-scorecard.csv` — Upload scoring rules
- `templates/jira-comment-templates.md` — Clarification question formats
- `templates/region-gate-template.md` — Release gate automation

### Implementation Timeline
**Status**: Template-driven; webhook integration planned.

---

## Salesforce / Copado

### Use Case
Pre-deployment readiness checks. Metadata risk scanning. Permission impact assessment before sandbox builds.

### Integration Points

```
Copado Release Pipeline
  ↓
Ingestion: Jira issue → Salesforce feature branch
  ↓
Readiness Gate Agent
  ├─ Scans LWC components (templates/lwc-delivery-checklist.md)
  ├─ Maps Apex dependencies
  ├─ Flags permission & FLS risks
  ├─ Checks Jest / Apex test coverage
  └─ Produces handoff document
  ↓
If confidence high → Authorize sandbox build
If confidence low  → Request clarifications
  ↓
Sandbox Build Attempt (utilities/sfdx-agentic-toolkit.js)
  ├─ impact-map: LWC → Apex → Metadata
  ├─ metadata-risk: Deployment risk assessment
  └─ ac-test-map: Acceptance criteria → test coverage
  ↓
Developer Review + Authorization
  ↓
Copado Release Management (existing flow)
```

### Artifacts
- `templates/lwc-delivery-checklist.md` — Scoring template
- `utilities/sfdx-agentic-toolkit.js` — Scanning and impact mapping
- `templates/prompt-pack.md` — Prompts for Salesforce-specific agents

### Implementation Timeline
**Status**: Core implementation; Copado integration in progress.

---

## AutoRABIT

### Use Case
Inspect metadata and requirements quality before AutoRABIT ingestion. Reduce deployment failures from incomplete requirements.

### Integration Points

```
Jira Requirement
  ↓
Readiness Scoring (confidence gate)
  ↓
Metadata Risk Scan (utilities/metadata-risk)
  ↓
AutoRABIT Ingestion
  ├─ Pre-validated requirements
  ├─ Metadata risk assessment
  └─ Developer handoff with evidence
  ↓
AutoRABIT Release Pipeline (existing)
```

### Artifacts
- `templates/region-gate-template.md` — Release gate template
- Confidence gate output feeds AutoRABIT custom fields

### Implementation Timeline
**Status**: Framework designed; AutoRABIT partnership TBD.

---

## Azure DevOps

### Use Case
Integrate readiness scoring into Azure Pipelines. Gate builds on confidence thresholds.

### Integration Points

```yaml
# Example: Azure Pipelines template
trigger:
  - main

pool:
  vmImage: 'ubuntu-latest'

steps:
- task: NodeTool@0
  inputs:
    versionSpec: '16.x'

- script: |
    node sfdx-agentic-toolkit.js readiness-lint \
      --input work-item-context.json \
      --out readiness-report.md
  displayName: 'Score work item readiness'

- script: |
    # Gate pipeline based on confidence score
    if [ "$CONFIDENCE_SCORE" -lt 70 ]; then
      echo "##vso[task.logissue type=error]Confidence too low for build"
      exit 1
    fi
  displayName: 'Check confidence gate'
```

### Artifacts
- Readiness report attached to pipeline run
- Gate status visible in build logs

### Implementation Timeline
**Status**: Planned; contributions welcome.

---

## GitLab / GitLab CI

### Use Case
Integrate into merge request approval process. Score requirements before code review.

### Integration Points

```yaml
# .gitlab-ci.yml
readiness-check:
  image: node:16
  script:
    - node sfdx-agentic-toolkit.js readiness-lint \
        --input mr-context.json \
        --out readiness-report.md
    - |
      if [ "$CONFIDENCE_SCORE" -lt 70 ]; then
        echo "Merge request requires readiness approval"
        exit 1
      fi
  artifacts:
    reports:
      dotenv: readiness.env
```

### Implementation Timeline
**Status**: Planned; contributions welcome.

---

## Jenkins

### Use Case
Add readiness checks to Jenkins declarative or scripted pipelines. Block downstream stages on confidence gates.

### Integration Points

```groovy
// Jenkinsfile
pipeline {
    agent any
    
    stages {
        stage('Readiness Check') {
            steps {
                sh '''
                    node sfdx-agentic-toolkit.js readiness-lint \
                      --input issue-context.json \
                      --out readiness-report.md
                '''
            }
        }
        
        stage('Gate: Build Authorization') {
            when {
                expression { env.CONFIDENCE_SCORE >= '70' }
            }
            steps {
                echo "Build authorized by confidence gate"
            }
        }
        
        stage('Build') {
            steps {
                // Existing build logic
            }
        }
    }
}
```

### Implementation Timeline
**Status**: Planned; contributions welcome.

---

## Linear / Plane / Other Issue Trackers

### Use Case
Similar to Jira—score requirements, post clarifications, gate builds.

### Integration Approach
1. Map issue tracker API to generic issue JSON schema
2. Call `readiness-lint` utility
3. Write results back to issue tracker via API

### Implementation Timeline
**Status**: Generic framework available; specific integrations wanted.

---

## Internal / Custom Platforms

The utilities are **intentionally dependency-free** and **standalone** so you can:

1. **Download** `sfdx-agentic-toolkit.js`
2. **Inspect** the source code
3. **Adapt** to your custom issue schema
4. **Integrate** into your internal tooling

**No API keys, no vendor lock-in, no external dependencies.**

---

## Integration Checklist

When implementing this framework with your platform, consider:

- ✅ **Issue Schema Mapping** — How do requirements arrive? (Jira, Linear, custom database?)
- ✅ **Webhook / Scheduled Runs** — Trigger readiness scoring: on creation, on schedule, on-demand?
- ✅ **Custom Fields** — Where to store readiness score, confidence, risk, build decision?
- ✅ **Approval Gates** — How do humans authorize next steps? (Issue comment, approval workflow, custom flow?)
- ✅ **Artifact Storage** — Where to store handoff documents, impact maps, test plans?
- ✅ **Error Handling** — What happens if scoring fails? How to surface errors?
- ✅ **Audit Trail** — Log agent decisions, scores, confidence, and evidence for compliance?
- ✅ **Feedback Loop** — How to validate that gates are effective? Measure reduction in rework?

---

## How to Request a New Integration

1. **Open an issue** describing your platform and use case
2. **Reference templates** showing how your platform handles issues, approvals, and promotion
3. **Include examples** of your issue/work item schema
4. **Tag**: `integration` + `platform-name`

See **CONTRIBUTING.md** for guidelines.

---

## Want to Build an Integration?

Contributions welcome! Start by:

1. Reviewing `utilities/sfdx-agentic-toolkit.js` (reference implementation)
2. Forking and creating an `integrations/` folder in your branch
3. Adding a new file: `integrations/your-platform.md` with the pattern above
4. Including example configuration files (YAML, JSON, etc.)
5. Submitting a PR with your draft

See **CONTRIBUTING.md** for public-safe feedback guidelines.
