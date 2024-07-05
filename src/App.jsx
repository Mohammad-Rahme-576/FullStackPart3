// import React from 'react';

// const Header = ({ course }) => {
//   return <h1>{course}</h1>;
// };

// const Content = ({ parts }) => {
//   return (
//     <div>
//       {parts.map((part, index) => (
//         <Part key={index} name={part.name} exercises={part.exercises} />
//       ))}
//     </div>
//   );
// };

// const Part = ({ name, exercises }) => {
//   return (
//     <p>
//       {name} {exercises}
//     </p>
//   );
// };

// const Total = ({ parts }) => {
//   const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
//   return <p>Total number of exercises {totalExercises}</p>;
// };

// const App = () => {
//   const course = {
//     name : 'Half Stack application development',
//     parts : [
//     {
//       name: 'Fundamentals of React',
//       exercises: 10,
//     },
//     {
//       name: 'Using props to pass data',
//       exercises: 7,
//     },
//     {
//       name: 'State of a component',
//       exercises: 14,
//     },
//   ],
// }

//   return (
//     <div>
//       <Header course={course.name} />
//       <Content parts={course.parts} />
//       <Total parts={course.parts} />
//     </div>
//   );
// };

// export default App;
//---------------------Part c -------------------------------//
// import { useState } from "react";

// const Display = (props) =>{
//   return(
//     <div>{props.counter}</div>
//   )
// }

// const Button = (props) =>{
//   return(
//     <button onClick={props.onClick}>
//       {props.text}
//     </button>
//   )
// }
// const App = () => {

//   const [counter , setCounter] = useState(0);
//   const increaseByOne = ()=>setCounter(counter+1);
//   const decreaseByOne = ()=>setCounter(counter-1);
//   const resetToZero = () => setCounter(0);


//   return(
//     <div>
//     <Display counter={counter}/>
//     <Button onClick={increaseByOne} text='plus'/>
//     <Button onClick={decreaseByOne} text='minus'/>
//     <Button onClick={resetToZero} text='reset'/>
//     </div>
//   )
// }

// export default App;

//--------------------------Part d---------------------------//
import { useState } from "react";
import React from "react";

/*---------Storing all of the state in a single state object--------- */

// const App = () => {
//   const [clicks, setClicks] = useState({
//     right: 0,
//     left: 0,
//   });

//   const handleRightClicks = () => {
//     setClicks({ ...clicks, right: clicks.right + 1 });
//   };
//   const handleLeftClicks = () => {
//     setClicks({ ...clicks, left: clicks.left + 1 });
//   };

//   return (
//     <div>
//       {clicks.left}
//       <button onClick={handleLeftClicks}>Left</button>
//       <button onClick={handleRightClicks}>Right</button>
//       {clicks.right}
//     </div>
//   );
// };
/**------------------------------------------------------------------- */
// const History =(props)=>{
//   if(props.allClicks.length === 0){
//     return(
//       <div>use the app by clicking the buttons.</div>
//     )
//   }else{
//     return(
//       <div>button press history : {props.allClicks.join(' ')}</div>
//     )
//   }
// }
// const Button = ({handleClick,text}) =>{
//   return(
//   <button onClick={handleClick}>{text}</button>
//   )
// }
// const App = () => {
//   const [left ,setLeft] = useState(0);
//   const [right,setRight] = useState(0);
//   const [allClicks ,setAll] = useState([]);
//   const [total ,setTotal] = useState(0);

//   const handleLeftClicks = ()=>{
//     setAll(allClicks.concat('L'))
//     const updatedLeft = left + 1;
//     setLeft(updatedLeft);
//     setTotal(updatedLeft + right);
//   }
//   const handleRightClicks = ()=>{
//     setAll(allClicks.concat('R'))
//     const updatedRight = right+1;
//     setRight(updatedRight)
//     setTotal(left + updatedRight)
//   }

//   return(
//     <div>
//       {left}
//       <Button handleClick={handleLeftClicks} text='Left'/>
//       <Button handleClick={handleRightClicks} text='Right'/>
//       {right}

//       <History allClicks={allClicks}/>
//     </div>
//   )
// }
/*----------------Function inside a function as an eveent handler -------------------------- */

const App = () =>{
  const [value ,setValue] = useState(10);

  const setToValue = (newValue) =>{
    console.log("new value is " , newValue)
    setValue(newValue)
  }

  return(
    <div>
      {value}
      <button onClick={() => setToValue(1000)}>one-Thousand</button>
      <button onClick={()=> setToValue(0)}>reset</button>
      <button onClick={()=>setToValue(value+1)}>increment</button>
    </div>
  )
}


 export default App;