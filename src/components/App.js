import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { handeInitialData } from "../actions/shared"
import Dashboard from "./Dashboard"
import LoadingBar from "react-redux-loading"
import NewQuestion from "./NewQuestion"
import TweetPage from "./TweetPage"
import Nav from "./Nav"
import Login from "./Login"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Leaderboard from "./Leaderboard"

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handeInitialData())
  }
  render() {
    const { authedUser } = this.props

    if (authedUser === "empty") {
      return <Login />
    }

    return (
      <Router>
        <LoadingBar />
        <Nav authedUser={authedUser} />
        <div className="container">
          {this.props.loading === true ? null : (
            <div>
              <Route path="/" exact component={Dashboard} />
              <Route path="/leaderboard" component={Leaderboard} />
              <Route path="/add" component={NewQuestion} />
              <Route path="/login" component={Login} />
            </div>
          )}
        </div>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
    loading: authedUser === null,
  }
}

export default connect(mapStateToProps)(App)

/* 
render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav />
            {this.props.loading === true ? null : (
              <div>
                <Route path="/" exact component={Dashboard} />
                <Route path="/tweet/:id" component={TweetPage} />
                <Route path="/new" component={NewTweet} />
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    )
  }
  */
