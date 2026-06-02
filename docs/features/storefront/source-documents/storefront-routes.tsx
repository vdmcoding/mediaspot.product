import StorefrontSingle from '@/Features/Storefronts/admin/pages/storefront-single'
import StorefrontsList from '@/Features/Storefronts/admin/pages/storefronts-list'
import { ExtendedPlatformMode, FeatureRoutes, NavTypes } from '@/RouterV2/types/routing-types'
import { storefrontPaths } from './storefront-paths'

import StorefrontBrandingSection from '@/Features/Storefronts/admin/containers/storefront-branding-section'
import StorefrontTitlesSection from '@/Features/Storefronts/admin/containers/storefront-titles-section'
import StorefrontCollectionsSection from '@/Features/Storefronts/admin/containers/storefront-collections-section'
import StorefrontPointsOfContactSection from '@/Features/Storefronts/admin/containers/storefront-points-of-contact-section'
import StorefrontDocumentsSection from '@/Features/Storefronts/admin/containers/storefront-documents-section'
import StorefrontHomepageSection from '@/Features/Storefronts/admin/containers/storefront-homepage-section'
import StorefrontUsersSection from '@/Features/Storefronts/admin/containers/storefront-users-section'
import { Licences } from '@/Core/Api/Types/licences'
import { AclTypes } from '@/Core/Api/Types/acl-types'

export const getStorefrontRoutes = (): FeatureRoutes => {
  return {
    name: 'storefronts',
    description: 'Storefronts management functionality',
    defaultContext: {
      platformModes: [ExtendedPlatformMode.Distribution, ExtendedPlatformMode.Hybrid],
      licences: [Licences.Storefront],
      acls: [AclTypes.aclManageStorefront, AclTypes.aclSuperUser],
    },
    routes: [
      {
        path: storefrontPaths.root,
        element: <StorefrontsList />,
        navType: NavTypes.None,
        pageTitle: 'Storefronts',
        rootLink: storefrontPaths.root,
      },
      {
        path: `${storefrontPaths.root}/:id`,
        element: <StorefrontSingle />,
        navType: NavTypes.Breadcrumb,
        pageTitle: 'Storefronts',
        rootLink: storefrontPaths.root,
        children: [
          {
            path: '',
            element: <StorefrontBrandingSection />,
          },
          {
            path: storefrontPaths.singleCatalog,
            element: <StorefrontTitlesSection />,
          },
          {
            path: storefrontPaths.singleCollections,
            element: <StorefrontCollectionsSection />,
          },
          {
            path: storefrontPaths.singleHomepage,
            element: <StorefrontHomepageSection />,
          },
          {
            path: storefrontPaths.singlePointsOfContact,
            element: <StorefrontPointsOfContactSection />,
          },
          {
            path: storefrontPaths.singleDocuments,
            element: <StorefrontDocumentsSection />,
          },
          {
            path: storefrontPaths.singleUsers,
            element: <StorefrontUsersSection />,
          },
        ],
      },
    ],
  }
}
