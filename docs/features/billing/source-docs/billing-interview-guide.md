# Guide d'Interview - Refonte Billing Media Spot

**Date prévue :** [À compléter]
**Interlocuteur :** Product Owner Media Spot
**Durée :** 1h
**Interviewer :** Ben (Designer)
**Objectif :** Capturer l'intégralité de la logique métier de la facturation pour la refonte

---

## 🎯 Contexte de l'interview

**Problème identifié :** Les clients ne comprennent pas combien leur coûte Media Spot
**Feature actuelle :** Billing mal implémenté
**Objectif refonte :** Vue simple + analytique des coûts pour les clients finaux

**Axes de stockage à explorer :**
- **Type de stockage :** On-premise vs Cloud
- **Type de consommation :** Stockage froid (archivage, moins cher) vs Stockage chaud (utilisation directe, plus cher)

---

## 📋 Structure de l'interview (60 min)

### 🔍 PARTIE 1 : Comprendre l'existant (15 min)

**1.1 État des lieux actuel**
- Peux-tu me décrire comment fonctionne le billing aujourd'hui ?

mediaspot.io/pricing
base : prix du stockage et mouvements (timeboxed) + activités (ingest & proxy generation / order / share) + add-ons additionnels (licences + users)
Clients cloud facturés à la presta, clients on-premise facturés au forfait (avec gestion de dépassements)
Spécificités par client, négociations des prix et des options au contrat
Billing du CNC : prix du marché codifié (marché public) par BPU. Stockage 1/4 d'h, stockage rapide / lent

- Quelles sont les données actuellement facturées/trackées ?
Pour les 3 grosses BU (storage, activities & licences)
Pour chaque activity, possibilité de savoir (et donc facturer) sur quelle entité l'action a été effectuée (Asset / Title etc.) et avec quelles settings (Order par exemple)

- Comment les clients accèdent-ils à ces informations aujourd'hui ?
À réception de la facture uniquement. Peu d'utilisation de nos dashboards de billing existants. L'objectif est de permettre à nos clients d'exploiter ces pages/
L'accès à ces données permet à nos clients de refacturer à leurs clients à eux

- À quelle fréquence les clients consultent-ils leur facturation ?

**1.2 Les pain points précis**
- Quels sont les retours clients les plus fréquents sur le billing actuel ?
Pas vraiment de retours de clients finaux car la majorité de la charge cognitive est assumée par les chargés de clientèle (ou CC).

- Quelles questions posent-ils au support/CSM concernant leur facture ?
Vulgarisation et explication des coûts par le CC. Pourquoi tel prix, pourquoi telle ligne a réduit / augmenté, etc.

- Y a-t-il des incompréhensions récurrentes ?
- Des litiges ou contestations fréquentes ?
- Quels éléments manquent-ils pour comprendre leurs coûts ?

Une fois la facture "mediapost", ajout manuel de prestations internes (manual tasks) par les chargés de clientèle. Possibilité de récurrence non gérée auourd'hui
Les dashboards sont interdits au clients pour l'instant de part leur complexité : jargon technique, prix à 0, UX générale pas terrible. Pain points partagé par nos clients et par l'interne. Difficulté à comprendre les coûts (lié au tracking des activités mentionnés précédemment non affiché)
Impossibilité de générer une vraie facture. Ajd, récupération des informations dans plusieurs endroits (pas forcément prévus pour ça à la base et nécessitant donc du retravail de tri et de filtrage) puis concaténation dans IRIS (notre ERP) pour génération de la facture. Manque un mapping clair entre mediaspot et notre ERP (fonctionnalité d'export vers IRIS)

**1.3 Impact business**
- Ces problèmes de billing génèrent-ils du churn ?
Jamais eu de churn, grâce aux chargés de clientèle qui assument ce travail à la place de la plateforme

- Ralentissent-ils les ventes/upsells ?
Sans aucun doute : bcp de travail en interne, difficulté à onboarder de nouveaux clients, contrainte des contrats très spécifiques à chaque client.

- Combien de temps le support/CSM passe-t-il à expliquer les factures ?
Coûts humains, 4/5j par mois pour la production finale de la facture + du temps de développement (pour la génération de scripts).
27 clients pour 6 chargés de clientèle en interne

---

### 💰 PARTIE 2 : Modèles de facturation et logique métier (20 min)

**2.1 Modèles tarifaires**
- Quels sont les différents modèles de pricing chez Media Spot ?
  - Forfait ? Usage ? Hybride ?
  - Quelles sont les unités de facturation ? (Go, To, heures de transcodage, API calls, etc.)
- Y a-t-il des différences de tarification entre :
  - **Stockage on-premise vs cloud** ?
  - **Stockage chaud vs froid** ?
- Comment s'appliquent les tarifs ?
  - Paliers ? Dégressif ? Linéaire ?
  - Y a-t-il des minimums facturables ?

3 BUs : Storage, Activities, Platform (licences & users)

Storage: Certains clients au forfait d'autres au centime près du coût final. Stockage chaud / froid, l'un est simplement moins cher que l'autre.
Activities: facturé à la tâche, soit automatiques via la plateforme, soit géré par des tâches manuelles en internes
Platform: forfait fixe mensuel négocié au contrat, évolutif avec de nouvelles licences / users (prorata du mois en cours lors de l'ajout)
Fixed billing items: stockage de DVDs, lignes de facturation spécifiques à des clients, etc.

**2.2 Composantes de coût**
Pour chaque type de client, quels sont les éléments facturés ?

| Élément facturable | On-premise | Cloud | Chaud | Froid | Unité | Notes |
|-------------------|------------|-------|-------|-------|-------|-------|
| Stockage volume   | [ ]        | [ ]   | [ ]   | [ ]   | ?     |       |
| Bande passante    | [ ]        | [ ]   | [ ]   | [ ]   | ?     |       |
| Transcodage       | [ ]        | [ ]   | [ ]   | [ ]   | ?     |       |
| API calls         | [ ]        | [ ]   | [ ]   | [ ]   | ?     |       |
| Livraison médias  | [ ]        | [ ]   | [ ]   | [ ]   | ?     |       |
| Autres...         | [ ]        | [ ]   | [ ]   | [ ]   | ?     |       |

Basic Users / admin users
Minutes de media processing
Data transfer
Consommation (Orders, Ingests, Storage, Shares)
Licences

Pour chaque action, possibilité de savoir sur quelle entité l'action a été effectuée (Asset / Title etc.) et avec quelles settings (Order par exemple)

**2.3 Variations selon profils clients**
- Les modèles de facturation diffèrent-ils entre :
  - Production vs Distribution vs Archivage ?
  - Gros comptes vs PME ?
- Y a-t-il des contrats sur-mesure ? Des remises négociées ?
- Comment ces exceptions sont-elles gérées dans le système ?

**2.4 Cycle de facturation**
- Quelle est la périodicité de facturation ? (mensuelle, annuelle, autre ?)
Mensuelle pour tous les clients

- Y a-t-il des provisions/acomptes ?
- Comment gère-t-on les ajustements en cours de période ?
Factures uniques à la fin du mois, variable en fonction des usages

- Les clients peuvent-ils changer de tier/plan en cours de période ?
Pas vraiment de tiers / plan. Facturation par client gérée par le contrat, les commerciaux et les chargés de clientèle. Beaucoup de négociations en amont, et donc de la configuration par plateforme nécessaire.

---

### 📊 PARTIE 3 : Besoins fonctionnels de la refonte (15 min)

**3.1 Vue analytique souhaitée**
- Quelles sont les vues/dashboards que les clients devraient pouvoir consulter ?
  - Vue globale des coûts ?
  - Détail par service (stockage, transcodage, etc.) ?
  - Évolution temporelle (trends, comparaisons) ?
  - Projections/prévisions ?

Analytics
- Facturation annuelle, agrégats
- Facturation par BU / Filtres de BU
- Comparaison de mois BU par BU
- Forecast

Offre actuelle (subscription)
- platform, prix des licences, coûts récurrents

Mois actuel, suivi de la facture en cours de construction
- Forecast ? dépendant de l'historique, comparé à la conso du / des mois précédents

Vue d'ensemble d'une facturation, graphique, évolution par rapport aux mois précédents
Lignes de facturation
- Filtrage par BU / par user / par entité
Détail d'une ligne : quelle BU, quel entité, quel créateur, quelles settings, etc.

**3.2 Granularité de l'information**
- À quel niveau de détail les clients doivent-ils pouvoir descendre ?
  - Par projet/workspace ?
  - Par type de média ?
  - Par utilisateur ?
  - Par localisation de stockage ?
- Y a-t-il des besoins de filtrage/segmentation spécifiques ?

**3.3 Alertes et notifications**
- Les clients doivent-ils être alertés ? (dépassements, seuils, anomalies)
- Quels types d'alertes ? À quelle fréquence ?
- Qui doit recevoir ces alertes ? (admin, finance, tous les users ?)

Reasonnable defaults, limit control ?
Seuils : pas vraiment, sans doute trop power user
Alertes de dépassements, anomalies
> Trop power user pour les clients

**3.4 Actions disponibles**
- Que doivent pouvoir faire les clients depuis cette interface ?
  - Télécharger des rapports ? (PDF, CSV, Excel ?)
  - Modifier leur plan/tier ?
  - Gérer des budgets/quotas ?
  - Activer/désactiver des services ?
  - Gérer le passage chaud ↔ froid ?

Exporter une facture vers IRIS (CSV, mapping)
Export des données granulaires + résumés
Export avancé :
- Sélection des BUs
- Sélection des colonnes 
- Ajout de filtres, de sorting à l'export

Configuration de plateformes, gestion de clientèle (mais plutôt dans les settings de plateforme plutôt que le billing en lui-même)

**3.5 Règles métier spécifiques**
- Y a-t-il des règles métier complexes à gérer ?
  - Migration automatique chaud → froid après X jours ?
  - Calculs proratisés ?
  - Crédits/rollover de consommation ?
  - Gestion de la TVA/taxes internationales ?

---

### 🎨 PARTIE 4 : Priorités et contraintes (10 min)

**4.1 Priorisation fonctionnelle**
- Quelles sont les 3 fonctionnalités MUST-HAVE absolues pour le MVP ?
- Qu'est-ce qui peut être livré en phase 2 ?
- Y a-t-il des quick wins identifiables ?

1. Cohérence du billing, détail des lignes, données exploitables
2. Interface de consultation claires et simples à utiliser
3. Un export puissant et maléable

**4.2 Personas et cas d'usage**
- Qui sont les utilisateurs finaux de cette interface ?
  - Admins techniques ?
  - Directeurs financiers ?
  - CSM côté client ?
- Quels sont leurs parcours types ? (job-to-be-done)

Chargés de clientèle une fois par mois
Dans un temps 2, clients. L'objectif est de permettre le self-service du client sur le billing.

**4.3 Contraintes techniques/business**
- Y a-t-il des contraintes techniques connues ?
- Des dépendances avec d'autres systèmes ? (ERP, CRM, outil de ticketing ?)
- Des obligations légales/comptables à respecter ?

Avec notre ERP, IRIS est nécessaire pour la facturation (mais pas MVP)
Dans un temps 2, synchronisation auto vers notre ERP.

**4.4 Succès metrics**
- Comment mesure-t-on le succès de cette refonte ?
  - Réduction du temps support sur le billing ?
  - Amélioration du NPS/satisfaction ?
  - Réduction des contestations ?
  - Autres KPIs ?

1 client en self-service
15 minutes max de facturation par mois pour les C/C.

---

## 🚀 Clôture et prochaines étapes

**Questions finales :**
- Y a-t-il des benchmarks/inspirations que tu as en tête ? (produits concurrents, autres outils SaaS avec bon billing)
- Qui d'autre devrait être impliqué dans ce projet ? (finance, tech lead, autres stakeholders ?)
- Y a-t-il de la documentation existante à consulter ? (specs anciennes, tickets support, contrats types, grilles tarifaires)

**Actions post-interview :**
- [ ] Synthèse des insights en exigences fonctionnelles
- [ ] Mapping des user stories prioritaires
- [ ] Identification des zones d'ombre nécessitant investigation complémentaire
- [ ] Workshop de validation avec l'équipe (optionnel)

---

## 📝 Notes d'interview

### Section libre pour prise de notes en direct

**Insights clés :**
-
-
-

**Verbatims intéressants :**
-
-

**Questions de suivi :**
-
-

**Surprises/découvertes :**
-
-

---

## ✅ Checklist pré-interview

- [ ] Lire les tickets support liés au billing
- [ ] Regarder la feature actuelle (screenshots/démo rapide)
- [ ] Préparer un outil de prise de notes (ce doc + enregistrement ?)
- [ ] Confirmer la dispo du PO et la durée (1h)
- [ ] Prévoir 15 min post-interview pour synthèse à chaud

---

**💡 Conseils d'animation :**
- Partir des exemples concrets : "Raconte-moi le dernier problème client sur le billing"
- Utiliser la technique des 5 pourquoi pour creuser les causes racines
- Demander de voir la feature actuelle en live pendant l'entretien si possible
- Noter les verbatims clients exacts (gold pour les user stories)
- Si une zone reste floue, ne pas hésiter à redemander avec d'autres mots
- Observer les hésitations du PO = souvent zones d'incertitude métier à investiguer

---

*Document créé le : 2026-01-08*
*Projet : Media Spot - Refonte Billing*
