import React, { Component } from "react"
import { connect } from "react-redux"
import { handeInitialData } from "../actions/shared"
import Dashboard from "./Dashboard"
import LoadingBar from "react-redux-loading"
import NewQuestion from "./NewQuestion"
import Nav from "./Nav"
import Login from "./Login"
import QuestionPage from "./QuestionPage"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Leaderboard from "./Leaderboard"
import Error404 from "./Error404"

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
              <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/leaderboard" component={Leaderboard} />
                <Route path="/add" component={NewQuestion} />
                <Route path="/login" component={Login} />
                <Route path="/questions/:id" component={QuestionPage} />
                <Route path="*" exact={true} component={Error404} />
              </Switch>
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
