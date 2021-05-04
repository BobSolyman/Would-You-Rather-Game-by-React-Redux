import React, { Component } from "react"
import { connect } from "react-redux"
import UserCard from "./UserCard"

class Leaderboard extends Component {
  render() {
    return (
      <div>
        <h3 className="center">Leaderboard</h3>
        <ul className="dashboard-list">
          {this.props.users.map((id) => (
            <li key={id}>
              <UserCard id={id} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  const ourUsers = Object.keys(users).sort(
    (a, b) =>
      users[b].questions.length +
      Object.keys(users[b].answers).length -
      (users[a].questions.length + Object.keys(users[a].answers).length)
  )
  return {
    users: ourUsers,
  }
}

export default connect(mapStateToProps)(Leaderboard)
