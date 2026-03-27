# Interview Discovery — Alexis Benatar (Responsable Airlab)

**Date** : 24 mars 2026
**Participant** : Alexis Benatar — Responsable Airlab
**Durée** : ~30 min
**Objectif** : Extraire les besoins en outils de monitoring et configuration cross-platform pour le MAM.

---

## 1. Contexte et périmètre

### Périmètre Airlab
- **Plateformes supervisées** : Distribution + Drive (~15 plateformes)
- **Hors périmètre actuel** : ADAM
- **Distribution** (6-7 plateformes) : partie qualification (ingests, reprises d'ingests)
- **Support / Care / Onboarding** : monitoring des plantages (workflows, shares, orders, jobs), sollicitation client en direct

### Outils actuels
- **MediaSpot uniquement**, plateforme par plateforme
- Navigation sur stockages de plateforme (arborescence de dossiers)
- **Cockpit** : ébauche de monitoring centralisé existante mais insatisfaisante
  > "C'est un peu en bordel déjà et surtout on a accès à rien en fait. T'es quand même obligé de switcher de plateforme pour aller voir ce que c'est en détail."

### Équipe impliquée
Fabrice, Logan, Frédéric, Audrey, Mathieu + intermittents

---

## 2. Pain Points identifiés

### Monitoring
- **Exemple concret** : Bug d'archivage hier soir → navigation sur différents onglets de la page asset (media files, actions, hiérarchies) + check stockages
- **Cross-platform systématique** : si problème constaté sur une plateforme, vérification sur les autres pour voir si c'est circonscrit ou global
- **Système de rondes** : plusieurs fois par jour, contrôles manuels pour détecter jobs/orders/shares plantés
  > "On fait des rondes régulièrement, on passe sur les différentes pages de job et compagnie pour voir si ça roule ou pas."

### Configuration
- **ACLs** : si une ACL évolue → mise à jour manuelle sur TOUTES les plateformes
  > "Avec le risque en plus d'en oublier et donc de pas appliquer les mêmes droits partout."
- **Users** : copie de plateforme → users VDM à créer manuellement à chaque fois
- **System alerts** : configuration plateforme par plateforme
- **Documents/Specs** : upload des specs (identiques pour tous) → refaire plateforme par plateforme

### Frustration principale
> "T'es comme un con à me dire mais c'est on parle de quel client ?" (sur la recherche d'assets par ID)

---

## 3. Vision Cross-Platform

### Top 3 priorités stratégiques
| # | Besoin | Détail |
|---|--------|--------|
| 1 | **Monitoring centralisé** | Orders, Jobs, Shares, Purges, Workflows, QC Qualify, Ingests |
| 2 | **Gestion plateforme centralisée** | Users, ACLs, Profils broadcasters, Job rules |
| 3 | **Alertes proactives** | Intégrées à la plateforme, temps réel ou horaire |

### Dashboard idéal
- **Météo de la plateforme** : état global de la situation
- **KPIs rapides** : état de l'activité, état des plantées
- **Qualifications à traiter** : vue immédiate du backlog qualif

### Alertes proactives souhaitées
- Intégrées à la plateforme (~temps réel ou remontée horaire minimum)
- Pas de nécessité de mail (déjà trop de notifs)
  > "On en reçoit des milliers donc ça va pas nous apporter grand-chose."

### Autonomie config souhaitée
- Airlab autonome sur tout sauf création de plateforme
- Gestion des workflows → Amberfin (à venir)

---

## 4. Priorisation détaillée

### Monitoring — Par ordre de priorité

| Priorité | Éléments |
|----------|----------|
| **P1** | Orders, QC Qualify, Jobs |
| **P2** | Shares, Ingests*, Purges |
| **P3** | Workflows, Approvals |

*\* Ingests : "marche mieux qu'avant donc moins dessus"*

### Gestion de plateforme — Par ordre de priorité

| Priorité | Éléments |
|----------|----------|
| **P1** | Profils broadcasters (onboarding), Users + ACLs + Roles, Job rules |
| **P2** | Metadata fields, Manual tasks, Products |
| **P3** | Formats, Metadata views, Documents |

### Autres besoins transverses

| Besoin | Description |
|--------|-------------|
| **Reporting centralisé** | Analytics & Metrics, KPIs dashboard — aujourd'hui "on s'amuse à faire des additions plateforme par plateforme" |
| **Search globale** | Accéder à un asset par ID sans savoir sur quelle plateforme il est |
| **Accès direct assets** | Pages DbAssetObjectInfos sans platform switch |
| **Upload documents cross-platform** | Déployer specs/docs sur toutes les plateformes en une fois |

---

## 5. Personnes à interviewer

| Personne | Domaine | Focus |
|----------|---------|-------|
| **Fabrice** | Onboarding + Support | Process d'onboarding client |
| **Fred / Audrey** | Care | Support quotidien |
| **Matthieu** | Qualif | Qualification ingests |
| **Raphaël / Jonathan** | Tech | Création plateforme, gestion métadonnées |

---

## Verbatims clés

> "On a un truc qui s'appelle cockpit qui est un genre d'ébauche de ça... c'est un peu en bordel déjà et surtout on a accès à rien en fait."

> "Quand une ACL évolue, il faut faire la démarche d'aller mettre à jour sur l'ensemble des plateformes. Avec le risque en plus d'en oublier."

> "On fait des rondes régulièrement, c'est même plusieurs fois par jour."

> "T'es comme un con à me dire mais c'est on parle de quel client ?"

> "On s'amuse à faire des additions plateforme par plateforme" (sur le reporting)

---

## Synthèse des besoins

### Problème central
**Absence de centralisation** — information, action et reporting éclatés sur ~15 plateformes indépendantes.

### Solution existante insatisfaisante
**Cockpit** — données partielles, pas d'accès aux détails, oblige quand même à switcher de plateforme.

### Impact quotidien
- Rondes manuelles plusieurs fois/jour
- Risque d'oubli sur les mises à jour cross-platform
- Temps perdu en switch de plateforme
- Pas d'alerte proactive → découverte des problèmes par hasard ou remontée client

### Quick wins potentiels
1. Dashboard monitoring multi-plateforme (Orders, Jobs, QC Qualify)
2. Alertes proactives temps réel
3. Search globale par asset ID
