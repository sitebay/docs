import { readFile, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
const docs =
  process.env.DOCS_REPO || fileURLToPath(new URL("../../", import.meta.url));
const sorti = process.env.SORTI_REPO;
if (!sorti) throw new Error("Set SORTI_REPO to the reviewed Sorti checkout");
const blocks = (text: string, language: string) =>
  [
    ...text.matchAll(
      new RegExp("^```" + language + "\\n([\\s\\S]*?)^```$", "gm"),
    ),
  ].map((m) => JSON.parse(m[1]));
const counter = blocks(
  await readFile(
    path.join(docs, "articles/sorti/build-a-counter-panel.md"),
    "utf8",
  ),
  "json",
);
const { parsePrimitivePanelSpec } = await import(
  pathToFileURL(path.join(sorti, "packages/panel-primitives/src/index.ts")).href
);
assert.equal(counter.length, 4, "Expected four counter examples");
// This fragment uses the 0.0.10 subset; new apps take their version from forge.guide.
const parsed = parsePrimitivePanelSpec({ version: "0.0.10", root: counter[1] });
assert.equal(parsed.root.type, "view");
assert.equal(counter[0].count, 0);
assert.deepEqual(counter[2], { ops: [{ inc: "count", by: 1 }] });
assert.deepEqual(counter[3], { ops: [{ set: "count", value: 0 }] });
const source = await readFile(
  path.join(docs, "articles/sorti/create-a-review-skill.md"),
  "utf8",
);
const sample = source.match(/^````markdown\n([\s\S]*?)^````$/m)?.[1];
assert(sample);
const { parseLibrarySkillDocument } = await import(
  pathToFileURL(path.join(sorti, "apps/sorti/lib/skillLibrary.ts")).href
);
const skill = parseLibrarySkillDocument(sample);
assert.equal(skill.name, "review-staging-page");
assert(skill.content.includes("Do not promote staging."));
const settings = blocks(
  await readFile(
    path.join(docs, "articles/vscode/test-localhost-with-sorti.md"),
    "utf8",
  ),
  "json",
);
const manifest = JSON.parse(
  await readFile(path.join(sorti, "apps/sitebay-vscode/package.json"), "utf8"),
);
assert.equal(settings.length, 2, "Expected two settings examples");
const props = manifest.contributes.configuration.properties;
for (const example of settings)
  for (const [key, value] of Object.entries(example)) {
    assert(key in props);
    assert(
      props[key].type === "array"
        ? Array.isArray(value)
        : typeof value === props[key].type,
    );
  }
const server = settings[1]["sitebay.mcpProxy.servers"][0];
assert.equal(server.command, "npx");
assert.deepEqual(server.args, [
  "-y",
  "@playwright/mcp@latest",
  "--isolated",
  "--headless",
]);
const report = {
  passed: true,
  checks: [
    "Counter view fragment accepted by the actual primitive parser",
    "Counter initial state and reducer JSON shapes match the reviewed authoring contract",
    "Complete example skill accepted by the actual library parser",
    "Editor settings keys and value types match the actual extension manifest",
  ],
  scope:
    "Pure parser and configuration checks, not a created live panel, real browser-proxy session, or shared-library write.",
};
if (process.env.EXAMPLE_REPORT)
  await writeFile(
    process.env.EXAMPLE_REPORT,
    JSON.stringify(report, null, 2) + "\n",
  );
console.log(JSON.stringify(report));
