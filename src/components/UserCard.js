import React, { Component } from "react"
import { connect } from "react-redux"

class UserCard extends Component {
  render() {
    const { name, avatar, questions, answers } = this.props
    return (
      <div className="tweet">
        <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
        <div className="tweet-info">
          <h1>{name}</h1>
          <h3 style={{ fontStyle: "oblique", backgroundColor: "yellow" }}>
            Answered: {answers}
          </h3>
          <h3 style={{ fontStyle: "oblique", backgroundColor: "yellow" }}>
            Composed: {questions}
          </h3>
          <h1 style={{ fontStyle: "oblique" }}>
            Total score: {answers + questions}
          </h1>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ users }, { id }) {
  const { name, avatarURL, answers, questions } = users[id]
  return {
    name,
    avatar: avatarURL,
    questions: questions.length,
    answers: Object.keys(answers).length,
  }
}

export default connect(mapStateToProps)(UserCard)
