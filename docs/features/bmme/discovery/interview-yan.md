PARTICIPANT : Yan Rocheteau
DATE : 03/03/2026

== CONTEXTE ==
Rôle : Directeur dela fabrication 
Ancienneté : Depuis 2017
Collaborateurs fréquents : 
Violaine : responsable du service Packaging
Solène + Benjamin : techniciens packaging
Fabrice : interfaçage avec Airlab, remontée des problèmes, sur les assets qui sortent de mediaspot

Tout sauf Airlab / mediaspot
Tous les assets physiques ou virtuels fabriqués chez VDM 
Dans le cas de BM, vérification + packaging 

== WORKFLOW ACTUEL ==
Déclencheur d'une mise à jour :
Étapes décrites :
Temps estimé :
Outils utilisés :

Objectif : rapide, fiable et efficace

### Fiction : flow de création de package
- Génération automatique de BT par mediaspot OU Chargé de clientèle fait un BT dans Iris : client, délai, liste des assets, métadonnées éventuelles (ou id VDMC)
- Arrive dans les mains du Planning qui l'assigne à un des techniciens Packaging (polyvalents grâce à PackageEditor, qui homogénéise les traitements de la plateforme)
- Yan n'intervient que quand ça ne se passe pas bien
- ex : assets avec défauts, métadonnées absentes ou erronnées
- Remontée des fils pour voir "où ça a merdé". 
- Ex: 430 packages de films fabriqués avec mediaspot, sous-titres erronés + audios avec mauvais FPS
- PackageEditor vérifie techniquement un certain nombre de choses + SpotQC à vérifier à chaque livraison (vérif machine + humaine)
- Remontée à Airlab, investigation, ouverture de tickets
- ex : problème technique sur le réseau

### Fiction : flow de mise à jour des specs
- Amazon met à jour une métadonnée. 
- Info peut venir des clients > CC > labo ou directement aux labos pour les plus gros broadcasters
- Fix de PackageEditor rapidement : journée ou lendemain (2j max) / mise à jour manuelle en attente
- Lecture de la nouvelle doc, mise à jour de PackageEditor si nécessaire (ou VDMConnect si faisable là bas : configuration d'un nouveau territoire)

⚠️ VDMC ne gère pas les séries, PE fait le mapping

PackageEditor: 
- Très dépendant de VDMConnect au départ
- VDMC plus maintenu, donc PackageEditor met les bouts de scotch
- Partie config sous forme de fichier XML par plateforme
- Beaucoup de code en dur mais reste très propre, Yan est confiant
- Quelques heures par modification, pas plus

Aucun pain point relevé par Yan particulièrement, le système "roule"

### Fiction : suggestions d'amélioration de PackageEditor
- Veille de l'actu par Yan
- Feedback informel fait par les techniciens pour amélioration de PE (par mail)

== PAIN POINTS ==
□ Fichiers dispersés : ✅ / ⚠️ / ❌
  Notes :

□ Modification manuelle chronophage : ✅ / ⚠️ / ❌
  Notes :

□ Risque d'erreur/oubli : ✅ / ⚠️ / ❌
  Notes :

□ Découverte tardive des erreurs : ✅ / ⚠️ / ❌
  Notes :

□ Dépendance Git/CI/CD : ✅ / ⚠️ / ❌
  Notes :

== DÉCOUVERTES ==
Nouveaux pain points :
BT auto-générés par mediaspot sont "mal foutus" -> indication plus que réelle information
Clients de VDMC qui ne sont pas des clients de mediaspot

Workarounds/bricolages :

Besoins non exprimés dans le PRD :

== VERBATIMS CLÉS ==
"Le labo est souvent la roue de secours de mediaspot"
"L'objectif est d'éteindre VDMConnect"
"On a des clients VDMConnect qui ne sont pas des clients mediaspot" > clients qui ont d'autres MaM, ou qui sont des facilitateur de création de packages (Under the Milky Way par ex.)

== PRIORITÉ PERÇUE ==
Ce qu'ils changeraient en premier :

Outil parfait :
Client > Bundle > BT
BT > PackageEditor + Iris > automatisé

2 ans pour reprendre la main sur PackageEditor
```

---