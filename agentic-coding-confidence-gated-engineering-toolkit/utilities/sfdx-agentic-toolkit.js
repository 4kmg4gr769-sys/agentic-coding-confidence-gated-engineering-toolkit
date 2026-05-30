#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const command = args[0];

function getArg(name, fallback) {
  const index = args.indexOf(name);
  if (index === -1 || index + 1 >= args.length) return fallback;
  return args[index + 1];
}

function usage() {
  return [
    "Agentic Coding Confidence-Gated Engineering Toolkit",
    "",
    "Commands:",
    "  impact-map --repo <path> [--out impact-report.md]",
    "  metadata-risk --repo <path> [--out metadata-risk.md]",
    "  readiness-lint --input <issue.json> [--out readiness-card.md]",
    "  ac-test-map --input <acceptance-criteria.txt> [--out test-map.md]",
    "",
  ].join("\n");
}

function walk(dir, predicate, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".git") continue;
      walk(fullPath, predicate, files);
    } else if (!predicate || predicate(fullPath)) {
      files.push(fullPath);
    }
  }
  return files;
}

function readText(file) {
  try {
    return fs.readFileSync(file, "utf8");
  } catch {
    return "";
  }
}

function writeOutput(outPath, content) {
  if (outPath) {
    fs.writeFileSync(outPath, content, "utf8");
    console.log(`Wrote ${outPath}`);
  } else {
    console.log(content);
  }
}

function relative(repo, file) {
  return path.relative(repo, file).replace(/\\/g, "/");
}

function matchAll(regex, text) {
  const values = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    values.push(match[1] || match[0]);
  }
  return values;
}

function parseTargets(metaXml) {
  return matchAll(/<target>([^<]+)<\/target>/g, metaXml);
}

function unique(values) {
  return Array.from(new Set(values.filter(Boolean))).sort();
}

function findDefaultRoot(repo) {
  const candidate = path.join(repo, "force-app", "main", "default");
  return fs.existsSync(candidate) ? candidate : repo;
}

function runImpactMap(repo, outPath) {
  const root = findDefaultRoot(repo);
  const lwcRoot = path.join(root, "lwc");
  const objectRoot = path.join(root, "objects");
  const lwcDirs = fs.existsSync(lwcRoot)
    ? fs.readdirSync(lwcRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory())
    : [];

  const components = lwcDirs.map((entry) => {
    const componentDir = path.join(lwcRoot, entry.name);
    const jsFiles = walk(componentDir, (file) => file.endsWith(".js") && !file.endsWith(".test.js"));
    const testFiles = walk(componentDir, (file) => file.endsWith(".test.js") || file.includes(`${path.sep}__tests__${path.sep}`));
    const metaFile = path.join(componentDir, `${entry.name}.js-meta.xml`);
    const jsText = jsFiles.map(readText).join("\n");
    const metaText = readText(metaFile);

    return {
      name: entry.name,
      path: relative(repo, componentDir),
      apexImports: unique(matchAll(/@salesforce\/apex\/([A-Za-z0-9_$.]+)/g, jsText)),
      schemaImports: unique(matchAll(/@salesforce\/schema\/([A-Za-z0-9_$.]+)/g, jsText)),
      targets: unique(parseTargets(metaText)),
      tests: testFiles.map((file) => relative(repo, file)),
    };
  });

  const objectFields = fs.existsSync(objectRoot)
    ? walk(objectRoot, (file) => file.endsWith(".field-meta.xml")).map((file) => relative(repo, file))
    : [];

  const lines = [
    "# LWC Impact Map",
    "",
    `Repo: ${repo}`,
    `Generated: ${new Date().toISOString()}`,
    "",
    `Components found: ${components.length}`,
    `Custom fields found: ${objectFields.length}`,
    "",
    "## Components",
    "",
  ];

  if (!components.length) {
    lines.push("No LWC components found.");
  }

  for (const component of components) {
    lines.push(`### ${component.name}`);
    lines.push("");
    lines.push(`Path: \`${component.path}\``);
    lines.push("");
    lines.push(`Apex imports: ${component.apexImports.length ? component.apexImports.map((v) => `\`${v}\``).join(", ") : "none found"}`);
    lines.push(`Schema imports: ${component.schemaImports.length ? component.schemaImports.map((v) => `\`${v}\``).join(", ") : "none found"}`);
    lines.push(`Lightning targets: ${component.targets.length ? component.targets.map((v) => `\`${v}\``).join(", ") : "none found"}`);
    lines.push(`Jest tests: ${component.tests.length ? component.tests.map((v) => `\`${v}\``).join(", ") : "none found"}`);
    lines.push("");
  }

  lines.push("## Custom Fields");
  lines.push("");
  if (objectFields.length) {
    for (const field of objectFields.slice(0, 100)) lines.push(`- \`${field}\``);
    if (objectFields.length > 100) lines.push(`- ...and ${objectFields.length - 100} more`);
  } else {
    lines.push("No custom field metadata found.");
  }

  writeOutput(outPath, lines.join("\n"));
}

function runMetadataRisk(repo, outPath) {
  const root = findDefaultRoot(repo);
  const categories = [
    ["LWC components", path.join(root, "lwc"), ".js-meta.xml"],
    ["Apex classes", path.join(root, "classes"), ".cls"],
    ["Apex triggers", path.join(root, "triggers"), ".trigger"],
    ["Flows", path.join(root, "flows"), ".flow-meta.xml"],
    ["Validation rules", path.join(root, "objects"), ".validationRule-meta.xml"],
    ["Custom fields", path.join(root, "objects"), ".field-meta.xml"],
    ["Permission sets", path.join(root, "permissionsets"), ".permissionset-meta.xml"],
    ["Profiles", path.join(root, "profiles"), ".profile-meta.xml"],
  ];

  const counts = categories.map(([name, dir, suffix]) => ({
    name,
    count: walk(dir, (file) => file.endsWith(suffix)).length,
  }));

  const weighted =
    counts.find((c) => c.name === "Profiles").count * 4 +
    counts.find((c) => c.name === "Permission sets").count * 3 +
    counts.find((c) => c.name === "Flows").count * 3 +
    counts.find((c) => c.name === "Validation rules").count * 3 +
    counts.find((c) => c.name === "Apex triggers").count * 3 +
    counts.find((c) => c.name === "Custom fields").count * 2 +
    counts.find((c) => c.name === "Apex classes").count +
    counts.find((c) => c.name === "LWC components").count;

  let risk = "Low";
  if (weighted >= 50) risk = "High";
  else if (weighted >= 15) risk = "Medium";

  const lines = [
    "# Salesforce Metadata Risk Scan",
    "",
    `Repo: ${repo}`,
    `Generated: ${new Date().toISOString()}`,
    "",
    `Overall metadata risk: ${risk}`,
    "",
    "## Counts",
    "",
    "| Category | Count |",
    "| --- | ---: |",
  ];

  for (const count of counts) {
    lines.push(`| ${count.name} | ${count.count} |`);
  }

  lines.push("");
  lines.push("## Notes");
  lines.push("");
  lines.push("- Profiles, permission sets, flows, validation rules, triggers, and object fields increase release risk.");
  lines.push("- Treat this as an early warning scan, not a substitute for Salesforce deployment validation.");
  lines.push("- Pair this report with a developer review and release-platform evidence.");

  writeOutput(outPath, lines.join("\n"));
}

function normalizeCriteria(criteria) {
  if (Array.isArray(criteria)) return criteria.join("\n");
  return criteria || "";
}

function hasAny(text, terms) {
  const lower = text.toLowerCase();
  return terms.some((term) => lower.includes(term));
}

function scoreIssue(issue) {
  const allText = [
    issue.title,
    issue.description,
    normalizeCriteria(issue.acceptanceCriteria),
    issue.salesforceSurface,
    (issue.objects || []).join(" "),
    (issue.fields || []).join(" "),
    (issue.permissions || []).join(" "),
    (issue.uxStates || []).join(" "),
  ].join("\n");

  const checks = [
    {
      name: "Requirement clarity",
      points: issue.description && issue.description.length > 40 ? 12 : 4,
      question: "Clarify the user goal and expected behavior.",
    },
    {
      name: "Acceptance criteria",
      points: normalizeCriteria(issue.acceptanceCriteria).length > 40 ? 14 : 3,
      question: "Add observable acceptance criteria.",
    },
    {
      name: "Salesforce surface",
      points: issue.salesforceSurface || hasAny(allText, ["record page", "lightning", "experience cloud"]) ? 10 : 2,
      question: "Specify the Salesforce page, app, object, or experience affected.",
    },
    {
      name: "Data model",
      points: (issue.objects || []).length || (issue.fields || []).length || hasAny(allText, ["__c", "account", "opportunity", "case"]) ? 10 : 2,
      question: "Identify required objects and fields.",
    },
    {
      name: "Permissions",
      points: (issue.permissions || []).length || hasAny(allText, ["permission", "profile", "fls", "sharing"]) ? 12 : 2,
      question: "Define profile, permission set, sharing, and FLS behavior.",
    },
    {
      name: "UX states",
      points: (issue.uxStates || []).length || hasAny(allText, ["empty", "blank", "loading", "error"]) ? 10 : 2,
      question: "Define empty, loading, and error states.",
    },
    {
      name: "Testability",
      points: hasAny(allText, ["test", "jest", "apex", "expected", "when", "should"]) ? 12 : 3,
      question: "Add testable scenarios for Jest, Apex, or manual validation.",
    },
    {
      name: "LWC relevance",
      points: hasAny(allText, ["lwc", "component", "lightning web component", "banner"]) ? 10 : 4,
      question: "Identify likely LWC component impact.",
    },
  ];

  const rawScore = checks.reduce((sum, check) => sum + check.points, 0);
  const score = Math.min(100, rawScore);
  const missing = checks.filter((check) => check.points <= 4).map((check) => check.question);

  let confidence = "Medium";
  if (score >= 85 && missing.length <= 1) confidence = "High";
  if (score < 70 || missing.length >= 3) confidence = "Low";

  let decision = "Needs Product Clarification";
  if (score >= 85 && confidence === "High") decision = "Build Allowed";
  else if (score >= 70) decision = "Needs Developer Clarification";

  return { score, confidence, decision, missing };
}

function runReadinessLint(inputPath, outPath) {
  const issue = JSON.parse(readText(inputPath));
  const result = scoreIssue(issue);
  const lines = [
    "# Jira Confidence Gate Card",
    "",
    `Issue: ${issue.issueKey || "Unknown"}`,
    `Title: ${issue.title || "Untitled"}`,
    `Assignee: ${issue.assignee || "Unassigned"}`,
    "",
    `Readiness score: ${result.score}`,
    `Confidence: ${result.confidence}`,
    `Decision: ${result.decision}`,
    "",
    "## Clarification Questions",
    "",
  ];

  if (result.missing.length) {
    result.missing.slice(0, 5).forEach((question, index) => {
      lines.push(`${index + 1}. ${question}`);
    });
  } else {
    lines.push("No blocking clarification questions detected by the starter linter.");
  }

  lines.push("");
  lines.push("## Suggested Next Step");
  lines.push("");
  if (result.decision === "Build Allowed") {
    lines.push("Start an isolated sandbox build attempt and attach validation evidence for developer review.");
  } else if (result.decision === "Needs Developer Clarification") {
    lines.push("Ask the assigned developer to confirm technical direction before starting the sandbox build.");
  } else {
    lines.push("Ask Product to clarify blocking requirements, then re-run the readiness check.");
  }

  writeOutput(outPath, lines.join("\n"));
}

function classifyTest(ac) {
  const lower = ac.toLowerCase();
  if (hasAny(lower, ["permission", "profile", "fls", "sharing", "only users"])) {
    return ["Jest: renders or hides UI based on permission state", "Apex: verifies permission-aware data access where server logic is used"];
  }
  if (hasAny(lower, ["error", "unavailable", "fails"])) {
    return ["Jest: displays error state when service call fails", "Manual: verify user-facing error copy in Lightning"];
  }
  if (hasAny(lower, ["blank", "empty", "null", "hide"])) {
    return ["Jest: verifies empty or hidden state", "Manual: verify record with missing data"];
  }
  if (hasAny(lower, ["greater than", "less than", ">=", "<=", "threshold", "score"])) {
    return ["Jest: verifies threshold boundary behavior", "Apex: verifies server-side threshold logic if applicable"];
  }
  return ["Jest: verifies expected component behavior", "Manual: verify behavior in target Salesforce page"];
}

function runAcTestMap(inputPath, outPath) {
  const criteria = readText(inputPath)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const lines = [
    "# Acceptance Criteria Test Map",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
  ];

  criteria.forEach((criterion, index) => {
    lines.push(`## AC ${index + 1}`);
    lines.push("");
    lines.push(criterion);
    lines.push("");
    lines.push("Suggested checks:");
    for (const test of classifyTest(criterion)) {
      lines.push(`- ${test}`);
    }
    lines.push("");
  });

  writeOutput(outPath, lines.join("\n"));
}

if (!command || command === "--help" || command === "-h") {
  console.log(usage());
  process.exit(0);
}

try {
  if (command === "impact-map") {
    const repo = path.resolve(getArg("--repo", "."));
    runImpactMap(repo, getArg("--out"));
  } else if (command === "metadata-risk") {
    const repo = path.resolve(getArg("--repo", "."));
    runMetadataRisk(repo, getArg("--out"));
  } else if (command === "readiness-lint") {
    const input = getArg("--input");
    if (!input) throw new Error("Missing --input <issue.json>");
    runReadinessLint(input, getArg("--out"));
  } else if (command === "ac-test-map") {
    const input = getArg("--input");
    if (!input) throw new Error("Missing --input <acceptance-criteria.txt>");
    runAcTestMap(input, getArg("--out"));
  } else {
    throw new Error(`Unknown command: ${command}`);
  }
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
