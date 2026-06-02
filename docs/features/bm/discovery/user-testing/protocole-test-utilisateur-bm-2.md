# Protocole de Test Utilisateur - BundleMaker v2

## Informations Générales

| Élément          | Valeur                              |
| ---------------- | ----------------------------------- |
| **Date**         | [À compléter]                       |
| **Durée prévue** | 45-60 minutes                       |
| **Testeur**      | Gestionnaire de catalogue / Labo    |
| **Format**       | Walkthrough commenté                |
| **Facilitateur** | Ben                                 |

---

## Contexte

Ce test fait suite aux tests utilisateurs BMME v2 (métadonnées). BundleMaker v2 est l'outil de fabrication et livraison de packages VOD qui s'appuie sur BMME pour les métadonnées.

**Pain points identifiés en discovery (Fabrice & Alexis - Airlab):**
- 50% du temps perdu en travail humain sur les métadonnées localisées
- Difficulté à voir la hiérarchie globale des assets
- Manque de notion de "configuration globale" avec fallbacks
- Interface basket/produit à refondre

---

## Objectifs du Test

### Objectifs Principaux

1. **Valider la compréhension** du flow de création d'un BundleMaker Package
2. **Évaluer la clarté** de la hiérarchie Worldwide → Territories pour les assets
3. **Tester l'intuitivité** du système de fallback (Worldwide, 2.0, Request)
4. **Vérifier la lisibilité** des compteurs de configuration (3/5 components, 2/2 territories)
5. **Confirmer l'utilité** des warnings (Old platform, Incomplete package, Missing assets)
6. **Valider le workflow séries** (Episodes, configuration commune)

### Questions de Recherche

- L'utilisateur comprend-il immédiatement la notion de "Best possible configurations" ?
- Le concept de fallback (Worldwide → Territory) est-il clair sans explication ?
- La distinction entre composants obligatoires et optionnels est-elle évidente ?
- Les warnings sont-ils compris et actionnables ?
- Le workflow séries (episodes) est-il intuitif vs le workflow films ?

---

## Déroulé du Test (55 min)

### Phase 1 : Introduction (3 min)

**Script d'accueil :**

> « Merci d'avoir accepté de participer à ce test. Je vais te montrer des maquettes de la nouvelle interface BundleMaker v2 pour la création de packages de livraison VOD.
>
> Je te présenterai chaque écran et je te poserai des questions. Il n'y a pas de bonnes ou mauvaises réponses — c'est l'interface qu'on teste, pas toi. Si quelque chose te semble confus ou étrange, dis-le moi, c'est exactement ce qu'on cherche à identifier.
>
> Tu peux commenter à voix haute tout ce qui te passe par la tête. »

**Questions de contexte (30 sec) :**

- « Peux-tu me rappeler brièvement ton rôle avec BundleMaker actuel ? »
- « Combien de packages créés-tu en moyenne par semaine ? »

---

### Phase 2 : Configuration initiale - Sélection du produit (6 min)

**Écran : `Config/BundleMaker selected.jpg`**

**Présentation (1 min) :**

> « Voici l'écran de configuration d'une commande. Tu as ajouté "Blade Runner 2049" au panier et tu veux créer un package BundleMaker. »

**Questions d'exploration :**

| Question | Ce qu'on observe |
| -------- | ---------------- |
| « Qu'est-ce que tu vois sur cet écran ? Décris-moi ce que tu comprends. » | Compréhension générale de la structure |
| « Tu vois 6 types de produits à droite. À quoi correspond "BundleMaker Package" selon toi ? » | Compréhension du positionnement BM |
| « Tu vois "Platform to deliver" et "Territories to deliver". Que ferais-tu pour configurer une livraison Amazon France + Belgique ? » | Découvrabilité des sélecteurs |
| « Le compteur "7 ✓ 5 ⚠ 10 ?" en haut à gauche — qu'est-ce que ça représente pour toi ? » | Compréhension du statut des configurations |
| « Si tu voulais ajouter une autre configuration pour iTunes, comment ferais-tu ? » | Découvrabilité de "+ New config." |

1.
Platform to deliver 
Platform + territories comprehended

2.
Package sélectionné pas forcément compris
"Package" est trop large. "BundleMaker Metadata editor", Metadata Package ?

3.
Warning "missing" compris et utile
"Continue anyway" est utile. Mais il faut pouvoir aller jusqu'au transcodage ?
"Préparer les éléments en avance" 

4.
Error compris

5.
Warning old delivery peu utile. Process déjà en place chez SC

**Points d'attention :**

- L'utilisateur identifie-t-il spontanément la distinction Platform / Territories ?
- Le bouton "Configure" est-il compris comme l'étape suivante ?
- Les tags "Amazon", "HBO Pan Regional", "Apple iTunes" sont-ils compris comme des configurations existantes ?

### Phase 4 : Vue des composants à configurer (6 min)

**Écran : `Config/Pending configuration.jpg`**

**Présentation (30 sec) :**

> « Voici le récapitulatif de ta configuration BundleMaker. Tu vois les différents composants à configurer. »

**Questions d'exploration :**

| Question | Ce qu'on observe |
| -------- | ---------------- |
| « Tu vois "Bundle settings 3/3" et "Components 3/5". Qu'est-ce que ces compteurs t'indiquent ? » | Compréhension des compteurs de progression |
| « Dans la liste des composants, tu vois Feature, Trailer, Dub cards, Artworks, Metadata. Lesquels sont "Configuration required" vs "Configuration complete" ? » | Lecture des états de configuration |
| « Les icônes crayon et poubelle à côté de "Trailer" — à quoi servent-elles selon toi ? » | Découvrabilité des actions d'édition |
| « "Artworks" et "Metadata" affichent "2/2 territories". Qu'est-ce que ça signifie ? » | Compréhension du lien avec les territoires |

1. 
écran compris dans son ensemble

2.
Metadata & Artworks compris, remontés du package
Le vendor ID y est aussi. Rappel nécessaire ?

3.

4.

**Points d'attention :**

- La distinction "Configuration required" vs "Configuration complete" est-elle claire ?
- L'utilisateur comprend-il qu'il doit configurer Feature et Trailer ?

---

### Phase 5 : Configuration Preview - Best Possible Configurations (5 min)

**Écrans : `Content selection + config preview.jpg` (film) → `Content selection + config preview/Series/Common config.jpg` (série uniforme) → `Content selection + config preview/Series/Varying config.jpg` (série variable)**

**Présentation (30 sec) :**

> « Tu cliques sur "Feature" pour configurer la vidéo principale. Avant d'entrer dans le détail, le système te montre un aperçu de ce qui est disponible. »

**Questions d'exploration (Film - config preview) :**

| Question | Ce qu'on observe |
| -------- | ---------------- |
| « Qu'est-ce que tu vois sur cet écran ? Décris-moi ce que tu comprends. » | Compréhension globale du preview |
| « Tu vois "Quality to deliver: UHD" et "Compatible contents: Feature - Restored". À quoi servent ces sélecteurs ? » | Compréhension des filtres de qualité |
| « La section "Best possible configurations" montre Worldwide (UHD, 5.1+2.0), France (2.0), Belgium (2.0). Qu'est-ce que ça t'indique ? » | Lecture du résumé par territoire |
| « Pourquoi selon toi Worldwide a "UHD" mais France et Belgium ont seulement "2.0" ? » | Compréhension des différences de specs |
| « Le bouton "Configure this content" — que va-t-il se passer si tu cliques ? » | Anticipation de l'étape suivante |

1. 
Quality + Compatible contents ok
Best possible configurations: bien compris aussi "je ne sais pas si ça ne nous perturberait pas plus qu'autre chose" -> mieux compris une fois les informations bien expliquées. Mieux compris après la notion de progressive discovery

Single image pas vraiment compris: "pourquoi pas d'image localisée ?"

Label FWP bien compris
Full+SDH bien compris

2. 
Warning state: 
Error state: 

3. 
Variant série: compris aussi

4. Manque info sur les AD + audio M&E ?

**Questions d'exploration (Série - Common config) :**

| Question | Ce qu'on observe |
| -------- | ---------------- |
| « Tu vois "Best possible configurations - All episodes". Qu'est-ce que ça signifie ? » | Compréhension config uniforme |
| « Si tous les épisodes ont les mêmes specs disponibles, est-ce utile de le voir d'un coup d'œil ? » | Valeur perçue du résumé |

1.

2.

**Questions d'exploration (Série - Varying config) :**

| Question | Ce qu'on observe |
| -------- | ---------------- |
| « Maintenant tu vois "Episodes 1-12" avec UHD et "Episodes 13, 14" avec HD. Qu'est-ce que ça t'indique ? » | Compréhension config variable |
| « Les Episodes 13-14 ont "Full" au lieu de "Full Partial Sdh". Pourquoi cette différence selon toi ? » | Lecture des détails de specs |
| « Est-ce que cette vue te permet d'anticiper des problèmes avant de configurer ? » | Valeur du preview pour planification |

1.

2.

3.

**Points d'attention :**

- L'utilisateur comprend-il que c'est un **aperçu** avant la configuration détaillée ?
- La notion de "Best possible" est-elle rassurante (le système optimise) ou inquiétante (on ne contrôle pas) ?
- La distinction "All episodes" vs "Episodes 1-12 / 13-14" est-elle comprise ?
- Ce preview aide-t-il l'utilisateur à anticiper les problèmes ?

---

### Phase 6 : Sélection des contenus - Feature détaillée (6 min)

**Écrans : `Content selection/Selection valid.jpg` → `Fallback to worldwide.jpg` → `Missing assets.jpg`**

**Présentation (1 min) :**

> « Tu cliques sur "Feature" pour configurer la vidéo principale. Voici l'écran de sélection des assets par territoire. »

**Questions d'exploration (Selection valid) :**

| Question | Ce qu'on observe |
| -------- | ---------------- |
| « Qu'est-ce que tu vois sur cet écran ? Décris-moi la structure. » | Compréhension globale Worldwide → Territories |
| « À gauche tu vois "Worldwide", "France 2 ⚠", "Belgium 2 ⚠". Qu'est-ce que cette hiérarchie représente ? » | Compréhension de la hiérarchie territoriale |
| « Les icônes UHD, 5.1+2.0, AD, Full Partial Sdh — qu'est-ce qu'elles t'indiquent ? » | Compréhension des specs techniques |
| « Le message en bas "We've selected everything we could for the best possible delivery" — qu'est-ce que ça signifie ? » | Compréhension du "best effort" automatique |
| « Tu vois des checkmarks verts ✓ à côté de chaque asset. Qu'est-ce que ça indique ? » | Compréhension de la validation |

1. 
Vidéo: manque l'info "HDR" / "SDR" sur du UHD
Les dropdowns sont des sélections d'assets. Pas compris que c'est l'asset name.

2. 
Boutons suppression / ajouts compris
Récap par ligne compris (manque un séparateur sur l'audio)

3. 
Asset missing compris
Request: "pourquoi pas, pas très très utile"
"Dépend de ce qui a été dealé, négociation de livre le moins d'assets possibles"
Aujourd'hui: la commande n'est passée tant que l'asset est pas disponible. "Pas très opérationnel sur le bundlemaker"
"Si on est sûr que ça va se lancer, ça peut avoir du sens"
"risque de créer des doublons" -> status "asset pending ingest"

4. 
Textless feature ? 
"Option disregard textless"
Nouveau component à part entière. À creuser.
Même chose pour les dubbing cards / trailers (formats image/vidéo, clips as trailers)

**Questions d'exploration (Fallback to worldwide) :**

| Question | Ce qu'on observe |
| -------- | ---------------- |
| « Maintenant regarde France. Tu vois "Asset missing" avec "Fallback to 2.0" et "Request". Qu'est-ce que ces options signifient ? » | Compréhension du système de fallback |
| « Si tu cliques sur "Fallback to 2.0", que va-t-il se passer selon toi ? » | Anticipation du comportement |
| « La flèche "→ Worldwide" à côté de "Full" — qu'est-ce que ça indique ? » | Compréhension du fallback Worldwide |

1.

2.

3.

**Questions d'exploration (Missing assets) :**

| Question | Ce qu'on observe |
| -------- | ---------------- |
| « Sur cet écran, tu vois "Fallback to worldwide" comme option. Quelle est la différence avec "Fallback to 2.0" ? » | Distinction entre types de fallback |
| « Le bouton "Request" — à quoi sert-il selon toi ? » | Compréhension de la demande d'asset |

1.

2.

**Points d'attention :**

- Le concept de fallback cascade (Territory → Worldwide) est-il intuitif ?
- L'utilisateur comprend-il qu'il peut demander un asset manquant (Request) ?
- La sélection automatique "best effort" est-elle rassurante ou inquiétante ?

---

### Phase 7 : Sélection des Artworks (5 min)

**Écran : `Artwork selection/Selection valid.jpg`**

**Présentation (30 sec) :**

> « Maintenant tu configures les Artworks. Voici l'écran de sélection par territoire. »

**Questions d'exploration :**

| Question | Ce qu'on observe |
| -------- | ---------------- |
| « Tu vois "Worldwide 4 ✓", "France 1 ⚠ 2 ✓", "Belgium 1 ⚠ 2 ✓". Qu'est-ce que ces compteurs t'indiquent ? » | Compréhension des statuts par territoire |
| « Les specs "1000x400, 5:2" et "Min. resolution 750x1000, Aspect ratio 3:4" — est-ce le type d'information dont tu as besoin ? » | Pertinence des specs visuelles |
| « Le badge "Optional" sur "Hero" — qu'est-ce que ça signifie ? » | Compréhension des champs optionnels |
| « En bas tu vois "Package used: Amazon - 12 territories". Qu'est-ce que ça t'indique ? » | Lien avec le Package BMME |
| « Le bouton "+ Import from package" — à quoi sert-il selon toi ? » | Découvrabilité de l'import |

1.
Infos de métadonnées: 
Claires oui, suffisantes oui

2.
Error states:
Clair
Suite logique : edit my package.
Possibilité d'éditer son package depuis la modale de récap + mise à jour du package vers BMME ?

3.
Ajouter un autre artwork: pas compris "import from title artworks" instead
Uploader l'artwork manquant directement depuis cet écran

4.
Fallback to worldwide -> Pas très bien dans BM actuel
Pas intuitif. "Sur les artworks ça peut avoir plus de sens".


**Points d'attention :**

- La distinction obligatoire/optionnel est-elle claire ?
- Les specs artworks sont-elles lisibles et utiles ?
- L'utilisateur fait-il le lien avec le Package BMME ?

---

### Phase 8 : Warnings et cas limites (6 min)

**Écrans : `Config/Old platform warning.jpg` → `Config/Incomplete package.jpg` → `Content selection/Cas erreur.jpg`**

**Présentation (30 sec) :**

> « Maintenant je vais te montrer différents cas où le système affiche des alertes. »

**Questions d'exploration (Old platform warning) :**

| Question | Ce qu'on observe |
| -------- | ---------------- |
| « Tu vois un warning orange "Last delivery for this platform is old. This platform has not been delivered for 12 months." Qu'est-ce que ça t'évoque ? » | Compréhension du warning de fraîcheur |
| « Quelle action prendrais-tu suite à ce warning ? » | Actionnabilité du warning |

1.

2.

**Questions d'exploration (Incomplete package) :**

| Question | Ce qu'on observe |
| -------- | ---------------- |
| « Tu vois "Selected package is incomplete. You will not be able to proceed to checkout with missing artworks & metadata." Qu'est-ce que ça signifie ? » | Compréhension du blocage |
| « Tu as deux options : "Complete my package" et "Continue anyway". Laquelle choisirais-tu et pourquoi ? » | Compréhension du workflow de résolution |
| « Le badge "Missing metadata" à côté du Package — est-ce clair pourquoi le package est incomplet ? » | Lien avec BMME |

1.

2.

3.

**Questions d'exploration (Cas erreur - Content doesn't meet requirements) :**

| Question | Ce qu'on observe |
| -------- | ---------------- |
| « Tu vois "Content doesn't meet Amazon requirements. Amazon requires at least an HD video delivered." Qu'est-ce que ça signifie ? » | Compréhension de la validation provider |
| « Le bouton "Configure this content" est grisé. Pourquoi selon toi ? » | Compréhension du blocage |
| « Que ferais-tu pour résoudre ce problème ? » | Capacité à trouver une solution |

1.

2.

3.

**Points d'attention :**

- Les warnings sont-ils compris et actionnables ?
- L'utilisateur sait-il où aller pour résoudre les problèmes ?
- Le blocage est-il perçu comme utile ou frustrant ?

---

### Phase 9 : Workflow Séries (6 min)

**Écrans : `Config/Series.jpg` → `Content selection + config preview/Series/Common config.jpg` → `Episode/Selection valid.jpg`**

**Présentation (30 sec) :**

> « Maintenant on passe aux séries TV. Tu veux livrer Stranger Things Season 4 sur Amazon. »

**Questions d'exploration (Series config) :**

| Question | Ce qu'on observe |
| -------- | ---------------- |
| « Tu vois "Amazon - TV Series" comme Platform et "Episodes" au lieu de "Feature". Qu'est-ce qui change par rapport à un film ? » | Compréhension de la différence film/série |
| « "Episodes" affiche "Configuration required". Qu'est-ce que tu t'attends à configurer ? » | Anticipation du workflow épisodes |

1.

2.

**Questions d'exploration (Common config) :**

| Question | Ce qu'on observe |
| -------- | ---------------- |
| « Tu vois "Best possible configurations - All episodes" avec Worldwide, France, Belgium. Qu'est-ce que ça signifie ? » | Compréhension de la config commune |
| « Si tous les épisodes ont la même configuration, est-ce que ça te semble logique de la définir une seule fois ? » | Validation du concept |

1.

2.

**Questions d'exploration (Episodes) :**

| Question | Ce qu'on observe |
| -------- | ---------------- |
| « Tu vois la liste des épisodes à gauche (Episode 1 à 7) et la configuration détaillée de l'Episode 1 à droite. Comment naviguerais-tu ? » | Navigation entre épisodes |
| « Certains épisodes affichent "2 ⚠". Qu'est-ce que ça t'indique ? » | Compréhension des warnings par épisode |
| « Si tu voulais une configuration différente pour l'Episode 3, comment ferais-tu ? » | Capacité à overrider |

1.

2.

3.

**Points d'attention :**

- Le passage film → série est-il intuitif ?
- La configuration commune "All episodes" est-elle comprise ?
- L'utilisateur sait-il gérer les exceptions par épisode ?

---

### Phase 10 : Configuration complète et checkout (5 min)

**Écran : `Config/Done.jpg`**

**Présentation (30 sec) :**

> « Tu as terminé toutes les configurations. Voici l'écran final avant checkout. »

**Questions d'exploration :**

| Question | Ce qu'on observe |
| -------- | ---------------- |
| « Tu vois "Components 5/5" et tous les composants en "Configuration complete". Qu'est-ce que ça t'indique ? » | Confirmation de la complétion |
| « Le bouton "Proceed" en bas — que va-t-il se passer si tu cliques ? » | Anticipation du checkout |
| « Si tu devais revenir modifier le Trailer, comment ferais-tu ? » | Navigation retour |
| « Comparé à BundleMaker actuel, qu'est-ce qui te semble mieux ? Moins bien ? » | Benchmark avec l'existant |

1.

2.

3.

4.

**Points d'attention :**

- L'utilisateur est-il confiant que tout est correctement configuré ?
- Le passage au checkout est-il clair ?

---

### Phase 11 : Synthèse et Clôture (5 min)

**Questions de synthèse :**

| Question | Ce qu'on cherche |
| -------- | ---------------- |
| « De tous les écrans qu'on a vus, lequel t'a semblé le plus clair ? » | Points forts de l'interface |
| « Y a-t-il un écran ou un concept qui t'a semblé confus ? » | Points de friction majeurs |
| « Le système de fallback (Worldwide → Territory, 5.1 → 2.0) — est-ce utile ou complexe ? » | Validation du concept clé |
| « Les warnings et blocages — sont-ils rassurants ou frustrants ? » | Perception des garde-fous |
| « Par rapport à   actuel, qu'est-ce qui te semble mieux ? Moins bien ? » | Benchmark avec l'existant |
| « Si tu devais utiliser cet outil demain, qu'est-ce qui te manquerait ? » | Besoins non couverts |
| « Une note de 1 à 5 sur la clarté globale de l'interface ? » | Score de satisfaction |

1. Clearest: Toute la première partie

2. Best possible configuration + naming du "Package" en lieu et place de "Metadata & Artworks"

3. Mieux: voir directement les méta / artworks dispo. Moins bien: Bcp plus de clics / d'écrans au niveau de la configuration des Components. Paraît + complexe / chronophage

4. Rien ne manquerait 

5. 4/5 sur la clarté.

**Clôture :**

> « Merci beaucoup pour ce retour. Tes commentaires vont nous aider à améliorer l'interface avant le développement. As-tu des questions pour moi ? »

---

## Grille d'Observation

À remplir pendant le test :

### Réactions Spontanées

| Écran | Réaction positive | Réaction négative | Hésitation/Confusion |
| ----- | ----------------- | ----------------- | -------------------- |
| Config initiale | | | |
| Package selection | | | |
| Components view | | | |
| Config preview (Best possible) | | | |
| Content selection détaillée | | | |
| Fallback system | | | |
| Artwork selection | | | |
| Warnings | | | |
| Series workflow | | | |
| Done/Checkout | | | |

### Compréhension des Concepts Clés

| Concept | Compris immédiatement | Compris après explication | Non compris |
| ------- | --------------------- | ------------------------- | ----------- |
| Hiérarchie Worldwide → Territories | | | |
| Configuration Preview (aperçu avant détail) | | | |
| "Best possible configurations" par territoire | | | |
| Distinction "All episodes" vs "Episodes 1-12 / 13-14" | | | |
| Système de fallback (2.0, Worldwide) | | | |
| Compteurs de progression (3/5, 2/2) | | | |
| Distinction obligatoire/optionnel | | | |
| Lien Package BMME → BundleMaker | | | |
| Warning "Old platform" | | | |
| Warning "Incomplete package" | | | |
| Workflow séries vs films | | | |
| Bouton "Request" pour assets manquants | | | |

### Verbatims Clés

> « ... »

> « ... »

> « ... »

---

## Checklist Pré-Test

- [ ] Maquettes prêtes et accessibles (images du dossier `ui/`)
- [ ] Ordre de présentation défini (Config → Package → Components → Config Preview → Content détaillé → Artworks → Warnings → Series → Done)
- [ ] Grille d'observation imprimée ou ouverte
- [ ] Chronomètre prêt
- [ ] Environnement calme sans interruptions
- [ ] Enregistrement audio/vidéo (si autorisé)
- [ ] Boisson/café offert au testeur

---

## Livrables Post-Test

1. **Grille d'observation complétée**
2. **Liste des pain points identifiés** (priorisés par gravité)
3. **Recommandations UX** (quick wins vs refonte)
4. **Verbatims clés** pour partager avec l'équipe
5. **Comparaison avec les résultats BMME** (concepts partagés : hiérarchie, héritage, compteurs)

---

## Correspondance avec les Insights Discovery

| Écran testé | Insight Discovery (Fabrice/Alexis) | Validation attendue |
| ----------- | ---------------------------------- | ------------------- |
| Config Preview (Best possible) | "Difficulté à voir la hiérarchie globale des assets" | Vue d'ensemble avant détail appréciée |
| Config Preview (Varying config) | "Pas de notion de configuration globale" | Aperçu des différences entre épisodes clair |
| Content selection + Fallback | "Manque de notion de configuration globale avec fallbacks" | Système fallback intuitif |
| Warnings (Old platform) | "On est dans le flou jusqu'à ce que ça pète" | Warning proactif utile |
| Package selection (BMME) | "50% du temps perdu sur métadonnées" | Lien BMME → BM compris |
| Components view | "Interface basket/produit à refondre" | Compteurs et états clairs |
| Series workflow | "Séries télé non supportées" | Workflow séries intuitif |

---

## Notes pour le facilitateur

### Différences avec les tests BMME

- **BMME** testait la **saisie des métadonnées** (hiérarchie Title → Languages → Territories)
- **BM** teste la **sélection des assets** (hiérarchie Worldwide → Territories) et la **configuration de fabrication**

### Concepts partagés BMME / BM à valider

- Hiérarchie territoriale (même mental model ?)
- Compteurs de progression (cohérence UX ?)
- Badges de statut (Valid, Missing, Required)
- Lien Package BMME → BundleMaker (handoff compris ?)

### Points de vigilance spécifiques BM

- Le **Configuration Preview** (Best possible configurations) est une étape intermédiaire clé — valider qu'elle aide sans bloquer
- Le système de **fallback** est nouveau (pas d'équivalent BMME)
- La notion de **"best effort"** (sélection automatique) peut être rassurante ou inquiétante
- Les **warnings proactifs** (Old platform) répondent à un pain point discovery
- Le **workflow séries** avec distinction "All episodes" vs "Episodes 1-12 / 13-14" doit être clair
- La **Varying config** (épisodes avec specs différentes) est un cas complexe à valider

