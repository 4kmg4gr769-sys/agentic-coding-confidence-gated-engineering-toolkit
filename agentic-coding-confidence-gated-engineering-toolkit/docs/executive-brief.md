# Executive Brief: Agentic Coding Confidence-Gated Engineering

## Problem

Engineering teams lose time when Jira tickets reach developers before they are truly ready. In agent-assisted coding workflows, ambiguity around user behavior, permissions, platform dependencies, testing, and release impact often appears after development starts.

This creates rework, slower delivery, late release risk, and unnecessary back-and-forth among Product, Engineering, and Release Management.

## Proposal

Introduce a confidence-gated agentic engineering layer before work enters the build and release pipeline.

The system uses an existing or future requirements validity agent to score Jira tickets. When confidence is high enough, an agent attempts a sandbox build or implementation spike. When confidence is too low, the system converts feedback into targeted Product or developer questions. Developers remain responsible for review, patches, and authorization before promotion to the next release region.

## Why Start With Salesforce/LWC

The framework is platform-neutral, but Salesforce/LWC is a useful first implementation pack because it has many hidden dependencies:

- Lightning Web Components
- Apex controllers and services
- custom objects and fields
- permission sets, profiles, sharing, and FLS
- flows, validation rules, and triggers
- Jest and Apex testing
- sandbox and release-region promotion

An agentic readiness layer can surface platform-specific dependencies earlier and produce cleaner handoffs.

## Expected Value

- faster delivery by reducing unclear handoffs
- less rework from missing requirements
- earlier detection of code, platform, metadata, and permission gaps
- better Product and Engineering discussions
- stronger evidence before release-region promotion
- improved fit with tools such as Copado, AutoRABIT, Microsoft Copilot, OpenAI Codex, Anthropic Claude Code, and Salesforce

## Guardrails

- agents do not silently decide product intent
- agents do not promote without human authorization
- assigned developers review and approve movement to the next region
- release management tools remain the governed deployment system
- all agent decisions are logged with score, confidence, risk, and evidence

## Pilot

Start small. For the Salesforce/LWC implementation pack:

- one Jira project
- one Salesforce DX repo
- LWC stories and bugs
- nightly readiness scoring
- clarification comments in Jira
- sandbox build attempts only above defined score and confidence thresholds
- developer authorization before movement to QA or integration

## Success Measures

- fewer tickets returned for clarification after development starts
- shorter time from Jira intake to developer-ready handoff
- higher percentage of LWC tickets with defined test plans
- fewer failed validations caused by missing metadata or permissions
- improved developer confidence in AI-assisted build attempts

## Strategic Framing

This is not "AI replaces engineers." It is a new operating model for engineering:

> Agents accelerate discovery, validation, and implementation evidence. Humans retain judgment, review, and release authority.
