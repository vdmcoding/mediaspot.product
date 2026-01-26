BMME = prepare
Aujourd’hui : inexistant, remplacé par VDM Connect

BM = config / build
- Commande du client
    - Inputs : 
    - Infos VDMC + Linked to Connect
    - Sélection plateforme + territoires + résolution (indépendant), sauf UHD / HDR où il faut livrer une vidéo HDR et une SDR
    - Sélection des langues (1 seule vidéo par contenu) + spécifications des territoires (i.e quelle version audio + quel sous-titre pour quel territoire)
        - Les inputs peuvent être appliquées au territoire OU à la langue globale (notamment Trailers), c’est aussi accepté par la plateforme
        - Plusieurs contenus livrables : feature, trailer, artworks, etc. 
    - Aujourd’hui, la commande n’est pas bloquée
        - Ultra permissif
        - Passage en « missing assets » seulement si l’asset n’existe pas, pas si la commande est mal configurée
        - Transco auto mais packaging encore fait à la main
- Packaging : 
    - Les internals voient si le package est complet
    - Si manquant, on passe au package fabrication manuel 


- Fabrication automatisée + génération auto du BT

1 seul cas complètement automatisé pour StudioCanal (pour Arthaus / M7)

Package Fabrication = merge
- Lancement de travaux
- Génération d’un BT
- VDMConnect renseigné par le CC
- Fabrication packaging au labo
- Si besoin, QC
- Packaging : prendre fab + métadonnées 

Livraison
- Full auto (SC), sinon livraison manuelle (par le service Packaging)
- BT validé + livraison confirmé par le CC
- Suivi de la livraison technique (i.e c’est arrivé ou pas) 
- Monitoring (Apple Amazon Netflix), arrive peu souvent (parce que beaucoup de check humain), providers TRÈS exigeant sur les taux d’acceptation
- Une fois livré, ce n’est plus de notre ressort (et ça ne nous intéresse plus)

—————— 

- Override / Remplissage des métadonnées manquantes au moment de l’ordering
- Sélection de l’audio et du subtitle, indépendant (sauf si HDR / SDR, certaines plateformes requièrent 2 audios pour la vidéo, uniquement pour la langue originale)

- Mapping intelligent / autocomplete entre les territoires et la sélection de langue audio + subtitles
- Blocage complet du package s’il est mal configuré
    - Automatisation de la vérification, philosophie du missing assets reste (cf rules PackageEditor)
    - Le client doit pouvoir voir ce qu’il manque exactement
    - Ne pas permettre de lancer quelque chose de partiel
    - Feedback performant pour limiter le taux d’erreur
- Nécessité d’automatiser complètement la fabrication + le packaging (en self-service)
    - Faire intervenir de l’humain (ou du semi-automatisé) uniquement en cas de missing asset
- Énorme enjeu de sécurisation et validation des données
    - Phases humaines à maintenir
    - Vérification des flux : que la fabrication est correcte (trous de son, freeze, bitrate, résolution, qualité, etc.), semi-auto ajd
    - Cohérence du package : vérification après Fab et QC > (aujourd’hui via PackageEditor)
        - Configuration du package : bonnes versions pour les bons territoires
        - Pas d’élément manquant par rapport à la configuration initiale (assets comme méta)
        - Vérification des artworks

- Côté providers : beaucoup de providers configurés en interne.
    - Nécessité de rendre cela versatile pour permettre de créer plein de types de packages différents (y compris pour des broadcasters individuels)
    - Configuration « de base », créée en interne, et maintenue en interne 
        - MàJ de specs = MàJ des profils
    - Gros XML brut de décoffrage rempli de balises et de tags. Permet d’expliquer les comportements et les attendus de chaque provider.
    - Aujourd’hui, les specs de providers sont platform-specific. Chaque changement de specs chez un provider implique une modification des specs pour CHAQUE plateforme. Ça peut arriver jusqu’à 3 fois /mois. Particulièrement lourd sur les évolutions technos (type HDR) ou la création de nouveaux supports.
    - Possibilité de configurer des providers selon des règles claires : aujourd’hui c’est un gros XML, ce serait plus cool avec une interface « sympa »
    - Tagnames normalisés pour BMME, avec mapping des métadonnées spécifiques plateformes. Si on fait ça, plus d’intérêt à gérer des configs platform-specific.
- Activation des providers plateforme par plateforme
