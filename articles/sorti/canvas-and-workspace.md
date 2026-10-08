---
title: "Canvas and Workspace"
description: "How Sorti uses the live site canvas and workspace tabs."
tags: ["sorti", "canvas", "workspace"]
published: 2026-06-04
weight: 40
---

# Canvas and Workspace

The canvas is the live site surface inside Sorti. It lets the user inspect a
page, select an element, and ask the agent to make changes in context.

The workspace is the larger app area around the canvas. It can hold panels,
artifacts, Git and diff views, analytics, security results, files, and other
supporting surfaces.

## Canvas context

When a user clicks or selects something on the canvas, Sorti records useful
context for the agent. That can include the current URL or path, the selected
selector, tag name, text, link target, region, and site surface.

This context changes how the agent interprets words like "this", "here", or
"the selected section". For example, if the user selects a menu item and asks to
add a page near it, the agent can route the change through a canvas action using
that selected anchor.

## Site providers

Sorti can work with different site surfaces:

- WordPress canvas sessions for WordPress pages and structured zone edits.
- Static canvas sessions for static-site preview and snippet-style changes.
- Shopify canvas sessions for Shopify storefront surfaces.

Each provider has its own backend routes and limits. Sorti keeps the user
workflow similar while routing the actual action through the provider-specific
canvas contract.

## Direct canvas edits

For clear, localized edits, Sorti can use canvas tools directly. Examples
include:

- Change copy in the selected section.
- Add a page from a selected navigation anchor.
- Apply a small DOM patch.
- Update structured fields exposed by the site.
- Navigate the canvas to another page.

Direct canvas edits are meant for focused changes where the user intent and
target are clear.

Use direct canvas edits when:

- The user selected the target on the page.
- The change is local to one section or field.
- The operation can be previewed or verified immediately.
- The user does not need a multi-step implementation plan.

## Larger site work

Some requests are bigger than a direct canvas action. A redesign, migration,
multi-file change, or complex feature should use a mission. In a mission, Sorti
can plan the work, ask for confirmation, run multiple steps, and verify the
result.

This keeps the canvas fast for small changes without removing the review path
for larger work.

Use a mission when:

- The request affects multiple pages, files, providers, or systems.
- The agent needs recon before editing.
- The user should confirm a plan before changes happen.
- The result needs progress tracking and verification.

## Workspace tabs and panels

The workspace supports more than the canvas. First-party panels can show Git
state, diffs, PostHog analytics, artifacts, ask-user forms, WP-AI tools,
Gutenberg composer helpers, files, and security scans.

Panels are not separate from the assistant. They can show state, run panel-local
actions, and ask the agent to create a real chat turn when a panel action needs
conversation.

## Good Sorti prompts

Good prompts name the desired outcome and, when useful, point at the page:

- "Change this headline to focus on emergency WordPress support."
- "Add a Services page next to this menu item."
- "Make this section shorter and more direct."
- "Run a security scan for this WordPress site."
- "Turn this analytics result into a short explanation for the client."

If the target is ambiguous, select the element or section first.
