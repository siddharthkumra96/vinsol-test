import React from 'react';
import logo from './logo.svg';
import './App.css';
import Quiz from './components/Quiz';
import styled from 'styled-components';
const Col = styled.div` 

`
const Tab = styled.div`
width: 100%;
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: space-evenly;
`
function App() {
  var op = ['+', '-','/','*'] 
  var [startQuiz, setStartQuiz] = React.useState(
    {
      1: false
    }
  )
  var [n, setn] = React.useState({
    value: 1,
    submitted: false
  })
  const [quiz, setQuiz] = React.useState({
    1: {
      ques : 20,
      lower_limit: 10,
      upper_limit: 100,
      time: 30,
      operators: op
    }
  })
  const [ops, setOps] = React.useState({
    1 : {
    '+' : true,
    '-' : true,
    '/': true,
    '*': true
    }
  })
  const handleChange = (e) => {
    if(e.target.name === 'n'){
      setn({...n, value: isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value)})
    }
    else{
      setQuiz({
        ...quiz,
        [e.target.id]: {...quiz[e.target.id], [e.target.name]: e.target.value}
      })
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // setStartQuiz(true)
  }
  const [reset, setReset] = React.useState({
    1: false
  })
  var opsArr = []
  const handleNSubmit = (e) => {
    e.preventDefault();
    var temp1 = {};
    var temp2 = {};
    var temp3 = {};
    var temp4 = {};
    [...Array(n.value).keys()].forEach( i => { temp1 = {...temp1,
      [i+1]: {
        ques : 20,
        lower_limit: 10,
        upper_limit: 100,
        time: 30,
        operators: op
      }
    }
    opsArr.push([])
  temp2 = {
    ...temp2,
    [i+1]:  {'+' : true,
    '-' : true,
    '/': true,
    '*': true}
  }
  temp3 = {
    ...temp3,
    [i+1]: false
  }
  temp4 = {
    ...temp4, 
    [i+1]: false
  }
  
  })   

    setQuiz({
      ...quiz, ...temp1
    })
    setOps({
      ...ops, ...temp2
    })
    setn({...n, submitted: true});
    setStartQuiz({
      ...startQuiz, ...temp3
    });
    setReset({
      ...reset, ...temp4
    });
      }
  const handleOpsChange = (e) => {
    setOps({
      ...ops,[e.target.id]:  {...ops[e.target.id], [e.target.name]: !ops[e.target.id][e.target.name]}
    })
  }
  const handleResetNumber = () => {
    setn({...n, submitted: false})
  }
  const handleSettingSubmit = (e) => {
    setStartQuiz({ ...startQuiz,
      [e.target.id]: true
    })
    setReset({
      ...reset,
      [e.target.id]: false
    })
    
  }
  var temp;
    Object.keys(ops).forEach(o => {
      temp=[];
      Object.keys(ops[o]).forEach((oper) => {
          if(ops[o][oper]){
            temp.push(oper)
          }
      })
      opsArr[o-1]=temp
    })
  var timerChild ;
  const handleReset = (e) => {
      setReset({
        ...reset,
        [e.target.id]: true
      })
      clearTimeout(timerChild)
  }

const removeTimer = (timer) => {
  timerChild = timer;
}


  return (

    <div>
    
    {n.submitted ? <div><Tab>{[...Array(n.value).keys()].map( i => {
      return(<Col key={i}>  {startQuiz[i+1] && !reset[i+1]  ? <div><button onClick = {handleReset} id={i+1}>RESET!</button>
                            <Quiz ques={quiz[i+1].ques} 
                            lower_limit={quiz[i+1].lower_limit} 
                            upper_limit={quiz[i+1].upper_limit} 
                            time={quiz[i+1].time} 
                            operators={opsArr[i]} removeTimer={removeTimer}/></div> : 
                                            <div><h1>Enter Settings for Quiz {i+1}</h1>
      Upper Limit : <input type="number" name="upper_limit" id={i+1} value={quiz[i+1].upper_limit} min={1} max={100} required onChange={handleChange} /> <br />
      Lower Limit : <input type="number" name="lower_limit" id={i+1} value={quiz[i+1].lower_limit} min={1} max={100} required onChange={handleChange} /> <br />
      Number of Questions : <input type="number" name="ques" id={i+1} value={quiz[i+1].ques} min={1} max={20} required onChange={handleChange}/> <br />
      Time in (s): <input type="number" name="time" id={i+1} value={quiz[i+1].time} min={2} max={60} required onChange={handleChange}/> <br />
      Choose Operators : {op.map((o) => { return(<span key={o}><input type="checkbox" id={i+1} name={o}  required checked={ops[i+1][o]} onChange={handleOpsChange} />{o}  </span>)})}
      <button onClick={handleSettingSubmit} id={i+1}>Start!</button></div>
      }</Col>
      
      )
    })}
    
    </Tab><button onClick={handleResetNumber}>Reset Number of Quizzes</button></div>
      :
      <div>
      Number of Simultaneous Quizzes : <input type="number" name='n' min={1} max={3} value={n.value.toString()} onChange={handleChange} />
      <br />
      <button onClick={handleNSubmit}>Next</button>
      </div>
    
    }

    
    {/* <Col>
                  </Col> */}
    </div>
    
    
  );
}

export default App;
