import React, { Component } from 'react'
import { connect } from 'react-redux'

import { nextContent, prevContent, stepAgent } from '../actions'

import { swap } from '../api'

const mapStateToProps = state => ({
  content_id: state.content_id,
  frame: state.frame,
})

const mapDispatchToProps = dispatch => ({
  onClickNext: () => dispatch(nextContent()),
  onClickPrev: () => dispatch(prevContent()),
  callStep: () => dispatch(stepAgent()),
})

class App extends Component {
  componentWillMount = () => {
    this.props.callStep()
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.content_id !== prevProps.content_id) {
      swap(this.props.content_id)
    } else {
      this.props.callStep()
    }
  }

  render = () => (
    <div>
      <img alt="Agent Monitor" src={`data:image/png;base64,${this.props.frame}`} />
      <input type="button" value="前タスク" onClick={this.props.onClickPrev} />
      <input type="button" value="次タスク" onClick={this.props.onClickNext} />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
