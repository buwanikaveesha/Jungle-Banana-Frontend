import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './HardMode.css';

function HardMode() {
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
    <div  className="container-easy">
      <img src={question} alt="banana-game" />
      <h5>{solution}</h5>
    </div>
  )
}


export default HardMode;