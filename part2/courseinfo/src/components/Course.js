import React from "react";

const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
}

const Part = (props) => {
    return (
      <p>
        {props.name} {props.exercises}
      </p>    
    )
}

const Content = ({ parts }) => {
    const partslist = parts.map((item)=>{
        return <Part key={item.id} name={item.name} exercises={item.exercises} />;
    })
    return(
    <div>{ partslist }</div>
    )
}
const Total = ({ parts })=>{
    const total = parts.reduce((acc,res)=>acc+res.exercises,0);
    return(
        <div>
            <p><strong>total of {total} exercises</strong></p>
        </div>
    )
}

const Course = ({course})=>{
    return(
        <div>
            <Header course={course}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}
export default Course;