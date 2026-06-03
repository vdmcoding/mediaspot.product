---
classification:
  projectType: brownfield
  domain: media_broadcast
  complexity: medium
  projectContext: brownfield
  scale:
    userTypes: [internal_qc_team, studiocanal_operators]
  integration:
    ffastrans: workflow_modification
    iris: erp_work_order
    role: consumer
  criticality: high
workflowType: prd
status: draft
client: Studiocanal
---

# PRD - Full QC PAD

**Auteur :** Jerome Gue  
**Date :** 2026-06-01  
**Client :** Studiocanal  
**Contrat :** Feature contractuelle — "Full QC des PAD"

---

## Contexte

Dans mediaspot/Digital Factory, **Studiocanal est un client de la plateforme** qui commande des **PAD (Prêt à Diffuser / Ready To Broadcast)** pour les livrer aux **broadcasters** (chaînes de télévision destinataires). La plateforme orchestre la fabrication et la livraison de ces fichiers.

### Flux de commande PAD actuel

1. **Basket** — L'utilisateur ajoute un ou plusieurs Titres au panier et sélectionne pour chacun un CONTENT et un BROADCASTER
2. **Configure Your Basket** — L'utilisateur configure les paramètres **de chaque item individuellement** (Picture Version, mix audio, etc.)
3. **Checkout** — Page de résumé de la commande complète avec des options globales :
   - *Play orders automatically* — Démarrer le traitement immédiatement
   - *Clear my basket* — Vider le panier après checkout
   - *Clear basket configurations* — Laisser les items sans vider leur configuration
   - *Enable order tracking with an e-mail link* — Recevoir un lien e-mail avec page de suivi pour les commandes avec plusieurs items

### Workflow de fabrication PAD type

Une fois la commande passée, un ensemble de **tasks** s'exécutent séquentiellement comme par exemple :

```
Restore files
  → Transcode files
    → R128 Loudness Correction
      → Encoder Muxer Transcoding
        → Deliver file through FileCopyAmberfin   ← livraison finale
```

---

## Problème à résoudre

Studiocanal souhaite pouvoir commander un **Full QC (contrôle qualité complet)** du fichier PAD fabriqué **avant sa livraison** à la chaîne, sur la base de tarifs négociés entre Studiocanal et VDM.

Aujourd'hui, il n'existe aucun mécanisme dans le workflow de fabrication PAD pour :
- Bloquer la livraison en attente d'une validation QC
- Déclencher automatiquement le circuit QC existant (copie fichier, BT IRIS, tâche QC)
- Gérer les différents résultats du QC et leurs conséquences sur la suite de la commande

---

## Feature

### Description contractuelle

> *"Full QC des PAD : Possibilité de commander un Full QC (Quality Check) du PAD lors de la commande du PAD (case à cocher) sur la base de tarifs actés entre STUDIOCANAL et VDM"*

### Description fonctionnelle

Ajout d'une **case à cocher** sur la page **Configure Your Basket**, au niveau de la configuration de **chaque item PAD individuellement** :

> ☐ **Order a Full QC before delivery**  
> *Check this option to request a quality control inspection before the file is delivered to the broadcaster. Applicable rates will apply.*

- La case est positionnée à l'étape de configuration par item, ce qui permet à l'utilisateur de choisir indépendamment pour chaque PAD de sa commande s'il souhaite un Full QC.
- La case est **visible et activable uniquement par les utilisateurs dont le groupe possède l'ACL `Allows Full QC Request`**. Cette ACL existe déjà dans la plateforme — aucune création nécessaire.
- Cette option est disponible pour **n'importe quel profil PAD**, sans restriction par broadcaster.
- Le Checkout affiche en lecture seule si le Full QC a été activé pour chaque item (résumé de commande).
- La case "Order a Full QC before delivery" fait partie intégrante de la configuration d'un item. Son intégration dans les **options de configuration existantes** est incluse dans le développement de la feature :
  - **Duplicate configuration** — duplique la configuration d'un item vers un nouvel item, Full QC inclus
  - **Apply configuration to all** — applique la configuration d'un item à tous les autres items du basket, Full QC inclus
- Lorsque cochée, les briques de workflow du type d'order **Quality Check** existant sont insérées dans le workflow de fabrication de cet item PAD, avant sa livraison finale.

---

## Order Quality Check — briques existantes réutilisées

La plateforme dispose déjà d'un type d'order **QUALITY CHECK** qui orchestre tout le circuit QC. Il gère nativement :
- La copie du fichier vers le bon storage du laboratoire
- Les notifications à l'équipe QC
- La création d'un **Bon de Travail (BT)** dans l'application tierce **IRIS** (planning + facturation hors mediaspot)

### Tasks de l'order Quality Check

| Task | Description |
|------|-------------|
| **File Native copy to outgoing storage** | **Copie** le fichier à contrôler vers le storage dédié du laboratoire QC. Le fichier original reste en place — aucun redéplacement nécessaire pour la livraison finale. |
| **ERP Work Order Push** | Crée le Bon de Travail dans IRIS (planning + facturation) |
| **QualityCheck of object** | Crée la tâche de workflow QC, met la commande en attente de décision |

Ces trois tasks sont insérées dans le workflow PAD **avant la livraison finale**, avec le paramètre `FULL` pour indiquer qu'il s'agit d'un Full QC sur l'**asset GENERATED** de la commande PAD (le fichier fabriqué automatiquement).

---

## User Journeys

### Scénario 1 — Commande PAD sans Full QC (comportement actuel inchangé)

1. L'utilisateur ajoute un ou plusieurs PADs au basket
2. Sur la page **Configure Your Basket**, il configure chaque item sans cocher "Order a Full QC before delivery"
3. Sur la page Checkout, le résumé n'indique pas de Full QC pour ces items
4. Chaque item s'exécute avec le workflow standard :
   `Restore → Transcode → Loudness → Mux → Deliver`

### Scénario 2 — Commande PAD avec Full QC activé (sur un ou plusieurs items)

1. L'utilisateur ajoute un ou plusieurs PADs au basket
2. Sur la page **Configure Your Basket**, il **coche** "Order a Full QC before delivery" sur le ou les items concernés — indépendamment pour chacun
3. Sur la page Checkout, le résumé indique pour chaque item si le Full QC est activé (lecture seule)
4. Pour chaque item avec Full QC coché, le workflow s'exécute jusqu'à la génération de l'asset final, puis les briques QC s'enchaînent :

```
Restore files
  → Transcode files
    → R128 Loudness Correction
      → Encoder Muxer Transcoding
        → [QC] File Native copy to outgoing storage   ← copie vers storage labo
          → [QC] ERP Work Order Push                  ← création BT dans IRIS
            → [QC] QualityCheck of object             ← tâche QC, mise en attente
              ↓ ACCEPTED       ↓ BYPASSED        ↓ REFUSED (→ FAILED)
           Deliver file      Deliver file        [END - no delivery]
```

#### Résultat ACCEPTED — QC validé
- L'utilisateur valide sur l'asset GENERATED que le fichier est **Accepted**
- La commande reprend son cours et le fichier est **livré automatiquement ou manuellement selon les modalités du profil** à la chaîne

#### Résultat BYPASSED — Refus ignoré par l'OWNER
- Le QC a refusé le fichier, mais l'**OWNER de la commande** (le client qui a passé la commande) considère que ce refus n'est pas valable et choisit de livrer le fichier tel quel
- L'asset passe en statut **Bypassed**
- La commande reprend son cours et le fichier est **livré automatiquement ou manuellement selon les modalités du profil** à la chaîne malgré le refus QC

#### Résultat REFUSED → FAILED — Refus définitif
- Le fichier reste refusé et la commande PAD passe en statut **FAILED**
- La suite est gérée comme habituellement pour les orders FAILED :
  - Soit le laboratoire prend en charge manuellement
  - Soit un bug ou problème de fabrication est identifié et la commande est relancée après correction

---

## Acteurs

| Acteur | Rôle |
|--------|------|
| **Serviceur Studiocanal** | Passe la commande PAD, coche l'option Full QC à l'étape de configuration de chaque item (Configure Your Basket). Doit avoir l'ACL `Allows Full QC Request` activée sur son groupe pour voir et utiliser cette option. En cas de refus QC, peut décider de Bypasser ou de laisser la commande en FAILED. |
| **Équipe QC / Laboratoire** | Effectue le contrôle qualité sur le fichier dans le storage dédié. Valide ou refuse via la tâche QualityCheck dans mediaspot. Planifié et facturé via IRIS. |
| **IRIS (ERP tiers)** | Reçoit le Bon de Travail via ERP Work Order Push. Gère le planning et la facturation des prestations Full QC hors mediaspot. |
| **Système mediaspot** | Orchestre le workflow, déclenche les briques QC avec le paramètre FULL sur l'asset GENERATED, gère les statuts et les transitions. |

---

## Exigences non-fonctionnelles

- **Conditionnalité** : Les tasks QC ne sont insérées dans le workflow d'un item PAD **que si la case a été cochée pour cet item** à l'étape Configure Your Basket. Les autres items de la même commande ne sont pas impactés.
- **Paramètre FULL** : L'order Quality Check doit être invoquée avec le paramètre `FULL` et cibler l'**asset GENERATED** de la commande PAD.
- **Réutilisation** : Les briques de l'order Quality Check existantes sont réutilisées telles quelles — aucune duplication de logique (storage, notifications, IRIS).
- **Traçabilité** : Le résultat du QC (Accepted / Bypassed / Failed) doit être visible dans le détail de la commande PAD.
- **Bypass** : Le Bypass est une action explicite réservée à l'**OWNER de la commande** (le client qui a passé la commande PAD).
- **Export Excel des orders** : L'information Full QC (activé / non activé) doit être présente dans l'export Excel des orders afin de permettre la réconciliation de facturation.
- **Order summary** : Lorsque le Full QC est activé sur un item PAD, la chaîne de caractères du résumé de la commande (order summary) doit inclure la mention `With Full QC`, afin de permettre l'identification rapide de ces orders dans le tableau de monitoring.

---

## Évolutions futures

- **Quote Proposal** : lorsque la feature Quote Proposal sera développée, les Full QC PAD devront y être ajoutés comme ligne de prestation facturée dans mediaspot, au même titre que les Full QC classiques. À intégrer à la spécification de Quote Proposal le moment venu.

---

## Hors scope

- Modification des paramètres de configuration PAD (Picture Version, audio) : inchangés
- Facturation du Full QC dans mediaspot : gérée hors mediaspot via IRIS (ERP Work Order Push)
- Notifications à l'équipe QC : déjà gérées par l'order Quality Check existante
- Création du Bon de Travail IRIS : déjà géré par la task ERP Work Order Push existante
- Gestion du délai / timeout QC : gérée hors mediaspot par le laboratoire via les BT et IRIS
- Automatisation du QC (analyse technique automatique) : le Full QC est **manuel**, effectué par le laboratoire
