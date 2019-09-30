import React from 'react';
import Question from './Question'

const Quiz = (props) => {
    const {lower_limit, upper_limit, ques, time, operators, removeTimer} = props;
    const [question, setQuestion] = React.useState({
        1: {q:'', a:'', s:'', c:false}
    })
    const [counter, setCounter] = React.useState({
        update: true,
        value: 0
    })
    var myInt = setTimeout(() => {setValue(values-1)},1000)
    const [values, setValue] = React.useState(time)
    const handler = (q) => {
        setQuestion({...question, ...q})
        if(counter.value + 1 > ques){
            setCounter({...counter, update: true})
        }
        else {
        setCounter({value: counter.value + 1, update: false})
        }
        if(!myInt.isNull){
            clearTimeout(myInt)
            myInt = null;
        }
        setValue(time) 
    }
    const handleStart = (e) => {
        e.preventDefault();
        setCounter({
            update: false,
            value: 1
        })
    }
    React.useEffect(() => {
        removeTimer(myInt)
        return clearTimeout(myInt);
    },[])
    return (
        <div>
        {counter.value > 0 ? '' :  <form onSubmit={handleStart}>
            <button type="submit">Start!</button>
        </form>}
       
           {counter.update ? counter.value === parseInt(ques) ? <div> {Object.keys(question).map((x) => {
               return (<div key={x} style={question[x].c ? {color: 'green'}: {color: 'red'}}>
                   <h1>Question Number : {x}</h1> 
                   <p>Question : {question[x].q}</p>
                   <p>Submitted Answer : {question[x].s}</p>
                   <p>Correct Answer: {question[x].a}</p>
                   <p>Correct? : {question[x].c ? 'Yes': 'No'}</p>
               </div>)
           })}
           </div> : '' : <div>Timer : {values}<Question timeout={values === 0} n={counter.value} operators={operators} lower_limit={lower_limit} upper_limit={upper_limit} handler={handler} /></div>}
        </div>
    )
}
export default Quiz;