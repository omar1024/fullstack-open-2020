import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props)=> <button onClick={props.handleclick}>{props.text}</button> ;
const Anecdotes = (props)=>{
  return (
    <div>
      {props.anecdote}
      <br />
      has {props.votes} votes
    </div>
  );
};


const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setvotes] = useState(new Array(anecdotes.length).fill(0));

  const randomindex = (len)=>{
    return Math.floor(Math.random()*len);
};
  const newindex=()=>{
    let randomidx;
    do {
      randomidx = randomindex(anecdotes.length)
    } while (randomidx === selected);
    setSelected(randomidx);
}  
  const incvote = ()=>{
  const newvotes = [...votes];
  newvotes[selected]+=1;
  setvotes(newvotes);
}

  const handleonclicks=(type)=>{
  switch(type){
    case "next":
      newindex();
      break;
    case "vote":
      incvote();
      break;
    default:
      break;
  }
}

  return (
    <div>
      <Anecdotes anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button text="vote" handleclick={()=>handleonclicks("vote")} />
      <Button text="next anecdote" handleclick={()=>handleonclicks("next")} />

    </div> 
  );
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)