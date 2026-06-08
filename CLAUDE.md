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

---

## Acceptance Criteria — Writing Guidelines

When generating or reviewing acceptance criteria (Gherkin scenarios), **always cover all four case types** :

| Type | Description | Exemples |
|------|-------------|---------|
| **Cas nominaux** | Le flux principal, tout se passe bien | Créer une entité, sauvegarder un formulaire valide, afficher une liste |
| **Cas alternatifs** | Des variantes légitimes du flux nominal | Annuler une action, sélectionner une option différente, flux secondaire |
| **Cas d'erreur** | Données invalides, contraintes violées, permissions manquantes | Champ obligatoire vide, valeur déjà existante, utilisateur non autorisé |
| **Cas limites** | Frontières, états edge-case, comportements idempotents | Valeur max atteinte, champ sans valeur, source déjà sélectionnée, suppression sans dépendances |

### Instructions

1. **Lis toujours l'epic parent** avant de rédiger les critères d'une story, pour respecter les règles métier et décisions déjà prises.
2. **Pose des questions si des informations manquent** avant de générer les scénarios — ne devine pas. En particulier :
   - Comportement exact en cas d'erreur (message affiché ? bouton désactivé ? redirection ?)
   - Gestion des permissions (quels rôles peuvent effectuer l'action ?)
   - Impact sur d'autres entités ou BC (propagation, logs, notifications ?)
   - Limites techniques (longueur max, nombre max de valeurs, etc.)
3. **Groupe les scénarios par thème** avec des commentaires `# ---` pour la lisibilité.
4. **Ne duplique pas** un scénario déjà couvert dans une autre story de la même epic.
5. **Un scénario = un comportement** : évite les scénarios fourre-tout, préfère plusieurs scénarios courts et ciblés.
