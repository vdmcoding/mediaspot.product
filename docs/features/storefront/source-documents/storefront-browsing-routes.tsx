import { ExtendedPlatformMode, FeatureRoutes, NavTypes } from '@/RouterV2/types/routing-types'
import { storefrontBrowsingPaths } from './storefront-browsing-paths'
import StorefrontHomepage from '@/Features/Storefronts/browsing/pages/storefront-homepage'
import StorefrontLayout from '@/Features/Storefronts/browsing/containers/storefront-browsing-layout'
import StorefrontCatalog from '@/Features/Storefronts/browsing/pages/storefront-catalog'
import StorefrontCollections from '@/Features/Storefronts/browsing/pages/storefront-collections'
import StorefrontWishlists from '@/Features/Storefronts/browsing/pages/storefront-wishlists'
import StorefrontCollectionSingle from '@/Features/Storefronts/browsing/pages/storefront-collection'
import StorefrontWishlistSingle from '@/Features/Storefronts/browsing/pages/storefront-wishlist'
import StorefrontTitleSingle from '@/Features/Storefronts/browsing/pages/storefront-title-single'
import { StorefrontWelcome } from '@/Features/Storefronts/browsing/pages/storefront-welcome'
import { StorefrontLoginLayout } from '@/Features/Storefronts/browsing/containers/storefront-login-layout'
import { StorefrontLoginNotFound } from '@/Features/Storefronts/browsing/pages/storefront-login-not-found'
import { StorefrontRequestAccount } from '@/Features/Storefronts/browsing/pages/storefront-request-account'
import { StorefrontLogin } from '@/Features/Storefronts/browsing/pages/storefront-login'
import { StorefrontConfirmAccount } from '@/Features/Storefronts/browsing/pages/storefront-confirm-account'
import { Navigate } from 'react-router'
import { cacheService } from '@/Core/Api/services'

export const getStorefrontBrowsingRoutes = (): FeatureRoutes => {
  return {
    name: 'Storefront browsing',
    description: 'Storefronts browsing functionality',
    defaultContext: {
      platformModes: [ExtendedPlatformMode.StorefrontBrowsing, ExtendedPlatformMode.Distribution, ExtendedPlatformMode.Hybrid],
    },
    routes: [
      {
        path: '/',
        element: <Navigate to={`/store/${cacheService.GetUserInfo()?.storefrontSubdomain}`} />,
        context: {
          platformModes: [ExtendedPlatformMode.StorefrontBrowsing],
        },
      },
      {
        element: <StorefrontLayout />,
        path: `${storefrontBrowsingPaths.root}`,
        children: [
          {
            path: storefrontBrowsingPaths.home,
            element: <StorefrontHomepage />,
            navType: NavTypes.None,
            pageTitle: 'Home',
          },
          {
            path: storefrontBrowsingPaths.catalog,
            element: <StorefrontCatalog />,
            navType: NavTypes.None,
            pageTitle: 'Catalog',
          },
          {
            path: `${storefrontBrowsingPaths.catalog}/:subcategory`,
            element: <StorefrontCatalog />,
            navType: NavTypes.None,
            pageTitle: 'Catalog',
          },
          {
            path: `${storefrontBrowsingPaths.title}/:id`,
            element: <StorefrontTitleSingle />,
            navType: NavTypes.Breadcrumb,
            pageTitle: 'Catalog',
            rootLink: storefrontBrowsingPaths.catalog,
          },
          {
            path: storefrontBrowsingPaths.collections,
            element: <StorefrontCollections />,
            navType: NavTypes.None,
            pageTitle: 'Collections',
          },
          {
            path: `${storefrontBrowsingPaths.collections}/:id`,
            element: <StorefrontCollectionSingle />,
            navType: NavTypes.Breadcrumb,
            rootLink: storefrontBrowsingPaths.collections,
            pageTitle: 'Collections',
          },
          {
            path: storefrontBrowsingPaths.wishlists,
            element: <StorefrontWishlists />,
            navType: NavTypes.None,
            pageTitle: 'Wishlists',
          },
          {
            path: `${storefrontBrowsingPaths.wishlists}/:id`,
            element: <StorefrontWishlistSingle />,
            navType: NavTypes.Breadcrumb,
            rootLink: storefrontBrowsingPaths.wishlists,
            pageTitle: 'Wishlists',
          },
        ],
      },
    ],
  }
}

export const getStorefrontLoginRoutes = (): FeatureRoutes => {
  return {
    name: 'Storefront login',
    description: 'Storefront login functionality',
    defaultContext: {
      noAuthRequired: true,
    },
    routes: [
      {
        element: <StorefrontLoginLayout />,
        children: [
          {
            path: storefrontBrowsingPaths.welcome,
            element: <StorefrontWelcome />,
          },
          {
            path: storefrontBrowsingPaths.login,
            element: <StorefrontLogin />,
          },
          {
            path: storefrontBrowsingPaths.requestAccount,
            element: <StorefrontRequestAccount />,
          },
          {
            path: storefrontBrowsingPaths.confirmAccount,
            element: <StorefrontConfirmAccount />,
          },
          {
            path: storefrontBrowsingPaths.notFound,
            element: <StorefrontLoginNotFound />,
          },
        ],
      },
    ],
  }
}
