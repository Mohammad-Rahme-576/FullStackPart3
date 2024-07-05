//This is my work on part d exercises "Exercises 1.6.-1.14."
//first will start with  1.6
// import { useState } from "react";
// import React from "react";
//----------------------solution of exercise 1.6: unicafe tell 1.11-------------------------------

// const Button = ({handleClick , text}) =>{
//     return(
//         <button onClick={handleClick}> {text} </button>
//     )
// }
// //here 1.8 step 3 were we made the display statistics on its ow component
// const StatisticLine = (props) =>{
//     return(
        
//         <tr>
//             <td>{props.text}</td>  
//             <td>{props.value}</td>
//         </tr>
        
//     )
    
// }
// const Statistics = (props) =>{
//     if(props.all === 0 ){
//         return(
//             <div>No feedback given</div>
//         )
//     }

//     return(
        
//         <table>
//             <tbody>
//             <StatisticLine text='good' value={props.good}/> 
//             <StatisticLine text='neutral' value={props.neutral}/> 
//             <StatisticLine text='bad'  value={props.bad}/> 
//             <StatisticLine text='all'  value={props.all}/> 
//             <StatisticLine text='average' value={props.average/props.all}/>
//             <StatisticLine text='positive' value={props.percent/props.all *100 +' %'} />
//             </tbody>
//         </table>
        
//     )
// }
// const App = () => {
//     const [good,setGood] = useState(0);
//     const [neutral,setNeutral] = useState(0);
//     const [bad,setBad] = useState(0);
//     const [all,setAll] = useState(0);
//     const [average,setAverage] = useState(0);
//     const [percent,setPercent] =useState(0)
    
//     const handleGoodClick = () =>{
//         const newGood = good+1;
//         setGood(newGood)
//         setAll(newGood + neutral + bad)
//         setAverage(newGood - bad) 
//         setPercent(newGood)

//     }   
//     const handleNeutralClick = () =>{
//         const newNeutral = neutral+1
//         setNeutral(newNeutral)
//         setAll(newNeutral + good + bad)
         
//     }
//     const handleBadClick = () =>{
//         const newBad = bad+1
//         setBad(newBad)
//         setAll(newBad + good + neutral)
//         setAverage(-newBad + good)
//     }
    
    
    
//     return(
//         <div>
//             <h1>give feedback</h1>
            
//             <Button handleClick={handleGoodClick} text='good'/>
//             <Button handleClick={handleNeutralClick} text='neutral'/>
//             <Button handleClick={handleBadClick} text='bad'/>
//             <br/>
//             <h1>statistics</h1>
//             <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} percent={percent} />
    
            
            
//         </div>
//     )
// }

// export default App;





/*-------------------------------Solution of exercise anecdotes 1.12 tell 1.---------------------------------------- */
import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [votes,setVotes]=useState(Array(anecdotes.length).fill(0));
  const [mostVotes,setMostVotes] =useState(0)

  const handleSelectChange = ()=>{
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVoteChange =()=>{
    const newVotes = [...votes];
    newVotes[selected] +=1;
    setVotes(newVotes)
    let max = newVotes[0];
    for(let i=0;i<newVotes.length;i++){
      if(newVotes[i] > max){
        max=newVotes[i]
      }
    }
    setMostVotes(newVotes.indexOf(max))
  }

  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <button onClick={handleVoteChange}>vote</button>
      <button onClick={handleSelectChange}>next anecdote</button>

      <h1>Anecdote with the most votes :</h1>
      <div>{anecdotes[mostVotes]}</div>
      <div>has {votes[mostVotes]} votes</div>
    </div>
  )
}

export default App