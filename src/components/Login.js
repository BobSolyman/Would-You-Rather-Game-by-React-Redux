import React, { Component } from "react"
import { connect } from "react-redux"

class Login extends Component {
  render() {
    return <div className="center"></div>
  }
}

function mapStateToProps({ users }) {
  return {
    users: Object.keys(users),
  }
}

export default connect(mapStateToProps)(Login)
