import React, { Component } from "react"
import { connect } from "react-redux"
import { handleAddQuestion } from "../actions/shared"
import { Redirect } from "react-router-dom"

class NewQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    toHome: false,
  }
  handleOneChange = (e) => {
    const text = e.target.value

    this.setState(() => ({
      optionOne: text,
    }))
  }
  handleTwoChange = (e) => {
    const text = e.target.value

    this.setState(() => ({
      optionTwo: text,
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOne, optionTwo } = this.state
    const { dispatch } = this.props

    dispatch(handleAddQuestion(optionOne, optionTwo))

    console.log(this.props)
    this.setState(() => ({
      optionOne: "",
      optionTwo: "",
      toHome: true,
    }))
  }
  render() {
    const { optionOne, optionTwo, toHome } = this.state
    if (toHome === true) {
      return <Redirect to="/" />
    }

    return (
      <div>
        <h3 className="center">Create New Question</h3>
        <form className="new-tweet" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Option One"
            value={optionOne}
            className="textarea"
            onChange={this.handleOneChange}
          />
          <span style={{ textAlign: "center" }}>~OR~</span>
          <input
            type="text"
            placeholder="Option Two"
            value={optionTwo}
            className="textarea"
            onChange={this.handleTwoChange}
          />
          <button
            className="btn"
            type="submit"
            disabled={optionOne.length === 0 || optionTwo.length === 0}
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default connect()(NewQuestion)
