---
stepsCompleted: [1, 2, 3, 4, 5]
inputDocuments: []
date: 2026-01-08
author: Ben
project_name: mediaspot.bmad
---

# Product Brief: mediaspot.bmad

## Executive Summary

BundleMaker Metadata (BMM) est une nouvelle feature native de mediaspot qui révolutionne la préparation et la gestion des métadonnées pour les plateformes de distribution VOD (Netflix, Amazon, Google, etc.).

Aujourd'hui, les clients de mediaspot dépendent d'un processus manuel chronophage géré par une ressource interne unique via un outil maison (VDM Connect). La préparation des métadonnées pour un seul film peut prendre plusieurs heures en raison de la complexité combinatoire : chaque provider a ses propres spécifications, et chaque territoire exige une localisation spécifique au-delà de la simple traduction linguistique.

BundleMaker Metadata transforme cette contrainte opérationnelle en capacité self-service. Grâce à un système d'héritage intelligent en cascade (Œuvre → Package → Langue → Territoire) et des "reasonable defaults" basés sur un mapping automatique, BMM réduit drastiquement le travail de saisie tout en garantissant la conformité aux exigences de chaque plateforme. Les packages créés sont persistants et réutilisables, permettant une scalabilité sans précédent : une fois configuré, un package peut être déployé sur de multiples territoires avec un effort minimal.

**Public cible:** Servicers et content managers des studios de distribution et de production cinéma-télévision (France et international).

**Impact attendu:** Autonomie client complète, réduction drastique du time-to-delivery, élimination du goulot d'étranglement interne, et capacité à scale sur de multiples providers et territoires simultanément.

---

## Core Vision

### Problem Statement

Les clients de mediaspot qui distribuent du contenu sur les plateformes VOD (Netflix, Amazon, Google, etc.) font face à une complexité exponentielle dans la gestion des métadonnées de livraison. Chaque provider impose ses propres spécifications (formats, champs obligatoires, règles de validation), et chaque territoire exige une localisation spécifique qui va au-delà de la simple traduction linguistique (ex: métadonnées France ≠ métadonnées Québec malgré la langue commune).

Cette complexité crée une formule du chaos : **Providers × Territoires × Langues × Contenus = Explosion de la charge de travail**.

**Workflow actuel problématique :**

Aujourd'hui, le processus de livraison VOD se décompose en plusieurs phases :
1. **Préparation des métadonnées (BMME)** : Aujourd'hui inexistant en self-service, remplacé par VDM Connect géré manuellement par l'équipe interne mediaspot
2. **Configuration/Build de la commande (BM)** : Le client crée une commande avec :
   - Sélection plateforme + territoires + résolution
   - Sélection langues + spécification des versions audio et sous-titres par territoire
   - Inputs applicables au territoire OU à défaut à la langue globale
   - Plusieurs contenus livrables : feature, trailers, artworks, etc.
3. **Package Fabrication** : Fabrication du package au labo avec génération du Bon de Traitement (BT)
4. **Livraison** : Livraison manuelle (la plupart) ou automatisée (rare, ex: StudioCanal) vers la plateforme VOD

**Problèmes critiques du système actuel :**

- **VDM Connect = goulot d'étranglement** : Outil maison nécessitant l'intervention manuelle d'une ressource interne unique (chargés de clientèle) pour chaque préparation de métadonnées
- **Ultra-permissif = erreurs en cascade** : Le système actuel ne bloque pas les commandes mal configurées. Passage en "missing assets" uniquement si l'asset physique n'existe pas, pas si la configuration est incorrecte. Les erreurs sont détectées trop tard dans le processus (après fabrication).
- **Délais incompressibles** : Chaque demande de préparation métadonnées peut prendre plusieurs heures par film
- **Aucune autonomie client** : Les clients possèdent les données mais ne peuvent pas les exploiter directement sans passer par mediaspot
- **Maintenance specs providers lourde** : Les specs providers évoluent fréquemment (jusqu'à 3 fois/mois), nécessitant des mises à jour manuelles de fichiers XML platform-specific. Particulièrement lourd lors d'évolutions technologiques (HDR) ou création de nouveaux supports.

### Problem Impact

**Pour les clients:**
- **Perte d'autonomie:** Dépendance totale à l'équipe mediaspot pour préparer les livraisons
- **Time-to-market rallongé:** Délais incompressibles pour chaque nouvelle livraison
- **Impossibilité de scale:** Le processus manuel ne permet pas de gérer efficacement un catalogue large sur de multiples providers/territoires
- **Frustration:** Les clients possèdent les données mais ne peuvent pas les exploiter directement

**Pour mediaspot:**
- **Goulot d'étranglement opérationnel:** 1 personne unique = risque critique et limitation de capacité
- **Coût caché:** Ressources internes mobilisées sur des tâches répétitives à faible valeur ajoutée
- **Frein à la croissance:** Impossible d'accompagner la montée en charge des demandes clients
- **Dépendance externe:** VDM Connect = outil vieillot, non intégré, non évolutif

### Why Existing Solutions Fall Short

**VDM Connect (solution actuelle):**
- ❌ Outil externe non intégré à mediaspot
- ❌ Interface maison et peu user-friendly
- ❌ Absence de logique d'héritage et de reasonable defaults
- ❌ Processus linéaire sans réutilisabilité
- ❌ Nécessite une expertise technique interne pour chaque livraison
- ❌ Aucune autonomie client

**Solutions alternatives du marché:**
Les outils de metadata management existants sont soit trop génériques (ne connaissent pas les specs précises de chaque provider), soit trop complexes (courbe d'apprentissage élevée), et surtout **ne sont pas nativement intégrés dans le workflow mediaspot**, forçant les clients à jongler entre plusieurs systèmes.

**Le gap critique:** Aucune solution n'offre la combinaison d'intégration native, d'intelligence contextuelle (mapping automatique depuis les métadonnées existantes), et de logique d'héritage permettant une scalabilité réelle.

### Proposed Solution

BundleMaker Metadata (BMM) est une feature native de mediaspot qui donne aux clients le contrôle complet sur la préparation et la gestion de leurs métadonnées VOD, en éliminant la dépendance aux ressources internes et en réduisant drastiquement le temps de préparation.

**L'architecture en cascade intelligente:**

BMM repose sur un système d'héritage à 4 niveaux qui minimise la saisie manuelle:

1. **Niveau Œuvre:** Les métadonnées de base (titre, durée, genre, langue originale, etc.) sont déjà présentes dans mediaspot
2. **Niveau Package (Provider):** À la création d'un package Netflix, Amazon, etc., le système mappe automatiquement les métadonnées de l'œuvre vers les champs requis par le provider, et signale ce qui manque
3. **Niveau Langue:** Pour les champs localisables (synopsis, mots-clés, etc.), l'utilisateur traduit une fois par langue
4. **Niveau Territoire:** Si nécessaire, surcharge spécifique pour un territoire donné (France, Québec, etc.) - sinon héritage automatique de la langue parent

**Principe des "Reasonable Defaults":** Le client ne saisit que le minimum nécessaire. Si la saisie initiale au niveau œuvre est rigoureuse, le travail devient minimal pour scale sur de multiples providers et territoires.

**Fonctionnalités clés:**

- **Mapping automatique configurable:** Pré-remplissage intelligent depuis les métadonnées œuvre, personnalisable client par client si nécessaire. Mapping intelligent/autocomplete entre territoires et sélection audio/subtitles.
- **Validation temps réel multi-niveaux stricte:** Le système connaît les specs de chaque provider et valide à chaque niveau (package, langue, territoire). **Changement de philosophie vs système actuel** : blocage complet du package s'il est mal configuré. Le client doit pouvoir voir exactement ce qui manque. Ne pas permettre de lancer quelque chose de partiel. Feedback performant pour limiter le taux d'erreur.
- **Packages persistants et réutilisables:** Une fois créé, un package reste disponible et ne nécessite plus de maintenance sauf évolution des specs provider
- **Vue centralisée des localisations:** Interface drawer permettant de visualiser et éditer toutes les valeurs localisées d'un champ en un seul endroit
- **Save automatique:** Pas de blocage création, mais blocage utilisation tant que le package est incomplet (philosophie "missing assets" maintenue mais appliquée strictement)
- **Intégration native:** Directement dans mediaspot (onglet Packages sur la page œuvre) et consommable depuis le module Order existant
- **Configuration providers versatile (Air Lab):** Interface de configuration remplaçant les gros XML platform-specific. Tagnames normalisés pour BMME avec mapping des métadonnées spécifiques plateformes. Activation des providers plateforme par plateforme. Mise à jour simplifiée des specs lors d'évolutions providers (actuellement jusqu'à 3 fois/mois).

**UX Self-Service:**
Les servicers/content managers créent et maintiennent les packages de manière autonome, avec guidage contextuel du système. Les profils delivery/ops utilisent ensuite ces packages prêts à l'emploi pour créer les orders de livraison.

### Key Differentiators

**1. Intégration native dans mediaspot**
- Pas de système externe à maîtriser
- Accès direct aux métadonnées œuvre existantes
- Workflow unifié du catalogage à la livraison

**2. Système d'héritage intelligent unique**
- Logique d'entonnoir (Œuvre → Package → Langue → Territoire) inexistante dans VDM Connect et les solutions concurrentes
- Reasonable defaults qui réduisent la saisie de 70-80%
- Réutilisabilité et scalabilité sans équivalent

**3. Autonomie client complète**
- Self-service de bout en bout
- Plus de dépendance aux ressources internes mediaspot
- Time-to-delivery divisé par 10 (de plusieurs heures à quelques minutes)

**4. Validation intelligente et guidage contextuel**
- Le système connaît les specs de TOUS les providers
- Validation temps réel à chaque niveau
- Interface claire sur ce qui est complet/incomplet/manquant

**5. Vue centralisée des localisations**
- Interface drawer unique pour gérer toutes les traductions et surcharges territoriales d'un champ
- Vision d'ensemble immédiate de la couverture linguistique/territoriale
- Édition efficace sans navigation répétitive

**6. Packages persistants et évolutifs**
- Création au fil de l'eau selon les besoins
- Alertes automatiques si specs provider évoluent et package devient incomplet
- Pas de versioning complexe : statut complet/incomplet clair et actionable

**Notre unfair advantage:** Nous possédons déjà la documentation complète des specs de chaque provider (Netflix, Amazon, Google, etc.) et les règles de validation. BundleMaker encode cette expertise métier directement dans l'interface, transformant un savoir tribal en système intelligent accessible à tous les clients.

---

## Target Users

### Primary Users: Servicers / Content Managers

**Rôle:** Responsables de la gestion courante du catalogue de contenu chez les clients mediaspot (distributeurs et producteurs cinéma-télévision).

**Profil:** Utilisateurs techniques avec une connaissance approfondie des métadonnées de contenu et des workflows de livraison VOD. Familiers avec les exigences des différentes plateformes de distribution.

**Besoin principal:** Créer et maintenir les packages de métadonnées VOD de manière autonome, efficace et sans dépendre des ressources internes mediaspot. Capacité à scale sur de multiples providers et territoires simultanément.

**Usage de BMM:**
- Interface Packages (nouvel onglet sur la page Œuvre dans mediaspot)
- Création de packages par provider (Netflix, Amazon, Google, etc.)
- Configuration des métadonnées globales avec mapping automatique depuis l'œuvre
- Ajout et gestion des langues et territoires
- Validation en temps réel de la complétude des packages
- Vue centralisée des localisations via interface drawer

**Valeur apportée:** Autonomie complète, réduction drastique du temps de préparation (de plusieurs heures à quelques minutes), capacité à gérer efficacement un catalogue large.

### Secondary Users: Delivery / Ops Teams

**Rôle:** Équipes responsables de l'exécution concrète des livraisons vers les plateformes VOD. Peuvent être internes aux clients ou équipes mediaspot (notamment Air Lab) intervenant sur les tâches complexes.

**Profil:** Techniques, focalisés sur l'opérationnel et l'exécution des orders de livraison.

**Besoin principal:** Utiliser des packages pré-configurés, validés et prêts à l'emploi pour créer rapidement les orders de livraison sans avoir à se soucier de la conformité des métadonnées.

**Usage de BMM:**
- Module Order existant de mediaspot (pas de changement de workflow)
- Sélection des packages validés créés par les servicers
- Utilisation transparente des métadonnées package dans le processus de livraison
- Configuration des orders : sélection plateforme, territoires, résolution, langues, audio/subtitles par territoire
- Support de plusieurs contenus livrables : feature, trailers, artworks, etc.

**Valeur apportée:** Packages toujours conformes et à jour, processus de livraison accéléré, élimination des allers-retours de validation. Blocage des configurations incorrectes dès la création de l'order (vs détection tardive après fabrication dans le système actuel).

### Tertiary Users: Équipe Air Lab (mediaspot Internal)

**Rôle:** Équipe technique mediaspot dédiée à l'accompagnement des clients dans l'ordering et la delivery. Responsables de la configuration et maintenance des specs providers dans BMM.

**Profil:** Experts techniques avec connaissance approfondie des specs de chaque provider VOD et des workflows de livraison.

**Besoin principal:** Maintenir les specs providers de manière efficace et réactive face aux évolutions fréquentes (jusqu'à 3 fois/mois). Configurer de nouveaux providers facilement. Accompagner les clients sur les problèmes techniques de packages.

**Usage de BMM:**
- Interface de configuration providers (remplace les gros XML platform-specific actuels)
- Ajout et modification des champs obligatoires, règles de validation, formats attendus par provider
- Mise à jour des specs lors d'évolutions providers (nouvelles technologies comme HDR, nouveaux supports)
- Activation des providers plateforme par plateforme
- Investigation et résolution des problèmes techniques de packages clients
- Suivi des orders et intervention sur résolution technique de configuration

**Valeur apportée:** Maintenance simplifiée des specs providers, réduction drastique du temps de mise à jour (de plusieurs heures de modification XML à quelques minutes via interface), capacité à scaler sur de multiples providers et broadcasters individuels.

### Quaternary Users: Chargés de Clientèle (mediaspot Internal)

**Rôle:** Équipe support mediaspot gérant plusieurs comptes clients. Points de contact principaux pour les clients.

**Profil:** Orientés relation client et résolution de problèmes. Gèrent les aspects administratifs et le support de premier niveau.

**Besoin principal:** Accompagner les clients sur l'utilisation de BMM, résoudre les problèmes courants, gérer les permissions et l'onboarding des utilisateurs clients.

**Usage de BMM:**
- Formation et onboarding des clients sur BMM
- Support via tickets Zendesk pour problèmes de configuration packages
- Gestion des permissions et ajout d'utilisateurs clients
- Escalade vers Air Lab pour problèmes techniques complexes
- Collecte de feedback clients pour amélioration continue

**Valeur apportée:** Adoption client réussie, résolution rapide des problèmes courants, clients autonomes sur l'utilisation quotidienne de BMM.

---

## Success Metrics

### User Success Metrics (Servicers/Content Managers)

**Le "Aha Moment":**
- Existence de la feature BMM = autonomie retrouvée
- Premier package créé sans intervention de l'équipe interne mediaspot
- Réutilisation d'un package existant pour déployer sur un nouveau territoire

**Métriques d'usage:**
- **Nombre de packages créés** (global et par client)
- **Nombre de livraisons autonomes** réalisées par les clients sans demande manuelle interne
- **Taux d'adoption:** Pourcentage de clients distribution utilisant activement BMM

**Métriques de qualité:**
- **Conformité des packages:** Cible ~100% de packages valides du premier coup grâce à la validation temps réel
- **Temps de création d'un package:** Réduction drastique de plusieurs heures → quelques minutes

### Business Objectives

**À 3 mois (Adoption & Décharge Opérationnelle):**
- ✅ **100% des clients distribution onboardés** sur BMM et utilisent la feature activement
- ✅ **Décharge maximale des demandes internes manuelles** - réduction significative de la charge sur la ressource interne unique
- ✅ **Feature stable et utilisée quotidiennement** par les servicers/content managers

**À 12 mois (Argument Commercial & Excellence Opérationnelle):**
- ✅ **BMM devient un argument de vente majeur** pour les équipes commerciales (intégré dans le pitch de vente mediaspot)
- ✅ **Réduction voire suppression complète** du nombre de demandes manuelles internes
- ✅ **Conformité proche de 100%** des packages créés - validation automatique garantissant la qualité

### Key Performance Indicators

**KPI d'Adoption:**
- **Taux d'onboarding clients distribution:** Objectif 100% à M+3
- **Nombre de packages créés par mois:** Croissance continue démontrant l'adoption et l'usage
- **Ratio livraisons autonomes vs manuelles:** Décroissance vers 0 des demandes manuelles

**KPI Opérationnels:**
- **Réduction des demandes manuelles internes:**
  - Baseline actuelle: X demandes par semaine
  - M+3: Réduction significative (à mesurer)
  - M+12: Objectif proche de 0
- **Temps moyen de libération ressource interne:** Heures économisées par semaine/mois

**KPI Qualité:**
- **Taux de conformité des packages:** ~100% (grâce à la validation temps réel multi-niveaux)
- **Taux d'erreur lors des livraisons:** Proche de 0% (packages pré-validés)

**KPI Stratégiques:**
- **BMM dans le pitch commercial:** Déploiement auprès des équipes sales à M+12
- **Différenciation concurrentielle:** BMM positionné comme USP (Unique Selling Proposition) de mediaspot
- **Satisfaction client:** Feedback qualitatif sur l'autonomie retrouvée et la facilité d'usage

---

## MVP Scope

### Core Features (MVP)

**1. Architecture en Cascade Intelligente Complète**
- Système d'héritage à 4 niveaux: Œuvre → Package → Langue → Territoire
- Logique de "reasonable defaults" avec héritage automatique entre les niveaux
- Save automatique à chaque modification (pas de perte de données)

**2. Support Multi-Providers (4 providers prioritaires)**
- **Netflix**
- **Amazon**
- **Google**
- **iTunes**

Architecture extensible permettant l'ajout d'autres providers ultérieurement selon les besoins clients.

**3. Mapping Automatique des Métadonnées**
- Pré-remplissage intelligent depuis les métadonnées œuvre existantes
- Mapping configurable et personnalisable (client par client si nécessaire)
- Signalement automatique des champs manquants pour compléter le package

**4. Validation Temps Réel Multi-Niveaux**
- Validation au niveau Package (métadonnées globales)
- Validation au niveau Langue (champs localisables)
- Validation au niveau Territoire (surcharges spécifiques)
- Conformité garantie aux specs de chaque provider
- Indicateurs visuels clairs: complet ✅ / incomplet ⚠️ / manquant ❌

**5. Interface Packages Native**
- Nouvel onglet "Packages" sur la page Œuvre dans mediaspot
- Création et gestion des packages par provider
- Ajout et configuration des langues et territoires
- Interface intuitive avec guidage contextuel
- Workflow unifié intégré dans l'écosystème mediaspot existant

**6. Vue Centralisée des Localisations (Drawer)**
- Interface drawer permettant de visualiser toutes les valeurs localisées d'un champ en un seul endroit
- Édition centralisée pour maximiser la productivité des utilisateurs
- Vue d'ensemble immédiate de la couverture linguistique et territoriale
- Navigation efficace sans répétition

**Critical pour MVP:** Cette fonctionnalité participe directement à la productivité attendue par les utilisateurs et fait partie de la proposition de valeur core.

**7. Packages Persistants et Réutilisables**
- Une fois créé, le package reste disponible dans mediaspot
- Réutilisable pour de multiples livraisons sur différents territoires
- Alertes automatiques si le package devient incomplet (évolution des specs provider)
- Statut clair: complet/incomplet (pas de versioning complexe)

**8. Intégration Module Order**
- Les packages validés sont directement consommables depuis le module Order existant
- Pas de changement de workflow pour les équipes delivery/ops
- Sélection transparente des packages lors de la création d'un order
- Plusieurs contenus livrables supportés : feature, trailers, artworks, etc.
- Support des configurations complexes : langues applicables au territoire OU à la langue globale
- Gestion des cas spéciaux (UHD/HDR nécessitant vidéos HDR et SDR)

**9. Interface de Configuration Providers (Air Lab)**
- Interface de configuration intuitive remplaçant les gros fichiers XML platform-specific actuels
- Tagnames normalisés pour BMME avec mapping vers métadonnées spécifiques plateformes
- Configuration des champs obligatoires, règles de validation, formats attendus par provider
- Activation des providers plateforme par plateforme
- Mise à jour simplifiée des specs lors d'évolutions providers (actuellement jusqu'à 3 fois/mois)
- Architecture permettant de créer de nombreux types de packages différents (y compris pour broadcasters individuels)
- Si tagnames normalisés bien implémentés : plus d'intérêt à gérer des configs platform-specific, réduction drastique de la maintenance

**Justification inclusion MVP :** L'équipe Air Lab doit pouvoir maintenir les specs providers de manière autonome et efficace. Sans cette interface, la maintenance des specs reste un goulot d'étranglement majeur (3 fois/mois en moyenne). Cette fonctionnalité participe directement à la scalabilité et la maintenabilité long-terme de BMM.

---

### Out of Scope pour MVP

**Pas de Version 2.0 formellement définie à ce stade.**

**Approche itérative post-MVP:**
- Design itératif avec feedback clients continu après déploiement
- Identification des améliorations basée sur l'usage réel et les retours terrain
- Évolution organique de la feature selon les besoins exprimés par les utilisateurs

**Raison:** Étant donné l'ampleur et la complexité de la feature MVP, la priorité stratégique est de livrer, déployer auprès des clients, et apprendre de l'usage réel avant de planifier des extensions ou fonctionnalités additionnelles. Le MVP complet répond déjà au besoin critique d'autonomie et de productivité.

---

### MVP Success Criteria

**Critères de succès pour valider que le MVP atteint ses objectifs:**

**1. Adoption Client:**
- 100% des clients distribution onboardés sur BMM à M+3
- Utilisation active et quotidienne par les servicers/content managers
- Packages créés pour la majorité du catalogue actif

**2. Autonomie Effective:**
- Clients capables de créer des packages complets de A à Z sans intervention de l'équipe interne mediaspot
- Réduction drastique (objectif: suppression complète) des demandes manuelles internes
- Flux de travail autonome confirmé par les retours utilisateurs

**3. Qualité & Conformité:**
- ~100% des packages créés sont conformes aux specs providers du premier coup
- Validation temps réel élimine les erreurs de livraison et les rejets
- Packages utilisés avec succès dans le module Order pour les livraisons réelles

**4. Productivité Mesurable:**
- Temps de création d'un package divisé par 10: de plusieurs heures → quelques minutes
- Packages créés et réutilisés sur multiples territoires avec effort minimal
- Temps libéré pour l'équipe interne mediaspot réalloué sur des tâches à plus forte valeur

**5. Feedback Utilisateur Positif:**
- Retours qualitatifs confirmant l'autonomie retrouvée et la valeur créée
- Satisfaction sur la facilité d'usage, l'intuitivité de l'interface, et la productivité gagnée
- Clients recommandent activement la feature à leurs pairs

**Décision Go/No-Go pour futures itérations:**
- Si les critères ci-dessus sont atteints à M+3, le MVP est validé comme succès
- Les retours clients et les métriques d'usage réel informent les priorités d'évolution et d'optimisation
- Les demandes récurrentes guident le backlog des futures améliorations

---

### Future Vision

**Vision long-terme si le MVP est un succès:**

**Extensibilité Providers:**
- Ajout progressif de nouveaux providers VOD selon les demandes clients (Disney+, AppleTV+, etc.)
- Marketplace ou bibliothèque de providers configurables
- Possibilité pour les clients de demander l'ajout de providers spécifiques

**Optimisations Productivité:**
- Templates pré-configurés par genre de contenu (film, série, documentaire, etc.)
- Bulk operations: création de multiples packages ou territoires en masse
- Intelligence artificielle pour suggestions automatiques de métadonnées basées sur l'historique

**Collaboration & Workflows:**
- Fonctionnalités de revue/approbation multi-utilisateurs pour les grands comptes
- Historique et versioning avancé des packages avec rollback
- Notifications et alertes avancées (specs provider updated, package incomplet, etc.)

**Analytics & Insights:**
- Dashboard de suivi des packages et des livraisons par client
- Rapports de conformité et qualité exportables
- Insights sur les patterns d'usage et les métriques de productivité

**Intégrations Élargies:**
- APIs publiques pour intégrations externes avec les systèmes clients
- Webhooks pour automatisations avancées
- Connexions bidirectionnelles avec d'autres systèmes de metadata management

**Différenciation Concurrentielle Long-Terme:**
- BMM devient la référence du marché pour la gestion de métadonnées VOD dans l'industrie ciné-télé
- Écosystème de partenaires et intégrateurs autour de mediaspot
- Standard de facto pour l'automatisation et la conformité des métadonnées VOD
- Position de leadership incontestable face aux solutions alternatives
