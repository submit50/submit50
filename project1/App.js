import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { vibrate } from './utils'


// - You may not import libraries other than the below:
//   - `expo`
//   - `react`
//   - `react-native`
//   - `prop-types`
// - Timer should display minutes and seconds in text
// - Timer should count down seconds until it reaches 00:00
// - Phone should buzz when timer reaches 0
// - Timers should switch between 25 and 5 minutes
// - Timer should be able to start, stop, and reset
const WORKTIME = 25 * 60;
const BREAKTIME = 5 * 60

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      count: WORKTIME,
      isWorkTimer: true,
      isRunning: false,
    }
  }


  componentWillUpdate(nextProps, nextState) {
    if (nextState.count <= 0) {
      vibrate()
      this.setState(prevState => ({
        count: prevState.isWorkTimer ? BREAKTIME : WORKTIME,
        isWorkTimer: !prevState.isWorkTimer
      }))
    }
  }

  componentDidMount() {
    this.toggleTimer(this.state.isRunning)
  }

  toggleTimer = (bool) => {
    if (bool) {
      this.interval = setInterval(this.increment, 1000)
    }
    else {
      clearInterval(this.interval)
    }
  }

  componentWillUnmount() {
    toggleTimer(false)
  }

  startStop = () => {
    this.setState(prevState => ({
      isRunning: !prevState.isRunning,
    }))
    this.toggleTimer(!this.state.isRunning)
  }

  increment = () => {
    this.setState(prevState => ({
      count: prevState.count - 1,
    }))
    return
  }

  parse = (seconds) => {
    const rem = seconds % 60
    const trunc = Math.trunc(seconds / 60)
    return parseHelper(trunc) + ':' + parseHelper(rem)

    function parseHelper(val) {
      return (val < 10 ? (val === 0 ? '00' : '0' + val) : val)
    }
  }

  reset = () => {
    this.toggleTimer(false)
    this.setState({
      count: WORKTIME,
      isWorkTimer: true,
      isRunning: false
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.state.isWorkTimer ? 'Work Timer' : 'Break Timer'}</Text>
        <Text style={this.state.isRunning ? styles.countRunning : styles.countNotRunning}>{this.parse(this.state.count)}</Text>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Button title={this.state.isRunning ? 'Stop' : 'Start'} onPress={this.startStop} />
          <Button title='Reset' onPress={this.reset} />
        </View>
      </View>
    );
  }
}

// static propTypes = {
//   count: PropTypes.number,
//   timerName: PropTypes.string,
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countRunning: {
    fontSize: 48,
    color: 'black'
  },
  countNotRunning: {
    fontSize: 48,
    color: 'grey'
  },
  title: {
    fontSize: 24
  }
});
