---
stepsCompleted: [1, 2, 3, 4-draft]
inputDocuments:
  - _bmad-output/planning-artifacts/product-brief-mediaspot.bmad-2026-01-08.md
workflowType: 'prd'
lastStep: 4-draft
briefCount: 1
researchCount: 0
brainstormingCount: 0
projectDocsCount: 0
notes: "Step 4 (User Journeys) en cours - Draft sauvegardé. À reprendre lundi après clarification ordering/packages avec collègue."
---

# Product Requirements Document - mediaspot.bmad

**Author:** Ben
**Date:** 2026-01-08

## Executive Summary

BundleMaker Metadata (BMM) est une feature native de MediaSpot qui révolutionne la préparation et la gestion des métadonnées pour les plateformes de distribution VOD (Netflix, Amazon, Google, iTunes). Le système transforme un processus manuel chronophage - actuellement géré par une ressource interne unique via un outil externe vieillot (VDM Connect) - en une capacité self-service complète pour les clients.

**Le problème résolu :**
Les clients MediaSpot font face à une complexité exponentielle dans la gestion des métadonnées VOD : **Providers × Territoires × Catalogue = Explosion de la charge de travail**. Chaque provider impose ses propres spécifications (Netflix ≠ Amazon ≠ Google), et chaque territoire exige une localisation spécifique qui va au-delà de la simple traduction linguistique (France ≠ Québec malgré la langue commune). Aujourd'hui, la préparation des métadonnées pour un seul film peut prendre plusieurs heures, créant un goulot d'étranglement majeur qui empêche les clients d'être autonomes sur leurs propres données.

**Les utilisateurs :**
- **Primaires :** Servicers et Content Managers des studios de distribution et de production (cinéma-télévision) qui gèrent le catalogue de contenu et créent les packages de métadonnées de manière autonome
- **Secondaires :** Équipes Delivery/Ops qui utilisent les packages pré-configurés pour exécuter les livraisons vers les plateformes VOD

**L'impact attendu :**
Autonomie client complète, réduction drastique du time-to-delivery (de plusieurs heures à quelques minutes), élimination du goulot d'étranglement interne, et capacité à scale sur de multiples providers et territoires simultanément.

### Ce qui rend BMM spécial

**1. Architecture en cascade intelligente unique**
Système d'héritage à 4 niveaux (Œuvre → Package → Langue → Territoire) avec "reasonable defaults" qui réduit la saisie manuelle de 70-80%. Le client ne saisit que le minimum nécessaire : si la saisie initiale au niveau œuvre est rigoureuse, le travail devient minimal pour scale sur multiples providers et territoires.

**2. Intégration native dans MediaSpot**
Pas de système externe à maîtriser. Accès direct aux métadonnées œuvre existantes. Workflow unifié du catalogage à la livraison via un nouvel onglet "Packages" directement sur la page Œuvre.

**3. Validation intelligente et guidage contextuel**
Le système connaît les specs de TOUS les providers (Netflix, Amazon, Google, iTunes) et valide en temps réel à chaque niveau (package, langue, territoire). Interface claire sur ce qui est complet/incomplet/manquant.

**4. Autonomie client complète**
Self-service de bout en bout. Plus de dépendance aux ressources internes MediaSpot. Time-to-delivery divisé par 10 (de plusieurs heures à quelques minutes).

**5. Packages persistants et réutilisables**
Une fois créé, un package reste disponible et ne nécessite plus de maintenance sauf évolution des specs provider. Scalabilité sans précédent : déployable sur de multiples territoires avec un effort minimal.

**6. Vue centralisée des localisations**
Interface drawer unique permettant de visualiser et éditer toutes les valeurs localisées d'un champ en un seul endroit. Vision d'ensemble immédiate de la couverture linguistique/territoriale. Édition efficace sans navigation répétitive.

**7. Unfair advantage**
MediaSpot possède déjà la documentation complète des specs de chaque provider et les règles de validation. BundleMaker encode cette expertise métier directement dans l'interface, transformant un savoir tribal en système intelligent accessible à tous les clients.

## Classification du projet

**Type Technique :** SaaS B2B Platform
**Domaine :** Media/Entertainment
**Complexité :** Medium
**Contexte Projet :** Greenfield - nouveau projet

**Justification de la classification :**

BMM est une plateforme SaaS B2B avec les caractéristiques suivantes :
- **Multi-tenant implicite :** Différents clients studios/distributeurs utilisant MediaSpot
- **Modèle de permissions :** Servicers/Content Managers créent et maintiennent les packages, équipes Delivery/Ops les consomment pour les livraisons
- **Intégration native :** Feature intégrée dans l'écosystème MediaSpot existant (onglet Packages sur page Œuvre, consommation depuis module Order)
- **Interface dashboard :** Gestion centralisée avec drawer pour vue consolidée des localisations
- **Expertise métier encodée :** Pas de réglementation lourde (type healthcare/fintech) mais expertise forte sur les specs providers transformée en système intelligent

La complexité est considérée medium en raison de la gestion de multiples specs providers, du système d'héritage à 4 niveaux, de la validation temps réel multi-niveaux, et de l'intégration dans un écosystème existant.

## Success Criteria

### User Success

**Definition of Done pour les Servicers/Content Managers :**
Le moment de succès est atteint quand le servicer **livre son package et que celui-ci est accepté par la plateforme VOD (Netflix, Amazon, Google, iTunes) du premier coup**. La promesse centrale est : **métadonnées rigoureuses = livraison garantie via la plateforme**.

**Le parcours vers le succès :**
1. **Premier "Aha Moment" :** Existence de la feature BMM = autonomie retrouvée. Le servicer crée son premier package sans intervention de l'équipe interne MediaSpot.
2. **Moment de validation :** Le package est livré et accepté par la plateforme provider sans rejet ni erreur de conformité.
3. **Réalisation de la scalabilité :** Réutilisation d'un package existant pour déployer sur un nouveau territoire en quelques minutes au lieu de plusieurs heures.

**Outcome principal :**
Les servicers gagnent leur autonomie complète sur la préparation des métadonnées VOD. Ils peuvent gérer efficacement leur catalogue sur multiples providers et territoires, avec la confiance que leurs packages seront conformes grâce aux outils de productivité (mapping automatique, validation temps réel, drawer de localisations, système d'entonnoir).

**Pour les équipes Delivery/Ops (utilisateurs secondaires) :**
Utilisation transparente des packages pré-configurés et validés dans le module Order. Pas de changement de workflow, mais qualité et conformité garanties.

### Business Success

**Objectifs à 3 mois (Adoption & Décharge Opérationnelle) :**
- **100% des 4 clients distribution principaux onboardés** sur BMM et utilisant activement la feature
- **Décharge maximale des demandes internes manuelles** : mesure via le ratio orders BundleMaker en self-service vs demandes manuelles internes
- **Feature stable et utilisée quotidiennement** par les servicers/content managers
- **Packages créés pour la majorité du catalogue actif** des 4 clients principaux

**Objectifs à 12 mois (Argument Commercial & Excellence Opérationnelle) :**
- **BMM devient un argument de vente majeur** pour les équipes commerciales MediaSpot
- **Réduction voire suppression complète** des demandes manuelles internes : objectif proche de 100% d'autonomie
- **Conformité ~100%** des packages créés : validation automatique garantissant la qualité et l'acceptation par les plateformes
- **Time-to-delivery divisé par 10** confirmé par les métriques d'usage réel (de plusieurs heures à quelques minutes)

**KPIs Mesurables :**

**Adoption :**
- Taux d'onboarding des 4 clients distribution : 100% à M+3
- Nombre de packages créés par mois par client (croissance continue)
- Nombre d'orders BundleMaker en self-service (mesure de l'autonomie effective)

**Décharge opérationnelle :**
- Ratio orders self-service vs demandes manuelles internes
- Réduction progressive jusqu'à suppression des demandes manuelles (objectif M+12)
- Temps libéré pour l'équipe interne MediaSpot

**Qualité & Conformité :**
- Taux de conformité des packages : ~100% (validation temps réel multi-niveaux)
- Taux d'acceptation par les plateformes VOD : ~100% (packages validés du premier coup)
- Taux d'erreur lors des livraisons : proche de 0%

**Productivité :**
- Temps de création d'un package : réduction de plusieurs heures → quelques minutes (objectif divisé par 10)
- Packages réutilisés sur multiples territoires avec effort minimal
- Satisfaction client sur la facilité d'usage et l'autonomie retrouvée

### Technical Success

**Scalabilité :**
- **Architecture extensible** permettant l'ajout de nouveaux providers au-delà des 4 initiaux (Netflix, Amazon, Google, iTunes) sans refactoring majeur
- **Système de configuration des specs providers** isolé et maintenable : ajout de providers = travail de configuration, pas de développement
- **Performance maintenue** avec augmentation du nombre de packages, langues, territoires et providers

**Outils de productivité efficaces :**
- **Mapping automatique** fonctionnel depuis les métadonnées œuvre vers les champs providers
- **Validation temps réel multi-niveaux** (Package → Langue → Territoire) fiable et performante
- **Interface drawer de localisations** intuitive et efficace pour la gestion centralisée des traductions
- **Système d'entonnoir (cascade)** qui fonctionne correctement avec héritage automatique et reasonable defaults

**Intégration robuste :**
- **Onglet Packages** intégré nativement dans la page Œuvre de MediaSpot
- **Consommation transparente** des packages depuis le module Order existant
- **Pas de régression** sur les fonctionnalités existantes de MediaSpot
- **Save automatique** fiable sans perte de données

**Qualité système :**
- **Stabilité** : pas de bugs bloquants en production
- **Temps de réponse** acceptable pour les opérations de saisie et validation
- **Fiabilité** de la validation : conformité garantie aux specs de chaque provider

### Measurable Outcomes

**User Success Metrics :**
- Premier package créé et livré avec succès sans intervention interne : objectif 100% des servicers à M+3
- Taux de réutilisation des packages sur multiples territoires : indicateur de scalabilité
- Feedback qualitatif positif sur l'autonomie et la productivité

**Business Success Metrics :**
- 4 clients distribution onboardés et actifs à M+3
- Ratio orders self-service croissant jusqu'à ~100% à M+12
- Time-to-delivery divisé par 10 confirmé par les métriques d'usage

**Technical Success Metrics :**
- Conformité des packages : ~100%
- Taux d'acceptation par les plateformes VOD : ~100%
- Temps de réponse de l'interface : acceptable pour usage quotidien
- Ajout de nouveaux providers post-MVP facilité par l'architecture scalable

## Product Scope

### MVP - Minimum Viable Product

**Core Features (Non-Négociables) :**

**1. Architecture en Cascade Intelligente Complète**
- Système d'héritage à 4 niveaux : Œuvre → Package → Langue → Territoire
- Logique de "reasonable defaults" avec héritage automatique entre les niveaux
- Save automatique à chaque modification (pas de perte de données)

**2. Support Multi-Providers (4 providers)**
- Netflix
- Amazon
- Google
- iTunes

Architecture extensible permettant l'ajout d'autres providers ultérieurement. Les 4 providers initiaux sont nécessaires dès le MVP car l'ajout de providers est du travail de configuration (specs, champs obligatoires) et non de développement si l'architecture est scalable dès le départ.

**3. Mapping Automatique des Métadonnées**
- Pré-remplissage intelligent depuis les métadonnées œuvre existantes
- Mapping configurable et personnalisable (client par client si nécessaire)
- Signalement automatique des champs manquants pour compléter le package

**4. Validation Temps Réel Multi-Niveaux**
- Validation au niveau Package (métadonnées globales)
- Validation au niveau Langue (champs localisables)
- Validation au niveau Territoire (surcharges spécifiques)
- Conformité garantie aux specs de chaque provider
- Indicateurs visuels clairs : complet ✅ / incomplet ⚠️ / manquant ❌

**5. Interface Packages Native**
- Nouvel onglet "Packages" sur la page Œuvre dans MediaSpot
- Création et gestion des packages par provider
- Ajout et configuration des langues et territoires
- Interface intuitive avec guidage contextuel
- Workflow unifié intégré dans l'écosystème MediaSpot existant

**6. Vue Centralisée des Localisations (Drawer)**
- Interface drawer permettant de visualiser toutes les valeurs localisées d'un champ en un seul endroit
- Édition centralisée pour maximiser la productivité des utilisateurs
- Vue d'ensemble immédiate de la couverture linguistique et territoriale
- Navigation efficace sans répétition

**Justification inclusion MVP :** Ratio temps d'implémentation / bénéfice utilisateur excellent. Participe directement à la productivité attendue et fait partie de la proposition de valeur core.

**7. Packages Persistants et Réutilisables**
- Une fois créé, le package reste disponible dans MediaSpot
- Réutilisable pour de multiples livraisons sur différents territoires
- Alertes automatiques si le package devient incomplet (évolution des specs provider)
- Statut clair : complet/incomplet (pas de versioning complexe)

**8. Intégration Module Order**
- Les packages validés sont directement consommables depuis le module Order existant
- Pas de changement de workflow pour les équipes delivery/ops
- Sélection transparente des packages lors de la création d'un order

**MVP Success Criteria (Validation du concept) :**

1. **Adoption Client :**
   - 100% des 4 clients distribution onboardés sur BMM à M+3
   - Utilisation active et quotidienne par les servicers/content managers
   - Packages créés pour la majorité du catalogue actif

2. **Autonomie Effective :**
   - Clients capables de créer des packages complets de A à Z sans intervention de l'équipe interne MediaSpot
   - Réduction drastique (objectif : suppression complète) des demandes manuelles internes
   - Flux de travail autonome confirmé par les retours utilisateurs

3. **Qualité & Conformité :**
   - ~100% des packages créés sont conformes aux specs providers du premier coup
   - Validation temps réel élimine les erreurs de livraison et les rejets
   - Packages utilisés avec succès dans le module Order pour les livraisons réelles

4. **Productivité Mesurable :**
   - Temps de création d'un package divisé par 10 : de plusieurs heures → quelques minutes
   - Packages créés et réutilisés sur multiples territoires avec effort minimal
   - Temps libéré pour l'équipe interne MediaSpot réalloué sur des tâches à plus forte valeur

5. **Feedback Utilisateur Positif :**
   - Retours qualitatifs confirmant l'autonomie retrouvée et la valeur créée
   - Satisfaction sur la facilité d'usage, l'intuitivité de l'interface, et la productivité gagnée
   - Clients recommandent activement la feature à leurs pairs

**Décision Go/No-Go pour futures itérations :**
Si les critères ci-dessus sont atteints à M+3, le MVP est validé comme succès. Les retours clients et les métriques d'usage réel informent les priorités d'évolution et d'optimisation. Les demandes récurrentes guident le backlog des futures améliorations.

### Growth Features (Post-MVP)

**Approche itérative basée sur le feedback :**
Pas de Version 2.0 formellement définie à ce stade. L'approche privilégiée est le design itératif avec feedback clients continu après déploiement du MVP.

**Raison :** Étant donné l'ampleur et la complexité de la feature MVP, la priorité stratégique est de livrer, déployer auprès des 4 clients principaux, et apprendre de l'usage réel avant de planifier des extensions ou fonctionnalités additionnelles. Le MVP complet répond déjà au besoin critique d'autonomie et de productivité.

**Identification des améliorations basée sur :**
- Usage réel et retours terrain des servicers/content managers
- Métriques d'adoption et de productivité
- Demandes clients récurrentes
- Évolution des specs providers nécessitant des ajustements

### Vision (Future)

**Vision long-terme si le MVP est un succès :**

**Extensibilité Providers :**
- Ajout progressif de nouveaux providers VOD selon les demandes clients (Disney+, AppleTV+, etc.)
- Marketplace ou bibliothèque de providers configurables
- Possibilité pour les clients de demander l'ajout de providers spécifiques

**Optimisations Productivité :**
- Templates pré-configurés par genre de contenu (film, série, documentaire, etc.)
- Bulk operations : création de multiples packages ou territoires en masse
- Intelligence artificielle pour suggestions automatiques de métadonnées basées sur l'historique

**Collaboration & Workflows :**
- Fonctionnalités de revue/approbation multi-utilisateurs pour les grands comptes
- Historique et versioning avancé des packages avec rollback
- Notifications et alertes avancées (specs provider updated, package incomplet, etc.)

**Analytics & Insights :**
- Dashboard de suivi des packages et des livraisons par client
- Rapports de conformité et qualité exportables
- Insights sur les patterns d'usage et les métriques de productivité

**Intégrations Élargies :**
- APIs publiques pour intégrations externes avec les systèmes clients
- Webhooks pour automatisations avancées
- Connexions bidirectionnelles avec d'autres systèmes de metadata management

**Différenciation Concurrentielle Long-Terme :**
- BMM devient la référence du marché pour la gestion de métadonnées VOD dans l'industrie ciné-télé
- Écosystème de partenaires et intégrateurs autour de MediaSpot
- Standard de facto pour l'automatisation et la conformité des métadonnées VOD
- Position de leadership incontestable face aux solutions alternatives
