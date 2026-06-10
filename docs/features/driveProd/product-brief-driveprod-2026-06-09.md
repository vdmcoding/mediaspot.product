---
stepsCompleted: [1, 2, 3, 4, 5, 6]
status: complete
completedAt: 2026-06-09
inputDocuments:
  - "Notes de réunion (contexte conversation)"
  - "docs/features/driveProd/source-docs/mediaspot® DRIVE_Septembre 2026.pdf"
date: 2026-06-09
author: Ben
project_name: DriveProd
---

# Product Brief: DriveProd

## Executive Summary

**DriveProd** est l'extension de la plateforme mediaspot DRIVE destinée aux sociétés de production audiovisuelle (documentaires, fictions). Face à l'accumulation chaotique de disques durs et LTO dans leurs locaux, au temps perdu à rechercher des contenus, et aux solutions d'archivage prohibitives pour leur économie fragile, VDM propose le premier service d'archivage numérique low-cost pensé pour les producteurs.

Grâce à son infrastructure LTO robotisée et son modèle de tiering à la demande (NEAR-ONLINE à 9€/To/mois, OFF-LINE à 3,50€/To/mois), DriveProd permet aux producteurs de centraliser, consulter et réutiliser leurs contenus froids à un coût jusqu'à 10x inférieur aux solutions cloud classiques.

---

## Core Vision

### Problem Statement

Les sociétés de production audiovisuelle accumulent des volumes massifs de contenus froids (rushes documentaires/fictions, masters, documents de production) sur des disques durs et LTO qui envahissent leurs locaux. La gestion via Excel rend la recherche chronophage, les actifs restent non exploités, et les risques de perte ou de dégradation sont élevés.

### Problem Impact

- **Opérationnel** : Temps perdu à chercher des contenus dans un système désorganisé
- **Financier** : Contenus monétisables qui dorment sans être exploités
- **Physique** : Locaux envahis par les supports de stockage
- **Économique** : Fragilité budgétaire des petites structures face aux solutions existantes

### Why Existing Solutions Fall Short

| Solution | Limitation |
|----------|------------|
| **On-premises** | Coût d'infrastructure élevé (sauf robotisation complexe) |
| **Cloud généraliste** | Prix prohibitif pour les volumes astronomiques de rushes (plusieurs centaines de To) |
| **Status quo (DD/LTO)** | Chaos organisationnel, risques de perte, espace physique saturé |

### Proposed Solution

**mediaspot DRIVE** : une plateforme d'archivage numérique avec tiering à la demande :

1. **Stocker + Centraliser** : Ingest drag-and-drop ou service RDD, avec choix de destination NOL/OFL à l'upload
2. **Consulter** : Recherche avancée, proxys accessibles, métadonnées riches
3. **Utiliser** : Désarchivage sous 2j ouvrés, livraison Aspera, transcodage HD/SD

Architecture de stockage au choix de l'utilisateur :
- **NEAR-ONLINE** (9€/To/mois) : Accès proxy immédiat, désarchivage rapide
- **OFF-LINE** (3,50€/To/mois) : Proxy sous 15 min, source sous 2j ouvrés
- **Migration entre tiers** : Changement de mode possible à tout moment (facturation prorata)

### Key Differentiators

| Différenciateur | Avantage compétitif |
|-----------------|---------------------|
| **Infrastructure LTO robotisée VDM** | Structure de coûts imbattable |
| **Tiering à la demande (NOL/OFL)** | Utilisateur maître de son arbitrage coût/accessibilité |
| **Migration inter-tiers flexible** | Adaptation aux besoins évolutifs sans friction |
| **Service RDD clé en main** | Migration sans effort pour le producteur |
| **Certifications (TPN, CyberVadis, EcoVadis)** | Confiance des majors et diffuseurs |
| **Expertise métier audiovisuel** | Plateforme pensée pour les workflows de production |

---

## Architecture & Infrastructure

### Types de plateformes mediaspot

DriveProd doit être compatible avec les deux types d'infrastructures opérées par VDM :

| Type | Infrastructure | Caractéristiques |
|------|---------------|------------------|
| **On-premises** | LTO sur étagères + LTO robotisées (datacenters VDM) | Coûts maîtrisés, capacité importante |
| **Cloud** | AWS | Flexibilité, scalabilité |

### Implications pour DriveProd

| Aspect | On-prem | Cloud |
|--------|---------|-------|
| **Pricing NOL/OFL** | 3,50€ / 9€ To/mois (validé) | À définir (probablement plus élevé) |
| **Fonctionnement** | Identique | Identique |
| **Cible lancement** | Prioritaire (Spica pilote) | Secondaire |

### Contraintes techniques

- Le système de tiering (choix NOL/OFL à l'ingest, migration inter-tiers) doit fonctionner de manière identique sur les deux types de plateformes
- Chaque client est sur un seul type d'infrastructure (pas d'hybride par client)
- Le billing doit supporter des grilles tarifaires différentes selon l'infrastructure

### État actuel du parc

- Majorité des plateformes : **on-prem**
- Minorité : **cloud (AWS)**
- SpicaProductions (client pilote) : **on-prem**

---

## Target Users

### Primary Users

#### Persona 1 : Inès, Directrice de Production
**Profil :** Responsable de l'organisation et de la centralisation des contenus pour une société de production documentaire (~20 personnes, 30-50 To d'archives).

**Contexte :** Supervise les chargées de production qui gèrent l'archivage des masters et rushes. Aujourd'hui, l'équipe n'archive que les masters sur mediaspot Drive pour limiter les coûts. Les rushes restent sur des DD qui s'accumulent.

**Pain points :**
- Arbitrage constant coût vs accessibilité
- Risque de perte des rushes non archivés
- Temps perdu à retrouver des contenus anciens

**Objectif avec DriveProd :** Archiver TOUT (masters + rushes) à coût maîtrisé, avec une organisation claire et retrouvable.

#### Persona 2 : Meven, Channel Manager
**Profil :** Responsable de la gestion des chaînes digitales, il recherche et commande des assets pour alimenter les réseaux sociaux et plateformes.

**Contexte :** Besoin fréquent d'extraits, de rushes anciens pour créer du contenu dérivé. Aujourd'hui, dépend de la prod pour retrouver et lui fournir les fichiers.

**Pain points :**
- Dépendance à l'équipe production pour accéder aux contenus
- Délais pour obtenir les fichiers demandés
- Difficulté à savoir ce qui existe dans les archives

**Objectif avec DriveProd :** Autonomie pour rechercher, prévisualiser et commander des assets.

### Secondary Users

#### Persona 3 : Julien, Directeur Technique
**Profil :** Garant de l'infrastructure technique, il supervise les outils et valide les solutions.

**Rôle DriveProd :** Administrateur de la plateforme, paramétrage des accès et des workflows.

#### Persona 4 : Patrick + Cécile, Direction & Finance
**Profil :** Décideurs finaux sur l'adoption de nouvelles solutions.

**Critères de décision :**
- ROI démontrable (économies vs DD/LTO on-premise)
- Réduction des risques (perte de données)
- Simplicité de migration (service RDD)

### User Journey (MVP)

| Phase | Inès (Production) | Meven (Digital) |
|-------|-------------------|-----------------|
| **Découverte** | Présentation commerciale, simulation de coûts | Découvre via Inès ou la direction |
| **Onboarding** | Formation admin, import initial (RDD) | Accès utilisateur, découverte interface |
| **Usage quotidien** | Upload nouveaux contenus, choix NOL/OFL | Recherche, preview proxy, commande export |
| **Moment "aha!"** | "Tous mes rushes sont enfin centralisés et retrouvables" | "Je peux chercher et commander sans déranger la prod" |
| **Long terme** | Migration progressive des archives DD | Autonomie totale sur l'accès aux contenus |

### Hypothèses à valider (interviews SpicaProductions)

- [ ] Workflow exact de recherche/commande par le Pôle Digital
- [ ] Intérêt des équipes éditoriales (enquêteurs, RC) à accéder directement
- [ ] Critères de décision prioritaires pour la direction
- [ ] Proportion masters vs rushes à archiver à l'avenir

---

## Success Metrics

### Métriques de Succès Utilisateur

| Utilisateur | Indicateur de succès | Mesure |
|-------------|---------------------|--------|
| **Gestionnaire (Inès)** | Libération physique des locaux | Progression RDD : % des DD/LTO migrés vers DriveProd |
| **Producteur (équipe)** | Efficacité de recherche | Feedback qualitatif sur l'expérience recherche/preview |
| **Consommateur (Meven)** | Autonomie d'accès | Capacité à rechercher et commander sans dépendre de la prod |

**Moment de succès :** Le client commence à se débarrasser physiquement de ses disques durs après validation des premiers lots migrés.

### Business Objectives

| Horizon | Objectif | Cible |
|---------|----------|-------|
| **Lancement (Sept 2026)** | Validation produit | Spica onboardé comme client pilote |
| **6 mois (Mars 2027)** | Validation marché | 10 clients signés |
| **12 mois (Sept 2027)** | Croissance | À définir selon retours marché |

**Objectif financier :** 165k€ de new business d'ici début 2027 (ambitieux compte tenu des cycles RDD longs).

### Key Performance Indicators

| KPI | Description | Cible |
|-----|-------------|-------|
| **Clients signés** | Nombre de sociétés de production sous contrat | 10 à 6 mois |
| **Volume sous gestion** | To totaux archivés sur DriveProd | À définir |
| **Taux de pénétration** | % du volume client archivé vs volume total estimé | 50% |
| **Rétention** | Taux de conservation des clients post-RDD | Élevé (naturellement sticky) |

### Notes stratégiques

- **Acquisition** : Nouveaux prospects principalement (Spica = seul client prod existant)
- **Stickiness** : La RDD (processus long et coûteux) crée une barrière de sortie naturelle
- **Satisfaction** : Feedback informel pour le MVP, formalisation à envisager post-lancement

---

## MVP Scope

### Core Features (Septembre 2026)

#### À développer / adapter

| Feature | Description | Effort estimé |
|---------|-------------|---------------|
| **Choix NOL/OFL à l'ingest** | Sélection de la destination de stockage lors de l'upload | Petit dev |
| **Migration inter-tiers** | Changement de mode NOL↔OFL à la demande, avec facturation prorata | À valider (existe en distribution) |
| **Billing différencié** | Affichage des consommations par tier dans le reporting mensuel | À valider (supposé natif) |
| **Compatibilité on-prem / cloud** | Fonctionnement identique sur les deux types d'infra | À valider |
| **Grilles tarifaires par infra** | Support de pricing différent selon on-prem ou cloud | À intégrer au billing |

#### Existant à intégrer (pas de dev)

| Feature | Statut |
|---------|--------|
| Upload drag-and-drop | ✅ Existe |
| Recherche & filtrage | ✅ Existe |
| Preview proxy | ✅ Existe |
| Thumbnails / Storyboard | ✅ Existe (à ne pas oublier) |
| Désarchivage + livraison Aspera | ✅ Existe |
| Transcodage HD/SD | ✅ Existe |
| Gestion utilisateurs (5 inclus) | ✅ Existe |
| Métadonnées configurables | ✅ Existe |

#### Service opérationnel

| Service | Description |
|---------|-------------|
| **Reprise De Données (RDD)** | Migration clé en main des DD/LTO clients par les équipes VDM |

### Out of Scope for MVP

| Feature | Raison | Horizon |
|---------|--------|---------|
| **Partage externe** | Capacité existante mais pas prioritaire pour le use case archivage | Post-MVP si demande |
| **Annotations / Clips** | Vision collaborative avancée | V2 |
| **Export timelines** | Nice-to-have mentionné | V2+ |
| **Travail collaboratif avancé** | Dépend du retour marché | V2 |

### MVP Success Criteria

| Critère | Seuil de validation |
|---------|---------------------|
| **Spica pilote** | Onboardé et satisfait avant lancement public |
| **Billing fonctionnel** | Facturation différenciée NOL/OFL opérationnelle |
| **RDD opérationnel** | Processus validé sur premiers clients |
| **10 clients signés** | Validation marché à 6 mois |

### Future Vision (V2+)

**Court terme (2027) :**
- Annotations d'extraits et création de clips
- Partage externe sécurisé (si demande marché)
- Exports de timelines pour intégration montage

**Moyen terme (2028+) :**
- DriveProd comme solution de production complète
- Travail collaboratif avancé (réalisateurs, monteurs, clients)
- Intégrations avec outils de montage (Premiere, Avid, DaVinci)
