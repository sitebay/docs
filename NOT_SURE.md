# Unverified boundaries — documentation publishing repair

This branch repairs the publishing, routing, search-identity, validation and
security-guide findings from the review of `f7bc8c1bb329ce5931c659cb050d85cec8de17c7`.

- **Production activation:** no site deployment, release, customer operation,
  or Algolia administration write was performed. Live index existence, current
  permissions and production activation must be checked separately. The
  credential-free index plan and local browser fixtures are not that evidence.
- **Existing editorial findings:** the source-tree audit reports 677 findings
  inherited from the reviewed commit, with no new findings in this repair.
  Publishing correctness has no exceptions; editorial metadata/style debt has
  an explicit immutable-commit comparison, not a claim that all prose is clean.
- **Article factual scope:** this is not a new factual review of every article.
  Student offers and price estimates, older API/tutorial claims, and the moved
  STS2/MCP reference content were not requalified against live products here.
- **Vulnerability scanning:** the replacement guide was checked against SiteBay
  `app/api/site/security.py`, `app/services/security_scan_service.py`, and Sorti
  `apps/sorti-agent/lib/mcp/panels/security/server.ts` and its template. The
  paid-plan gate, start/status/history routes and plugin-update behavior are
  source-grounded. No live scan or plugin update was started. Vulnerability
  findings are not evidence of a complete file-by-file malware investigation.
- **Account-security references:** links to absent two-factor, security-question
  and phone-verification guides were replaced with existing account/password
  and permission guides. Their absence in this repository does not establish
  whether a specific feature is deployed elsewhere.
- **Validation boundary:** rendered prose links and expected search records are
  checked locally. External services are not contacted by the browser fixture.
  Vale and hosted GitHub runner behavior require their own workflow results;
  local build success alone does not establish that those remote jobs passed.
