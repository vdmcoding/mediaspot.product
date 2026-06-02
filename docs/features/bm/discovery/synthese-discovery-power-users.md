# Synthèse Discovery - Power Users BundleMaker v2

**Date:** 2026-05-06
**Participants:** Fabrice, Alexis (Power-users BM - Airlab)
**Interviewer:** Ben
**Durée:** ~90 minutes

---

## Executive Summary

### Constat principal

**BundleMaker est un outil partiellement abouti** qui automatise la fabrication des livrables (vidéos, artworks, parfois XML) mais souffre d'un workflow **non automatisé de bout en bout**. Les outputs sont approximatifs et nécessitent des reprises manuelles systématiques, notamment pour la gestion des métadonnées.

### Satisfaction actuelle

- **Fabrice:** 4/10 - "Enlève des épines, en rajoute d'autres"
- **Alexis:** < 5/10 - "Il manque trop de choses pour avoir la moyenne"

### Insight clé

> **"Au moins 50% du temps est perdu en travail humain, principalement sur la récupération et la vérification manuelle des métadonnées localisées"**

Le principal goulot d'étranglement n'est pas la fabrication des assets (globalement OK) mais la **gestion des métadonnées** - ce qui confirme la valeur stratégique de BMME v2 comme fondation pour BM v2.

---

## Profil des participants

### Fabrice
- Rôle: Power-user BundleMaker, technicien labo Airlab
- Ancienneté: Plusieurs années sur BM
- Expertise: Fabrication, packaging, livraison OTT
- Satisfaction: 4/10

### Alexis
- Rôle: Power-user BundleMaker, technicien labo Airlab
- Ancienneté: Plusieurs années sur BM
- Expertise: Configuration providers, specs, QC
- Satisfaction: < 5/10

---

## Top 3 Pain Points (par impact)

### 1. Gestion des métadonnées localisées (CRITIQUE)

**Impact:** 🔴 Majeur - 50% du temps de production perdu

**Problèmes identifiés:**
- Récupération manuelle des métadonnées et artworks localisés
- Vérification manuelle de la pertinence de la donnée
- **Artworks localisés qui perdent leur localisation** (bug récurrent)
- **Métadonnées manquantes dans le modèle de données de VDMC** (gaps structurels)
- Informations non saisies de la part de l'utilisateur (complétion partielle)

**Verbatim:**
> "Récupération de métadonnées et d'artworks localisés... vérification manuelle de la pertinence de la donnée (ex: avec les artworks localisés qui perdent leur localisation, ou informations non saisies de la part de l'utilisateur)"

**Implication pour BMME v2:**
✅ Valide l'hypothèse centrale du PRD: BMME v2 résout ce pain point en amont avec:
- Vue bulk de localisation (édition multi-langue/multi-territoire)
- Feedback temps réel (compteur de complétion)
- Validation des champs requis avant handoff vers BM
- Source tracking pour garantir la fraîcheur des données

---

### 2. Configuration complexe et peu intuitive (ÉLEVÉ)

**Impact:** 🟠 Élevé - Erreurs de configuration fréquentes

**Problèmes identifiés:**
- **Difficulté à sélectionner les assets et voir la hiérarchie globale**
- Pas de notion de configuration globale (Qualities + Territories)
- Manque une notion de "asset fallback" ligne à ligne
- **Interface basket/produit BundleMaker à refondre**
- Mapping des métadonnées "pas digeste"

**Verbatim:**
> "Refonte du produit dans le basket. Mapping des métadonnées digeste."

**Erreurs de configuration fréquentes:**
- Oubli d'assets ou suppression d'assets
- Pas de notion de "minimum syndical à livrer"
- Pas de gestion fine de ce qui est obligatoire ou non par territoire

**Implication pour BM v2:**
- Priorité #1: Refonte du produit dans le basket (UX ordering)
- Besoin d'une notion de "best effort" du bundler avec feedback clair
- Validation des assets manquants AVANT fabrication

---

### 3. Maintenance lourde des specs providers (ÉLEVÉ)

**Impact:** 🟠 Élevé - Risque d'erreur + charge de travail imprévisible

**Problèmes identifiés:**
- **Multiplication des fichiers XML par plateforme cliente** (ex: 1 XML Amazon × 3 profils × N clients)
- Aucun monitoring des changements de specs providers (découverte tardive quand "ça pète")
- Tests systématiques requis après chaque update
- Pas de push automatique des mises à jour de specs par les providers

**Verbatim:**
> "On est dans le flou jusqu'à ce que ça pète. Aucune option de monitoring possible."

> "Dernière version des specs envoyées par les clients, pas les plateformes. On est dans le flou jusqu'à ce que ça pète."

**Fréquence:**
- Aucun rythme particulier: "Rien pendant 6 mois puis 10 en 1 mois"
- Imprévisible et source de stress

**Implication pour BM v2:**
- **Split Fabrication / Livraison** dans les specs providers
  - Specs Fabrication: partagées cross-platform (comme prévu dans PRD BMME Journey 3)
  - Specs Livraison: platform-specific (login/password/path/naming rules changent par Client + Provider)
- Interface d'alerte: "Attention, la dernière commande date de X temps. Vérifiez la fraîcheur de vos spécifications"

---

## Top 5 Besoins Prioritaires

### 1. Centralisation de la gestion des profils (HAUTE)

**Besoin exprimé:**
- Centralisation de la gestion des profils avec **split Fabrication / Livraison**
- Configuration des identifiants de livraison côté admin plateforme (ProviderID, identifiants de livraison, etc.)
- "Certains paramètres de configuration des livraisons sont ultra-spécifiques et devraient être gérés côté plateforme admin"

**Lien avec PRD BMME:**
✅ Confirme l'architecture Journey 3 (Provider mapping cross-platform) MAIS révèle un besoin supplémentaire:
- **NEW:** Séparer les specs Fabrication (cross-platform) des specs Livraison (platform-specific)
- Les specs Livraison contiennent login/password/path/naming rules qui varient par client
- Bénéfice de sécurité également (credentials isolés)

**Priorité:** HAUTE - Fondation architecturale de BM v2

---

### 2. Refonte du produit dans le basket (HAUTE)

**Besoin exprimé:**
- Interface ordering plus intuitive
- Meilleure visibilité de la hiérarchie des assets
- Notion de configuration globale (Qualities + Territories) avec possibilité d'override
- Asset fallback ligne à ligne
- Notion de "best effort" avec feedbacks clairs

**Lien avec PRD BMME:**
⚠️ Hors scope BMME, mais dépend de BMME pour les métadonnées
- BMME fournit les métadonnées validées
- BM v2 doit refondre l'interface ordering pour exploiter ces métadonnées

**Priorité:** HAUTE - UX critique pour l'adoption

---

### 3. Mapping des métadonnées digeste (HAUTE)

**Besoin exprimé:**
- Interface visuelle pour update le mapping mediaspot → providers (pas MVP mais post-MVP)
- Centralisation du mapping entre tous les broadcasters: "Dans quelle mesure on pourrait avoir une interface unique partagée entre tous les broadcasters"
- Configurations éditoriales (formats particuliers, ordre des métadonnées, présence/absence de métadonnées) peuvent rester en XML

**Verbatim:**
> "On n'est pas développeurs. Pour telle plateforme j'ai besoin de telle telle telle métadonnée."

**Lien avec PRD BMME:**
✅ Valide Journey 3 (éditeur de specs providers centralisé)
✅ MAIS révèle que l'éditeur visuel n'est peut-être pas MVP - les fichiers XML de configuration peuvent rester pour les cas avancés

**Priorité:** HAUTE (architecture) / MOYENNE (interface visuelle post-MVP)

---

### 4. Feedbacks utilisateur (BMME + BM) (MOYENNE)

**Besoin exprimé:**
- Meilleurs feedbacks utilisateur sur l'état des commandes
- Monitoring post-transco (actuellement: plus de suivi après le transco)
- Notification du destinataire
- MàJ automatique du statut de l'order (actuellement manuel)

**Verbatim:**
> "Plus de suivi après le transco. MàJ manuelle du statut de l'order. Pas de notification du destinataire."

**Lien avec PRD BMME:**
✅ BMME fournit feedback temps réel pendant la préparation
⚠️ BM v2 doit fournir monitoring pendant fabrication/livraison

**Priorité:** MOYENNE - UX importante mais pas bloquante MVP

---

### 5. Cadrage du BundleMaking (MOYENNE)

**Besoin exprimé:**
- Validation des assets manquants AVANT fabrication
- Blocage conditionné: "si le meilleur asset possible existe, empêcher de faire moins bien"
- Gestion fine de ce qui est obligatoire ou non par territoire

**Verbatim:**
> "Le système bloque, et on veut garder ça. Blocage conditionné à certaines conditions: pas de 'qualité' inférieure."

**Lien avec PRD BMME:**
✅ BMME valide la complétion des métadonnées (état VALID)
⚠️ BM v2 doit valider la complétion des assets (complémentaire)

**Priorité:** MOYENNE - Qualité importante mais MVP peut démarrer sans

---

## Workflow actuel BundleMaker (tel que pratiqué)

### Étape 1: Ordering (Commande client)

**Qui:** Client (self-service) ou CC (Customer Care) selon les plateformes

**Process:**
1. Ajout d'un title au basket
2. Sélection du produit "BundleMaker"
3. Sélection de la plateforme de destination
   - Un profil spécifique pour chaque provider
   - Pas les mêmes éléments selon la plateforme
   - Défini par un XML provider qui définit le workflow du Bundle
4. Remplissage des infos nécessaires:
   - Vendor ID
   - Territoires à livrer
5. Sélection des components:
   - **Feature** (vidéo principale - une seule vidéo multi-territoire, dont dépendent les autres sélecteurs via OAR)
   - **Trailer** (bande-annonce)
   - **Artwork** (artworks)
   - **DubCard** (cartes de doublage)
6. Pour chaque territoire:
   - Une ligne Audio + Audio desc (optional) + subtitle Full et partial
   - Sélection de l'asset lié à chaque ligne
   - Possibilité de sortir une ligne de son territoire pour la passer en "Worldwide"
7. Checkout

**Pain points:**
- Difficulté à voir la hiérarchie globale des assets
- Manque une notion de configuration globale (Qualities + Territories)
- Pas de "asset fallback" ligne à ligne
- Erreurs de configuration fréquentes (oubli d'assets, suppression accidentelle)

---

### Étape 2: Fabrication (Automatisée)

**Process automatisé:**
1. Désarchivage
2. Transcode
3. Mise en conformité des assets alternatifs (framerate, durée de l'image de ref, etc.)
4. Génération dans un dossier Qumulo

**Monitoring:**
- Page des Orders dans l'interface BM

**Statut:**
✅ Globalement OK (fabrication d'assets fonctionnelle)
⚠️ Problème: specs marquées des plateformes (ex: Amazon qui demande des assets à l'image près) → Réglé à l'ingest pour éviter des ingests foireux

---

### Étape 3: Packaging (MANUEL)

**Qui:** Techniciens labo VDM (Fabrice, Alexis)

**Process:**
- Packaging humain dans Qumulo
- Vérification manuelle de la conformité des outputs
- Reprise manuelle des métadonnées incorrectes ou manquantes

**Durée:**
- Packaging simple: 48h de bout en bout (dont au moins 50% en travail humain)

**Pain points:**
- Outputs approximatifs nécessitant reprises manuelles
- Métadonnées localisées à récupérer/vérifier manuellement

---

### Étape 4: Livraison (MANUEL)

**Process parallèle:**
- BT (Bon de Travail) dans IRIS
- Livraison humaine par VDM

**Suivi post-livraison:**
- **Plus de suivi après le transco**
- MàJ manuelle du statut de l'order
- Pas de notification du destinataire
- Pas toujours de retour des plateformes: "Pas de nouvelles, bonne nouvelle"

**En cas de rejet:**
- Envoi d'un email au client si rejeté
- Souvent dû à une erreur de configuration ou une erreur de transcodage (erreur humaine de saisie ou technique de fabrication)

---

## Validation des hypothèses du PRD BMME

| Hypothèse | Statut | Insights |
|-----------|--------|----------|
| **Les métadonnées sont ressaisies plusieurs fois entre VDMC et BM** | ✅ **VALIDÉ** | "Récupération manuelle des métadonnées et artworks localisés... vérification manuelle de la pertinence de la donnée" - Pain point #1 critique |
| **Le workflow actuel est ultra-permissif (pas de blocage)** | ⚠️ **NUANCÉ** | Blocages existent MAIS conditionnés (ex: "pas de qualité inférieure si meilleur asset existe"). Utilisateurs VEULENT garder des blocages. Besoin de flexibilité pour deals particuliers. |
| **Les specs providers platform-specific sont un problème de maintenance** | ✅ **VALIDÉ** | "1 XML Amazon × 3 profils × N clients" - Multiplication des fichiers. "On est dans le flou jusqu'à ce que ça pète" - Aucun monitoring des changements de specs. |
| **Le taux d'erreur à la livraison pourrait être réduit par validation en amont** | ✅ **VALIDÉ** | Rejets souvent dus à "erreur de configuration ou erreur de transcodage (erreur humaine de saisie)". Validation en amont (BMME) + meilleur cadrage (BM) réduiront les erreurs. |
| **L'automatisation complète est souhaitée par les utilisateurs** | ✅ **VALIDÉ** | "Si on a BMME + BM, on peut tout faire (sauf la partie Livraisons sur les Providers qui ne le permettent pas, dans ce cas là on reste en manuel UNIQUEMENT sur la livraison)" |
| **Le QC humain reste nécessaire sur certaines étapes** | ✅ **VALIDÉ** | QC humain requis sur packaging + livraisons manuelles pour certains providers. Automatisation complète possible UNIQUEMENT si providers le permettent (API de livraison). |

---

## Insights clés & Surprises

### Insight #1: Split Fabrication / Livraison (NOUVEAU)

**Découverte inattendue:**
Les specs providers doivent être **séparées en deux couches distinctes**:

1. **Specs Fabrication** (cross-platform, partagées):
   - Formats vidéo/audio
   - Résolutions, framerates, codecs
   - Specs techniques des assets
   - **Maintenues par le Labo VDM** (comme prévu dans PRD BMME Journey 3)

2. **Specs Livraison** (platform-specific, par client):
   - Login / password
   - Path de livraison
   - Naming rules
   - ProviderID, identifiants de livraison
   - **Configurées côté admin plateforme cliente** (pas par le labo)

**Implication:**
⚠️ Le PRD BMME Journey 3 couvre les specs Fabrication (cross-platform).
🆕 BM v2 doit gérer les specs Livraison (platform-specific) - hors scope BMME.

**Bénéfices:**
- Sécurité: credentials isolés par plateforme cliente
- Scalabilité: labo ne maintient pas N × M configurations de livraison
- Autonomie: clients peuvent configurer leurs propres credentials sans intervention labo

---

### Insight #2: Mapping Liquid (M7 broadcaster)

**Découverte:**
M7 utilise déjà un **profil XML "métadonnées" géré par du code Liquid** (cf Broadcasters > Liquid Export).

**Verbatim:**
> "Ça ne devrait pas être à Airlab de s'occuper du XML de métadonnées."

**Implication:**
- Existe déjà un système de templating pour les métadonnées (Liquid)
- Interface visuelle pour le mapping mediaspot → providers **pas MVP** (peut rester en XML/Liquid pour les cas avancés)
- Post-MVP: interface visuelle pour simplifier les cas courants

**Action:**
🔍 **Interview Jérôme pour la partie Mapping Liquid** (mentionné en fin d'interview)
🔍 **Interview Yan sur PackageEditor** pour comprendre le phasage du mapping des métadonnées

---

### Insight #3: Providers qui ne permettent pas la livraison automatique

**Découverte:**
Certains providers n'ont pas d'API de livraison automatique.

**Verbatim:**
> "Si on a BMME + BM, on peut tout faire (sauf la partie Livraisons sur les Providers qui ne le permettent pas, dans ce cas là on reste en manuel UNIQUEMENT sur la livraison)"

**Implication:**
- Automatisation complète possible UNIQUEMENT si le provider le permet
- BM v2 doit supporter un mode "fabrication automatique + livraison manuelle" pour ces cas
- Pas un bloquant MVP (certains providers supportent déjà l'automatisation, ex: StudioCanal)

---

### Insight #4: Monitoring des specs providers inexistant

**Découverte alarmante:**
Aucun monitoring proactif des changements de specs providers.

**Verbatim:**
> "Dernière version des specs envoyées par les clients, pas les plateformes. On est dans le flou jusqu'à ce que ça pète."

**Implication:**
- Les clients mediaspot reçoivent les specs providers (car ils sont en contact direct)
- VDM/Airlab ne reçoit PAS de push des providers
- Découverte tardive des changements (quand une livraison échoue)

**Besoin identifié:**
Interface d'alerte dans BM v2:
> "Attention, la dernière commande [Provider X] date de [X mois]. Vérifiez la fraîcheur de vos spécifications."

**Action post-MVP:**
- Webhook/monitoring automatique des specs providers (si APIs disponibles)
- Sinon: alertes basées sur la dernière commande réussie

---

### Insight #5: Problématique des séries télé non supportées

**Découverte:**
**Séries télé non supportées** par BundleMaker actuel.

**Implication:**
⚠️ Scope BM v2 doit clarifier le support des séries TV (vs films uniquement)
- Si séries supportées: complexité accrue (gestion saisons/épisodes)
- Si séries hors scope MVP: communiquer clairement la roadmap

**Verbatim:**
> "Séries télé non supportées"

---

## Implications pour le PRD BMME

### ✅ Validations

1. **Héritage intelligent Title → Packages** résout le pain point #1 (récupération manuelle des métadonnées localisées)
2. **Feedback temps réel + compteur de complétion** répondent au besoin de "meilleurs feedbacks utilisateur"
3. **Provider mapping cross-platform** (Journey 3) résout la maintenance lourde des specs Fabrication
4. **État VALID/INVALID** pour handoff vers BM garantit la qualité en amont

### ⚠️ Ajustements recommandés

1. **Split Fabrication / Livraison:**
   - BMME Journey 3 couvre les specs **Fabrication** (cross-platform) ✅
   - BM v2 (hors scope BMME) doit gérer les specs **Livraison** (platform-specific) 🆕

2. **Interface visuelle mapping:**
   - Pas MVP (peut rester en XML/Liquid pour les cas avancés)
   - Post-MVP: interface simplifiée pour les cas courants

3. **Monitoring des specs providers:**
   - Ajouter une alerte basée sur la dernière commande réussie (BM v2, pas BMME)

### 🆕 Nouveaux besoins identifiés

1. **Asset fallback ligne à ligne** (BM v2)
2. **Configuration globale Qualities + Territories** (BM v2)
3. **Notion de "best effort" avec feedback clair** (BM v2)
4. **Support séries TV** (à clarifier scope BM v2)

---

## Recommandations pour BM v2

### Priorités MVP

#### P0 - Bloquant MVP
1. **Split Fabrication / Livraison dans les specs providers**
   - Architecture fondamentale
   - Sécurité + scalabilité
2. **Refonte du produit dans le basket (UX ordering)**
   - UX critique pour l'adoption
   - Visibilité hiérarchie assets
3. **Mapping des métadonnées digeste**
   - Centralisation cross-plateformes
   - Peut rester en XML/Liquid pour MVP (interface visuelle post-MVP)

#### P1 - Important MVP
4. **Validation des assets manquants avant fabrication**
   - Réduction des erreurs
   - Blocages conditionnels ("si meilleur asset existe, empêcher moins bien")
5. **Feedbacks utilisateur (état des commandes)**
   - Monitoring post-transco
   - MàJ automatique du statut

#### P2 - Post-MVP
6. **Interface visuelle pour mapping mediaspot → providers**
7. **Monitoring proactif des specs providers**
8. **Support séries TV** (si hors scope MVP, clarifier roadmap)

---

## Prochaines étapes recommandées

### Interviews complémentaires

1. **🔍 Jérôme - Mapping Liquid**
   - Comprendre le système Liquid existant (M7 broadcaster)
   - Évaluer la réutilisabilité pour BM v2
   - Identifier les limites du système actuel

2. **🔍 Yan - PackageEditor**
   - Comprendre le phasage du mapping des métadonnées
   - Identifier les cas limites non documentés
   - Cartographier les specs providers actuelles (quels champs? quels formats?)

### Documentation à produire

1. **Cartographie des specs providers actuelles**
   - Quels providers? Quels profils?
   - Mapping détaillé des champs mediaspot → providers
   - Identification des gaps VDMC → specs providers

2. **Matrice Fabrication / Livraison**
   - Pour chaque provider: séparer specs Fab vs Livraison
   - Identifier les specs platform-specific vs cross-platform

3. **User flows BM v2**
   - Ordering (avec nouvelle UX basket)
   - Fabrication + Packaging (avec handoff BMME)
   - Livraison (automatique vs manuelle selon provider)

---

## Annexe: Verbatims clés

### Sur l'état actuel de BundleMaker

> "BM est très peu utilisé aujourd'hui, ça passe par des Excels et des Notepads" - Fabrice

> "BundleMaker est un outil partiellement abouti. Outputs approximatifs à compléter et reprendre à la main." - Fabrice

> "4 seulement, enlève des épines, en rajoute d'autres" - Fabrice (satisfaction)

> "Il manque trop de choses pour avoir la moyenne" - Alexis (satisfaction)

### Sur les pain points

> "Récupération de métadonnées et d'artworks localisés... vérification manuelle de la pertinence de la donnée (ex: avec les artworks localisés qui perdent leur localisation, ou informations non saisies de la part de l'utilisateur)"

> "Au moins 50% du temps perdu en travail humain"

> "On est dans le flou jusqu'à ce que ça pète. Aucune option de monitoring possible."

### Sur les specs providers

> "1 XML Amazon × 3 profils × N clients"

> "Dernière version des specs envoyées par les clients, pas les plateformes. On est dans le flou jusqu'à ce que ça pète."

> "Aucun rythme particulier. Rien pendant 6 mois puis 10 en 1 mois"

### Sur la configuration

> "Difficulté à sélectionner les assets et à voir la hiérarchie globale"

> "Le système bloque, et on veut garder ça. Blocage conditionné à certaines conditions: pas de 'qualité' inférieure."

### Sur la vision BM v2

> "Si on a BMME + BM, on peut tout faire (sauf la partie Livraisons sur les Providers qui ne le permettent pas, dans ce cas là on reste en manuel UNIQUEMENT sur la livraison)"

> "Refonte du produit dans le basket. Mapping des métadonnées digeste. Centralisation de la gestion des profils (+ split Fabrication / Livraison)"

> "On n'est pas développeurs. Pour telle plateforme j'ai besoin de telle telle telle métadonnée."

> "Dans quelle mesure on pourrait avoir une interface unique partagée entre tous les broadcasters"

---

## Conclusion

Cette discovery confirme la **valeur stratégique de BMME v2 comme fondation pour BM v2**. Le pain point #1 (gestion manuelle des métadonnées localisées, 50% du temps perdu) est directement adressé par BMME.

### Insight majeur

Le **split Fabrication / Livraison** dans les specs providers est une découverte architecturale clé qui impacte la répartition BMME / BM:
- **BMME v2:** Specs Fabrication cross-platform (Journey 3 validé)
- **BM v2:** Specs Livraison platform-specific (nouveau scope)

### Prochaines actions

1. ✅ Valider le PRD BMME (pas de changements majeurs requis)
2. 🔍 Interviews Jérôme (Liquid) + Yan (PackageEditor)
3. 📝 Documenter la matrice Fabrication / Livraison
4. 🎨 Designer les user flows BM v2 (ordering, fabrication, livraison)

---

**Fin de la synthèse**
