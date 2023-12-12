
### Trouble Shooting:

- Every change you make in app.json, that has to do with native, such as changing the GoogleService-Info.plist file, require that you re-run `bun expo prebuild`, sometimes it's nice to actually add ` --platform ios` if you want to do it fast.

- The expo teams recommendation is to avoid manual changes in the ios and android directories, Any required configurations, including integrations with services like Google Sign-In, should be done via app.json.