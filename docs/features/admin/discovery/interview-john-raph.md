# Interview Discovery — Jonathan Bécot & Raphaël Onno (Chefs de Projet)

**Date** : 27 mars 2026
**Participants** : Jonathan Bécot & Raphaël Onno — Chefs de Projet
**Durée** : ~40 min
**Objectif** : Extraire les besoins en outils de monitoring et configuration cross-platform pour le MAM.

---

## 1. Contexte et périmètre

### Répartition des plateformes

| Jonathan | Raphaël |
|----------|---------|
| CNC, IDC, DPT | Studiocanal |
| ADAM | Newen (Studio TF1) |
| SND, Pathé | Fédération, FTD |
| Safran, Morgane, Spica | Mediatoon, Audiard, Cousteau |
| | F&P, NRJ12, Stockage VDM |

**Pas de logique de répartition globale** — volonté de voir un peu tout, même si Jonathan est plus sur Drive et Raphaël plus sur la distrib.

### Outils actuels

**Raphaël :**
- Pages principales de la plateforme (Ingests, Orders, Jobs++) surtout en période de RDD
- Catalog Reporting + Billing lors des RDDs

**Jonathan :**
> "Y a Adam et le reste"
- Pour ADAM : ponçage de toutes les pages pendant une longue période (Ingests, Orders, Jobs)
- Actions unitaires sur des jobs
- Catalog Reporting + Exports des assets
- Confluence, Jira, Zendesk

### Problématique de périmètre
- **Support niveau 1** = pas de leur ressort techniquement (devrait être aux CC ou au Care)
- Ils interviennent **proactivement** avant que les clients voient les problèmes
- Toutes les plateformes ouvertes + switch plateforme par plateforme
> "On a la même volonté de bien faire pour nos clients... du coup forcément tu essaies d'anticiper"

### Impact sur le quotidien
- **Actions à moindre plus-value** : création de comptes, relance de jobs/orders
- Certaines journées cannibalisées (jusqu'à 70% sur de la relance de jobs)
- **Amélioration récente** : refonte ADAM + refactorisations → maintenant ~30 min/jour en moyenne
> "Le fait que Adam aille mieux déjà ça m'a libéré un truc dingue"

---

## 2. Pain Points identifiés

### Investigation cross-platform
- Toutes les plateformes sont différentes (notamment stockages : Stonex, Diva, etc.)
- **Stratégie** : vérifier si un bug est présent sur d'autres plateformes similaires (drive/drive, distrib/distrib)
- Permet de cibler les problèmes avant de créer des tickets
- Beaucoup pendant les MEP

### Automatisation souhaitée

**1. Relance de workflows en masse**
> "La semaine dernière j'ai peut-être sans exagérer 1000 workflows qui ont pété" — Raphaël

Détail technique (NRJ12) :
- Fichiers trop petits → workflow bloqué à 80%, job d'archive S3 ne se lance pas
- Workflow en boucle infinie (processing permanent)
- RDD stoppée → déblocage manuel nécessaire
- Action répétitive : annuler workflow, supprimer, relancer dernier job, changer statut

**2. Copy Platform**
> "C'est 3 clics pour la créer et c'est 3 semaines pour la configurer"

- Besoin de créer des plateformes from scratch plutôt que copier
- Copy all = copie stockages, jobs, DIVA, Wowza, points de montage...
- Tout doit être reconfiguré manuellement

**3. Actions batch / Multi-select**
- Relance de jobs, orders, workflows
- Généralement mêmes erreurs au même moment → batch possible mais pas implémenté
- Bulk edit assets fonctionne bien (bon exemple)

### Workarounds actuels
> "La porte est fermée, on va passer par la fenêtre"
- Queries Mongo directes pour trouver l'info manquante
- Scripts personnels pour actions en masse
- Objectif : limiter l'impact sur la bande passante de l'équipe tech

---

## 3. Vision Cross-Platform

### Besoins prioritaires

| Catégorie | Détail |
|-----------|--------|
| **Remontées d'erreurs** | Par catégorie : Workflows, Ingests, Orders |
| **Vue RDD** | Jobs + Ingests (gérer plusieurs RDD en parallèle) |
| **Billing** | Storage Type par client (Hot/Cold) |
| **KPIs de stabilité** | Ratio erreurs/succès pour justifier les améliorations |
| **Analytics d'usage** | Utilisation des features par les clients |

### Dashboard idéal

**"Santé de mes clients"** — dashboard configurable :
- Sélection de plateformes personnalisée (mes clients)
- Vue sauvegardée par utilisateur
- Range de dates configurable ("il s'est passé quoi dans les dernières 24h ?")

**Contenu souhaité :**
- Jobs passés : réussis / en erreur / avortés
- Par type de job : Export, Transcode, Upload S3, FFmpeg...
- Pourcentage de réussite (ex: 80%, 100%)
- Storage par client : Hot / Cold
- Évolution N-1 (comparaison mois par mois)

### KPIs pour la direction

**Besoin fort** de métriques pour :
- Justifier le travail auprès de la direction et des clients
- Montrer l'amélioration de la stabilité
- Relativiser l'impact émotionnel des bugs

> "On travaille pas pour rien : entre janvier 2025 et janvier 2026, on a gagné 80% de stabilité"

> "Les clients ont plus facilement le souvenir du bug que le souvenir du truc qui a bien marché"

> "Adam c'est stable... mais on n'a pas pour le mesurer. On a juste le fait qu'on a moins de tickets Zendesk"

**Cas d'usage** : Copil direction VDM / direction client → pouvoir montrer des chiffres concrets

### Analytics d'usage
> "On sait pas comment les clients utilisent vraiment la plateforme"
- Besoin de savoir quelles features sont utilisées
- Aiderait à prioriser les évolutions
- Permet de relativiser l'impact d'un bug (touche 1 personne ou tout le monde ?)

### Configuration souhaitée (sans passer par les devs)
- Tous les points du copy platform
- Création de nouvelles plateformes
- Stockages++
- Purge rules (aujourd'hui : "ça fait peur, tu sais jamais quel stockage tu dois faire")
- Dupliquer / Scinder les jobs sans passer par la DB

---

## 4. Priorisation

### Top 3 — Raphaël
| # | Besoin |
|---|--------|
| 1 | **Copy Platform** amélioré |
| 2 | **Vue des jobs par plateforme** sans changer de page |
| 3 | **KPIs / Healthcheck** par plateforme avec résumé global |

### Top 3 — Jonathan
| # | Besoin |
|---|--------|
| 1 | **Monitoring Workflows/Jobs** centralisé (erreurs par plateforme) |
| 2 | **Healthcheck + KPIs** utiles (stabilité, évolution) |
| 3 | **Copy Platform** (pour les futures créations) |

---

## 5. Points complémentaires

### RDD Tool ?
- Idée évoquée mais difficile à concrétiser
- Contextes très différents selon les RDD (prestataires, données reçues)
- Difficile d'uniformiser
> "J'arrive pas à me le matérialiser... c'est tellement différent"

### Impact des bugs — relativisation nécessaire
> "On a 108 bugs au backlog. Mais finalement on est à 99% de healthcheck sur la plateforme. On connaît pas le réel impact de ces 108 bugs."

---

## Verbatims clés

> "Y a Adam et le reste" — Jonathan (sur la spécificité d'ADAM)

> "C'est 3 clics pour la créer et c'est 3 semaines pour la configurer" — Raphaël (copy platform)

> "La porte est fermée, on va passer par la fenêtre" — Jonathan (workarounds Mongo)

> "On travaille pas pour rien : entre janvier 2025 et janvier 2026, on a gagné 80% de stabilité" — Raphaël

> "Les clients ont plus facilement le souvenir du bug que le souvenir du truc qui a bien marché" — Jonathan

> "On sait pas comment les clients utilisent vraiment la plateforme" — Jonathan

> "Ça fait peur, tu sais jamais quel stockage tu dois faire" — Jonathan (purge rules)

---

## Synthèse des besoins

### Problème central
**Fragmentation des outils et des vues** — obligation de switcher entre plateformes, pas de vision consolidée, pas de métriques pour valoriser le travail.

### Spécificités par rapport à Airlab
- Plus orientés **création/configuration de plateformes** (copy platform)
- Fort besoin de **KPIs de stabilité** pour la direction/clients
- Gestion des **RDD** comme cas d'usage récurrent
- Moins de focus sur les alertes proactives, plus sur le **reporting**

### Impact quotidien
- Temps perdu en switch de plateformes
- Actions manuelles répétitives (relances workflows/jobs)
- Pas de métriques pour valoriser les améliorations
- Configuration copy platform très chronophage

### Quick wins potentiels
1. Vue jobs/workflows centralisée multi-plateforme
2. Actions batch (multi-select) sur jobs/workflows/orders
3. KPIs de stabilité avec évolution temporelle
