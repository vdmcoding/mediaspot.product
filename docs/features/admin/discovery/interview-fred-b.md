# Protocole d'Interview — Responsable Qualité / Monitoring

**Objectif** : Extraire les besoins en outils de monitoring et configuration cross-platform pour le MAM.

---

## 1. Contexte et rôle *(5 min)*

- Décris-moi ton périmètre : quelles plateformes client supervises-tu ?
SND

- Quels outils utilises-tu aujourd'hui pour le monitoring ?
Requests / Ingests 
Page title + assets
Export / Advanced filtering des tableaux

- Qui d'autre dans ton équipe intervient sur ces sujets ?

Façon de fonctionner commune à bcp de monde
- Nom des plateformes pour ouvrir plusieurs onglets 
- 2 plateformes (SND, principale -> app-snd) + mediaspot.io avec le switch platform

Problématiques d'identification lorsque 2 onglets ouverts

---

## 2. Pain Points *(10 min)*

- Raconte-moi la dernière fois où tu as dû investiguer un problème sur plusieurs plateformes.
Problème partagé sur Drive
Platform switch manuel 
Réplication sur la plateforme de démo (analyse du comportement, test d'ACL, etc.) pour vérifier le comportement
Émulation des users (un peu pénible de faire des allers-retours pour tester des ACLs)

- Si tu devais comparer l'état de 2 plateformes aujourd'hui, comment tu t'y prends ?
- Qu'est-ce que tu fais "à la main" que tu aimerais automatiser ?
Vérification du statut de stockage / d'archivage des media files (asset par asset)
Upload media files depuis la liste des assets

- Y a-t-il des informations auxquelles tu n'as pas accès mais qui te seraient utiles ?
Edit metadata dégueulasse
Meilleure configuraiton des metadata views
Même chose pour les requests

---

## 3. Vision Cross-Platform *(10 min)*

- Si tu avais une vue unifiée sur toutes les plateformes, qu'est-ce que tu voudrais y voir en priorité ?
Pas vraiment concerné par la notion d'admin 
Liste des plateformes + quick access + quick switch
Cross-title + cross-assets

Multi-authentification + URL enforcement (i.e pas de platform switch sur les sous-domaines ou redirection claire)
Auto-redirection

- Imagine un tableau de bord idéal le matin... Il t'affiche quoi ?
Healthcheck Orders / Shares / Ingests ("voir tout ce qui plante")
Pour pouvoir anticiper les problèmes avant que les clients ne le voient (pouvoir être proactif)
Healthcheck performance ("ça rame"), pouvoir prévenir les clients de manière proactive

- Quelles alertes voudrais-tu recevoir proactivement ?
Monitoring performances
Problèmes d'infra
Pouvoir être alerté avant que ça n'arrive

- Côté configuration, qu'est-ce que tu aimerais pouvoir modifier sans passer par les devs ?
Création de plateforme
"Logique de création à partir de modèles, puis finetuning"
- Packs / Placeholders / Requests "par défaut"

Peu de passage par la technique (sauf quand il y a des problèmes)
ACLs trop complexes côté configuration, nécessité de passer par la technique pour "savoir ce que ça fait"
Vu globale des ACLs pas assez claire non plus (mettre en avant les ACLs activées)

- Comment tu partages les infos de monitoring avec d'autres équipes ?
Outil de partage dans mediaspot, chat / espace / conversations (Teams est "déjà ça" dans l'absolu)

---

## 5. Clôture

- Y a-t-il quelque chose qu'on n'a pas abordé ?
- Qui d'autre devrais-je interviewer ?

---

## Notes d'interview

**Date** : _______________
**Participant** : _______________
**Durée** : _______________

### Verbatims clés

>

### Besoins identifiés

-

### Actions / Suivis

-
