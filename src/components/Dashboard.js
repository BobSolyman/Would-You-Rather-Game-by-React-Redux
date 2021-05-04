import React, { Component } from "react"
import { connect } from "react-redux"
import QuestionCard from "./QuestionCard"

class Dashboard extends Component {
  state = {
    showUnanswered: true,
  }
  handleAnswered = () => {
    this.setState(() => ({
      showUnanswered: false,
    }))
  }
  handleUnanswered = () => {
    this.setState(() => ({
      showUnanswered: true,
    }))
  }

  render() {
    const { showUnanswered } = this.state
    return (
      <div>
        <div className="btnHolder">
          <button className="btn1" onClick={this.handleUnanswered}>
            View Unanswered Questions
          </button>
          <button className="btn1" onClick={this.handleAnswered}>
            View Answered Questions
          </button>
        </div>
        {showUnanswered && (
          <div>
            <h3 className="center">Unanswered</h3>
            <ul className="dashboard-list">
              {this.props.unansweredIds.map((id) => (
                <li key={id}>
                  <QuestionCard id={id} />
                </li>
              ))}
            </ul>
          </div>
        )}
        {!showUnanswered && (
          <div>
            <h3 className="center">Answered</h3>
            <ul className="dashboard-list">
              {this.props.answeredIds.map((id) => (
                <li key={id}>
                  <QuestionCard id={id} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps({ questions, authedUser }) {
  // eslint-disable-next-line
  const ans = Object.keys(questions).filter((q) => {
    let q1 = questions[q].optionOne.votes
    let q2 = questions[q].optionTwo.votes
    let q3 = q1.concat(q2)
    if (q3.includes(authedUser)) {
      return q
    }
  })
  // eslint-disable-next-line
  const unans = Object.keys(questions).filter((q) => {
    let q1 = questions[q].optionOne.votes
    let q2 = questions[q].optionTwo.votes
    let q3 = q1.concat(q2)
    if (!q3.includes(authedUser)) {
      return q
    }
  })
  return {
    answeredIds: ans.sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
    unansweredIds: unans.sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
  }
}

export default connect(mapStateToProps)(Dashboard)
