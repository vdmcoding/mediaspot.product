# ACL Reference

> Source de vérité : `Acls Mapping.json` (backend)

## Ingest Features


| Nom                                                      | Tag                                  | Description                                                                                                                                     |
| -------------------------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Allows Placeholder Requests Creation                     | `aclIngestPlaceholderCreate`         | Permet de créer des demandes de placeholder ("create new requests" submenu)                                                                     |
| Allows Configuration Creation                            | `aclIngestConfigCreation`            | Permet de créer des configurations ("configuration manager" submenu)                                                                            |
| Allows for my linked Provider Lab(s) Requests Monitoring | `aclIngestWishListView`              | Si vous avez une association de groupe avec un ou plusieurs labs fournisseurs, permet de voir le sous-menu "monitor"                            |
| Allows All (Override) Requests Monitoring                | `aclIngestWishListViewAll`           | Permet de voir toutes les requêtes dans le sous-menu "monitor"                                                                                  |
| Enable Access Level filter on Requests Monitoring        | `aclIngestEnableAccessLevelFilter`   | Les requêtes sont filtrées dans le sous-menu "monitor" selon les droits "level access" du groupe (AllMyPlatform, OnlyMyPlatformGroup, OnlyMine) |
| Allows File Upload (by Aspera)                           | `aclIngestUpload`                    | Permet aux membres du groupe d'uploader un fichier quand demandé                                                                                |
| Allows File Ingest Monitoring                            | `aclIngestMonitor`                   | Affiche le sous-menu monitor dans le menu ingest                                                                                                |
| Allows Requests Assignation to a Lab Provider            | `aclIngestAssignToLabProvider`       | Dans "upload file request", permet de changer le lab fournisseur                                                                                |
| Allows Rejections Manager View                           | `aclIngestRejectionsView`            | Permet de voir le sous-menu "rejections manager"                                                                                                |
| Allows Rejections Manager Bypass decision                | `aclIngestRejectionsBypass`          | Permet de voir et cliquer sur le pouce bleu pour bypass la décision QC dans le menu "rejections manager"                                        |
| Allows All (Override) Rejections Manager Bypass decision | `aclIngestRejectionsBypassOverwrite` | Permet de bypass un asset rejeté même si l'option bypass n'a pas été accordée durant la qualification                                           |
| Allows Requests Deletion                                 | `aclIngestDeleteRequest`             | Permet de supprimer les requêtes rejetées (comme les requêtes d'upload)                                                                         |
| Allows the Creation of new Config Columns                | `aclIngestConfigColumnSetCreate`     | Permet d'ajouter un nouveau champ Data dans la section Configuration Manager                                                                    |
| Allows the Update of new Config Columns                  | `aclIngestConfigColumnSetUpdate`     | Permet de mettre à jour les champs Data dans la section Configuration Manager                                                                   |
| Allows Assign Priority                                   | `aclIngestAssignPriority`            | Permet d'assigner une priorité aux requêtes d'ingest                                                                                            |
| Allows to remind provider to upload media file           | `aclIngestPlaceholderRemind`         | Permet d'envoyer des rappels au fournisseur pour uploader le fichier média                                                                      |


## Backoffice Admin Features


| Nom                                      | Tag                                  | Description                                                                      |
| ---------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------- |
| Backoffice Admin Features                | `aclBackofficeUserListView`          | Permet de voir les sous-menus user et group                                      |
| Allows User/Group Creation               | `aclBackofficeUserCreate`            | Permet de créer des groupes et utilisateurs dans chaque sous-menu                |
| Allows User/Group Deletion               | `aclBackofficeUserDelete`            | Permet de les supprimer dans les mêmes sous-menus                                |
| Allows Lab Provider Creation / Deletion  | `aclBackofficeLabProviderCreate`     | Permet de créer/supprimer un fournisseur                                         |
| Allows Mailing List View                 | `aclBackofficeMailinglistView`       | Permet de voir le sous-menu "mailing list management"                            |
| Allows Mailing List Creation             | `aclBackofficeMailinglistCreate`     | Permet de créer une mailing list                                                 |
| Allows Ldap User list View               | `aclBackofficeUserLdapSync`          | Permet de voir la liste des utilisateurs connectés via l'active directory        |
| Manual Tasks Template Creation           | `aclBackofficeManualTasksCreate`     | Sous-menu + droit de création des templates de tâches manuelles                  |
| Manual Tasks Template Deletion           | `aclBackofficeManualTasksDelete`     | Sous-menu + droit de suppression des templates de tâches manuelles               |
| Audit Logs Admin Access                  | `aclBackofficeAuditLogsView`         | Ajoute un sous-menu dans le back office pour voir le log des actions utilisateur |
| Transfers Drashboard Access              | `aclBackofficeTransferListView`      | Permet d'accéder à la page File Transfers (dans le menu Admin Backoffice)        |
| Allows product update                    | `aclBackofficeDeliveryProductUpdate` | Permet de modifier les produits de livraison                                     |
| Allows quotas management view interface  | `aclBackofficeQuotasView`            | Permet de voir l'interface de gestion des quotas                                 |
| Allows product management view interface | `aclBackofficeDeliveryProductView`   | Permet de voir l'interface de gestion des produits                               |
| Allows group role management             | `aclGroupRoleManage`                 | Permet de gérer les rôles des groupes                                            |
| Allows youtube channels management       | `aclBackofficeYoutubeChannel`        | Permet de gérer les chaînes YouTube                                              |


## Workflow Features


| Nom                                                                        | Tag                                             | Description                                                                                                                         |
| -------------------------------------------------------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Allows to see Workflow operations                                          | `aclWorkflowView`                               | Permet de voir les opérations de workflow                                                                                           |
| Allows Workflow Admin operations (priority, cancel, retry etc.)            | `aclBackofficeWorkflowAdmin`                    | Permet les modifications de commandes, annulation, retry order/ingest, définir le niveau de priorité, et autres modifications admin |
| Allows Purge Workflow List View                                            | `aclWorkflowPurgeView`                          | Permet d'accéder à la page Purge Requests Manager                                                                                   |
| Allows Purge Workflow Creation (Media File Purge)                          | `aclWorkflowPurgeCreate`                        | Permet de demander une purge. Les assets peuvent avoir les statuts: "accepted", "need check or editing", "rejected"                 |
| Allows Purge Workflow Creation (Media File Purge) on Accepted Asset status | `aclWorkflowPurgeCreateWithAcceptedAssetStatus` | Permet de demander une purge uniquement sur les assets acceptés                                                                     |
| Allows Workflow User Tasks List View                                       | `aclUserTaskView`                               | Permet de voir la liste des tâches utilisateur du workflow                                                                          |
| Allows Workflow User Tasks Update and Claim                                | `aclUserTaskUpdate`                             | Permet de mettre à jour et réclamer les tâches utilisateur du workflow                                                              |
| Allows Assign Followers                                                    | `aclWorkflowAssignFollowers`                    | Permet d'assigner des followers aux workflows                                                                                       |


## Order Features


| Nom                                                              | Tag                                      | Description                                                                                                             |
| ---------------------------------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Allows Play/Start Order                                          | `aclOrderStart`                          | Démarre manuellement un workflow de commande                                                                            |
| Allows Auto-Play Order without Approval                          | `aclOrderPlayWithoutApproval`            | Permet de passer des commandes qui démarrent automatiquement sans confirmation d'un autre utilisateur                   |
| Allows Cancel Order                                              | `aclOrderCancel`                         | Permet de supprimer une commande depuis le Purchased Monitor                                                            |
| Allows Generated Asset Ingest                                    | `aclOrderIngestGenerated`                | Permet d'ingérer un fichier généré par VDM-Digital Factory. Les métadonnées "generated" seront ajoutées automatiquement |
| Show "enable audio only format" button                           | `aclOrderAudioOnly`                      | Affiche le bouton "enable audio only format" dans les options transcodegeneric                                          |
| Show Watermarking tab                                            | `aclOrderWatermarcking`                  | Affiche l'onglet Watermarking dans les options transcodegeneric                                                         |
| Allows Assign Cost Benefit center                                | `aclOrderAssignBenefitCostLinkCreate`    | Permet de lier une commande à un centre de coût/bénéfice préconfiguré                                                   |
| Allows Order Update                                              | `aclOrderUpdate`                         | Permet de modifier la commande dans le purchased monitor                                                                |
| Allows Item Issue Management                                     | `aclOrderManageItemIssues`               | Permet d'ajouter un commentaire concernant un problème sur les commandes livrées                                        |
| Allows Assign Followers                                          | `aclOrderAssignFollowers`                | Permet d'assigner un utilisateur supplémentaire pour suivre une commande ou un ingest                                   |
| Allows Assign Priority                                           | `aclOrderAssignPriority`                 | Paramètres de priorité pour les commandes dans purchased monitor                                                        |
| Allows to access to Manual Tasks Templates                       | `aclOrderManualTaskView`                 | Permet d'accéder à la page Manual Tasks Template                                                                        |
| Allows to override Prices on Check-out                           | `aclOrderOverrideItemPrice`              | Permet de définir le prix souhaité sur la facture de n'importe quelle commande                                          |
| Allows to override Customers on Check-out                        | `aclOrderOverrideItemCustomer`           | Permet de modifier le client sur une commande passée depuis un contrat spécifique                                       |
| Allows to see Order option due date                              | `aclOrderDueDate`                        | Permet de voir et définir une date d'échéance                                                                           |
| Allows to see Order option major delivery                        | `aclOrderIsImportant`                    | Permet de voir et cocher la case de livraison importante (état par défaut: false)                                       |
| Allows to send Billing Acknowledge manually                      | `aclorderSendAckBillingManually`         | Permet d'envoyer manuellement l'accusé de facturation                                                                   |
| Allows to attach files to the items.                             | `aclOrderAttachFile`                     | Permet d'attacher des fichiers aux éléments de commande                                                                 |
| Allows to see button who mask non available field                | `aclOrderMaskNonAvailable`               | Permet de voir le bouton qui masque les champs non disponibles                                                          |
| Allows Product enable "Transcode as Mezzanine"                   | `aclOrderEnableProductTranscodeAsMezz`   | Permet d'activer le transcodage produit comme Mezzanine                                                                 |
| Allows order approval                                            | `aclOrderApprove`                        | Permet l'approbation des commandes                                                                                      |
| Restrict all Orders access to only followers (CAUTION)           | `aclOrderRestrictToFollower`             | Restreint l'accès à toutes les commandes aux seuls followers (ATTENTION)                                                |
| Allows to order a Manual Task                                    | `aclOrderManualTask`                     | Permet de commander une tâche manuelle                                                                                  |
| Allows to see the warnings on an order item product              | `aclOrderWarnings`                       | Permet de voir les avertissements sur un produit d'élément de commande                                                  |
| Auto select contract on Checkout?                                | `aclOrderContractAutoSelect`             | Sélection automatique du contrat au checkout                                                                            |
| Allows to see Link between Orders and Ingest                     | `aclOrderIngestLinkView`                 | Permet de voir le lien entre les commandes et l'ingest                                                                  |
| Allows to see segment cut on a transcode as service or PAD order | `aclSegmentCutView`                      | Permet de voir la coupe de segment sur une commande transcode as service ou PAD                                         |
| Allows to change status on manual orders treated externally      | `aclOrderManualTaskExternalChangeStatus` | Permet de changer le statut sur les commandes manuelles traitées en externe                                             |
| Allows to access quotes dashboard?                               | `aclOrderQuoteView`                      | Permet d'accéder au dashboard des devis                                                                                 |
| Allows to request a manual work quote?                           | `aclOrderQuoteRequest`                   | Permet de demander un devis de travail manuel                                                                           |
| Allows to validate quote?                                        | `aclOrderQuoteValidate`                  | Permet de valider un devis                                                                                              |
| Allows to schedule orders                                        | `aclOrderSchedule`                       | Permet de planifier les commandes                                                                                       |
| Allows to resend transfer download link emails                   | `aclOrderResendTransferEmail`            | Permet de renvoyer les emails de lien de téléchargement de transfert                                                    |


## Asset Features


| Nom                                                                                        | Tag                                          | Description                                                                                          |
| ------------------------------------------------------------------------------------------ | -------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Allows to see Quick View                                                                   | `aclAssetQuickView`                          | Permet de voir la vue rapide de l'asset                                                              |
| Allows to see Tools View                                                                   | `aclAssetToolsView`                          | Permet de voir le raccourci vers le panier sur le côté gauche de la page asset                       |
| Allows to delete an Object Asset                                                           | `aclAssetDelete`                             | Permet de supprimer un objet asset                                                                   |
| Allows to Download Asset PDF Export                                                        | `aclAssetPdfExport`                          | Permet de télécharger l'export PDF d'un asset                                                        |
| Allows to see Deleted Assets                                                               | `aclMetadataAssetViewDeleted`                | Permet de voir les assets supprimés                                                                  |
| Allows to see Deleted Contents                                                             | `aclMetadataContentViewDeleted`              | Permet de voir les contenus supprimés                                                                |
| Allows to see Deleted Titles                                                               | `aclMetadataTitleViewDeleted`                | Permet de voir les titres supprimés                                                                  |
| Allows to switch Class to Raw                                                              | `aclSwitchClassToRaw`                        | Permet de changer la classe en RAW                                                                   |
| Allows to switch Class to Mezz                                                             | `aclSwitchClassToMezz`                       | Permet de changer la classe en MEZZ                                                                  |
| Restrict all Asset access to only followers (CAUTION)                                      | `aclAssetRestrictToFollower`                 | Restreint l'accès à tous les assets aux seuls followers (ATTENTION)                                  |
| Hide empty Objects (no childrens, such as empty Content)                                   | `aclAssetHideEmptyObjects`                   | Masque les objets vides (sans enfants, comme les contenus vides)                                     |
| Allows to see the column bypassed in assets relationships and the metadata in asset's page | `aclBypassedAsset`                           | Permet de voir la colonne bypassed dans les relations d'assets et les métadonnées dans la page asset |
| Allows to hide the asset card's page and button                                            | `aclDisableAssetAccess`                      | Permet de masquer la page et le bouton de carte asset                                                |
| Show recent Titles in Search Engine home page                                              | `aclSearchShowRecentTitles`                  | Affiche les titres récents sur la page d'accueil du moteur de recherche                              |
| Allows object copy overriding ingest template                                              | `aclCopyObjectOverridingPlaceholderTemplate` | Permet de copier un objet en overridant le template d'ingest                                         |
| Lock all objects and search access                                                         | `aclLockAssetObjectAccess`                   | Verrouille tous les objets et l'accès à la recherche                                                 |
| Allow BundleMaker editor access (under licence)                                            | `aclAssetBundlemaker`                        | Permet l'accès à l'éditeur BundleMaker (sous licence)                                                |
| Allow change asset status (under licence)                                                  | `aclObjectChangeStatus`                      | Permet de changer le statut d'un asset (sous licence)                                                |
| Allow quotas management view on asset                                                      | `aclQuotaObjectView`                         | Permet de voir la gestion des quotas sur l'asset                                                     |


## Main & global Features


| Nom                                                        | Tag                            | Description                                                               |
| ---------------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------- |
| Flag this group as Administrator? Useful for notifications | `aclAdmin`                     | Marque ce groupe comme administrateur (utile pour les notifications)      |
| Allows Backoffice Access                                   | `aclSectionBackofficeAccess`   | Permet l'accès au menu Back office                                        |
| Allows Search Engine                                       | `aclSectionSearchAccess`       | Permet l'accès au moteur de recherche d'assets                            |
| Allows Search Advanced Engine                              | `aclSearchAdvancedEnable`      | Permet l'accès au moteur de recherche avancée                             |
| Allows Orders                                              | `aclSectionOrderAccess`        | Permet l'accès au menu Orders                                             |
| Allows Reporting querying                                  | `aclSectionReportingAccess`    | Permet d'extraire des rapports depuis la plateforme via le menu "reports" |
| Allows Project Manager use                                 | `aclSectionProjectManager`     | Permet d'accéder au sous-menu de gestion des assets                       |
| Allows Clip creation                                       | `aclClipCreate`                | Permet de créer des clips depuis l'onglet proxy de la carte asset         |
| Allows Clip deletion                                       | `aclClipDelete`                | Permet de supprimer les clips créés précédemment                          |
| Allows Group Asset creation                                | `aclGroupCreate`               | Permet de créer des groupes d'assets                                      |
| Allows Screenshot frame from Proxy (low-res)               | `aclScreenshotFrame`           | Permet de créer des captures d'écran depuis le proxy (basse résolution)   |
| Allows Screenshot frame from Hi-Res                        | `aclScreenshotFrameHires`      | Permet de créer des captures d'écran en haute résolution                  |
| Allows to enable Watermark on player                       | `aclPlayerWatermarkLogin`      | Permet d'activer le watermark sur le Player                               |
| Allows Statistics Home Page viewer                         | `aclViewStats`                 | Permet de voir la page d'accueil des statistiques                         |
| Allows login emulation (CAUTION WITH THIS)                 | `aclLoginEmulate`              | Permet d'émuler la connexion d'un autre utilisateur (ATTENTION)           |
| Allows Download Platform documents                         | `aclPlatformDocumentsDownload` | Permet de télécharger les documents de la plateforme                      |
| Allows Job Rules Apply                                     | `aclJobRuleApply`              | Permet d'appliquer les règles de job                                      |
| Documents access and download                              | `aclDocumentsAccess`           | Permet d'accéder et télécharger les documents                             |
| Allow file transfer set expire now                         | `aclTransferExpire`            | Permet de faire expirer immédiatement un transfert de fichier             |
| Allow file transfer update                                 | `aclTransferUpdate`            | Permet de mettre à jour les transferts de fichiers                        |
| Allow use activity to post comments                        | `aclActivityAdd`               | Permet d'utiliser l'activité pour poster des commentaires                 |
| CAUTION: Lock everything on platform                       | `aclLockEverything`            | Verrouille tout sur la plateforme (ATTENTION)                             |
| Allow clear thumbnail cache                                | `aclThumbnailClearCache`       | Permet de vider le cache des miniatures                                   |
| Allow set reference thumbnail                              | `aclThumbnailSetRef`           | Permet de définir la miniature de référence                               |
| CAUTION: Allows bypass permissions                         | `aclBypassPermissions`         | Permet de bypass les permissions (ATTENTION)                              |


## Rights Management Features


| Nom                      | Tag                   | Description                                                      |
| ------------------------ | --------------------- | ---------------------------------------------------------------- |
| Allows Rights View       | `aclRightsView`       | Permet aux membres du groupe de voir le menu "rights management" |
| Allows Rights management | `aclRightsManagement` | Permet la gestion des droits                                     |


## Share & Screening Features


| Nom                                       | Tag                  | Description                                                        |
| ----------------------------------------- | -------------------- | ------------------------------------------------------------------ |
| Allows Shares View (Admin page)           | `aclShareView`       | Permet de voir la vue "shares and screening"                       |
| Allows Shares Create                      | `aclShareCreate`     | Permet de créer un lien de partage                                 |
| Allows Shares Delete                      | `aclShareDelete`     | Permet de supprimer un partage                                     |
| Allows Shares Update                      | `aclShareUpdate`     | Permet de mettre à jour un partage (nombre de vues et durée)       |
| Allows Fast mode Share (without burns)    | `aclFastModeShare`   | Permet de créer un partage en mode rapide (sans burns)             |
| Allows to delete the share clips          | `aclShareClipDelete` | Permet de supprimer les clips de partage                           |
| Allows to import the selected share clips | `aclShareClipImport` | Permet d'importer les clips de partage sélectionnés dans le panier |


## Title Management Features


| Nom                                            | Tag                          | Description                                                     |
| ---------------------------------------------- | ---------------------------- | --------------------------------------------------------------- |
| Allows to create new Title in Catalog glossary | `aclTitleCreate`             | Permet de créer un nouveau titre dans le glossaire du catalogue |
| Allows to update a Title in Catalog glossary   | `aclTitleUpdate`             | Permet de mettre à jour un titre dans le glossaire du catalogue |
| Allows to change a bundle Title status         | `aclBundleTitleStatusChange` | Permet de changer le statut d'un titre de bundle                |
| Allows to see Bundle Dashboard page            | `aclBundleDashboardView`     | Permet de voir la page dashboard des bundles                    |
| Restrict access to bundle only                 | `aclRestrictViewBundleOnly`  | Restreint l'accès aux bundles uniquement                        |


## Metadata Management Features


| Nom                                                               | Tag                                        | Description                                                                                 |
| ----------------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------- |
| Allows Metadata Update (Asset fields set)                         | `aclMetadataUpdate`                        | Permet de modifier les métadonnées au niveau asset                                          |
| Allows Metadata Update (Audio tracks table for class Raw)         | `aclMetadataAudioTracksUpdate`             | Permet de modifier le tableau des pistes audio pour la classe Raw                           |
| Allows Metadata Update (Asset fields set on Accepted Status)      | `aclMetadataUpdateWithAcceptedAssetStatus` | Permet de modifier les métadonnées au niveau asset, mais uniquement sur les assets acceptés |
| Allows Metadata Update (Content fields set)                       | `aclMetadataContentUpdate`                 | Permet de modifier les métadonnées au niveau content                                        |
| Allows Metadata Update (Title fields set)                         | `aclMetadataTitleUpdate`                   | Permet de modifier les métadonnées au niveau Title                                          |
| Allows Metadata Delete (Title fields set)                         | `aclMetadataTitleDelete`                   | Permet de supprimer un Title (seulement s'il est vide)                                      |
| Allows Asset Enable/Disable                                       | `aclMetadataAssetDisable`                  | Permet d'activer/désactiver un asset                                                        |
| Allows to move Asset to another Content (of same Title)           | `aclMetadataMoveLinkContentUpdate`         | Permet de déplacer un asset vers un autre content (du même titre)                           |
| Allows to move Asset to another Title                             | `aclMetadataMoveLinkTitleUpdate`           | Permet de déplacer un asset vers un autre titre                                             |
| Allows Metadata Export                                            | `aclMetadataExport`                        | Permet d'exporter les métadonnées                                                           |
| Allows to force the deletion of contents with only deleted assets | `aclDeleteMetadataContentAssetsDeleted`    | Permet de forcer la suppression des contenus avec uniquement des assets supprimés           |
| Allows to add new values in metadata field options list           | `aclMetadataFieldPopulate`                 | Permet d'ajouter de nouvelles valeurs dans la liste d'options des champs de métadonnées     |
| Allows to update assets metadata bulk                             | `aclImportMetadataBulk`                    | Permet la mise à jour en masse des métadonnées d'assets                                     |


## Markers Features


| Nom                             | Tag                       | Description                                     |
| ------------------------------- | ------------------------- | ----------------------------------------------- |
| Allows Insert or Update Markers | `aclMarkerCreateOrUpdate` | Permet d'insérer ou mettre à jour des marqueurs |
| Allows Delete Markers           | `aclMarkerDelete`         | Permet de supprimer des marqueurs               |


## Customer Management Features


| Nom                               | Tag                  | Description                                      |
| --------------------------------- | -------------------- | ------------------------------------------------ |
| Allows Customers Full List Access | `aclCustomersView`   | Permet d'accéder à la liste complète des clients |
| Allows Customers Insertion        | `aclCustomersCreate` | Permet de créer un client                        |
| Allows Customers Delete           | `aclCustomersDelete` | Permet de supprimer un client                    |


## Quality Check Features


| Nom                                           | Tag                              | Description                                                             |
| --------------------------------------------- | -------------------------------- | ----------------------------------------------------------------------- |
| Allows Full QC Request                        | `aclOrderQualityCheckCreate`     | Permet de commander un QC complet à VDM (fichiers MEZZ uniquement)      |
| Allows Qualify Request                        | `aclWorkflowQualifyCreate`       | Permet de commander une nouvelle qualification d'un asset depuis airlab |
| Allows QC/Qualify View                        | `aclWorkflowQualifyView`         | Permet de voir le sous-menu "QC and qualify Requests"                   |
| Enable Telestream Switch integration playback | `aclPlayTelestreamSwitch`        | Active l'intégration de lecture Telestream Switch                       |
| Allows Bypass or ask fix issue (marker)       | `aclMarkerBypassOrAskToFixIssue` | Permet de bypass ou demander de corriger un problème (marqueur)         |
| Allows change issue (marker) status to fixed  | `aclMarkerFixIssue`              | Permet de changer le statut d'un problème (marqueur) à corrigé          |


## Media Files Features


| Nom                                             | Tag                                 | Description                                                          |
| ----------------------------------------------- | ----------------------------------- | -------------------------------------------------------------------- |
| Allows Upload annex Media Files                 | `aclMediaFileUpload`                | Permet d'uploader des fichiers média annexes                         |
| Allows Download (direct link) Media Files       | `aclMediaFileDownload`              | Permet de télécharger les fichiers média (lien direct)               |
| Allows Delete Media Files (Annex Files only)    | `aclMediaFileDelete`                | Permet de supprimer les fichiers média (fichiers annexes uniquement) |
| Allows Download (direct link) Restricted Files  | `aclRestrictedFileDownload`         | Permet de télécharger les fichiers restreints (lien direct)          |
| Allows Add User Data                            | `aclFileUserDataAdd`                | Permet d'ajouter des données utilisateur                             |
| Allows Files download through transfer link     | `aclMakeTransferFileDownloadLink`   | Permet de télécharger des fichiers via un lien de transfert          |
| Allows Files User Data change status to Ready   | `aclFileChangeUserDataStatusReady`  | Permet de changer le statut des données utilisateur à "Ready"        |
| Restrict uploaded Media Files view to only mine | `aclFileRestrictViewUploadOnlyMine` | Restreint la vue des fichiers média uploadés à uniquement les miens  |
| Allows to run Subtitle Checker                  | `aclFileSubtitleCheck`              | Permet d'exécuter le vérificateur de sous-titres                     |
| Allows to override the Poster of a title        | `aclTitleOverridePoster`            | Permet de remplacer le poster d'un titre                             |
| Allows to override the Cover of a title         | `aclTitleOverrideCover`             | Permet de remplacer la couverture d'un titre                         |


## Audit Logs Features


| Nom                                | Tag                | Description                                   |
| ---------------------------------- | ------------------ | --------------------------------------------- |
| Allows to see the user action logs | `aclAuditLogsView` | Permet de voir les logs d'actions utilisateur |
| Allows to see metrics              | `aclMetricView`    | Permet de voir les métriques                  |


## ACL Elevation Features


| Nom                                     | Tag                          | Description                                          |
| --------------------------------------- | ---------------------------- | ---------------------------------------------------- |
| Allows to create ACL elevation requests | `aclElevationWishlistCreate` | Permet de créer des demandes d'élévation ACL         |
| Allows to delete ACL elevation requests | `aclElevationWishlistDelete` | Permet de supprimer des demandes d'élévation ACL     |
| Allows to update ACL elevation requests | `aclElevationWishlistUpdate` | Permet de mettre à jour des demandes d'élévation ACL |


## Dashboard Features


| Nom                                   | Tag                      | Description                                                |
| ------------------------------------- | ------------------------ | ---------------------------------------------------------- |
| Allows to see ingest's tab            | `aclDashboardTabIngest`  | Permet de voir l'onglet ingest sur le dashboard            |
| Allows to see orders's tab            | `aclDashboardTabOrders`  | Permet de voir l'onglet orders sur le dashboard            |
| Allows to see titles's tab            | `aclDashboardTabTitles`  | Permet de voir l'onglet titles sur le dashboard            |
| Allows to see notepad's tab           | `aclDashboardTabNotepad` | Permet de voir l'onglet notepad sur le dashboard           |
| Allows to see Rights Management's tab | `aclDashboardTabRight`   | Permet de voir l'onglet Rights Management sur le dashboard |


## Support Features


| Nom                                            | Tag                                   | Description                                                   |
| ---------------------------------------------- | ------------------------------------- | ------------------------------------------------------------- |
| Allows to see the tickets                      | `aclSupportTicketView`                | Permet de voir les tickets                                    |
| Allows to create the tickets                   | `aclSupportTicketCreate`              | Permet de créer des tickets                                   |
| Allows to update the tickets                   | `aclSupportTicketUpdate`              | Permet de mettre à jour les tickets                           |
| Allows to comment the tickets                  | `aclSupportTicketComment`             | Permet de commenter les tickets                               |
| Allows to delete the tickets                   | `aclSupportTicketDelete`              | Permet de supprimer des tickets                               |
| Allows to see the tickets from backlog         | `aclSupportTicketBacklog`             | Permet de voir les tickets du backlog                         |
| Allows to see the onboarding tickets           | `aclSupportOnboardingView`            | Permet de voir les tickets d'onboarding                       |
| Allows to upload and delete platform documents | `aclPlatformDocumentsUploadAndDelete` | Permet d'uploader et supprimer les documents de la plateforme |


## Confidentiality Features


| Nom                                                                                    | Tag                                            | Description                                                                    |
| -------------------------------------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------ |
| Allows to activate or not the confidentiality on a Title or force watermark on a Title | `aclTitleConfidentialitySet`                   | Permet d'activer ou non la confidentialité sur un titre ou forcer le watermark |
| Allows to play a confidential Title                                                    | `aclTitleConfidentialityPlay`                  | Permet de lire un titre confidentiel                                           |
| Allows to request an asset creation from a confidential Title                          | `aclTitleConfidentialityIngestRequestCreation` | Permet de demander la création d'un asset depuis un titre confidentiel         |
| Allows to order from a confidential Title                                              | `aclTitleConfidentialityOrders`                | Permet de commander depuis un titre confidentiel                               |
| Allows to share media from a confidential Title                                        | `aclTitleConfidentialityShares`                | Permet de partager des médias depuis un titre confidentiel                     |


## External Links


| Nom                              | Tag                    | Description                       |
| -------------------------------- | ---------------------- | --------------------------------- |
| Allows to see the external links | `aclExternalLinksView` | Permet de voir les liens externes |


## Planning & User Tasks


| Nom                                          | Tag                         | Description                                                    |
| -------------------------------------------- | --------------------------- | -------------------------------------------------------------- |
| Allows to view Planning User Tasks Dashboard | `aclPlanningUserTaskView`   | Permet de voir le dashboard des tâches utilisateur de planning |
| Allows to update Planning User Task          | `aclPlanningUserTaskUpdate` | Permet de mettre à jour les tâches utilisateur de planning     |
| Allows to assign Planning User Task          | `aclPlanningUserTaskAssign` | Permet d'assigner des tâches utilisateur de planning           |


## Scriber Tool (Online Subtitling)


| Nom                                 | Tag                      | Description                               |
| ----------------------------------- | ------------------------ | ----------------------------------------- |
| Allows to access to Scriber Tool    | `aclScriberAccess`       | Permet d'accéder à l'outil Scriber        |
| Allows to create Subtitling Project | `aclScribeProjectCreate` | Permet de créer un projet de sous-titrage |


## Price rules


| Nom                          | Tag                            | Description                             |
| ---------------------------- | ------------------------------ | --------------------------------------- |
| Allows configure price rules | `aclOrderPriceRuleView`        | Permet de configurer les règles de prix |
| Allows to create price rules | `aclOrderPriceRuleCreate`      | Permet de créer des règles de prix      |
| Allows to delete price rules | `aclOrderPriceRuleDelete`      | Permet de supprimer des règles de prix  |
| Enables price rule matching  | `aclOrderPriceRuleMatchEnable` | Active le matching des règles de prix   |


## Timetool (under Licence)


| Nom                | Tag           | Description                       |
| ------------------ | ------------- | --------------------------------- |
| Enable full Access | `aclTimetool` | Active l'accès complet à Timetool |


## Connect (under Licence)


| Nom                                                                | Tag                     | Description                                                                |
| ------------------------------------------------------------------ | ----------------------- | -------------------------------------------------------------------------- |
| Enable Link possibility between VDM Connect and Mediaspot Titles   | `aclConnectLinkTitle`   | Active la possibilité de lier VDM Connect et les titres Mediaspot          |
| Enable Import possibility between VDM Connect and Mediaspot Titles | `aclConnectImportTitle` | Active la possibilité d'importer entre VDM Connect et les titres Mediaspot |


## Spock


| Nom                                                                   | Tag                     | Description                                                                        |
| --------------------------------------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------- |
| Enable Sync possibility between Mediaspot Title and Spock Agent Title | `aclSyncTitleFromSpock` | Active la possibilité de synchronisation entre les titres Mediaspot et Spock Agent |


## User access


| Nom                                | Tag                   | Description                                    |
| ---------------------------------- | --------------------- | ---------------------------------------------- |
| Allows to view assets permissions  | `aclPermissionView`   | Permet de voir les permissions des assets      |
| Allows deleting assets permissions | `aclPermissionDelete` | Permet de supprimer les permissions des assets |
| Allows assets permission editing   | `aclPermissionSet`    | Permet de modifier les permissions des assets  |


## KDM


| Nom                          | Tag                    | Description                           |
| ---------------------------- | ---------------------- | ------------------------------------- |
| Allows upload DKDM/KDM       | `aclKdmUpload`         | Permet d'uploader des DKDM/KDM        |
| Allows manage KDM recipients | `aclKdmRecipientAdmin` | Permet de gérer les destinataires KDM |


## Drive features


| Nom                                              | Tag                        | Description                                                           |
| ------------------------------------------------ | -------------------------- | --------------------------------------------------------------------- |
| Allows Drive access                              | `aclDrive`                 | Permet l'accès au Drive                                               |
| Allows trash/untrash Drive items                 | `aclObjectTrashPut`        | Permet de mettre/retirer des éléments Drive de la corbeille           |
| Allows to delete permanently Drive trashed items | `aclObjectTrashDelete`     | Permet de supprimer définitivement les éléments Drive de la corbeille |
| Allows to view Drive trash content               | `aclObjectTrashView`       | Permet de voir le contenu de la corbeille Drive                       |
| Restrict access to Drive only                    | `aclDistributionDriveOnly` | Restreint l'accès au Drive uniquement                                 |


## Billing


| Nom                                                        | Tag                         | Description                                                 |
| ---------------------------------------------------------- | --------------------------- | ----------------------------------------------------------- |
| Allows billing dashboard access                            | `aclBillingAccess`          | Permet l'accès au dashboard de facturation                  |
| Allows billing expense add                                 | `aclBillingAddExpense`      | Permet d'ajouter des dépenses                               |
| Allows billing invoice validation                          | `aclBillingValidateInvoice` | Permet de valider les factures                              |
| Allows billing change plan                                 | `aclBillingChangePlan`      | Permet de changer de plan                                   |
| CAUTION: Allows billing unsubscribe offer & close platform | `aclBillingUnsubscribe`     | Permet de se désabonner et fermer la plateforme (ATTENTION) |


## Collections


| Nom                                      | Tag                            | Description                                           |
| ---------------------------------------- | ------------------------------ | ----------------------------------------------------- |
| Allows storefront collections management | `aclCollectionStorefrontAdmin` | Permet la gestion des collections storefront          |
| Allows share collection to group         | `aclCollectionShareToGroup`    | Permet de partager une collection avec un groupe      |
| Allows share collection to user          | `aclCollectionShareToUser`     | Permet de partager une collection avec un utilisateur |


## Providers


| Nom                                                             | Tag                                  | Description                                                                             |
| --------------------------------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------- |
| Restrict providers to access only titles where they own request | `aclRestrictProviderTitlesToRequest` | Restreint les fournisseurs à accéder uniquement aux titres où ils possèdent une demande |
| Restrict providers to access only assets where they own request | `aclRestrictProviderAssetsToRequest` | Restreint les fournisseurs à accéder uniquement aux assets où ils possèdent une demande |


## External accesses


| Nom                                                    | Tag                               | Description                                                   |
| ------------------------------------------------------ | --------------------------------- | ------------------------------------------------------------- |
| Allows to create or update an external access          | `aclExternalAccessCreateOrUpdate` | Permet de créer ou mettre à jour un accès externe             |
| Allows to revoke an external access                    | `aclExternalAccessRevoke`         | Permet de révoquer un accès externe                           |
| Allows to view external accesses on assets             | `aclExternalAccessView`           | Permet de voir les accès externes sur les assets              |
| Allows to view all external accesses in dashboard page | `aclExternalAccessViewAll`        | Permet de voir tous les accès externes dans la page dashboard |


## Storefront


| Nom                                         | Tag                   | Description                                         |
| ------------------------------------------- | --------------------- | --------------------------------------------------- |
| Allows to access storefronts administration | `aclManageStorefront` | Permet d'accéder à l'administration des storefronts |


