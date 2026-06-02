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

### Troubleshooting

| Issue | Solution |
|-------|----------|
| OAuth flow doesn't start | Ensure you have access to https://vdmdev.atlassian.net/ |
| "Site admin must authorize" | Ask your Atlassian admin to complete initial OAuth consent |
| Connection times out | Check VPN/network connectivity to Atlassian Cloud |
