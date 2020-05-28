import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'
import { monthToChinese, getWeek, getWeekChinese } from "../../utils/dateUtil"
import { getYear, saveText } from "../../utils/request"
// import backgroundImg from "../../assets/images/background.jpg"
// import Clock from "../../components/clock/clock"

// let currentDateStr = dateToString(new Date())
let currentDate = new Date()
export default class Index extends Component {
  state = {
    // dateState: currentDateStr,
    titleImgUrl: 'http://image.wufazhuce.com/Fnpd4sv1WSdFfTZ7pFO-I9fD2610',
    year: "",
    text: ""
  }

  componentWillMount () {}

  componentDidMount () { 
    // getYear().then(res => {
    //   this.setState({
    //     year: res.data.year,
    //     text: res.data.text
    //   })
    // })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '首页'
  }

  // onDateChange = e => {
  //   this.setState({
  //     dateState: e.detail.value
  //   })
  // }

  saveTextClick = (text) => {
    let param = {
      text: text
    }
    saveText(param).then(res => {
      if (res.statusCode == 200){
        Taro.showToast({
          title: "保存成功"
        })
      } else {
        Taro.showToast({
          title: "保存失败",
          icon: "none"
        })
      }
    })
    console.log(text)
  }

  render () {
    let text = this.state.text;

    return (
      <View className='index' >
        <View className='imgBox'>
          {/* <Image className='backgroundImg' src={backgroundImg}></Image> */}
          <Image className='titleImg' src={this.state.titleImgUrl}></Image>
          {/* <Clock />
          <View className='page-section'>
              <Picker mode='date' onChange={this.onDateChange}>
                <View className='picker'>
                  当前选择：{this.state.dateState}
                </View>
              </Picker>
          </View> */}
          <View className='main'>
        <View className='yearNum'>{ this.state.year }</View>
            <View className='dateNum'>{currentDate.getDate()}</View>
            <View className='weekNum'>{getWeek(currentDate)}</View>
            <View className='monthNum'>{monthToChinese(currentDate.getMonth())}</View>
            <View className='monthChinese'>月</View> 
            <View className='week'>{getWeekChinese(currentDate)}</View>
          </View>
        <View className='text' onClick={() => this.saveTextClick(text)}>{ text }</View>
        </View>
        
        
        
        
        
      </View>
    )
  }
}
