# Project Context

This is the documentation repository for Mediaspot projects (features, specs, epics, stories).

## JIRA Integration (MCP Server)

This project uses the official Atlassian MCP server for JIRA Cloud integration.

**JIRA Instance:** https://vdmdev.atlassian.net/

### First-Time Setup

1. Restart Claude Code after cloning this repository
2. Run `/mcp` to see available MCP servers
3. Select "atlassian" - this will open a browser for OAuth authentication
4. Complete the Atlassian OAuth consent flow
5. The connection persists across sessions

### Using JIRA in Claude Code

Once connected, you can:

- **Search issues:** "Find all open bugs in project XYZ"
- **Create issues:** "Create a new story for user authentication"
- **Update issues:** "Move PROJ-123 to In Progress"
- **Query with JQL:** "Search for issues where assignee = currentUser()"

### Best Practices

When querying JIRA, always specify:
- **Project key** to avoid scanning all projects
- **maxResults: 10** or appropriate limit to reduce token usage

### JIRA Story Structure

Stories in JIRA use custom fields instead of the native `description` field:

| Field | Custom Field ID | Content | Format |
|-------|----------------|---------|---------|
| **Description US / Evolution** | `customfield_10776` | User story format (As a / I want / So that) + UI screenshots/mockups | ADF (Atlassian Document Format) |
| **Critères d'acceptation** | `customfield_10777` | Acceptance criteria scenarios | Gherkin (in code block with language="gherkin") |
| **Description** (native) | `description` | **KEEP EMPTY** - Not used for stories | - |

**Important notes:**
1. **Local markdown files are summaries** - The full detailed content (especially Gherkin scenarios) lives in JIRA
2. When syncing stories from markdown → JIRA:
   - Extract "As a/I want/So that" section → `customfield_10776`
   - Extract acceptance criteria (Gherkin blocks) → `customfield_10777`
   - Leave native `description` field empty
3. Always use `contentFormat: "markdown"` when updating these fields via API

**Example API call:**
```json
{
  "fields": {
    "customfield_10776": "As a **Admin**...",
    "customfield_10777": "```gherkin\nFeature: ...\n```"
  }
}
```

### Troubleshooting

| Issue | Solution |
|-------|----------|
| OAuth flow doesn't start | Ensure you have access to https://vdmdev.atlassian.net/ |
| "Site admin must authorize" | Ask your Atlassian admin to complete initial OAuth consent |
| Connection times out | Check VPN/network connectivity to Atlassian Cloud |
