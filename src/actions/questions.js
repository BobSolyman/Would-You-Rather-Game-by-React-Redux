import { saveQuestion, saveQuestionAnswer } from "../utils/api"
import { showLoading, hideLoading } from "react-redux-loading"

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS"
export const TOGGLE_QUESTION = "TOGGLE_QUESTION"
export const ADD_QUESTION = "ADD_QUESTION"

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
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
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}

function toggleQuestion({ id, authedUser, hasVoted }) {
  return {
    type: TOGGLE_QUESTION,
    id,
    authedUser,
    hasVoted,
  }
}

export function handleToggleQuestion(info) {
  return (dispatch) => {
    dispatch(toggleQuestion(info))

    return saveQuestionAnswer(info).catch((e) => {
      console.warn("Error in handleToggleQuestion: ", e)
      dispatch(toggleQuestion(info))
      alert("There was an error answering the question. Try again.")
    })
  }
}
