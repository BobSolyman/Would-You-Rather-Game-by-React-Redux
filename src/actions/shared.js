import { getInitialData, saveQuestion, saveQuestionAnswer } from "../utils/api"
import { receiveQuestions, addQuestion, answerQuestion } from "./questions"
import { receiveUsers, addMyQuestion, addMyAnswer } from "./users"
import { setAuthedUser } from "./authedUser"
import { showLoading, hideLoading } from "react-redux-loading"

const AUTHED_ID = "empty"

export function handeInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users))
      dispatch(receiveQuestions(questions))
      dispatch(setAuthedUser(AUTHED_ID))
      dispatch(hideLoading())
    })
  }
}

export function handleAddQuestion(optionOne, optionTwo) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser,
    })
      .then((question) => {
        dispatch(addQuestion(question))
        dispatch(addMyQuestion(authedUser, question.id))
      })
      .then(() => dispatch(hideLoading()))
  }
}

export function handleQuestionAnswer(qid, choice) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestionAnswer({ authedUser, qid, answer: choice })
      .then(() => {
        dispatch(answerQuestion({ qid, authedUser, answer: choice }))
        dispatch(addMyAnswer(authedUser, qid, choice))
      })
      .then(() => dispatch(hideLoading()))
  }
}
