import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './MediumMode.css';

function MediumMode() {
  const [question, setQuestion] = useState('');
  const [solution, setSolution] = useState(0);
  
  const fetchData = async ()  => {

    try {
      
      const response = await axios.get("http://localhost:3000/api/question");
      const {question, solution} = response.data;

      setQuestion(question);
      setSolution(solution);

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    fetchData();
  },[]);


  return (
    <div  className="container-medium">
      <img className="medium-img" src={question} alt="banana-game" />
      <h5>Answer is: {solution}</h5>
    </div>
  )
}

export default MediumMode