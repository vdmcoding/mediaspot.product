# Protocole de Test Utilisateur - BMME v2

## Informations Générales


| Élément          | Valeur                    |
| ---------------- | ------------------------- |
| **Date**         | [À compléter]             |
| **Durée prévue** | 30-45 minutes             |
| **Testeur**      | Gestionnaire de catalogue |
| **Format**       | Walkthrough commenté      |
| **Facilitateur** | Ben                       |


---

## Objectifs du Test

### Objectifs Principaux

1. **Valider la compréhension** de la hiérarchie Title → Languages → Territories
2. **Évaluer la clarté** du système d'héritage et des badges de source
3. **Tester l'intuitivité** de la vue Bulk Localize
4. **Vérifier la lisibilité** du compteur de complétion des Packages
5. **Confirmer l'utilité** de la vue multi-source et historique

### Questions de Recherche

- L'utilisateur comprend-il immédiatement où il se situe dans la hiérarchie ?
- Le concept d'héritage (Inherited) est-il clair sans explication ?
- La distinction entre Title Metadata et Package Metadata est-elle évidente ?
- Les badges de source (Unity, mediaspot, Inherited) sont-ils compris ?

---

## Déroulé du Test (35 min)

### Phase 1 : Introduction (3 min)

**Script d'accueil :**

> « Merci d'avoir accepté de participer à ce test. Je vais te montrer des maquettes de la nouvelle interface BMME v2 qui remplacera VDM Connect pour la gestion des métadonnées.
>
> Je te présenterai chaque écran et je te poserai des questions. Il n'y a pas de bonnes ou mauvaises réponses — c'est l'interface qu'on teste, pas toi. Si quelque chose te semble confus ou étrange, dis-le moi, c'est exactement ce qu'on cherche à identifier.
>
> Tu peux commenter à voix haute tout ce qui te passe par la tête. »

**Questions de contexte (30 sec) :**

- « Peux-tu me rappeler brièvement ton rôle au quotidien avec VDM Connect ? »
- « Combien de Titles gères-tu en moyenne par semaine ? »

---

### Phase 2 : Title Metadata - Vue Globale (6 min)

**Écran : `BMME/Title/Global.png`**

**Présentation (1 min) :**

> « Voici la fiche d'un Title — Stranger Things Season 4. On est sur la vue des métadonnées globales. »

**Questions d'exploration :**


| Question                                                                                                                 | Ce qu'on observe                                       |
| ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| « Qu'est-ce que tu vois sur cet écran ? Décris-moi ce que tu comprends. »                                                | Compréhension générale de la structure                 |
| « À ton avis, que signifie le "120/120" qu'on voit à plusieurs endroits ? »                                              | Compréhension du compteur de complétion                |
| « Tu vois le badge "Unity" à côté de certains champs. Qu'est-ce que ça t'évoque ? »                                      | Compréhension du source tracking                       |
| « Dans le panneau de gauche, tu vois English > United Kingdom, United States... Qu'est-ce que ça représente pour toi ? » | Compréhension de la hiérarchie Languages → Territories |
| « Si tu voulais ajouter les métadonnées en allemand, comment ferais-tu ? »                                               | Découvrabilité de "+ New language"                      |

1.
Fiches territoires toutes ensemble, 
Keywords : mots-clés plutôt que genres (ex: Années 80, etc.)

2.
Pas d'idée sur le 120/120 -> après explication, compris mais "pas hyper intuitif"
Champs obligatoires et facultatifs  > infos sur les 2 + feedback utilisateur

3. 
Métadonnées par territoires pas claire
La hiérarchie langues / territoires n'est pas comprise, hiérarchie de l'information pas claire sur l'héritage + l'expand

4. 
New language

5.
Infos héritées de Unity


**Points d'attention :**

- L'utilisateur identifie-t-il spontanément la hiérarchie ?
- Le compteur 120/120 est-il compris comme "complet" ?
- Le badge Unity est-il associé à "source de la donnée" ?

---

### Phase 3 : Ajout d'une Langue et Territoires (6 min)

**Écrans : `BMME/Title/Add language.png` → `Add language-1.png` → `Add language-2.png`**

**Présentation (1 min) :**

> « Maintenant je te montre la vue quand on est sur une langue spécifique — ici le Portugais. Tu vois qu'on peut ajouter des territoires dessous. »

**Questions d'exploration :**


| Question                                                                                                                                                 | Ce qu'on observe                       |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| « Le compteur affiche 60/120. Qu'est-ce que ça signifie pour toi ? »                                                                                     | Compréhension de l'incomplétude        |
| « Tu vois les boutons "Copy from" et "Copy to" en haut à droite. À quoi ils serviraient selon toi ? »                                                    | Intuition sur les fonctions de copie   |
| « Dans la section Synopsis, tu vois "Long", "Short", "Shorter" avec des indications comme "< 2000 chars (Amazon, Google)". Qu'est-ce que ça t'évoque ? » | Compréhension des contraintes provider |
| « Si tu devais ajouter le Brésil comme territoire sous Portugais, comment ferais-tu ? »                                                                  | Découvrabilité de "+ New territory"    |
| « Le compteur passe de 60/120 à 61/120 quand on remplit le titre. Est-ce que ce feedback te semble utile ? »                                             | Valeur perçue du feedback temps réel   |

1. 
Plus clair après l'explication 

2.
L'héritage entre portuguese et brésilien n'est pas clair
Copy from | Copy to : exporter, importer "ça peut servir"

3. 
Contraintes provider comprises
Validation des fields
Fields mandatory: attention aux requirements plateformes

/!\ Episodes
Nécessité de définir des champs spécifiques épisode ("encore à définir")
À vérifier avec l'équipe allemande. Pas supporté aujourd'hui par VDMC

**Points d'attention :**

- La distinction Langue / Territoire est-elle claire ?
- Les contraintes de caractères par provider sont-elles comprises ?
- Le feedback du compteur temps réel est-il valorisé ?

---

### Phase 4 : Bulk Localize (5 min)

**Écran : `Bulk Localize Drawer.png`**

**Présentation (30 sec) :**

> « Imagine que tu doives traduire le titre "Original Title" pour toutes les langues et territoires. Voici la vue qu'on te propose. »

**Questions d'exploration :**


| Question                                                                                                     | Ce qu'on observe                        |
| ------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| « Qu'est-ce que tu comprends de cet écran ? »                                                                | Compréhension globale du concept bulk   |
| « Tu vois "Inherited" à côté de France, Quebec, Belgium, Switzerland. Qu'est-ce que ça signifie pour toi ? » | Compréhension du concept d'héritage     |
| « Si tu voulais mettre un titre différent pour le Quebec, comment ferais-tu ? »                              | Capacité à overrider une valeur héritée |
| « Le toggle "Hide completes" en haut à droite — à quoi il servirait ? »                                      | Compréhension du filtrage               |
| « 12/15 est affiché. Qu'est-ce que ça représente ? »                                                         | Lien avec le compteur global            |

1. 
Bien compris. Wording "bulk localize" manque de clarté. Confondu avec le nom du territoire.
Questions sur la validation

2.
Bien compris
Pareil pour l'override

3. 
Bien compris

4.
Fonctionnalité très intéressante


**Points d'attention :**

- Le concept d'héritage cascade (Langue → Territoires) est-il intuitif ?
- L'utilisateur comprend-il qu'il peut overrider par territoire ?
- Le "Save all" est-il rassurant ou inquiétant ?

---

### Phase 5 : Packages - Shared Metadata (5 min)

**Écran : `BMME/Packages/Shared.png`**

**Présentation (30 sec) :**

> « Maintenant on passe aux Packages. Voici la vue des "Shared Metadata" — les métadonnées partagées entre tous les packages d'un Title. »

**Questions d'exploration :**

| Question                                                                                                                                     | Ce qu'on observe                        |
| -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| « Qu'est-ce que tu comprends par "Shared metadata" ? »                                                                                       | Compréhension du concept                |
| « Tu vois la liste des plateformes à gauche (Amazon, iTunes, Google). Qu'est-ce que cette structure t'évoque ? »                             | Compréhension de la hiérarchie Packages |
| « Dans la section Artworks, tu vois des spécifications comme "1920x1080, 16:9". Est-ce que c'est le type d'information dont tu as besoin ? » | Pertinence des specs visuelles          |
| « Le compteur affiche 69/120. Si tu devais atteindre 120/120, saurais-tu quoi compléter ? »                                                  | Visibilité des champs manquants         |

1.
Shared metadata: métadonnées communes à toutes les plateformes
Concept peu clair > helper text plus visible, tooltips

2.
Ratings: pas une notion shared, territories only
VOD dates: nécessité de vérifier les métadonnées nécessaires

3. 
New package comme "new language / new territory"


**Points d'attention :**

- La notion de "partagé entre packages" est-elle claire ?
- Les specs artworks sont-elles lisibles et utiles ?
- L'utilisateur fait-il le lien avec les packages individuels ?

---

### Phase 6 : Package Individuel (5 min)

**Écrans : `BMME/Packages/Single.png` et `Partial.png`**

**Présentation (30 sec) :**

> « Voici un package Amazon pour ce Title. Tu vois l'état "Partial" et le compteur 90/120. »

**Questions d'exploration :**

| Question                                                                                             | Ce qu'on observe                      |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------- |
| « Qu'est-ce que "Partial" signifie pour toi ? »                                                      | Compréhension des états de package    |
| « Tu vois "Inherited" à côté de beaucoup de champs. D'où viennent ces valeurs selon toi ? »          | Lien Title Metadata → Package         |
| « Si tu voulais changer la valeur du "Vendor ID" juste pour ce package Amazon, comment ferais-tu ? » | Capacité à overrider dans un package  |
| « En bas, tu vois "Create a package". À quel moment utiliserais-tu ce bouton ? »                     | Compréhension du workflow de création |
| « Si le package était à 120/120, que se passerait-il selon toi ? »                                   | Anticipation de l'état "VALID"        |



1.
Création de plateforme : Platform / Territories compris, pas le "Name", SKU à remplir à la place. Champ éditable ?

2.
État du package compris

3.
Champs obligatoires et non obligatoires à distinguer
Enmpêche de comprendre l'état valid

4.
Inherited = champs renseignés auparavant (shared metadata). Héritage des titles compris 
Hiérarchie title / 

5.
Cas max des Vendor ID uniques vs multiples. 
Nécessité de conserver les "vieux ID" multiples 

**Points d'attention :**

- La cascade Title → Shared → Package est-elle comprise ?
- L'utilisateur sait-il distinguer ce qui est hérité vs surchargé ?
- Le passage Draft → Valid est-il anticipé ?

---

### Phase 7 : Source Tracking et Historique (5 min)

**Écran : `Sync details.png`**

**Présentation (30 sec) :**

> « Dernier écran : quand tu cliques sur un champ, tu peux voir d'où vient la donnée et son historique. Voici le détail pour le champ "Original title" en Portugais. »

**Questions d'exploration :**


| Question                                                                                                            | Ce qu'on observe                       |
| ------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| « Qu'est-ce que tu comprends de la section "All values" en haut ? »                                                 | Compréhension multi-source             |
| « Tu vois que Unity, mediaspot, IMDb ont des valeurs légèrement différentes. Laquelle est utilisée actuellement ? » | Lecture de la sélection active         |
| « Si tu voulais utiliser la valeur IMDb à la place, comment ferais-tu ? »                                           | Découvrabilité du changement de source |
| « La section "History" en bas — à quoi ça te servirait dans ton travail quotidien ? »                               | Valeur perçue de l'historique          |
| « Tu vois "John Doe" comme auteur d'un changement. Est-ce utile de savoir qui a modifié ? »                         | Importance de l'audit trail            |


1.
Redirection vers la page du titre "Unity / mediaspot / IMDb"

2.
État de la checkbox: pas compris sur la notion d'active Source
Action de la checkbox comprise + impact sur le champ de métadonnée comprise

3.
History: "info des changements de valeur" 
Badges d'action: 
Edit compris 
Source change long à la compréhension, pas assez compréhensible. Manque aussi le nom de l'utilisateur sur le source change


**Points d'attention :**

- La coexistence de plusieurs sources est-elle claire ?
- L'historique des changements est-il valorisé ?
- Le différentiel Old → New est-il lisible ?

---

### Phase 8 : Synthèse et Clôture (5 min)

**Questions de synthèse :**


| Question                                                                    | Ce qu'on cherche            |
| --------------------------------------------------------------------------- | --------------------------- |
| « De tous les écrans qu'on a vus, lequel t'a semblé le plus clair ? »       | Points forts de l'interface |
| « Y a-t-il un écran ou un concept qui t'a semblé confus ? »                 | Points de friction majeurs  |
| « Par rapport à VDM Connect, qu'est-ce qui te semble mieux ? Moins bien ? » | Benchmark avec l'existant   |
| « Si tu devais utiliser cet outil demain, qu'est-ce qui te manquerait ? »   | Besoins non couverts        |
| « Une note de 1 à 5 sur la clarté globale de l'interface ? »                | Score de satisfaction       |


1.
"Tout était clair". Partie méta claire, partie packages aussi
Valeurs communes pas là avant. À bien expliciter, surtout sur l'héritage Langue > Territoires

2.
Partie la plus confusante: sync history / source

3.
Mieux: "ça peut être que mieux", univers mediaspot apprécié
Héritage apprécié, moins cloisonné
Groupage des packages par plateforme beaucoup plus simple aussi

4.
Pas de besoins non couverts
Artworks: héritage apprécié. 

5.
4/5


**Clôture :**

> « Merci beaucoup pour ce retour. Tes commentaires vont nous aider à améliorer l'interface avant le développement. As-tu des questions pour moi ? »

---

## Grille d'Observation

À remplir pendant le test :

### Réactions Spontanées


| Écran           | Réaction positive | Réaction négative | Hésitation/Confusion |
| --------------- | ----------------- | ----------------- | -------------------- |
| Title Global    |                   |                   |                      |
| Add Language    |                   |                   |                      |
| Bulk Localize   |                   |                   |                      |
| Packages Shared |                   |                   |                      |
| Package Single  |                   |                   |                      |
| Sync Details    |                   |                   |                      |


### Compréhension des Concepts Clés


| Concept                                  | Compris immédiatement | Compris après explication | Non compris |
| ---------------------------------------- | --------------------- | ------------------------- | ----------- |
| Hiérarchie Title → Language → Territory  |                       |                           |             |
| Compteur de complétion (X/120)           |                       |                           |             |
| Héritage (Inherited)                     |                       |                           |             |
| Badges de source (Unity, mediaspot)      |                       |                           |             |
| Shared Metadata vs Package Metadata      |                       |                           |             |
| États de package (Draft, Partial, Valid) |                       |                           |             |
| Multi-source avec sélection              |                       |                           |             |
| Historique des modifications             |                       |                           |             |


### Verbatims Clés

> « ... »

> « ... »

> « ... »

---

## Checklist Pré-Test

- Maquettes prêtes et accessibles (Figma, images, ou slides)
- Ordre de présentation défini (Global → Language → Bulk → Packages → Sync)
- Grille d'observation imprimée ou ouverte
- Chronomètre prêt
- Environnement calme sans interruptions
- Enregistrement audio/vidéo (si autorisé)
- Boisson/café offert au testeur

---

## Livrables Post-Test

1. **Grille d'observation complétée**
2. **Liste des pain points identifiés** (priorisés par gravité)
3. **Recommandations UX** (quick wins vs refonte)
4. **Verbatims clés** pour partager avec l'équipe

---

## Correspondance avec les Epics


| Écran testé                      | Epic   | Stories couvertes       |
| -------------------------------- | ------ | ----------------------- |
| Title/Global.png                 | Epic 1 | 1.1, 1.6                |
| Title/Add language*.png          | Epic 1 | 1.2, 1.3, 1.4           |
| Bulk Localize Drawer.png         | Epic 1 | 1.5                     |
| Packages/Shared.png              | Epic 2 | 2.1, 2.8                |
| Packages/Single.png, Partial.png | Epic 2 | 2.2, 2.3, 2.4, 2.5      |
| Sync details.png                 | Epic 5 | 5.1, 5.4, 5.5, 5.6, 5.7 |


