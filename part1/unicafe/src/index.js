import React, {useState} from 'react'
import ReactDOM from 'react-dom'

//title component for using again
const Title =(props)=><h1>{props.text}</h1>

//button component for using again two attributes
const Button =(props)=><button onClick={props.handleclick}>{props.text}</button>

//statistics handling
const Statistic = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </tbody>
  );
};
//1.8
const Statistics=({good,bad,neutral,total})=>{
  if(total===0){
  return <p>No feedback given</p> ;
  }
  else{
    return(
      <table>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={total} />
      <Statistic text="average" value={(good-bad)/total}/>
      <Statistic text="positive" value ={`${(good/total)*100} %`}/>  
      </table>      
    );
  }
};



//main app
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handlebuttonclick = (type)=>{
    switch(type){
      case("good"):
        setGood(good+1);
        break;
      case("neutral"):
        setNeutral(neutral+1);
        break;
      case("bad"):
        setBad(bad+1);
        break;
      default:
        break;
    };
  };
  const total = good+bad+neutral;

  return (
    <div>
      <Title text="give Feedback"/>
      <Button handleclick={()=>handlebuttonclick("good")} text="good" />
      <Button handleclick={()=>handlebuttonclick("neutral")} text="neutral" />
      <Button handleclick={()=>handlebuttonclick("bad")} text="bad" />
      <Title text="statistics"/>
      <Statistics good={good} bad={bad} neutral ={neutral} total={total}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)