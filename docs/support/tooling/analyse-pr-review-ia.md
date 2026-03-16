# Analyse des Solutions de Review Automatisée par IA pour PRs

> **Date :** 2026-03-16
> **Auteur :** Winston (Architecte BMAD)
> **Statut :** Analyse initiale

## Contexte

| Élément | Valeur |
|---------|--------|
| Stack | C# / .NET |
| Plateforme | GitHub Enterprise |
| Cloud | AWS |
| Volume | ~28 PRs/sprint en backlog |
| Équipe | 4 devs backend (tous reviewers) |
| Objectif | Accélérer les reviews humaines |
| Contraintes | Confidentialité forte, pas de cloud externe |
| État du code | Dette technique massive, architecture complexe, 0 tests |
| Outils existants | SonarQube (sécurité/qualité statique) |

---

## 1. Solutions Self-Hosted (Recommandées pour votre contexte)

### 1.1 PR-Agent (CodiumAI) — Open Source

**Description :** Agent IA open source spécialisé PR review. Peut tourner en self-hosted avec votre propre LLM.

| Avantages | Inconvénients |
|-----------|---------------|
| 100% self-hosted possible | Configuration initiale complexe |
| Intégration GitHub native | Qualité dépend du LLM choisi |
| Gratuit (open source) | Maintenance à votre charge |
| Supporte Azure OpenAI, AWS Bedrock, LLMs locaux | Documentation parfois lacunaire |
| Très personnalisable | |

**Coût :** Gratuit + coût infra (~50-200€/mois selon usage Bedrock)

**Points d'attention :**
- Nécessite un LLM backend (Bedrock Claude recommandé pour C#)
- La qualité sur du code legacy/chaotique sera variable
- Prévoir du temps de tuning des prompts

**Verdict : Excellent candidat**

---

### 1.2 Amazon Bedrock + GitHub Actions Custom

**Description :** Construire votre propre pipeline avec Claude/Titan via Bedrock, déclenché par GitHub Actions.

| Avantages | Inconvénients |
|-----------|---------------|
| Données restent dans votre AWS | Développement custom nécessaire |
| Contrôle total sur les prompts | Temps de dev initial (2-4 semaines) |
| Claude 3.5 Sonnet excellent sur C# | Maintenance continue |
| Intégration native avec votre infra | Pas de UI clé en main |
| Coût à l'usage (pas d'abonnement fixe) | |

**Coût :** ~100-400€/mois selon volume (pricing Bedrock)

**Points d'attention :**
- Investissement initial en développement
- Possibilité de commencer simple et itérer
- Peut évoluer vers des guidelines custom facilement

**Verdict : Très pertinent si vous voulez du sur-mesure**

---

### 1.3 LLM Local (Ollama + CodeLlama/DeepSeek)

**Description :** Faire tourner un LLM open source sur votre infra, sans aucune donnée sortante.

| Avantages | Inconvénients |
|-----------|---------------|
| Confidentialité maximale | Qualité inférieure aux modèles commerciaux |
| Coût fixe (infra seulement) | Nécessite du GPU (coûteux) |
| Aucune dépendance externe | Moins bon sur C# que Claude/GPT-4 |
| | Maintenance lourde |

**Coût :** 500-1500€/mois (instance GPU AWS)

**Points d'attention :**
- Les modèles open source sont significativement moins bons sur le code C#/.NET
- Sur une codebase chaotique, la différence de qualité sera très visible
- Option "puriste" mais compromis qualité/coût défavorable

**Verdict : Non recommandé sauf contraintes extrêmes**

---

## 2. Solutions SaaS (Avec réserves sur la confidentialité)

### 2.1 GitHub Copilot for Business

**Description :** Solution native GitHub avec garanties enterprise (pas de training sur votre code).

| Avantages | Inconvénients |
|-----------|---------------|
| Intégration GitHub parfaite | Code envoyé aux serveurs Microsoft |
| Garantie contractuelle : pas de training | Pas de self-hosting |
| Excellente qualité sur C#/.NET | Personnalisation limitée |
| Déjà familier pour les devs | |

**Coût :** ~19€/utilisateur/mois = ~76€/mois pour 4 devs

**Points d'attention :**
- Les garanties enterprise sont solides (SOC2, pas de rétention)
- À valider avec votre équipe juridique/sécurité
- La review PR (Copilot PR Review) est encore en preview

**Verdict : Bon si la confidentialité est "importante" mais pas "absolue"**

---

### 2.2 CodeRabbit

**Description :** SaaS spécialisé review PR avec IA, très mature.

| Avantages | Inconvénients |
|-----------|---------------|
| Spécialisé PR review (pas généraliste) | SaaS uniquement (cloud) |
| Excellente UX, commentaires inline | Code transite par leurs serveurs |
| Apprend les patterns de votre repo | Plus cher que Copilot |
| Bon support C#/.NET | |

**Coût :** ~15$/utilisateur/mois (plan Pro)

**Points d'attention :**
- SOC2 compliant, mais reste du cloud externe
- Version self-hosted annoncée mais pas encore disponible
- Très bon retours de la communauté .NET

**Verdict : Excellent produit, mais contrainte cloud**

---

## 3. Comparatif Synthétique

| Solution | Confidentialité | Qualité C# | Effort Setup | Coût/mois | Recommandation |
|----------|-----------------|------------|--------------|-----------|----------------|
| **PR-Agent + Bedrock** | Excellente | Excellente | Medium | ~150€ | **Recommandé** |
| **Bedrock Custom** | Excellente | Excellente | High | ~200€ | Bon si besoin sur-mesure |
| **Copilot Business** | Bonne | Excellente | Low | ~80€ | Si cloud MS acceptable |
| **CodeRabbit** | Bonne | Excellente | Low | ~60€ | Si cloud acceptable |
| **LLM Local** | Maximale | Faible | High | ~800€ | Non recommandé |

---

## 4. Points d'Attention Critiques pour Votre Contexte

### Dette technique + Architecture chaotique

**Problème :** L'IA va avoir du mal à distinguer :
- Ce qui est une "mauvaise pratique intentionnelle legacy" vs une erreur
- Les patterns locaux vs les anti-patterns
- Ce qui est à refactorer vs ce qui fonctionne

**Mitigation :**
- Commencer par des reviews "légères" (style, conventions évidentes)
- Ne PAS activer les suggestions d'architecture au début
- Créer un fichier de contexte `.github/copilot-instructions.md` ou équivalent expliquant les exceptions connues

---

### Absence de tests

**Problème :** L'IA ne peut pas vérifier si le code fait ce qu'il doit faire. Elle peut seulement vérifier :
- Que le code "a l'air correct" syntaxiquement
- Que les patterns sont cohérents
- Que les edge cases évidents sont gérés

**Mitigation :**
- Utiliser l'IA pour SUGGÉRER des tests à écrire (même si vous ne les écrivez pas tout de suite)
- Configurer l'agent pour signaler l'absence de tests comme warning systématique

---

### Absence de guidelines

**Problème :** L'IA va appliquer des "best practices génériques C#" qui peuvent contredire vos conventions implicites.

**Mitigation :**
- Documenter les conventions AVANT de déployer l'IA (même un fichier de 2 pages suffit)
- Ou : utiliser l'IA pour GÉNÉRER un draft de guidelines basé sur le code existant
- Itérer : corriger l'IA quand elle se trompe, ça affine les prompts

---

### Risque de "bruit"

**Problème :** Sur du code legacy, l'IA va générer BEAUCOUP de commentaires, dont certains non pertinents. Risque de fatigue des reviewers.

**Mitigation :**
- Configurer l'IA en mode "conservateur" au début
- Filtrer par sévérité (ignorer les "suggestions", garder les "issues")
- Période de calibration de 2-3 sprints avant de se fier aux résultats

---

## 5. Recommandation Finale

### Phase 1 : Proof of Concept (2-4 semaines)
1. Déployer **PR-Agent** en self-hosted avec **Amazon Bedrock (Claude 3.5 Sonnet)**
2. L'activer sur 1-2 repos non critiques
3. Configurer en mode "commentaires seulement" (pas de blocage)
4. Mesurer : temps de review avant/après, pertinence des commentaires

### Phase 2 : Calibration (1-2 sprints)
1. Affiner les prompts selon les retours de l'équipe
2. Documenter les guidelines minimales
3. Décider si l'outil apporte de la valeur ou du bruit

### Phase 3 : Rollout
1. Étendre à tous les repos backend
2. Éventuellement activer des règles de blocage pour les issues critiques

---

## Ressources

- [PR-Agent GitHub](https://github.com/Codium-ai/pr-agent)
- [Amazon Bedrock Documentation](https://docs.aws.amazon.com/bedrock/)
- [GitHub Copilot for Business](https://docs.github.com/en/copilot)
- [CodeRabbit](https://coderabbit.ai/)
