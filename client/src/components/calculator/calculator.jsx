import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Big } from 'big.js'
import { changeTwoDecimal } from '../../utils/utiltools'
import './calculator.scss'


const reg = RegExp(/\+|\−|\÷|\×/)
export default class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: props.type,
            value: '0', // 上次计算后的结果
            preOper: null, // 上次计算符号
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
    }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidHide() {
        this.setState({
            value: '0',
            preOper: null
        })
    }

    // 计算表达式
    calOper = (option, pre, next) => {
        console.log('calOper', option, pre, next)
        let preBig = new Big(pre)
        let nextBig = new Big(next)
        switch (option) {
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
    onTapOperator = (e, oper) => {
        // console.log(e.target.dataset.value)
        const curOper = oper || e.target.dataset.value

        if (!this.state.value.match(reg)) {
            // value不包含操作符
            this.setState({
                value: curOper == '=' ? this.state.value : this.state.value + curOper,
                preOper: curOper
            })
            return this.state.value
        } else if (this.state.value.match(reg)) {
            // value包含操作符  
            let oldValue = this.state.value
            let index = oldValue.match(reg).index
            
            if (this.state.preOper == null) {
                // 计算表达式 浮点数精确度问题解决
                const pre = parseFloat(oldValue.substring(0, index))
                const next = parseFloat(oldValue.substring(index + 1))
                let newValue = this.calOper(oldValue[index], pre, next)
                console.log('newValue', newValue.toString())
                let ret = curOper == '=' ? newValue.toString() : newValue + curOper
                this.setState({
                    value: ret,
                    preOper: curOper
                })
                return ret

            } else {
                let ret = curOper == '=' ? oldValue.substring(0, index) : oldValue.substring(0, index) + curOper
                // 变更运算符
                this.setState({
                    value: ret
                })
                return ret
            }
        }
        // console.log(this.state.value)
    }

    onTapFunction = (e) => {
        if (e.target.dataset.value == 'ac') {  // 清空
            this.setState({
                value: '0',
                preOper: null
            })
        } else if (e.target.dataset.value == 'back') {  // 退格
            let curValue = this.state.value
            if (curValue.length > 1) {
                this.setState({
                    value: this.state.value.substr(0, this.state.value.length - 1)
                })
            } else {
                this.setState({
                    value: '0'
                })
            }
        } else { // ok

            const value = this.onTapOperator(null, '=')
            console.log('ok', value)
            let money = changeTwoDecimal(value)
            // let value = this.state.value
            // let money
            // if (value.match(reg)) {
            //     let index = value.match(reg).index
            //     const pre = parseFloat(value.substring(0, index))
            //     const next = parseFloat(value.substring(index + 1))
            //     money = changeTwoDecimal(this.calOper(value[index], pre, next))
            // } else {
            //     money = changeTwoDecimal(value)
            // }

            if (money <= 0) {
                Taro.showToast({
                    title: '建议输入大于0的金额',
                    icon: 'none'
                })
                return
            }

            if (this.state.type === '0') {
                let path = '/pages/addBill/addBill?money=' + money
                // console.log(path)
                Taro.navigateTo({
                    url: path,
                })
            } else {
                // 将money传回页面
                this.props.onSendMoneyBack(money)
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
            <View className='calculator'>
                <View className='calculator-display'>
                    <View className='calculator-display-text'>{this.state.value}</View>
                </View>
                <View className='calculator-keypad'>
                    <View className='input-keys'>
                        <View className='function-keys' onClick={(e) => this.onTapFunction(e)}>
                            <View className='calculator-key' data-value='ac'>AC</View>
                            <View className='calculator-key' data-value='back'>back</View>
                            <View className='calculator-key' data-value='ok'>ok</View>
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
        )
    }
}