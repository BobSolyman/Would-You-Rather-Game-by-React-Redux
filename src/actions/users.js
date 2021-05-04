export const RECEIVE_USERS = "RECEIVE_USERS"
export const ADD_MY_QUESTION = "ADD_MY_QUESTION"
export const ADD_MY_ANSWER = "ADD_MY_ANSWER"

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function addMyQuestion(authedUser, qid) {
  return {
    type: ADD_MY_QUESTION,
    authedUser,
    qid,
  }
}

export function addMyAnswer(authedUser, qid, choice) {
  return {
    type: ADD_MY_ANSWER,
    authedUser,
    qid,
    choice,
  }
}
