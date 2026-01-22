import { DbMongoSerializationBaseInfos } from './db-mongo-serialization-base-infos'
import { ShareMediaType } from './share-media-type'
import { ObjectLayer } from './object-layer'
import { TranskodeWatermarkVendor } from './transkode-watermark-vendor'
import { WatermarkTemplates } from './watermark-templates'
import { DbObjectCreateOrUpdateInfos } from './db-object-create-or-update-infos'
import { VideoFilters } from './video-filters'
import { ViewInfo } from './view-info'
import { AudioLanguageSettings } from './audio-language-settings'
import { SubtitleLanguageSettings } from './subtitle-language-settings'
import { Clip } from './clip'
import { DbOrderItemInfos } from './db-order-item-infos'
import { DbAssetObjectInfos } from './db-asset-object-infos'
import { OrderStatus } from './order-status'
import { ObjectType } from './object-type'

export class DbShareMediaInfos extends DbMongoSerializationBaseInfos {
    isMultiple = false
    showTimecode = false
    viewsMax = 0
    ipsMax: number | null = 0
    clipsMaxNumber: number | null = 0
    clipsMaxDuration: string | null = null
    platformId: number | null = 0
    objectId: number | null = 0
    titleId: number | null = 0
    type: ShareMediaType | null = null
    objectLayer: ObjectLayer | null = null
    objectType: ObjectType | null = null
    endDate: Date | null = null
    name: string | null = null
    comment: string | null = null
    watermarkText: string | null = null
    key: string | null = null
    mediaKey: string | null = null
    episodeNb: number | null = 0
    linkedOrderId: number | null = 0
    linkedOrderItemId: number | null = 0
    watermarkSecurity: TranskodeWatermarkVendor | null = null
    watermarkTemplate: WatermarkTemplates | null = null
    creationInfos: DbObjectCreateOrUpdateInfos | null = null
    filters: VideoFilters | null = null
    viewInfos: ViewInfo[] | null = []
    linkedOrderItemIds: number[] | null = []
    linkedShareIds: number[] | null = []
    recipientEmails: string[] | null = null
    audioLanguagesCodes: string[] | null = null
    subtitleLanguagesCodes: string[] | null = null
    audioLanguagesSettings: AudioLanguageSettings[] | null = null
    subtitleLanguagesSettings: SubtitleLanguageSettings[] | null = null
    clips: Clip[] | null = []
    linkedShares: DbShareMediaInfos[] | null = null
    linkedOrderItem: DbOrderItemInfos | null = null
    titleInfos: DbAssetObjectInfos | null = null
    titleName: string | null = null
    daysUntilExpire = 0
    isActive: boolean | null = null
    isViewed: boolean | null = null
    linkedOrderItemStatus: OrderStatus | null = null
    createdByUserName: string | null = null
    viewsUntilExpire = 0
    ipsUntilExpire: number | null = 0
    clipsRemaining: number | null = 0

    constructor(init?: Partial<DbShareMediaInfos>) {
        super()
        Object.assign(this, init)
    }
}
