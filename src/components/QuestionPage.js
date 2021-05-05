import React, { Component } from "react"
import { connect } from "react-redux"
import { handleQuestionAnswer } from "../actions/shared"
import { formatQuestion, formatDate } from "../utils/helpers"
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap"
import { Link } from "react-router-dom"

class QuestionPage extends Component {
  state = {
    choice: "",
  }

  handleOneClick = (e) => {
    e.preventDefault()

    this.setState(() => ({
      choice: "optionOne",
    }))
  }
  handleTwoClick = (e) => {
    e.preventDefault()

    this.setState(() => ({
      choice: "optionTwo",
    }))
  }
  handleSubmit(e) {
    e.preventDefault()

    const { choice } = this.state
    const { dispatch, question } = this.props

    dispatch(handleQuestionAnswer(question.id, choice))

    this.setState(() => ({
      choice: "",
    }))
  }
  render() {
    const { answer, question } = this.props

    if (!question || question === null) {
      return (
        <div>
          <h2 className="center">This question doesn't exist</h2>
          <Link to="/">
            <h4 style={{ color: "green" }}>Click here to return to home.</h4>
          </Link>
        </div>
      )
    }

    const { name, avatar, timestamp, optionOne, optionTwo } = question

    return (
      <div className="container">
        <h1 className="center">Would You Rather...?</h1>
        <div className="tweet">
          <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
          <div className="tweet-info">
            <h2>{name}</h2>
            <h3 style={{ fontStyle: "oblique" }}>Would You Rather...</h3>
            <div style={{ fontStyle: "italic" }}>
              Date created: {formatDate(timestamp)}
            </div>
            <h4 style={{ backgroundColor: "yellow" }}>
              {optionOne.text.toUpperCase()}
            </h4>
            <span style={{ textAlign: "center" }}>~OR~</span>
            <h4 style={{ backgroundColor: "yellow" }}>
              {optionTwo.text.toUpperCase()}
            </h4>
          </div>
        </div>
        {answer && (
          <div>
            <div>
              <container className="tweet">
                <h4 className="tweet-data">
                  {optionOne.votes.length} out of{" "}
                  {optionOne.votes.length + optionTwo.votes.length} votes ({(optionOne.votes.length/(optionOne.votes.length + optionTwo.votes.length))*100}%)
                </h4>
                <h3>Would you rather {optionOne.text}</h3>
                {answer === "optionOne" && (
                  <h5 style={{ float: "right", backgroundColor: "yellow" }}>
                    Your Choice!
                  </h5>
                )}
              </container>
            </div>
            <div>
              <div className="tweet">
                <h4 className="tweet-data">
                  {optionTwo.votes.length} out of{" "}
                  {optionOne.votes.length + optionTwo.votes.length} votes ({(optionTwo.votes.length/(optionOne.votes.length + optionTwo.votes.length))*100}%)
                </h4>
                <h3>Would you rather {optionTwo.text}</h3>
                {answer === "optionTwo" && (
                  <h5 style={{ float: "right", backgroundColor: "yellow" }}>
                    Your Choice!
                  </h5>
                )}
              </div>
            </div>
          </div>
        )}
        {!answer && (
          <div className="center">
            <ToggleButtonGroup type="radio" name="options">
              <ToggleButton value={1}>
                <span onClick={(e) => this.handleOneClick(e)}>
                  Option One: {optionOne.text}
                </span>
              </ToggleButton>
              <ToggleButton value={2}>
                <span onClick={(e) => this.handleTwoClick(e)}>
                  Option Two: {optionTwo.text}
                </span>
              </ToggleButton>
            </ToggleButtonGroup>
            <button
              className="btn"
              onClick={(e) => this.handleSubmit(e)}
              type="submit"
              disabled={this.state.choice.length === 0}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }, props) {
  const { id } = props.match.params
  const question = questions[id]
  const answer = users[authedUser].answers[id]
  return {
    authedUser,
    answer,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null,
  }
}

export default connect(mapStateToProps)(QuestionPage)
