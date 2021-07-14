import React from "react";

const Person = props => {
    return (
      <>
        <p>{props.name} {props.phoneNumber}</p>
        <br />
      </>
    );
  };

export default Person;