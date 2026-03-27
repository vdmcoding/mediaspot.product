# ACL Reference

## Ingest Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Placeholder Requests Creation | `aclIngestPlaceholderCreate` | Permet de créer des demandes de placeholder ("create new requests" submenu) |
| Allow Configuration Creation | `aclIngestConfigCreation` | Permet de créer des configurations ("configuration manager" submenu) |
| Allow for my linked Provider Lab(s) Requests Monitoring | `aclIngestWishListView` | Si vous avez une association de groupe avec un ou plusieurs labs fournisseurs, permet de voir le sous-menu "monitor" |
| Allow All (Override) Requests Monitoring | `aclIngestWishListViewAll` | Permet de voir toutes les requêtes dans le sous-menu "monitor" |
| Enable Access Level filter on Requests Monitoring | `aclIngestEnableAccessLevelFilter` | Les requêtes sont filtrées dans le sous-menu "monitor" selon les droits "level access" du groupe (AllMyPlatform, OnlyMyPlatformGroup, OnlyMine) |
| Allow File Upload (by Aspera) | `aclIngestUpload` | Permet aux membres du groupe d'uploader un fichier quand demandé |
| Allow File Ingest Monitoring | `aclIngestMonitor` | Affiche le sous-menu monitor dans le menu ingest |
| Allow Requests Assignation to a Lab Provider | `aclIngestAssignToLabProvider` | Dans "upload file request", permet de changer le lab fournisseur |
| Allow Rejections Manager View | `aclIngestRejectionsView` | Permet de voir le sous-menu "rejections manager" |
| Allow Rejections Manager Bypass decision | `aclIngestRejectionsBypass` | Permet de voir et cliquer sur le pouce bleu pour bypass la décision QC dans le menu "rejections manager" |
| Allow All (Override) Rejections Manager Bypass decision | `aclIngestRejectionsBypassOverwrite` | Permet de bypass un asset rejeté même si l'option bypass n'a pas été accordée durant la qualification |
| Allow Requests Deletion | `aclIngestDeleteRequest` | Permet de supprimer les requêtes rejetées (comme les requêtes d'upload) |
| Allow the Creation of new Config Columns | `aclIngestConfigColumnSetCreate` | Permet d'ajouter un nouveau champ Data dans la section Configuration Manager |
| Allow the Update of new Config Columns | `aclIngestConfigColumnSetUpdate` | Permet de mettre à jour les champs Data dans la section Configuration Manager |
| Allow Placeholder Remind | `aclIngestPlaceholderRemind` | Permet d'envoyer des rappels pour les placeholders |
| Allow Assign Priority | `aclIngestAssignPriority` | Permet d'assigner une priorité aux requêtes d'ingest |

## Back Office Admin Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow User/Group list View | `aclBackofficeUserListView` | Permet de voir les sous-menus user et group |
| Allow User/Group Creation | `aclBackofficeUserCreate` | Permet de créer des groupes et utilisateurs dans chaque sous-menu |
| Allow User/Group Deletion | `aclBackofficeUserDelete` | Permet de les supprimer dans les mêmes sous-menus |
| Allow Lab Provider Creation | `aclBackofficeLabProviderCreate` | Permet de créer un fournisseur (fonctionnalité non encore disponible) |
| Allow Mailing List View | `aclBackofficeMailinglistView` | Permet de voir le sous-menu "mailing list management" |
| Allow Mailing List Creation | `aclBackofficeMailinglistCreate` | Permet de créer ou non une mailing list |
| Allow Ldap User list View | `aclBackofficeUserLdapSync` | Permet de voir la liste des utilisateurs connectés via l'active directory |
| Manual Tasks Template Creation | `aclBackofficeManualTasksCreate` | Sous-menu + droit de création des templates de tâches manuelles |
| Manual Tasks Template Deletion | `aclBackofficeManualTasksDelete` | Sous-menu + droit de suppression des templates de tâches manuelles |
| Audit Logs Admin Access | `aclBackofficeAuditLogsView` | Ajoute un sous-menu dans le back office pour voir le log des actions utilisateur |
| Transfers Dashboard Access | `aclBackofficeTransferListView` | Permet d'accéder à la page File Transfers (dans le menu Admin Backoffice) |
| Allow Back office Access | `aclSectionBackofficeAccess` | Pour les administrateurs de site. Accès au menu Back office |
| Allow Workflow Admin operations | `aclBackofficeWorkflowAdmin` | Permet les modifications de commandes, annulation, retry order/ingest, définir le niveau de priorité, et autres modifications admin |
| Allow Delivery Product View | `aclBackofficeDeliveryProductView` | Permet de voir les produits de livraison |
| Allow Delivery Product Update | `aclBackofficeDeliveryProductUpdate` | Permet de modifier les produits de livraison |
| Allow Quotas View | `aclBackofficeQuotasView` | Permet de voir les quotas dans le backoffice |
| Allow YouTube Channel Management | `aclBackofficeYoutubeChannel` | Permet de gérer les chaînes YouTube |

## Workflow Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Workflow View | `aclWorkflowView` | Permet de voir les workflows |
| Allow Purge Workflow List View | `aclWorkflowPurgeView` | Permet d'accéder à la page Purge Requests Manager |
| Allow Purge Workflow Creation (Media File Purge) | `aclWorkflowPurgeCreate` | Permet de demander une purge. Les assets peuvent avoir les statuts: "accepted", "need check or editing", "rejected" |
| Allow Purge Workflow Creation on Accepted Asset status | `aclWorkflowPurgeCreateWithAcceptedAssetStatus` | Permet de demander une purge uniquement sur les assets acceptés |
| Allow Qualify Request | `aclWorkflowQualifyCreate` | Permet à l'utilisateur de commander une nouvelle qualification d'un asset (uniquement fichier MEZZ) depuis airlab |
| Allow QC/Qualify View | `aclWorkflowQualifyView` | Permet de voir le sous-menu "QC and qualify Requests" sous asset management |
| Allow Workflow Assign Followers | `aclWorkflowAssignFollowers` | Permet d'assigner des followers aux workflows |

## Order Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Play/Start Order | `aclOrderStart` | Démarre manuellement un workflow de commande |
| Allow Auto-Play Order without Approval | `aclOrderPlayWithoutApproval` | Permet de passer des commandes qui démarrent automatiquement sans confirmation d'un autre utilisateur |
| Allow Cancel Order | `aclOrderCancel` | Permet de supprimer une commande depuis le Purchased Monitor |
| Allow Generated Asset Ingest | `aclOrderIngestGenerated` | Permet d'ingérer un fichier généré par VDM-Digital Factory. Les métadonnées "generated" seront ajoutées automatiquement |
| Allow Assign Cost Benefit center | `aclOrderAssignBenefitCostLinkCreate` | Permet de lier une commande à un centre de coût/bénéfice préconfiguré |
| Allow Order Update | `aclOrderUpdate` | Permet de modifier la commande dans le purchased monitor |
| Allow Item Issue Management | `aclOrderManageItemIssues` | Permet d'ajouter un commentaire concernant un problème sur les commandes livrées |
| Allow Assign Follower | `aclOrderAssignFollowers` | Permet d'assigner un utilisateur supplémentaire pour suivre une commande ou un ingest |
| Allow Assign Priority | `aclOrderAssignPriority` | Paramètres de priorité pour les commandes dans purchased monitor |
| Allow to access to Manual Tasks Templates | `aclOrderManualTaskView` | Permet d'accéder à la page Manual Tasks Template |
| Allow to override Prices on Check-out | `aclOrderOverrideItemPrice` | Permet de définir le prix souhaité sur la facture de n'importe quelle commande |
| Allow to override Customers on Check-out | `aclOrderOverrideItemCustomer` | Permet de modifier le client sur une commande passée depuis un contrat spécifique |
| Allow to see Order option due date | `aclOrderDueDate` | Permet de voir et définir une date d'échéance |
| Allow to see Order option major delivery | `aclOrderIsImportant` | Permet de voir et cocher la case (état par défaut: false) |
| Show "enable audio only format" button | `aclOrderAudioOnly` | Affiche le bouton "enable audio only format" dans les options transcodegeneric |
| Show Watermarking tab | `aclOrderWatermarcking` | Affiche l'onglet Watermarking dans les options transcodegeneric |
| Allow Order Approve | `aclOrderApprove` | Permet l'approbation des commandes |
| Allow Order Manual Task | `aclOrderManualTask` | Permet d'utiliser le produit Manual Task dans les commandes |
| Allow Order Warnings | `aclOrderWarnings` | Permet de voir les avertissements des commandes |
| Allow Order Contract Auto Select | `aclOrderContractAutoSelect` | Permet la sélection automatique du contrat |
| Allow Order Ingest Link View | `aclOrderIngestLinkView` | Permet de voir le lien vers l'ingest dans les commandes |
| Allow Order Mask Non Available | `aclOrderMaskNonAvailable` | Permet de masquer les éléments non disponibles |
| Allow Order Attach File | `aclOrderAttachFile` | Permet d'attacher des fichiers aux commandes |
| Allow Order Enable Product Transcode As Mezz | `aclOrderEnableProductTranscodeAsMezz` | Permet d'activer le transcodage produit comme Mezz |
| Allow Order Schedule | `aclOrderSchedule` | Permet de planifier les commandes |
| Allow Order Resend Transfer Email | `aclOrderResendTransferEmail` | Permet de renvoyer l'email de transfert |
| Allow Send Ack Billing Manually | `aclorderSendAckBillingManually` | Permet d'envoyer manuellement l'accusé de facturation |

## Order Price Rules

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Order Price Rule View | `aclOrderPriceRuleView` | Permet de voir les règles de prix des commandes |
| Allow Order Price Rule Create | `aclOrderPriceRuleCreate` | Permet de créer/éditer les règles de prix des commandes |
| Allow Order Price Rule Delete | `aclOrderPriceRuleDelete` | Permet de supprimer les règles de prix des commandes |
| Allow Order Price Rule Match Enable | `aclOrderPriceRuleMatchEnable` | Permet d'activer le matching des règles de prix |

## Order Quotes

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Order Quote View | `aclOrderQuoteView` | Permet de voir les devis |
| Allow Order Quote Request | `aclOrderQuoteRequest` | Permet de demander un devis |
| Allow Order Quote Validate | `aclOrderQuoteValidate` | Permet de valider un devis |

## Asset Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow to see Tools View | `aclAssetToolsView` | Permet de voir le raccourci vers le panier sur le côté gauche de la page asset |
| Allow to see Quick View | `aclAssetQuickView` | Permet de voir la vue rapide de l'asset |
| Allow Asset Delete | `aclAssetDelete` | Permet de supprimer un asset |
| Allow Asset PDF Export | `aclAssetPdfExport` | Permet d'exporter un asset en PDF |
| Allow Asset Bundlemaker | `aclAssetBundlemaker` | Permet d'utiliser le bundlemaker |
| Allow Asset Hide Empty Objects | `aclAssetHideEmptyObjects` | Permet de masquer les objets vides |
| Allow Asset Restrict To Follower | `aclAssetRestrictToFollower` | Permet de restreindre l'asset aux followers |
| Allow Disable Asset Access | `aclDisableAssetAccess` | Permet de désactiver l'accès à l'asset |
| Allow Lock Asset Object Access | `aclLockAssetObjectAccess` | Permet de verrouiller l'accès à l'objet asset |

## Main & Global Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Lock Everything | `aclLockEverything` | Verrouille tout |
| Admin | `aclAdmin` | Droits administrateur |
| Super User | `aclSuperUser` | Super utilisateur |
| Allow Search Engine | `aclSectionSearchAccess` | Pour tous les utilisateurs de la plateforme. Accès au menu de recherche d'assets |
| Allow Orders | `aclSectionOrderAccess` | Uniquement pour ceux qui passent des commandes. Accès au menu Orders |
| Allow Reporting querying | `aclSectionReportingAccess` | Permet d'extraire des rapports depuis la plateforme via le menu "reports" |
| Allow Project Manager use | `aclSectionProjectManager` | Permet d'accéder au sous-menu de gestion des assets |
| Allow Clip creation | `aclClipCreate` | Permet de créer des clips depuis l'onglet proxy de la carte asset de n'importe quel asset vidéo MEZZ & RAW, et de les commander pour transcodage et livraison |
| Allow Clip deletion | `aclClipDelete` | Permet de supprimer les clips créés précédemment |
| Allow Screenshot frame | `aclScreenshotFrame` | Permet de créer des captures d'écran depuis le proxy asset de n'importe quel asset vidéo MEZZ & RAW |
| Allow Screenshot frame Hires | `aclScreenshotFrameHires` | Permet de créer des captures d'écran en haute résolution |
| Allow to enable Watermark on Player | `aclPlayerWatermarkLogin` | Permet d'activer le watermark sur le Player |
| Allow View Stats | `aclViewStats` | Permet de voir les statistiques |
| Allow Search Advanced Enable | `aclSearchAdvancedEnable` | Permet d'activer la recherche avancée |
| Allow Search Show Recent Titles | `aclSearchShowRecentTitles` | Permet d'afficher les titres récents dans la recherche |
| Allow Documents Access | `aclDocumentsAccess` | Permet d'accéder aux documents |
| Allow External Links View | `aclExternalLinksView` | Permet de voir les liens externes |
| Allow Timetool | `aclTimetool` | Permet d'utiliser l'outil de temps |
| Allow Login Emulate | `aclLoginEmulate` | Permet d'émuler la connexion d'un autre utilisateur |
| Allow Bypass Permissions | `aclBypassPermissions` | Permet de bypass les permissions |
| Allow Segment Cut View | `aclSegmentCutView` | Permet de voir les coupes de segments |

## Rights Management Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Rights View | `aclRightsView` | Permet aux membres du groupe de voir le menu "rights management" |

## Shares & Screenings Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Shares View (Admin page) | `aclShareView` | Permet de voir la vue "shares and screening" |
| Allow Shares Create | `aclShareCreate` | Permet de créer un lien de partage (depuis la vue recherche au niveau oeuvre ou asset) |
| Allow Shares Delete | `aclShareDelete` | Dans le sous-menu "shares and screening", permet de voir et utiliser le bouton supprimer |
| Allow Shares Update | `aclShareUpdate` | Permet de mettre à jour (nombre de vues et durée du partage) |
| Allow Fast mode Share (without burns) | `aclFastModeShare` | Dans la vue recherche, lors de la création d'un partage, permet de voir et sélectionner "fast mode" sous le menu déroulant sécurité |
| Allow to delete the share clips | `aclShareClipDelete` | Permet de supprimer les clips de la liste des clips demandés par l'utilisateur sur une page Media Share |
| Allow to import the selected share clips | `aclShareClipImport` | Permet d'ajouter les clips demandés par l'utilisateur sur une page Media Share à votre panier pour transcodage et livraison |

## Title Management Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Create new Title in Catalog | `aclTitleCreate` | Permet de créer un nouveau titre à partir de zéro |
| Allow Title Update | `aclTitleUpdate` | Permet de mettre à jour un titre |
| Allow Title Confidentiality Set | `aclTitleConfidentialitySet` | Permet de définir la confidentialité d'un titre |
| Allow Title Confidentiality Play | `aclTitleConfidentialityPlay` | Permet de lire les titres confidentiels |
| Allow Title Confidentiality Ingest Request Creation | `aclTitleConfidentialityIngestRequestCreation` | Permet de créer des requêtes d'ingest pour les titres confidentiels |
| Allow Title Confidentiality Orders | `aclTitleConfidentialityOrders` | Permet de commander sur les titres confidentiels |
| Allow Title Confidentiality Shares | `aclTitleConfidentialityShares` | Permet de partager les titres confidentiels |
| Allow Title Restricted Infos View | `aclTitleRestrictedInfosView` | Permet de voir les informations restreintes des titres |
| Allow Title Override Poster | `aclTitleOverridePoster` | Permet de remplacer le poster du titre |
| Allow Title Override Cover | `aclTitleOverrideCover` | Permet de remplacer la couverture du titre |
| Allow Connect Link Title | `aclConnectLinkTitle` | Permet de lier un titre via Connect |
| Allow Connect Import Title | `aclConnectImportTitle` | Permet d'importer un titre via Connect |
| Allow Sync Title From Spock | `aclSyncTitleFromSpock` | Permet de synchroniser un titre depuis Spock |

## Metadata Management Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Metadata Update (Asset fields set) | `aclMetadataUpdate` | Permet de modifier les métadonnées au niveau asset (depuis la vue carte asset) |
| Allow Metadata Update (Asset fields set on Accepted Status) | `aclMetadataUpdateWithAcceptedAssetStatus` | Permet de modifier les métadonnées au niveau asset, mais uniquement sur les assets acceptés |
| Allow Metadata Update (Content fields set) | `aclMetadataContentUpdate` | Permet de modifier les métadonnées au niveau content (depuis la page content) |
| Allow Metadata Update (Œuvre fields set) | `aclMetadataTitleUpdate` | Permet de modifier les métadonnées au niveau Title (page œuvre) |
| Allow Metadata Delete (Œuvre fields set) | `aclMetadataTitleDelete` | Permet de supprimer un Title, seulement s'il est vide (aucun fichier média lié au placeholder) |
| Allow Asset Enable/Disable | `aclMetadataAssetDisable` | Permet de désactiver un asset. Il reste présent dans le MAM mais ne peut pas être ajouté à un panier |
| Allow to see the metadata deleted assets | `aclMetadataAssetViewDeleted` | Permet de voir les requêtes ou assets supprimés. Ils apparaissent avec un statut "DELETED" |
| Allow to move Asset to another Content (of same Title) | `aclMetadataMoveLinkContentUpdate` | Permet de déplacer un asset d'un content à un autre au sein du même titre. Si c'est un asset MEZZ, il retourne automatiquement au statut "TO BE QCED" |
| Allow to move Asset to another Title | `aclMetadataMoveLinkTitleUpdate` | Permet de déplacer un asset d'un titre à un autre. Si c'est un asset MEZZ, il retourne automatiquement au statut "TO BE QCED" |
| Allow Metadata Export | `aclMetadataExport` | Permet d'exporter les métadonnées |
| Allow Metadata Content View Deleted | `aclMetadataContentViewDeleted` | Permet de voir les contenus supprimés |
| Allow Delete Metadata Content Assets Deleted | `aclDeleteMetadataContentAssetsDeleted` | Permet de supprimer les assets de contenu marqués comme supprimés |
| Allow Metadata Title View Deleted | `aclMetadataTitleViewDeleted` | Permet de voir les titres supprimés |
| Allow Metadata Audio Tracks Update | `aclMetadataAudioTracksUpdate` | Permet de modifier les pistes audio |
| Allow Metadata Field Populate | `aclMetadataFieldPopulate` | Permet de peupler les champs de métadonnées |
| Allow Import Metadata Bulk | `aclImportMetadataBulk` | Permet l'import en masse de métadonnées |

## Customer Management Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Customers Full List Access | `aclCustomersView` | Permet d'accéder à la page 'Customers Management' |
| Allow Customers Insertion | `aclCustomersCreate` | Permet de créer un client depuis la page 'Customers Management' |
| Allow Customers Delete | `aclCustomersDelete` | Permet de supprimer un client depuis la page 'Customers Management' |

## Quality Check Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Full QC Request | `aclOrderQualityCheckCreate` | Permet de commander un QC complet à VDM. Fonctionne uniquement avec les fichiers média MEZZ |

## Media Files (annex) Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Upload annex Media Files | `aclMediaFileUpload` | Permet d'uploader un fichier annexe visible en scrollant sur la page d'une carte asset |
| Allow Download (direct link) Media Files | `aclMediaFileDownload` | Permet de télécharger ces fichiers annexes |
| Allow Delete Media Files | `aclMediaFileDelete` | Permet de supprimer les fichiers média |
| Allow Download (direct link) Restricted Files | `aclRestrictedFileDownload` | Permet de télécharger les fichiers proxy directement depuis la page de carte asset |

## Audit Logs Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow to see the user action logs | `aclAuditLogsView` | Permet de voir une quatrième fenêtre dans la vue média, près de asset et metadata |

## Dashboard Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow to see ingest's tab | `aclDashboardTabIngest` | Permet de voir le module ingest sur la page d'accueil |
| Allow to see orders's tab | `aclDashboardTabOrders` | Permet de voir le module orders sur la page d'accueil |
| Allow to see titles's tab | `aclDashboardTabTitles` | Permet de voir le module titles sur la page d'accueil |
| Allow to see notepad's tab | `aclDashboardTabNotepad` | Permet de voir le module notepad sur la page d'accueil |
| Allow to see Rights Management's tab | `aclDashboardTabRight` | Permet de voir l'onglet Rights Management sur la page d'accueil |

## ACL Elevation Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow to create ACL elevation requests | `aclElevationWishlistCreate` | Permet à un utilisateur sans droits suffisants de demander le droit de purger, déplacer un asset ou bypass un rejet |
| Allow to delete ACL elevation requests | `aclElevationWishlistDelete` | Permet (manager) de rejeter et supprimer les demandes d'élévation ACL |
| Allow to update ACL elevation requests | `aclElevationWishlistUpdate` | Permet (manager) d'accepter une demande d'élévation ACL et définir un délai pour l'utilisateur |

## Marker Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Marker Create Or Update | `aclMarkerCreateOrUpdate` | Permet de créer ou modifier des marqueurs |
| Allow Marker Delete | `aclMarkerDelete` | Permet de supprimer des marqueurs |
| Allow Marker Bypass Or Ask To Fix Issue | `aclMarkerBypassOrAskToFixIssue` | Permet de bypass ou demander de corriger un problème via marqueur |
| Allow Marker Fix Issue | `aclMarkerFixIssue` | Permet de marquer un problème comme corrigé |

## Support Ticket Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Support Ticket View | `aclSupportTicketView` | Permet de voir les tickets support |
| Allow Support Ticket Create | `aclSupportTicketCreate` | Permet de créer des tickets support |
| Allow Support Ticket Update | `aclSupportTicketUpdate` | Permet de mettre à jour les tickets support |
| Allow Support Ticket Comment | `aclSupportTicketComment` | Permet de commenter les tickets support |
| Allow Support Ticket Delete | `aclSupportTicketDelete` | Permet de supprimer des tickets support |
| Allow Support Ticket Backlog | `aclSupportTicketBacklog` | Permet de voir le backlog des tickets support |
| Allow Support Onboarding View | `aclSupportOnboardingView` | Permet de voir l'onboarding support |

## Platform Documents Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Platform Documents Download | `aclPlatformDocumentsDownload` | Permet de télécharger les documents de la plateforme |
| Allow Platform Documents Upload And Delete | `aclPlatformDocumentsUploadAndDelete` | Permet d'uploader et supprimer les documents de la plateforme |

## User Task Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow User Task View | `aclUserTaskView` | Permet de voir les tâches utilisateur (concerne les tâches des workflows) |
| Allow User Task Update | `aclUserTaskUpdate` | Permet de mettre à jour les tâches utilisateur (concerne les tâches des workflows) |

## Planning User Task Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Planning User Task View | `aclPlanningUserTaskView` | Permet de voir les tâches de planning utilisateur |
| Allow Planning User Task Update | `aclPlanningUserTaskUpdate` | Permet de mettre à jour les tâches de planning utilisateur |
| Allow Planning User Task Assign | `aclPlanningUserTaskAssign` | Permet d'assigner les tâches de planning utilisateur |

## File User Data Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow File User Data Add | `aclFileUserDataAdd` | Permet d'ajouter des données utilisateur aux fichiers |
| Allow File User Data Update | `aclFileUserDataUpdate` | Permet de mettre à jour les données utilisateur des fichiers (non utilisé) |
| Allow File User Data Delete | `aclFileUserDataDelete` | Permet de supprimer les données utilisateur des fichiers (non utilisé) |
| Allow File Change User Data Status Ready | `aclFileChangeUserDataStatusReady` | Permet de changer le statut des données utilisateur à "ready" |
| Allow File Restrict View Upload Only Mine | `aclFileRestrictViewUploadOnlyMine` | Restreint la vue aux fichiers uploadés par l'utilisateur uniquement |
| Allow File Subtitle Check | `aclFileSubtitleCheck` | Permet de vérifier les sous-titres |

## Switch Class Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Switch Class To Raw | `aclSwitchClassToRaw` | Permet de changer la classe en RAW |
| Allow Switch Class To Mezz | `aclSwitchClassToMezz` | Permet de changer la classe en MEZZ |

## Scriber Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Scriber Access | `aclScriberAccess` | Permet d'accéder à Scriber |
| Allow Scribe Project Create | `aclScribeProjectCreate` | Permet de créer des projets Scribe |

## Permission Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Permission View | `aclPermissionView` | Permet de voir les permissions |
| Allow Permission Set | `aclPermissionSet` | Permet de définir les permissions |
| Allow Permission Delete | `aclPermissionDelete` | Permet de supprimer les permissions |

## Metric Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Metric View | `aclMetricView` | Permet de voir les métriques |

## Object Trash Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Object Trash Put | `aclObjectTrashPut` | Permet de mettre des objets à la corbeille |
| Allow Object Trash View | `aclObjectTrashView` | Permet de voir la corbeille |
| Allow Object Trash Delete | `aclObjectTrashDelete` | Permet de supprimer définitivement de la corbeille |
| Allow Object Change Status | `aclObjectChangeStatus` | Permet de changer le statut d'un objet |

## Collection Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Collection Storefront Admin | `aclCollectionStorefrontAdmin` | Permet d'administrer le storefront des collections |
| Allow Manage Storefront | `aclManageStorefront` | Permet de gérer le storefront |
| Allow Collection Share To Group | `aclCollectionShareToGroup` | Permet de partager une collection avec un groupe |
| Allow Collection Share To User | `aclCollectionShareToUser` | Permet de partager une collection avec un utilisateur |

## Transfer Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Transfer Expire | `aclTransferExpire` | Permet de faire expirer les transferts |
| Allow Transfer Update | `aclTransferUpdate` | Permet de mettre à jour les transferts |
| Allow Make Transfer File Download Link | `aclMakeTransferFileDownloadLink` | Permet de créer des liens de téléchargement pour les fichiers de transfert |

## Group Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Group Create | `aclGroupCreate` | Permet de créer des groupes |
| Allow Group Role Manage | `aclGroupRoleManage` | Permet de gérer les rôles des groupes |

## Job Rule Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Job Rule Apply | `aclJobRuleApply` | Permet d'appliquer les règles de job |

## Copy Object Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Copy Object Overriding Placeholder Template | `aclCopyObjectOverridingPlaceholderTemplate` | Permet de copier un objet en overridant le template placeholder |

## Activity Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Activity Add | `aclActivityAdd` | Permet d'ajouter des activités |

## KDM Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow KDM Upload | `aclKdmUpload` | Permet d'uploader des KDM |
| Allow KDM Recipient Admin | `aclKdmRecipientAdmin` | Permet d'administrer les destinataires KDM |

## Billing Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Billing Access | `aclBillingAccess` | Permet d'accéder à la facturation |
| Allow Billing Add Expense | `aclBillingAddExpense` | Permet d'ajouter des dépenses |
| Allow Billing Validate Invoice | `aclBillingValidateInvoice` | Permet de valider les factures |
| Allow Billing Change Plan | `aclBillingChangePlan` | Permet de changer de plan |
| Allow Billing Unsubscribe | `aclBillingUnsubscribe` | Permet de se désabonner |

## Restrict Provider Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Restrict Provider Titles To Request | `aclRestrictProviderTitlesToRequest` | Restreint les titres du fournisseur aux demandes |
| Allow Restrict Provider Assets To Request | `aclRestrictProviderAssetsToRequest` | Restreint les assets du fournisseur aux demandes |

## Thumbnail Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Thumbnail Clear Cache | `aclThumbnailClearCache` | Permet de vider le cache des miniatures |
| Allow Thumbnail Set Ref | `aclThumbnailSetRef` | Permet de définir la miniature de référence |

## Player Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Play Telestream Switch | `aclPlayTelestreamSwitch` | Permet de basculer vers le player Telestream |

## Quota Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Quota Object View | `aclQuotaObjectView` | Permet de voir les quotas d'objets |

## Distribution Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Distribution Drive Only | `aclDistributionDriveOnly` | Limite la distribution au Drive uniquement |
| Allow Drive | `aclDrive` | Permet d'accéder au Drive |

## Bundle Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Bundle Title Status Change | `aclBundleTitleStatusChange` | Permet de changer le statut d'un titre dans un bundle |
| Allow Bundle Dashboard View | `aclBundleDashboardView` | Permet de voir le dashboard des bundles |
| Allow Restrict View Bundle Only | `aclRestrictViewBundleOnly` | Restreint la vue aux bundles uniquement |

## External Access Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow External Access Create Or Update | `aclExternalAccessCreateOrUpdate` | Permet de créer ou modifier les accès externes |
| Allow External Access Revoke | `aclExternalAccessRevoke` | Permet de révoquer les accès externes |
| Allow External Access View | `aclExternalAccessView` | Permet de voir les accès externes |
| Allow External Access View All | `aclExternalAccessViewAll` | Permet de voir tous les accès externes |

## Order Restrict Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Order Restrict To Follower | `aclOrderRestrictToFollower` | Permet de restreindre la commande aux followers |

## Bypassed Asset Features

| Nom | Tag | Description |
|-----|-----|-------------|
| Allow Bypassed Asset | `aclBypassedAsset` | Permet de voir/gérer les assets bypassés |
