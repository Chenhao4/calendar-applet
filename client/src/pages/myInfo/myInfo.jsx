import Taro, { Component } from '@tarojs/taro'
import { View, Button, Image } from '@tarojs/components'

import Login from '../../components/login/index'

export default class Index extends Component {
  state = { 
    nickName: '',
    avatarUrl: '',
    hasUserInfo: false
  }

  componentWillMount () { 
    Taro.getSetting({
      success: (res) => {
        if(res.authSetting['scope.userInfo']) {
          console.log('已授权')
          Taro.getUserInfo({
            success: (userInfoRes) => {
              console.log(userInfoRes.userInfo)
              this.setState({
                nickName: userInfoRes.userInfo.nickName,
                avatarUrl: userInfoRes.userInfo.avatarUrl,
                hasUserInfo: true
              })
            }
          })
        }
      }
    })
  }

  componentDidMount () { 
    Taro.login({
      success() {
        console.log('taro login success')
      }
    })

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '我的'
  }

  // 获取微信授权个人信息
  onGetUserInfo = (e) => {
    console.log(e)
    if(e.detail.userInfo) {
      this.setState({ 
        nickName: e.detail.userInfo.nickName,
        avatarUrl: e.detail.userInfo.avatarUrl,
        hasUserInfo: true
      })
    }
  }

  render () {


    return (
      <View>
        My Info
        {!this.state.hasUserInfo && <Button openType='getUserInfo' onGetUserInfo={(e) => this.onGetUserInfo(e)} >点我授权个人信息</Button>}
      <View>
        {this.state.nickName}
        <Image src={this.state.avatarUrl} />
      </View>
      <Login />
        </View>

    )
  }
}
