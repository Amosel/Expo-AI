
### Trouble Shooting:

- Every change you make in app.json, that has to do with native, such as changing the GoogleService-Info.plist file, require that you re-run `bun expo prebuild`, sometimes it's nice to actually add ` --platform ios` if you want to do it fast.

- The expo teams recommendation is to avoid manual changes in the iOD and android directories, Any required configurations, including integrations with services like Google Sign-In, should be done via app.json.

- Expo will also only accept at least (assuming here) native change after running `prebuild`` again

## iOS 
### Signing workaround
- the new version of `app.config.js` does not see to accept appleTeamId, instead we use `DEVELOPMENT_TEAM=XXXXXXXXXX bun ios` to run.
  
### Building on device: 
`DEVELOPMENT_TEAM=XXXXXXXXXX bun expo run:ios -d`

## Secret Keys:

### Firebase

`google-service.json` and `GoogleService-Info.plist` are required, and are using by the native build process. Get them from the firebase console.

### Env