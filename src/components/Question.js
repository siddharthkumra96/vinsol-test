import React from 'react';

const Question = (props) => {
    var {upper_limit, lower_limit, operators, n, handler, timeout} = props;
    var op = operators[Math.floor(Math.random()*operators.length)]
    var generateNumber = (ul=upper_limit, ll=lower_limit) => {
        var diff = parseInt(ul) - parseInt(ll)
        return Math.floor(Math.random()*diff)+parseInt(ll)
    }
    var oper1 = generateNumber()
    var oper2 = generateNumber()
    var roundToTwo = (num) => {    
        return +(Math.round(num + "e+2")  + "e-2");
    }
    var [ques, setQues] = React.useState({
        q: oper1 + ' ' + op + ' ' + oper2,
        a: roundToTwo(eval(oper1 + ' ' + op + ' ' + oper2)),
        s: 0,
        c: false
    })
    var handleChange = (e) => {
        if(e.target.value === ''){
            setQues({
                ...ques,
                s: 0
            })
        }
        else {
            setQues({...ques,
                s: parseFloat(e.target.value),
                c: roundToTwo(parseFloat(e.target.value)) === ques.a ? true : false
            })
        }
    }
    var handleSubmit = () => {
        handler({[n]:{ ...ques, s:roundToTwo(ques.s)}});
    }
    
    React.useEffect(() => {
        setQues({
            q: oper1 + ' ' + op + ' ' + oper2,
            a: roundToTwo(eval(oper1 + ' ' + op + ' ' + oper2)),
            s: 0,
            c: false
        })
    }, [n])
    
    if(timeout){
        handleSubmit();
    }

    return(
        <div>
            Question : {ques.q} 
            <br />
                Answer : <input type="number" step="0.01" onChange={handleChange} value={ques.s.toString()} />
                <button onClick={handleSubmit}>Next</button>
        </div>
    )
}
export default Question;