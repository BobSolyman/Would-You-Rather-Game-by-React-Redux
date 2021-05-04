import React, { Component } from "react"
import { connect } from "react-redux"
import { handleQuestionAnswer } from "../actions/shared"
import { formatQuestion, formatDate } from "../utils/helpers"
import { Link } from "react-router-dom"

class QuestionPage extends Component {
  render() {
    if (this.props.id === null) {
      return <h2 className="center">This question doesn't exist</h2>
    }

    const { error, answer, authedUser, question, users } = this.props
    const { id, name, avatar, timestamp, optionOne, optionTwo } = question

    if (error) {
      return (
        <div>
          <h1>404 error, question not found</h1>
          <Link to="/">
            <h4 style={{ color: "green" }}>Click here to return to home.</h4>
          </Link>
        </div>
      )
    }

    if (!question || question.id === null) {
      return <h2 className="center">This question doesn't exist</h2>
    }
    return (
      <div className="container">
        <h1 className="center">Would You Rather...?</h1>
        <div className="tweet">
          <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
          <div className="tweet-info">
            <h4>{name}</h4>
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
        {answer && <div></div>}
        {answer && (
          <div>
            <form>
              <div>
                <input
                  type="radio"
                  id={optionOne}
                  name="choice"
                  value={optionOne.text}
                />
                <label>Option One: ${optionOne.text}</label>
              </div>
              <div>
                <input
                  type="radio"
                  id={optionTwo}
                  name="choice"
                  value={optionTwo.text}
                />
                <label>Option Two: ${optionTwo.text}</label>
              </div>
            </form>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }, props) {
  const { id } = props.match.params
  const question = questions[id]
  const error = !questions[id]
  const answer = users[authedUser].answers[id]
  return {
    error,
    answer,
    authedUser,
    question,
    users,
  }
}

export default connect(mapStateToProps)(QuestionPage)
