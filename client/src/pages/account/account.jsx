import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import {Big} from 'big.js'
import './account.scss'

const reg = RegExp(/\+|\−|\÷|\×/)
export default class Account extends Component {
  state = {
    hideModal: true, //模态框的状态  true-隐藏  false-显示
    animationData: {},
    value: '0', // 上次计算后的结果，null表示没有上次计算的结果
    preOper: null, // 上次计算符号，null表示没有未完成的计算
    // waitingForOperand: false, // 前一按键是否为计算符号
    digitMap: [
      { id: 0, className: 'key-0', value: 0 },
      { id: 'dot', className: 'key-dot', value: '●' },
      { id: 1, className: '', value: 1 },
      { id: 2, className: '', value: 2 },
      { id: 3, className: '', value: 3 },
      { id: 4, className: '', value: 4 },
      { id: 5, className: '', value: 5 },
      { id: 6, className: '', value: 6 },
      { id: 7, className: '', value: 7 },
      { id: 8, className: '', value: 8 },
      { id: 9, className: '', value: 9 },
    ],
    operMap: [
      { id: 'div', className: '', value: '÷' },
      { id: 'mul', className: '', value: '×' },
      { id: 'sub', className: '', value: '−' },
      { id: 'add', className: '', value: '+' },
      { id: 'eq', className: '', value: '=' }
    ]
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() {
    this.setState({
      hideModal: true,
      value: '0',
      preOper: null
    })
  }

  config = {
    navigationBarTitleText: '记账'
  }

  // 显示遮罩层
  showModal = () => {
    // console.log('showModal')
    // console.log(this.state.hideModal)
    this.setState({
      hideModal: false
    })
    // console.log(this.state.hideModal)

    var animation = Taro.createAnimation({
      duration: 400,//动画的持续时间 默认600ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    var that = this
    setTimeout(function () {
      // console.log('setTimeout')
      that.fadeIn();//调用显示动画
    }, 50)

  }

  // 隐藏遮罩层
  hideModal = () => {
    // console.log('hideModal')
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
    // console.log('fadeIn')
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

  // 计算表达式
  calOper = (option, pre, next) => {
    console.log('calOper', option, pre, next)
    let preBig = new Big(pre)
    let nextBig = new Big(next)
    switch(option) {
      case '÷': return preBig.div(nextBig)
      case '×': return preBig.times(nextBig)
      case '−': return preBig.minus(nextBig)
      case '+': return preBig.plus(nextBig)
    }
  }

  // 点击数字按钮
  onTapDigit = (e) => {
    // console.log(e.target.dataset.value)
    const key = e.target.dataset.value; // 根据data-value获取按键类型

    if (key == '●') {
      // 按下点号
      if (this.state.value.match(reg)) {
        let oldValue = this.state.value
        let index = oldValue.match(reg).index
        let next = oldValue.substring(index + 1)
        if (!(/\./).test(next)) {
          this.setState({
            value: this.state.value + '.'
          })
        }
      } else {
        if (!(/\./).test(this.state.value)) {
          this.setState({
            value: this.state.value + '.'
          })
        }
      }
    } else {
      // 按下数字键
      const curValue = key;
      if (this.state.value.length >= 10) {
        Taro.showToast({
          title: "最多输入10位",
          icon: "none"
        })
      } else {
        this.setState({
          value: this.state.value === '0' ? String(curValue) : this.state.value + curValue,
          preOper: null
        })
      }
    }
  }

  // 点击操作符
  onTapOperator = (e) => {
    // console.log(e.target.dataset.value)
    const curOper = e.target.dataset.value

    if (!this.state.value.match(reg)) {
      // value不包含操作符
      this.setState({
        value: curOper == '=' ? this.state.value : this.state.value + curOper,
        preOper: curOper
      })
    } else if (this.state.value.match(reg)) {
      // value不包含操作符  
      let oldValue = this.state.value
      let index = oldValue.match(reg).index

      if (this.state.preOper == null) {
        // 计算表达式 浮点数精确度问题解决
        const pre = parseFloat(oldValue.substring(0, index))
        const next = parseFloat(oldValue.substring(index + 1))
        let newValue = this.calOper(oldValue[index], pre, next)
        console.log('newValue', newValue.toString())
        this.setState({
          value: curOper == '=' ? newValue.toString() : newValue + curOper,
          preOper: curOper
        })  
      } else {
        // 变更运算符
        this.setState({
          value: curOper == '=' ? oldValue.substring(0, index) : oldValue.substring(0, index) + curOper
        })
      }
    }
    // console.log(this.state.value)
  }

  onTapFunction= (e) => {
    if (e.target.dataset.value == 'ac') {
      this.setState({
        value: '0',
        preOper: null
      })
    } else if (e.target.dataset.value == 'back') {
      let curValue = this.state.value
      if (curValue.length > 1) {
        this.setState({
          value: this.state.value.substr(0, this.state.value.length - 1)
        })
      }
    }
  }

  render() {
    const digitMap = this.state.digitMap
    const digitView = digitMap.map((digit) => {
      digit.className = 'calculator-key ' + digit.className
      return <View className={digit.className} key={digit.id} data-value={digit.value} id={digit.id}>
        {digit.value}
      </View>
    })

    const operMap = this.state.operMap
    const operView = operMap.map((oper) => {
      oper.className = 'calculator-key ' + oper.className
      return <View className={oper.className} key={oper.id} data-value={oper.value} id={oper.id}>
        {oper.value}
      </View>
    })

    return (

      <View>
        My Account
        {/* <View>添加</View>

        <View className='income'> 收入支出 </View>
        <View> 本周： </View>
        <View> 本月： </View>
        <View> 本年： </View> */}

        <View className='modals modals-bottom-dialog' hidden={this.state.hideModal}>
          <View className='modals-cancel' onClick={this.hideModal}></View>
          <View className='bottom-dialog-body bottom-pos' animation={this.state.animationData}>

            {/* <View className='calculator-key'>
              <Button hover-start-time='{{5}}' hover-stay-time='{{20}}' hover-className='calculator-key-hover' data-key='{{className}}' className='calculator-key {{className}}'>qqq</Button>
            </View> */}

            <View className='calculator'>
              <View className='calculator-display'>
                <View className='calculator-display-text'>{this.state.value}</View>
              </View>
              <View className='calculator-keypad'>
                <View className='input-keys'>
                  <View className='function-keys' onClick={(e) => this.onTapFunction(e)}>
                    <View className='calculator-key' data-value='ac'>AC</View>
                    <View className='calculator-key'>sign</View>
                    <View className='calculator-key' data-value='back'>back</View>
                  </View>
                  <View className='digit-keys' onClick={(e) => this.onTapDigit(e)}>
                    {digitView}
                  </View>
                </View>
                <View className='operator-keys' onClick={(e => this.onTapOperator(e))}>
                  {operView}
                </View>
              </View>
            </View>

          </View>
        </View>
        <Button onClick={this.showModal}>点击弹出</Button>

      </View>


    )
  }
}
