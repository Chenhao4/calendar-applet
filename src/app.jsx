import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  config = {
    pages: [
      'pages/index/index',
      'pages/myInfo/myInfo',
      'pages/account/account'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '头条',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh: true
    }, 
    tabBar: {
      list: [
        {
          pagePath: "pages/account/account",
          text: "记账",
          iconPath: "./assets/images/tabBar/index_1.png",
          selectedIconPath: "./assets/images/tabBar/index_2.png"
        },
        {
          pagePath: "pages/index/index",
          text: "日期",
          iconPath: "./assets/images/tabBar/index_1.png",
          selectedIconPath: "./assets/images/tabBar/index_2.png"
        },
        {
          pagePath: "pages/myInfo/myInfo",
          text: "我的",
          iconPath: "./assets/images/tabBar/mycompany_1.png",
          selectedIconPath: "./assets/images/tabBar/mycompany_2.png"
        }
      ],
      borderStyle: "white",
      color: '#888888',
      selectedColor: "#514ACB",
      backgroundColor: "#FFFFFF",
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
