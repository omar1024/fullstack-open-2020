import React, {useState} from 'react'
import ReactDOM from 'react-dom'

//title component for using again
const Title =(props)=><h1>{props.text}</h1>

//button component for using again two attributes
const Button =(props)=><button onClick={props.handleclick}>{props.text}</button>

//statistics handling
const Statistic = (props)=>{
  return(
    <table>
      <tbody>
        <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
        </tr>
      </tbody>
    </table>
);
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
  const amount = good-bad;

  const percent =(x,total)=>{
    if(total===0){
      return 0;
    }
    const percent = (x/total)*100;
    return percent;
  };
  const ratio=()=>{if(total===0) return 0; return(amount/total);}

  return (
    <div>
      <Title text="give Feedback"/>
      <Button handleclick={()=>handlebuttonclick("good")} text="good" />
      <Button handleclick={()=>handlebuttonclick("neutral")} text="neutral" />
      <Button handleclick={()=>handlebuttonclick("bad")} text="bad" />
      <Title text="statistics"/>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={total} />
      <Statistic text="average" value={ratio(amount,total)}/>
      <Statistic text="positive" value={percent(good,total)}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)