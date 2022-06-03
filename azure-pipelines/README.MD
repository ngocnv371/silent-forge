# how to use these pipelines

These pipelines were created for Azure Pipelines.

## iOS build

Create 2 pipelines:
- "Build iOS Dev" from `build-ios-dev.yml`
- "Build iOS Production" from `build-ios-production.yml`

These pipelines are dependant on some certificates which can be generated using the guide in `iCloud-cert`.

## android build 

Create 2 pipelines
- "Build android Dev" from `build-android-dev.yml`
- "Build android Production" from `build-android-prod.yml`

These pipelines are dependant on a keystore file which can be generated anew, or share one with the iOS build.
