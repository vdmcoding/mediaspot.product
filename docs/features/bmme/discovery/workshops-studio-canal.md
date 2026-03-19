# Journey 1 : gestion des métadonnées Titles
# Journey 2 : Mapping des sources de vérité
Capabilities révélées par le workshop: 

1. Définition de la source de la donnée
- La source de la donnée est définie par défaut au niveau de la configuration de plateforme, champ par champ. Les champs peuvent être bloqués dans tel ou tel état si nécessaire
- La seule source éditable est mediaspot. Seuls les champs définis sur cette source de vérité sont donc des inputs
- Chaque champ peut être switché vers une autre source. Les valeurs de chaque source 
sont montrées à l’utilisateur pour lui permettre de faire le bon choix.
- Les “pulls” périodiques ou manuels des systèmes externes ne remplacent que les champs qui ont ce système externe
comme source.

2. Synchronisation manuelle 
- Un pull manuel peut être fait depuis la page d'un Title.
- La mise à jour et ses conséquences sont prévisualisables

3. Pulls périodiques et Resync manuel 
- Les pulls des différents systèmes externes sont listés sur une page. Pour chacun, un détail du pull est disponible permettant de visualiser ce qui a été mis à jour.
- Une fonctionnalité de resync permet de renouveler un ou plusieurs pulls à la demande de l'utilisateur
    - En sélectionnant un ou plusieurs Pulls uniques
    - En sélectionnant une range de dates

4. Historique des modifications
- Sur chaque champ, un historique des modifications est consultable.
- Cet historique montre  
    - Les modifications de valeurs (y compris si changement de la source de la donnée)
    - L'auteur de la modification 