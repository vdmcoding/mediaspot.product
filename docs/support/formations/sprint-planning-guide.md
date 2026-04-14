# Guide du Sprint Planning

> **Document de formation** — Organisation produit Mediaspot
> Version 1.0

---

## Vue d'ensemble du cycle de sprint

| Sprint (3 semaines) | Sem. 1 | Sem. 1 | Sem. 2 | Sem. 3 | Sem. 3 | Fin / Début |
|---|---|---|---|---|---|---|
| Jour | Lun | Mer | Mer | Mer | Jeu (J-2) | Lun suivant |
| Cérémonie | Sprint Planning | Refinement | Refinement | Refinement | Sprint Cleanup | Sprint Planning |
| Durée | 1h | - | - | - | 2 jours | 1h |

**Cérémonies clés :**

| Cérémonie | Fréquence | Jour | Durée | Animateur |
|-----------|-----------|------|-------|-----------|
| Sprint Planning | Début de sprint | Lundi | 1h | PO |
| Refinement | Hebdomadaire | Mercredi | - | PO |
| Sprint cleanup | Fin de sprint | J-2 (Jeudi) | 2 jours | Leads |

---

## Phase Cleanup — J-2 et J-1

### Objectif

Le code est gelé 4 jours avant la fin du sprint. Cette période est dédiée à :
- Finaliser toutes les PR en cours
- Nettoyer Jira
- Préparer le Sprint Planning

### Checklist par rôle

#### Développeurs
- [ ] Toutes mes PR sont soumises
- [ ] J'ai reviewé les PR qui m'ont été assignées
- [ ] Mes stories "In Progress" sont soit terminées, soit reportées (avec commentaire)

#### Leads (Tech/Back/Front)
- [ ] Toutes les PR de mon équipe sont reviewées
- [ ] Les PR approuvées sont mergées
- [ ] Les stories bloquées sont identifiées et commentées

#### PO
- [ ] Stories terminées validées et fermées en "Done"
- [ ] Backlog priorisé pour le prochain sprint 
- [ ] Restant du sprint arbitré (mis au Backlog ou mis au sprint prochain)
- [ ] Metrics du sprint préparées et mises au regard du précédent
- [ ] Objectif de sprint formulé
- [ ] Sprint complété sur JIRA

### État Jira attendu à la fin du Cleanup

| Ce qui doit être fait | Vérification |
|----------------------|--------------|
| Stories terminées | Statut = **Merged** |
| Stories non terminées | Statut = **To Do** + commentaire expliquant le report |
| PR en review | Toutes reviewées et mergées OU explicitement reportées |
| Bugs identifiés | Créés avec criticité (Blocker/Critical/Major/Minor) |
| Backlog prochain sprint | Priorisé, stories en **To Do** ou **To Refine** |

---

## Déroulé du Sprint Planning (1 heure)

### Participants obligatoires
- PO (animateur)
- Leads (Tech, Back, Front, QA, Ops)
- Développeurs

### Participants optionnels
- Directeur de projet
- Chefs de projet
- Airlab

---

### Minute par minute

#### 1. Ouverture et bilan du sprint précédent (10 min)

**Animateur : PO**

| Action | Détail |
|--------|--------|
| Accueil | Rappeler l'objectif de la réunion |
| Bilan | "Qu'avons-nous livré ?" — liste des stories Merged |
| Points positifs | Ce qui a bien fonctionné |
| Points d'attention | Ce qui a bloqué, stories reportées |

**Livrable :** Tout le monde a le même niveau d'information sur le sprint écoulé.

---

#### 2. Revue des métriques (5 min)

**Animateur : PO / Lead Tech**

Présenter les indicateurs clés :

| Métrique | Exemple |
|----------|---------|
| **Story points engagés** | 42 SP |
| **Story points livrés** | 38 SP |
| **Vélocité / taux de compéltaion** | 90% |
| **Ratio Features / Bugs** | 70% features, 30% bugs |
| **Bugs par criticité** | 2 Critical, 5 Major, 8 Minor |
| **Ratio Planned / Unplanned** | 33% planned, 77% unplanned |
| **Comparaison N-1** | En pourcentage |    

**Livrable :** Métriques documentées, visibles par tous.

---

#### 3. Présentation du backlog priorisé (15 min)

**Animateur : PO**

| Action | Détail |
|--------|--------|
| Objectif de sprint | Formuler en une phrase ce que le sprint doit accomplir |
| Stories prioritaires | Présenter les stories dans l'ordre de priorité |
| Contexte | Expliquer le "pourquoi" de chaque story |
| Bugs critiques | Présenter les bugs à traiter en priorité |

**Questions à poser à l'équipe :**
- "Y a-t-il des questions sur ces stories ?"
- "Des dépendances qu'on n'aurait pas identifiées ?"

**Livrable :** Backlog présenté et compris par tous.

---

#### 4. Engagement de l'équipe et capacité (20 min)

**Animateur : PO avec les Leads**

##### Étape 1 : Calculer la capacité (5 min)

| Rôle | Capacité | Ajustements |
|------|----------|-------------|
| Lead Back | X SP | -Y pour congés de Dev A |
| Lead Front | X SP | Formation prévue |
| Lead QA | OK | - |
| Lead Ops | X SP | Maintenance planifiée J+5 |

##### Étape 2 : Sélectionner les stories (10 min)

L'équipe sélectionne les stories jusqu'à atteindre la capacité :

```
Story 1 (8 SP) → Prise par équipe Back
Story 2 (5 SP) → Prise par équipe Front
Story 3 (3 SP) → Prise par équipe Back
Bug Critical #123 (2 SP) → Prise par équipe Back
...
Total engagé : 40 SP (capacité : 42 SP)
```

##### Étape 3 : Confirmation (5 min)

**Question du PO :** "L'équipe s'engage-t-elle sur ce scope ?"

- Chaque Lead confirme pour son équipe
- Les réserves sont exprimées maintenant

**Livrable :** Liste des stories engagées pour le sprint.

---

#### 5. Clôture et prochaines actions (10 min)

**Animateur : PO**

| Action | Détail |
|--------|--------|
| Récapitulatif | Objectif de sprint + nombre de SP engagés |
| Actions immédiates | Qui commence quoi ? |
| Questions ouvertes | Dernières clarifications |
| Prochains RDV | Rappeler le refinement de mercredi |

**Livrable :** Tout le monde sait par quoi commencer.

---

## Critères de sortie du Sprint Planning

À la fin du Sprint Planning, les conditions suivantes doivent être remplies :

### État Jira

| Critère | Attendu |
|---------|---------|
| Stories du sprint | Toutes en statut **To Do** |
| Bugs du sprint | Tous en statut **Planned** |
| Assignation | Chaque story assignée à une équipe (Back/Front) |
| Sprint Jira | Créé et activé avec les stories sélectionnées |

### Métriques documentées

| Métrique | Où ? |
|----------|------|
| SP engagés | Tickets |
| Objectif de sprint | Description du sprint Jira |
| Ratio bug/feature | Note de sprint ou Confluence |
| Criticité des bugs inclus | Chaque bug tagué dans Jira |

### Checklist de validation

- [ ] Objectif de sprint formulé et partagé
- [ ] Capacité équipe calculée et respectée
- [ ] Stories engagées = stories dans le sprint Jira
- [ ] Aucune story "In Progress" du sprint précédent (tout est Merged ou reporté)
- [ ] Bugs critiques adressés ou explicitement reportés avec justification
- [ ] Prochaine action identifiée pour chaque membre

---

## Récapitulatif des livrables

| Moment | Livrable | Responsable |
|--------|----------|-------------|
| Cleanup J-2 | Jira nettoyé, PR mergées | Leads |
| Cleanup J-1 | Métriques consolidées, backlog priorisé, stories N-1 reconduites migrées | PO |
| Sprint Planning | Sprint Jira objectivisé, créé et rempli | PO |
