import React, { useState, useEffect } from 'react';
import classes from './App.css';

const App = () => {
  let [timer, setTimer] = useState(0);
  let num = 0;
  
  // useEffect hook is for side effects like data fetching and manually manipulating the DOM
  // the second parameter listens to changes in a variable and runs the function when it changes
  // this will run everytime the num variable changes which is never in this example. 
  useEffect(() => console.log("Side effect ran!"), [num])
  
  return (
    <div className={classes.App}>
      <h1 Style="color:white;">{timer}</h1>
      <button onClick={ 
        () => 
        { 
          console.log('pre', timer);
          // finally figured it out. the reason that this takes two button presses is because post increment increments AFTER the function call.
          // the initial value of 0 is passed into setTimer and then incremented. That is why the log statements show the current value but react just sees the previous value.
          // so timer = 0
          // setTimer(timer++)
          // setTimer gets the value of 0, once setTimer returns, the timer variable gets incremented
          // the post log statement shows the incremented value
          setTimer(++timer);
          console.log("post", timer);
        } 
    }>Increment</button>    

    </div>
  );
}

export default App;
