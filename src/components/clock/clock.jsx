import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'


export default class Clock extends Component{
    constructor(props) {
        super(props);
        this.state={
            date: new Date()
        }
    }

    componentDidMount() {
        this.timerId = setInterval(
            () => this.tick(), 1000 
        )
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    tick() {
        this.setState({
            date: new Date()
        })
    }


    render() {
        return (
            <View>
                <View>Time is ticking...</View>
                <View>{ this.state.date.toLocaleString() }</View>
            </View>
        )
    }
}