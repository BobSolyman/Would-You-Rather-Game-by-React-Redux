import React, { Component } from "react"
import { connect } from "react-redux"
import DropdownButton from "react-bootstrap/DropdownButton"
import Dropdown from "react-bootstrap/Dropdown"
import { setAuthedUser } from "../actions/authedUser"
import { Redirect } from "react-router-dom"

class Login extends Component {
  state = {
    chosen: "",
    toHome: false,
  }

  handleSubmit(e) {
    e.preventDefault()

    const { chosen } = this.state
    const { dispatch } = this.props

    dispatch(setAuthedUser(chosen))

    this.setState(() => ({
      chosen: "",
      toHome: true,
    }))
  }

  handleClick(id) {
    this.setState(() => ({
      chosen: id,
    }))
  }

  render() {
    const { users } = this.props
    if (this.state.toHome === true) {
      return <Redirect to="/" />
    }
    return (
      <div className="center">
        <h2 className="center">
          Welcome to Would you rather by Shehab Solyman
        </h2>
        <DropdownButton id="dropdown-basic-button" title="Select your Tag">
          <ul
            style={{
              alignContent: "center",
            }}
          >
            {users.map((id) => (
              <li key={id}>
                <button className="btn" onClick={() => this.handleClick(id)}>
                  <Dropdown.Item>{id}</Dropdown.Item>
                </button>
              </li>
            ))}
          </ul>
        </DropdownButton>
        {this.state.chosen !== "" && (
          <button className="btn" onClick={(e) => this.handleSubmit(e)}>
            Login as {this.state.chosen}
          </button>
        )}
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    users: Object.keys(users),
  }
}

export default connect(mapStateToProps)(Login)
