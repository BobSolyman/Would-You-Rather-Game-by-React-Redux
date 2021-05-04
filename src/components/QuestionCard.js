import React, { Component } from "react"
import { connect } from "react-redux"
import { formatQuestion, formatDate } from "../utils/helpers"
import { Link } from "react-router-dom"

class QuestionCard extends Component {
  render() {
    const { question } = this.props

    if (question === null) {
      return <h2 className="center">This question doesn't exist</h2>
    }

    const { id, name, avatar, timestamp, optionOne, optionTwo } = question

    return (
      <Link to={`/questions/${id}`} className="tweet">
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
      </Link>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id]

  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null,
  }
}

export default connect(mapStateToProps)(QuestionCard)
