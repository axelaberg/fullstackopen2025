import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick} >{props.text}</button>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const randomize = () => setSelected(Math.floor(Math.random()*anecdotes.length))
  const [selected, setSelected] = useState(0)
  console.log(selected)
  const [voted, setVoted] = useState(Array(anecdotes.length).fill(0))
  const voteClick = () => {
    const newVotes = [...voted]
    newVotes[selected] += 1
    setVoted(newVotes)
  }
  const max = Math.max(...voted)
  const maxAnecdote = voted.indexOf(max)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br></br>
      has {voted[selected]} votes
      <br></br>
      <Button handleClick={randomize} text='next anecdote'/>
      <Button handleClick={voteClick} text='vote'/>
      <h1>Anecdote with most votes</h1>
      {anecdotes[maxAnecdote]}
      <br></br>
      has {voted[maxAnecdote]} votes
    </div>
  )
}

export default App