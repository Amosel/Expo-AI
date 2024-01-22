import { SafeAreaView, StatusBar } from 'react-native'
import { ListContainer } from './components/ListContainer'

export default function () {
  return (
    <SafeAreaView testID='room-view'>
      <StatusBar />
      <ListContainer
        ref={this.list}
        listRef={this.flatList}
        rid={rid}
        tmid={this.tmid}
        renderRow={this.renderItem}
        loading={loading}
        hideSystemMessages={this.hideSystemMessages}
        showMessageInMainThread={user.showMessageInMainThread ?? false}
        serverVersion={serverVersion}
      />
      {/* {this.renderFooter()}
      {this.renderActions()} */}
      {/* <UploadProgress rid={rid} user={user} baseUrl={baseUrl} width={width} /> */}
      {/* <JoinCode
        ref={this.joinCode}
        onJoin={this.onJoin}
        rid={rid}
        t={t}
        theme={theme}
      /> */}
    </SafeAreaView>
  )
}
