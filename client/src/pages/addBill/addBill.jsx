import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import { dateToString } from "../../utils/dateUtil"
import Calculator from '../../components/calculator/calculator'

import './addBill.scss'

let curDate = dateToString(new Date())
export default class AddBill extends Component {
  state = {
    hideModal: true, //模态框的状态  true-隐藏  false-显示
    animationData: {},
    category: ['餐饮/食物', '娱乐/消费', '出行/交通工具', '日常开销/日用'],
    categorySel: '餐饮/食物',
    dateSel: curDate,
    money: 0
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() {
    let money = this.$router.params.money;
    this.setState({
      money: money
    })
  }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '添加交易'
  }

  // 显示遮罩层
  showModal = () => {
    this.setState({
      hideModal: false
    })

    var animation = Taro.createAnimation({
      duration: 400,//动画的持续时间 默认600ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    var that = this
    setTimeout(function () {
      that.fadeIn();//调用显示动画
    }, 50)

  }

  // 隐藏遮罩层
  hideModal = () => {
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
    this.animation.translateY(0).step()
    this.setState({
      animationData: this.animation.export() //动画实例的export方法导出动画数据传递给组件的animation属性
    })
  }

  fadeDown = () => {
    this.animation.translateY(1200).step()
    this.setState({
      animationData: this.animation.export(),
    })
  }

  onDateChange = e => {
    this.setState({
      dateSel: e.detail.value
    })
  }

  onCategoryChange = e => {
    this.setState({
      categorySel: this.state.category[e.detail.value]
    })
  }

  getMoneyFromCalculator = (money) => {
    this.setState({
      money: money
    })
    this.hideModal()
  }

  submitData = () => {
    // todo
  }

  render() {
    let money = this.state.money

    return (
      <View className='addBill'>
        <View><Text>Hello, World</Text></View>

        <View className='modals modals-bottom-dialog' hidden={this.state.hideModal}>
          <View className='modals-cancel' onClick={this.hideModal}></View>
          <View className='bottom-dialog-body bottom-pos' animation={this.state.animationData}>
            <Calculator type='1' onSendMoneyBack={this.getMoneyFromCalculator} />
          </View>
        </View>

        <View>
          <View className='form-item'>
            <View>
              <View className='item-name'>金额</View>
              <View onClick={this.showModal}>{money}</View>
            </View>

            <View>
              <View className='item-name'>类别</View>
              <Picker mode='selector' range={this.state.category} onChange={this.onCategoryChange}>
                <View className='picker'>
                  {this.state.categorySel}
                </View>
              </Picker>
            </View>

            <View className='outer-view'>
              <View className='item-name'>日期</View>
              <Picker mode='date' onChange={this.onDateChange} className='picker'>
                <View className='picker-view'>
                  {this.state.dateSel}
                </View>
              </Picker>
            </View>
            <View onClick={this.submitData}> 提交 </View>
          </View>
        </View>
      </View>
    )
  }
}


