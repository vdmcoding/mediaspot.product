# Protocole d'Interview - Power Users BundleMaker v2

**Interviewer:** Ben
**Date prévue:** _À compléter_
**Durée estimée:** 60-90 minutes
**Participants:** 2 power-users BM

---

## Objectifs de l'interview

### Objectif principal
Comprendre en profondeur le workflow actuel des power-users BM pour identifier les pain points critiques et les opportunités d'automatisation dans BundleMaker v2.

### Objectifs secondaires
1. Valider les hypothèses du PRD BMME concernant l'articulation BMME → BM
2. Identifier les cas limites et exceptions non documentés
3. Comprendre les attentes en termes d'autonomie client vs intervention labo
4. Cartographier les points de friction dans la configuration des providers

---

## Contexte pour l'interviewer

### Rappel architecture BMME + BM

```
BMME v2 (Prepare)          BM v2 (Config/Build/Deliver)
┌─────────────────────┐    ┌─────────────────────────────┐
│ Title metadata      │───▶│ Ordering (commande client)  │
│ Languages/Territories│    │ Packaging (fab + merge)     │
│ Shared metadata     │    │ Delivery (livraison)        │
│ Provider mappings   │    │ Monitoring                  │
└─────────────────────┘    └─────────────────────────────┘
```

### Insights clés de l'interview Airlab (référence)
- Workflow actuel ultra-permissif (commandes non bloquées même si mal configurées)
- Packaging encore manuel dans la plupart des cas
- Specs providers platform-specific = maintenance lourde (MàJ jusqu'à 3x/mois)
- Seul StudioCanal est full-automatisé aujourd'hui
- Enjeu majeur : sécurisation et validation des données

---

## Structure de l'interview

| Phase | Durée | Contenu |
|-------|-------|---------|
| Warm-up | 5 min | Présentation, contexte, mise en confiance |
| Workflow actuel | 15 min | Journée type, outils utilisés, frustrations |
| Ordering | 15 min | Commandes clients, configuration, validation |
| Packaging & Fabrication | 15 min | Process, automatisation, QC |
| Livraison & Monitoring | 10 min | Suivi, erreurs, providers |
| Configuration providers | 10 min | Specs, maintenance, flexibilité |
| Vision & Priorités | 10 min | Attentes BM v2, quick wins |
| Clôture | 5 min | Questions ouvertes, remerciements |

---

## Questions par phase

### Phase 1 : Warm-up (5 min)

**Objectif :** Créer un climat de confiance, comprendre le profil de l'utilisateur.

1. **Peux-tu te présenter rapidement ?** Ton rôle, depuis combien de temps tu utilises BundleMaker ?

Alexis:
Fabrice: BM est très peu utilisé ajd, ça passe par des Excels et des Notepads

2. **En une phrase, c'est quoi ton job au quotidien avec BM ?**
BundleMaker est un outil partiellement abouti.
Il fabrique des livrables (vidéos, artworks, parfois des XML)
Séries télé non supportées
Outputs approximatifs à compléter et reprendre à la main
Façon de réunir et tracer les commandes OTT, fabrication des livrables automatisée

Workflow non automatisé de bout en bout

3. **Sur une échelle de 1 à 10, comment tu noterais ton niveau de satisfaction avec les outils actuels ?**
   - _Laisser répondre, noter le chiffre, demander : "Qu'est-ce qui te ferait monter d'un point ?"_

Fabrice: 4 seulement, enlève des épines, en rajoute d'autres
Alexis: il manque trop de choses pour avoir la moyenne

---

### Phase 2 : Workflow actuel (15 min)

**Objectif :** Cartographier le workflow réel, identifier les pain points majeurs.

#### Questions principales

4. **Décris-moi ta journée type quand tu dois préparer une livraison pour un client.**
   - _Écouter activement, noter les outils mentionnés, les allers-retours entre systèmes_

- Le client passe lui même la commande sur sa plateforme (ça dépend de qui, parfois c'est les CC qui s'en occupent)
- Commandes se lancent automatiquement
- Commandes terminées dans la plateforme ont besoin d'être packagées + livrées
- Travail humain à faire dans la foulée
- Mise à jour manuelle dans la plateforme

Principaux problèmes liés à la gestion de fabrication des métadonnées
Fabrication d'assets ok dans l'ensemble minus les specs marquées des plateformes (ex: Amazon qui demande des assets à l'image près). Problème réglé à l'ingest pour éviter des ingests foireux.

5. **Quels outils tu utilises aujourd'hui ?** (VDM Connect, PackageEditor, BM, autres ?)
   - _Pour chaque outil :_ "C'est quoi le truc le plus pénible avec cet outil ?"

- VDMConnect + PackageEditor
- Iris pour le BT
- Échanges via e-mail / teams entre CR et techniciens

6. **Si tu devais pointer LA chose qui te fait perdre le plus de temps, ce serait quoi ?**

- Récupération de métadonnées et d'artworks localisés
- Exploitation de ces métadonnées, vérification manuelle de la pertinence de la donnée (ex: avec les artworks localisés qui perdent leur localisation, ou informations non saisies de la part de l'utilisateur)
- Métadonnées manquantes dans le modèle de données de VDMC

7. **Combien de temps tu passes sur une livraison "standard" ?** Et sur une livraison "compliquée" ?

- ça peut être fait en 48h de bout en bout sur un packaging simple. 
- Au moins 50% "perdues" en travail humain

#### Questions de relance
- "Tu peux me donner un exemple concret récent ?"
- "Et ça arrive souvent ce genre de situation ?"
- "Comment tu gères quand ça arrive ?"

---

### Phase 3 : Ordering / Commande client (15 min)

**Objectif :** Comprendre le flux de commande, les validations manquantes, les erreurs fréquentes.

#### Questions principales

8. **Comment un client passe une commande aujourd'hui ?** Walk me through.

- Ajout d'un title au basket
- Sélection du produit "BundleMaker"
- Sélection de la plateforme de destination
    - Un profil spécifique pour chaque provider
    - Pas les mêmes éléments selon la plateforme
    - Défini par un XML provider, qui définit le workflow du Bundle

9. **Quelles sont les informations que le client doit fournir ?**
   - _Creuser :_ Plateforme, territoires, langues, résolution, audio, sous-titres...

- Remplissage des infos nécessaires (vendor ID, territoires à livrer)
- Sélection des différents components (Feature, Trailer, Artwork, DubCard)
    - Une seule Vidéo sur du multi-territoire, dont dépend les autres sélecteurs d'assets (dû à l'OAR notamment)
    - une ligne Audio + Audio desc (optional)+ subtitle Full et partial par territoire
    - Sélection des assets (automatisées lorsque possible)
    - Sélection de l'asset lié à chaque ligne
    - Difficulté à sélectionner les assets et à voir la hiérarchie globale 
- Possibilité de sortir une ligne de son territoire pour la passer en "Worldwide"

- Manque une notion de configuration globale (Qualities + Territories). Quasi toujours la best quality mais possibilité d'override quand même
- Notion de "best effort" du bundler : "je livre le max que je puisse dans la meilleure qualité possible" avec avertissements + blocages sur les attentes des providers
- Manque une notion de "asset fallback" ligne à ligne

- Checkout

10. **Qu'est-ce qui se passe quand une commande est incomplète ou mal configurée ?**
    - _Suivre :_ "Le système bloque ? Ou ça passe quand même ?"

- Le système bloque, et on veut garder ça
- Blocage conditionné à certaines conditions: pas de "qualité" inférieure
    - "si le meilleur asset possible existe, empêcher de faire moins bien"

11. **Quelle est l'erreur de configuration la plus fréquente que tu vois ?**

- Oubli d'assets ou suppression d'assets
- Pas de notion de minimum syndical à livrer : "à partir du moment où un film est localisé, c'est ok" donc soit subtitle soit audio
- Pas de gestion fine de ce qui est obligatoire ou non par territoire

12. **Idéalement, qu'est-ce que le système devrait bloquer automatiquement ?**

- Problématique: les specs providers sont souvent tordues manuellement par les clients / internes suite à des deals particuliers
- Certains clients ont besoin de sortir de la strictitude donc des fallbacks à prévoir

#### Focus : Articulation avec BMME

13. **Quand tu configures une commande, d'où viennent les métadonnées ?**
    - _Creuser :_ VDM Connect ? Saisie manuelle ? Import ?

14. **Est-ce qu'il y a des métadonnées que tu dois re-saisir alors qu'elles existent déjà ailleurs ?**

15. **Si les métadonnées étaient déjà prêtes et validées dans BMME, qu'est-ce que ça changerait pour toi ?**

---

### Phase 4 : Packaging & Fabrication (15 min)

**Objectif :** Comprendre le process de packaging, les interventions manuelles, les points de QC.

- Désarchivage, transcode, mise en conformité des assets alternatifs (framerate, durée de l'image de ref, etc.): monitoré par la page des Orders
- Génération dans un dossier dans Qumulo
- Packaging humain par VDM

En parallèle, 
- BT dans IRIS
- Livraison humaine

#### Questions principales

16. **Une fois la commande passée, que se passe-t-il ensuite ?**
    - _Suivre le flux :_ Transco, fabrication, merge, QC...

17. **Qu'est-ce qui est automatisé aujourd'hui ? Qu'est-ce qui est encore manuel ?**

18. **Quand est-ce que tu dois intervenir manuellement dans le process ?**
    - _Creuser :_ "C'est prévu ou c'est parce que quelque chose a planté ?"

19. **Comment tu vérifies qu'un package est "bon" avant livraison ?**
    - _Suivre :_ PackageEditor ? Vérification manuelle ? Checklist ?

20. **Qu'est-ce qui pourrait être automatisé et qui ne l'est pas encore ?**

#### Focus : Missing assets

21. **Comment tu gères les "missing assets" ?**
    - _Creuser :_ Notification ? Attente ? Workaround ?

22. **Est-ce que ça arrive qu'un package parte en livraison avec des éléments manquants ?**
    - _Si oui :_ "Comment c'est possible ? Qu'est-ce qui a raté ?"

---

### Phase 5 : Livraison & Monitoring (10 min)

**Objectif :** Comprendre le suivi post-livraison, les retours providers, les erreurs.

#### Questions principales

23. **Comment tu sais qu'une livraison s'est bien passée ?**

- Plus de suivi après le transco
- MàJ manuelle du statut de l'order
- Pas de notification du destinataire
- Pas tjs de retour (dépend des plateformes): "pas de nouvelles bonne nouvelle"

24. **Qu'est-ce qui se passe quand un provider rejette un package ?**
    - _Suivre :_ Notification ? Délai ? Process de correction ?

- Envoi d'un email au client si rejeté 
- Souvent dû à une erreur de configuration ou une erreur de transcodage (erreur humaine de saisie ou technique de fabrication)

25. **Quels providers sont les plus "difficiles" en termes d'exigences ?**
    - _Creuser :_ "C'est quoi qui les rend difficiles ?"

26. **Est-ce que tu as déjà eu des problèmes de "blacklist" ou de notation provider ?**
    - _Si oui :_ "Comment c'est arrivé ? Comment vous avez réagi ?"

27. **Qu'est-ce qui t'aiderait à anticiper les rejets avant qu'ils arrivent ?**

- Difficile d'anticiper les erreurs techniques
- Par contre, possibiltié de borner la configuration pour éviter les erreurs humaines

---

### Phase 6 : Configuration des providers (10 min)

**Objectif :** Comprendre la maintenance des specs, la flexibilité souhaitée.

#### Questions principales

28. **Comment sont configurés les providers aujourd'hui ?** (XML, interface, code ?)

- Fichiers XML de profils (sert uniquement à la transformation des Assets et au Transcodage, pas les métadonnées)
    - Un XML par provider (pas forcément par plateformes, profils multi-plateforme)
    - Fichiers mono plateformes nécessaires à cause des métadonnées (Labo notamment) et identifiants de la balise "Provider" du XML et points de livraison spécifiques pour CE client
- Certains paramètres de configuration des livraisons sont ultra-spécifiques et devraient être gérés côté plateforme admin: ProviderID, identifiants de livraison, etc. (s'applique aussi aux livraison Transcode by Profile)
- "On ne s'arrête qu'à la partie Fabrication et on skip la partie Livraison"
- Séparation des specs Fab des specs Livraison
- Bénéfice de Sécurité également

29. **Quand un provider change ses specs, comment tu gères ?**
    - _Suivre :_ "C'est toi qui fais la mise à jour ? Quelqu'un d'autre ?"

- Lecture des specs, nouveau Profil ou update des profils existants, déploiement, test
- 1 XML par client onboardé Amazon (donc SC, Fédé, ) multiplié par 3 (Profils Amazon série + HDR)
- Test systématique : test de fabrication + vérification de l'output
- "Je ne vérifie que ce que je mets à jour"

30. **Combien de fois par mois tu dois mettre à jour des specs provider ?**

- Aucun rythme particulier. Rien pendant 6 mois puis 10 en 1 mois

31. **Est-ce que tu as déjà eu un problème parce qu'une spec n'était pas à jour ?**
    - _Creuser :_ "Raconte-moi ce qui s'est passé."

- Dernière version des specs envoyés pas les clients, pas les plateformes. (Seulement les providers avec lesquels on est en contact)
- Pas de push sur les MàJ de leurs specs, donc l'interfaçage est donné à nos clients
- "On est dans le flou jusqu'à ce que ça pète" -> Aucune option de monitoring possible
- Travail de sensibilisation à faire vis à vis de nos clients. Aide d'interfaces à faire  : "Attention, la dernière commande date de X temps. Vérifiez la fraîcheur de vos spécifications"

32. **Si tu pouvais configurer les providers via une interface visuelle (au lieu de XML), ça changerait quoi pour toi ?**

- M7 utilise déjà un profil XML "métadonnées" géré par du code Liquid (cf Broadcasters > Liquid Export)
- Ça ne devrait pas être à Airlab de s'occuper du XML de métadonnées

- "Dans quelle mesure on pourrait avoir une interface unique partagée entre tous les broadcasters"
- Ce qui change : formats particuliers, ordre des métadonnées, présence ou non de métadonnées, etc.
- "On n'est pas développeurs"
- "Pour telle plateforme j'ai besoin de telle telle telle métadonnée" -> Cette configuration n'a pas besoin d'être éditable manuellement, ça peut passer par des fichiers XML"
- Hotspot : quelle forme prennent ces spécifications côté Package Editor ?

- On peut éventuellement prévoir une interface visuelle pour update le mapping mediaspot > providers. Pas MVP ?

#### Focus : Platform-specific vs Cross-platform

33. **Aujourd'hui, les specs sont par plateforme. C'est un problème ?**
    - _Relancer :_ "Ça veut dire que tu dois mettre à jour X fois pour le même changement ?"

34. **Si les specs étaient partagées entre toutes les plateformes (une seule source de vérité), qu'est-ce que ça changerait ?**

- Cf Livraison vs Fabrication

---

### Phase 7 : Vision & Priorités (10 min)

**Objectif :** Capturer les attentes, prioriser les améliorations.

#### Questions principales

35. **Si tu avais une baguette magique, quelle serait LA fonctionnalité qui te changerait la vie ?**

- Cadrage du BundleMaking, meilleurs feedbacks utilisateur (BMME comme BM)

36. **Qu'est-ce qui devrait être fait en priorité pour BM v2 ?**
    - _Si besoin, proposer :_ "Automatisation ? Validation ? Interface ? Monitoring ?"

- Refonte du produit dans le basket
- Mapping des métadonnées digeste
- Centralisation de la gestion des profils (+ split Fabrication / Livraison [login / password / path / naming rules changent par Client + Provider])

37. **Est-ce que tu vois des risques ou des pièges à éviter pour BM v2 ?**
    - _Suivre :_ "Des trucs qui ont mal marché sur d'autres projets ?"

38. **Comment tu imagines ton job dans 1 an si BM v2 est réussi ?**

#### Focus : Autonomie client

39. **Jusqu'où le client devrait pouvoir aller en self-service ?**
    - _Creuser :_ "Où le labo doit absolument intervenir ?"

- Flow complet : ordering > fabrication > packaging > livraisons

40. **Est-ce que certains clients pourraient être full-automatisés comme StudioCanal ?**
    - _Suivre :_ "Qu'est-ce qui les en empêche aujourd'hui ?"

- Si on a BMME + BM, on peut tout faire (sauf la partie Livraisons sur les Providers qui ne le permettent pas, dans ce cas là on reste en manuel UNIQUEMENT sur la livraison)

---

### Phase 8 : Clôture (5 min)

41. **Autres interviews potentielles**

- Jérôme pour la partie Mapping Liquid
- Yan sur la partie PackageEditor, le phasage du mapping des métadonnées notamment

---

## Grille de prise de notes

### Pain points identifiés

| # | Pain point | Fréquence | Impact | Verbatim |
|---|------------|-----------|--------|----------|
| 1 |            |           |        |          |
| 2 |            |           |        |          |
| 3 |            |           |        |          |

### Besoins exprimés

| # | Besoin | Priorité (H/M/L) | Lien avec PRD BMME |
|---|--------|------------------|-------------------|
| 1 |        |                  |                   |
| 2 |        |                  |                   |
| 3 |        |                  |                   |

### Surprises / Insights inattendus

| # | Insight | Implication |
|---|---------|-------------|
| 1 |         |             |
| 2 |         |             |

### Verbatims clés à retenir

> "_Citation 1_" - Participant X

> "_Citation 2_" - Participant Y

---

## Après l'interview

### Checklist post-interview
- [ ] Relire et compléter les notes dans les 24h
- [ ] Identifier les 3 insights clés
- [ ] Croiser avec les insights Airlab
- [ ] Mettre à jour le PRD BMME si nécessaire
- [ ] Partager les findings avec l'équipe

### Template de synthèse

```markdown
## Synthèse Interview - [Nom participant] - [Date]

### Profil
- Rôle :
- Ancienneté :
- Satisfaction actuelle : /10

### Top 3 pain points
1.
2.
3.

### Top 3 besoins prioritaires
1.
2.
3.

### Insight clé
>

### Impact sur PRD BMME/BM
-
```

---

## Annexe : Rappel des hypothèses à valider

Ces hypothèses issues du PRD BMME doivent être validées/invalidées durant l'interview :

| Hypothèse | Statut | Notes |
|-----------|--------|-------|
| Les métadonnées sont ressaisies plusieurs fois entre VDMC et BM | ⬜ À valider | |
| Le workflow actuel est ultra-permissif (pas de blocage) | ⬜ À valider | |
| Les specs providers platform-specific sont un problème de maintenance | ⬜ À valider | |
| Le taux d'erreur à la livraison pourrait être réduit par validation en amont | ⬜ À valider | |
| L'automatisation complète est souhaitée par les utilisateurs | ⬜ À valider | |
| Le QC humain reste nécessaire sur certaines étapes | ⬜ À valider | |
