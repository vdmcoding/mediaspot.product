# 🎯 PHASE 2: DOCUMENTATION

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 💼 Business Purpose

**Problem Solved**: Media companies need to share video/audio content with external stakeholders (buyers, reviewers, clients) in a secure, trackable, and controlled manner.

**Business Value**:
| Capability | Business Benefit |
|------------|------------------|
| Secure streaming links | Prevent unauthorized downloads |
| Watermarking | Identify source of leaks (piracy protection) |
| View limits | Control distribution scope |
| Expiration dates | Time-bound access for NDAs |
| IP restrictions | Geographic/device limiting |
| Recipient tracking | Audit trail for compliance |
| Email notifications | Professional delivery experience |

**User Stories Supported**:

- _"As a content distributor, I want to share a screener with potential buyers so they can evaluate the content before licensing."_
- _"As a studio executive, I want to ensure shared content has watermarks so I can trace any leaks."_
- _"As a compliance officer, I want to limit share access to specific timeframes and view counts."_

## 📥 Input Contract

### HTTP Details

| Property           | Value                       |
| ------------------ | --------------------------- |
| **Method**         | `POST`                      |
| **Route**          | `/share-service/api/shares` |
| **Content-Type**   | `application/json`          |
| **Authentication** | Required (session-based)    |

### Request Body: `CreateShareRequest`

```json
{
  "objectId": 12345, // Required: Asset or Content ID to share
  "episodeNb": [1, 2, 3], // Optional: Episode numbers (for series)
  "audioAuthorizedLanguagesCodes": [
    // Required for Content: Allowed audio tracks
    { "value": "en", "label": "English" }
  ],
  "subtitleAuthorizedLanguagesCodes": [
    // Optional: Allowed subtitle tracks
    { "value": "es", "label": "Spanish" }
  ],
  "type": "StreamingBasic", // Required: StreamingBasic | StreamingTagSecure
  "burnTimecode": false, // Optional: Burn timecode into video
  "videoFilters": {}, // Optional: Video filter settings
  "maxDays": 7, // Required: Days until expiration
  "maxViews": 10, // Required: Maximum view count
  "maxIPs": 3, // Optional: Maximum unique IPs
  "maxClipsNumber": 5, // Optional: Maximum clips allowed
  "maxClipsDuration": "00:05:00", // Optional: Max duration per clip
  "watermarkText": "CONFIDENTIAL - john@co", // Required for TagSecure: Visible watermark
  "watermarkTemplate": "StandardDuplicated", // Optional: Watermark layout template
  "comment": "For Q1 review", // Optional: Internal note
  "recipientEmails": ["buyer@company.com"], // Optional: Email recipients
  "shareName": "Q1 Screening", // Optional: Custom share name
  "oneSharePerEmail": false // Optional: Create unique share per recipient
}
```

### Validation Rules

| Rule                                      | Enforcement Location                   | Error Behavior       |
| ----------------------------------------- | -------------------------------------- | -------------------- |
| User must have `aclShareCreate` ACL       | `[AuthAcl]` attribute                  | 403 Forbidden        |
| Platform must have ShareScreening license | `[AuthLicense]` attribute              | 403 Forbidden        |
| Billing quota not exceeded                | `[AuthBillingQuotaExceeded]` attribute | 403/Payment Required |
| `maxDays` ≤ platform/group limit          | `SecurityOverride()`                   | Silently capped      |
| `maxViews` ≤ platform/group limit         | `SecurityOverride()`                   | Silently capped      |
| Object must exist and be accessible       | `FetchObject()`                        | Exception → 500      |
| User must have Share permission on asset  | `CheckPerform()`                       | Exception → 500      |
| Asset must be Video/Audio/Image/Doc       | `CheckPerform()`                       | Exception → 500      |
| Asset must be MEZZ/RAW/DRIVE class        | `CheckPerform()`                       | Exception → 500      |
| Proxy file must exist and be online       | `LoadVideoAssets()`                    | Exception → 500      |
| Watermark text required for TagSecure     | `CheckPerform()`                       | Exception → 500      |
| Audio languages must be valid for Content | `CheckPerform()`                       | Exception → 500      |
| Download type not implemented             | `CheckPerform()`                       | Exception → 500      |

## 📤 Output Contract

### Success Response (200 OK)

```json
{
  "code": 0,
  "message": null,
  "data": 98765 // Created share ID
}
```

### Error Responses

| Scenario                 | HTTP Status | Response Code | Message Example                                             |
| ------------------------ | ----------- | ------------- | ----------------------------------------------------------- |
| Missing ACL permission   | 403         | -             | Handled by attribute                                        |
| Missing license          | 403         | -             | Handled by attribute                                        |
| Billing quota exceeded   | 403/402     | -             | Handled by attribute                                        |
| Asset not found          | 500         | -1            | "Issue while creating share: ..."                           |
| No share permission      | 500         | -1            | "You don't have the permission to share this asset"         |
| Invalid asset type       | 500         | -1            | "Object #123 has type Audio which is not compatible"        |
| Proxy file missing       | 500         | -1            | "No proxy file found for asset #123"                        |
| Proxy file offline       | 500         | -1            | "Proxy file for asset #123 is not online"                   |
| Workflow already running | 500         | -1            | "ProxyTag workflow already running for video asset Id #123" |
| General exception        | 500         | -1            | "Issue while creating share: {message}"                     |

## 📋 Business Rules

### Share Creation Rules

| #   | Rule                                                                      | Implementation                            |
| --- | ------------------------------------------------------------------------- | ----------------------------------------- |
| 1   | Share limits (days/views/IPs) cannot exceed platform or group maximums    | `SecurityOverride()` silently caps values |
| 2   | Zero or negative maxDays defaults to `Settings.maxShareViewDaysDefault`   | `SecurityOverride()`                      |
| 3   | Zero or negative maxViews defaults to `Settings.maxShareViewViewsDefault` | `SecurityOverride()`                      |
| 4   | Title-level objects cannot be shared directly                             | Must be Content or Asset layer            |
| 5   | Download share type is not implemented                                    | Throws exception if requested             |
| 6   | Confidential titles require special ACL                                   | `aclTitleConfidentialityShares`           |

### Watermarking Rules

| #   | Rule                                                                        | Implementation                                 |
| --- | --------------------------------------------------------------------------- | ---------------------------------------------- |
| 7   | StreamingTagSecure without HLS chunker requires non-empty watermark text    | `CheckPerform()` validation                    |
| 8   | Invisible watermarking is forced if title is < N days old (platform config) | `Build()` checks production date               |
| 9   | Assets tagged with "Watermark" tag always get watermarking                  | `Build()` checks `HasTag(ObjectTag.Watermark)` |
| 10  | Per-email shares use recipient email as watermark text > **⚠️ Only true if selected burn is "Emails"**                     | `Build()` replaces watermark                   | 

### Content Layer Rules

| #   | Rule                                             | Implementation                         |
| --- | ------------------------------------------------ | -------------------------------------- |
| 11  | Content shares on Series require episode numbers | `CheckPerform()` validates             |
| 12  | Episode numbers must be within valid range       | Checked against metadata               |
| 13  | Audio language codes must exist in content > **⚠️ Only true for Mezz-based contents**      | Intersection check in `CheckPerform()` | 
| 14  | Subtitle language codes must exist in content > **⚠️ Only true for Mezz-based contents**   | Intersection check in `CheckPerform()` | 

### Asset Layer Rules

| #   | Rule                                                                        | Implementation              |
| --- | --------------------------------------------------------------------------- | --------------------------- |
| 15  | Asset must be shareable type (Video, Audio, Image, Document, ImageSequence) | `shareableObjectTypes` list |
| 16  | Asset must be MEZZ, RAW, or DRIVE classification                            | `CheckPerform()` validation |
| 17  | Asset status cannot be New or ToBeDigitalized                               | `CheckPerform()` validation |

### Order/Transcoding Rules

| #   | Rule                                                                    | Implementation                   |
| --- | ----------------------------------------------------------------------- | -------------------------------- |
| 18  | StreamingTagSecure without HLS chunker creates transcoding order        | `Build()` creates internal order |
| 19  | Cannot create share if ProxyTag workflow already running for asset      | `Build()` checks workflow count  |
| 20  | Email notification deferred until transcoding completes (for TagSecure) | `NotifyEmail()` conditional      |

## 🔗 External Dependencies

### Database Entities (MongoDB/SQL)

| Entity                    | Operations        | Purpose                         |
| ------------------------- | ----------------- | ------------------------------- |
| `DbShareMediaInfos`       | Create, Save      | Core share record               |
| `DbAssetObjectInfos`      | Read, Graph Query | Asset hierarchy and metadata    |
| `DbFileInfos`             | List, Sync        | Proxy file verification         |
| `DbActivityInfos`         | Insert            | Audit logging                   |
| `DbUserInfos`             | Read, Update      | User preferences, recent emails |
| `DbMetadataFieldInfos`    | Read              | Metadata field definitions      |
| `DbWorkflowInstanceInfos` | Count             | Check running workflows         |
| `DbPlatformResourceInfos` | Read              | Platform branding resources     |

### External/Internal APIs

| Service                 | Type         | Purpose                    |
| ----------------------- | ------------ | -------------------------- |
| `MailNotificationApi`   | Kafka/Async  | Email delivery             |
| `OrderInternalSupplier` | Internal API | Transcoding job creation   |
| `ReferenceAssetFinder`  | Utility      | Video reference resolution |
| File Storage            | S3/NAS       | Proxy file verification    |

## ⚠️ Edge Cases Handled

| #   | Scenario                            | Handling                                        |
| --- | ----------------------------------- | ----------------------------------------------- |
| 1   | Multiple episodes selected          | Creates linked shares with master share         |
| 2   | Multiple assets selected            | Uses `CreateMultipleShare` endpoint instead     |
| 3   | Proxy file offline                  | Attempts sync, fails if still offline           |
| 4   | Drive tree assets (no title parent) | Sets `noTitleLink = true`                       |
| 5   | Platform without HLS chunker        | Forces transcoding for TagSecure                |
| 6   | Empty share name                    | Auto-generates from title/content metadata      |
| 7   | One share per email                 | Loops and creates individual watermarked shares |

## ⚠️ Edge Cases NOT Handled (Potential Bugs)

| #   | Missing Scenario                                | Risk Level  | Recommendation                                   |
| --- | ----------------------------------------------- | ----------- | ------------------------------------------------ |
| 1   | **No input validation on email format**         | 🟡 Medium   | Add email regex validation                       |
| 2   | **Empty recipientEmails list allowed**          | 🟢 Low      | Clarify if this is intentional                   |
| 3   | **Concurrent share creation for same asset**    | 🟠 High     | Add optimistic locking or mutex                  |
| 4   | **Partial failure in one-share-per-email loop** | 🔴 Critical | Some emails get shares, others fail, no rollback |
| 5   | **Email sending failure doesn't fail request**  | 🟡 Medium   | User gets success but no email sent              |
| 6   | **No idempotency key**                          | 🟡 Medium   | Duplicate requests create duplicate shares       |
| 7   | **Recent emails update failure ignored**        | 🟢 Low      | Non-critical but loses user preference           |
| 8   | **Watermark text length not validated**         | 🟡 Medium   | Very long text could break rendering             |
| 9   | **maxClipsDuration format validation missing**  | 🟡 Medium   | Invalid TimeSpan could cause errors              |
| 10  | **No rate limiting**                            | 🟠 High     | User could create thousands of shares            |

---
