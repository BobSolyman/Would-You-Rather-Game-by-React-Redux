export function formatDate(timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString("en-US")
  return time.substr(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString()
}

// fix it
export function formatQuestion(question, author, authedUser) {
  const { id, optionOne, optionTwo, timestamp } = question
  const { name, avatarURL } = author

  return {
    name,
    id,
    avatar: avatarURL,
    timestamp,
    optionOne,
    optionTwo,
    timestamp,
    hasVoted:
      optionOne.votes.includes(authedUser) ||
      optionTwo.votes.includes(authedUser),
  }
}
export function formatTweet(tweet, author, authedUser, parentTweet) {
  const { id, likes, replies, text, timestamp } = tweet
  const { name, avatarURL } = author

  return {
    name,
    id,
    timestamp,
    text,
    avatar: avatarURL,
    likes: likes.length,
    replies: replies.length,
    hasLiked: likes.includes(authedUser),
    parent: !parentTweet
      ? null
      : {
          author: parentTweet.author,
          id: parentTweet.id,
        },
  }
}
