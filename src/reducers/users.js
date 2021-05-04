import { RECEIVE_USERS, ADD_MY_ANSWER, ADD_MY_QUESTION } from "../actions/users"

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      }
    case ADD_MY_QUESTION:
      const { authedUser, qid } = action
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          questions: state[authedUser].questions.concat([qid]),
        },
      }
    case ADD_MY_ANSWER:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.choice,
          },
        },
      }
    default:
      return state
  }
}
