# Protocole d'Interview Utilisateur — Journey 3 : Techniciens Labo

## Informations générales

| Élément | Détail |
|---------|--------|
| **Projet** | BMME v2 — Maintenance des specs providers |
| **Persona cible** | Julie Martin (Technicienne Labo VDM) |
| **Objectifs** | Validation des pain points PRD + Découverte de besoins non identifiés |
| **Format** | Entretien individuel, visioconférence |
| **Durée** | 30 minutes |
| **Nombre de participants** | 2 techniciens labo |

---

## Objectifs de recherche

### Validation (confirmer les hypothèses PRD)

- Les specs providers sont dispersées dans de multiples fichiers XML
- La modification manuelle est chronophage et source d'erreurs
- Les erreurs sont découvertes tardivement (à la livraison)
- Le déploiement nécessite des interventions techniques (Git, CI/CD)

### Découverte (explorer l'inconnu)

- Workflows cachés non documentés dans le PRD
- Outils de contournement bricolés en interne
- Frustrations non exprimées
- Besoins de collaboration avec d'autres équipes

---

## Structure de l'entretien (30 min)

| Phase | Durée | Focus |
|-------|-------|-------|
| 1. Accueil & cadrage | 3 min | Mise en confiance, consentement |
| 2. Contexte & rôle | 5 min | Comprendre leur quotidien |
| 3. Exploration workflow | 12 min | Questions ouvertes, écoute active |
| 4. Validation hypothèses | 8 min | Sonder les pain points PRD |
| 5. Clôture | 2 min | Question ouverte finale |

---

## Phase 1 — Accueil & cadrage (3 min)

### Script d'introduction

> *"Bonjour [Prénom], merci d'avoir accepté cet entretien. Je suis [ton nom], je travaille sur l'évolution de nos outils de gestion des métadonnées SVOD.*
>
> *L'objectif aujourd'hui c'est de comprendre ton quotidien, tes méthodes de travail, ce qui fonctionne bien et ce qui te frustre. Il n'y a pas de bonne ou mauvaise réponse — c'est ton vécu qui m'intéresse.*
>
> *L'entretien dure environ 30 minutes. Est-ce que tu es OK si je prends des notes ? [Si enregistrement prévu : Est-ce que tu acceptes que j'enregistre pour ne rien oublier ? Ça restera confidentiel et uniquement utilisé en interne.]*
>
> *Tu as des questions avant qu'on commence ?"*

---

## Phase 2 — Contexte & rôle (5 min)

**Objectif :** Comprendre leur périmètre, leur ancienneté, leur vision de leur rôle.

| # | Question | Ce qu'on cherche |
|---|----------|------------------|
| 2.1 | *"Peux-tu me décrire ton rôle au labo en quelques mots ?"* | Périmètre réel vs titre officiel |
| 2.2 | *"Depuis combien de temps tu fais ce travail ?"* | Niveau d'expertise, historique |
| 2.3 | *"Quels providers tu gères au quotidien ?"* | Scope réel (iTunes, Amazon, Google, Netflix, autres ?) |
| 2.4 | *"Avec qui tu travailles le plus souvent sur ces sujets ?"* | Collaborations, dépendances |

### Relances possibles

- *"C'est-à-dire ?"*
- *"Tu peux me donner un exemple ?"*

---

## Phase 3 — Exploration du workflow actuel (12 min)

**Objectif :** Faire raconter leur workflow réel, sans orienter. Laisser émerger les pain points naturellement.

| # | Question | Ce qu'on cherche |
|---|----------|------------------|
| 3.1 | *"Raconte-moi la dernière fois qu'un provider a changé ses specs. Qu'est-ce qui s'est passé ?"* | Workflow réel, pas théorique |
| 3.2 | *"Comment tu as su qu'il y avait un changement ?"* | Canaux d'information, réactivité |
| 3.3 | *"Concrètement, qu'est-ce que tu as dû faire pour mettre à jour ?"* | Étapes, outils, temps passé |
| 3.4 | *"Qu'est-ce qui t'a pris le plus de temps dans ce process ?"* | Identifier les goulots d'étranglement |
| 3.5 | *"Comment tu as vérifié que ta modification était correcte ?"* | Process de validation/test |
| 3.6 | *"Est-ce qu'il t'est déjà arrivé qu'une erreur passe à travers ? Qu'est-ce qui s'est passé ?"* | Conséquences, stress, impact |

### Relances puissantes

- *"Et ensuite ?"* (faire dérouler le fil)
- *"Comment tu t'es senti(e) à ce moment-là ?"* (dimension émotionnelle)
- *"Si tu devais refaire la même chose demain, tu ferais pareil ?"*

> **Règle d'or :** Ne pas mentionner les solutions envisagées (éditeur centralisé, etc.). On écoute, on ne vend pas.

---

## Phase 4 — Validation des hypothèses PRD (8 min)

**Objectif :** Sonder spécifiquement les pain points identifiés dans le PRD, sans les suggérer de manière trop directive.

| # | Question | Hypothèse PRD testée |
|---|----------|---------------------|
| 4.1 | *"Combien de fichiers tu dois toucher en moyenne quand tu fais une mise à jour de spec ?"* | 47 fichiers XML dispersés |
| 4.2 | *"Comment tu fais pour être sûr(e) de n'oublier aucun fichier ?"* | Risque d'oubli, checklist manuelle ? |
| 4.3 | *"Une fois que t'as fait tes modifs, comment ça arrive en production ?"* | Dépendance Git/CI/CD |
| 4.4 | *"Si tu pouvais changer UN truc dans ce process, ce serait quoi ?"* | Priorité perçue du pain point |
| 4.5 | *"Est-ce qu'il y a des trucs que tu fais qui te semblent absurdes ou inutilement compliqués ?"* | Découverte de frustrations cachées |

### Échelle de validation

À noter pour chaque hypothèse :

- ✅ Confirmé fortement (mentionné spontanément)
- ⚠️ Confirmé partiellement (confirmé quand sondé)
- ❌ Non confirmé / Contredit
- 🔍 Nouveau pain point découvert

---

## Phase 5 — Clôture (2 min)

| # | Question | Objectif |
|---|----------|----------|
| 5.1 | *"Y a-t-il quelque chose dont on n'a pas parlé et qui te semble important sur ce sujet ?"* | Capturer l'inattendu |
| 5.2 | *"Si je reviens te voir dans 6 mois avec un nouvel outil, qu'est-ce qui te ferait dire 'enfin !' ?"* | Vision du succès côté utilisateur |

### Remerciement

> *"Merci beaucoup pour ton temps et ta franchise. C'est exactement ce type de retour qui nous aide à construire des outils qui servent vraiment. Si tu penses à d'autres choses après l'entretien, n'hésite pas à m'envoyer un message."*

---

## Grille de prise de notes

À dupliquer et remplir pour chaque entretien :

```
PARTICIPANT : _______________
DATE : _______________

== CONTEXTE ==
Rôle :
Ancienneté :
Providers gérés :
Collaborateurs fréquents :

== WORKFLOW ACTUEL ==
Déclencheur d'une mise à jour :
Étapes décrites :
Temps estimé :
Outils utilisés :

== PAIN POINTS ==
□ Fichiers dispersés : ✅ / ⚠️ / ❌
  Notes :

□ Modification manuelle chronophage : ✅ / ⚠️ / ❌
  Notes :

□ Risque d'erreur/oubli : ✅ / ⚠️ / ❌
  Notes :

□ Découverte tardive des erreurs : ✅ / ⚠️ / ❌
  Notes :

□ Dépendance Git/CI/CD : ✅ / ⚠️ / ❌
  Notes :

== DÉCOUVERTES ==
Nouveaux pain points :

Workarounds/bricolages :

Besoins non exprimés dans le PRD :

== VERBATIMS CLÉS ==
"..."
"..."

== PRIORITÉ PERÇUE ==
Ce qu'ils changeraient en premier :
```

---

## Conseils pour l'interviewer

### À faire

- Laisser des silences (les gens comblent souvent avec des infos précieuses)
- Noter les verbatims exacts entre guillemets
- Observer les réactions émotionnelles (soupirs, rires nerveux, hésitations)
- Creuser les "c'est normal" et "on a toujours fait comme ça"

### À éviter

- Questions fermées (oui/non)
- Questions orientées (*"Tu trouves pas que c'est pénible de..."*)
- Parler de solutions avant d'avoir exploré les problèmes
- Interrompre quand ils racontent une histoire

---

## Après les entretiens

### Synthèse à produire

1. **Matrice de validation** : Pour chaque hypothèse PRD, statut consolidé des 2 entretiens
2. **Nouveaux insights** : Pain points découverts non présents dans le PRD
3. **Verbatims clés** : Citations marquantes à réutiliser dans la documentation
4. **Recommandations** : Ajustements suggérés pour le PRD ou la solution envisagée
