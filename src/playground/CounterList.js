import { connect } from 'react-redux'
import { increment, decrement, incrementAsync } from '../actions/counter'
import Counter from './Counter'

const mapStateToProps = (state) => ({
  value: state.counter
})

const mapDispatchToProps = {
  onIncrement: increment,
  onDecrement: decrement,
  onIncrementAsync: incrementAsync,
}

const CounterList = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

export default CounterList
