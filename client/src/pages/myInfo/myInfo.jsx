import Taro, { Component } from '@tarojs/taro'
import { View, Button, Image } from '@tarojs/components'

import Login from '../../components/login/index'

export default class Index extends Component {
  state = { 
    nickName: '',
    avatarUrl: ''
  }

  componentWillMount () { }

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
  onGetUserInfo = () => {
    Taro.getSetting({
      success: (res) => {
        if(res.authSetting['scope.userInfo']) {
          Taro.getUserInfo({
            success: (userInfoRes) => {
              console.log(userInfoRes.userInfo)
              this.setState({
                nickName: userInfoRes.userInfo.nickName,
                avatarUrl: userInfoRes.userInfo.avatarUrl
              })
            }
          })
        } else {
          console.log('未授权')
        }
      }
    })
  }

  render () {


    return (
      <View>
        My Info
        <Button openType='getUserInfo' onClick={this.onGetUserInfo}>点我授权个人信息</Button>
      <View>
        {this.state.nickName}
        <Image src={this.state.avatarUrl} />
      </View>
      <Login />
        </View>

    )
  }
}
