import { useEffect } from 'react';

/*
* useInterval hook wrapper
* @param function to execute 
* @param delay interval in milliseconds on how often to execute function. 
* Returns a cleanup function as per the useEffect hook react docs that states that this will cleanup the hook every render.
*/
const useInterval = (fn, delay) => {

  useEffect( () => {
      console.log('in hook');
    let interval = setInterval(fn, delay);

    return () => clearInterval(interval);
  });

}

export default useInterval;