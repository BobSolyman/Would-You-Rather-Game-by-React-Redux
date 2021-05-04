import React, { Component } from "react"
import { connect } from "react-redux"
import { formatQuestion, formatDate } from "../utils/helpers"

class QuestionPage extends Component {
  render() {
    const { question } = this.props

    if (question === null) {
      return <h2 className="center">This question doesn't exist</h2>
    }
    return <div>NOIIIIICE</div>
  }
}

function mapStateToProps({ authedUser, users, questions }, props) {
  const { id } = props.match.params
  const question = questions[id]

  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null,
  }
}

export default connect(mapStateToProps)(QuestionPage)
