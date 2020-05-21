import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import './account.scss'

export default class Index extends Component {
  state = {
    hideModal: true, //模态框的状态  true-隐藏  false-显示
    animationData: {},
  }

  componentWillMount() { }

  componentDidMount() {
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '记账'
  }

  // 显示遮罩层
  showModal = () => {
    console.log('showModal')
    console.log(this.state.hideModal)
    this.setState({
      hideModal: false
    })
    console.log(this.state.hideModal)

    var animation = Taro.createAnimation({
      duration: 400,//动画的持续时间 默认600ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    var that = this
    setTimeout(function () {
      console.log('setTimeout')
      that.fadeIn();//调用显示动画
    }, 50)
    
  }

  // 隐藏遮罩层
  hideModal = (e) => {
    console.log('hideModal', e)
    var that = this;
    var animation = Taro.createAnimation({
      duration: 600,//动画的持续时间 默认800ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    this.fadeDown();//调用隐藏动画   
    setTimeout(function () {
      that.setState({
        hideModal: true
      })
    }, 250)//先执行下滑动画，再隐藏模块
    
  }

  //动画集
  fadeIn = () => {
    console.log('fadeIn')
    this.animation.translateY(0).step()
    this.setState({
      animationData: this.animation.export() //动画实例的export方法导出动画数据传递给组件的animation属性
    })
  }

  fadeDown = () => {
    this.animation.translateY(300).step()
    this.setState({
      animationData: this.animation.export(),
    })
  }

  render() {


    return (
      <View>
        My Account
        {/* <View>添加</View>

        <View className='income'> 收入支出 </View>
        <View> 本周： </View>
        <View> 本月： </View>
        <View> 本年： </View> */}

        <View className='modals modals-bottom-dialog' hidden={this.state.hideModal}>
          <View className='modals-cancel' onClick={(e) => this.hideModal(e)}></View>
          <View className='bottom-dialog-body bottom-pos' animation={this.state.animationData}>abc</View>
        </View>
        <Button onClick={this.showModal}>点击弹出底部模态框</Button>

      </View>


    )
  }
}
