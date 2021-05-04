import React, { Component } from "react"
import { Link } from "react-router-dom"

class Error404 extends Component {
  render() {
    return (
      <div>
        <h1>404 error, question not found</h1>
        <Link to="/">
          <h4 style={{ color: "green" }}>Click here to return to home.</h4>
        </Link>
      </div>
    )
  }
}

export default Error404
